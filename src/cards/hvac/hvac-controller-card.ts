/**
 * hvac-controller-card — a wall controller that behaves like one.
 *
 * Shows a selectable controller faceplate and, unlike a display-only card,
 * its keys do what the real keys do: change the setpoint, turn the unit on
 * and off, cycle the mode.
 *
 * Binds either to a single `climate` entity, or to individual entities per
 * role where the unit reaches Home Assistant as BMS points rather than as a
 * climate entity. Which of the two a site has is not knowable from here, so
 * both are supported.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { cardTitle } from "../../core/controls";
import { hiddenNote, prepare } from "../../core/prepare";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds, readClimate } from "../../core/bind";
import { getFaceplate } from "../../faceplates/index";
import { Assessment, Change, ClimateState, Setting, assess } from "../../core/change-confirm";
import {
  FaceplateCardConfig,
  HomeAssistant,
  Region,
} from "../../core/types";

const CARD = "hvac-controller-card";

const MODES = ["off", "cool", "heat", "dry", "fan_only", "auto"];

/** "fan_only" as "Fan only". */
const pretty = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");

class HvacControllerCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _page: { state: true },
    _change: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;

  constructor() {
    super();
    this._page = "";
  }

  /** The newest change asked of the unit, followed until it has taken. */
  declare private _change?: Change;
  private _told = "";
  private _tick?: number;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick !== undefined) window.clearInterval(this._tick);
    this._tick = undefined;
  }

  /** Ask for a change and follow it: sending, then the unit's answer. */
  private async _send(
    label: string,
    target: string,
    settings: Setting[],
    want: (state: ClimateState) => boolean,
    call: () => Promise<unknown>
  ): Promise<void> {
    const change: Change = { label, target, settings, want, at: Date.now() };
    this._change = change;
    this._told = "";
    // Re-check once a second: a unit that never answers has to be noticed
    // even when nothing else changes on the page.
    if (this._tick === undefined) {
      this._tick = window.setInterval(() => this.requestUpdate(), 1000);
    }
    try {
      await call();
      change.sent = true;
    } catch (err) {
      change.refused = (err as { message?: string })?.message ?? String(err);
    }
    this.requestUpdate();
  }

  private _assessment(): Assessment | undefined {
    const change = this._change;
    const climate = this._config?.climate;
    if (!change || !climate || !this.hass) return undefined;
    const result = assess(change, this.hass.states[climate] as ClimateState | undefined,
                          Date.now());
    const settled = result.phase === "confirmed" || result.phase === "failed";
    if (settled && this._told !== result.phase) {
      // A toast too, so the answer is seen even if the page has moved on.
      this._told = result.phase;
      const name = cardTitle(this.hass, this._config!) ?? "AC";
      this._notify(`${name}: ${result.text}`);
      if (this._tick !== undefined) window.clearInterval(this._tick);
      this._tick = undefined;
      // A confirmation stays up a while; a failure until the next change
      // or until it is dismissed.
      if (result.phase === "confirmed") {
        window.setTimeout(() => {
          if (this._change === change) this._change = undefined;
        }, 15000);
      }
    }
    return result;
  }

  private _status(): TemplateResult | typeof nothing {
    const result = this._assessment();
    if (!result) return nothing;
    const icon = {
      sending: "mdi:send-clock",
      held: "mdi:timer-sand",
      waiting: "mdi:progress-clock",
      confirmed: "mdi:check-circle",
      failed: "mdi:alert-circle",
    }[result.phase];
    return html`<div class="change ${result.phase}" role="status" aria-live="polite">
      <ha-icon icon=${icon}></ha-icon>
      <span>${result.text}</span>
      ${result.phase === "failed"
        ? html`<button class="dismiss" title="Dismiss"
                 @click=${() => { this._change = undefined; }}>✕</button>`
        : nothing}
    </div>`;
  }

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    // Deliberately no throw for a missing binding. Home Assistant calls
    // setConfig with the stub config to preview the card in the picker, and
    // throwing there shows "Configuration error" instead of the card. A
    // card with nothing bound renders dark and says what it needs.
    this._config = config;
    const faceplate = getFaceplate(CARD, config.faceplate);
    this._page = (config as { page?: string }).page
      ?? faceplate.pages?.[0] ?? "";
  }

  getCardSize(): number {
    return 5;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD}-editor`);
  }

  static getStubConfig(): FaceplateCardConfig {
    return { type: `custom:${CARD}`, faceplate: "daikin-brc1e63" };
  }

  /** The setpoint the keys act on, whichever way the unit is bound. */
  private _setpoint(): number | undefined {
    if (!this.hass || !this._config) return undefined;
    if (this._config.climate) {
      return readClimate(this.hass, this._config.climate, "setpoint").value;
    }
    const entity = this._config.entities?.setpoint;
    return entity ? Number(this.hass.states[entity]?.state) : undefined;
  }

  /** Role to entity, as the last render resolved it.
   *
   * Kept because one action does not go through the climate entity: the
   * filter sign is cleared by pressing a button on the unit, and there is
   * no climate service for it.
   */
  private _bindings: Record<string, string> = {};

  /** The page being shown. Empty until a faceplate with pages is set.
   *
   * The indoor-unit face grew a second page for the points no face drew —
   * accumulators, ventilation, the wall-controller locks. Without this the
   * card asked for page "" and every region pinned to a page vanished,
   * leaving the chassis and the keys.
   */
  declare private _page: string;

  private async _onAction(region: Region): Promise<void> {
    if (!this.hass || !this._config) return;
    const climate = this._config.climate;

    // Paging changes nothing on the unit, so it happens whatever the card
    // is bound to — including a read-only one, which is exactly where the
    // second page of readings is worth turning to.
    if (region.action === "page" || region.action === "next_page"
        || region.action === "prev_page") {
      const pages = getFaceplate(CARD, this._config.faceplate).pages ?? [];
      if (!pages.length) return;
      if (region.action === "page" && region.target) {
        this._page = region.target;
        return;
      }
      const index = pages.indexOf(this._page);
      const step = region.action === "prev_page" ? -1 : 1;
      this._page = pages[(index + step + pages.length) % pages.length];
      return;
    }

    // Before the climate guard: this one needs a button, not a thermostat,
    // so a read-only unit can still have its filter sign cleared.
    if (region.action === "filter_reset") {
      const entity = this._bindings.filter_reset;
      if (!entity) {
        this._notify(
          "No filter-reset button on this unit. The bridge only offers one " +
          "where writing is enabled."
        );
        return;
      }
      // Say which of the two happened. Pressing a reset on a unit whose
      // sign is already clear is a write that changes nothing, and
      // reporting "cleared" either way is how a working key looks broken.
      const sign = this._bindings.filter;
      const dirty = sign
        ? this.hass.states[sign]?.state === "on"
        : undefined;
      if (dirty === false) {
        this._notify("No filter sign on this unit — nothing to clear.");
        return;
      }
      await this.hass.callService("button", "press", { entity_id: entity });
      this._notify(
        dirty ? "Filter sign cleared." : "Filter reset sent."
      );
      return;
    }

    // Without a climate entity there is nothing safe to call: a BMS setpoint
    // point may not even be writable. Saying so beats a silent no-op.
    if (!climate) {
      this._notify("This controller is read-only — no climate entity is set.");
      return;
    }

    const step = 0.5;
    const current = this._setpoint();

    switch (region.action) {
      case "temp_up":
      case "temp_down": {
        if (current === undefined) return;
        const delta = region.action === "temp_up" ? step : -step;
        const temperature = Math.round((current + delta) * 2) / 2;
        await this._send("Setpoint", `${temperature}°`, ["temperature"],
          (s) => Number(s.attributes.temperature) === temperature,
          () => this.hass!.callService("climate", "set_temperature", {
            entity_id: climate, temperature,
          }));
        return;
      }
      case "power_toggle": {
        const on = this.hass.states[climate]?.state !== "off";
        await this._send("Power", on ? "Off" : "On", ["power"],
          (s) => (s.state === "off") === on,
          () => this.hass!.callService("climate", on ? "turn_off" : "turn_on", {
            entity_id: climate,
          }));
        return;
      }
      case "fan_cycle": {
        const modes =
          (this.hass.states[climate]?.attributes.fan_modes as string[]) ?? [];
        if (!modes.length) return;
        const now = this.hass.states[climate]?.attributes.fan_mode as string;
        const next = modes[(modes.indexOf(now) + 1) % modes.length];
        await this._setFan(climate, next);
        return;
      }
      case "mode_cycle": {
        const modes =
          (this.hass.states[climate]?.attributes.hvac_modes as string[]) ?? MODES;
        const now = this.hass.states[climate]?.state ?? modes[0];
        const next = modes[(modes.indexOf(now) + 1) % modes.length];
        await this._setMode(climate, next);
        return;
      }
      default:
        return;
    }
  }

  private _setMode(climate: string, mode: string): Promise<void> {
    // A unit in Auto reports the Cool or Heat it has chosen, never Auto.
    const want = mode === "auto"
      ? (s: ClimateState) => ["auto", "cool", "heat", "heat_cool"].includes(s.state)
      : (s: ClimateState) => s.state === mode;
    return this._send("Mode", pretty(mode),
      mode === "off" ? ["power"] : ["hvac_mode", "power"], want,
      () => this.hass!.callService("climate", "set_hvac_mode", {
        entity_id: climate, hvac_mode: mode,
      }));
  }

  private _setFan(climate: string, fan: string): Promise<void> {
    return this._send("Fan", pretty(fan), ["fan_mode"],
      (s) => s.attributes.fan_mode === fan,
      () => this.hass!.callService("climate", "set_fan_mode", {
        entity_id: climate, fan_mode: fan,
      }));
  }

  /** Mode and fan as drop-downs, because stepping through four is poor. */
  private _selects(): TemplateResult | typeof nothing {
    const climate = this._config?.climate;
    if (!this.hass || !climate) return nothing;
    const state = this.hass.states[climate];
    if (!state) return nothing;

    const rows: TemplateResult[] = [];
    const add = (
      label: string,
      options: string[],
      current: string | undefined,
      onPick: (value: string) => void
    ) => {
      if (!options.length) return;
      rows.push(html`
        <label>
          <span>${label}</span>
          <select
            .value=${current ?? ""}
            @change=${(event: Event) => {
              const value = (event.target as HTMLSelectElement).value;
              if (value && value !== current) onPick(value);
            }}
          >
            ${options.map(
              (option) => html`<option
                value=${option}
                ?selected=${option === current}
              >${option}</option>`
            )}
          </select>
        </label>
      `);
    };

    add(
      "Mode",
      (state.attributes.hvac_modes as string[]) ?? [],
      state.state,
      (value) => void this._setMode(climate, value)
    );
    add(
      "Fan",
      (state.attributes.fan_modes as string[]) ?? [],
      state.attributes.fan_mode as string | undefined,
      (value) => void this._setFan(climate, value)
    );

    return rows.length ? html`<div class="picks">${rows}</div>` : nothing;
  }

  /** The unit's model and rated duty, where the climate entity carries
   * them (an integration that knows the model sets `model`,
   * `rated_cooling_kw` and `rated_heating_kw`). */
  private _spec(): TemplateResult | typeof nothing {
    const climate = this._config?.climate;
    const attrs = climate ? this.hass?.states[climate]?.attributes : undefined;
    if (!attrs?.model) return nothing;
    const kw = (value: unknown, what: string) =>
      typeof value === "number" ? html`<span>${what} <b>${value.toFixed(1)} kW</b></span>` : nothing;
    return html`<div class="spec">
      <span class="model">${attrs.model}</span>
      ${kw(attrs.rated_cooling_kw, "Cool")}
      ${kw(attrs.rated_heating_kw, "Heat")}
    </div>`;
  }

  private _notify(message: string): void {
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const { faceplate, bindings, roles, hidden } = prepare(
      this.hass,
      // A climate entity supplies every role from its attributes, so
      // nothing is "unbound" and there is nothing to hide.
      this._config.climate
        ? { ...this._config, hide_unbound: false }
        : this._config,
      getFaceplate(CARD, this._config.faceplate),
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );

    this._bindings = bindings;

    const bound = this._config.climate
      ? roles.length
      : roles.filter((role) => bindings[role]).length;
    // Nothing bound and hiding on means there is nothing to draw at
    // all. With hiding off the user has asked for the full panel, dark
    // controls included, so it is still drawn.
    const blank = bound === 0 && this._config.hide_unbound !== false;
    const name = cardTitle(this.hass, this._config);

    return html`
      <ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        ${this._spec()}
        ${this._status()}
        ${!this._config.climate && !this._config.entities
          ? html`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`
          : nothing}
        ${hidden && bound > 0
          ? html`<div class="hint muted">${hiddenNote(hidden)}</div>`
          : nothing}
        ${blank
          ? nothing
          : html`<div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            climate: this._config.climate,
            faceplate,
            bindings,
            page: this._page,
            onAction: (region) => void this._onAction(region),
          })}
        </div>
        ${this._selects()}`}
      </ha-card>
    `;
  }

  static override styles = css`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    /* Mode and fan sit under the drawn panel: SVG has no select, and a
       native one is what works with a thumb on a phone. */
    .picks {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .picks label {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 140px;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    .picks select {
      flex: 1;
      min-width: 0;
      padding: 7px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--card-background-color, #1b2027);
      color: var(--primary-text-color, #e8edf3);
      font: inherit;
      font-size: 13px;
    }
    .title {
      font-weight: 600;
      font-size: 24px;
      line-height: 1.25;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .spec {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 24px;
      margin: -2px 0 12px;
      padding: 0 10px;
      font-size: 24px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .spec .model {
      font-family: var(--code-font-family, monospace);
      color: var(--primary-text-color);
    }
    .spec b { color: var(--primary-text-color); font-weight: 600; }
    .change {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 10px;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 16px;
      line-height: 1.3;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 4px solid var(--info-color, #039be5);
    }
    .change ha-icon { flex: none; --mdc-icon-size: 22px; }
    .change span { flex: 1; }
    .change.sending ha-icon, .change.waiting ha-icon, .change.held ha-icon {
      color: var(--info-color, #039be5);
    }
    .change.confirmed { border-left-color: var(--success-color, #43a047); }
    .change.confirmed ha-icon { color: var(--success-color, #43a047); }
    .change.failed { border-left-color: var(--error-color, #db4437); }
    .change.failed ha-icon { color: var(--error-color, #db4437); }
    .change .dismiss {
      border: 0; background: none; cursor: pointer; font: inherit;
      color: var(--secondary-text-color); padding: 0 4px;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Grow with the card, as tall as the screen allows and no taller.
         A fixed 520px cap was right for a card a quarter of the page wide;
         in a room grid spanning the page it stopped the panel growing and
         left it small and centred in a wide card. The allowance is the
         top bar, the title and the mode and fan row. */
      max-height: calc(100vh - 170px);
      min-height: 0;
    }
    /* Daikin's dark controllers render cyan on black. Fixed, not themed:
       a display that follows the dashboard stops reading as hardware. */
    .display-negative .lcd-value {
      fill: #6fe3ea;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 500;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #7f9aa0;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #33484d;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Positive LCD: dark text on a pale backlight, as the BRC1E has. */
    .display-positive .lcd-value {
      fill: #26302a;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 600;
    }
    .display-positive .lcd-label,
    .display-positive .lcd-value.chrome {
      fill: #46543f;
      font-family: inherit;
      font-weight: 400;
    }
    .display-positive .lcd-value.dark {
      fill: #8b9a85;
    }
    .display-positive .lcd-value.stale {
      fill: #9a6b1f;
    }
    .brc2-brand {
      fill: #4a5057;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .brc315-brand {
      fill: #3a4046;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .brc315-onoff {
      fill: #3a4046;
      font-size: 14px;
      font-weight: 600;
    }
    .brc315-ring {
      fill: #3d4838;
      font-size: 8px;
    }
    .brc315-icon {
      fill: #3d4838;
      font-size: 12px;
    }
    .brc-glyph {
      font-size: 15px;
      fill: #3a4046;
    }
    .brc-enter {
      font-size: 22px;
      fill: #3a4046;
    }
    .brc-brand {
      fill: #2f3439;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .madoka-brand {
      fill: #2d3238;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .ring.lit {
      filter: drop-shadow(0 0 7px #2f8fff);
    }
    .button rect {
      fill: transparent;
      stroke: none;
    }
    .button text {
      fill: #8fa8ad;
      font-size: 22px;
      pointer-events: none;
    }
    .button:hover text {
      fill: #cfeef2;
    }
    .button {
      cursor: pointer;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 2px 4px 10px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

customElements.define(CARD, HvacControllerCard);
defineFaceplateEditor(CARD);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "HVAC Controller Card",
  description: "A wall controller that looks and behaves like the real one.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
