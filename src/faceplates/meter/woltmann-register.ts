/**
 * Woltmann-type bulk register — straight reading.
 *
 * The style, not a particular manufacturer's product: a rectangular
 * register plate over a horizontal-turbine body, with one row of digits.
 * Black cells are whole cubic metres and red cells are the decimals, which
 * is the convention that stops a reader taking a litre figure for a tonne
 * of water.
 *
 * A single sweep hand shows the lowest decade, so it is visible that the
 * meter is turning at all when the digits are barely moving.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 440;
const H = 250;

const artNode = svg`
  <defs>
    <linearGradient id="wt-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5d6672" />
      <stop offset="45%" stop-color="#3f4752" />
      <stop offset="100%" stop-color="#2b323b" />
    </linearGradient>
    <linearGradient id="wt-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfcf7" />
      <stop offset="100%" stop-color="#e6e2d6" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="10" fill="url(#wt-body)" />
  <!-- Flanges, so the thing reads as an in-line body rather than a box -->
  <rect x="6" y="70" width="26" height="110" rx="4" fill="#232931" />
  <rect x=${W - 32} y="70" width="26" height="110" rx="4" fill="#232931" />

  <rect x="52" y="30" width=${W - 104} height=${H - 60} rx="8"
        fill="url(#wt-plate)" />
  <rect x="52" y="30" width=${W - 104} height=${H - 60} rx="8"
        fill="none" stroke="#8d8a7c" stroke-width="2" />

  <text x=${W / 2} y="62" text-anchor="middle" fill="#6b6659"
        font-size="13" letter-spacing="2" font-family="inherit">TOTAL VOLUME</text>
  <text x=${W / 2} y=${H - 46} text-anchor="middle" fill="#6b6659"
        font-size="12" letter-spacing="1" font-family="inherit">m³</text>
`;

export const WOLTMANN_REGISTER: Faceplate = {
  id: "woltmann-register",
  name: "Woltmann Bulk Register",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode,
  description:
    "Straight-reading bulk register: black cells for whole cubic metres, "
    + "red for the decimals, with a sweep hand on the lowest decade.",
  emulates: "Woltmann-type bulk water meter register",
  regions: [
    {
      id: "odo", role: "volume_total", kind: "odometer",
      x: 74, y: 84, w: 236, h: 52, digits: 5, redDigits: 0, scale: 1,
    },
    {
      // The decimals, as their own red group. Same role, lower decade —
      // five windows onto one number, as on the mechanical register.
      id: "dec", role: "volume_total", kind: "odometer",
      x: 316, y: 84, w: 54, h: 52, digits: 3, redDigits: 3, scale: 0.001,
    },
    {
      id: "hand", role: "volume_total", kind: "needle",
      x: 386, y: 178, r: 24, scale: 0.001,
    },
    {
      id: "flow", role: "flow_rate", kind: "text", group: "flow",
      x: 74, y: 184, w: 200, align: "start", decimals: 2, size: 15,
      label: "FLOW", placeholder: "",
    },
  ],
};
