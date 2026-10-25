/**
 * ac-mapping-card — where one AC unit lives on its gateway, for checking a
 * mapping by hand.
 *
 * A room's name comes from a mapping file, not from the gateway, so the one
 * way to be sure "Room 101" really is room 101 is to compare the address
 * and object names with the commissioning sheets or a BACnet tool. This
 * shows them: the gateway, the DIII-NET address, the AC number, the tag and
 * model from the mapping, and every BACnet object the unit publishes with
 * its type, instance and live value. Commands — the objects a change from
 * Home Assistant writes to — are marked.
 *
 *   type: custom:ac-mapping-card
 *   climate: climate.dbacs_1_1_00
 *   open: false               # optional, start expanded
 *
 * It reads the attributes the D-BACS integration puts on its climate
 * entity (`gateway`, `diii_address`, `ac_number`, `bacnet_objects`, …) and
 * the `bacnet_object` attribute on each of the unit's other entities for
 * the live values. It starts closed, like the history under it.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";

const CARD = "ac-mapping-card";

interface StateLike {
  state: string;
  attributes: Record<string, unknown>;
}

interface HassLike {
  states: Record<string, StateLike>;
  entities?: Record<string, { entity_id: string; device_id?: string; area_id?: string }>;
  devices?: Record<string, { name?: string; name_by_user?: string; area_id?: string }>;
  areas?: Record<string, { name?: string }>;
}

interface Config {
  type: string;
  climate?: string;
  open?: boolean;
}

interface BacnetObject {
  point: string;
  object: string;
  type: string;
  instance: number;
  kind: string;
}

/** The live reading for each object name, from the unit's entities. */
export function valuesByObject(hass: HassLike, climate: string): Map<string, StateLike & { entity_id: string }> {
  const out = new Map<string, StateLike & { entity_id: string }>();
  const device = hass.entities?.[climate]?.device_id;
  if (!device) return out;
  for (const entry of Object.values(hass.entities ?? {})) {
    if (entry.device_id !== device) continue;
    const state = hass.states[entry.entity_id];
    const name = state?.attributes.bacnet_object;
    if (typeof name === "string") out.set(name, { ...state, entity_id: entry.entity_id });
  }
  return out;
}

class AcMappingCard extends LitElement {
  static override properties = {
    _config: { state: true },
    _open: { state: true },
  };

  declare private _config?: Config;
  declare private _open: boolean;
  private _hass?: HassLike;

  constructor() {
    super();
    this._open = false;
  }

  set hass(hass: HassLike) {
    this._hass = hass;
    // Closed, nothing here changes; open, the live values do.
    if (this._open || !this.hasUpdated) this.requestUpdate();
  }

  get hass(): HassLike | undefined {
    return this._hass;
  }

