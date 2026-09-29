/**
 * Smart water meter with alarm annunciators.
 *
 * The same electronic register as the LCD meter, plus the flags these
 * meters raise: continuous flow that never stops (a leak), a sudden step
 * change (a burst), flow the wrong way, and a failing battery.
 *
 * The annunciators show nothing when clear rather than "--". A row of
 * dashes beside the word LEAK reads as a fault to anyone glancing at it,
 * which is the opposite of what an all-clear should look like.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 440;
const H = 320;

const artNode = svg`
  <defs>
    <linearGradient id="sw-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#46505e" />
      <stop offset="100%" stop-color="#232931" />
    </linearGradient>
    <linearGradient id="sw-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ccd6c2" />
      <stop offset="100%" stop-color="#b3bfa8" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="12" fill="url(#sw-body)" />
  <rect x="58" y="26" width=${W - 116} height="196" rx="10"
        fill="#171c22" stroke="#12161b" stroke-width="2" />
  <rect x="74" y="42" width=${W - 148} height="164" rx="6" fill="url(#sw-glass)" />

  <text x="90" y="66" fill="#5d6b53" font-size="11" letter-spacing="1.6"
        font-family="inherit">TOTAL</text>
  <text x="90" y="152" fill="#5d6b53" font-size="11" letter-spacing="1.6"
        font-family="inherit">FLOW</text>

  <!-- Annunciator strip along the bottom of the glass -->
  <line x1="74" y1="176" x2=${W - 74} y2="176" stroke="#9aa78f" stroke-width="1" />
`;

export const SMART_WATER_METER: Faceplate = {
  id: "smart-water-meter",
  name: "Smart Water Meter",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode,
  description:
    "Electronic register with the flags these meters raise: leak, reverse "
    + "flow and battery. Clear annunciators show nothing, not dashes.",
  emulates: "Smart water meter with leak and reverse-flow detection",
  regions: [
    {
      id: "total", role: "volume_total", kind: "text", unit: "",
      x: 90, y: 116, w: 250, align: "start", decimals: 3, size: 40,
    },
    {
      id: "total_unit", role: "volume_total", kind: "text", show: "unit",
      x: 348, y: 116, w: 60, align: "start", size: 14,
    },
    {
      id: "flow", role: "flow_rate", kind: "text", unit: "",
      x: 90, y: 168, w: 170, align: "start", decimals: 2, size: 20,
      placeholder: "",
    },
    {
      id: "flow_unit", role: "flow_rate", kind: "text", show: "unit",
      x: 262, y: 168, w: 70, align: "start", size: 11,
    },
    {
      id: "alarm_lamp", role: "alarm", kind: "lamp", label: "LEAK",
      x: 96, y: 244, w: 14, on: "#ef4444", off: "#2a1717",
    },
    {
      id: "rev_lamp", role: "reverse_flow", kind: "lamp", label: "REVERSE",
      x: 186, y: 244, w: 14, on: "#f59e0b", off: "#2a2317",
    },
    {
      id: "batt", role: "battery", kind: "bar",
      x: 282, y: 246, w: 100, h: 11, min: 0, max: 100,
    },
    {
      id: "batt_pc", role: "battery", kind: "text",
      x: 282, y: 280, w: 100, align: "start", decimals: 0, size: 12,
      label: "BATTERY", placeholder: "",
    },
  ],
};
