/**
 * An imported Crestron panel must bind from the device alone.
 *
 * A faceplate generated from a panel project names its roles after the
 * joins behind them — `button_101`, `level_211` — and there is no fixed
 * table those can be looked up in, because every panel is different. If
 * they only bound from an explicit `entities` map, adding an imported
 * panel to a dashboard would mean mapping twenty-nine ids by hand, and
 * exposing one more join later would mean editing the dashboard again.
 *
 * The CIP integration publishes the join each entity came from as an
 * attribute. Matching on that is what makes `device:` sufficient. This
 * test exists because that chain is long — generator, add-on, integration,
 * card — and a change at any point in it breaks binding silently: the card
 * still renders, just dark.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true,
});
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) {
  if (k in globalThis) continue;
  try {
    globalThis[k] = w[k];
  } catch {}
}
globalThis.window = w;
globalThis.document = w.document;
globalThis.customElements = w.customElements;
for (const k of ["Event", "CustomEvent", "MouseEvent", "KeyboardEvent"]) {
  globalThis[k] = w[k];
}

await import("../dist/crestron-panel-card.js");
const Card = customElements.get("crestron-panel-card");

let passed = 0;
let failed = 0;
function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${name}`);
  } else {
    failed += 1;
    console.log(`  FAIL ${name}${detail ? ": " + detail : ""}`);
  }
}

// A faceplate shaped like one generated from a real project: the panel's
// own chrome, a momentary button, a level and an indirect text readout.
const FACEPLATE = {
  id: "imported",
  name: "Imported panel",
  card: "crestron-panel-card",
  render: "svg",
  size: [1280, 800],
  regions: [
    { id: "r0", kind: "plate", role: "", x: 0, y: 0, w: 1280, h: 120,
      border: "currentColor" },
    { id: "r1", kind: "button", role: "button_101", x: 40, y: 200, w: 200,
      h: 90, action: "press", target: "button_101", text: "Projector" },
    { id: "r2", kind: "bar", role: "level_211", x: 300, y: 200, w: 40,
      h: 300, max: 65535 },
    { id: "r3", kind: "text", role: "text_1", x: 400, y: 40, w: 400, h: 60,
      placeholder: "" },
    // A control the project gave no join: positional, deliberately
    // unbindable, and it must not drag in some unrelated entity.
    { id: "r4", kind: "text", role: "text_x9", x: 400, y: 600, w: 300,
      h: 40, placeholder: "" },
  ],
};

/** A device whose entities carry the join they came from. */
function hassWith(joins, { deviceName = "Function 1-2" } = {}) {
  const states = {};
  const entities = {};
  for (const [join, value] of Object.entries(joins)) {
    const domain =
      join[0] === "d" ? "button" : join[0] === "a" ? "number" : "sensor";
    const id = `${domain}.function_1_2_${join}`;
    states[id] = {
      entity_id: id,
      state: String(value),
      attributes: { processor: deviceName, join, friendly_name: join },
    };
    entities[id] = { entity_id: id, device_id: "dev1", area_id: null };
  }
  return {
    states,
    entities,
    devices: { dev1: { id: "dev1", name: deviceName } },
    areas: {},
    callService: async () => {},
    formatEntityState: (e) => e.state,
  };
}

async function mount(config, hass) {
  const card = new Card();
  card.setConfig({ type: "custom:crestron-panel-card", ...config });
  card.hass = hass;
  document.body.appendChild(card);
  await new Promise((r) => setTimeout(r, 120));
  const root = card.shadowRoot ?? card;
  return { card, root, svg: root.querySelector("svg") };
}

// -- the whole point ------------------------------------------------------

{
  const hass = hassWith({ d101: "unknown", a211: 40000, s1: "Blu-ray" });
  const { svg } = await mount(
    { panel: FACEPLATE, device: "Function 1-2", hide_unbound: false },
    hass,
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("a generated role binds from the device, with no entities map",
    texts.includes("Blu-ray"), texts.join("|"));
  // A bar always draws its track and its fill; an unbound one is simply
  // empty, so the width is what says whether it bound.
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  check("the level binds too, and reads off the full 16-bit range",
    fill > 0, `fill width ${fill}`);
  // Only the control the project gave no join should be dark.
  const dark = svg.querySelectorAll(".lcd-value.dark").length;
  check("every control with a join is live", dark === 1, `${dark} dark`);
}

// -- what must not happen -------------------------------------------------

{
  // Join 211 on the digital bus is a different signal from 211 on the
  // analog bus. Binding a level to a button would be silent and wrong.
  const hass = hassWith({ d211: "unknown", s1: "Room" });
  const { svg } = await mount(
    { panel: FACEPLATE, device: "Function 1-2", hide_unbound: false },
    hass,
  );
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  check("a join on the wrong bus does not bind",
    fill === 0, `fill width ${fill}`);
}

{
  const hass = hassWith({ s9: "Something" });
  const { svg } = await mount(
    { panel: FACEPLATE, device: "Function 1-2", hide_unbound: false },
    hass,
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("a control with no join binds nothing",
    !texts.includes("Something"), texts.join("|"));
}

{
  // An explicit choice is still an explicit choice, including when the
  // device holds something that would otherwise have matched.
  const hass = hassWith({ s1: "From device" });
  hass.states["sensor.chosen_by_hand"] = {
    entity_id: "sensor.chosen_by_hand",
    state: "From config",
    attributes: {},
  };
  const { svg } = await mount(
    {
      panel: FACEPLATE,
      device: "Function 1-2",
      entities: { text_1: "sensor.chosen_by_hand" },
      hide_unbound: false,
    },
    hass,
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("an explicit entity still wins over the device",
    texts.includes("From config"), texts.join("|"));
}

{
  // The real situation partway through setting a panel up: the text joins
  // were exposed long ago and the buttons have not been yet.
  const hass = hassWith({ s1: "Orchard Room 1" });
  const { svg } = await mount(
    { panel: FACEPLATE, device: "Function 1-2", hide_unbound: false },
    hass,
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("a partly exposed panel binds what exists",
    texts.includes("Orchard Room 1"), texts.join("|"));
  check("and draws the rest rather than collapsing",
    svg.querySelectorAll("rect.plate").length === 1);
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
