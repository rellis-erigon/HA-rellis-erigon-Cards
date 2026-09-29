/**
 * fire-panel-card — what the BMS sees of a fire panel. Nothing more.
 *
 * This card is monitoring only and is built so that it cannot become
 * anything else: no region is clickable, no action is wired, and every
 * instance carries a permanent band reading "BMS MONITORING — NOT THE
 * FIRE PANEL". The band is not configurable. That is deliberate.
 *
 * The risk being designed against is specific: a mimic accurate enough to
 * pass for the real fascia is one somebody eventually trusts during an
 * incident, when the BMS link may be exactly the thing that has failed.
 * Stale or unbound zones therefore stay visibly dark rather than reading
 * as "no alarm".
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds, resolveRoles } from "../../core/bind";
import { getFaceplate, resolveFaceplate } from "../../faceplates/index";
import { Faceplate, FaceplateCardConfig, HomeAssistant } from "../../core/types";

const CARD = "fire-panel-card";

/**
 * The roles whose absence must be stated rather than shown as dark. Zone
 * lamps are not here: a panel with no zone points is obviously a summary
 * mimic, but a missing FIRE or BRIGADE signal is not obvious at all.
 */
const CRITICAL = ["fire_alarm", "fault", "isolate", "brigade_signal", "power"];

class FirePanelCard extends LitElement {
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
      faceplate: "generic-fip",
      options: { zones: 8 },
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

    // A dark lamp means "not in alarm". On a life-safety mimic an unbound
    // FIRE lamp is therefore a lie by omission: it looks like an all-clear
    // when in truth nothing is being watched. Real panels here export the
    // sprinkler detail and not the panel's own alarm summary, so this is
    // the normal case, not an edge one. Say it on the face of the card.
    const unmonitored = CRITICAL.filter((role) => !bindings[role]);

    return html`
      <ha-card>
        ${this._config.title || this._config.name
          ? html`<div class="title">${this._config.title ?? this._config.name}</div>`
          : nothing}
        <div class="banner">BMS MONITORING — NOT THE FIRE PANEL</div>
        ${unmonitored.length
          ? html`<div class="gap">
              Not monitored by the BMS:
              ${unmonitored.map((r) => r.replace(/_/g, " ").toUpperCase()).join(", ")}
            </div>`
          : nothing}
        <div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page: "",
            // Never actionable. See the note at the top of this file.
            onAction: () => undefined,
          })}
        </div>
        ${bound === 0
          ? html`<div class="hint">
              Nothing bound. Map <code>fire_alarm</code>,
              <code>zone1_alarm</code> and the rest, or point the card at a
              device with <code>device:</code>.
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
    .banner {
      background: #7f1d1d;
      color: #fee2e2;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 1.4px;
      text-align: center;
      padding: 6px 8px;
      border-radius: 6px;
      margin: 0 0 10px;
    }
    .gap {
      background: #78350f;
      color: #fde68a;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 5px 8px;
      border-radius: 6px;
      margin: -4px 0 10px;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

customElements.define(CARD, FirePanelCard);
defineFaceplateEditor(CARD);

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Fire Panel Card",
  description: "Zone and status mimic. Monitoring only — never the panel.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
