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
import { renderFaceplate } from "../../core/faceplate";
import { readClimate, resolveRoles } from "../../core/bind";
import { faceplatesFor, getFaceplate } from "../../faceplates/index";
import {
  Faceplate,
  FaceplateCardConfig,
  HomeAssistant,
  Region,
} from "../../core/types";

const CARD = "hvac-controller-card";

const MODES = ["off", "cool", "heat", "dry", "fan_only", "auto"];

class HvacControllerCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    // Deliberately no throw for a missing binding. Home Assistant calls
    // setConfig with the stub config to preview the card in the picker, and
    // throwing there shows "Configuration error" instead of the card. A
    // card with nothing bound renders dark and says what it needs.
    this._config = config;
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

  private _faceplate(): Faceplate {
    return getFaceplate(CARD, this._config?.faceplate);
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

  private async _onAction(region: Region): Promise<void> {
    if (!this.hass || !this._config) return;
    const climate = this._config.climate;

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
        await this.hass.callService("climate", "set_temperature", {
          entity_id: climate,
          temperature: Math.round((current + delta) * 2) / 2,
        });
        return;
      }
      case "power_toggle": {
        const on = this.hass.states[climate]?.state !== "off";
        await this.hass.callService("climate", on ? "turn_off" : "turn_on", {
          entity_id: climate,
        });
        return;
      }
      case "fan_cycle": {
        const modes =
          (this.hass.states[climate]?.attributes.fan_modes as string[]) ?? [];
        if (!modes.length) return;
        const now = this.hass.states[climate]?.attributes.fan_mode as string;
        const next = modes[(modes.indexOf(now) + 1) % modes.length];
        await this.hass.callService("climate", "set_fan_mode", {
          entity_id: climate,
          fan_mode: next,
        });
        return;
      }
      case "mode_cycle": {
        const modes =
          (this.hass.states[climate]?.attributes.hvac_modes as string[]) ?? MODES;
        const now = this.hass.states[climate]?.state ?? modes[0];
        const next = modes[(modes.indexOf(now) + 1) % modes.length];
        await this.hass.callService("climate", "set_hvac_mode", {
          entity_id: climate,
          hvac_mode: next,
        });
        return;
      }
      default:
        return;
    }
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
    const faceplate = this._faceplate();
    const roles = [...new Set(faceplate.regions.map((r) => r.role))].filter(Boolean);
    const bindings = resolveRoles(this.hass, roles, this._config.entities ?? {});

    return html`
      <ha-card>
        ${this._config.name
          ? html`<div class="title">${this._config.name}</div>`
          : nothing}
        ${!this._config.climate && !this._config.entities
          ? html`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`
          : nothing}
        <div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            climate: this._config.climate,
            faceplate,
            bindings,
            page: "",
            onAction: (region) => void this._onAction(region),
          })}
        </div>
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
      padding: 0 4px 8px;
      color: var(--primary-text-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      max-height: 520px;
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
    .hint {
      padding: 2px 4px 10px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

class HvacControllerCardEditor extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;

  setConfig(config: FaceplateCardConfig): void {
    this._config = config;
  }

  private _emit(changes: Partial<FaceplateCardConfig>): void {
    const config = { ...this._config, ...changes } as FaceplateCardConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const options = faceplatesFor(CARD);
    const current = getFaceplate(CARD, this._config.faceplate);
    const climates = Object.keys(this.hass.states)
      .filter((id) => id.startsWith("climate."))
      .sort();

    return html`
      <div class="editor">
        <label>
          Controller
          <select @change=${(e: Event) =>
            this._emit({ faceplate: (e.target as HTMLSelectElement).value })}>
            ${options.map(
              (f) => html`<option value=${f.id} ?selected=${f.id === current.id}>
                ${f.name}
              </option>`
            )}
          </select>
        </label>
        <p class="note">${current.description ?? ""}</p>
        <label>
          Climate entity
          <select @change=${(e: Event) =>
            this._emit({ climate: (e.target as HTMLSelectElement).value })}>
            <option value="">— none —</option>
            ${climates.map(
              (id) => html`<option value=${id} ?selected=${id === this._config?.climate}>
                ${id}
              </option>`
            )}
          </select>
        </label>
        ${climates.length
          ? nothing
          : html`<p class="warn">
              No climate entities exist on this system. Without one the
              controller is read-only, and its readings must be mapped
              per-role in YAML.
            </p>`}
        ${current.emulates
          ? html`<p class="note">Emulates ${current.emulates}. Product names
              and marks belong to their respective owners.</p>`
          : nothing}
      </div>
    `;
  }

  static override styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    select {
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font: inherit;
    }
    .note {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn {
      margin: 0;
      font-size: 12px;
      color: var(--warning-color, #d98600);
    }
  `;
}

customElements.define(CARD, HvacControllerCard);
customElements.define(`${CARD}-editor`, HvacControllerCardEditor);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "HVAC Controller Card",
  description: "A wall controller that looks and behaves like the real one.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-Cards",
});
