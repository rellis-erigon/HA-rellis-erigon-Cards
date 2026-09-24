/**
 * Generic three-phase meter faceplate.
 *
 * Not modelled on any particular product: a plain single-page readout for
 * boards where the physical meter is unknown or unremarkable. Exists partly
 * to prove the point of the engine — this file is data, and adding it
 * required no change to the card or the renderer.
 */

import { svg } from "lit";
import { Faceplate } from "../../core/types";

const W = 460;
const H = 260;

const CHASSIS = svg`
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${W - 14}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${W - 14}" y2="186" stroke="#3c4a40" stroke-width="1" />
`;

export const GENERIC_3PHASE: Faceplate = {
  id: "generic-3phase",
  name: "Generic 3-phase meter",
  description:
    "Single-page readout for boards where the physical meter is unknown.",
  card: "bms-meter-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode: CHASSIS,
  regions: [
    { id: "etot", role: "energy_total", kind: "text",
      x: 34, y: 34, w: 390, label: "Total energy", unit: "kWh",
      decimals: 1, size: 40 },
    { id: "ptot", role: "power_total", kind: "text",
      x: 34, y: 124, w: 180, label: "Power", unit: "kW", decimals: 2, size: 28 },
    { id: "pf", role: "power_factor", kind: "text",
      x: 250, y: 124, w: 174, label: "Power factor", decimals: 2, size: 28 },
    { id: "v1", role: "volts_l1", kind: "text",
      x: 34, y: 200, w: 120, label: "L1-N", unit: "V", decimals: 0, size: 22 },
    { id: "v2", role: "volts_l2", kind: "text",
      x: 174, y: 200, w: 120, label: "L2-N", unit: "V", decimals: 0, size: 22 },
    { id: "v3", role: "volts_l3", kind: "text",
      x: 314, y: 200, w: 110, label: "L3-N", unit: "V", decimals: 0, size: 22 },
  ],
};
