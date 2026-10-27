/**
 * crestron-xpanel-card — the panel's own compiled XPanel, running in a card.
 *
 * crestron-panel-card redraws a panel from its project and has to decide
 * things the project does not say: which page to start on, what a theme
 * button looks like. This card decides nothing. It runs Crestron's own
 * browser XPanel (`container.swf` and the SmartGraphics engine beside it,
 * as `crestron_cip.import_panel` unpacks them) under Ruffle, so the
 * drawing, the pages, the subpages and every press are the panel's own
 * code doing what it does on the wall.
 *
 * The XPanel speaks CIP over a TCP socket, which a browser cannot open.
 * Ruffle hands the socket to a websocket instead, and the crestron_cip
 * integration's relay carries it to the processor, so it registers at the
 * device's IPID exactly as the wall panel does.
 */

import { LitElement, css, html, nothing, PropertyValues } from "lit";
import { resolveDeviceId } from "../../core/bind";
import { HomeAssistant } from "../../core/types";

const CARD = "crestron-xpanel-card";
// Ruffle as the Crestron CIP integration serves it (0.23 and later), beside
// this card; ruffle_url points elsewhere.
const DEFAULT_RUFFLE = "/crestron_cip/frontend/ruffle/ruffle.js";

interface XPanelCardConfig {
  type: string;
  /**
   * A room panel's device (given to its processor under Configure), or
   * the processor's own device, whose first panel is then shown.
   */
  device?: string;
  /** Or the processor's config entry, when there is no device to name. */
  entry_id?: string;
  /** With entry_id: which of its room panels. */
  panel?: string;
  /**
   * The XPanel's container.swf. Normally left out: the panel given to the
   * processor under Settings → Crestron CIP → Configure is used.
   */
  xpanel_url?: string;
  title?: string;
  /** Width over height of the panel; XPanel.ini gives 1280x800. */
  aspect_ratio?: string;
  /**
   * Fit the panel to the browser window, as large as both its width and
   * its height allow (the default). `false` fills the card's width only.
   */
  fit_window?: boolean;
  /** A fraction of that size, from 0.1 to 1 (the default). */
  scale?: number;
  ruffle_url?: string;
  /** Copy Ruffle's console output into Home Assistant's log. */
  debug?: boolean;
  /**
   * Start this panel as soon as Home Assistant opens in a browser, on any
   * dashboard, so it is already loaded when its view is shown. Not on a
   * phone or tablet (see isLowMemoryDevice).
   */
  background?: boolean;
}

interface XPanelInfo {
  /** The key the relay asks this entry's panels for. */
  key: string;
  /** The panel imported for this processor in its options, if any. */
  xpanel_url?: string | null;
  host: string;
  port: number;
  ipid: number;
  relay: string;
  /** The room panel this is, for the relay to serve it at its own IPID. */
  panel?: string | null;
}

interface RufflePlayerElement extends HTMLElement {
  ruffle(): { load(options: Record<string, unknown>): Promise<void> };
}

interface RuffleGlobal {
  RufflePlayer?: {
    config?: Record<string, unknown>;
    newest(): { createPlayer(): RufflePlayerElement };
  };
}

let ruffleLoading: Promise<void> | undefined;

/**
 * Ruffle reports an XPanel it cannot run only in the browser console.
 * With `debug: true` the card copies console output to Home Assistant's
 * log, once per page, batched so a chatty load is a few calls.
 */
let consoleHooked = false;
function forwardConsole(hass: HomeAssistant): void {
  if (consoleHooked || !hass.callWS) return;
  consoleHooked = true;
  const pending: string[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  const flush = () => {
    timer = undefined;
    const lines = pending.splice(0, 200);
    if (lines.length) hass.callWS!({ type: "crestron_cip/xpanel_log", lines }).catch(() => {});
  };
  for (const level of ["log", "info", "warn", "error", "debug"] as const) {
    const original = console[level].bind(console);
    console[level] = (...args: unknown[]) => {
      original(...args);
      const text = args.map((a) => (a instanceof Error ? `${a.name}: ${a.message}` :
        typeof a === "string" ? a : (() => { try { return JSON.stringify(a); } catch { return String(a); } })())).join(" ");
      pending.push(`${level}: ${text}`);
      timer ??= setTimeout(flush, 1000);
    };
  }
  window.addEventListener("error", (e) => {
    pending.push(`uncaught: ${e.message} at ${e.filename}:${e.lineno}`);
    timer ??= setTimeout(flush, 1000);
  });
}

/** Ruffle once per page, however many cards use it. */
function loadRuffle(url: string): Promise<void> {
  if ((window as unknown as RuffleGlobal).RufflePlayer?.newest) return Promise.resolve();
  ruffleLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => {
      ruffleLoading = undefined;
      reject(new Error(`could not load Ruffle from ${url}`));
    };
    document.head.appendChild(script);
  });
  return ruffleLoading;
}

