/**
 * Water storage tanks, one to four, with the pressure they feed.
 *
 * A tank is a level and an alarm, which a pair of sensors reports perfectly
 * well — but a tank farm is read by comparing tanks, and two numbers in a
 * list do not compare. Side-by-side fill levels against a shared scale do,
 * and that is the whole case for drawing this.
 *
 * The high-level alarm sits at the top of the tank where the float is,
 * rather than in a row of lamps underneath, because where the alarm is on
 * the drawing is itself information.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const TANK_W = 108;
const GAP = 26;
const LEFT = 26;
const TOP = 74;
const TANK_H = 210;
const FOOT = 74;

const BODY_FILL = "#20262e";
const BODY_EDGE = "#3d4551";
const MUTED = "#8b93a1";

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(4, Math.round(values.tanks ?? 2)));
  const width = LEFT * 2 + count * TANK_W + (count - 1) * GAP + 150;
  const height = TOP + TANK_H + FOOT;
  const regions: Region[] = [];
  const bodies = [];

  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const x = LEFT + index * (TANK_W + GAP);

    bodies.push(svg`
      <!-- Shell, with a domed top so it reads as a tank and not a bar chart -->
      <path d=${`M ${x} ${TOP + 22}
                 Q ${x} ${TOP} ${x + 22} ${TOP}
                 L ${x + TANK_W - 22} ${TOP}
                 Q ${x + TANK_W} ${TOP} ${x + TANK_W} ${TOP + 22}
                 L ${x + TANK_W} ${TOP + TANK_H}
                 L ${x} ${TOP + TANK_H} Z`}
            fill=${BODY_FILL} stroke=${BODY_EDGE} stroke-width="2" />
      <!-- Quarter marks: a fill with no scale beside it is a mood, not a level -->
      ${[25, 50, 75].map((pct) => svg`
        <line x1=${x + 4} y1=${TOP + TANK_H - (TANK_H - 26) * pct / 100}
              x2=${x + 16} y2=${TOP + TANK_H - (TANK_H - 26) * pct / 100}
              stroke=${BODY_EDGE} stroke-width="1" />
      `)}
      <text x=${x + TANK_W / 2} y=${TOP + TANK_H + 20} text-anchor="middle"
            fill=${MUTED} font-size="11" letter-spacing="1.2"
            font-family="inherit">TANK ${n}</text>
    `);

    regions.push({
      id: `lvl${n}`, role: `tank${n}_level`, kind: "bar",
      x: x + 6, y: TOP + 20, w: TANK_W - 12, h: TANK_H - 26,
      min: 0, max: 100,
    });
    regions.push({
      id: `lvlt${n}`, role: `tank${n}_level`, kind: "text",
      x, y: TOP + TANK_H - 16, w: TANK_W, align: "middle",
      decimals: 0, unit: "%", size: 22, placeholder: "--",
    });
    // At the top of the tank, where the float switch is.
    regions.push({
      id: `hi${n}`, role: `tank${n}_high_alarm`, kind: "lamp", label: "HIGH",
      x: x + TANK_W / 2 - 7, y: TOP - 22, w: 14,
      on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `lo${n}`, role: `tank${n}_low_alarm`, kind: "lamp", label: "LOW",
      x: x + TANK_W / 2 - 7, y: TOP + TANK_H + 30, w: 14,
      on: "#f59e0b", off: "#2a2317",
    });
  }

  const sideX = LEFT + count * TANK_W + (count - 1) * GAP + 30;

  const artNode = svg`
    <rect x="0" y="0" width=${width} height=${height} rx="10" fill="#101216" />
    <text x="16" y="26" fill=${MUTED} font-size="12" letter-spacing="1.6"
          font-family="inherit">WATER STORAGE</text>
    ${bodies}
    <!-- Common outlet header the tanks feed -->
    <line x1=${LEFT} y1=${TOP + TANK_H + 44} x2=${sideX - 14}
          y2=${TOP + TANK_H + 44}
          stroke="#2563eb" stroke-width="5" stroke-linecap="round" />
  `;

  const shared: Region[] = [
    { id: "press", role: "pressure", kind: "text",
      x: sideX, y: TOP + 30, w: 118, align: "start", decimals: 2, size: 26,
      unit: "", placeholder: "--", group: "pressure" },
    { id: "press_u", role: "pressure", kind: "text", show: "unit",
      x: sideX, y: TOP + 48, w: 118, align: "start", size: 11,
      group: "pressure" },
    { id: "press_lbl", role: "", kind: "text", text: "PRESSURE",
      x: sideX, y: TOP + 12, w: 118, align: "start", size: 10,
      group: "pressure" },
    { id: "fill", role: "fill_valve", kind: "lamp", label: "FILL",
      x: sideX, y: TOP + 92, w: 14, on: "#3ddc84", off: "#16281d" },
    { id: "fault", role: "common_fault", kind: "lamp", label: "FAULT",
      x: sideX, y: TOP + 130, w: 14, on: "#ef4444", off: "#2a1717" },
  ];

  return {
    size: [width, height] as [number, number],
    artNode,
    regions: [...regions, ...shared],
  };
}

export const STORAGE_TANKS: Faceplate = {
  id: "storage-tanks",
  name: "Water Storage Tanks",
  card: "plant-equipment-card",
  render: "svg",
  display: "negative",
  size: [LEFT * 2 + 2 * TANK_W + GAP + 150, TOP + TANK_H + FOOT],
  regions: [],
  description:
    "One to four storage tanks side by side against a shared scale, because "
    + "a tank farm is read by comparing tanks. High-level alarms sit at the "
    + "top of each tank where the float is. Roles are tank1_level, "
    + "tank1_high_alarm, tank1_low_alarm and so on, plus a shared pressure.",
  emulates: "Cold water storage tank set",
  options: [{
    key: "tanks", label: "Tanks", type: "number",
    min: 1, max: 4, default: 2,
    help: "The drawing widens to suit. Unbound tanks hide themselves.",
  }],
  build,
};
