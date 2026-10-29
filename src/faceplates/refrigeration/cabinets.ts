/**
 * Refrigeration cabinets — under-bench, walk-in and upright.
 *
 * A kitchen has a lot of these and they all report the same three things,
 * so the drawing is what tells them apart. An under-bench with six doors
 * should look like the six-door one in the room; that is the whole reason
 * a faceplate beats a list of sensors here.
 *
 * Doors and drawers are therefore artwork, not roles. Every cabinet on a
 * real station has at most one door switch covering the whole unit, so the
 * count identifies the cabinet and the single door role lights all of it.
 * Claiming six door roles nobody can bind would be worse than honest
 * artwork.
 *
 * Fridge and freezer are separate entries rather than an option because
 * options are numeric, and "mode: 1" in an editor is not a thing anyone
 * should have to decode. They share every line of the builder.
 */
import { svg } from "lit";
import type { Faceplate, Region } from "../../core/types";

interface Palette {
  /** Readout and trim colour. */
  accent: string;
  /** The temperature range the cabinet is meant to hold. */
  band: [number, number];
}

const FRIDGE: Palette = { accent: "#7dd3fc", band: [0, 8] };
const FREEZER: Palette = { accent: "#c7e9ff", band: [-26, -12] };

const DOOR_FILL = "#171d25";
const DOOR_EDGE = "#4a5462";
const BODY_FILL = "#323a45";
const BODY_EDGE = "#4a5462";
const MUTED = "#a7b2c0";

/** The readout block every cabinet carries, placed at a given origin. */
function readout(x: number, y: number, w: number, p: Palette): Region[] {
  // The unit is never painted on: it comes from whatever entity is bound,
  // so a station commissioned in Fahrenheit reads in Fahrenheit instead of
  // having °C drawn over the top of it.
  // A text region's y is the top of its glyphs; the renderer puts the
  // baseline a full font size below it. Laying the block out by baseline
  // instead drew the setpoint straight through the number.
  //
  // There is no band bar under the reading. On the dark display its track
  // read as a stray black bar, and a cabinet bound to the other type's
  // faceplate showed an empty one; the number already says it all.
  const TEMP = 34;      // size of the reading
  const UNIT = 14;
  const belowY = y + TEMP + 6;
  return [
    { id: "temp", role: "temperature", kind: "text",
      x, y, w: w - 26, align: "end", decimals: 1, size: TEMP,
      unit: "", placeholder: "--" },
    // Sat on the same baseline as the number, not the same top edge.
    { id: "temp_u", role: "temperature", kind: "text", show: "unit",
      x: x + w - 24, y: y + TEMP - UNIT, w: 24, align: "start", size: UNIT },
    { id: "sp", role: "setpoint", kind: "text",
      x, y: belowY, w, align: "middle", decimals: 1, size: 12,
      unit: "", placeholder: "", group: "setpoint" },
    { id: "sp_lbl", role: "", kind: "text", text: "SETPOINT",
      x, y: belowY + 16, w, align: "middle", size: 10, group: "setpoint" },
  ] as Region[];
}

// A lamp's label is centred under it, so the gap between lamps has to
// clear the widest label and not the widest lamp. "ALARM" at the label
// size is about 40px, and a 46px gap ran "COMP" and "ALARM" together.
const LAMP_GAP = 62;

/** Door, compressor and alarm, laid out along a row. */
function lamps(x: number, y: number, gap: number = LAMP_GAP): Region[] {
  return [
    // Amber, not red: a door standing open is the common case and the one
    // worth noticing, but it is not yet a fault.
    { id: "door", role: "door", kind: "lamp", label: "DOOR",
      x, y, w: 14, on: "#f59e0b", off: "#2a2317" },
    { id: "comp", role: "compressor", kind: "lamp", label: "COMP",
      x: x + gap, y, w: 14, on: "#3ddc84", off: "#16281d" },
    { id: "alarm", role: "alarm", kind: "lamp", label: "ALARM",
      x: x + gap * 2, y, w: 14, on: "#ef4444", off: "#2a1717" },
  ] as Region[];
}

