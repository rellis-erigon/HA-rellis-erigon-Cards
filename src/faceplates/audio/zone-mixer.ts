/**
 * Zone mixer — a console, laid out the way a console is.
 *
 * Channel strips side by side, each read top to bottom: source, EQ, pan,
 * then the fader with its cap, the level, mute, and a scribble strip at
 * the foot carrying the name. Faders run vertically because that is what
 * makes a rack of them legible at a glance — a column of caps at
 * different heights is the picture an operator already knows.
 *
 * `qsys-zone-rack` remains the compact face for fitting sixteen zones on
 * a page. This one trades width for everything an operator reaches for.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const STRIP_W = 104;
const GUTTER = 6;
const LEFT = 14;
const TOP = 36;

const ROW_SOURCE = 12;
const EQ_H = 96;
const PAN_H = 44;
const THROW = 210;
const FOOT = 104;

// What the fader spans. The entity's own staging still wins on a write.
const DB_MIN = -80;
const DB_MAX = 10;

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(12, Math.round(values.zones ?? 4)));
  const eq = Math.round(values.eq ?? 0) === 1;

  const bodyTop = TOP + ROW_SOURCE + 34;
  const eqTop = bodyTop;
  const panTop = eqTop + (eq ? EQ_H : 0);
  const faderTop = panTop + PAN_H;
  const height = faderTop + THROW + FOOT;
  const width = LEFT * 2 + count * STRIP_W + (count - 1) * GUTTER;

  const regions: Region[] = [];
  const strips = [];

  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const x = LEFT + index * (STRIP_W + GUTTER);
    const mid = x + STRIP_W / 2;

    strips.push(svg`
      <rect x=${x} y=${TOP} width=${STRIP_W} height=${height - TOP - 12}
            rx="6" fill="#15171b" stroke="#272b32" />
      ${eq
        ? svg`<line x1=${x + 8} y1=${panTop - 6} x2=${x + STRIP_W - 8}
                y2=${panTop - 6} stroke="#22262c" />`
        : ""}
      <line x1=${x + 8} y1=${faderTop - 8} x2=${x + STRIP_W - 8}
            y2=${faderTop - 8} stroke="#22262c" />
      <!-- Scribble strip. Backlit rather than paper: the strip sits at
           the foot of a dark console and the card draws its text light,
           so a cream plate would be light-on-light. -->
      <rect x=${x + 6} y=${height - 46} width=${STRIP_W - 12} height="26"
            rx="3" fill="#1d2127" stroke="#343a44" />
    `);

    // -- Source ---------------------------------------------------------
    regions.push({
      id: `src${n}`, role: `zone${n}_source`, kind: "text",
      x: x + 6, y: TOP + 20, w: STRIP_W - 12, align: "middle",
      size: 12, placeholder: "",
    });
    regions.push({
      id: `srcbtn${n}`, role: "", kind: "button", text: "SRC",
      action: "source_cycle", target: `zone${n}_source`,
      x: mid - 26, y: TOP + 28, w: 52, h: 18,
    });

    // -- EQ, when asked for ----------------------------------------------
    if (eq) {
      (["high", "mid", "low"] as const).forEach((band, slot) => {
        const by = eqTop + slot * 30;
        regions.push({
          id: `${band}lbl${n}`, role: "", kind: "text",
          text: band.toUpperCase(),
          x: x + 8, y: by + 12, w: 32, align: "start", size: 9,
        });
        regions.push({
          id: `${band}${n}`, role: `zone${n}_eq_${band}`, kind: "bar",
          action: "set_level", target: `zone${n}_eq_${band}`,
          x: x + 42, y: by + 4, w: STRIP_W - 50, h: 8, min: -18, max: 18,
        });
        regions.push({
          id: `${band}v${n}`, role: `zone${n}_eq_${band}`, kind: "text",
          x: x + 42, y: by + 24, w: STRIP_W - 50, align: "end",
          unit: "", decimals: 1, size: 9, placeholder: "",
        });
      });
    }

    // -- Pan --------------------------------------------------------------
    regions.push({
      id: `panl${n}`, role: "", kind: "text", text: "L",
      x: x + 8, y: panTop + 26, w: 12, align: "start", size: 9,
    });
    regions.push({
      id: `panr${n}`, role: "", kind: "text", text: "R",
      x: x + STRIP_W - 18, y: panTop + 26, w: 12, align: "start", size: 9,
    });
    regions.push({
      id: `pan${n}`, role: `zone${n}_balance`, kind: "bar",
      action: "set_level", target: `zone${n}_balance`,
      x: x + 20, y: panTop + 16, w: STRIP_W - 40, h: 8, min: -100, max: 100,
    });
    regions.push({
      id: `panlbl${n}`, role: "", kind: "text", text: "PAN",
      x: x + 8, y: panTop + 12, w: 40, align: "start", size: 9,
    });

    // -- Fader -------------------------------------------------------------
    regions.push({
      id: `fad${n}`, role: `zone${n}_volume`, kind: "fader",
      action: "set_level", target: `zone${n}_volume`,
      x: mid - 26, y: faderTop, w: 52, h: THROW,
      min: DB_MIN, max: DB_MAX, ticks: 7,
    });
    regions.push({
      id: `down${n}`, role: "", kind: "button", text: "−",
      action: "level_down", target: `zone${n}_volume`,
      x: x + 8, y: faderTop + THROW / 2 - 28, w: 22, h: 22,
    });
    regions.push({
      id: `up${n}`, role: "", kind: "button", text: "+",
      action: "level_up", target: `zone${n}_volume`,
      x: x + 8, y: faderTop + THROW / 2 + 6, w: 22, h: 22,
    });
    regions.push({
      id: `db${n}`, role: `zone${n}_volume`, kind: "text",
      x: x + 6, y: faderTop + THROW + 20, w: STRIP_W - 12, align: "middle",
      unit: "dB", decimals: 1, size: 14,
    });

    // -- Mute and name -------------------------------------------------------
    regions.push({
      id: `mlamp${n}`, role: `zone${n}_mute`, kind: "lamp",
      x: x + 10, y: faderTop + THROW + 32, w: 12,
      on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `mute${n}`, role: "", kind: "button", text: "MUTE",
      action: "mute_toggle", target: `zone${n}_mute`,
      x: x + 28, y: faderTop + THROW + 29, w: STRIP_W - 38, h: 20,
    });
    regions.push({
      id: `name${n}`, role: "", kind: "text", text: `ZONE ${n}`,
      x: x + 8, y: height - 28, w: STRIP_W - 16, align: "middle",
      size: 11, unit: "",
    });
  }

  const artNode = svg`
    <rect x="0" y="0" width=${width} height=${height} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${width} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${width} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12" letter-spacing="1.5"
          font-family="inherit">ZONE MIXER</text>
    ${strips}
  `;

  return { size: [width, height] as [number, number], artNode, regions };
}

export const ZONE_MIXER: Faceplate = {
  id: "zone-mixer",
  name: "Zone Mixer (console)",
  card: "audio-zone-card",
  render: "svg",
  display: "negative",
  size: [LEFT * 2 + 4 * STRIP_W + 3 * GUTTER, 600],
  regions: [],
  labelPrefix: "zone",
  description:
    "Channel strips side by side with vertical faders: source, optional "
    + "EQ, pan, fader, mute and a scribble strip. Click a fader to move it.",
  emulates: "Audio mixing console channel strip",
  options: [
    {
      key: "zones", label: "Channels", type: "number",
      min: 1, max: 12, default: 4,
      help: "One strip per zone; roles are zone1_… through zoneN_…",
    },
    {
      key: "eq", label: "Three-band EQ (0 off, 1 on)", type: "number",
      min: 0, max: 1, default: 0,
      help: "Adds high/mid/low per strip, above the pan.",
    },
  ],
  build,
};
