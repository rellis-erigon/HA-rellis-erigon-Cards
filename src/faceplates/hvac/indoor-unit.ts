/**
 * Indoor unit — everything the unit reports, not just what you set.
 *
 * `fcu-unit` is a tile built to be one of two hundred in a grid, so it
 * shows the four things worth reading from across a desk. This is the
 * other end: one unit, open, with every point a modern gateway publishes
 * about it. Use it on a unit somebody is actually looking into.
 *
 * Deliberately not a replica of any controller. A VRV indoor unit reaching
 * Home Assistant through a D-BACS gateway, an oBIX point tree or a BACnet
 * client is the same equipment reporting the same things, and the roles are
 * named for what they mean rather than for any one of those routes — so
 * this draws for all of them, and dims whatever a given site does not
 * publish.
 *
 * The two distinctions in the middle block are the ones worth having a
 * drawing for:
 *
 *   FAN as a lamp is whether the fan is turning; FAN as a speed is how
 *   fast it was asked to go. A gateway publishes both and they disagree —
 *   a unit reports airflow "High" with its fan stopped whenever the
 *   thermostat is satisfied.
 *
 *   COMP is the compressor of the outdoor unit serving this one. On most
 *   gateways it is the only outdoor information published at all, which
 *   makes it the thing that tells you a fault is upstream rather than here.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 360;
const H = 366;

/** Lamps, three to a row, in the order a person reads them. */
const LAMPS: [string, string, string, string][] = [
  // role, label, on colour, off colour
  ["run", "RUN", "#3ddc84", "#16281d"],
  ["fault", "ALARM", "#ef4444", "#2a1717"],
  ["filter", "FILTER", "#f59e0b", "#2a2113"],
  ["compressor", "COMP", "#38bdf8", "#152530"],
  ["fan_running", "FAN", "#3ddc84", "#16281d"],
  ["heater", "HEATER", "#fb7185", "#2c1620"],
  ["comms", "COMMS", "#ef4444", "#2a1717"],
  ["energy_saving", "ECO", "#a3e635", "#1f2714"],
  ["thermo_off", "T-OFF", "#f59e0b", "#2a2113"],
];

const LAMP_X = [16, 130, 244];
// A lamp's label sits 26 below its top, so rows closer than 38 apart put a
// label on the next lamp, and the last row's label must clear the rule
// above the keys.
const LAMP_Y = [190, 228, 266];

/** The control keys: one row of five across the foot of the panel, the
 * fifth turning the page.
 *
 * Mode and fan are not here. They were keys that stepped to the next
 * option, which is fine for two choices and poor for four — and this
 * gateway offers Low, Middle, High and Auto for the fan and five hvac
 * modes. They are drop-downs under the panel instead, drawn by the card in
 * HTML because SVG has no select.
 */
const KEY_W = 62;
const KEY_H = 32;
const KEY_X = [12, 81, 150, 219, 288];
const KEY_Y = 322;

const CONTROLS: [
  "temp_down" | "temp_up" | "power_toggle" | "filter_reset",
  string,
  number,
  string,
][] = [
  // action, label, column, role
  //
  // Only the filter key carries a role. The other three act through the
  // climate entity, which the card has from its config; this one presses a
  // button entity, and a role is how the card is told which button. It
  // also means the key dims on a unit that publishes no reset button —
  // which is every unit on a gateway with writing switched off.
  ["temp_down", "SET \u2212", 0, ""],
  ["temp_up", "SET +", 1, ""],
  ["power_toggle", "ON / OFF", 2, ""],
  ["filter_reset", "FILTER", 3, "filter_reset"],
];

