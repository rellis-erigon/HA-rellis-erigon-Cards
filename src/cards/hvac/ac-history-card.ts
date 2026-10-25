/**
 * ac-history-card — the history of one AC unit, with the readings to plot
 * picked by tapping them.
 *
 * A unit reaches Home Assistant as a climate entity and a dozen sibling
 * points on the same device: mode, setpoint, room temperature, run state,
 * compressor, thermostat demand, fan, alarms. This finds every sibling of
 * the configured climate entity, offers each as a chip, and draws Home
 * Assistant's own history graph of the ones chosen — numbers as lines,
 * states as a timeline, exactly as the history panel would.
 *
 *   type: custom:ac-history-card
 *   climate: climate.dbacs_1_1_00
 *   hours: 24                 # optional, default 24
 *   open: false               # optional, start expanded
 *
 * It starts closed. A floor page has dozens of units, and each open graph
 * asks the recorder for its history; closed, the card costs nothing. The
 * chosen readings and time range are remembered in the browser and shared
 * by every unit, so picking "compressor" once applies on the next unit.
 */

import { LitElement, css, html, nothing, TemplateResult } from "lit";

const CARD = "ac-history-card";
const STORE = "ac-history-card:choice";

interface EntityEntry {
  entity_id: string;
  device_id?: string;
  hidden?: boolean;
}

interface HassLike {
  states: Record<string, { state: string; attributes: Record<string, unknown> }>;
  entities?: Record<string, EntityEntry>;
}

interface CardElement extends HTMLElement {
  hass?: unknown;
}

interface Config {
  type: string;
  climate?: string;
  hours?: number;
  open?: boolean;
}

/** The readings a D-BACS unit publishes, by the end of their entity id,
 * in the order they are offered. Anything else on the device is offered
 * after these under its own name. */
const KNOWN: [RegExp, string][] = [
  [/_room_temperature(_\d+)?$/, "Room temp"],
  [/^sensor\..*_setpoint(_\d+)?$/, "Setpoint"],
  [/_mode(_\d+)?$/, "Mode"],
  [/_running(_\d+)?$/, "On / off"],
  [/_compressor(_\d+)?$/, "Compressor"],
  [/_thermostat(_\d+)?$/, "Thermo on"],
  [/_indoor_fan(_\d+)?$/, "Indoor fan"],
  [/_fan_speed(_\d+)?$/, "Fan speed"],
  [/_air_direction(_\d+)?$/, "Air direction"],
  [/_heater(_\d+)?$/, "Heater"],
  [/_energy_saving(_\d+)?$/, "Energy saving"],
  [/_forced_thermostat_off(_\d+)?$/, "Forced thermo off"],
  [/_alarm(_\d+)?$/, "Alarm"],
  [/_(malfunction|fault)_code(_\d+)?$/, "Fault code"],
  [/_communication(_\d+)?$/, "Comms fault"],
  [/_filter(_\d+)?$/, "Filter sign"],
  [/_accumulated_power(_\d+)?$/, "Power used"],
  [/_accumulated_gas(_\d+)?$/, "Gas used"],
];

/** What is plotted until someone chooses otherwise. */
const DEFAULT = ["Room temp", "Setpoint", "Mode", "On / off", "Compressor"];

const RANGES = [6, 24, 72, 168];

/** Domains with nothing worth plotting. */
const SKIP = /^(button|event|switch|climate|update)\./;

interface Reading {
  entity: string;
  label: string;
}

/** Every plottable reading on the climate entity's device. */
export function readingsFor(hass: HassLike, climate: string): Reading[] {
  const device = hass.entities?.[climate]?.device_id;
  if (!device) return [];
  const known: (Reading & { rank: number })[] = [];
  const other: Reading[] = [];
  for (const entry of Object.values(hass.entities ?? {})) {
    if (entry.device_id !== device || entry.hidden) continue;
    const id = entry.entity_id;
    if (SKIP.test(id) || !hass.states[id]) continue;
    const rank = KNOWN.findIndex(([pattern]) => pattern.test(id));
    if (rank >= 0) {
      known.push({ entity: id, label: KNOWN[rank][1], rank });
    } else {
      const name = String(hass.states[id].attributes.friendly_name ?? id);
      other.push({ entity: id, label: name });
    }
  }
  known.sort((a, b) => a.rank - b.rank);
  other.sort((a, b) => a.label.localeCompare(b.label));
  return [...known.map(({ entity, label }) => ({ entity, label })), ...other];
}

interface Choice {
  labels: string[];
  hours: number;
}

function loadChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(STORE);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.labels)) return parsed as Choice;
  } catch {
    // Private windows and blocked storage: fall back to the defaults.
  }
  return null;
}

function saveChoice(choice: Choice): void {
  try {
    window.localStorage.setItem(STORE, JSON.stringify(choice));
  } catch {
    // Not remembered; the card still works.
  }
}

class AcHistoryCard extends LitElement {
  static override properties = {
    _config: { state: true },
    _open: { state: true },
    _labels: { state: true },
    _hours: { state: true },
  };

