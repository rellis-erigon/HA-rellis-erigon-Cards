/**
 * Swimming pool plant.
 *
 * The pool is one thing to whoever is looking at it, and on this estate it
 * is two systems: the chlorinator and heating sit on their own controller,
 * and the water consumption comes off the BMS. This draws the plant half.
 * Pair it with a water meter faceplate in the same stack for the rest.
 *
 * Water temperature is the hero because it is the only number anyone
 * actually asks about. Everything else — heater, solar, filter pump — is
 * there to explain why the temperature is what it is.
 *
 * Read-only by construction: the modes are selects and the setpoints are
 * numbers, and Home Assistant's own rows handle those better than a
 * drawing can. Stack them underneath.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 420;
const H = 290;
const MUTED = "#8b93a1";
const WATER = "#38bdf8";
const BODY_EDGE = "#3d4551";

const artNode = svg`
  <defs>
    <linearGradient id="pool-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.25" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width=${W} height=${H} rx="10" fill="#101216" />
  <text x="16" y="26" fill=${MUTED} font-size="12" letter-spacing="1.6"
        font-family="inherit">POOL</text>

  <!-- The pool itself: a sectioned basin, deep end to the right -->
  <path d="M 24 128 L 232 128 L 232 206 Q 232 216 222 216
           L 34 216 Q 24 216 24 206 Z"
        fill="url(#pool-water)" stroke=${BODY_EDGE} stroke-width="2" />
  <path d="M 24 140 Q 60 132 96 140 T 168 140 T 232 140"
        fill="none" stroke=${WATER} stroke-width="2" opacity="0.65" />
  <path d="M 24 154 Q 60 146 96 154 T 168 154 T 232 154"
        fill="none" stroke=${WATER} stroke-width="1.5" opacity="0.35" />

  <!-- Return and suction, so the pump lamp has something to belong to -->
  <line x1="24" y1="236" x2="232" y2="236" stroke="#2563eb"
        stroke-width="4" stroke-linecap="round" opacity="0.8" />
  <text x="24" y="256" fill=${MUTED} font-size="9" letter-spacing="1.2"
        font-family="inherit">CIRCULATION</text>
`;

const regions: Region[] = [
  // Water temperature, large, with its unit taken from the entity rather
  // than painted on — a pool read in Fahrenheit is a real configuration.
  { id: "wt", role: "water_temp", kind: "text",
    x: 20, y: 86, w: 168, align: "start", decimals: 1, size: 52,
    unit: "", placeholder: "--" },
  { id: "wt_u", role: "water_temp", kind: "text", show: "unit",
    x: 192, y: 72, w: 40, align: "start", size: 16 },
  { id: "wt_lbl", role: "", kind: "text", text: "WATER",
    x: 20, y: 46, w: 168, align: "start", size: 10 },

  // Heating on the right, each with the setpoint it is working to.
  { id: "htr", role: "heater", kind: "lamp", label: "HEATER",
    x: 262, y: 58, w: 16, on: "#f97316", off: "#2a1d11" },
  { id: "htr_sp", role: "heater_setpoint", kind: "text",
    x: 324, y: 70, w: 80, align: "end", decimals: 1, size: 20,
    unit: "", placeholder: "", group: "heater_sp" },
  { id: "htr_sp_l", role: "", kind: "text", text: "HEATER SET",
    x: 324, y: 84, w: 80, align: "end", size: 9, group: "heater_sp" },

  { id: "solar", role: "solar", kind: "lamp", label: "SOLAR",
    x: 262, y: 110, w: 16, on: "#fbbf24", off: "#2a2512" },
  { id: "solar_sp", role: "solar_setpoint", kind: "text",
    x: 324, y: 122, w: 80, align: "end", decimals: 1, size: 20,
    unit: "", placeholder: "", group: "solar_sp" },
  { id: "solar_sp_l", role: "", kind: "text", text: "SOLAR SET",
    x: 324, y: 136, w: 80, align: "end", size: 9, group: "solar_sp" },

  { id: "pump", role: "filter_pump", kind: "lamp", label: "PUMP",
    x: 262, y: 162, w: 16, on: "#3ddc84", off: "#16281d" },

  // Modes as text: a chlorinator has more of them than a lamp can say,
  // and the word is what the operator recognises.
  { id: "pmode", role: "pump_mode", kind: "text",
    x: 262, y: 206, w: 142, align: "start", size: 13,
    placeholder: "", group: "pump_mode" },
  { id: "pmode_l", role: "", kind: "text", text: "PUMP MODE",
    x: 262, y: 220, w: 142, align: "start", size: 9, group: "pump_mode" },

  { id: "mode", role: "pool_mode", kind: "text",
    x: 262, y: 248, w: 142, align: "start", size: 13,
    placeholder: "", group: "pool_mode" },
  { id: "mode_l", role: "", kind: "text", text: "POOL MODE",
    x: 262, y: 262, w: 142, align: "start", size: 9, group: "pool_mode" },

  { id: "fault", role: "fault", kind: "lamp", label: "FAULT",
    x: 20, y: H - 26, w: 14, on: "#ef4444", off: "#2a1717" },
];

export const POOL_PLANT: Faceplate = {
  id: "pool-plant",
  name: "Pool Plant",
  card: "plant-equipment-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode,
  regions,
  description:
    "Pool heating and circulation. Water temperature is the hero; heater, "
    + "solar and filter pump explain why it is what it is. Read-only — "
    + "stack the mode selects and setpoint numbers underneath, which Home "
    + "Assistant's own rows do better than a drawing. Pair with a water "
    + "meter faceplate for consumption.",
  emulates: "Pool chlorinator / heat pump controller",
};
