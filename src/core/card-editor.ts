/**
 * The visual editor every faceplate card shares.
 *
 * Until now these cards were configured by hand-writing a role map, which
 * is fine for generated cards and hostile for everything else. This gives
 * them the shape people expect of a Lovelace card: pick the graphic, then
 * a field per point with an entity picker beside it.
 *
 * Built once rather than per card. Seven near-identical editors would
 * drift, and the differences between them are genuinely small — a couple
 * of extra numbers on two of the cards.
 *
 * `ha-form` is used when it is there, because it brings the real entity
 * picker, theming and keyboard behaviour. It is frontend internals
 * though, so there is a plain-HTML fallback: a card editor that renders
 * nothing because an internal element moved is a card nobody can
 * configure at all.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { faceplatesFor, getFaceplate, resolveFaceplate } from "../faceplates/index";
import { FaceplateCardConfig, HomeAssistant } from "./types";

export interface EditorOptions {
  /** Expand region roles into everything the card can actually bind. */
  expandRoles?: (roles: string[]) => string[];
  /** Extra numeric settings, e.g. the audio card's trim step. */
  numbers?: { key: string; label: string; min: number; max: number; step?: number }[];
}

const OPT = "opt__";
const ENT = "ent__";
const LBL = "lbl__";

/** "pump1_speed" -> "Pump1 speed", for a label beside the picker. */
function humanise(role: string): string {
  const words = role.replace(/_/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function defineFaceplateEditor(card: string, opts: EditorOptions = {}): void {
  class FaceplateCardEditor extends LitElement {
    static override properties = {
      hass: { attribute: false },
      _config: { state: true },
    };

    declare hass?: HomeAssistant;
    declare _config?: FaceplateCardConfig;

    setConfig(config: FaceplateCardConfig): void {
      this._config = config;
    }

    /** The faceplate currently chosen, resolved at its option values. */
    private _faceplate() {
      return resolveFaceplate(
        getFaceplate(card, this._config?.faceplate),
        this._config?.options ?? {}
      );
    }

    /**
     * The strips this faceplate lets the operator name. A repeated strip
     * draws its label region as name1, name2…, and nothing in Home
     * Assistant carries "what this zone is called" — so it is config.
     */
    private _labelKeys(): string[] {
      const faceplate = this._faceplate();
      if (!faceplate.labelPrefix) return [];
      return faceplate.regions
        .map((r) => /^name(\d+)$/.exec(r.id)?.[1])
        .filter((n): n is string => Boolean(n))
        .map((n) => `${faceplate.labelPrefix}${n}`);
    }

    private _roles(): string[] {
      const declared = [
        ...new Set(this._faceplate().regions.map((r) => r.role)),
      ].filter(Boolean);
      return opts.expandRoles ? opts.expandRoles(declared) : declared;
    }

    private _emit(config: FaceplateCardConfig): void {
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config },
          bubbles: true,
          composed: true,
        })
      );
    }

    /** Flatten the config into the one-level shape ha-form wants. */
    private _data(): Record<string, unknown> {
      const config = this._config ?? ({} as FaceplateCardConfig);
      const data: Record<string, unknown> = {
        title: config.title ?? config.name ?? "",
        faceplate: getFaceplate(card, config.faceplate).id,
        device: config.device ?? "",
      };
      for (const option of this._faceplate().options ?? []) {
        data[OPT + option.key] =
          config.options?.[option.key] ?? option.default;
      }
      for (const number of opts.numbers ?? []) {
        data[number.key] = (config as unknown as Record<string, unknown>)[number.key];
      }
      for (const key of this._labelKeys()) {
        data[LBL + key] = config.labels?.[key] ?? "";
      }
      for (const role of this._roles()) {
        data[ENT + role] = config.entities?.[role] ?? "";
      }
      return data;
    }

    /** And back again, dropping anything the user cleared. */
    private _fromData(data: Record<string, unknown>): FaceplateCardConfig {
      const config: FaceplateCardConfig = {
        ...(this._config as FaceplateCardConfig),
        type: this._config?.type ?? `custom:${card}`,
        faceplate: String(data.faceplate ?? ""),
      };

      const title = String(data.title ?? "").trim();
      if (title) config.title = title;
      else delete config.title;
      // `name` was the old spelling. Once a title is set, leave only one.
      if (title) delete config.name;

      const device = String(data.device ?? "").trim();
      if (device) config.device = device;
      else delete config.device;

      const options: Record<string, number> = {};
      for (const option of this._faceplate().options ?? []) {
        const value = Number(data[OPT + option.key]);
        if (Number.isFinite(value)) options[option.key] = value;
      }
      if (Object.keys(options).length) config.options = options;
      else delete config.options;

      for (const number of opts.numbers ?? []) {
        const value = Number(data[number.key]);
        if (Number.isFinite(value)) {
          (config as unknown as Record<string, unknown>)[number.key] = value;
        } else {
          delete (config as unknown as Record<string, unknown>)[number.key];
        }
      }

      const labels: Record<string, string> = {};
      for (const key of this._labelKeys()) {
        const value = String(data[LBL + key] ?? "").trim();
        if (value) labels[key] = value;
      }
      if (Object.keys(labels).length) config.labels = labels;
      else delete config.labels;

      const entities: Record<string, string> = {};
      for (const role of this._roles()) {
        const value = String(data[ENT + role] ?? "").trim();
        if (value) entities[role] = value;
      }
      if (Object.keys(entities).length) config.entities = entities;
      else delete config.entities;

      return config;
    }

    private _schema(): unknown[] {
      const faceplate = this._faceplate();
      const choices = faceplatesFor(card).map((f) => ({
        value: f.id,
        label: f.emulates ? `${f.name} — ${f.emulates}` : f.name,
      }));

      const schema: unknown[] = [
        { name: "title", selector: { text: {} } },
        {
          name: "faceplate",
          selector: { select: { mode: "dropdown", options: choices } },
        },
        { name: "device", selector: { device: {} } },
      ];

      for (const option of faceplate.options ?? []) {
        schema.push({
          name: OPT + option.key,
          selector: {
            number: { min: option.min, max: option.max, mode: "box" },
          },
        });
      }
      for (const number of opts.numbers ?? []) {
        schema.push({
          name: number.key,
          selector: {
            number: { min: number.min, max: number.max, step: number.step ?? 1, mode: "box" },
          },
        });
      }
      for (const key of this._labelKeys()) {
        schema.push({ name: LBL + key, selector: { text: {} } });
      }
      for (const role of this._roles()) {
        schema.push({ name: ENT + role, selector: { entity: {} } });
      }
      return schema;
    }

    private _label = (item: { name: string }): string => {
      const name = item.name;
      if (name === "title") return "Title";
      if (name === "faceplate") return "Faceplate";
      if (name === "device") return "Device (fills every point below)";
      if (name.startsWith(OPT)) {
        const key = name.slice(OPT.length);
        const option = (this._faceplate().options ?? []).find((o) => o.key === key);
        return option?.label ?? humanise(key);
      }
      if (name.startsWith(LBL)) {
        return `${humanise(name.slice(LBL.length))} name`;
      }
      if (name.startsWith(ENT)) return humanise(name.slice(ENT.length));
      const number = (opts.numbers ?? []).find((n) => n.key === name);
      return number?.label ?? humanise(name);
    };

    override render(): TemplateResult | typeof nothing {
      if (!this._config) return nothing;
      const faceplate = this._faceplate();
      const roles = this._roles();
      const bound = roles.filter((r) => this._config?.entities?.[r]).length;

      const header = html`
        <p class="note">${faceplate.description ?? ""}</p>
        <p class="note">
          ${bound} of ${roles.length} points set.
          ${this._config.device
            ? "Points left blank are matched from the device."
            : "Points left blank stay dark on the card."}
        </p>
      `;

      // ha-form brings the real entity picker. Its absence must not leave
      // an empty editor, so fall back to plain controls.
      if (customElements.get("ha-form")) {
        return html`
          ${header}
          <ha-form
            .hass=${this.hass}
            .data=${this._data()}
            .schema=${this._schema()}
            .computeLabel=${this._label}
            @value-changed=${(e: CustomEvent) =>
              this._emit(this._fromData(e.detail.value))}
          ></ha-form>
        `;
      }
      return html`${header}${this._fallback()}`;
    }

    /** Plain controls, used when ha-form is unavailable. */
    private _fallback(): TemplateResult {
      const data = this._data();
      const ids = Object.keys(this.hass?.states ?? {}).sort();
      const change = (key: string) => (e: Event) => {
        const value = (e.target as HTMLInputElement | HTMLSelectElement).value;
        this._emit(this._fromData({ ...data, [key]: value }));
      };

      return html`
        <div class="editor">
          <label>
            Title
            <input .value=${String(data.title ?? "")} @change=${change("title")} />
          </label>
          <label>
            Faceplate
            <select @change=${change("faceplate")}>
              ${faceplatesFor(card).map(
                (f) => html`<option value=${f.id}
                  ?selected=${f.id === data.faceplate}>${f.name}</option>`
              )}
            </select>
          </label>
          <label>
            Device (fills every point below)
            <input .value=${String(data.device ?? "")} @change=${change("device")} />
          </label>
          ${(this._faceplate().options ?? []).map(
            (option) => html`
              <label>
                ${option.label}
                <input type="number" min=${option.min} max=${option.max}
                  .value=${String(data[OPT + option.key] ?? option.default)}
                  @change=${change(OPT + option.key)} />
                ${option.help ? html`<span class="note">${option.help}</span>` : nothing}
              </label>
            `
          )}
          ${(opts.numbers ?? []).map(
            (number) => html`
              <label>
                ${number.label}
                <input type="number" min=${number.min} max=${number.max}
                  step=${number.step ?? 1}
                  .value=${String(data[number.key] ?? "")}
                  @change=${change(number.key)} />
              </label>
            `
          )}
          ${this._labelKeys().map(
            (key) => html`
              <label>
                ${humanise(key)} name
                <input .value=${String(data[LBL + key] ?? "")}
                  placeholder="shown on the strip"
                  @change=${change(LBL + key)} />
              </label>
            `
          )}
          <datalist id="fp-entities">
            ${ids.map((id) => html`<option value=${id}></option>`)}
          </datalist>
          ${this._roles().map(
            (role) => html`
              <label>
                ${humanise(role)}
                <input list="fp-entities" placeholder="entity id"
                  .value=${String(data[ENT + role] ?? "")}
                  @change=${change(ENT + role)} />
              </label>
            `
          )}
        </div>
      `;
    }

    static override styles = css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
        margin: 0 0 8px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `;
  }

  customElements.define(`${card}-editor`, FaceplateCardEditor);
}
