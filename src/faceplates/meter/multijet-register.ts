/**
 * Mechanical multi-jet water meter register.
 *
 * Drawn from a photograph: a brass register housing over a white dial, with
 * a five-digit odometer whose last cell is the highlighted decade, a
 * multiplier printed beside it, and four sweep dials of decreasing
 * significance across the bottom.
 *
 * This is the first faceplate where several regions share one role. A
 * mechanical register shows a single cumulative total spread across the
 * odometer and the dials; each region takes `volume_total` and differs only
 * in the decade it reads. Nothing is derived or summed — they are five
 * windows onto one number, which is exactly how the real thing works.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 400;
const H = 400;
const CX = 200;
const CY = 200;

const DIAL_Y = 286;
const DIAL_R = 27;
const DIALS = [
  { id: "d10", x: 104, scale: 10, label: "x10" },
  { id: "d1", x: 168, scale: 1, label: "x1" },
  { id: "d01", x: 232, scale: 0.1, label: "x0.1" },
  { id: "d001", x: 296, scale: 0.01, label: "x0.01" },
];

const CHASSIS = svg`
  <defs>
    <linearGradient id="mj-brass" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#e8d9a6" />
      <stop offset="35%" stop-color="#c9ad63" />
      <stop offset="70%" stop-color="#a98d45" />
      <stop offset="100%" stop-color="#d6c187" />
    </linearGradient>
    <radialGradient id="mj-face" cx="0.4" cy="0.32" r="0.85">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="85%" stop-color="#f2efe6" />
      <stop offset="100%" stop-color="#e2ded1" />
    </radialGradient>
  </defs>

  <!-- Brass housing -->
  <circle cx="${CX}" cy="${CY}" r="192" fill="url(#mj-brass)" />
  <circle cx="${CX}" cy="${CY}" r="192" fill="none" stroke="#8a7133" stroke-width="2" />
  <circle cx="${CX}" cy="${CY}" r="176" fill="none" stroke="#8a7133" stroke-width="1.2" />

  <!-- Knurling around the bezel -->
  <g stroke="#9c8138" stroke-width="1.6">
    ${[...Array(60).keys()].map((i) => {
      const a = (i / 60) * Math.PI * 2;
      return svg`<line
        x1="${CX + Math.cos(a) * 178}" y1="${CY + Math.sin(a) * 178}"
        x2="${CX + Math.cos(a) * 190}" y2="${CY + Math.sin(a) * 190}" />`;
    })}
  </g>

  <!-- Dial face -->
  <circle cx="${CX}" cy="${CY}" r="170" fill="url(#mj-face)" />

  <text class="mj-brand" x="${CX}" y="78" text-anchor="middle">MEASURED AUTOMATION</text>

  <!-- Odometer surround -->
  <rect x="112" y="110" width="176" height="40" rx="3"
        fill="#2b2b28" stroke="#15150f" stroke-width="1.5" />


  <!-- Specification block, as printed on the face -->
  <g class="mj-spec">
    <text x="64" y="206">Multi-jet</text>
    <text x="64" y="220">Model: MJ</text>
    <text x="64" y="234">Size: 5/8" x 1/2"</text>
    <text x="64" y="248">100&#176;F  150 PSI</text>
  </g>
`;

export const MULTIJET_REGISTER: Faceplate = {
  id: "multijet-water-register",
  name: "Multi-jet water register",
  description:
    "Mechanical register: five-digit odometer with an x100 multiplier over four sweep dials. Reads in US gallons.",
  emulates: "Multi-jet mechanical water meter register",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    // The odometer and every dial read the same role at different decades.
    { id: "odo", role: "volume_total", kind: "odometer",
      x: 116, y: 114, w: 168, h: 32, digits: 5, redDigits: 1, scale: 100 },
    // The unit comes from whatever is bound, not from the artwork.
    { id: "units", role: "volume_total", kind: "text", show: "unit",
      x: CX - 100, y: 160, w: 200, align: "middle", size: 14, text: "UNITS" },
    { id: "mult", role: "", kind: "text", text: "x100",
      x: 296, y: 118, w: 48, align: "start", size: 15 },

    ...DIALS.map((dial) => ({
      id: dial.id,
      role: "volume_total",
      kind: "needle" as const,
      x: dial.x,
      y: DIAL_Y,
      r: DIAL_R,
      scale: dial.scale,
      label: dial.label,
    })),
  ],
};
