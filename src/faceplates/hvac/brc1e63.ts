/**
 * Daikin BRC1E63 navigation controller faceplate.
 *
 * Drawn from photographs: a white square bezel with the wordmark centred at
 * the top, a landscape positive LCD, and below it four pill keys at the
 * corners around a circular navigation pad with a centre enter key.
 *
 * The display is divided the way the real one is — mode and fan on the left,
 * clock across the top right, and set-point and room temperature side by
 * side beneath it.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 400;
const H = 400;

// Display
const LX = 66;
const LY = 84;
const LW = 268;
const LH = 124;
const SPLIT = LX + 104;        // mode column | readings column
const RULE = LY + 34;          // under the clock
const MID = SPLIT + (LX + LW - SPLIT) / 2;
const FOOT = LY + LH - 20;     // status strip along the bottom

// Keys
const PAD_CX = 200;
const PAD_CY = 296;
const PAD_R = 62;
const PILL_W = 96;
const PILL_H = 30;

const CHASSIS = svg`
  <defs>
    <linearGradient id="brc-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa" />
      <stop offset="60%" stop-color="#f1f1ef" />
      <stop offset="100%" stop-color="#e2e2df" />
    </linearGradient>
    <linearGradient id="brc-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d7dbd0" />
      <stop offset="100%" stop-color="#c8cec0" />
    </linearGradient>
    <linearGradient id="brc-pill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfdfc" />
      <stop offset="100%" stop-color="#e6e6e3" />
    </linearGradient>
    <radialGradient id="brc-pad" cx="0.4" cy="0.3" r="0.85">
      <stop offset="0%" stop-color="#fdfdfd" />
      <stop offset="78%" stop-color="#eeeeec" />
      <stop offset="100%" stop-color="#dcdcd8" />
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" rx="16" fill="url(#brc-bezel)" />
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="15"
        fill="none" stroke="#d2d2ce" stroke-width="1.5" />

  <!-- Wordmark. Marks belong to their owners; see TRADEMARKS.md. -->
  <g transform="translate(152 44)">
    <path d="M0 0 L17 0 L8.5 14 Z" fill="#2f3439" />
    <text class="brc-brand" x="24" y="13">DAIKIN</text>
  </g>

  <!-- Display -->
  <rect x="${LX - 4}" y="${LY - 4}" width="${LW + 8}" height="${LH + 8}" rx="3"
        fill="#b3b8ac" />
  <rect x="${LX}" y="${LY}" width="${LW}" height="${LH}" fill="url(#brc-lcd)" />
  <line x1="${SPLIT}" y1="${LY}" x2="${SPLIT}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${SPLIT}" y1="${RULE}" x2="${LX + LW}" y2="${RULE}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${MID}" y1="${RULE}" x2="${MID}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${LX}" y1="${FOOT}" x2="${LX + LW}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />

  <!-- Fan and swing glyphs, as printed on the display -->
  <g transform="translate(${LX + 12} ${LY + 62})" fill="#26302a">
    <circle cx="6" cy="6" r="5.5" fill="none" stroke="#26302a" stroke-width="1.6" />
    <path d="M6 1.5 C9 3 9 6 6 6 C3 6 3 9 6 10.5" fill="none"
          stroke="#26302a" stroke-width="1.6" />
  </g>
  <g transform="translate(${LX + 54} ${LY + 60})" stroke="#26302a" stroke-width="1.6" fill="none">
    <path d="M0 8 L14 2" stroke-dasharray="3 2.5" />
    <rect x="16" y="0" width="11" height="6" rx="1.5" />
  </g>

  <!-- Pill keys -->
  <g>
    <rect x="46" y="228" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${W - 46 - PILL_W}" y="228" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="46" y="332" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${W - 46 - PILL_W}" y="332" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
  </g>

  <!-- Key glyphs -->
  <g fill="#3a4046" stroke="none">
    <text class="brc-glyph" x="94" y="249" text-anchor="middle">&#10052; &#9788;</text>
    <text class="brc-glyph" x="94" y="353" text-anchor="middle">&#10052;&#10052;</text>
    <text class="brc-glyph" x="306" y="353" text-anchor="middle">&#8635;</text>
  </g>
  <g transform="translate(${W - 46 - PILL_W / 2} 243)" stroke="#3a4046"
     stroke-width="1.8" fill="none">
    <circle cx="0" cy="0" r="7" />
    <line x1="0" y1="-10" x2="0" y2="-1" />
  </g>

  <!-- Navigation pad -->
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="${PAD_R}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="${PAD_R - 6}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${PAD_CX}" y="${PAD_CY + 7}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${PAD_CX - 6},${PAD_CY - 40} ${PAD_CX + 6},${PAD_CY - 40} ${PAD_CX},${PAD_CY - 50}" />
    <polygon points="${PAD_CX - 6},${PAD_CY + 40} ${PAD_CX + 6},${PAD_CY + 40} ${PAD_CX},${PAD_CY + 50}" />
    <polygon points="${PAD_CX - 40},${PAD_CY - 6} ${PAD_CX - 40},${PAD_CY + 6} ${PAD_CX - 50},${PAD_CY}" />
    <polygon points="${PAD_CX + 40},${PAD_CY - 6} ${PAD_CX + 40},${PAD_CY + 6} ${PAD_CX + 50},${PAD_CY}" />
  </g>
`;

export const BRC1E63: Faceplate = {
  id: "daikin-brc1e63",
  name: "Daikin BRC1E63",
  description:
    "Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",
  emulates: "Daikin BRC1E63 / BRC1E53 navigation remote controller",
  card: "hvac-controller-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    // -- Left column: mode and fan -------------------------------------
    { id: "mode", role: "hvac_mode", kind: "text",
      x: LX + 10, y: LY + 8, w: 88, align: "start", size: 22 },
    { id: "fan", role: "fan_speed", kind: "text",
      x: LX + 26, y: LY + 58, w: 24, align: "start", size: 13,
      placeholder: "" },

    // -- Clock ----------------------------------------------------------
    { id: "clock", role: "clock", kind: "text",
      x: SPLIT, y: LY + 4, w: LX + LW - SPLIT, align: "middle", size: 22 },

    // -- Set point and room, side by side -------------------------------
    { id: "sp-label", role: "", kind: "text", text: "Set temp",
      x: SPLIT + 4, y: RULE + 2, w: MID - SPLIT - 8, align: "start", size: 11 },
    { id: "sp", role: "setpoint", kind: "text",
      x: SPLIT + 4, y: RULE + 18, w: MID - SPLIT - 8, align: "middle",
      unit: "°C", decimals: 0, size: 26 },

    { id: "room-label", role: "", kind: "text", text: "Room",
      x: MID + 4, y: RULE + 2, w: LX + LW - MID - 8, align: "start", size: 11 },
    { id: "room", role: "room_temp", kind: "text",
      x: MID + 4, y: RULE + 18, w: LX + LW - MID - 8, align: "middle",
      unit: "°C", decimals: 0, size: 26 },

    // -- Status strip ----------------------------------------------------
    { id: "status", role: "hvac_action", kind: "text",
      x: LX + 8, y: FOOT + 1, w: LW - 16, align: "start", size: 12,
      placeholder: "" },

    // -- Keys -------------------------------------------------------------
    { id: "k-mode", role: "", kind: "button",
      x: 46, y: 228, w: PILL_W, h: PILL_H, text: "", action: "mode_cycle" },
    { id: "k-power", role: "", kind: "button",
      x: W - 46 - PILL_W, y: 228, w: PILL_W, h: PILL_H, text: "", action: "power_toggle" },
    { id: "k-fan", role: "", kind: "button",
      x: 46, y: 332, w: PILL_W, h: PILL_H, text: "", action: "fan_cycle" },

    { id: "k-up", role: "", kind: "button",
      x: PAD_CX - 22, y: PAD_CY - 58, w: 44, h: 30, text: "", action: "temp_up" },
    { id: "k-down", role: "", kind: "button",
      x: PAD_CX - 22, y: PAD_CY + 28, w: 44, h: 30, text: "", action: "temp_down" },
  ],
};
