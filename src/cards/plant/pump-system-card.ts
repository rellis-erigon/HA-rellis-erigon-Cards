/**
 * pump-system-card — a booster set drawn at the size it actually is.
 *
 * The faceplate is parametric: choose the number of pumps and the skid,
 * manifold and roles are built to suit, from one pump to ten. Roles follow
 * the Niagara pump-set template — `pump1_run`, `pump1_speed`, and so on —
 * so a device typed there resolves without a role map.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { renderFaceplate } from "../../core/faceplate";
import { resolveRoles } from "../../core/bind";
import { faceplatesFor, getFaceplate, resolveFaceplate } from "../../faceplates/index";
import { Faceplate, FaceplateCardConfig, HomeAssistant } from "../../core/types";

const CARD = "pump-system-card";

class PumpSystemCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
  }

  getCardSize(): number {
    return 5;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD}-editor`);
  }

  static getStubConfig(): FaceplateCardConfig {
    return {
      type: `custom:${CARD}`,
      faceplate: "vertical-pumpset",
      options: { pumps: 3 },
    };
  }

  private _faceplate(): Faceplate {
    return resolveFaceplate(
      getFaceplate(CARD, this._config?.faceplate),
      this._config?.options ?? {}
    );
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const faceplate = this._faceplate();
    const roles = [...new Set(faceplate.regions.map((r) => r.role))].filter(Boolean);
    const bindings = resolveRoles(this.hass, roles, this._config.entities ?? {});
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
            onAction: () => undefined,
          })}
        </div>
        ${bound === 0
          ? html`<div class="hint">
              Nothing bound. Map <code>pump1_run</code>,
              <code>system_pressure</code> and the rest in YAML, or point the
              card at a device typed as a pump set.
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
    /* Panel HMI: light on a dark screen. */
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #9fb0ad;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Pump labels and speeds sit on the card, not on a display. */
    .lcd-value {
      fill: var(--primary-text-color);
      font-family: ui-monospace, Menlo, monospace;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

class PumpSystemCardEditor extends LitElement {
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

customElements.define(CARD, PumpSystemCard);
customElements.define(`${CARD}-editor`, PumpSystemCardEditor);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Pump System Card",
  description: "A booster set from one pump to ten, drawn to suit.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
