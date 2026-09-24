/**
 * Schneider Electric EasyLogic PM2200 faceplate.
 *
 * Drawn from photographs of the unit: a square charcoal panel-mount bezel,
 * a pale positive LCD set high in the face, and four round push keys on the
 * bezel below it. The display carries a dark title band across the top, four
 * left-labelled rows with right-aligned values and their units, and a
 * soft-key legend along the bottom matching the four keys.
 *
 * An earlier version of this file was drawn from memory rather than a
 * photograph and looked nothing like the product. Worth remembering.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 400;
const H = 400;

// The LCD sits high and slightly narrower than the bezel.
const LX = 62;
const LY = 84;
const LW = 276;
const LH = 244;

const ROWS = [LY + 58, LY + 104, LY + 150, LY + 196];

const KEY_Y = 352;
const KEY_X = [112, 172, 232, 292];

const CHASSIS = svg`
  <defs>
    <linearGradient id="pm-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#43484c" />
      <stop offset="45%" stop-color="#383d41" />
      <stop offset="100%" stop-color="#2b2f33" />
    </linearGradient>
    <linearGradient id="pm-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d9ded2" />
      <stop offset="100%" stop-color="#c6ccbe" />
    </linearGradient>
    <radialGradient id="pm-key" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0%" stop-color="#9a9a94" />
      <stop offset="70%" stop-color="#7b7b76" />
      <stop offset="100%" stop-color="#5e5e5a" />
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="url(#pm-bezel)" />
  <rect x="7" y="7" width="${W - 14}" height="${H - 14}" rx="9"
        fill="none" stroke="#20242700" stroke-width="1" />
  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" rx="6"
        fill="none" stroke="#4d5358" stroke-width="1" />

  <!-- Brand. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="pm-brand" x="48" y="58">Schneider</text>
  <text class="pm-brand-sub" x="48" y="72">Electric</text>
  <rect x="236" y="42" width="120" height="22" rx="3" fill="#4a5054" />
  <text class="pm-model" x="296" y="58" text-anchor="middle">EasyLogic PM2200</text>

  <!-- Display -->
  <rect x="${LX - 3}" y="${LY - 3}" width="${LW + 6}" height="${LH + 6}" rx="3"
        fill="#1d2124" />
  <rect x="${LX}" y="${LY}" width="${LW}" height="${LH}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${LX}" y="${LY}" width="${LW}" height="24" fill="#6a7482" />
  <rect x="${LX}" y="${LY}" width="26" height="24" fill="#8d97a4" />
  <rect x="${LX + LW - 26}" y="${LY}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${LX}" y1="${LY + LH - 26}" x2="${LX + LW}" y2="${LY + LH - 26}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${KEY_X.map(
    (x) => svg`
      <circle cx="${x}" cy="${KEY_Y}" r="21" fill="url(#pm-key)" />
      <circle cx="${x}" cy="${KEY_Y}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `
  )}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`;

/** Column geometry shared by every row. */
const LABEL_X = LX + 14;
const VALUE_RIGHT = LX + 196;

