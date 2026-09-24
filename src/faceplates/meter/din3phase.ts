/**
 * DIN-rail three-phase analyser faceplate.
 *
 * The portrait form factor used by compact DIN-mounted power analysers —
 * Circutor's CVM-E3-Mini among them: a narrow housing, a stacked three-line
 * display showing one phase per row, and a small key cluster beneath.
 *
 * Deliberately *not* named after a specific model. It is drawn from the
 * general shape of this class of unit, not from a photograph of one, and
 * naming it after a product it does not accurately resemble is the wrong
 * kind of confident. A model-accurate faceplate needs a straight-on
 * photograph and the manual — see the request template in the README.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

// Roughly 3 DIN modules wide by 90mm tall, kept in proportion.
const W = 230;
const H = 380;

const CHASSIS = svg`
  <defs>
    <linearGradient id="din3p-case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b626a" />
      <stop offset="55%" stop-color="#474d54" />
      <stop offset="100%" stop-color="#3a4046" />
    </linearGradient>
    <linearGradient id="din3p-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd8b4" />
      <stop offset="100%" stop-color="#b6c69d" />
    </linearGradient>
  </defs>

  <!-- Housing with the stepped DIN profile -->
  <rect x="0" y="22" width="${W}" height="${H - 44}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${W - 36}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${H - 30}" width="${W - 36}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0, 1, 2, 3].map(
    (i) => svg`<rect x="${26 + i * 45}" y="4" width="34" height="20" rx="2" fill="#23282d" />`
  )}
  ${[0, 1, 2, 3].map(
    (i) => svg`<rect x="${26 + i * 45}" y="${H - 26}" width="34" height="20" rx="2" fill="#23282d" />`
  )}

  <!-- Display -->
  <rect x="20" y="52" width="${W - 40}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${W - 40}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${W - 28}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${W - 28}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${W - 40}" height="62" rx="4" fill="#2e343a" />
`;

export const DIN_3PHASE: Faceplate = {
  id: "din-3phase-analyser",
  name: "DIN-rail 3-phase analyser",
  description:
    "Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",
  card: "bms-meter-card",
  render: "svg",
  display: "positive",
  size: [W, H],
  artNode: CHASSIS,
  pages: ["volts", "amps", "power"],
  regions: [
    // Three stacked rows, one per phase, the way these units read.
    { id: "r1", role: "volts_l1", kind: "text", page: "volts",
      x: 34, y: 62, w: 162, label: "L1", unit: "V", decimals: 1, size: 30 },
    { id: "r2", role: "volts_l2", kind: "text", page: "volts",
      x: 34, y: 118, w: 162, label: "L2", unit: "V", decimals: 1, size: 30 },
    { id: "r3", role: "volts_l3", kind: "text", page: "volts",
      x: 34, y: 174, w: 162, label: "L3", unit: "V", decimals: 1, size: 30 },

    { id: "a1", role: "current_l1", kind: "text", page: "amps",
      x: 34, y: 62, w: 162, label: "L1", unit: "A", decimals: 2, size: 30 },
    { id: "a2", role: "current_l2", kind: "text", page: "amps",
      x: 34, y: 118, w: 162, label: "L2", unit: "A", decimals: 2, size: 30 },
    { id: "a3", role: "current_l3", kind: "text", page: "amps",
      x: 34, y: 174, w: 162, label: "L3", unit: "A", decimals: 2, size: 30 },

    { id: "pt", role: "power_total", kind: "text", page: "power",
      x: 34, y: 62, w: 162, label: "Total", unit: "kW", decimals: 2, size: 30 },
    { id: "pf", role: "power_factor", kind: "text", page: "power",
      x: 34, y: 118, w: 162, label: "PF", decimals: 2, size: 30 },
    { id: "en", role: "energy_total", kind: "text", page: "power",
      x: 34, y: 174, w: 162, label: "Energy", unit: "kWh", decimals: 0, size: 30 },

    { id: "k1", role: "", kind: "button", x: 32, y: 246, w: 52, h: 34,
      text: "V", action: "page", target: "volts" },
    { id: "k2", role: "", kind: "button", x: 92, y: 246, w: 52, h: 34,
      text: "A", action: "page", target: "amps" },
    { id: "k3", role: "", kind: "button", x: 152, y: 246, w: 52, h: 34,
      text: "kW", action: "page", target: "power" },

    { id: "lampL1", role: "volts_l1", kind: "lamp",
      x: 40, y: 310, w: 14, label: "L1", on: "#5fd87a" },
    { id: "lampL2", role: "volts_l2", kind: "lamp",
      x: 100, y: 310, w: 14, label: "L2", on: "#5fd87a" },
    { id: "lampL3", role: "volts_l3", kind: "lamp",
      x: 160, y: 310, w: 14, label: "L3", on: "#5fd87a" },
  ],
};
