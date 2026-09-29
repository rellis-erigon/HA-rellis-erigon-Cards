/**
 * Zone mixer — a full strip per zone rather than a level and a mute.
 *
 * `qsys-zone-rack` is the compact face: it fits sixteen zones on a page
 * because each one is a single row. This is the other end of the trade —
 * fewer zones, but everything an operator actually reaches for: the
 * fader, balance, source and a three-band EQ.
 *
 * The fader and the balance are click-to-position, not stepped. Stepping
 * to -40 dB with a trim key is eleven presses, and the trim keys are
 * still there for fine adjustment beside it.
 *
 * EQ is optional because most BGM zones have none, and three bands of
 * dead controls on every strip is worse than a shorter card.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const W = 560;
const TOP = 34;
const ROW_BASE = 96;
const ROW_EQ = 52;

// The fader's drawn range. The entity's own min/max still wins when a
// value is written — this is only what the bar spans.
const DB_MIN = -80;
const DB_MAX = 10;

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(12, Math.round(values.zones ?? 2)));
  const eq = Math.round(values.eq ?? 0) === 1;
  const rowH = ROW_BASE + (eq ? ROW_EQ : 0);
  const height = TOP + count * rowH + 12;

  const regions: Region[] = [];
  const rows = [];

  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const y = TOP + index * rowH;

    rows.push(svg`
      <rect class="strip" x="8" y=${y} width=${W - 16} height=${rowH - 8}
            rx="6" fill="#15171b" stroke="#272b32" />
      <line x1="8" y1=${y + 30} x2=${W - 8} y2=${y + 30}
            stroke="#22262c" stroke-width="1" />
      ${eq
        ? svg`<line x1="8" y1=${y + ROW_BASE - 10} x2=${W - 8}
                y2=${y + ROW_BASE - 10} stroke="#22262c" stroke-width="1" />`
        : ""}
    `);

    // -- Header: name, source, mute -------------------------------------
    regions.push({
      id: `name${n}`, role: "", kind: "text", text: `ZONE ${n}`,
      x: 20, y: y + 21, w: 150, align: "start", size: 13,
    });
    regions.push({
      id: `src${n}`, role: `zone${n}_source`, kind: "text",
      x: 180, y: y + 21, w: 180, align: "start", size: 13, placeholder: "",
    });
    regions.push({
      id: `srcbtn${n}`, role: "", kind: "button", text: "SOURCE",
      action: "source_cycle", target: `zone${n}_source`,
      x: 368, y: y + 6, w: 64, h: 20,
    });
    regions.push({
      id: `mlamp${n}`, role: `zone${n}_mute`, kind: "lamp",
      x: 442, y: y + 9, w: 12, on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `mute${n}`, role: "", kind: "button", text: "MUTE",
      action: "mute_toggle", target: `zone${n}_mute`,
      x: 462, y: y + 6, w: 58, h: 20,
    });

    // -- Fader ------------------------------------------------------------
    regions.push({
      id: `bar${n}`, role: `zone${n}_volume`, kind: "bar",
      action: "set_level", target: `zone${n}_volume`,
      x: 20, y: y + 48, w: 300, h: 12, min: DB_MIN, max: DB_MAX,
    });
    regions.push({
      id: `db${n}`, role: `zone${n}_volume`, kind: "text",
      x: 20, y: y + 80, w: 120, align: "start",
      unit: "dB", decimals: 1, size: 15,
    });
    regions.push({
      id: `down${n}`, role: "", kind: "button", text: "−",
      action: "level_down", target: `zone${n}_volume`,
      x: 332, y: y + 42, w: 38, h: 22,
    });
    regions.push({
      id: `up${n}`, role: "", kind: "button", text: "+",
      action: "level_up", target: `zone${n}_volume`,
      x: 376, y: y + 42, w: 38, h: 22,
    });

    // -- Balance ----------------------------------------------------------
    regions.push({
      id: `bal${n}`, role: `zone${n}_balance`, kind: "bar",
      action: "set_level", target: `zone${n}_balance`,
      x: 430, y: y + 48, w: 110, h: 12, min: -100, max: 100,
    });
    regions.push({
      id: `ball${n}`, role: "", kind: "text", text: "L",
      x: 430, y: y + 80, w: 20, align: "start", size: 11,
    });
    regions.push({
      id: `balr${n}`, role: "", kind: "text", text: "R",
      x: 520, y: y + 80, w: 20, align: "start", size: 11,
    });
    regions.push({
      id: `balv${n}`, role: `zone${n}_balance`, kind: "text",
      x: 450, y: y + 80, w: 70, align: "middle", decimals: 0, size: 12,
      unit: "", placeholder: "",
    });

    // -- EQ, when asked for -----------------------------------------------
    if (!eq) continue;
    const eqY = y + ROW_BASE - 2;
    (["low", "mid", "high"] as const).forEach((band, slot) => {
      const bx = 20 + slot * 176;
      regions.push({
        id: `${band}${n}`, role: `zone${n}_eq_${band}`, kind: "bar",
        action: "set_level", target: `zone${n}_eq_${band}`,
        x: bx, y: eqY + 12, w: 112, h: 10, min: -18, max: 18,
      });
      regions.push({
        id: `${band}lbl${n}`, role: "", kind: "text",
        text: band.toUpperCase(),
        x: bx, y: eqY + 8, w: 60, align: "start", size: 10,
      });
      regions.push({
        id: `${band}v${n}`, role: `zone${n}_eq_${band}`, kind: "text",
        x: bx + 118, y: eqY + 22, w: 50, align: "start",
        unit: "dB", decimals: 1, size: 12, placeholder: "",
      });
    });
  }

  const artNode = svg`
    <rect x="0" y="0" width=${W} height=${height} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${W} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${W} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12" letter-spacing="1.5"
          font-family="inherit">ZONE MIXER</text>
    ${rows}
  `;

  return { size: [W, height] as [number, number], artNode, regions };
}

export const ZONE_MIXER: Faceplate = {
  id: "zone-mixer",
  name: "Zone Mixer",
  card: "audio-zone-card",
  render: "svg",
  display: "negative",
  size: [W, TOP + 2 * ROW_BASE + 12],
  regions: [],
  labelPrefix: "zone",
  description:
    "A full strip per zone: click-to-position fader, balance, source and "
    + "an optional three-band EQ. Name each zone in the editor.",
  emulates: "DSP zone mixer strip",
  options: [
    {
      key: "zones", label: "Zones", type: "number",
      min: 1, max: 12, default: 2,
      help: "Roles are zone1_… through zoneN_…",
    },
    {
      key: "eq", label: "Three-band EQ (0 off, 1 on)", type: "number",
      min: 0, max: 1, default: 0,
      help: "Adds low/mid/high per zone. Most BGM zones have none.",
    },
  ],
  build,
};
