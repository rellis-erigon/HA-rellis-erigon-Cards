/**
 * bms-meter-card — a power meter that looks like a power meter.
 *
 * Draws a selectable faceplate over entities resolved by role. The card
 * itself knows nothing about any particular meter: the faceplate supplies
 * the artwork, the regions and the pages, so adding a model is a data file.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { cardTitle } from "../../core/controls";
import { renderFaceplate } from "../../core/faceplate";
import { DERIVED_ROLES, deviceEntityIds, resolveRoles } from "../../core/bind";
import { getFaceplate } from "../../faceplates/index";
import {
  FaceplateCardConfig,
  Faceplate,
  HomeAssistant,
  Region,
} from "../../core/types";

const CARD = "bms-meter-card";

class BmsMeterCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _page: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;
  declare private _page: string;

  constructor() {
    super();
    this._page = "";
  }

  setConfig(config: FaceplateCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    const faceplate = getFaceplate(CARD, config.faceplate);
    this._page = config.page ?? faceplate.pages?.[0] ?? "";
  }

  getCardSize(): number {
    return 4;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(`${CARD}-editor`);
  }

  static getStubConfig(): FaceplateCardConfig {
    return { type: `custom:${CARD}`, faceplate: "schneider-pm2200" };
  }

  private _faceplate(): Faceplate {
    return getFaceplate(CARD, this._config?.faceplate);
  }

  private _onAction(region: Region): void {
    const faceplate = this._faceplate();
    const pages = faceplate.pages ?? [];
    if (!pages.length) return;

    if (region.action === "page" && region.target) {
      this._page = region.target;
      return;
    }
    const index = pages.indexOf(this._page);
    const step = region.action === "prev_page" ? -1 : 1;
    this._page = pages[(index + step + pages.length) % pages.length];
  }

  override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const faceplate = this._faceplate();
    // Derived roles are computed from their components, so what needs
    // resolving is the components rather than the derived role itself.
    const declared = [...new Set(faceplate.regions.map((r) => r.role))].filter(Boolean);
    const roles = [
      ...new Set(declared.flatMap((role) => DERIVED_ROLES[role] ?? [role])),
    ];
    const bindings = resolveRoles(
      this.hass,
      roles,
      this._config.entities ?? {},
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );

    const unbound = roles.filter((role) => !bindings[role]);

    const name = cardTitle(this.hass, this._config);

    return html`
      <ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        <div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page: this._page,
            onAction: (region) => this._onAction(region),
          })}
        </div>
        ${unbound.length === roles.length
          ? html`<div class="hint">
              No entities bound. Set them in the card editor, or point the card
              at a device.
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
    .frame {
      width: 100%;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
    }
    /* LCD text. Deliberately a fixed palette: an LCD does not follow the
       dashboard theme, and making it do so stops it reading as hardware. */
    .lcd-value {
      fill: #1d2a17;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 600;
    }
    .lcd-label {
      fill: #46543c;
      font-size: 13px;
      font-family: inherit;
      letter-spacing: 0.04em;
    }
    /* Unbound and unavailable both read as an unlit display rather than a
       confident number. */
    .lcd-value.dark {
      fill: #7b8a70;
    }
    .lcd-value.stale {
      fill: #8a6b23;
    }
    /* Negative displays: light text on a dark face. */
    .display-negative .lcd-value {
      fill: #e8f2e0;
    }
    .display-negative .lcd-label {
      fill: #8fa383;
    }
    .display-negative .lcd-value.dark {
      fill: #4a5647;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Literal chrome inside a display: titles, soft-key legends. */
    .lcd-value.chrome {
      fill: #f2f5ef;
      font-weight: 500;
      font-family: inherit;
    }
    .display-positive .lcd-value.chrome {
      fill: #2c3a26;
    }
    /* The PM2200 title band is dark, so its title stays light. */
    .display-positive text#title-on-band {
      fill: #f2f5ef;
    }
    /* Chassis lettering, drawn in the artwork rather than bound to data. */
    .pm-brand {
      fill: #e6e9ec;
      font-size: 21px;
      font-weight: 500;
      letter-spacing: 0.01em;
    }
    .pm-brand-sub {
      fill: #aeb4ba;
      font-size: 11px;
      letter-spacing: 0.22em;
    }
    .pm-model {
      fill: #dfe3e7;
      font-size: 11px;
      letter-spacing: 0.02em;
    }
    .cvm-brand {
      fill: #4c5158;
      font-size: 17px;
      font-weight: 600;
    }
    .cvm-model {
      fill: #2f343a;
      font-size: 14px;
      font-weight: 500;
    }
    .cvm-annun {
      fill: #cfd8cc;
      font-size: 13px;
    }
    .cvm-annun.teal {
      fill: #3fbfa8;
    }
    .cvm-annun.dark {
      fill: #6c7075;
    }
    /* Mechanical register: an odometer and sweep dials on a painted face. */
    .odo-cell {
      fill: #f6f4ec;
      stroke: #6d6a5e;
      stroke-width: 0.8;
    }
    .odo-cell.odo-red {
      fill: #a8231d;
      stroke: #6d120e;
    }
    .odo-digit {
      fill: #1b1b18;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 700;
    }
    .odo-digit.odo-red-digit {
      fill: #fdf6f5;
    }
    .odometer.dark .odo-digit {
      fill: #8d8a80;
    }
    .dial-face {
      fill: #fbf9f2;
      stroke: #7d7a6e;
      stroke-width: 1.2;
    }
    .dial-tick {
      stroke: #7d7a6e;
      stroke-width: 1;
    }
    .dial-needle {
      stroke: #b3241c;
      stroke-width: 2.2;
      stroke-linecap: round;
    }
    .dial-hub {
      fill: #7d1a14;
    }
    .dial.dark .dial-needle {
      stroke: #b9b6ab;
    }
    .dial-label {
      fill: #3d3b34;
      font-size: 12px;
    }
    .mj-brand {
      fill: #8a2018;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }
    .mj-spec text {
      fill: #4a4840;
      font-size: 10.5px;
    }
    .lamp {
      stroke: #11151a;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 4px currentColor);
    }
    .lamp-label {
      fill: #8b949e;
      font-size: 11px;
    }
    .bar-track {
      fill: #1a1f24;
    }
    .bar-fill {
      fill: var(--primary-color, #03a9f4);
    }
    .button rect {
      fill: #444a51;
      stroke: #14171a;
    }
    .button:hover rect {
      fill: #565d66;
    }
    .button text {
      fill: #dfe3e8;
      font-size: 12px;
      letter-spacing: 0.05em;
      pointer-events: none;
    }
    .button {
      cursor: pointer;
    }
    .hint {
      padding: 10px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;
}

customElements.define(CARD, BmsMeterCard);
defineFaceplateEditor(CARD, {
  // The meter faceplates show averages the boards rarely publish, so the
  // editor offers the phases those are derived from, not the averages.
  expandRoles: (roles) => [
    ...new Set(roles.flatMap((role) => DERIVED_ROLES[role] ?? [role])),
  ],
});

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "BMS Meter Card",
  description: "A power meter that looks like a power meter.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-Cards",
});