  declare private _config?: Config;
  declare private _open: boolean;
  declare private _labels: string[];
  declare private _hours: number;

  private _hass?: HassLike;
  private _graph?: CardElement;
  private _graphKey = "";

  constructor() {
    super();
    this._open = false;
    const saved = loadChoice();
    this._labels = saved?.labels ?? DEFAULT;
    this._hours = saved?.hours ?? 24;
  }

  set hass(hass: HassLike) {
    const first = !this._hass;
    this._hass = hass;
    if (this._graph) this._graph.hass = hass;
    // The chips only change when the registry does, so one render on the
    // first hass is enough; state changes are the graph's business.
    if (first) this.requestUpdate();
  }

  get hass(): HassLike | undefined {
    return this._hass;
  }

  setConfig(config: Config): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = config;
    if (config.hours) this._hours = config.hours;
    this._open = Boolean(config.open);
  }

  getCardSize(): number {
    return this._open ? 6 : 1;
  }

  static getStubConfig(): Config {
    return { type: `custom:${CARD}` };
  }

  private _readings(): Reading[] {
    if (!this._hass || !this._config?.climate) return [];
    return readingsFor(this._hass, this._config.climate);
  }

  private _toggle(label: string): void {
    this._labels = this._labels.includes(label)
      ? this._labels.filter((l) => l !== label)
      : [...this._labels, label];
    saveChoice({ labels: this._labels, hours: this._hours });
  }

  private _setHours(hours: number): void {
    this._hours = hours;
    saveChoice({ labels: this._labels, hours });
  }

  /** Home Assistant's history graph for what is chosen, rebuilt only when
   * the choice changes, so a state update does not refetch history. */
  private async _drawGraph(readings: Reading[]): Promise<void> {
    const host = this.renderRoot.querySelector(".graph");
    if (!host) return;
    const chosen = readings.filter((r) => this._labels.includes(r.label));
    const key = `${this._hours}|${chosen.map((r) => r.entity).join(",")}`;
    if (key === this._graphKey && this._graph?.isConnected) return;
    this._graphKey = key;
    host.replaceChildren();
    this._graph = undefined;
    if (!chosen.length) return;
    const helpers = await (window as unknown as {
      loadCardHelpers(): Promise<{
        createCardElement(c: Record<string, unknown>): CardElement;
      }>;
    }).loadCardHelpers();
    if (key !== this._graphKey) return;      // chosen again meanwhile
    const graph = helpers.createCardElement({
      type: "history-graph",
      hours_to_show: this._hours,
      entities: chosen.map((r) => ({ entity: r.entity, name: r.label })),
    });
    graph.hass = this._hass;
    host.replaceChildren(graph);
    this._graph = graph;
  }

  protected override updated(): void {
    if (this._open) void this._drawGraph(this._readings());
    else {
      this._graph = undefined;
      this._graphKey = "";
    }
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    if (!this._config.climate) {
      return html`<ha-card><div class="note">ac-history-card needs
        <code>climate</code>.</div></ha-card>`;
    }
    const readings = this._readings();
    return html`<ha-card>
      <button class="head" @click=${() => { this._open = !this._open; }}
              aria-expanded=${this._open ? "true" : "false"}>
        <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
        <span>History</span>
        <ha-icon class="chev"
                 icon=${this._open ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
      </button>
      ${this._open ? html`
        <div class="chips">
          ${readings.map((r) => html`
            <button class="chip ${this._labels.includes(r.label) ? "on" : ""}"
                    @click=${() => this._toggle(r.label)}>${r.label}</button>`)}
        </div>
        <div class="chips ranges">
          ${RANGES.map((h) => html`
            <button class="chip ${this._hours === h ? "on" : ""}"
                    @click=${() => this._setHours(h)}>
              ${h < 48 ? `${h} h` : `${h / 24} days`}</button>`)}
        </div>
        ${readings.some((r) => this._labels.includes(r.label))
          ? nothing
          : html`<div class="note">Tap a reading above to plot it.</div>`}
        <div class="graph"></div>` : nothing}
    </ha-card>`;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .head {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 10px 14px; border: 0; background: none; cursor: pointer;
      color: var(--primary-text-color); font: inherit; font-weight: 500;
    }
    .head .chev { margin-left: auto; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 12px 8px; }
    .chip {
      border: 1px solid var(--divider-color); border-radius: 16px;
      padding: 4px 10px; background: none; cursor: pointer; font: inherit;
      font-size: 0.85em; color: var(--primary-text-color);
    }
    .chip.on {
      background: var(--primary-color); border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .ranges .chip { font-size: 0.8em; }
    .note { padding: 4px 14px 12px; color: var(--secondary-text-color); }
    .graph > * { --ha-card-box-shadow: none; --ha-card-border-width: 0; }
  `;
}

if (!customElements.get(CARD)) {
  customElements.define(CARD, AcHistoryCard);
  (window as unknown as { customCards?: unknown[] }).customCards ??= [];
  (window as unknown as { customCards: unknown[] }).customCards.push({
    type: CARD,
    name: "AC History",
    description: "History of one AC unit, with the readings to plot picked by tapping.",
  });
}
