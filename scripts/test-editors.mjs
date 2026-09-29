/**
 * Drive each card's visual editor and check it produces usable fields.
 *
 * This exists because a card editor that renders nothing still passes
 * every other check here: the bundle imports, the element is defined and
 * setConfig does not throw. The only way to know is to mount it, read the
 * DOM and change something.
 *
 * jsdom has no `ha-form`, so this exercises the fallback path — which is
 * the one that has to work when a frontend internal moves, and the only
 * one testable without a browser.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (k in globalThis) continue;
  try { globalThis[k] = w[k]; } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.customElements = w.customElements;

// Node has its own global Event and CustomEvent, so the loop above skips
// jsdom's — and jsdom refuses to dispatch an event object it did not
// create. Force the window's versions, or anything the card dispatches
// (config-changed, a button press) throws.
for (const k of ["Event", "CustomEvent", "MouseEvent", "KeyboardEvent"]) {
  globalThis[k] = w[k];
}

await import("../dist/all-cards.js?t=" + Date.now());

const hass = {
  states: {
    "sensor.alpha": { entity_id: "sensor.alpha", state: "1", attributes: {} },
    "sensor.beta": { entity_id: "sensor.beta", state: "2", attributes: {} },
  },
  callService: async () => {},
};

const CARDS = [
  "bms-meter-card", "hvac-controller-card", "pump-system-card",
  "plant-equipment-card", "audio-zone-card", "room-controller-card",
  "fire-panel-card",
];

let failures = 0;
for (const card of CARDS) {
  const Card = customElements.get(card);
  const Editor = customElements.get(`${card}-editor`);
  if (!Editor) {
    console.log(`${card}: EDITOR MISSING`);
    failures++;
    continue;
  }

  const editor = new Editor();
  editor.hass = hass;
  editor.setConfig(Card.getStubConfig());
  document.body.appendChild(editor);
  await new Promise((r) => setTimeout(r, 120));

  const root = editor.shadowRoot ?? editor;
  const labels = [...root.querySelectorAll("label")];
  const inputs = [...root.querySelectorAll("input, select")];
  const entityFields = inputs.filter((el) => el.getAttribute("list") === "fp-entities");

  if (!labels.length || !inputs.length) {
    console.log(`${card}: RENDERED NO FIELDS`);
    failures++;
    editor.remove();
    continue;
  }
  if (!entityFields.length) {
    console.log(`${card}: no per-point fields`);
    failures++;
    editor.remove();
    continue;
  }

  // Type an entity into the first point and check the config comes back.
  let emitted;
  editor.addEventListener("config-changed", (e) => { emitted = e.detail.config; });
  const field = entityFields[0];
  field.value = "sensor.alpha";
  field.dispatchEvent(new w.Event("change"));
  await new Promise((r) => setTimeout(r, 60));

  const bound = emitted?.entities
    ? Object.values(emitted.entities).includes("sensor.alpha")
    : false;
  console.log(
    `${card}: ${labels.length} fields, ${entityFields.length} points, ` +
    `binding ${bound ? "ok" : "FAILED"}`
  );
  if (!bound) failures++;
  editor.remove();
}

if (failures) {
  console.log(`${failures} editor check(s) failed`);
  process.exit(1);
}
