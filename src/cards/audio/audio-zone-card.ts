/**
 * audio-zone-card — a rack of audio zone strips, and the controls to work
 * them.
 *
 * Built for the Q-SYS bridge, which exposes each zone as exactly two
 * entities: a `number` carrying gain in dB and a `switch` carrying mute.
 * Roles follow that shape — `zone1_volume`, `zone1_mute` — so a Core with
 * sixteen zones needs one card, not sixteen.
 *
 * Unlike the meter and pump cards this one writes. Mute toggles the switch;
 * the trim keys step the number entity, clamped to the range the entity
 * itself declares so the card can never drive a fader past its staging.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds, resolveRoles } from "../../core/bind";
import { faceplatesFor, getFaceplate, resolveFaceplate } from "../../faceplates/index";
import { runControlAction, withLabels, DEFAULT_STEP } from "../../core/controls";
import { Faceplate, FaceplateCardConfig, HomeAssistant, Region } from "../../core/types";

const CARD = "audio-zone-card";

class AudioZoneCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;
  declare private _error?: string;

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
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
      faceplate: "qsys-zone-rack",
      options: { zones: 4 },
    };
  }

  private _faceplate(): Faceplate {
    return resolveFaceplate(
      getFaceplate(CARD, this._config?.faceplate),
      this._config?.options ?? {}
    );
  }

  private _notify(message: string): void {
    this._error = message;
    setTimeout(() => {
      this._error = undefined;
    }, 4000);
  }

  private async _onAction(region: Region): Promise<void> {
    if (!this.hass || !this._config) return;
    await runControlAction(
      this.hass,
      this._config.entities,
      region,
      (message) => this._notify(message),
      Number(this._config.step ?? DEFAULT_STEP),
    );
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const faceplate = withLabels(this._faceplate(), this._config.labels, "zone");
    const roles = [...new Set(faceplate.regions.map((r) => r.role))].filter(Boolean);
    const bindings = resolveRoles(
      this.hass,
      roles,
      this._config.entities ?? {},
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
    const bound = roles.filter((role) => bindings[role]).length;

    return html`
      <ha-card>
        ${this._config.name
          ? html`<div class="title">${this._config.name}</div>`
          : nothing}
        <div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page: "",
            onAction: (region) => void this._onAction(region),
          })}
        </div>
        ${this._error ? html`<div class="hint">${this._error}</div>` : nothing}
        ${bound === 0
          ? html`<div class="hint">
              Nothing bound. Map <code>zone1_volume</code> and
              <code>zone1_mute</code> in YAML, or generate the card from the
              Q-SYS add-on.
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
      padding: 0 4px 8px;
      color: var(--primary-text-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
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
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

class AudioZoneCardEditor extends LitElement {
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
    if (!this._config) return nothing;
    const options = faceplatesFor(CARD);
    const current = getFaceplate(CARD, this._config.faceplate);
    const values = this._config.options ?? {};

    return html`
      <div class="editor">
        <label>
          Faceplate
          <select @change=${(e: Event) =>
            this._emit({ faceplate: (e.target as HTMLSelectElement).value })}>
            ${options.map(
              (f) => html`<option value=${f.id} ?selected=${f.id === current.id}>
                ${f.name}
              </option>`
            )}
          </select>
        </label>
        ${(current.options ?? []).map(
          (option) => html`
            <label>
              ${option.label}
              <input
                type="number"
                min=${option.min}
                max=${option.max}
                .value=${String(values[option.key] ?? option.default)}
                @change=${(e: Event) =>
                  this._emit({
                    options: {
                      ...values,
                      [option.key]: Number((e.target as HTMLInputElement).value),
                    },
                  })}
              />
              ${option.help ? html`<span class="note">${option.help}</span>` : nothing}
            </label>
          `
        )}
        <label>
          Trim step (dB)
          <input
            type="number"
            min="0.5"
            max="12"
            step="0.5"
            .value=${String(this._config.step ?? DEFAULT_STEP)}
            @change=${(e: Event) =>
              this._emit({ step: Number((e.target as HTMLInputElement).value) })}
          />
        </label>
        <p class="note">${current.description ?? ""}</p>
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
    select,
    input {
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
  `;
}

customElements.define(CARD, AudioZoneCard);
customElements.define(`${CARD}-editor`, AudioZoneCardEditor);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Audio Zone Card",
  description: "Level, mute and trim for one to sixteen audio zones.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
