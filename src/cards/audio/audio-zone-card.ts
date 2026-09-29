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
import { defineFaceplateEditor } from "../../core/card-editor";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds, resolveRoles } from "../../core/bind";
import { getFaceplate, resolveFaceplate } from "../../faceplates/index";
import { cardTitle, runControlAction, withLabels, DEFAULT_STEP } from "../../core/controls";
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
    const base = this._faceplate();
    const faceplate = withLabels(
      base, this._config.labels, base.labelPrefix ?? "zone"
    );
    const roles = [...new Set(faceplate.regions.map((r) => r.role))].filter(Boolean);
    const bindings = resolveRoles(
      this.hass,
      roles,
      this._config.entities ?? {},
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
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

customElements.define(CARD, AudioZoneCard);
defineFaceplateEditor(CARD, {
  numbers: [{ key: "step", label: "Trim step (dB)", min: 0.5, max: 12, step: 0.5 }],
});

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Audio Zone Card",
  description: "Level, mute and trim for one to sixteen audio zones.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
