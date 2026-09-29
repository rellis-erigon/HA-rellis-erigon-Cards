/**
 * plant-equipment-card — fans, hot water units and circulators.
 *
 * The mechanical plant that is not a booster set. Read-only: these
 * faceplates mirror what the BMS reports and offer no action, because a
 * BMS point is very often exported read-only and a button that silently
 * does nothing is worse than no button.
 *
 * The fan faceplates come in three inlet directions rather than one
 * mirrored icon. Ductwork has a direction and a mimic pointing the wrong
 * way gets read as the airflow.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds, resolveRoles } from "../../core/bind";
import { getFaceplate, resolveFaceplate } from "../../faceplates/index";
import { Faceplate, FaceplateCardConfig, HomeAssistant } from "../../core/types";

const CARD = "plant-equipment-card";

class PlantEquipmentCard extends LitElement {
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
      faceplate: "supply-fan-top",
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
    const bindings = resolveRoles(
      this.hass,
      roles,
      this._config.entities ?? {},
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
    const bound = roles.filter((role) => bindings[role]).length;

    return html`
      <ha-card>
        ${this._config.title || this._config.name
          ? html`<div class="title">${this._config.title ?? this._config.name}</div>`
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
              Nothing bound. Map the roles this faceplate names in YAML,
              or point the card at a device with <code>device:</code>.
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

customElements.define(CARD, PlantEquipmentCard);
defineFaceplateEditor(CARD);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Plant Equipment Card",
  description: "Supply and exhaust fans, hot water units and circulators.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
