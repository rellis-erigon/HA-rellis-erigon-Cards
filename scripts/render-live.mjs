/**
 * Render real cards against the live Home Assistant registries.
 *
 * render-card.mjs builds only `states`, so a card configured with
 * `device:` falls back to matching entity ids by substring and binds
 * nothing — which is fine for its purpose and useless for checking a
 * generated card. This builds states, entities and devices the way the
 * frontend has them, so `device:` resolves exactly as it will in a
 * browser.
 *
 * Written because there is no browser in the container this runs in, and
 * "the dashboard should work now" is not a thing worth saying without
 * having rendered it.
 *
 * Usage:
 *   node scripts/render-live.mjs dist/hvac-controller-card.js out.html card.json...
 *
 * Each card.json is a card config plus `_states`: entity id -> {state,
 * attributes}. There is a helper for building those from a live Home
 * Assistant in the project notes; nothing here talks to Home Assistant,
 * so no site data lands in this repository.
 */
import { JSDOM } from "jsdom";
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (k in globalThis) continue;
  try { globalThis[k] = w[k]; } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.customElements = w.customElements;
for (const k of ["Event", "CustomEvent", "MouseEvent", "KeyboardEvent"]) {
  globalThis[k] = w[k];
}

const [bundle, out, ...configs] = process.argv.slice(2);
const tmp = "/tmp/_live_card.mjs";
copyFileSync(bundle, tmp);
await import(tmp + "?t=" + Date.now());
const Card = customElements.get("hvac-controller-card");
if (!Card) { console.log("card MISSING"); process.exit(1); }

const sections = [];
for (const path of configs) {
  const { _states = {}, _device_entities = [], ...config } =
    JSON.parse(readFileSync(path, "utf8"));

  const states = {};
  const entities = {};
  for (const [id, v] of Object.entries(_states)) {
    states[id] = { entity_id: id, state: v.state, attributes: v.attributes ?? {} };
    entities[id] = { entity_id: id, device_id: "dev1", area_id: null };
  }
  const hass = {
    states, entities,
    devices: { dev1: { id: "dev1", name: config.device } },
    areas: {},
    callService: async () => {},
    formatEntityState: (e) => e.state,
  };

  const card = new Card();
  card.setConfig(config);
  card.hass = hass;
  document.body.appendChild(card);
  await new Promise((r) => setTimeout(r, 250));
  const root = card.shadowRoot ?? card;
  const svg = root.querySelector("svg");
  const texts = [...root.querySelectorAll("text")]
    .map((t) => t.textContent.replace(/\s+/g, " ").trim()).filter(Boolean);
  const lamps = [...root.querySelectorAll("circle.lamp, rect.lamp")];
  const lit = lamps.filter((c) => (c.getAttribute("class") || "").includes("lit")).length;
  console.log(`${config.device}: ${texts.length} text, ${lamps.length} lamps (${lit} lit)`);
  console.log(`  ${texts.join(" | ")}`);
  sections.push(
    `<section><h2>${config.device}</h2>
     <div class="frame">${svg ? svg.outerHTML : "<p>nothing drawn</p>"}</div></section>`);
}

writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8">
<title>Live indoor units</title><style>
 body{margin:0;padding:24px;background:#15171b;color:#cdd3dc;font-family:system-ui,sans-serif}
 h1{font-size:15px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8e98a6}
 section{margin:26px 0}h2{font-size:14px;font-weight:600;margin:0 0 8px}
 .frame{display:inline-block;padding:14px;background:#1b2027;border-radius:10px}
 svg{max-width:100%;height:auto}
</style></head><body>
<h1>hvac-controller-card · indoor-unit · live data</h1>${sections.join("")}
</body></html>`);
console.log(`\nwrote ${out}`);