export const PM2200: Faceplate = {
  id: "schneider-pm2200",
  name: "Schneider EasyLogic PM2200",
  description:
    "Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",
  emulates: "Schneider Electric EasyLogic PM2200",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  pages: ["summary", "amps", "volts", "power"],
  regions: [
    // -- Summary: what the unit shows on its total page ----------------
    { id: "s-v", role: "volts_avg", kind: "text", page: "summary",
      x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "V avg", decimals: 1, size: 26 },
    { id: "s-i", role: "current_avg", kind: "text", page: "summary",
      x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "I avg", decimals: 2, size: 26 },
    { id: "s-p", role: "power_total", kind: "text", page: "summary",
      x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "P total", decimals: 2, size: 26 },
    { id: "s-e", role: "energy_total", kind: "text", page: "summary",
      x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "E total", decimals: 1, size: 26 },

    // -- Per-phase current --------------------------------------------
    { id: "i1", role: "current_l1", kind: "text", page: "amps",
      x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "I1", decimals: 2, size: 26 },
    { id: "i2", role: "current_l2", kind: "text", page: "amps",
      x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "I2", decimals: 2, size: 26 },
    { id: "i3", role: "current_l3", kind: "text", page: "amps",
      x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "I3", decimals: 2, size: 26 },
    { id: "iavg", role: "current_avg", kind: "text", page: "amps",
      x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "I avg", decimals: 2, size: 26 },

    // -- Per-phase voltage ---------------------------------------------
    { id: "u1", role: "volts_l1", kind: "text", page: "volts",
      x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "V1-N", decimals: 1, size: 26 },
    { id: "u2", role: "volts_l2", kind: "text", page: "volts",
      x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "V2-N", decimals: 1, size: 26 },
    { id: "u3", role: "volts_l3", kind: "text", page: "volts",
      x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "V3-N", decimals: 1, size: 26 },
    { id: "uavg", role: "volts_avg", kind: "text", page: "volts",
      x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "V avg", decimals: 1, size: 26 },

    // -- Power ----------------------------------------------------------
    { id: "pw1", role: "power_l1", kind: "text", page: "power",
      x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "P1", decimals: 2, size: 26 },
    { id: "pw2", role: "power_l2", kind: "text", page: "power",
      x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "P2", decimals: 2, size: 26 },
    { id: "pw3", role: "power_l3", kind: "text", page: "power",
      x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "P3", decimals: 2, size: 26 },
    { id: "pwf", role: "power_factor", kind: "text", page: "power",
      x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
      label: "PF", decimals: 2, size: 26 },

    // -- Chrome: title band and soft-key legend -------------------------
    { id: "t-sum", role: "", kind: "text", page: "summary", text: "Total",
      x: LX, y: LY - 2, w: LW, align: "middle", size: 15 },
    { id: "t-amp", role: "", kind: "text", page: "amps", text: "Current",
      x: LX, y: LY - 2, w: LW, align: "middle", size: 15 },
    { id: "t-vol", role: "", kind: "text", page: "volts", text: "Voltage",
      x: LX, y: LY - 2, w: LW, align: "middle", size: 15 },
    { id: "t-pow", role: "", kind: "text", page: "power", text: "Power",
      x: LX, y: LY - 2, w: LW, align: "middle", size: 15 },

    { id: "sk1", role: "", kind: "text", text: "I",
      x: LX + 6, y: LY + LH - 24, w: 60, align: "middle", size: 13 },
    { id: "sk2", role: "", kind: "text", text: "U-V",
      x: LX + 66, y: LY + LH - 24, w: 60, align: "middle", size: 13 },
    { id: "sk3", role: "", kind: "text", text: "PQS",
      x: LX + 126, y: LY + LH - 24, w: 60, align: "middle", size: 13 },
    { id: "sk4", role: "", kind: "text", text: "\u25b6",
      x: LX + 186, y: LY + LH - 24, w: 60, align: "middle", size: 13 },

    // -- Keys, under the soft-key legend --------------------------------
    { id: "k1", role: "", kind: "button", x: KEY_X[0] - 26, y: KEY_Y - 21,
      w: 52, h: 42, text: "", action: "page", target: "amps" },
    { id: "k2", role: "", kind: "button", x: KEY_X[1] - 26, y: KEY_Y - 21,
      w: 52, h: 42, text: "", action: "page", target: "volts" },
    { id: "k3", role: "", kind: "button", x: KEY_X[2] - 26, y: KEY_Y - 21,
      w: 52, h: 42, text: "", action: "page", target: "power" },
    { id: "k4", role: "", kind: "button", x: KEY_X[3] - 26, y: KEY_Y - 21,
      w: 52, h: 42, text: "", action: "page", target: "summary" },
  ],
};
