/**
 * Vertical multistage pump set (booster skid) faceplate.
 *
 * Drawn from photographs of packaged sets: vertical multistage pumps stood
 * in a row on a galvanised skid, each with a dark motor and fan cowl over a
 * stainless barrel, isolating valves onto a common manifold, a bladder
 * vessel at one end and a control panel on a stand beside them.
 *
 * Unlike the other faceplates this one is **parametric**. A pump set is not
 * one drawing: a duty-assist pair and a six-pump skid are the same equipment
 * at different widths, so the artwork and the regions are built from the
 * pump count rather than drawn once.
 */

import { svg } from "lit";
import { Faceplate, Region } from "../../core/types";

const PITCH = 96;          // centre-to-centre spacing of the pumps
const LEFT = 56;           // skid overhang before the first pump
const PANEL_W = 190;       // control panel and vessel at the right
const H = 430;

const SKID_Y = 348;        // top of the skid rail
const MANIFOLD_Y = 318;    // the common header the pumps discharge into
const MOTOR_Y = 74;

function pumpGraphic(x: number) {
  return svg`
    <!-- Fan cowl -->
    <rect x="${x - 18}" y="${MOTOR_Y - 26}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${x - 27}" y="${MOTOR_Y}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0, 1, 2, 3, 4, 5].map(
        (i) => svg`<line x1="${x - 27}" y1="${MOTOR_Y + 14 + i * 13}"
                          x2="${x + 27}" y2="${MOTOR_Y + 14 + i * 13}" />`
      )}
    </g>
    <!-- Motor stool -->
    <rect x="${x - 17}" y="${MOTOR_Y + 96}" width="34" height="22" rx="2" fill="#2f3337" />
    <!-- Stainless barrel -->
    <rect x="${x - 21}" y="${MOTOR_Y + 118}" width="42" height="126" rx="4"
          fill="url(#ps-steel)" stroke="#8e969c" stroke-width="1" />
    <!-- Pump head and base -->
    <rect x="${x - 25}" y="${MOTOR_Y + 238}" width="50" height="18" rx="3" fill="#6f7780" />
    <!-- Discharge into the manifold -->
    <rect x="${x - 7}" y="${MANIFOLD_Y - 42}" width="14" height="42" fill="#9aa3ab" />
    <circle cx="${x}" cy="${MANIFOLD_Y - 46}" r="9" fill="#c7a34a" />
  `;
}

function build(values: Record<string, number>) {
  const count = values.pumps ?? 3;
  const width = LEFT * 2 + (count - 1) * PITCH + PANEL_W;
  const panelX = LEFT + (count - 1) * PITCH + 70;

  const xs = [...Array(count).keys()].map((i) => LEFT + i * PITCH);

  const artNode = svg`
    <defs>
      <linearGradient id="ps-steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8f979e" />
        <stop offset="28%" stop-color="#e6ebee" />
        <stop offset="60%" stop-color="#aab2b9" />
        <stop offset="100%" stop-color="#7d858c" />
      </linearGradient>
      <linearGradient id="ps-panel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eceff1" />
        <stop offset="100%" stop-color="#d3d8dc" />
      </linearGradient>
      <linearGradient id="ps-vessel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#b9a887" />
        <stop offset="40%" stop-color="#ded0b2" />
        <stop offset="100%" stop-color="#a89877" />
      </linearGradient>
    </defs>

    <!-- Manifold -->
    <rect x="18" y="${MANIFOLD_Y}" width="${panelX - 40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${MANIFOLD_Y}" width="${panelX - 40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${SKID_Y}" width="${panelX - 24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${SKID_Y + 16}" width="${panelX - 24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${SKID_Y + 24}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${panelX - 60}" y="${SKID_Y + 24}" width="26" height="18" fill="#a8b0b6" />

    ${xs.map((x) => pumpGraphic(x))}

    <!-- Bladder vessel -->
    <rect x="${panelX - 46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${panelX - 30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${panelX + 8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${panelX + 20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0, 1, 2, 3, 4, 5, 6].map(
        (i) => svg`<line x1="${panelX + 26}" y1="${158 + i * 8}"
                          x2="${panelX + 140}" y2="${158 + i * 8}" />`
      )}
    </g>
    <rect x="${panelX + 76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${panelX + 40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${panelX + 36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `;

  const regions: Region[] = [
    // Panel HMI: what the set is actually doing.
    { id: "press", role: "system_pressure", kind: "text",
      x: panelX + 42, y: 78, w: 82, align: "middle", decimals: 2, size: 22 },
    { id: "sp", role: "pressure_setpoint", kind: "text",
      x: panelX + 42, y: 106, w: 82, align: "middle", label: "",
      decimals: 2, size: 13 },
    { id: "fault", role: "common_fault", kind: "lamp",
      x: panelX + 138, y: 60, w: 12, on: "#ef4444", off: "#3a2020" },
  ];

  xs.forEach((x, index) => {
    const n = index + 1;
    // A run lamp above each motor, and its speed beneath the skid.
    regions.push({
      id: `run${n}`, role: `pump${n}_run`, kind: "lamp",
      x: x - 7, y: MOTOR_Y - 46, w: 14, on: "#3ddc84", off: "#16281d",
    });
    regions.push({
      id: `flt${n}`, role: `pump${n}_fault`, kind: "lamp",
      x: x + 14, y: MOTOR_Y - 46, w: 10, on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `spd${n}`, role: `pump${n}_speed`, kind: "text",
      x: x - 34, y: SKID_Y + 46, w: 68, align: "middle",
      unit: "%", decimals: 0, size: 15, placeholder: "",
    });
    regions.push({
      id: `lbl${n}`, role: "", kind: "text", text: `P${n}`,
      x: x - 34, y: SKID_Y + 66, w: 68, align: "middle", size: 12,
    });
  });

  return { size: [width, H] as [number, number], artNode, regions };
}

export const PUMPSET: Faceplate = {
  id: "vertical-pumpset",
  name: "Vertical multistage pump set",
  description:
    "Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",
  card: "pump-system-card",
  render: "svg",
  display: "negative",
  size: [LEFT * 2 + 2 * PITCH + PANEL_W, H],
  options: [
    {
      key: "pumps",
      label: "Pumps",
      type: "number",
      min: 1,
      max: 10,
      default: 3,
      help: "The skid widens to suit; roles are pump1_… through pumpN_…",
    },
  ],
  build,
  regions: [],
};