/**
 * The IPID as the XPanel parses it: AS3 `int()`, so decimal. Crestron
 * writes IPIDs in hex, and "0A" would read as 0; 0x0A must go as "10".
 */
export function ipidParameter(ipid: number): string {
  return String(ipid);
}

/** "1280 / 800", "16:10" or "1.6" as a number; 1.6 if it cannot be read. */
export function ratioOf(text: string | undefined): number {
  const parts = (text ?? "1280 / 800").split(/[/:]/).map((p) => parseFloat(p));
  const value = parts.length === 2 ? parts[0] / parts[1] : parts[0];
  return Number.isFinite(value) && value > 0 ? value : 1.6;
}

/** The card's scale, held to 0.1-1; anything unreadable is 1. */
export function scaleOf(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.min(1, Math.max(0.1, n)) : 1;
}

/** A websocket URL on this Home Assistant for a signed path. */
export function relaySocketUrl(location: { protocol: string; host: string }, signed: string): string {
  const scheme = location.protocol === "https:" ? "wss:" : "ws:";
  return `${scheme}//${location.host}${signed}`;
}

/** Everything Ruffle is told, kept apart so it can be tested. */
export function playerOptions(url: string, info: XPanelInfo, proxyUrl: string,
                              debug = false): Record<string, unknown> {
  const base = url.slice(0, url.lastIndexOf("/") + 1);
  return {
    url,
    base,
    // The parameters the Crestron-hosted XPanel page passes.
    parameters: {
      host: info.host,
      port: String(info.port),
      ipid: ipidParameter(info.ipid),
      bypasslogindialog: "true",
      // Empty credentials, so nothing in the engine asks for them later.
      id: "",
      password: "",
      // The relay does TLS to the processor when the entry asks for it.
      enablessl: "false",
    },
    socketProxy: [{ host: info.host, port: info.port, proxyUrl }],
    autoplay: "on",
    unmuteOverlay: "hidden",
    splashScreen: false,
    contextMenu: "off",
    letterbox: "on",
    warnOnUnsupportedContent: false,
    allowScriptAccess: false,
    openUrlMode: "deny",
    logLevel: debug ? "info" : "warn",
  };
}

/**
 * One running XPanel per panel per browser tab, outliving the cards that
 * show it.
 *
 * Ruffle destroys a player the moment its element leaves the document, and
 * Home Assistant takes a view's cards out of the document whenever another
 * view is opened. A player inside the card would reload the whole panel
 * (twenty seconds, and a new connection) on every visit. So the player
 * lives in a host of its own on the document body, and a card is only a
 * window it is laid over. With no card showing it, it is moved off screen
 * at the same size, still running and still connected.
 */
interface Session {
  key: string;
  host: HTMLDivElement;
  owner?: CrestronXPanelCard;
  ready: Promise<void>;
  frame?: number;
  /** The panel's own screen, in its pixels: what the engine lays out to. */
  size: [number, number];
  player?: HTMLElement;
}

/** XPanel.ini's size for the panels seen so far, until the import says. */
const DEFAULT_SIZE: [number, number] = [1280, 800];

const sessions = new Map<string, Session>();

/**
 * A phone or tablet. Each panel is a player with its own copy of the
 * engine, and Safari on iOS closes a tab that holds more than a panel or
 * two ("this webpage was reloaded because a problem occurred"); Android
 * phones run short too. There no panel starts in the background and only
 * one runs at a time.
 */
export function isLowMemoryDevice(nav: Navigator): boolean {
  const agent = nav.userAgent ?? "";
  if (/iPhone|iPad|iPod|Android|Mobile/i.test(agent)) return true;
  // Safari on an iPad calls itself a Mac; a Mac has no touch screen.
  if (/Macintosh/.test(agent) && (nav.maxTouchPoints ?? 0) > 1) return true;
  const memory = (nav as Navigator & { deviceMemory?: number }).deviceMemory;
  return memory !== undefined && memory < 4;
}

