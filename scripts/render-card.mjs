/**
 * Mount a built card with a fake hass and print what it actually drew.
 *
 * test-cards.mjs only proves setConfig does not throw. This proves the
 * faceplate renders the values: it catches a lamp lit by the wrong
 * truthiness rule, a doubled unit, or a region bound to a role nothing
 * fills — none of which throw.
 *
 * Usage:
 *   node scripts/render-card.mjs dist/pump-system-card.js pump-system-card config.json
 *
 * The config file is a card config with an extra "_states" map of
 * entity id -> {state, unit}.
 */
import { JSDOM } from "jsdom";
import { readFileSync, copyFileSync } from "node:fs";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (k in globalThis) continue;
  try { globalThis[k] = w[k]; } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.customElements = w.customElements;

const [src, name, configPath] = process.argv.slice(2);
const tmp = "/tmp/_card_to_render.mjs";
copyFileSync(src, tmp);
await import(tmp + "?t=" + Date.now());

const Card = customElements.get(name);
if (!Card) {
  console.log(`${name}: MISSING`);
  process.exit(1);
}

const { _states = {}, ...config } = JSON.parse(readFileSync(configPath, "utf8"));
const states = Object.fromEntries(
  Object.entries(_states).map(([id, v]) => [
    id,
    typeof v === "string"
      ? { state: v, attributes: {} }
      : { state: v.state, attributes: v.unit ? { unit_of_measurement: v.unit } : {} },
  ]),
);

const card = new Card();
card.setConfig(config);
card.hass = { states };
document.body.appendChild(card);
// Lit renders on a microtask; one turn of the event loop is enough.
await new Promise((resolve) => setTimeout(resolve, 200));

const root = card.shadowRoot ?? card;
const svg = root.querySelector("svg");
console.log(`${name}: viewBox ${svg?.getAttribute("viewBox") ?? "NONE"}`);

// textContent, not a regex over the markup: lit leaves comment markers
// inside elements and a naive <text>([^<]*)</text> misses the content.
const texts = [...root.querySelectorAll("text")]
  .map((t) => t.textContent.replace(/\s+/g, " ").trim())
  .filter(Boolean);
console.log(`  text (${texts.length}): ${texts.map((t) => JSON.stringify(t)).join(" ")}`);

const lamps = [...root.querySelectorAll("circle.lamp")];
const lit = lamps.filter((c) => c.getAttribute("class").includes("lit")).length;
console.log(`  lamps: ${lamps.length}, lit ${lit}`);

if (!texts.length && !lamps.length) {
  console.log("  NOTHING RENDERED");
  process.exit(1);
}
