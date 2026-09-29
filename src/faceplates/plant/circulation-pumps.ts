/**
 * Circulation pump set — hot or cold service, one to four pumps.
 *
 * One faceplate rather than two. The service is an option that recolours
 * the pipework and relabels the header, because a hot and a cold
 * circulator set are the same equipment doing the same job on different
 * water, and maintaining two near-identical drawings guarantees they
 * drift apart.
 *
 * Unlike the booster set this is a circulator: there is no pressure
 * vessel and no system pressure, only flow and return temperatures and
 * the pumps themselves.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const PITCH = 116;
const LEFT = 112;
const TOP = 92;
const H = 300;

// 0 = hot, 1 = cold. A number because that is what an option carries.
const SERVICES = [
  { key: "hot", label: "HOT WATER CIRCULATION", flow: "#c2410c", ret: "#7c2d12" },
  { key: "cold", label: "CHILLED WATER CIRCULATION", flow: "#0e7490", ret: "#155e75" },
];

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(4, Math.round(values.pumps ?? 2)));
  const service = SERVICES[Math.max(0, Math.min(1, Math.round(values.service ?? 0)))];
  const width = LEFT + (count - 1) * PITCH + 150;
  const regions: Region[] = [];
  const bodies = [];

  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const x = LEFT + index * PITCH;

    bodies.push(svg`
      <line x1=${x} y1=${TOP + 18} x2=${x} y2=${TOP + 58}
            stroke="#5a6472" stroke-width="6" />
      <line x1=${x} y1=${TOP + 106} x2=${x} y2=${TOP + 146}
            stroke="#5a6472" stroke-width="6" />
      <circle cx=${x} cy=${TOP + 82} r="26" fill="#39414c"
              stroke="#4d5663" stroke-width="2" />
      <circle cx=${x} cy=${TOP + 82} r="9" fill="#78818f" />
      ${[...Array(6).keys()].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return svg`<line
          x1=${x + Math.cos(a) * 10} y1=${TOP + 82 + Math.sin(a) * 10}
          x2=${x + Math.cos(a) * 22} y2=${TOP + 82 + Math.sin(a) * 22}
          stroke="#8b93a1" stroke-width="2.5" stroke-linecap="round" />`;
      })}
      <text x=${x} y=${TOP + 178} text-anchor="middle" fill="#8b93a1"
            font-size="12" font-family="inherit">P${n}</text>
    `);

    regions.push({
      id: `run${n}`, role: `pump${n}_run`, kind: "lamp",
      x: x - 22, y: TOP + 34, w: 14, on: "#3ddc84", off: "#16281d",
    });
    regions.push({
      id: `flt${n}`, role: `pump${n}_fault`, kind: "lamp",
      x: x + 8, y: TOP + 34, w: 14, on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `amp${n}`, role: `pump${n}_current`, kind: "text",
      x: x - 40, y: TOP + 196, w: 80, align: "middle",
      unit: "A", decimals: 1, size: 13, placeholder: "",
    });
  }

  const artNode = svg`
    <rect x="0" y="0" width=${width} height=${H} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#8b93a1" font-size="12" letter-spacing="1.6"
          font-family="inherit">${service.label}</text>

    <!-- Flow header above the pumps, return header below -->
    <line x1="24" y1=${TOP + 18} x2=${width - 24} y2=${TOP + 18}
          stroke=${service.flow} stroke-width="7" stroke-linecap="round" />
    <line x1="24" y1=${TOP + 146} x2=${width - 24} y2=${TOP + 146}
          stroke=${service.ret} stroke-width="7" stroke-linecap="round" />
    ${bodies}
  `;

  const shared: Region[] = [
    { id: "flow_t", role: "flow_temp", kind: "text",
      x: 16, y: TOP + 10, w: 88, align: "start", decimals: 1, size: 20,
      placeholder: "" },
    { id: "flow_lbl", role: "", kind: "text", text: "FLOW",
      x: 16, y: TOP + 28, w: 88, align: "start", size: 10 },
    { id: "ret_t", role: "return_temp", kind: "text",
      x: 16, y: TOP + 138, w: 88, align: "start", decimals: 1, size: 20,
      placeholder: "" },
    { id: "ret_lbl", role: "", kind: "text", text: "RETURN",
      x: 16, y: TOP + 156, w: 88, align: "start", size: 10 },
    { id: "fault", role: "common_fault", kind: "lamp", label: "FAULT",
      x: width - 44, y: 18, w: 16, on: "#ef4444", off: "#2a1717" },
  ];

  return {
    size: [width, H] as [number, number],
    artNode,
    regions: [...regions, ...shared],
  };
}

export const CIRCULATION_PUMPS: Faceplate = {
  id: "circulation-pump-set",
  name: "Circulation Pump Set",
  card: "plant-equipment-card",
  render: "svg",
  display: "negative",
  size: [LEFT + PITCH + 150, H],
  regions: [],
  description:
    "Circulator set, one to four pumps, hot or chilled service. The "
    + "service recolours the pipework rather than needing a second drawing.",
  emulates: "Hot or chilled water circulation pump set",
  options: [
    {
      key: "pumps", label: "Pumps", type: "number",
      min: 1, max: 4, default: 2,
      help: "Roles are pump1_… through pumpN_…",
    },
    {
      key: "service", label: "Service (0 hot, 1 cold)", type: "number",
      min: 0, max: 1, default: 0,
      help: "Recolours the flow and return headers and the header caption.",
    },
  ],
  build,
};