/** Close every panel no card is showing, but `keep`; how many closed. */
export function closeOtherSessions(keep?: Session): number {
  let closed = 0;
  for (const session of [...sessions.values()]) {
    if (session === keep || session.owner) continue;
    if (session.frame !== undefined) cancelAnimationFrame(session.frame);
    sessions.delete(session.key);
    session.host.remove(); // Ruffle ends a player that leaves the document
    closed += 1;
  }
  return closed;
}

function newHost(): HTMLDivElement {
  const host = document.createElement("div");
  host.className = "crestron-xpanel-host";
  Object.assign(host.style, {
    position: "fixed", left: "-20000px", top: "0", width: "1280px", height: "800px",
    zIndex: "2", overflow: "hidden", background: "#000",
  });
  document.body.appendChild(host);
  return host;
}

/** Where import_panel put the panel's description, beside its XPanel. */
export function panelJsonUrl(xpanelUrl: string): string | undefined {
  const at = xpanelUrl.lastIndexOf("/xpanel/");
  return at < 0 ? undefined : `${xpanelUrl.slice(0, at)}/panel.json`;
}

/**
 * What the import says about the panel: its screen size, and the joins
 * that flip its pages (so the integration can show a panel opened now the
 * page the processor last chose). Without it the panel still runs, at the
 * usual size, starting on its own first page.
 */
export async function panelFacts(xpanelUrl: string):
    Promise<{ pages: number[]; size?: [number, number] }> {
  const url = panelJsonUrl(xpanelUrl);
  if (!url) return { pages: [] };
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) return { pages: [] };
    const doc = (await response.json()) as {
      page_joins?: Record<string, number>; size?: number[];
    };
    const pages = [...new Set(Object.values(doc.page_joins ?? {}))]
      .filter((j) => Number.isInteger(j) && j > 0).sort((a, b) => a - b);
    const [w, h] = doc.size ?? [];
    const size: [number, number] | undefined =
      w > 0 && h > 0 ? [w, h] : undefined;
    return { pages, size };
  } catch {
    return { pages: [] };
  }
}

/** Who the card asks xpanel_info about: a device, or an entry and panel. */
export function infoTarget(hass: HomeAssistant, config: XPanelCardConfig): Record<string, string> {
  if (config.device) return { device_id: resolveDeviceId(hass, config.device) };
  const target: Record<string, string> = { entry_id: config.entry_id! };
  if (config.panel) target.panel = config.panel;
  return target;
}

async function openSession(hass: HomeAssistant, config: XPanelCardConfig,
                           session: Session): Promise<void> {
  if (!hass.callWS) throw new Error("this frontend cannot send websocket commands");
  const info = await hass.callWS<XPanelInfo>({
    type: "crestron_cip/xpanel_info", ...infoTarget(hass, config) });
  const url = config.xpanel_url || info.xpanel_url;
  if (!url) {
    throw new Error(
      "This processor has no panel yet: add one under Settings → Devices & services "
      + "→ Crestron CIP → Configure, then pick the room's panel here.");
  }
  const { pages, size } = await panelFacts(url);
  if (size) {
    session.size = size;
    session.owner?.requestUpdate();
  }
  // The entry's own panel key rather than a signed path: a signed path
  // dies when Home Assistant restarts, and this panel outlives restarts.
  const query = new URLSearchParams({ key: info.key });
  if (pages.length) query.set("pages", pages.join(","));
  if (info.panel) query.set("panel", info.panel);
  const proxyUrl = relaySocketUrl(window.location, `${info.relay}?${query}`);
  if (config.debug) forwardConsole(hass);
  await loadRuffle(config.ruffle_url ?? DEFAULT_RUFFLE);
  const player = (window as unknown as RuffleGlobal).RufflePlayer!.newest().createPlayer();
  // The engine lays a panel out to the stage it is given, pixel for pixel,
  // as on the panel's own screen. So it is given exactly that screen, and
  // the whole picture is scaled to the card (see follow): any other stage
  // size crops the panel or leaves it in a corner.
  const [w, h] = session.size;
  Object.assign(player.style, {
    display: "block", position: "absolute", left: "0", top: "0",
    width: `${w}px`, height: `${h}px`, transformOrigin: "0 0",
  });
  session.player = player;
  session.host.replaceChildren(player);
  await player.ruffle().load(playerOptions(url, info, proxyUrl, config.debug));
}