const artNode = svg`
  <defs>
    <linearGradient id="iu-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3139" />
      <stop offset="100%" stop-color="#1b2027" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="8" fill="url(#iu-case)" />
  <rect x="0" y="0" width=${W} height="24" rx="8" fill="#232a32" />
  <rect x="0" y="16" width=${W} height="8" fill="#232a32" />
  <text x="12" y="17" fill="#a7b2c0" font-size="11" letter-spacing="1.6"
        font-family="inherit">INDOOR UNIT</text>

  <!-- A cassette seen from below: body, grille, and a swinging louvre.
       Enough to say "this is the box in the ceiling" without pretending
       to be a photograph of one. -->
  <g transform="translate(272, 38)">
    <rect x="0" y="0" width="72" height="72" rx="6"
          fill="#141921" stroke="#333b45" />
    <rect x="10" y="10" width="52" height="52" rx="3"
          fill="#1a2028" stroke="#2b323b" />
    ${[0, 1, 2, 3].map(
      (i) => svg`<line x1="14" y1=${18 + i * 12} x2="58" y2=${18 + i * 12}
        stroke="#4b7fae" stroke-width="2" stroke-linecap="round" />`
    )}
    <path d="M 10 66 q 26 10 52 0" fill="none" stroke="#6f7886"
          stroke-width="2.5" stroke-linecap="round" />
  </g>

  <!-- Separators: readings, then settings, then lamps, then the keys. -->
  <line x1="12" y1="122" x2=${W - 12} y2="122" stroke="#2b323b" />
  <line x1="12" y1="178" x2=${W - 12} y2="178" stroke="#2b323b" />
  <line x1="12" y1="302" x2=${W - 12} y2="302" stroke="#2b323b" />
  <text x="12" y="315" fill="#6f7886" font-size="9" letter-spacing="1.4"
        font-family="inherit">CONTROL</text>

  <!-- Key bodies. The card draws a button as a bare hit area, which suits
       a photographed panel whose keys are in the picture; this panel is
       drawn, so its keys are too, or they read as captions. -->
  ${KEY_X.map((x) => svg`<rect x=${x} y=${KEY_Y} width=${KEY_W}
      height=${KEY_H} rx="5" fill="#323a44" stroke="#46505c" />`)}
`;

/** Readings on the second page: role, label, column, row. */
const MORE: [string, string, number, number][] = [
  ["energy_total", "ENERGY", 0, 0],
  ["gas_total", "GAS", 1, 0],
  ["ventilation_mode", "VENT MODE", 0, 1],
  ["ventilation_amount", "VENT AMOUNT", 1, 1],
];

/** Lamps on the second page: what the unit will and will not accept. */
const MORE_LAMPS: [string, string, string, string][] = [
  ["lock_power", "LOCK PWR", "#f59e0b", "#2a2113"],
  ["lock_mode", "LOCK MODE", "#f59e0b", "#2a2113"],
  ["lock_setpoint", "LOCK TEMP", "#f59e0b", "#2a2113"],
  ["central_rejected", "NO SUBGRP", "#ef4444", "#2a1717"],
  ["forced_off", "FORCED", "#ef4444", "#2a1717"],
];

