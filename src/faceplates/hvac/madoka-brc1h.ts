/**
 * Daikin BRC1H63K (Madoka) faceplate.
 *
 * Drawn from a photograph of a wall-mounted unit: a cream square backplate,
 * a glossy round black face inset into it, an illuminated ring around the
 * circumference, and a dark display carrying the mode, the room label and a
 * large temperature in cyan. Three capacitive keys sit below the display —
 * minus, a circle, plus.
 *
 * The ring is lit whenever the unit is running and dark when it is off,
 * which is what the photographed unit shows. Real firmware also varies the
 * colour; that is not reproduced because it was not observable from one
 * photograph.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 360;
const H = 400;

const CX = 180;
const CY = 208;
const FACE_R = 132;

const CHASSIS = svg`
  <defs>
    <linearGradient id="madoka-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eeece6" />
      <stop offset="100%" stop-color="#ddd9d0" />
    </linearGradient>
    <radialGradient id="madoka-face" cx="0.35" cy="0.25" r="0.9">
      <stop offset="0%" stop-color="#2a2f35" />
      <stop offset="45%" stop-color="#111418" />
      <stop offset="100%" stop-color="#05070a" />
    </radialGradient>
  </defs>

  <!-- Wall plate -->
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" rx="8"
        fill="url(#madoka-plate)" stroke="#c7c2b8" stroke-width="1.5" />

  <!-- Brand, top-left of the plate as on the unit -->
  <g transform="translate(58 66)">
    <path d="M0 0 L13 0 L6.5 11 Z" fill="#2d3238" />
    <text class="madoka-brand" x="19" y="9">DAIKIN</text>
  </g>

  <!-- Round face -->
  <circle cx="${CX}" cy="${CY}" r="${FACE_R}" fill="url(#madoka-face)" />
  <circle cx="${CX}" cy="${CY}" r="${FACE_R - 10}" fill="none"
          stroke="#0a0d11" stroke-width="2" />

  <!-- Specular highlight, so the glass reads as glass -->
  <ellipse cx="${CX - 34}" cy="${CY - 74}" rx="62" ry="26"
           fill="#ffffff" opacity="0.06" />
`;

export const MADOKA_BRC1H: Faceplate = {
  id: "daikin-brc1h63k",
  name: "Daikin BRC1H63K (Madoka)",
  description:
    "Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",
  emulates: "Daikin BRC1H63K Madoka",
  card: "hvac-controller-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    // Status ring, drawn over the face edge.
    { id: "ring", role: "hvac_mode", kind: "ring",
      x: CX, y: CY, r: FACE_R - 4, stroke: 7, on: "#2f8fff", off: "#161b21" },

    { id: "mode", role: "hvac_mode", kind: "text",
      x: CX - 90, y: CY - 78, w: 180, align: "middle", size: 19 },

    { id: "roomlabel", role: "", kind: "text", text: "Room",
      x: CX - 92, y: CY - 44, w: 70, align: "start", size: 15 },

    // unit: "" because the faceplate prints the degree glyph separately.
    { id: "temp", role: "room_temp", kind: "text",
      x: CX - 96, y: CY - 26, w: 172, align: "middle", unit: "",
      decimals: 0, size: 68 },

    { id: "unit", role: "", kind: "text", text: "°C",
      x: CX + 78, y: CY - 18, w: 34, align: "start", size: 20 },

    // Fan and swing annunciators, bottom-left of the display area.
    { id: "fan", role: "fan_speed", kind: "text",
      x: CX - 96, y: CY + 6, w: 80, align: "start", size: 14,
      placeholder: "" },
    { id: "swing", role: "swing", kind: "text",
      x: CX - 96, y: CY + 26, w: 80, align: "start", size: 14,
      placeholder: "" },

    // Setpoint, smaller, to the right of the room reading.
    { id: "sp", role: "setpoint", kind: "text",
      x: CX + 6, y: CY + 6, w: 90, align: "end", label: "Set",
      decimals: 0, size: 18 },

    // Touch keys.
    { id: "minus", role: "", kind: "button",
      x: CX - 74, y: CY + 62, w: 44, h: 34, text: "−", action: "temp_down" },
    { id: "power", role: "", kind: "button",
      x: CX - 22, y: CY + 62, w: 44, h: 34, text: "○", action: "power_toggle" },
    { id: "plus", role: "", kind: "button",
      x: CX + 30, y: CY + 62, w: 44, h: 34, text: "+", action: "temp_up" },
  ],
};