  setConfig(config: Config): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    this._open = Boolean(config.open);
  }

  getCardSize(): number {
    return this._open ? 10 : 1;
  }

  static getStubConfig(): Config {
    return { type: `custom:${CARD}` };
  }

  private _identity(climate: string, a: Record<string, unknown>): TemplateResult {
    const hass = this._hass!;
    const entry = hass.entities?.[climate];
    const device = entry?.device_id ? hass.devices?.[entry.device_id] : undefined;
    const areaId = entry?.area_id ?? device?.area_id;
    const area = areaId ? hass.areas?.[areaId]?.name ?? areaId : undefined;
    const gateway = [
      a.gateway,
      a.gateway_device_instance !== undefined ? `device ${a.gateway_device_instance}` : "",
      a.gateway_host,
    ].filter(Boolean).join(" · ");
    const rows: [string, unknown][] = [
      ["Name in Home Assistant", device?.name_by_user ?? device?.name],
      ["Area", area],
      ["Gateway", gateway],
      ["DIII-NET address", a.diii_address],
      ["AC number", a.ac_number],
      ["Tag", a.tag],
      ["Model", a.model],
      ["System · outdoor unit", [a.system, a.outdoor].filter(Boolean).join(" · ")],
      ["Climate entity", climate],
    ];
    return html`<table class="id">
      ${rows.filter(([, v]) => v !== undefined && v !== null && v !== "").map(
        ([k, v]) => html`<tr><th>${k}</th><td>${v}</td></tr>`)}
    </table>`;
  }

  private _objects(climate: string, objects: BacnetObject[]): TemplateResult {
    const values = valuesByObject(this._hass!, climate);
    const shown = (name: string, kind: string) => {
      const value = values.get(name);
      if (value) {
        const unit = value.attributes.unit_of_measurement;
        return html`<span title=${value.entity_id}>${value.state}${unit ? ` ${unit}` : ""}</span>`;
      }
      return html`<span class="muted">${kind === "status" ? "not shown" : "—"}</span>`;
    };
    return html`<table class="objects">
      <thead><tr><th>Point</th><th>Object</th><th>Type, instance</th><th>Value</th></tr></thead>
      <tbody>
        ${objects.map((o) => html`<tr class=${o.kind}>
          <td>${o.point}${o.kind !== "status" ? html` <span class="tag">${o.kind}</span>` : nothing}</td>
          <td class="mono">${o.object}</td>
          <td class="mono">${o.type},${o.instance}</td>
          <td>${shown(o.object, o.kind)}</td>
        </tr>`)}
      </tbody>
    </table>
    <div class="note">Commands are what Home Assistant writes to; a status
      is what the unit reports. "Not shown": an entity Home Assistant has
      switched off. Hover a value for its entity.</div>`;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    const climate = this._config.climate;
    if (!climate) {
      return html`<ha-card><div class="note">ac-mapping-card needs
        <code>climate</code>.</div></ha-card>`;
    }
    const state = this._hass?.states[climate];
    const a = state?.attributes ?? {};
    const objects = (a.bacnet_objects as BacnetObject[] | undefined) ?? [];
    return html`<ha-card>
      <button class="head" @click=${() => { this._open = !this._open; }}
              aria-expanded=${this._open ? "true" : "false"}>
        <ha-icon icon="mdi:lan"></ha-icon>
        <span>BACnet mapping</span>
        <span class="addr">${a.diii_address ?? ""}</span>
        <ha-icon class="chev"
                 icon=${this._open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
      </button>
      ${this._open
        ? html`<div class="body">
            ${state ? this._identity(climate, a) : html`<div class="note">
              ${climate} is not in Home Assistant.</div>`}
            ${objects.length ? this._objects(climate, objects)
              : state ? html`<div class="note">This entity does not list its
                BACnet objects.</div>` : nothing}
          </div>`
        : nothing}
    </ha-card>`;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .head {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 10px 14px; border: 0; background: none; cursor: pointer;
      color: var(--primary-text-color); font: inherit; font-weight: 500;
    }
    .head .addr { color: var(--secondary-text-color); font-weight: 400; }
    .head .chev { margin-left: auto; }
    .body { padding: 0 12px 12px; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; font-size: 0.9em; }
    th, td { text-align: left; padding: 4px 8px 4px 0; vertical-align: top; }
    .id th { color: var(--secondary-text-color); font-weight: 400; white-space: nowrap; width: 1%; }
    .objects { margin-top: 10px; }
    .objects thead th {
      color: var(--secondary-text-color); font-weight: 500;
      border-bottom: 1px solid var(--divider-color);
    }
    .objects tbody tr + tr td { border-top: 1px solid var(--divider-color); }
    .objects tr.command td, .objects tr.reset td { background: rgba(3, 155, 229, 0.06); }
    .mono { font-family: var(--code-font-family, monospace); white-space: nowrap; }
    .tag {
      font-size: 0.75em; padding: 0 5px; border-radius: 8px;
      background: var(--info-color, #039be5); color: #fff;
    }
    .muted { color: var(--secondary-text-color); }
    .note { padding: 8px 2px 0; color: var(--secondary-text-color); font-size: 0.85em; }
  `;
}

if (!customElements.get(CARD)) {
  customElements.define(CARD, AcMappingCard);
  (window as unknown as { customCards?: unknown[] }).customCards ??= [];
  (window as unknown as { customCards: unknown[] }).customCards.push({
    type: CARD,
    name: "AC BACnet Mapping",
    description: "Where one AC unit lives on its gateway: address, tag and every BACnet object.",
  });
}
