/**
 * crestron-panel-card — a Crestron touch panel, imported and rendered as a
 * card.
 *
 * The faceplate is not written by hand. The Crestron add-on reads the
 * panel's own compiled project — the same file that is loaded onto the
 * hardware — and generates a faceplate from it: every control at the
 * position and size the panel draws it, with the words it shows and the
 * join it binds. Roles are named after those joins (`button_101`,
 * `level_211`, `text_1`), so the card an operator ends up with is the
 * screen they already know rather than a fresh interpretation of it.
 *
 * Two consequences worth knowing.
 *
 * **Nothing is drawn as a control unless the project says what it does.**
 * A control bound only to a reserved join flips a page on the panel itself
 * and can never be driven from Home Assistant; it is rendered as inert
 * chrome instead. The layout stays right and no button lies about what it
 * will do.
 *
 * **A panel's states are faceplate pages.** The main screen of a real
 * panel is a frame of subpage references, several of which overlap and are
 * shown one at a time by a visibility join. Each becomes a page here, and
 * the references with no visibility join are always-on chrome.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { hiddenNote, prepare } from "../../core/prepare";
import { renderFaceplate, visibilityIsLive } from "../../core/faceplate";
import { cipEntryOf, deviceEntityIds, joinOfRole, parseJoin } from "../../core/bind";
import { cardTitle, runControlAction, DEFAULT_STEP } from "../../core/controls";
import {
  Faceplate, FaceplateCardConfig, FaceplateList, HomeAssistant, PanelDocument, Region,
} from "../../core/types";

const CARD = "crestron-panel-card";

/** A button press shorter than this is stretched to it. */
const MIN_PRESS_MS = 100;

/** Imported panels, by URL, shared by every card that shows one. */
const panels = new Map<string, Promise<PanelDocument>>();

function loadPanel(url: string): Promise<PanelDocument> {
  let pending = panels.get(url);
  if (!pending) {
    pending = fetch(url, { cache: "no-cache" }).then((response) => {
      if (!response.ok) throw new Error(`${url}: ${response.status}`);
      return response.json() as Promise<PanelDocument>;
    });
    // A failure is not cached: the file may be written a moment later.
    pending.catch(() => panels.delete(url));
    panels.set(url, pending);
  }
  return pending;
}

/** The service data that addresses a join, inside its SmartObject if any. */
function joinAddress(
  key: { obj: number; join: number }, entry: string,
): Record<string, number | string> {
  return key.obj
    ? { join: key.join, smart_object: key.obj, entry_id: entry }
    : { join: key.join, entry_id: entry };
}

function isDocument(panel: unknown): panel is PanelDocument {
  return (panel as PanelDocument | undefined)?.format === "crestron-panel";
}

class CrestronPanelCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
    _page: { state: true },
    _doc: { state: true },
    _picked: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;
  declare private _error?: string;
  /**
   * Which state of the panel is showing. An imported panel's main screen
   * is several overlapping subpages shown one at a time, so with nothing
   * selected the card drew the top and bottom bars and an empty middle.
   */
  declare private _page?: string;
  /** The panel loaded from `panel_url`. */
  declare private _doc?: PanelDocument;
  /** A screen chosen by hand, and when, so a later page flip can win. */
  declare private _picked?: { screen: string; at: string };
  private _docUrl?: string;
  /** Buttons held down: region id -> the press being sent, and when. */
  private _held = new Map<string, { sent: Promise<unknown>; at: number }>();

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    const url = config.panel_url;
    if (url && url !== this._docUrl) {
      this._docUrl = url;
      this._doc = undefined;
      loadPanel(url).then(
        (doc) => {
          if (this._docUrl === url) this._doc = doc;
        },
        (err) => this._notify(`Could not load the panel: ${err.message ?? err}`),
      );
    }
  }

  /** The entry to send joins through, when the device is a CIP processor. */
  private _entry(): string | undefined {
    if (!this.hass || !this._config?.device) return undefined;
    return cipEntryOf(this.hass, this._config.device);
  }

  /**
   * The screen the processor last flipped the panel to.
   *
   * A page join is pulsed, so it is normally off: what says which page is
   * showing is when each one last went high. One that is on now wins.
   */
  private _processorScreen(doc: PanelDocument): { screen: string; at: string } | undefined {
    if (!this.hass || !this._config?.device || !this._entry()) return undefined;
    const ids = deviceEntityIds(this.hass, this._config.device);
    let best: { screen: string; at: string } | undefined;
    for (const [screen, join] of Object.entries(doc.page_joins ?? {})) {
      const id = ids.find((x) => this.hass!.states[x]?.attributes?.join === `d${join}`);
      if (!id || !doc.screens[screen]) continue;
      const state = this.hass.states[id];
      const at = state.state === "on"
        ? "9999"
        : String(state.attributes.last_on ?? "");
      if (at && (!best || at > best.at)) best = { screen, at };
    }
    return best;
  }

  /** Which screen of a whole panel to draw. */
  private _screenOf(doc: PanelDocument): { screen: string; live: boolean } {
    const flipped = this._processorScreen(doc);
    const picked = this._picked && doc.screens[this._picked.screen] ? this._picked : undefined;
    if (flipped && (!picked || flipped.at > picked.at)) {
      return { screen: flipped.screen, live: true };
    }
    if (picked) return { screen: picked.screen, live: false };
    const wanted = this._config?.default_screen;
    const fallback = wanted && doc.screens[wanted]
      ? wanted
      : doc.screens[doc.default_screen] ? doc.default_screen : Object.keys(doc.screens)[0];
    return { screen: fallback, live: false };
  }

  /** Hold or release a button on a CIP processor, as the panel would. */
  private async _onPress(region: Region, down: boolean): Promise<void> {
    if (!this.hass || !this._config) return;
    const entry = this._entry();
    const key = parseJoin(joinOfRole(region.role) ?? "");
    const handBound = region.target && this._config.entities?.[region.target];
    if (!entry || handBound || key?.bus !== "d") {
      // Not a processor join: behave as a click, once, on the way down.
      if (down) await this._onAction(region);
      return;
    }
    const address = joinAddress(key, entry);
    if (down) {
      if (this._held.has(region.id)) return;
      const sent = this.hass.callService("crestron_cip", "set_digital", {
        ...address, value: true,
      });
      this._held.set(region.id, { sent, at: Date.now() });
      return;
    }
    const held = this._held.get(region.id);
    if (!held) return;
    this._held.delete(region.id);
    // Release only after the press has gone, and never sooner than a
    // processor's logic expects a press to last.
    await held.sent.catch(() => undefined);
    const wait = MIN_PRESS_MS - (Date.now() - held.at);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    await this.hass.callService("crestron_cip", "set_digital", {
      ...address, value: false,
    });
  }

  getCardSize(): number {
    return 4;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD}-editor`);
  }

  static getStubConfig(): FaceplateCardConfig {
    return {
      type: `custom:${CARD}`,
      faceplate: "",
    };
  }

  private _notify(message: string): void {
    this._error = message;
    setTimeout(() => {
      this._error = undefined;
    }, 4000);
  }

  /** The configured scale, or 1 for anything that is not a positive number. */
  private _scale(): number {
    const scale = Number(this._config?.scale ?? 1);
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }

  /** The state to draw: whatever is selected, else the panel's first. */
  private _currentPage(pages: string[] | undefined): string {
    if (!pages?.length) return "";
    return this._page && pages.includes(this._page) ? this._page : pages[0];
  }

  private async _onAction(region: Region, value?: number): Promise<void> {
    if (!this.hass || !this._config) return;
    // A page button switches the card's own state rather than asking the
    // processor to, because the panel's page flips run on joins the
    // control program never sees.
    if (region.action === "page" && region.target) {
      this._page = region.target;
      return;
    }
    // Pointed at a Crestron CIP processor, a control sends the join the
    // panel itself would. An entity the user bound by hand still wins.
    const entry = this._config.device
      ? cipEntryOf(this.hass, this._config.device)
      : undefined;
    const handBound = region.target && this._config.entities?.[region.target];
    if (entry && !handBound) {
      const key = parseJoin(joinOfRole(region.role) ?? "");
      if (key?.bus === "d") {
        await this.hass.callService("crestron_cip", "press", joinAddress(key, entry));
        return;
      }
      if (key?.bus === "a" && region.action === "set_level" && value !== undefined) {
        await this.hass.callService("crestron_cip", "set_analog", {
          ...joinAddress(key, entry),
          value: Math.round(Math.min(65535, Math.max(0, value))),
        });
        return;
      }
    }
    await runControlAction(
      this.hass,
      this._config.entities,
      region,
      (message) => this._notify(message),
      Number(this._config.step ?? DEFAULT_STEP),
      value,
    );
  }

  /**
   * A Subpage Reference List, drawn where the panel draws it: each item at
   * the list's height, side by side, scrolling when they do not all fit —
   * sixteen zone strips across a screen that shows six.
   */
  private _renderList(
    list: FaceplateList, screen: Faceplate, bindings: Record<string, string>, cip: boolean,
  ): TemplateResult {
    const [width, height] = screen.size;
    const pct = (v: number, of: number) => `${(v / of) * 100}%`;
    const box = [
      `left:${pct(list.x, width)}`, `top:${pct(list.y, height)}`,
      `width:${pct(list.w, width)}`, `height:${pct(list.h, height)}`,
      // Spacing and margin are in panel units and have to scale with the
      // screen. A flex gap's percentage is of the list's own content box;
      // padding's is of the screen's width.
      `--gap:${(list.spacing / Math.max(1, list.w - 2 * list.margin)) * 100}%`,
      `--pad:${pct(list.margin, width)}`,
      list.background ? `background:${list.background}` : "",
    ].filter(Boolean).join(";");
    const [itemW, itemH] = list.item_size;
    return html`<div class="list ${list.orientation}" style=${box}>
      ${list.items.map((item) => html`<div class="item" style=${`aspect-ratio:${itemW}/${itemH}`}>
        ${renderFaceplate({
          hass: this.hass!,
          faceplate: { ...screen, size: list.item_size, regions: item.regions, pages: undefined, lists: undefined },
          bindings,
          page: "",
          onAction: (region, value) => void this._onAction(region, value),
          onPress: cip ? (region, down) => void this._onPress(region, down) : undefined,
          unreportedIsOff: cip,
        })}
      </div>`)}
    </div>`;
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const name = cardTitle(this.hass, this._config);
    // An imported panel travels in the config or is loaded from a URL;
    // there is nothing in the catalogue to look up.
    const source = this._config.panel_url ? this._doc : this._config.panel;
    let panel: Faceplate | undefined;
    let screens: string[] = [];
    let screen = "";
    let flipped = false;
    if (isDocument(source)) {
      ({ screen, live: flipped } = this._screenOf(source));
      panel = source.screens[screen];
      screens = Object.keys(source.screens);
    } else {
      panel = source;
    }
    if (!panel) {
      return html`<ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        <div class="hint">
          ${this._config.panel_url
            ? "Loading the panel…"
            : "No panel loaded. Import the panel's project with the " +
              "crestron_cip.import_panel action and set panel_url."}
        </div>
      </ha-card>`;
    }
    // A list's items bind like any other control, so they are resolved
    // with the screen and drawn apart from it.
    const lists = panel.lists ?? [];
    const itemIds = new Set(lists.flatMap((l) => l.items.flatMap((i) => i.regions.map((r) => r.id))));
    const { faceplate: drawn, bindings, roles, hidden } = prepare(
      this.hass,
      this._config,
      lists.length
        ? { ...panel, regions: [...panel.regions, ...lists.flatMap((l) => l.items.flatMap((i) => i.regions))] }
        : panel,
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
    const faceplate = lists.length
      ? { ...drawn, regions: drawn.regions.filter((r) => !itemIds.has(r.id)) }
      : drawn;
    const bound = roles.filter((role) => bindings[role]).length;

    // Nothing bound and hiding on means there is nothing to draw at
    // all. With hiding off the user has asked for the full panel, dark
    // controls included, so it is still drawn.
    const blank = bound === 0 && this._config.hide_unbound !== false;

    const pages = faceplate.pages;
    const page = this._currentPage(pages);
    // Once every subpage's visibility join has an entity behind it, the
    // panel decides what is on screen and choosing by hand would only
    // fight it.
    const cip = Boolean(this._entry());
    const live = visibilityIsLive(faceplate, bindings, cip);

    return html`
      <ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        ${screens.length > 1 && !flipped
          ? html`<div class="pages screens">
              ${screens.map(
                (candidate) => html`<button
                  class=${candidate === screen ? "on" : ""}
                  @click=${() => {
                    this._picked = { screen: candidate, at: new Date().toISOString() };
                  }}
                >
                  ${candidate}
                </button>`,
              )}
            </div>`
          : nothing}
        ${pages && pages.length > 1 && !blank && !live
          ? html`<div class="pages">
              ${pages.map(
                (candidate) => html`<button
                  class=${candidate === page ? "on" : ""}
                  @click=${() => {
                    this._page = candidate;
                  }}
                >
                  ${candidate}
                </button>`,
              )}
            </div>`
          : nothing}
        ${blank
          ? nothing
          : html`<div class="frame" style=${`--faceplate-scale:${this._scale()}`}>
          <div class="screen">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page,
            onAction: (region, value) => void this._onAction(region, value),
            onPress: cip
              ? (region, down) => void this._onPress(region, down)
              : undefined,
            unreportedIsOff: cip,
          })}
          ${lists.map((list) => this._renderList(list, faceplate, bindings, cip))}
          </div>
        </div>`}
        ${this._error ? html`<div class="hint">${this._error}</div>` : nothing}
        ${hidden && bound > 0
          ? html`<div class="hint muted">${hiddenNote(hidden)}</div>`
          : nothing}
        ${bound === 0
          ? html`<div class="hint">
              Nothing on this panel is bound. Point the card at the
              processor's device with <code>device:</code>.
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  static override styles = css`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .screen {
      position: relative;
      width: 100%;
      max-width: calc(var(--faceplate-width, 100000px) * var(--faceplate-scale, 1));
      margin: 0 auto;
    }
    .list {
      position: absolute;
      display: flex;
      box-sizing: border-box;
      gap: var(--gap, 0);
      padding: var(--pad, 0);
      overflow: auto;
      scrollbar-width: thin;
    }
    .list.horizontal {
      flex-direction: row;
    }
    .list.vertical {
      flex-direction: column;
    }
    .list .item {
      flex: 0 0 auto;
      height: 100%;
    }
    .list.vertical .item {
      width: 100%;
      height: auto;
    }
    .list .item .faceplate {
      width: 100%;
      height: 100%;
      max-width: none;
    }
    /* Held, not clicked: a long press must not scroll the dashboard or
       open the browser's context menu halfway through a volume ramp. */
    .button {
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: calc(var(--faceplate-width, 100000px) * var(--faceplate-scale, 1));
      margin: 0 auto;
    }
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #8b93a1;
      font-family: inherit;
      letter-spacing: 1px;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    .bar-track {
      fill: #23262c;
    }
    .bar-fill {
      fill: #4ea1ff;
    }
    .bar-hit,
    .fader-hit {
      cursor: pointer;
    }
    /* A console fader: slotted track, travelled section, moulded cap. */
    .fader-slot {
      fill: #0a0c0f;
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-travelled {
      fill: #2b6fb5;
    }
    .fader-tick {
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-cap {
      fill: #d7dce3;
      stroke: #8f97a3;
      stroke-width: 1;
    }
    .fader-line {
      stroke: #3d434c;
      stroke-width: 2;
    }
    .fader.dark .fader-cap {
      fill: #4a5058;
      stroke: #3a4048;
    }
    .fader.dark .fader-travelled {
      fill: #253241;
    }
    /* Strip labels sit on the backlit scribble plate. */
    .display-negative .lcd-value.chrome {
      fill: #cdd3dc;
    }
    /* An imported panel is usually a pale screen, which is the opposite
       of the dark instrument faces the hand-drawn faceplates emulate.
       Only the dark case was ever styled here, so a white panel drew its
       text in the theme's own colour — light on light, and invisible. */
    .display-positive .lcd-value {
      fill: #11161c;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-positive .lcd-label,
    .display-positive .lcd-value.chrome {
      fill: #333b45;
      font-family: inherit;
      letter-spacing: 0.4px;
      font-weight: 500;
    }
    .display-positive .lcd-value.dark {
      fill: #9aa3ad;
    }
    .display-positive .lcd-value.stale {
      fill: #8a6410;
    }
    .display-positive .plate-label {
      fill: #333b45;
    }
    /* A button whose face comes from the project draws its own artwork.
       The chassis fill underneath it is for buttons that have none, and
       on a pale panel it would be a dark block where the real one is a
       light key. The panel's own unlit face lives compiled inside a theme
       SWF and cannot be pulled out, so this is a neutral stand-in. */
    .display-positive .button.art rect {
      fill: rgba(16, 22, 30, 0.05);
      stroke: rgba(16, 22, 30, 0.14);
    }
    .display-positive .button.art text {
      fill: #11161c;
    }
    .display-positive .button:not(.art) rect {
      fill: #e9edf2;
      stroke: #c6ccd4;
    }
    .display-positive .button:not(.art) text {
      fill: #11161c;
    }
    .display-positive .button:hover rect {
      fill: rgba(16, 22, 30, 0.12);
    }
    .display-positive .bar-track {
      fill: rgba(16, 22, 30, 0.10);
    }
    /* Panel chrome from an imported project: borders, fills and the
       boxes where artwork sat. Fill and stroke arrive as attributes on
       the element, carried over from the panel's own colours, so nothing
       here may set either — a stylesheet rule would override them. */
    .plate {
      stroke-width: 1;
    }
    .plate-label {
      font-family: inherit;
      letter-spacing: 0.5px;
      opacity: 0.75;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .button rect {
      fill: #23262c;
      stroke: #343942;
    }
    .button text {
      fill: #cdd3dc;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .button:hover rect {
      fill: #2d323a;
    }
    .button {
      cursor: pointer;
    }
    /* The panel's own states. A real panel switches these on a join the
       control program drives; a card has no such signal, so they are
       offered as what they are — the screens this panel has. */
    .pages {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 0 4px 8px;
    }
    .pages button {
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.6px;
      padding: 3px 9px;
      cursor: pointer;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border: 1px solid transparent;
      border-radius: 11px;
    }
    .pages button.on {
      color: var(--primary-text-color);
      border-color: var(--primary-color);
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

customElements.define(CARD, CrestronPanelCard);
defineFaceplateEditor(CARD, {
  numbers: [{ key: "step", label: "Trim step (dB)", min: 0.5, max: 12, step: 0.5 }],
});

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Crestron Panel Card",
  description: "Your own XPanel project, imported and rendered as a card.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
