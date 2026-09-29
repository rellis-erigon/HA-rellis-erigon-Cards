/**
 * pump-system-card — a booster set drawn at the size it actually is.
 *
 * The faceplate is parametric: choose the number of pumps and the skid,
 * manifold and roles are built to suit, from one pump to ten. Roles follow
 * the Niagara pump-set template — `pump1_run`, `pump1_speed`, and so on —
 * so a device typed there resolves without a role map.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { cardTitle } from "../../core/controls";
import { hiddenNote, prepare } from "../../core/prepare";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds } from "../../core/bind";
import { getFaceplate } from "../../faceplates/index";
import { FaceplateCardConfig, HomeAssistant } from "../../core/types";

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

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const { faceplate: drawn, bindings, roles, hidden } = prepare(
      this.hass,
      this._config,
      getFaceplate(CARD, this._config.faceplate),
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
    const faceplate = drawn;
    const bound = roles.filter((role) => bindings[role]).length;

    const name = cardTitle(this.hass, this._config);

    return html`
      <ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        <div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page: "",
            onAction: () => undefined,
          })}
        </div>
        ${hidden
          ? html`<div class="hint muted">${hiddenNote(hidden)}</div>`
          : nothing}
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
    .hint.muted {
      opacity: 0.72;
      font-size: 12px;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

customElements.define(CARD, PumpSystemCard);
defineFaceplateEditor(CARD);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Pump System Card",
  description: "A booster set from one pump to ten, drawn to suit.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
