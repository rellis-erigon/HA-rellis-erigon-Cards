/**
 * Load a built card in a DOM shim and check it accepts configurations.
 *
 * Catches the class of bug that shows as "Configuration error" in Home
 * Assistant with nothing useful in the console: a setConfig that throws, an
 * element that never gets defined, a bundle that fails on import.
 *
 * Usage:
 *   node scripts/test-cards.mjs dist/hvac-controller-card.js hvac-controller-card '{"case":{...}}'
 *
 * The stub configuration is always tested too, because Home Assistant calls
 * setConfig with it to preview the card in the picker.
 */
import { JSDOM } from "jsdom";
import { copyFileSync } from "node:fs";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (k in globalThis) continue;
  try { globalThis[k] = w[k]; } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.Document = w.Document;
globalThis.customElements = w.customElements;

const src = process.argv[2];
const tmp = "/tmp/_card_under_test.mjs";
copyFileSync(src, tmp);
await import(tmp + "?t=" + Date.now());

const name = process.argv[3];
const Card = customElements.get(name);
console.log(`${name}: ${Card ? "defined" : "MISSING"}`);
if (!Card) process.exit(1);

const cases = JSON.parse(process.argv[4]);
for (const [label, config] of Object.entries(cases)) {
  const card = new Card();
  try {
    card.setConfig(config);
    console.log(`  ${label}: setConfig ok`);
  } catch (e) {
    console.log(`  ${label}: THREW -> ${e.message}`);
  }
}
const stub = Card.getStubConfig ? Card.getStubConfig() : null;
if (stub) {
  const card = new Card();
  try { card.setConfig(stub); console.log("  stub config: setConfig ok"); }
  catch (e) { console.log(`  stub config: THREW -> ${e.message}`); }
}
