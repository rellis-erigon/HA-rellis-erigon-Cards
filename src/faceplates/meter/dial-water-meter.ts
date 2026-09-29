/**
 * Dial-face water meter.
 *
 * The older domestic style: a circular white face, a small odometer window
 * for whole units, and one large sweep hand reading the lowest decade. One
 * hand rather than four — this is the face you find on a single-jet meter,
 * where the fine decades are read off the hand's position alone.
 */
import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 380;
const H = 380;
const CX = 190;
const CY = 190;

const artNode = svg`
  <defs>
    <radialGradient id="dw-face" cx="0.38" cy="0.3" r="0.9">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="80%" stop-color="#f4f2ea" />
      <stop offset="100%" stop-color="#ddd9cc" />
    </radialGradient>
    <linearGradient id="dw-ring" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#8f96a1" />
      <stop offset="50%" stop-color="#5f666f" />
      <stop offset="100%" stop-color="#7c838d" />
    </linearGradient>
  </defs>

  <circle cx=${CX} cy=${CY} r="182" fill="#6c737d" />
  <circle cx=${CX} cy=${CY} r="182" fill="none" stroke="#464c55" stroke-width="3" />
  <circle cx=${CX} cy=${CY} r="162" fill="url(#dw-face)" />
  <circle cx=${CX} cy=${CY} r="162" fill="none" stroke="#b6b1a2" stroke-width="1.5" />

  <!-- Graduations: 100 minor, 10 major, as a litre face is divided -->
  <g>
    ${[...Array(100).keys()].map((i) => {
      const a = (i / 100) * Math.PI * 2 - Math.PI / 2;
      const major = i % 10 === 0;
      const r1 = major ? 128 : 138;
      return svg`<line
        x1=${CX + Math.cos(a) * r1} y1=${CY + Math.sin(a) * r1}
        x2=${CX + Math.cos(a) * 150} y2=${CY + Math.sin(a) * 150}
        stroke=${major ? "#3b4049" : "#9a958a"}
        stroke-width=${major ? 2.4 : 1} />`;
    })}
  </g>
  ${[...Array(10).keys()].map((i) => {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return svg`<text
      x=${CX + Math.cos(a) * 110} y=${CY + Math.sin(a) * 110 + 5}
      text-anchor="middle" fill="#3b4049" font-size="16"
      font-family="inherit">${i}</text>`;
  })}

  <text x=${CX} y="108" text-anchor="middle" fill="#7a7566" font-size="11"
        letter-spacing="2" font-family="inherit">m³</text>
  <text x=${CX} y=${CY + 132} text-anchor="middle" fill="#7a7566"
        font-size="11" letter-spacing="1.6" font-family="inherit">x 0.001 m³</text>
`;

export const DIAL_WATER_METER: Faceplate = {
  id: "dial-water-meter",
  name: "Dial Water Meter",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode,
  description:
    "Domestic dial face: an odometer window for whole cubic metres and a "
    + "single sweep hand for the lowest decade.",
  emulates: "Single-jet dial-face water meter",
  regions: [
    {
      id: "odo", role: "volume_total", kind: "odometer",
      x: 108, y: 128, w: 164, h: 38, digits: 5, redDigits: 1, scale: 1,
    },
    {
      id: "hand", role: "volume_total", kind: "needle",
      x: CX, y: CY + 36, r: 58, scale: 0.001,
    },
    {
      id: "flow", role: "flow_rate", kind: "text",
      x: CX - 90, y: CY + 116, w: 180, align: "middle", decimals: 2,
      size: 14, placeholder: "",
    },
  ],
};
