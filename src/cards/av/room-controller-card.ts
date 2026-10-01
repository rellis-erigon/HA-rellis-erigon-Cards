/**
 * room-controller-card — one AV room: source, display, volume, mute and
 * the indicators that say whether any of it can be believed.
 *
 * Built for the Crestron CIP bridge, which has no notion of a room at all
 * — it sees joins on a processor. Which join is the volume is something
 * only the person who named them knows, so this card binds by role and
 * the add-on guesses from those names.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { hiddenNote, prepare } from "../../core/prepare";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds } from "../../core/bind";
import { getFaceplate } from "../../faceplates/index";
import { cardTitle, runControlAction, DEFAULT_STEP } from "../../core/controls";
import { FaceplateCardConfig, HomeAssistant, Region } from "../../core/types";

const CARD = "room-controller-card";

class RoomControllerCard extends LitElement {
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
      faceplate: "av-room-controller",
    };
  }

  private _notify(message: string): void {
    this._error = message;
    setTimeout(() => {
      this._error = undefined;
    }, 4000);
  }

  private async _onAction(region: Region, value?: number): Promise<void> {
    if (!this.hass || !this._config) return;
    await runControlAction(
      this.hass,
      this._config.entities,
      region,
      (message) => this._notify(message),
      Number(this._config.step ?? DEFAULT_STEP),
      value,
    );
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
            onAction: (region, value) => void this._onAction(region, value),
          })}
        </div>
        ${this._error ? html`<div class="hint">${this._error}</div>` : nothing}
        ${hidden
          ? html`<div class="hint muted">${hiddenNote(hidden)}</div>`
          : nothing}
        ${bound === 0
          ? html`<div class="hint">
              Nothing bound. Map <code>volume</code>, <code>mute</code>,
              <code>source</code> and <code>display_power</code> in YAML, or
              generate the card from the Crestron add-on.
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

customElements.define(CARD, RoomControllerCard);
defineFaceplateEditor(CARD, {
  numbers: [{ key: "step", label: "Trim step", min: 0.5, max: 25, step: 0.5 }],
});

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Room Controller Card",
  description: "One AV room: source, display, volume, mute and status.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
