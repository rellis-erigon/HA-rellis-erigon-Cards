/**
 * crestron-panel-card — a Crestron touch panel, imported and rendered as a
 * card.
 *
 * The faceplate is not written by hand. The Crestron add-on reads the
 * panel's own compiled project — the same file that is loaded onto the
 * hardware — and generates a faceplate from it: every control at the
 * position and size the panel draws it, with the words it shows and the
 * join it binds. Roles are named after those joins (`button_101`,
 * `level_211`, `text_1`), so the card an operator ends up with is the
 * screen they already know rather than a fresh interpretation of it.
 *
 * Two consequences worth knowing.
 *
 * **Nothing is drawn as a control unless the project says what it does.**
 * A control bound only to a reserved join flips a page on the panel itself
 * and can never be driven from Home Assistant; it is rendered as inert
 * chrome instead. The layout stays right and no button lies about what it
 * will do.
 *
 * **A panel's states are faceplate pages.** The main screen of a real
 * panel is a frame of subpage references, several of which overlap and are
 * shown one at a time by a visibility join. Each becomes a page here, and
 * the references with no visibility join are always-on chrome.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { defineFaceplateEditor } from "../../core/card-editor";
import { hiddenNote, prepare } from "../../core/prepare";
import { renderFaceplate } from "../../core/faceplate";
import { deviceEntityIds } from "../../core/bind";
import { cardTitle, runControlAction, DEFAULT_STEP } from "../../core/controls";
import { FaceplateCardConfig, HomeAssistant, Region } from "../../core/types";

const CARD = "crestron-panel-card";

class CrestronPanelCard extends LitElement {
  static override properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
    _page: { state: true },
  };

  declare hass?: HomeAssistant;
  declare private _config?: FaceplateCardConfig;
  declare private _error?: string;
  /**
   * Which state of the panel is showing. An imported panel's main screen
   * is several overlapping subpages shown one at a time, so with nothing
   * selected the card drew the top and bottom bars and an empty middle.
   */
  declare private _page?: string;

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
      faceplate: "",
    };
  }

  private _notify(message: string): void {
    this._error = message;
    setTimeout(() => {
      this._error = undefined;
    }, 4000);
  }

  /** The state to draw: whatever is selected, else the panel's first. */
  private _currentPage(pages: string[] | undefined): string {
    if (!pages?.length) return "";
    return this._page && pages.includes(this._page) ? this._page : pages[0];
  }

  private async _onAction(region: Region, value?: number): Promise<void> {
    if (!this.hass || !this._config) return;
    // A page button switches the card's own state rather than asking the
    // processor to, because the panel's page flips run on joins the
    // control program never sees.
    if (region.action === "page" && region.target) {
      this._page = region.target;
      return;
    }
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
    const name = cardTitle(this.hass, this._config);
    // An imported panel travels in the config; there is nothing in the
    // catalogue to look up.
    const panel = this._config.panel;
    if (!panel) {
      return html`<ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        <div class="hint">
          No panel loaded. Import a .c3p or .vtz in the Crestron add-on
          and build the card from there.
        </div>
      </ha-card>`;
    }
    const { faceplate: drawn, bindings, roles, hidden } = prepare(
      this.hass,
      this._config,
      panel,
      this._config.device ? deviceEntityIds(this.hass, this._config.device) : []
    );
    const faceplate = drawn;
    const bound = roles.filter((role) => bindings[role]).length;

    // Nothing bound and hiding on means there is nothing to draw at
    // all. With hiding off the user has asked for the full panel, dark
    // controls included, so it is still drawn.
    const blank = bound === 0 && this._config.hide_unbound !== false;

    const pages = faceplate.pages;
    const page = this._currentPage(pages);

    return html`
      <ha-card>
        ${name ? html`<div class="title">${name}</div>` : nothing}
        ${pages && pages.length > 1 && !blank
          ? html`<div class="pages">
              ${pages.map(
                (candidate) => html`<button
                  class=${candidate === page ? "on" : ""}
                  @click=${() => {
                    this._page = candidate;
                  }}
                >
                  ${candidate}
                </button>`,
              )}
            </div>`
          : nothing}
        ${blank
          ? nothing
          : html`<div class="frame">
          ${renderFaceplate({
            hass: this.hass,
            faceplate,
            bindings,
            page,
            onAction: (region, value) => void this._onAction(region, value),
          })}
        </div>`}
        ${this._error ? html`<div class="hint">${this._error}</div>` : nothing}
        ${hidden && bound > 0
          ? html`<div class="hint muted">${hiddenNote(hidden)}</div>`
          : nothing}
        ${bound === 0
          ? html`<div class="hint">
              No panel loaded. Import a .c3p or .vtz in the Crestron
              add-on and build the card from there.
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
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
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
    /* Panel chrome from an imported project: borders, fills and the
       boxes where artwork sat. Fill and stroke arrive as attributes on
       the element, carried over from the panel's own colours, so nothing
       here may set either — a stylesheet rule would override them. */
    .plate {
      stroke-width: 1;
    }
    .plate-label {
      font-family: inherit;
      letter-spacing: 0.5px;
      opacity: 0.75;
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
    /* The panel's own states. A real panel switches these on a join the
       control program drives; a card has no such signal, so they are
       offered as what they are — the screens this panel has. */
    .pages {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 0 4px 8px;
    }
    .pages button {
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.6px;
      padding: 3px 9px;
      cursor: pointer;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border: 1px solid transparent;
      border-radius: 11px;
    }
    .pages button.on {
      color: var(--primary-text-color);
      border-color: var(--primary-color);
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

customElements.define(CARD, CrestronPanelCard);
defineFaceplateEditor(CARD, {
  numbers: [{ key: "step", label: "Trim step (dB)", min: 0.5, max: 12, step: 0.5 }],
});

(window as unknown as { customCards?: unknown[] }).customCards ??= [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD,
  name: "Crestron Panel Card",
  description: "Your own XPanel project, imported and rendered as a card.",
  preview: true,
  documentationURL: "https://github.com/rellis-erigon/HA-rellis-erigon-Cards",
});
