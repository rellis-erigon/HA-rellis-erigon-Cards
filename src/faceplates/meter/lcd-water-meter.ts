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
    // The register reads in whole units with three decimals, so six
    // digits plus a point plus three is ten glyphs. At 42px that ran off
    // the glass and took the unit with it; 30px fits the width the real
    // module has.
    {
      id: "total_lbl", role: "", kind: "text", text: "TOTAL", group: "total",
      x: 92, y: 74, w: 90, align: "start", size: 11,
    },
    {
      id: "total", role: "volume_total", kind: "text", unit: "", group: "total",
      x: 92, y: 96, w: 210, align: "start", decimals: 3, size: 30,
    },
    {
      id: "total_unit", role: "volume_total", kind: "text", show: "unit",
      group: "total",
      x: 306, y: 106, w: 54, align: "start", size: 13,
    },
    {
      id: "flow_lbl", role: "", kind: "text", text: "FLOW", group: "flow",
      x: 92, y: 158, w: 90, align: "start", size: 11,
    },
    {
      id: "flow", role: "flow_rate", kind: "text", unit: "", group: "flow",
      x: 92, y: 168, w: 150, align: "start", decimals: 2, size: 22,
      placeholder: "",
    },
    {
      id: "flow_unit", role: "flow_rate", kind: "text", show: "unit",
      group: "flow",
      x: 248, y: 176, w: 70, align: "start", size: 12,
    },
    {
      id: "batt_lbl", role: "", kind: "text", text: "BATTERY", group: "batt",
      x: 68, y: 242, w: 90, align: "start", size: 11,
    },
    {
      id: "batt", role: "battery", kind: "bar", group: "batt",
      x: 160, y: 248, w: 150, h: 12, min: 0, max: 100,
    },
    {
      id: "batt_pc", role: "battery", kind: "text", group: "batt",
      x: 318, y: 242, w: 60, align: "start", decimals: 0, size: 13,
      placeholder: "",
    },
  ],
};