/** Lay the host over the card's stage, every frame while a card owns it. */
function follow(session: Session): void {
  const step = () => {
    const owner = session.owner;
    if (!owner) {
      session.frame = undefined;
      return;
    }
    const rect = owner.stageRect();
    const style = session.host.style;
    if (rect && rect.width > 0) {
      style.left = `${rect.left}px`;
      style.top = `${rect.top}px`;
      style.width = `${rect.width}px`;
      style.height = `${rect.height}px`;
      if (session.player) {
        session.player.style.transform = `scale(${rect.width / session.size[0]})`;
      }
      // Never over Home Assistant's toolbar when the view scrolls under it.
      const header = owner.headerBottom();
      const hidden = Math.max(0, Math.min(rect.height, header - rect.top));
      style.clipPath = hidden > 0 ? `inset(${hidden}px 0 0 0)` : "";
      style.visibility = "visible";
    }
    session.frame = requestAnimationFrame(step);
  };
  session.frame ??= requestAnimationFrame(step);
}

/** The session for a card's panel, started if it is not running yet. */
function sessionFor(hass: HomeAssistant, config: XPanelCardConfig): Session {
  const target = Object.values(infoTarget(hass, config)).join(" ");
  const key = `${target} ${config.xpanel_url ?? "configured"}`;
  let session = sessions.get(key);
  if (!session) {
    const host = newHost();
    const created: Session = { key, host, ready: Promise.resolve(), size: DEFAULT_SIZE };
    created.ready = openSession(hass, config, created).catch((err: Error) => {
      // A failed start is not kept: the next card to show it tries again.
      if (sessions.get(key) === created) sessions.delete(key);
      host.remove();
      throw err;
    });
    sessions.set(key, created);
    session = created;
  }
  return session;
}

/** Every XPanel card in a dashboard's configuration set to run in the background. */
export function backgroundCards(config: unknown): XPanelCardConfig[] {
  const found: XPanelCardConfig[] = [];
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (node && typeof node === "object") {
      const card = node as XPanelCardConfig;
      if (card.type === `custom:${CARD}` && card.background && (card.device || card.entry_id)) {
        found.push(card);
      }
      Object.values(node).forEach(walk);
    }
  };
  walk(config);
  return found;
}

/**
 * Start the background panels of every dashboard, once per browser tab.
 *
 * A browser runs the panel itself, so each one has to load it; this does
 * that when Home Assistant opens rather than when the panel's view is
 * first shown. A user who may not list dashboards gets the panels of the
 * dashboard they opened.
 */
export async function startBackgroundPanels(hass: HomeAssistant): Promise<number> {
  if (!hass.callWS) return 0;
  let paths: (string | null)[];
  try {
    const dashboards = await hass.callWS<{ url_path: string; mode?: string }[]>(
      { type: "lovelace/dashboards/list" });
    paths = [null, ...dashboards.map((d) => d.url_path)];
  } catch {
    const first = window.location.pathname.split("/")[1];
    paths = [first && first !== "lovelace" ? first : null];
  }
  let started = 0;
  for (const path of paths) {
    let config: unknown;
    try {
      config = await hass.callWS(path ? { type: "lovelace/config", url_path: path }
                                      : { type: "lovelace/config" });
    } catch {
      continue; // a strategy dashboard, or one this user cannot read
    }
    for (const card of backgroundCards(config)) {
      sessionFor(hass, card).ready.catch(() => {});
      started += 1;
    }
  }
  return started;
}

function whenHassReady(): void {
  const root = document.querySelector("home-assistant") as (HTMLElement & { hass?: HomeAssistant }) | null;
  if (!root) return; // not Home Assistant's frontend (the tests)
  let tries = 0;
  const check = () => {
    if (isLowMemoryDevice(navigator)) return;
    if (root.hass?.callWS && root.hass.devices) {
      startBackgroundPanels(root.hass).catch(() => {});
    } else if (++tries < 120) {
      setTimeout(check, 500);
    }
  };
  check();
}

function park(session: Session): void {
  // Off screen at the size it had: hiding or shrinking it would make the
  // engine lay the panel out again, or stop drawing.
  session.host.style.left = "-20000px";
  session.host.style.clipPath = "";
}

class CrestronXPanelCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
  };

  hass?: HomeAssistant;
  private _config?: XPanelCardConfig;
  private _error?: string;
  private _session?: Session;

  setConfig(config: XPanelCardConfig): void {
    if (!config.device && !config.entry_id) {
      throw new Error("device (or entry_id) is required: the processor the XPanel connects to");
    }
    this._config = config;
    this._release();
  }

  getCardSize(): number {
    return 8;
  }

  /** A new card points at the first Crestron CIP processor there is. */
  static getStubConfig(hass?: HomeAssistant): Partial<XPanelCardConfig> {
    const entity = Object.values(hass?.entities ?? {}).find(
      (e) => e.platform === "crestron_cip" && e.device_id);
    return entity?.device_id ? { device: entity.device_id } : {};
  }

  /** Home Assistant's own card editor, from this schema. */
  static getConfigForm() {
    return {
      schema: [
        { name: "device", required: true,
          selector: { device: { filter: { integration: "crestron_cip" } } } },
        { name: "title", selector: { text: {} } },
        { name: "scale", selector: { number: { min: 0.1, max: 1, step: 0.05, mode: "slider" } } },
        { name: "background", selector: { boolean: {} } },
        { name: "xpanel_url", selector: { text: {} } },
      ],
      computeLabel: (field: { name: string }) => ({
        device: "Room panel (or processor)",
        title: "Title",
        scale: "Scale (of the size that fits the window)",
        background: "Load in the background when Home Assistant opens",
        xpanel_url: "Panel URL (leave empty to use the processor's configured panel)",
      } as Record<string, string>)[field.name] ?? field.name,
    };
  }

  /** Where the panel should be drawn, in the window. */
  stageRect(): DOMRect | undefined {
    return this.renderRoot.querySelector(".stage")?.getBoundingClientRect();
  }

  /** The bottom of Home Assistant's toolbar, in the window. */
  headerBottom(): number {
    const value = getComputedStyle(this).getPropertyValue("--header-height");
    return parseFloat(value) || 56;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // The panel keeps running; only this window onto it closes.
    this._release();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._session && this.hass && this._config && this.isConnected) this._attach();
  }

  private _release(): void {
    const session = this._session;
    this._session = undefined;
    if (session?.owner === this) {
      session.owner = undefined;
      park(session);
    }
  }

  private _attach(): void {
    const session = sessionFor(this.hass!, this._config!);
    if (isLowMemoryDevice(navigator)) closeOtherSessions(session);
    this._session = session;
    session.owner = this;
    this._error = undefined;
    follow(session);
    session.ready.catch((err: Error) => {
      if (this._session === session) this._error = err.message;
    });
  }

  override render() {
    if (!this._config) return nothing;
    // The panel's own proportions, from its import, unless set by hand.
    const size = this._session?.size ?? DEFAULT_SIZE;
    const ratio = this._config.aspect_ratio
      ? ratioOf(this._config.aspect_ratio) : size[0] / size[1];
    // The height left for the panel: the window, less Home Assistant's
    // toolbar, the card's title and a little breathing room.
    const chrome = this._config.title ? 140 : 88;
    const fit = this._config.fit_window === false
      ? "100%"
      : `min(100%, calc((100vh - var(--header-height, 56px) - ${chrome - 56}px) * ${ratio}))`;
    const scale = scaleOf(this._config.scale);
    const width = scale === 1 ? fit : `calc(${fit} * ${scale})`;
    return html`
      <ha-card .header=${this._config.title}>
        <div class="stage" style="aspect-ratio: ${ratio}; width: ${width}"></div>
        ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
      </ha-card>
    `;
  }

  static override styles = css`
    .stage {
      margin: 0 auto;
      background: #000;
      overflow: hidden;
    }
    .error {
      padding: 8px 12px;
      color: var(--error-color);
      font-size: 13px;
    }
  `;
}

// The integration loads this card on every page, and the card collection
// may load it again; the second copy stands down, or it would start every
// background panel twice.
if (!customElements.get(CARD)) {
  customElements.define(CARD, CrestronXPanelCard);
  whenHassReady();

  (window as unknown as { customCards?: unknown[] }).customCards ??= [];
  (window as unknown as { customCards: unknown[] }).customCards.push({
    type: CARD,
    name: "Crestron XPanel Card",
    description: "The panel's own compiled XPanel, running live against its processor.",
    preview: false,
    documentationURL: "https://github.com/rellis-erigon/Crestron-CIP-HA",
  });
}
