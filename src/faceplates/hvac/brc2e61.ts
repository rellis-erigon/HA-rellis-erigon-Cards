/**
 * Daikin BRC2E61 simplified controller faceplate.
 *
 * Drawn from photographs: a white square whose whole face is made of large
 * flat keys arranged around a small central LCD in a grey surround. A power
 * key and indicator sit at the top centre; up and down keys run down the
 * right; mode, fan and louvre keys sit left and bottom.
 *
 * The display is small on purpose — this controller shows the set point, the
 * mode and the fan speed, and little else.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 400;
const H = 400;

// Central display, in its grey surround.
//
// The first attempt made this about half the size it should be. On the real
// unit the surround takes most of the face and the keys are the border
// around it, not the other way round.
const SUR_X = 80;
const SUR_Y = 80;
const SUR = 240;
const LX = SUR_X + 16;
const LY = SUR_Y + 24;
const LW = SUR - 32;
const LH = SUR - 40;

const CHASSIS = svg`
  <defs>
    <linearGradient id="brc2-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfdfd" />
      <stop offset="100%" stop-color="#eaeae8" />
    </linearGradient>
    <linearGradient id="brc2-key" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#eeeeec" />
    </linearGradient>
    <linearGradient id="brc2-sur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b9bcc0" />
      <stop offset="100%" stop-color="#9da1a6" />
    </linearGradient>
    <linearGradient id="brc2-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d8dccd" />
      <stop offset="100%" stop-color="#c7ccba" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" rx="26" fill="url(#brc2-body)" />
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="25"
        fill="none" stroke="#dcdcda" stroke-width="1.5" />

  <!-- Key segmentation: the face is the keys, divided by fine seams -->
  <g stroke="#e0e0dd" stroke-width="1.6" fill="none">
    <line x1="${SUR_X}" y1="14" x2="${SUR_X}" y2="386" />
    <line x1="${SUR_X + SUR}" y1="14" x2="${SUR_X + SUR}" y2="386" />
    <line x1="14" y1="${SUR_Y}" x2="386" y2="${SUR_Y}" />
    <line x1="14" y1="${SUR_Y + SUR}" x2="386" y2="${SUR_Y + SUR}" />
  </g>

  <!-- Power indicator and key, top centre -->
  <rect x="192" y="22" width="16" height="9" rx="2" fill="#5f6a5c" />
  <g transform="translate(193 40)" stroke="#4a5057" stroke-width="1.8" fill="none">
    <circle cx="7" cy="8" r="6.5" />
    <line x1="7" y1="0" x2="7" y2="7" />
  </g>

  <!-- Display surround and glass -->
  <rect x="${SUR_X}" y="${SUR_Y}" width="${SUR}" height="${SUR}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${LX}" y="${LY}" width="${LW}" height="${LH}" rx="2"
        fill="url(#brc2-lcd)" stroke="#7d8277" stroke-width="1.5" />
  <line x1="${LX + 6}" y1="${LY + 96}" x2="${LX + LW - 6}" y2="${LY + 96}"
        stroke="#8b9180" stroke-width="1.4" />

  <!-- Wordmark, printed across the surround as on the unit -->
  <g transform="translate(${SUR_X + 74} ${SUR_Y + 6})">
    <path d="M0 0 L13 0 L6.5 11 Z" fill="#4a5057" />
    <text class="brc2-brand" x="18" y="10">DAIKIN</text>
  </g>

  <!-- Key glyphs -->
  <g class="brc2-glyph" fill="#4a5057">
    <!-- top-left: mode / display -->
    <g transform="translate(30 32)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="20" height="16" rx="2" />
      <line x1="2" y1="14" x2="18" y2="3" />
    </g>
    <!-- right: up and down chevrons -->
    <polyline points="344,50 360,34 376,50" fill="none" stroke="#4a5057"
              stroke-width="2.6" stroke-linecap="round" />
    <polyline points="344,350 360,366 376,350" fill="none" stroke="#4a5057"
              stroke-width="2.6" stroke-linecap="round" />
    <!-- right middle: thermometer keys -->
    <g transform="translate(356 140)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="7" height="18" rx="3.5" />
      <circle cx="3.5" cy="21" r="4.5" />
    </g>
    <g transform="translate(356 232)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="7" height="18" rx="3.5" />
      <circle cx="3.5" cy="21" r="4.5" />
    </g>
    <!-- bottom-left: fan -->
    <g transform="translate(30 346)" stroke="#4a5057" stroke-width="1.7" fill="none">
      <circle cx="11" cy="11" r="3" />
      <path d="M11 8 C15 3 21 5 20 10 C19 14 14 13 11 11" />
      <path d="M8 11 C3 9 2 3 7 2 C11 1 12 7 11 11" />
      <path d="M11 14 C12 19 8 23 5 19 C3 16 8 13 11 14" />
    </g>
    <!-- bottom-centre: louvre / swing -->
    <g transform="translate(184 348)" stroke="#4a5057" stroke-width="1.7" fill="none">
      <path d="M0 10 L16 2" stroke-dasharray="3 2.5" />
      <rect x="19" y="0" width="13" height="7" rx="1.5" />
    </g>
  </g>
`;

export const BRC2E61: Faceplate = {
  id: "daikin-brc2e61",
  name: "Daikin BRC2E61",
  description:
    "Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",
  emulates: "Daikin BRC2E61 simplified remote controller",
  card: "hvac-controller-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    // Mode glyph line across the top of the display.
    { id: "mode", role: "hvac_mode", kind: "text",
      x: LX + 8, y: LY + 8, w: LW - 16, align: "middle", size: 20 },

    // Set point, large, lower left as on the unit.
    { id: "sp", role: "setpoint", kind: "text",
      x: LX + 10, y: LY + 104, w: 104, align: "start", unit: "",
      decimals: 0, size: 48 },
    { id: "spunit", role: "", kind: "text", text: "\u00b0C",
      x: LX + 96, y: LY + 128, w: 24, align: "start", size: 16 },

    // Fan speed to the right of it.
    { id: "fan", role: "fan_speed", kind: "text",
      x: LX + 120, y: LY + 118, w: LW - 130, align: "end", size: 16,
      placeholder: "" },

    // Room temperature, small, under the rule.
    { id: "room", role: "room_temp", kind: "text",
      x: LX + 8, y: LY + 158, w: LW - 16, align: "middle",
      label: "", unit: "\u00b0C", decimals: 0, size: 16 },

    // Keys, positioned over the moulded segments.
    { id: "k-power", role: "", kind: "button",
      x: 120, y: 12, w: 160, h: 62, text: "", action: "power_toggle" },
    { id: "k-up", role: "", kind: "button",
      x: 326, y: 14, w: 66, h: 60, text: "", action: "temp_up" },
    { id: "k-down", role: "", kind: "button",
      x: 326, y: 326, w: 66, h: 60, text: "", action: "temp_down" },
    { id: "k-mode", role: "", kind: "button",
      x: 12, y: 14, w: 62, h: 60, text: "", action: "mode_cycle" },
    { id: "k-fan", role: "", kind: "button",
      x: 12, y: 326, w: 62, h: 60, text: "", action: "fan_cycle" },
  ],
};
