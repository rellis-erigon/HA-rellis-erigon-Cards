/**
 * Compound water meter — two registers on one body.
 *
 * A compound meter carries a large turbine for high flow and a small
 * positive-displacement element for low flow, each with its own register.
 * Site consumption is the sum, but the two are drawn separately on
 * purpose: a bypass register that is climbing while the main sits still is
 * how a slow leak shows itself, and adding them together hides exactly
 * that.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 460;
const H = 300;

const artNode = svg`
  <defs>
    <linearGradient id="cm-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#55606e" />
      <stop offset="100%" stop-color="#2a313a" />
    </linearGradient>
    <linearGradient id="cm-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfcf7" />
      <stop offset="100%" stop-color="#e4e0d3" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="12" fill="url(#cm-body)" />
  <rect x="6" y="118" width="26" height="92" rx="4" fill="#1f242b" />
  <rect x=${W - 32} y="118" width="26" height="92" rx="4" fill="#1f242b" />

  <rect x="44" y="26" width="192" height="180" rx="8" fill="url(#cm-plate)" />
  <rect x="44" y="26" width="192" height="180" rx="8" fill="none"
        stroke="#8d8a7c" stroke-width="2" />
  <text x="140" y="52" text-anchor="middle" fill="#6b6659" font-size="12"
        letter-spacing="2" font-family="inherit">MAIN</text>

  <rect x="252" y="26" width="164" height="180" rx="8" fill="url(#cm-plate)" />
  <rect x="252" y="26" width="164" height="180" rx="8" fill="none"
        stroke="#8d8a7c" stroke-width="2" />
  <text x="334" y="52" text-anchor="middle" fill="#6b6659" font-size="12"
        letter-spacing="2" font-family="inherit">BYPASS</text>

  <text x="140" y="196" text-anchor="middle" fill="#6b6659" font-size="11"
        font-family="inherit">m³</text>
  <text x="334" y="196" text-anchor="middle" fill="#6b6659" font-size="11"
        font-family="inherit">m³</text>
`;

export const COMPOUND_METER: Faceplate = {
  id: "compound-meter",
  name: "Compound Water Meter",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode,
  description:
    "Two registers on one body — main turbine and low-flow bypass — kept "
    + "apart, because a bypass climbing alone is how a leak shows.",
  emulates: "Compound water meter with main and bypass registers",
  regions: [
    {
      id: "main", role: "volume_total", kind: "odometer",
      x: 60, y: 78, w: 160, h: 44, digits: 6, redDigits: 2, scale: 0.01,
    },
    {
      id: "main_hand", role: "volume_total", kind: "needle",
      x: 140, y: 162, r: 22, scale: 0.001,
    },
    {
      id: "bypass", role: "bypass_total", kind: "odometer",
      x: 266, y: 78, w: 136, h: 44, digits: 6, redDigits: 2, scale: 0.01,
    },
    {
      id: "bypass_hand", role: "bypass_total", kind: "needle",
      x: 334, y: 162, r: 22, scale: 0.001,
    },
    {
      id: "flow", role: "flow_rate", kind: "text",
      x: 44, y: 248, w: 200, align: "start", decimals: 2, size: 18,
      label: "FLOW", placeholder: "",
    },
  ],
};
