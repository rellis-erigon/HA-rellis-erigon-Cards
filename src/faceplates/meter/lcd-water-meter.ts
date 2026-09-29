/**
 * Electronic water meter with an LCD module.
 *
 * A generic style rather than any one product: a moulded body with a
 * rotatable LCD head showing the cumulative total, the instantaneous flow
 * beneath it, and a battery state. These meters are battery-powered and
 * the battery is the thing that fails, so it gets a permanent region
 * rather than being hidden until it is low.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 420;
const H = 300;

const artNode = svg`
  <defs>
    <linearGradient id="lw-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5361" />
      <stop offset="100%" stop-color="#262c34" />
    </linearGradient>
    <linearGradient id="lw-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfd8c4" />
      <stop offset="100%" stop-color="#b9c4ac" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${W} height=${H} rx="12" fill="url(#lw-body)" />
  <rect x="8" y="112" width="30" height="96" rx="5" fill="#1b2027" />
  <rect x=${W - 38} y="112" width="30" height="96" rx="5" fill="#1b2027" />

  <!-- LCD head -->
  <rect x="58" y="34" width=${W - 116} height="180" rx="10"
        fill="#1b2027" stroke="#151a20" stroke-width="2" />
  <rect x="74" y="50" width=${W - 148} height="148" rx="6"
        fill="url(#lw-glass)" />

  <text x="92" y="74" fill="#5d6b53" font-size="11" letter-spacing="1.6"
        font-family="inherit">TOTAL</text>
  <text x="92" y="162" fill="#5d6b53" font-size="11" letter-spacing="1.6"
        font-family="inherit">FLOW</text>
  <text x=${W - 96} y="248" text-anchor="end" fill="#8b93a1" font-size="11"
        letter-spacing="1.4" font-family="inherit">BATTERY</text>
`;

export const LCD_WATER_METER: Faceplate = {
  id: "lcd-water-meter",
  name: "LCD Water Meter",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode,
  description:
    "Electronic register: cumulative total, instantaneous flow and a "
    + "battery bar, on a grey-green LCD.",
  emulates: "Battery-powered electronic water meter",
  regions: [
    {
      id: "total", role: "volume_total", kind: "text", unit: "",
      x: 92, y: 122, w: 240, align: "start", decimals: 3, size: 42,
    },
    {
      id: "total_unit", role: "volume_total", kind: "text", show: "unit",
      x: 340, y: 122, w: 60, align: "start", size: 15,
    },
    {
      id: "flow", role: "flow_rate", kind: "text", unit: "",
      x: 92, y: 190, w: 180, align: "start", decimals: 2, size: 22,
      placeholder: "",
    },
    {
      id: "flow_unit", role: "flow_rate", kind: "text", show: "unit",
      x: 276, y: 190, w: 70, align: "start", size: 12,
    },
    {
      id: "batt", role: "battery", kind: "bar",
      x: 68, y: 238, w: 200, h: 12, min: 0, max: 100,
    },
    {
      id: "batt_pc", role: "battery", kind: "text",
      x: 276, y: 249, w: 60, align: "start", decimals: 0, size: 13,
      placeholder: "",
    },
  ],
};
