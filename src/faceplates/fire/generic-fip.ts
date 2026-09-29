/**
 * Generic fire indicator panel — a BMS mirror, never the panel.
 *
 * Deliberately *not* a copy of any real manufacturer's fascia. The plan
 * has said from the start that an accurate FireFinder mimic is a card
 * someone will eventually trust in an emergency, and the way to prevent
 * that is not a caption on an otherwise convincing replica: it is to make
 * the thing visibly a schematic. So this is a clean panel in the card's
 * own idiom, and the card draws a permanent band across it.
 *
 * A brand-accurate faceplate can be added later from photographs, behind
 * the same band. It is not being drawn from memory.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 460;
const TOP = 132;
const ZONE_H = 30;

function build(values: Record<string, number>) {
  const zones = Math.max(0, Math.min(24, Math.round(values.zones ?? 8)));
  const cols = zones > 12 ? 2 : 1;
  const rows = Math.ceil(zones / cols) || 1;
  const height = TOP + rows * ZONE_H + 28;
  const regions: Region[] = [];
  const cells = [];

  for (let index = 0; index < zones; index++) {
    const n = index + 1;
    const col = Math.floor(index / rows);
    const row = index % rows;
    const x = 22 + col * ((W - 44) / cols);
    const y = TOP + row * ZONE_H;
    const cellW = (W - 44) / cols - 12;

    cells.push(svg`
      <rect x=${x} y=${y} width=${cellW} height=${ZONE_H - 6} rx="4"
            fill="#14181d" stroke="#232930" />
      <text x=${x + 34} y=${y + 17} fill="#8b93a1" font-size="12"
            font-family="inherit">ZONE ${n}</text>
    `);
    regions.push({
      id: `z${n}`, role: `zone${n}_alarm`, kind: "lamp",
      x: x + 10, y: y + 5, w: 13, on: "#ef4444", off: "#2a1717",
    });
  }

  const artNode = svg`
    <rect x="0" y="0" width=${W} height=${height} rx="10" fill="#0e1013" />

    <!-- Status row -->
    <rect x="16" y="46" width=${W - 32} height="68" rx="8"
          fill="#14181d" stroke="#232930" />
    <text x="30" y="70" fill="#8b93a1" font-size="11" letter-spacing="1.5"
          font-family="inherit">PANEL STATUS</text>
    ${cells}
  `;

  const shared: Region[] = [
    { id: "alarm", role: "fire_alarm", kind: "lamp", label: "FIRE",
      x: 30, y: 82, w: 18, on: "#ef4444", off: "#2a1717" },
    { id: "fault", role: "fault", kind: "lamp", label: "FAULT",
      x: 118, y: 82, w: 18, on: "#f59e0b", off: "#2a2317" },
    { id: "isolate", role: "isolate", kind: "lamp", label: "ISOLATED",
      x: 216, y: 82, w: 18, on: "#eab308", off: "#2a2617" },
    { id: "brigade", role: "brigade_signal", kind: "lamp", label: "BRIGADE",
      x: 322, y: 82, w: 18, on: "#ef4444", off: "#2a1717" },
    { id: "power", role: "power", kind: "lamp", label: "POWER",
      x: 412, y: 82, w: 18, on: "#3ddc84", off: "#16281d" },
  ];

  return {
    size: [W, height] as [number, number],
    artNode,
    regions: [...shared, ...regions],
  };
}

export const GENERIC_FIP: Faceplate = {
  id: "generic-fip",
  name: "Fire Indicator Panel (schematic)",
  card: "fire-panel-card",
  render: "svg",
  display: "negative",
  size: [W, TOP + 8 * ZONE_H + 28],
  regions: [],
  description:
    "Zone and status mimic of a fire panel as the BMS sees it. Schematic "
    + "on purpose — it must never be mistaken for the panel itself.",
  emulates: "Generic fire indicator panel (not a specific make)",
  options: [{
    key: "zones", label: "Zones", type: "number",
    min: 0, max: 24, default: 8,
    help: "Roles are zone1_alarm through zoneN_alarm; two columns above 12.",
  }],
  build,
};