// The face carries no type label. The card's own title names the cabinet,
// and a printed "UPRIGHT FREEZER" on a walk-in fridge someone drew with
// the nearest faceplate is a label that is simply wrong.
function frame(width: number, height: number) {
  return svg`
    <rect x="0" y="0" width=${width} height=${height} rx="10" fill="#101216" />
  `;
}

/**
 * A door drawn standing open, shown only while the door switch is on.
 *
 * The lamp alone is a small amber dot among three; an open door on a
 * cold room is the thing a kitchen needs to see from across the room, so
 * the door in the drawing opens: lit interior, shelves, the door swung
 * out at the hinge, and OPEN across it.
 *
 * Every piece is gated on the door role and grouped with it, so a cabinet
 * with no door switch never draws an open door.
 */
function openDoor(id: string, x: number, y: number, w: number, h: number): Region[] {
  const AMBER = "#f59e0b";
  const shelves = [0.3, 0.55, 0.8].map((f, i) => ({
    id: `${id}_shelf${i}`, role: "door", visible_role: "door", group: "door_open",
    kind: "plate", x: x + 6, y: y + h * f, w: w - 12, h: 3, radius: 1.5,
    fill: "#9fb3c2",
  }));
  return [
    { id: `${id}_inside`, role: "door", visible_role: "door", group: "door_open",
      kind: "plate", x, y, w, h, radius: 6, fill: "#dbe9f3", border: AMBER },
    ...shelves,
    // The door itself, seen edge-on where it hangs off the hinge.
    { id: `${id}_leaf`, role: "door", visible_role: "door", group: "door_open",
      kind: "plate", x: x - 9, y: y - 4, w: 8, h: h + 8, radius: 2,
      fill: "#4a5462", border: AMBER },
    { id: `${id}_open`, role: "", visible_role: "door", group: "door_open",
      kind: "text", text: "OPEN", x, y: y + h / 2 - 8, w, align: "middle",
      size: Math.min(16, Math.max(11, w / 6)), color: "#b45309" },
  ] as Region[];
}

// -- Under-bench ---------------------------------------------------------

const UB_TOP = 96;
const UB_BODY_H = 118;
const UB_MIN_W = 300;

function buildUnderbench(p: Palette) {
  return (values: Record<string, number>) => {
    const doors = Math.max(0, Math.min(6, Math.round(values.doors ?? 2)));
    const drawers = Math.max(0, Math.min(8, Math.round(values.drawers ?? 0)));
    // A cabinet with neither would be a box with no front, so default to
    // a single door rather than drawing nothing.
    const bays = doors + (drawers > 0 ? 1 : 0) || 1;

    const bayW = 78;
    const pad = 20;
    const width = Math.max(UB_MIN_W, pad * 2 + bays * bayW + (bays - 1) * 8);
    const height = UB_TOP + UB_BODY_H + 56;
    const fronts = [];

    let x = pad;
    const opened: Region[] = [];
    for (let i = 0; i < doors; i++) {
      opened.push(...openDoor(`door${i}`, x, UB_TOP + 10, bayW, UB_BODY_H - 20));
      fronts.push(svg`
        <rect x=${x} y=${UB_TOP + 10} width=${bayW} height=${UB_BODY_H - 20}
              rx="5" fill=${DOOR_FILL} stroke=${DOOR_EDGE} stroke-width="1.5" />
        <rect x=${x + bayW - 14} y=${UB_TOP + 34} width="5" height="30"
              rx="2.5" fill=${MUTED} opacity="0.7" />
      `);
      x += bayW + 8;
    }
    if (drawers > 0) {
      // Drawers stack within one bay, so an eight-drawer unit is as wide as
      // a one-drawer unit and as tall — which is how they are built.
      const slot = (UB_BODY_H - 20) / drawers;
      for (let i = 0; i < drawers; i++) {
        const y = UB_TOP + 10 + i * slot;
        fronts.push(svg`
          <rect x=${x} y=${y + 1} width=${bayW} height=${Math.max(4, slot - 3)}
                rx="3" fill=${DOOR_FILL} stroke=${DOOR_EDGE} stroke-width="1.2" />
          <rect x=${x + bayW / 2 - 12} y=${y + slot / 2 - 1.5} width="24"
                height="3" rx="1.5" fill=${MUTED} opacity="0.6" />
        `);
      }
    }

    const artNode = svg`
      ${frame(width, height)}
      <rect x=${pad - 8} y=${UB_TOP} width=${width - (pad - 8) * 2}
            height=${UB_BODY_H} rx="8"
            fill=${BODY_FILL} stroke=${BODY_EDGE} stroke-width="2" />
      <rect x=${pad - 8} y=${UB_TOP - 8} width=${width - (pad - 8) * 2}
            height="10" rx="3" fill=${BODY_EDGE} />
      ${fronts}
    `;

    return {
      size: [width, height] as [number, number],
      artNode,
      regions: [
        ...opened,
        ...readout(width - 150, 20, 134, p),
        ...lamps(pad, height - 44, 74),
      ],
    };
  };
}

