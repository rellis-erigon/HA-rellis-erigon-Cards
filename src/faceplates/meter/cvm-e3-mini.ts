/**
 * Circutor CVM-E3-MINI faceplate.
 *
 * Drawn from a straight-on photograph of a CVM-E3-MINI-WiEth: a light grey
 * panel-mount bezel, a black negative LCD carrying three right-aligned
 * values with their magnitude and unit printed to the right, an annunciator
 * column down the left edge, and a four-key bezel beneath — power glyph,
 * left arrow, a wide menu key, right arrow.
 *
 * The three default rows are active, apparent and reactive power, which is
 * what the unit shows on its power page.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 400;
const H = 330;

const LCD_TOP = 50;
const LCD_H = 196;

const CHASSIS = svg`
  <defs>
    <linearGradient id="cvm-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2f2f0" />
      <stop offset="55%" stop-color="#e2e2df" />
      <stop offset="100%" stop-color="#cdcdc9" />
    </linearGradient>
    <linearGradient id="cvm-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#161a17" />
      <stop offset="100%" stop-color="#0b0d0b" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" rx="7" fill="url(#cvm-bezel)" />
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="6"
        fill="none" stroke="#b4b4b0" stroke-width="1" />

  <!-- Brand strip. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="cvm-brand" x="18" y="34">Circutor</text>
  <text class="cvm-model" x="${W - 18}" y="33" text-anchor="end">CVM-E3-MINI-WiEth</text>

  <!-- Display, recessed -->
  <rect x="12" y="${LCD_TOP}" width="${W - 24}" height="${LCD_H}" rx="3"
        fill="url(#cvm-lcd)" stroke="#9a9a96" stroke-width="2" />

  <!-- Annunciator column -->
  <text class="cvm-annun teal" x="26" y="78">&#9660;&#952;</text>
  <text class="cvm-annun teal" x="26" y="94">T1</text>
  <text class="cvm-annun" x="26" y="150">inst</text>
  <g class="cvm-annun-icon" transform="translate(26 196)">
    <path d="M0 8 A11 11 0 0 1 16 8" fill="none" stroke="#3fbfa8" stroke-width="2.2" />
    <path d="M3.5 12 A6.5 6.5 0 0 1 12.5 12" fill="none" stroke="#3fbfa8" stroke-width="2.2" />
    <circle cx="8" cy="16.5" r="2" fill="#3fbfa8" />
  </g>

  <!-- Phase-count marks, as on the unit -->
  <g stroke="#e9efe7" stroke-width="2.4">
    <line x1="352" y1="70" x2="352" y2="82" />
    <line x1="358" y1="70" x2="358" y2="82" />
    <line x1="364" y1="70" x2="364" y2="82" />
  </g>

  <!-- Key bezel -->
  <g class="cvm-glyph">
    <circle cx="30" cy="291" r="9" fill="none" stroke="#6c7075" stroke-width="2" />
    <line x1="30" y1="279" x2="30" y2="290" stroke="#6c7075" stroke-width="2" />
    <text x="352" y="298" class="cvm-annun dark">(&#8226;)</text>
  </g>
`;

export const CVM_E3_MINI: Faceplate = {
  id: "circutor-cvm-e3-mini",
  name: "Circutor CVM-E3-MINI",
  description:
    "Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",
  emulates: "Circutor CVM-E3-MINI-WiEth",
  card: "bms-meter-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode: CHASSIS,
  pages: ["power", "volts", "amps", "energy"],
  regions: [
    // -- Power page: the unit's default view ---------------------------
    { id: "p-w", role: "power_total", kind: "text", page: "power",
      x: 70, y: 66, w: 232, align: "end", unit: "", decimals: 2, size: 42 },
    { id: "p-va", role: "apparent_power", kind: "text", page: "power",
      x: 70, y: 124, w: 232, align: "end", decimals: 2, size: 42 },
    { id: "p-var", role: "reactive_power", kind: "text", page: "power",
      x: 70, y: 180, w: 232, align: "end", decimals: 2, size: 42 },

    // -- Volts ---------------------------------------------------------
    { id: "v1", role: "volts_l1", kind: "text", page: "volts",
      x: 70, y: 66, w: 232, align: "end", decimals: 1, size: 42 },
    { id: "v2", role: "volts_l2", kind: "text", page: "volts",
      x: 70, y: 124, w: 232, align: "end", decimals: 1, size: 42 },
    { id: "v3", role: "volts_l3", kind: "text", page: "volts",
      x: 70, y: 180, w: 232, align: "end", decimals: 1, size: 42 },

    // -- Amps ----------------------------------------------------------
    { id: "a1", role: "current_l1", kind: "text", page: "amps",
      x: 70, y: 66, w: 232, align: "end", decimals: 2, size: 42 },
    { id: "a2", role: "current_l2", kind: "text", page: "amps",
      x: 70, y: 124, w: 232, align: "end", decimals: 2, size: 42 },
    { id: "a3", role: "current_l3", kind: "text", page: "amps",
      x: 70, y: 180, w: 232, align: "end", decimals: 2, size: 42 },

    // -- Energy --------------------------------------------------------
    { id: "e-tot", role: "energy_total", kind: "text", page: "energy",
      x: 70, y: 82, w: 232, align: "end", decimals: 1, size: 44 },
    { id: "e-pf", role: "power_factor", kind: "text", page: "energy",
      x: 70, y: 160, w: 232, align: "end", decimals: 2, size: 36 },

    // -- Keys ----------------------------------------------------------
    { id: "k-prev", role: "", kind: "button",
      x: 86, y: 272, w: 40, h: 40, text: "‹", action: "prev_page" },
    { id: "k-menu", role: "", kind: "button",
      x: 146, y: 274, w: 108, h: 36, text: "☰", action: "next_page" },
    { id: "k-next", role: "", kind: "button",
      x: 274, y: 272, w: 40, h: 40, text: "›", action: "next_page" },
  ],
};
