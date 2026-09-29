/**
 * Hot water generation — one or two units.
 *
 * A calorifier or plate unit with its primary and secondary circuits.
 * Parametric because a single unit and a duty/standby pair are the same
 * drawing at different widths, and a site has both.
 *
 * Flow and return are drawn as separate pipes and coloured separately:
 * the pair of temperatures is the whole diagnosis on a hot water service,
 * and a single "temperature" region would throw that away.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const UNIT_W = 190;
const GAP = 34;
const LEFT = 110;
const TOP = 78;
const H = 330;

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(2, Math.round(values.units ?? 1)));
  const width = LEFT + count * UNIT_W + (count - 1) * GAP + 40;
  const regions: Region[] = [];
  const bodies = [];

  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const x = LEFT + index * (UNIT_W + GAP);

    bodies.push(svg`
      <rect x=${x} y=${TOP} width=${UNIT_W} height="150" rx="14"
            fill="#2b323b" stroke="#3d4551" stroke-width="2" />
      <rect x=${x + 14} y=${TOP + 18} width=${UNIT_W - 28} height="46" rx="6"
            fill="#1a1f25" />
      <text x=${x + UNIT_W / 2} y=${TOP + 138} text-anchor="middle"
            fill="#8b93a1" font-size="11" letter-spacing="1.4"
            font-family="inherit">UNIT ${n}</text>
    `);

    regions.push({
      id: `run${n}`, role: `unit${n}_run`, kind: "lamp",
      x: x + 18, y: TOP + 84, w: 14, on: "#3ddc84", off: "#16281d",
    });
    regions.push({
      id: `flt${n}`, role: `unit${n}_fault`, kind: "lamp",
      x: x + 44, y: TOP + 84, w: 14, on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `tank${n}`, role: `unit${n}_tank_temp`, kind: "text",
      x: x + 14, y: TOP + 50, w: UNIT_W - 28, align: "middle",
      decimals: 1, size: 24, placeholder: "",
    });
  }

  const artNode = svg`
    <defs>
      <marker id="hw-arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b93a1" />
      </marker>
    </defs>
    <rect x="0" y="0" width=${width} height=${H} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#8b93a1" font-size="12" letter-spacing="1.6"
          font-family="inherit">HOT WATER</text>

    <!-- Secondary flow along the top, return along the bottom -->
    <line x1="24" y1=${TOP + 12} x2=${width - 24} y2=${TOP + 12}
          stroke="#c2410c" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    <line x1=${width - 24} y1=${TOP + 214} x2="24" y2=${TOP + 214}
          stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    ${bodies}
  `;

  const shared: Region[] = [
    { id: "flow_t", role: "flow_temp", kind: "text",
      x: 16, y: TOP + 4, w: 86, align: "start", decimals: 1, size: 20,
      placeholder: "" },
    { id: "flow_lbl", role: "", kind: "text", text: "FLOW",
      x: 16, y: TOP + 22, w: 86, align: "start", size: 10 },
    { id: "ret_t", role: "return_temp", kind: "text",
      x: 16, y: TOP + 206, w: 86, align: "start", decimals: 1, size: 20,
      placeholder: "" },
    { id: "ret_lbl", role: "", kind: "text", text: "RETURN",
      x: 16, y: TOP + 224, w: 86, align: "start", size: 10 },
    { id: "sp", role: "setpoint", kind: "text",
      x: 16, y: H - 30, w: 140, align: "start", decimals: 1, size: 16,
      placeholder: "" },
    { id: "sp_lbl", role: "", kind: "text", text: "SETPOINT",
      x: 16, y: H - 14, w: 140, align: "start", size: 10 },
    { id: "fault", role: "common_fault", kind: "lamp", label: "FAULT",
      x: width - 44, y: H - 44, w: 16, on: "#ef4444", off: "#2a1717" },
  ];

  return {
    size: [width, H] as [number, number],
    artNode,
    regions: [...regions, ...shared],
  };
}

export const HOT_WATER_UNIT: Faceplate = {
  id: "hot-water-unit",
  name: "Hot Water Unit",
  card: "plant-equipment-card",
  render: "svg",
  display: "negative",
  size: [LEFT + UNIT_W + 40, H],
  regions: [],
  description:
    "Calorifier set with flow and return drawn separately — the pair of "
    + "temperatures is the diagnosis. One unit or a duty/standby pair.",
  emulates: "Calorifier / plate hot water unit",
  options: [{
    key: "units", label: "Units", type: "number",
    min: 1, max: 2, default: 1,
    help: "Roles are unit1_… and unit2_…; the drawing widens to suit.",
  }],
  build,
};