// -- Walk-in -------------------------------------------------------------

const WALKIN_W = 360;
const WALKIN_H = 300;

function buildWalkin(p: Palette) {
  return () => {
    const bodyTop = 72;
    const bodyH = 170;
    const artNode = svg`
      ${frame(WALKIN_W, WALKIN_H)}
      <rect x="22" y=${bodyTop} width=${WALKIN_W - 44} height=${bodyH} rx="8"
            fill=${BODY_FILL} stroke=${BODY_EDGE} stroke-width="2" />
      <!-- One wide insulated door with the handle and the kick plate -->
      <rect x="40" y=${bodyTop + 16} width=${WALKIN_W - 160} height=${bodyH - 32}
            rx="6" fill=${DOOR_FILL} stroke=${DOOR_EDGE} stroke-width="1.8" />
      <rect x=${WALKIN_W - 134} y=${bodyTop + bodyH / 2 - 22} width="7"
            height="44" rx="3.5" fill=${MUTED} opacity="0.75" />
      <rect x="48" y=${bodyTop + bodyH - 46} width=${WALKIN_W - 176}
            height="22" rx="3" fill="#161b21" />
    `;

    return {
      size: [WALKIN_W, WALKIN_H] as [number, number],
      artNode,
      regions: [
        ...openDoor("door0", 40, bodyTop + 16, WALKIN_W - 160, bodyH - 32),
        ...readout(WALKIN_W - 140, 14, 124, p),
        ...lamps(28, WALKIN_H - 44, 80),
      ],
    };
  };
}

// -- Upright -------------------------------------------------------------

const UPRIGHT_H = 330;

function buildUpright(p: Palette) {
  return (values: Record<string, number>) => {
    const doors = Math.max(1, Math.min(2, Math.round(values.doors ?? 1)));
    const doorW = 104;
    const pad = 22;
    const width = Math.max(260, pad * 2 + doors * doorW + (doors - 1) * 8 + 128);
    const bodyTop = 64;
    const bodyH = UPRIGHT_H - bodyTop - 52;
    const fronts = [];

    let x = pad + 8;
    const opened: Region[] = [];
    for (let i = 0; i < doors; i++) {
      opened.push(...openDoor(`door${i}`, x, bodyTop + 12, doorW, bodyH - 24));
      fronts.push(svg`
        <rect x=${x} y=${bodyTop + 12} width=${doorW} height=${bodyH - 24}
              rx="6" fill=${DOOR_FILL} stroke=${DOOR_EDGE} stroke-width="1.6" />
        <rect x=${x + doorW - 16} y=${bodyTop + bodyH / 2 - 26} width="6"
              height="52" rx="3" fill=${MUTED} opacity="0.7" />
      `);
      x += doorW + 8;
    }

    const artNode = svg`
      ${frame(width, UPRIGHT_H)}
      <rect x=${pad} y=${bodyTop} width=${doors * doorW + (doors - 1) * 8 + 16}
            height=${bodyH} rx="8"
            fill=${BODY_FILL} stroke=${BODY_EDGE} stroke-width="2" />
      ${fronts}
    `;

    return {
      size: [width, UPRIGHT_H] as [number, number],
      artNode,
      regions: [
        ...opened,
        ...readout(width - 146, 56, 130, p),
        ...lamps(width - 2 * LAMP_GAP - 34, UPRIGHT_H - 48),
      ],
    };
  };
}

