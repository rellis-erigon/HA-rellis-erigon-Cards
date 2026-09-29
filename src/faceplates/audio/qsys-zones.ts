/**
 * A Q-SYS zone rack: one strip per output zone.
 *
 * Drawn from what the bridge actually exposes rather than from a
 * photograph. A Q-SYS Core has no front panel worth mirroring — it is a
 * 1U box with status LEDs — so the thing to mirror is the zone strip a
 * designer lays out in Q-SYS Designer and an operator sees in Core
 * Manager: a level bar with a dB readout, a mute, and trim keys.
 *
 * Parametric, like the pump set: a BGM system is as likely to have four
 * zones as sixteen, and a fixed drawing would be wrong for both.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

const ROW_H = 56;
const TOP = 34;
const W = 500;

// A fader's useful range. Q-SYS gain blocks commonly stage -100..+20, but
// -100 is silence and the top is rarely used; showing the whole span would
// crush every normal level into the middle of the bar.
const DB_MIN = -80;
const DB_MAX = 10;

function build(values: Record<string, number>) {
  const count = Math.max(1, Math.min(16, Math.round(values.zones ?? 4)));
  const height = TOP + count * ROW_H + 12;
  const regions: Region[] = [];

  const rows = [];
  for (let index = 0; index < count; index++) {
    const n = index + 1;
    const y = TOP + index * ROW_H;

    rows.push(svg`
      <rect class="strip" x="8" y=${y} width=${W - 16} height=${ROW_H - 8}
            rx="5" fill="#15171b" stroke="#272b32" />
      <line x1="84" y1=${y + 6} x2="84" y2=${y + ROW_H - 14}
            stroke="#272b32" stroke-width="1" />
    `);

    regions.push({
      id: `name${n}`, role: "", kind: "text", text: `ZONE ${n}`,
      x: 14, y: y + 30, w: 64, align: "start", size: 13,
    });
    regions.push({
      id: `bar${n}`, role: `zone${n}_volume`, kind: "bar",
      x: 96, y: y + 12, w: 184, h: 10, min: DB_MIN, max: DB_MAX,
    });
    regions.push({
      id: `db${n}`, role: `zone${n}_volume`, kind: "text",
      x: 96, y: y + 40, w: 184, align: "start",
      unit: "dB", decimals: 1, size: 14,
    });
    // Lit means muted. A mute lamp that is dark when the zone is playing
    // matches the hardware convention: you look for the red.
    regions.push({
      id: `mlamp${n}`, role: `zone${n}_mute`, kind: "lamp",
      x: 292, y: y + 16, w: 12, on: "#ef4444", off: "#2a1717",
    });
    regions.push({
      id: `mute${n}`, role: "", kind: "button", text: "MUTE",
      action: "mute_toggle", target: `zone${n}_mute`,
      x: 314, y: y + 12, w: 58, h: 24,
    });
    regions.push({
      id: `down${n}`, role: "", kind: "button", text: "−",
      action: "level_down", target: `zone${n}_volume`,
      x: 382, y: y + 12, w: 46, h: 24,
    });
    regions.push({
      id: `up${n}`, role: "", kind: "button", text: "+",
      action: "level_up", target: `zone${n}_volume`,
      x: 436, y: y + 12, w: 46, h: 24,
    });
  }

  const artNode = svg`
    <rect x="0" y="0" width=${W} height=${height} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${W} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${W} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12"
          font-family="inherit" letter-spacing="1.5">ZONE OUTPUTS</text>
    ${rows}
  `;

  return { size: [W, height] as [number, number], artNode, regions };
}

export const QSYS_ZONES: Faceplate = {
  id: "qsys-zone-rack",
  name: "Q-SYS Zone Rack",
  card: "audio-zone-card",
  render: "svg",
  display: "negative",
  size: [W, TOP + 4 * ROW_H + 12],
  regions: [],
  description:
    "One strip per audio zone: level bar in dB, mute with an indicator, "
    + "and trim keys. Widens to the number of zones you set.",
  emulates: "Q-SYS zone outputs",
  options: [{
    key: "zones",
    label: "Zones",
    type: "number",
    min: 1,
    max: 16,
    default: 4,
    help: "One strip per zone; roles are zone1_… through zoneN_…",
  }],
  build,
};
