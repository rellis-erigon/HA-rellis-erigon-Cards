/**
 * Render every state of an imported panel into one self-contained HTML page.
 *
 * An imported panel is only right if it looks like the panel, and that is
 * not something a unit test can tell you. This mounts the card once per
 * state, with the card's own stylesheet inlined, so the result can be
 * opened next to a photograph of the real screen.
 *
 * Usage:
 *   node scripts/preview-panel.mjs dist/crestron-panel-card.js \
 *     crestron-panel-card config.json out.html
 *
 * The config is a card config with an extra "_states" map of
 * entity id -> {state, unit}, exactly as render-card.mjs takes.
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
for (const k of ["Event", "CustomEvent", "MouseEvent", "KeyboardEvent"]) globalThis[k] = w[k];

const [src, name, cfgPath, outPath] = process.argv.slice(2);
const tmp = "/tmp/_preview_card.mjs";
copyFileSync(src, tmp);
await import(tmp + "?t=" + Date.now());
const Card = customElements.get(name);
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
const states = cfg._states ?? {};
delete cfg._states;
const hass = {
  states: Object.fromEntries(Object.entries(states).map(([id, s]) => [id, {
    entity_id: id, state: s.state,
    attributes: { unit_of_measurement: s.unit, friendly_name: id },
  }])),
  entities: {}, devices: {}, areas: {},
  callService: async () => {},
  formatEntityState: (e) => e.state,
};

const pages = cfg.panel.pages ?? [""];
const card = new Card();
card.setConfig(cfg);
card.hass = hass;
document.body.appendChild(card);
await new Promise((r) => setTimeout(r, 120));

let styles = "";
const sections = [];
for (const page of pages) {
  card._page = page;
  card.requestUpdate();
  await card.updateComplete;
  await new Promise((r) => setTimeout(r, 60));
  const root = card.shadowRoot ?? card;
  if (!styles) {
    styles = [...root.querySelectorAll("style")].map((s) => s.textContent).join("\n");
  }
  const svg = root.querySelector("svg");
  sections.push(`<section><h2>${page || "(single screen)"}</h2>
    <div class="frame display-negative">${svg ? svg.outerHTML : "<p>nothing drawn</p>"}</div></section>`);
}

writeFileSync(outPath, `<!doctype html>
<html><head><meta charset="utf-8"><title>${cfg.title} — imported panel</title>
<style>
  body { margin: 0; padding: 24px; background: #15171b; color: #cdd3dc;
         font-family: system-ui, sans-serif; }
  h1 { font-size: 18px; font-weight: 600; }
  h2 { font-size: 12px; font-weight: 600; letter-spacing: 1px;
       text-transform: uppercase; color: #8b93a1; margin: 28px 0 8px; }
  section { max-width: 1000px; }
  .frame { background: #1b1e23; border: 1px solid #2b313a; border-radius: 8px;
           padding: 10px; }
  svg { width: 100%; height: auto; display: block; }
  ${styles}
</style></head>
<body>
<h1>${cfg.title} — generated from the panel's own project file</h1>
<p style="color:#8b93a1;font-size:13px;max-width:60em">Every control is at the
position, size and colour the panel draws it, with the words it shows. Each
section below is one state of the panel's main screen.</p>
${sections.join("\n")}
</body></html>`);
console.log("wrote", outPath, "with", sections.length, "state(s)");