// -- The faceplates ------------------------------------------------------

const UNDERBENCH_OPTIONS = [
  { key: "doors", label: "Doors", type: "number" as const,
    min: 0, max: 6, default: 2,
    help: "How many hinged doors the cabinet has, left to right." },
  { key: "drawers", label: "Drawers", type: "number" as const,
    min: 0, max: 8, default: 0,
    help: "Drawers stack in a bay to the right of the doors. "
        + "A cabinet with neither draws a single door." },
];

const COMMON = {
  card: "plant-equipment-card",
  render: "svg" as const,
  display: "negative" as const,
  regions: [],
};

function describe(kind: string, p: Palette): string {
  return `${kind}. Temperature against its ${p.band[0]} to ${p.band[1]} °C `
    + "band is the primary reading; door, compressor and alarm are lamps, "
    + "and the drawn door opens while the door switch is on. "
    + "Doors and drawers are drawn to identify the cabinet, not bound "
    + "separately — a real unit has one door switch for the whole thing.";
}

export const UNDERBENCH_FRIDGE: Faceplate = {
  ...COMMON,
  id: "underbench-fridge",
  name: "Under-bench Fridge",
  size: [UB_MIN_W, UB_TOP + UB_BODY_H + 56],
  description: describe("Under-counter refrigerator, 1-6 doors or 1-8 drawers", FRIDGE),
  emulates: "Under-counter commercial refrigerator",
  options: UNDERBENCH_OPTIONS,
  build: buildUnderbench(FRIDGE),
};

export const UNDERBENCH_FREEZER: Faceplate = {
  ...COMMON,
  id: "underbench-freezer",
  name: "Under-bench Freezer",
  size: [UB_MIN_W, UB_TOP + UB_BODY_H + 56],
  description: describe("Under-counter freezer, 1-6 doors or 1-8 drawers", FREEZER),
  emulates: "Under-counter commercial freezer",
  options: UNDERBENCH_OPTIONS,
  build: buildUnderbench(FREEZER),
};

export const WALKIN_FRIDGE: Faceplate = {
  ...COMMON,
  id: "walkin-fridge",
  name: "Walk-in Fridge",
  size: [WALKIN_W, WALKIN_H],
  description: describe("Walk-in cold room", FRIDGE),
  emulates: "Walk-in cold room",
  build: buildWalkin(FRIDGE),
};

export const WALKIN_FREEZER: Faceplate = {
  ...COMMON,
  id: "walkin-freezer",
  name: "Walk-in Freezer",
  size: [WALKIN_W, WALKIN_H],
  description: describe("Walk-in freezer room", FREEZER),
  emulates: "Walk-in freezer room",
  build: buildWalkin(FREEZER),
};

const UPRIGHT_OPTIONS = [
  { key: "doors", label: "Doors", type: "number" as const,
    min: 1, max: 2, default: 1, help: "Single or double upright." },
];

export const UPRIGHT_FRIDGE: Faceplate = {
  ...COMMON,
  id: "upright-fridge",
  name: "Upright Fridge",
  size: [260, UPRIGHT_H],
  description: describe("Upright reach-in refrigerator", FRIDGE),
  emulates: "Upright reach-in refrigerator",
  options: UPRIGHT_OPTIONS,
  build: buildUpright(FRIDGE),
};

export const UPRIGHT_FREEZER: Faceplate = {
  ...COMMON,
  id: "upright-freezer",
  name: "Upright Freezer",
  size: [260, UPRIGHT_H],
  description: describe("Upright reach-in freezer", FREEZER),
  emulates: "Upright reach-in freezer",
  options: UPRIGHT_OPTIONS,
  build: buildUpright(FREEZER),
};
