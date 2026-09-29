/**
 * Supply and exhaust fans, drawn with the air going the right way.
 *
 * Three supply variants exist because ductwork has a direction and a
 * mimic that points the wrong way is worse than no mimic: someone reads
 * it as the airflow and troubleshoots the wrong end of the system. The
 * duct enters from the top, the left or the right, and the arrows follow.
 *
 * The impeller is drawn as a scroll (centrifugal) rather than a propeller
 * because that is what a ducted supply fan is; the exhaust variant uses
 * an axial symbol, which is what sits in a discharge stack.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 360;
const H = 300;
const CX = 180;
const CY = 168;
const SCROLL_R = 62;

type Entry = "top" | "left" | "right";

const arrow = (x1: number, y1: number, x2: number, y2: number) => svg`
  <line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="#4ea1ff"
        stroke-width="3" marker-end="url(#pf-arrow)" />
`;

function chassis(entry: Entry, exhaust: boolean) {
  const duct = "#39414c";
  const inlet =
    entry === "top"
      ? svg`<rect x=${CX - 26} y="16" width="52" height=${CY - SCROLL_R - 12}
              fill=${duct} />`
      : entry === "left"
        ? svg`<rect x="16" y=${CY - 26} width=${CX - SCROLL_R - 12} height="52"
                fill=${duct} />`
        : svg`<rect x=${CX + SCROLL_R + 12} y=${CY - 26}
                width=${W - CX - SCROLL_R - 28} height="52" fill=${duct} />`;

  const inletArrow =
    entry === "top"
      ? arrow(CX, 30, CX, CY - SCROLL_R - 16)
      : entry === "left"
        ? arrow(30, CY, CX - SCROLL_R - 16, CY)
        : arrow(W - 30, CY, CX + SCROLL_R + 16, CY);

  // Discharge always leaves at the bottom on a supply fan; an exhaust
  // fan discharges up and out, to atmosphere.
  const outlet = exhaust
    ? svg`<rect x=${CX - 24} y="16" width="48" height=${CY - SCROLL_R - 12}
            fill=${duct} />`
    : svg`<rect x=${CX - 24} y=${CY + SCROLL_R - 4} width="48"
            height=${H - CY - SCROLL_R - 12} fill=${duct} />`;

  const outletArrow = exhaust
    ? arrow(CX, CY - SCROLL_R - 16, CX, 26)
    : arrow(CX, CY + SCROLL_R, CX, H - 26);

  return svg`
    <defs>
      <marker id="pf-arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ea1ff" />
      </marker>
      <radialGradient id="pf-scroll" cx="0.38" cy="0.32" r="0.9">
        <stop offset="0%" stop-color="#5a6472" />
        <stop offset="100%" stop-color="#333a44" />
      </radialGradient>
    </defs>

    <rect x="0" y="0" width=${W} height=${H} rx="10" fill="#101216" />
    ${exhaust ? outlet : inlet}
    ${exhaust ? "" : outlet}

    <circle cx=${CX} cy=${CY} r=${SCROLL_R} fill="url(#pf-scroll)"
            stroke="#232930" stroke-width="2" />
    <circle cx=${CX} cy=${CY} r=${SCROLL_R - 16} fill="none"
            stroke="#59626f" stroke-width="1.5" />
    ${[...Array(8).keys()].map((i) => {
      const a = (i / 8) * Math.PI * 2;
      return svg`<line
        x1=${CX + Math.cos(a) * 14} y1=${CY + Math.sin(a) * 14}
        x2=${CX + Math.cos(a) * (SCROLL_R - 18)}
        y2=${CY + Math.sin(a) * (SCROLL_R - 18)}
        stroke="#6f7886" stroke-width="3" stroke-linecap="round" />`;
    })}
    <circle cx=${CX} cy=${CY} r="10" fill="#8b93a1" />

    ${exhaust ? outletArrow : inletArrow}
    ${exhaust ? "" : outletArrow}
  `;
}

function regions(exhaust: boolean): Region[] {
  const common: Region[] = [
    { id: "run", role: "run", kind: "lamp", label: "RUN",
      x: 20, y: 24, w: 16, on: "#3ddc84", off: "#16281d" },
    { id: "fault", role: "fault", kind: "lamp", label: "FAULT",
      x: 88, y: 24, w: 16, on: "#ef4444", off: "#2a1717" },
    { id: "speed", role: "speed", kind: "text",
      x: W - 132, y: 40, w: 116, align: "end", decimals: 1, size: 20,
      placeholder: "" },
    { id: "speed_lbl", role: "", kind: "text", text: "SPEED",
      x: W - 132, y: 58, w: 116, align: "end", size: 10 },
    { id: "flow", role: "flow", kind: "text",
      x: W - 132, y: H - 30, w: 116, align: "end", decimals: 0, size: 18,
      placeholder: "" },
    { id: "flow_lbl", role: "", kind: "text", text: "AIRFLOW",
      x: W - 132, y: H - 14, w: 116, align: "end", size: 10 },
  ];
  if (exhaust) return common;
  return [
    ...common,
    { id: "dp", role: "filter_dp", kind: "text",
      x: 20, y: H - 30, w: 130, align: "start", decimals: 0, size: 16,
      placeholder: "" },
    { id: "dp_lbl", role: "", kind: "text", text: "FILTER ΔP",
      x: 20, y: H - 14, w: 130, align: "start", size: 10 },
  ];
}

function supply(entry: Entry, name: string): Faceplate {
  return {
    id: `supply-fan-${entry}`,
    name,
    card: "plant-equipment-card",
    render: "svg",
    display: "negative",
    size: [W, H],
    artNode: chassis(entry, false),
    regions: regions(false),
    description:
      `Supply fan with the duct entering from the ${entry}. Arrows follow `
      + "the air, so the mimic cannot be read backwards.",
    emulates: "Centrifugal supply fan",
  };
}

export const SUPPLY_FAN_TOP = supply("top", "Supply Fan — in from top");
export const SUPPLY_FAN_LEFT = supply("left", "Supply Fan — in from left");
export const SUPPLY_FAN_RIGHT = supply("right", "Supply Fan — in from right");

export const EXHAUST_FAN: Faceplate = {
  id: "exhaust-fan",
  name: "Exhaust Fan",
  card: "plant-equipment-card",
  render: "svg",
  display: "negative",
  size: [W, H],
  artNode: chassis("top", true),
  regions: regions(true),
  description: "Exhaust fan discharging to atmosphere, air drawn upward.",
  emulates: "Axial exhaust fan",
};
