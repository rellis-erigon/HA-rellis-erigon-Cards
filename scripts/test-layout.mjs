/**
 * Catch faceplate regions that collide on screen.
 *
 * Every defect this guards against shipped at least once and was only
 * found in a screenshot: a value bar drawn through the middle of the
 * number it scales, a unit sat on top of that bar, lamp labels running
 * into one another, and labels clipped off the bottom of the card.
 *
 * The geometry is all declared, so none of that needed a browser to
 * find — it just needed somebody to measure. This measures.
 */
import { JSDOM } from "jsdom";

// The registry pulls in lit, which wants a DOM at import time even
// though nothing here renders.
const dom = new JSDOM("<!doctype html><html><body></body></html>");
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (key in globalThis) continue;
  try { globalThis[key] = dom.window[key]; } catch { /* read-only */ }
}
globalThis.window = dom.window;
globalThis.document = dom.window.document;

const { FACEPLATES: faceplates } = await import("../dist/faceplates-registry.mjs");

let passed = 0;
let failed = 0;
const problems = [];

function fail(face, message) {
  failed += 1;
  problems.push(`${face}: ${message}`);
}

/** Rough text extent. Average glyph advance is about 0.6em. */
function textBox(r) {
  const size = r.size ?? 22;
  const text = r.text || r.placeholder || "00.0";
  const width = Math.min(r.w ?? Infinity, text.length * size * 0.6);
  const anchor = r.align ?? "start";
  const left =
    anchor === "end" ? (r.x + (r.w ?? 0)) - width
    : anchor === "middle" ? r.x + (r.w ?? 0) / 2 - width / 2
    : r.x;
  // A text region's y is the top of its glyphs; the baseline is a font
  // size below, and descenders go a little past that.
  return { x1: left, x2: left + width, y1: r.y, y2: r.y + size * 1.1 };
}

/** A lamp's label is centred under the lamp, at its own size. */
function lampLabelBox(r) {
  const radius = (r.w ?? 12) / 2;
  const size = 9;
  const width = (r.label || "").length * size * 0.62;
  const cx = r.x + radius;
  const y = r.y + radius * 2 + 12;
  return { x1: cx - width / 2, x2: cx + width / 2, y1: y - size, y2: y + 2 };
}

function overlap(a, b) {
  return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
}

function build(face) {
  if (!face.build) return face;
  const values = Object.fromEntries(
    (face.options ?? []).map((o) => [o.key, o.default]),
  );
  return { ...face, ...face.build(values, { bound: () => true, filtering: false }) };
}

for (const face of faceplates) {
  const drawn = build(face);
  const [width, height] = drawn.size;
  const regions = drawn.regions ?? [];

  const texts = regions.filter((r) => r.kind === "text" && (r.role || r.text));
  const bars = regions.filter((r) => r.kind === "bar");
  const lamps = regions.filter((r) => r.kind === "lamp" && r.label);

  // A thin bar crossing a big number is a defect: the scale is drawn
  // through the reading it scales. Text sitting inside a large bar is
  // not — a tank's level belongs in the tank, over its own fill — so
  // the test is whether the bar is thinner than the text it meets.
  for (const text of texts) {
    const tb = textBox(text);
    const textHeight = tb.y2 - tb.y1;
    for (const bar of bars) {
      if ((text.page ?? "") !== (bar.page ?? "")) continue;
      const barHeight = bar.h ?? 0;
      if (barHeight >= textHeight) continue;
      const bb = { x1: bar.x, x2: bar.x + (bar.w ?? 0),
                   y1: bar.y, y2: bar.y + barHeight };
      if (overlap(tb, bb)) {
        fail(face.id, `bar ${bar.id} is drawn through text ${text.id}`);
      }
    }
  }

  // Two lamp labels must not run into one another.
  for (let i = 0; i < lamps.length; i += 1) {
    for (let j = i + 1; j < lamps.length; j += 1) {
      if ((lamps[i].page ?? "") !== (lamps[j].page ?? "")) continue;
      if (overlap(lampLabelBox(lamps[i]), lampLabelBox(lamps[j]))) {
        fail(face.id,
          `lamp labels ${lamps[i].label} and ${lamps[j].label} collide`);
      }
    }
  }

  // Nothing may hang off the bottom or the right of the card.
  for (const lamp of lamps) {
    const box = lampLabelBox(lamp);
    if (box.y2 > height) {
      fail(face.id, `lamp label ${lamp.label} is clipped by the bottom edge`);
    }
  }
  for (const text of texts) {
    const box = textBox(text);
    if (box.y2 > height + 1) {
      fail(face.id, `text ${text.id} is clipped by the bottom edge`);
    }
    if (box.x2 > width + 1) {
      fail(face.id, `text ${text.id} runs past the right edge`);
    }
  }
  passed += 1;
}

for (const problem of problems) console.log("  FAIL " + problem);
console.log(`\n${passed} faceplate(s) measured, ${failed} problem(s)`);
process.exit(failed ? 1 : 0);
