/**
 * Fan coil unit — a status tile, not a replica.
 *
 * The Daikin faceplates mirror a controller somebody looks at on a wall.
 * A BMS fan coil has no such thing: it is a box above a ceiling, and
 * what a person wants from it is the room temperature against its
 * setpoint, whether the fan is turning, and whether it is in alarm.
 *
 * Compact on purpose. There are a couple of hundred of these on a large
 * site and they get laid out in a grid, so the tile is wide and short
 * and the room temperature is the thing you can read from across a desk.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 360;
const H = 170;

const artNode = svg`
  <defs>
    <linearGradient id="fcu-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3139" />
      <stop offset="100%" stop-color="#1b2027" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="8" fill="url(#fcu-case)" />
  <rect x="0" y="0" width=${W} height="24" rx="8" fill="#232a32" />
  <rect x="0" y="16" width=${W} height="8" fill="#232a32" />
  <text x="12" y="17" fill="#8b93a1" font-size="10" letter-spacing="1.6"
        font-family="inherit">FAN COIL UNIT</text>

  <!-- A coil and a fan, so the tile reads as plant and not a thermostat -->
  <g transform="translate(286, 44)">
    <rect x="0" y="0" width="56" height="42" rx="4"
          fill="#141921" stroke="#333b45" />
    ${[0, 1, 2, 3].map(
      (i) => svg`<path d="M ${8 + i * 12} 6 q 6 7 0 14 q -6 7 0 14"
        fill="none" stroke="#4b7fae" stroke-width="2" />`
    )}
    <circle cx="28" cy="58" r="13" fill="#141921" stroke="#333b45" />
    ${[0, 1, 2].map((i) => {
      const a = (i / 3) * Math.PI * 2;
      return svg`<line x1="28" y1="58"
        x2=${28 + Math.cos(a) * 10} y2=${58 + Math.sin(a) * 10}
        stroke="#6f7886" stroke-width="2.5" stroke-linecap="round" />`;
    })}
  </g>

  <line x1="12" y1=${H - 44} x2=${W - 12} y2=${H - 44} stroke="#2b323b" />
`;

const regions: Region[] = [
  { id: "room_lbl", role: "", kind: "text", text: "ROOM", group: "room",
    x: 14, y: 36, w: 70, align: "start", size: 10 },
  // unit: "" because the degree glyph is its own region, kept at a size
  // that does not fight the number.
  { id: "room", role: "room_temp", kind: "text", group: "room",
    x: 14, y: 42, w: 120, align: "start", unit: "", decimals: 1, size: 44 },
  { id: "room_unit", role: "", kind: "text", text: "°C", group: "room",
    x: 136, y: 58, w: 30, align: "start", size: 16 },

  { id: "set_lbl", role: "", kind: "text", text: "SET", group: "set",
    x: 182, y: 36, w: 60, align: "start", size: 10 },
  { id: "set", role: "setpoint", kind: "text", group: "set",
    x: 182, y: 44, w: 70, align: "start", unit: "", decimals: 1, size: 24 },
  { id: "set_unit", role: "", kind: "text", text: "°C", group: "set",
    x: 250, y: 56, w: 26, align: "start", size: 12 },

  { id: "mode", role: "hvac_mode", kind: "text", group: "mode",
    x: 14, y: 96, w: 150, align: "start", size: 15, placeholder: "" },
  { id: "fan_lbl", role: "", kind: "text", text: "FAN", group: "fan",
    x: 182, y: 90, w: 50, align: "start", size: 10 },
  { id: "fan", role: "fan_speed", kind: "text", group: "fan",
    x: 182, y: 96, w: 90, align: "start", size: 15, placeholder: "" },

  { id: "run", role: "run", kind: "lamp", label: "RUN", group: "run",
    x: 16, y: H - 34, w: 13, on: "#3ddc84", off: "#16281d" },
  { id: "fault", role: "fault", kind: "lamp", label: "ALARM", group: "fault",
    x: 92, y: H - 34, w: 13, on: "#ef4444", off: "#2a1717" },
];

export const FCU_UNIT: Faceplate = {
  id: "fcu-unit",
  name: "Fan Coil Unit",
  card: "hvac-controller-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode,
  regions,
  description:
    "Compact status tile for a BMS fan coil: room against setpoint, mode, "
    + "fan and alarm. Built to tile, because sites have hundreds.",
  emulates: "Generic BMS fan coil unit",
};