const regions: Region[] = [
  // --- what the room is doing -------------------------------------------
  { id: "room_lbl", role: "", kind: "text", text: "ROOM", group: "room", page: "status",
    x: 14, y: 36, w: 70, align: "start", size: 10 },
  { id: "room", role: "room_temp", kind: "text", group: "room", page: "status",
    x: 14, y: 42, w: 120, align: "start", unit: "", decimals: 1, size: 44 },
  { id: "room_unit", role: "", kind: "text", text: "°C", group: "room", page: "status",
    x: 136, y: 58, w: 30, align: "start", size: 16 },

  { id: "set_lbl", role: "", kind: "text", text: "SET", group: "set", page: "status",
    x: 182, y: 36, w: 60, align: "start", size: 10 },
  { id: "set", role: "setpoint", kind: "text", group: "set", page: "status",
    x: 182, y: 44, w: 70, align: "start", unit: "", decimals: 1, size: 24 },
  { id: "set_unit", role: "", kind: "text", text: "°C", group: "set", page: "status",
    x: 250, y: 56, w: 26, align: "start", size: 12 },

  // What it is doing now, as opposed to what it is set to. An idle unit in
  // heat mode is not heating, and showing only the mode says it is.
  { id: "action_lbl", role: "", kind: "text", text: "DOING", group: "action", page: "status",
    x: 14, y: 90, w: 70, align: "start", size: 10 },
  { id: "action", role: "hvac_action", kind: "text", group: "action", page: "status",
    x: 14, y: 96, w: 150, align: "start", size: 15, placeholder: "" },

  { id: "code_lbl", role: "", kind: "text", text: "CODE", group: "code", page: "status",
    x: 182, y: 90, w: 60, align: "start", size: 10 },
  { id: "code", role: "fault_code", kind: "text", group: "code", page: "status",
    x: 182, y: 96, w: 120, align: "start", size: 15, placeholder: "" },

  // --- what it has been asked to do -------------------------------------
  { id: "mode_lbl", role: "", kind: "text", text: "MODE", group: "mode", page: "status",
    x: 14, y: 138, w: 70, align: "start", size: 10 },
  { id: "mode", role: "hvac_mode", kind: "text", group: "mode", page: "status",
    x: 14, y: 144, w: 120, align: "start", size: 15, placeholder: "" },

  { id: "fan_lbl", role: "", kind: "text", text: "FAN", group: "fan_speed", page: "status",
    x: 140, y: 138, w: 50, align: "start", size: 10 },
  { id: "fan", role: "fan_speed", kind: "text", group: "fan_speed", page: "status",
    x: 140, y: 144, w: 90, align: "start", size: 15, placeholder: "" },

  { id: "swing_lbl", role: "", kind: "text", text: "AIR", group: "swing", page: "status",
    x: 250, y: 138, w: 50, align: "start", size: 10 },
  { id: "swing", role: "swing", kind: "text", group: "swing", page: "status",
    x: 250, y: 144, w: 100, align: "start", size: 15, placeholder: "" },

  // --- what can be changed from here ------------------------------------
  //
  // Keys rather than a slider or a dropdown: this is drawn as a panel
  // and read at a glance, and a touch target of about a hundred by thirty
  // survives being used on a phone. Setpoint steps in half degrees, which
  // is what the card sends and what the gateway accepts.
  //
  // The keys are deliberately not hidden when a unit is read-only. A
  // gateway with writing switched off still publishes every reading, and a
  // panel that silently loses half its face depending on an option is
  // harder to explain than one that says why when pressed — which the card
  // does.
  ...CONTROLS.map(([action, label, col, role]): Region => ({
    id: `key_${action}`,
    role,
    kind: "button",
    text: label,
    action,
    group: "",
    x: KEY_X[col],
    y: KEY_Y,
    w: KEY_W,
    h: KEY_H,
    radius: 5,
    size: 10,
  })),

  // --- what it reports about itself -------------------------------------
  ...LAMPS.map(([role, label, on, off], i): Region => ({
    id: `lamp_${role}`,
    role,
    kind: "lamp",
    label,
    group: role,
    page: "status",
    x: LAMP_X[i % 3],
    y: LAMP_Y[Math.floor(i / 3)],
    w: 13,
    on,
    off,
  })),

  // --- the second page: everything else the gateway publishes ----------
  //
  // These are real points on a D-BACS indoor unit that no face drew: the
  // per-unit accumulators, the ventilation settings on a firmware new
  // enough to publish them, and the wall-controller locks. They are on a
  // second page rather than crammed onto the first because a guest room is
  // read at a glance and this is the detail you go looking for.
  //
  // Most are off by default in the bridge — the accumulators are the whole
  // long-term statistics cost — so this page is mostly dim until somebody
  // turns them on, which is the honest way round.
  ...MORE.map(([role, label, col, row]): Region[] => [
    { id: `more_${role}_lbl`, role: "", kind: "text", text: label,
      group: role, page: "more",
      x: 14 + col * 176, y: 40 + row * 54, w: 160, align: "start", size: 10 },
    { id: `more_${role}`, role, kind: "text", group: role, page: "more",
      x: 14 + col * 176, y: 48 + row * 54, w: 160, align: "start", size: 17,
      placeholder: "" },
  ]).flat(),

  ...MORE_LAMPS.map(([role, label, on, off], i): Region => ({
    id: `more_lamp_${role}`,
    role,
    kind: "lamp",
    label,
    group: role,
    page: "more",
    x: LAMP_X[i % 3],
    y: LAMP_Y[Math.floor(i / 3)],
    w: 13,
    on,
    off,
  })),

  // One key, on both pages, so the second is reachable and escapable. It
  // is the fifth in the row: anywhere else it lands among the lamps, and
  // anything smaller fails a thumb.
  { id: "key_page", role: "", kind: "button", text: "MORE \u203a",
    action: "next_page", group: "",
    x: KEY_X[4], y: KEY_Y, w: KEY_W, h: KEY_H, radius: 5, size: 10 },
];

export const INDOOR_UNIT: Faceplate = {
  id: "indoor-unit",
  name: "Indoor Unit (full status)",
  card: "hvac-controller-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  pages: ["status", "more"],
  artNode,
  regions,
  description:
    "Every point an indoor unit reports: room against setpoint, what it is "
    + "doing as well as what it is set to, the manufacturer's fault code, "
    + "and lamps for run, alarm, filter, compressor, fan, heater, comms, "
    + "eco and forced thermostat off, with keys for setpoint, on/off and "
    + "clearing the filter sign, and drop-downs for mode and fan speed. "
    + "For one unit you are looking into, where fcu-unit is for two "
    + "hundred in a grid.",
  emulates: "Generic VRV or BMS indoor unit",
};
