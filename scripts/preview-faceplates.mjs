/**
 * Render a set of faceplates into one page, to be looked at.
 *
 * test-layout.mjs measures what it can state as a rule — a bar through a
 * number, a label off the edge, two labels colliding. It cannot say
 * whether the result looks right, and every layout defect so far was
 * found in a screenshot rather than a test. This is how the screenshot
 * gets taken without waiting for somebody to notice.
 *
 *   node scripts/preview-faceplates.mjs out.html upright-fridge storage-tanks
 *
 * With no ids it renders every faceplate in the catalogue.
 */
import { JSDOM } from "jsdom";
import { writeFileSync, copyFileSync } from "node:fs";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true,
});
const w = dom.window;
for (const key of Object.getOwnPropertyNames(w)) {
  if (key in globalThis) continue;
  try {
    globalThis[key] = w[key];
  } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.customElements = w.customElements;
for (const key of ["Event", "CustomEvent", "MouseEvent", "KeyboardEvent"]) {
  globalThis[key] = w[key];
}

const { FACEPLATES } = await import("../dist/faceplates-registry.mjs");

const [out, ...wanted] = process.argv.slice(2);
const chosen = wanted.length
  ? FACEPLATES.filter((f) => wanted.includes(f.id))
  : FACEPLATES;

// Load every card the chosen faceplates belong to.
const cards = [...new Set(chosen.map((f) => f.card))];
for (const card of cards) {
  const path = `/tmp/_preview_${card}.mjs`;
  copyFileSync(`dist/${card}.js`, path);
  await import(path + "?t=" + Date.now());
}

/**
 * Something plausible for every role, so the drawing is exercised rather
 * than shown empty. A faceplate full of placeholders hides exactly the
 * collisions this is looking for.
 */
function fakeStates(roles) {
  const states = {};
  const entities = {};
  for (const [index, role] of roles.entries()) {
    const id = `sensor.fake_${role}`;
    entities[role] = id;
    const lamp = /alarm|fault|door|run|fail|high|low|enable/.test(role);
    const text = /name|label|mode|source|status/.test(role);
    states[id] = {
      entity_id: id,
      state: lamp
        ? index % 3 === 0 ? "on" : "off"
        : text ? "Running"
        : String(((index * 7) % 90) + 6.4),
      attributes: {
        friendly_name: role,
        unit_of_measurement: /temp/.test(role) ? "°C"
          : /level|pct|percent/.test(role) ? "%"
          : /current/.test(role) ? "A"
          : /pressure/.test(role) ? "bar" : "",
        min: 0, max: 100,
      },
    };
  }
  return {
    states, entities, devices: {}, areas: {},
    callService: async () => {},
    formatEntityState: (e) => e.state,
  };
}

function rolesOf(face) {
  const values = Object.fromEntries(
    (face.options ?? []).map((o) => [o.key, o.default]),
  );
  const built = face.build
    ? face.build(values, { bound: () => true, filtering: false })
    : face;
  return [...new Set((built.regions ?? []).map((r) => r.role).filter(Boolean))];
}

let styles = "";
const sections = [];
for (const face of chosen) {
  const Card = customElements.get(face.card);
  if (!Card) {
    sections.push(`<section><h2>${face.id}</h2><p>no card ${face.card}</p></section>`);
    continue;
  }
  const roles = rolesOf(face);
  const hass = fakeStates(roles);
  const card = new Card();
  card.setConfig({
    type: `custom:${face.card}`,
    faceplate: face.id,
    entities: hass.entities,
    hide_unbound: false,
  });
  card.hass = hass;
  document.body.appendChild(card);
  await new Promise((r) => setTimeout(r, 90));
  const root = card.shadowRoot ?? card;
  if (!styles) {
    styles = [...root.querySelectorAll("style")].map((s) => s.textContent).join("\n");
  }
  const svg = root.querySelector("svg");
  sections.push(
    `<section><h2>${face.id} <span>${face.card}</span></h2>
     <div class="frame">${svg ? svg.outerHTML : "<p>nothing drawn</p>"}</div></section>`,
  );
}

writeFileSync(out, `<!doctype html>
<html><head><meta charset="utf-8"><title>Faceplates</title>
<style>
  body { margin:0; padding:24px; background:#15171b; color:#cdd3dc;
         font-family: system-ui, sans-serif; }
  h1 { font-size:18px; }
  h2 { font-size:12px; font-weight:600; letter-spacing:1px;
       text-transform:uppercase; color:#8b93a1; margin:26px 0 8px; }
  h2 span { opacity:.5; font-weight:400; text-transform:none; letter-spacing:0; }
  .grid { display:flex; flex-wrap:wrap; gap:20px; align-items:flex-start; }
  section { max-width:640px; }
  .frame { background:#2a2e34; border:1px solid #3a4048; border-radius:8px;
           padding:10px; }
  svg { width:100%; height:auto; display:block; }
  ${styles}
</style></head>
<body><h1>${chosen.length} faceplate(s), every role filled</h1>
<div class="grid">${sections.join("\n")}</div></body></html>`);
console.log(`wrote ${out} with ${sections.length} faceplate(s)`);
