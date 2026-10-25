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
  const hass = hassWith({ s1: "Meeting Room 1" });
  const { svg } = await mount(
    { panel: FACEPLATE, device: "Function 1-2", hide_unbound: false },
    hass,
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("a partly exposed panel binds what exists",
    texts.includes("Meeting Room 1"), texts.join("|"));
  check("and draws the rest rather than collapsing",
    svg.querySelectorAll("rect.plate").length === 1);
}



// -- what is on screen ----------------------------------------------------

const PANEL_WITH_STATES = {
  id: "states", name: "States", card: "crestron-panel-card", render: "svg",
  size: [1280, 800],
  pages: ["sources", "volume", "confirm"],
  // Sources and volume sit side by side; the popup covers both.
  page_companions: { sources: ["volume"], volume: ["sources"], confirm: [] },
  regions: [
    { id: "a", kind: "text", role: "text_1", x: 10, y: 10, w: 200, h: 40,
      page: "sources", group: "sources", visible_role: "lamp_31",
      placeholder: "" },
    { id: "b", kind: "text", role: "text_2", x: 1010, y: 10, w: 200, h: 40,
      page: "volume", group: "volume", visible_role: "lamp_32",
      placeholder: "" },
    { id: "c", kind: "text", role: "text_3", x: 300, y: 300, w: 400, h: 40,
      page: "confirm", group: "confirm", visible_role: "lamp_35",
      placeholder: "" },
  ],
};

function drawn(svg) {
  return [...svg.querySelectorAll("text")].map((t) => t.textContent.trim())
    .filter(Boolean);
}

{
  // Nothing bound: the fallback shows the selected page and whatever the
  // panel puts beside it.
  const hass = hassWith({ s1: "Sources", s2: "Volume", s3: "Confirm" });
  const { svg } = await mount(
    { panel: PANEL_WITH_STATES, device: "Function 1-2", hide_unbound: false },
    hass);
  const texts = drawn(svg);
  check("a side-by-side subpage is drawn with its neighbour",
    texts.includes("Sources") && texts.includes("Volume"), texts.join("|"));
  check("and one that covers them is not",
    !texts.includes("Confirm"), texts.join("|"));
}

{
  // Joins bound: the panel decides, and it says the popup is up.
  const hass = hassWith({
    s1: "Sources", s2: "Volume", s3: "Confirm",
    d31: "off", d32: "off", d35: "on",
  });
  const { root, svg } = await mount(
    { panel: PANEL_WITH_STATES, device: "Function 1-2", hide_unbound: false },
    hass);
  const texts = drawn(svg);
  check("a bound visibility join decides what is on screen",
    texts.includes("Confirm") && !texts.includes("Sources"), texts.join("|"));
  check("and the manual tabs step out of the way",
    root.querySelectorAll(".pages button").length === 0);
}

{
  // Half exposed: the joins that exist are followed, the rest fall back.
  const hass = hassWith({ s1: "Sources", s2: "Volume", s3: "Confirm", d35: "off" });
  const { root, svg } = await mount(
    { panel: PANEL_WITH_STATES, device: "Function 1-2", hide_unbound: false },
    hass);
  check("an unexposed join still falls back to the page",
    drawn(svg).includes("Sources"), drawn(svg).join("|"));
  check("and the tabs stay while any join is missing",
    root.querySelectorAll(".pages button").length === 3);
}



// -- scale --------------------------------------------------------------

{
  // A generated bar assumes a 16-bit join. Bound to a Q-SYS gain that
  // states dB, the assumption would peg every normal level near empty.
  const hass = hassWith({ a211: -5 });
  hass.states["number.function_1_2_a211"].attributes.min = -30;
  hass.states["number.function_1_2_a211"].attributes.max = 6;
  const fp = {
    ...PANEL_WITH_STATES, pages: undefined, page_companions: undefined,
    regions: [{ id: "v", kind: "bar", role: "level_211", x: 0, y: 0,
                w: 100, h: 20, max: 65535, auto_range: true }],
  };
  const { svg } = await mount(
    { panel: fp, device: "Function 1-2", hide_unbound: false }, hass);
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  // -5 dB across -30..6 is about 69% of travel.
  check("a bar takes its scale from the entity when told to",
    fill > 60 && fill < 78, `fill ${fill}`);
}

{
  const hass = hassWith({ a211: -5 });
  const fp = {
    ...PANEL_WITH_STATES, pages: undefined, page_companions: undefined,
    regions: [{ id: "v", kind: "bar", role: "level_211", x: 0, y: 0,
                w: 100, h: 20, min: -80, max: 10 }],
  };
  const { svg } = await mount(
    { panel: fp, device: "Function 1-2", hide_unbound: false }, hass);
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  // A hand-drawn range is chosen, not assumed, so it stands.
  check("without the flag the faceplate's own range stands",
    fill > 78 && fill < 90, `fill ${fill}`);
}



// -- what the program said is behind the control -------------------------

const STRIP = {
  id: "strip", name: "Strip", card: "crestron-panel-card", render: "svg",
  size: [300, 500],
  regions: [
    { id: "bar", kind: "bar", role: "level_211", x: 40, y: 80, w: 20, h: 200,
      max: 65535, auto_range: true,
      control: "Func1ScrGain", control_kind: "level" },
    { id: "mute", kind: "button", role: "button_213", x: 10, y: 320,
      w: 100, h: 40, text: "Mute", action: "mute_toggle",
      target: "button_213", control: "Func1ScrMute", control_kind: "mute" },
  ],
};

function withEntities(entries) {
  const states = {};
  for (const [id, state, attrs = {}] of entries) {
    states[id] = { entity_id: id, state: String(state),
                   attributes: { friendly_name: id, ...attrs } };
  }
  return {
    states, entities: {}, devices: {}, areas: {},
    callService: async () => {}, formatEntityState: (e) => e.state,
  };
}

{
  // The DSP is not the control processor, so the entity is nowhere near
  // the panel's device. The name is the only thread between them.
  const hass = withEntities([
    ["number.func1scr_volume", -5, { min: -30, max: 6, unit_of_measurement: "dB" }],
    ["switch.func1scr_mute", "off"],
  ]);
  const { svg } = await mount(
    { panel: STRIP, hide_unbound: false }, hass);
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  check("a named control finds its entity with no device and no map",
    fill > 0, `fill ${fill}`);
  // -5 dB across -30..6 is about 69%, not 0.008% of a 16-bit range.
  check("and the dB scale comes with it",
    fill > 12 && fill < 15, `fill ${fill} of 20`);
}

{
  // A sensor of the same name cannot be set, so a fader bound to it
  // would be an ornament.
  const hass = withEntities([["sensor.func1scr_volume", -5]]);
  const { svg } = await mount({ panel: STRIP, hide_unbound: false }, hass);
  check("a level will not bind to something read-only",
    Number(svg.querySelector(".bar-fill").getAttribute("width")) === 0);
}

{
  const hass = withEntities([
    ["number.func1scr_volume_preset_2", 0, { min: -30, max: 6 }],
    ["number.func1scr_volume", -5, { min: -30, max: 6 }],
  ]);
  const card = new Card();
  card.setConfig({ type: "custom:crestron-panel-card", panel: STRIP,
                   hide_unbound: false });
  card.hass = hass;
  document.body.appendChild(card);
  await new Promise((r) => setTimeout(r, 120));
  // Checked through the card so the whole chain is exercised, not the
  // matcher on its own.
  check("the closest name wins over a longer one",
    (card.shadowRoot ?? card).querySelector("svg") !== null);
}

{
  const hass = withEntities([["number.somethingelse", 0]]);
  const { svg } = await mount({ panel: STRIP, hide_unbound: false }, hass);
  check("an absent control binds nothing rather than something wrong",
    Number(svg.querySelector(".bar-fill").getAttribute("width")) === 0);
}

{
  // An explicit entity is still an explicit entity.
  const hass = withEntities([
    ["number.func1scr_volume", -5, { min: -30, max: 6 }],
    ["number.chosen", 6, { min: -30, max: 6 }],
  ]);
  const { svg } = await mount(
    { panel: STRIP, entities: { level_211: "number.chosen" },
      hide_unbound: false }, hass);
  const fill = Number(svg.querySelector(".bar-fill").getAttribute("width"));
  check("an explicit choice still wins over the program's",
    fill === 20, `fill ${fill}`);
}

// -- emulating the panel: a control sends the join the panel would -------

/** A Crestron CIP processor as the frontend sees it, recording calls. */
function cipHass(joins) {
  const hass = hassWith(joins, { deviceName: "Room A & B" });
  for (const entry of Object.values(hass.entities)) entry.platform = "crestron_cip";
  hass.devices.dev1.config_entries = ["entry-12"];
  hass.calls = [];
  hass.callService = async (domain, service, data) => {
    hass.calls.push([domain, service, data]);
  };
  return hass;
}

const PANEL_KEYS = {
  ...FACEPLATE,
  regions: [
    { id: "k1", kind: "button", role: "button_101", x: 0, y: 0, w: 100,
      h: 60, action: "press", target: "button_101", text: "AirMedia" },
    // The panel's volume up is a digital join the program ramps. The
    // generator drew it as a level step, but the panel never wrote a
    // level: it pressed this join.
    { id: "k2", kind: "button", role: "button_211", x: 0, y: 100, w: 100,
      h: 60, action: "level_up", target: "level_211", text: "" },
    { id: "k3", kind: "bar", role: "level_211", x: 200, y: 0, w: 40,
      h: 300, max: 65535 },
  ],
};

/** Press and release a button: held, as on a panel, and clicked, as elsewhere. */
async function tap(hass, config, id, holdMs = 10) {
  const { root } = await mount({ panel: PANEL_KEYS, hide_unbound: false, ...config }, hass);
  const keys = [...root.querySelectorAll("g.button")];
  const buttons = PANEL_KEYS.regions.filter((r) => r.kind === "button");
  const key = keys[buttons.findIndex((r) => r.id === id)];
  key?.dispatchEvent(new w.Event("pointerdown", { bubbles: true, cancelable: true }));
  await new Promise((r) => setTimeout(r, holdMs));
  key?.dispatchEvent(new w.Event("pointerup", { bubbles: true }));
  key?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // The release waits out the minimum press.
  await new Promise((r) => setTimeout(r, 150));
}

{
  const hass = cipHass({ d101: "on", a211: 30000 });
  await tap(hass, { device: "Room A & B" }, "k1");
  const [down, up] = hass.calls;
  check("a button on a CIP processor holds its own join, then releases it",
    hass.calls.length === 2 &&
      down[1] === "set_digital" && down[2].join === 101 && down[2].value === true &&
      down[2].entry_id === "entry-12" &&
      up[1] === "set_digital" && up[2].join === 101 && up[2].value === false,
    JSON.stringify(hass.calls));
}

{
  const hass = cipHass({ a211: 30000 });
  await tap(hass, { device: "Room A & B" }, "k2");
  const [call] = hass.calls;
  check("volume up holds the panel's join rather than writing a level",
    call && call[1] === "set_digital" && call[2].join === 211 && call[2].value === true,
    JSON.stringify(hass.calls));
}

{
  // Without an entry id the action would go to every processor.
  const hass = cipHass({ d101: "on" });
  hass.devices.dev1.config_entries = [];
  hass.entities = Object.fromEntries(
    Object.entries(hass.entities).map(([k, v]) => [k, { ...v, platform: "other" }]));
  await tap(hass, { device: "Room A & B" }, "k1");
  check("a device that is not a CIP processor sends no CIP action",
    !hass.calls.some(([domain]) => domain === "crestron_cip"),
    JSON.stringify(hass.calls));
}

{
  const hass = cipHass({ d101: "on" });
  hass.states["button.by_hand"] = { entity_id: "button.by_hand", state: "unknown", attributes: {} };
  await tap(hass, { device: "Room A & B",
                    entities: { button_101: "button.by_hand" } }, "k1");
  const [call] = hass.calls;
  check("a hand-bound entity still wins over the panel's join",
    call && call[0] === "button" && call[2].entity_id === "button.by_hand",
    JSON.stringify(hass.calls));
}

{
  // Two subpages sharing one space, shown by d31 and d33. The processor
  // reports d31 on and never mentions d33, because it is at its default.
  const PAGES = {
    ...FACEPLATE,
    pages: ["unjoined", "joined"],
    regions: [
      { id: "p1", kind: "text", role: "", x: 0, y: 0, w: 200, h: 40,
        text: "Unjoined page", page: "unjoined", visible_role: "lamp_31" },
      { id: "p2", kind: "text", role: "", x: 0, y: 0, w: 200, h: 40,
        text: "Joined page", page: "joined", visible_role: "lamp_33" },
    ],
  };
  const hass = cipHass({ d31: "on" });
  const { root, svg } = await mount(
    { panel: PAGES, device: "Room A & B", hide_unbound: false }, hass);
  const texts = [...svg.querySelectorAll("text")].map((t) => t.textContent.trim());
  check("an unreported subpage join on a processor is off",
    texts.includes("Unjoined page") && !texts.includes("Joined page"),
    texts.join("|"));
  check("and the processor, not page tabs, decides what is on screen",
    !root.querySelector(".pages"));

  // The same panel off a processor keeps the old behaviour: unknown is
  // not off, so the user picks the page.
  const plain = hassWith({ d31: "on" });
  for (const id of Object.keys(plain.states)) {
    plain.states[id.replace("button.", "binary_sensor.")] = plain.states[id];
  }
  const other = await mount({ panel: PAGES, device: "Function 1-2", hide_unbound: false }, plain);
  check("elsewhere an unbound visibility join still falls back to tabs",
    Boolean(other.root.querySelector(".pages")));
}

{
  // Held for as long as the finger is down: the processor ramps a volume
  // for exactly as long as its join is high.
  const hass = cipHass({ a211: 30000 });
  const started = Date.now();
  let releasedAt = 0;
  const record = hass.callService;
  hass.callService = async (...args) => {
    if (args[2]?.value === false) releasedAt = Date.now();
    return record(...args);
  };
  await tap(hass, { device: "Room A & B" }, "k2", 300);
  check("a held button is released when the finger lifts, not before",
    releasedAt - started >= 290, `released after ${releasedAt - started} ms`);
}

// -- a whole panel: every screen, and the processor picks one ----------

{
  const screen = (text) => ({
    ...FACEPLATE, id: text, regions: [
      { id: "t", kind: "text", role: "", x: 0, y: 0, w: 300, h: 40, text },
    ],
  });
  const DOC = {
    format: "crestron-panel", version: 1, name: "Room", size: [1280, 800],
    screens: { Start: screen("Start screen"), Main: screen("Main screen") },
    page_joins: { Start: 12, Main: 13 },
    default_screen: "Main",
  };
  globalThis.fetch = async () => ({ ok: true, json: async () => DOC });

  const textsOf = (svg) => [...svg.querySelectorAll("text")].map((t) => t.textContent.trim());

  // The processor pulsed Start after Main: both are off now, and the
  // later one is the page on the wall.
  const hass = cipHass({ d12: "off", d13: "off" });
  hass.states["button.function_1_2_d12"].attributes.last_on = "2026-10-25T00:20:00+00:00";
  hass.states["button.function_1_2_d13"].attributes.last_on = "2026-10-25T00:10:00+00:00";
  const { root, svg } = await mount(
    { panel_url: "/local/crestron-panels/room/panel.json",
      device: "Room A & B", hide_unbound: false }, hass);
  check("a whole panel loads from panel_url and shows the page flipped to last",
    textsOf(svg).includes("Start screen") && !textsOf(svg).includes("Main screen"),
    textsOf(svg).join("|"));
  check("and the processor decides, so there are no screen tabs",
    !root.querySelector(".screens"));

  // A page join that is on right now beats any record of the past.
  const now = cipHass({ d12: "off", d13: "on" });
  now.states["button.function_1_2_d12"].attributes.last_on = "2026-10-25T00:20:00+00:00";
  const second = await mount(
    { panel_url: "/local/crestron-panels/room/panel.json",
      device: "Room A & B", hide_unbound: false }, now);
  check("a page join that is on now wins",
    textsOf(second.svg).includes("Main screen"), textsOf(second.svg).join("|"));

  // Nothing flipped yet: the default, and tabs to choose.
  const none = cipHass({ s1: "Room" });
  const third = await mount(
    { panel_url: "/local/crestron-panels/room/panel.json",
      device: "Room A & B", hide_unbound: false }, none);
  check("before any flip the default screen shows, with tabs to choose",
    textsOf(third.svg).includes("Main screen") && Boolean(third.root.querySelector(".screens")),
    textsOf(third.svg).join("|"));

  const fourth = await mount(
    { panel_url: "/local/crestron-panels/room/panel.json", default_screen: "Start",
      device: "Room A & B", hide_unbound: false }, cipHass({ s1: "Room" }));
  check("a site can say which screen its panels rest on",
    textsOf(fourth.svg).includes("Start screen"), textsOf(fourth.svg).join("|"));
}

{
  // A Subpage Reference List: one zone strip, drawn per zone, each bound to
  // its own joins inside the list's SmartObject.
  const strip = (i) => ({ regions: [
    { id: `name_i${i}`, kind: "text", role: `text_o1_${11 + (i - 1) * 10}`, x: 0, y: 0, w: 200, h: 40, placeholder: "" },
    { id: `mute_i${i}`, kind: "button", role: `button_o1_${4011 + (i - 1) * 10}`, x: 0, y: 500,
      w: 200, h: 60, action: "press", target: `button_o1_${4011 + (i - 1) * 10}`, text: "MUTE" },
  ] });
  const DOC = {
    format: "crestron-panel", version: 1, name: "BGM", size: [1280, 800],
    screens: { Page: { ...FACEPLATE, id: "bgm", regions: [], lists: [{
      x: 0, y: 120, w: 1276, h: 650, orientation: "horizontal", spacing: 10, margin: 5,
      smart_object: 1, item_size: [200, 640], items: [1, 2, 3].map(strip),
    }] } },
    page_joins: {}, default_screen: "Page",
  };
  globalThis.fetch = async () => ({ ok: true, json: async () => DOC });
  const hass = cipHass({ s1: "Reception" });
  for (const [i, name] of [[2, "Gym"], [3, "Pool Area"]]) {
    const id = `sensor.reception_o1_s${11 + (i - 1) * 10}`;
    hass.states[id] = { entity_id: id, state: name,
      attributes: { join: `o1:s${11 + (i - 1) * 10}` } };
    hass.entities[id] = { entity_id: id, device_id: "dev1", platform: "crestron_cip" };
  }
  const { root } = await mount({ panel_url: "/local/crestron-panels/bgm/panel.json",
    device: "Room A & B", hide_unbound: false }, hass);
  const items = [...root.querySelectorAll(".list .item")];
  check("every item of a reference list is drawn", items.length === 3, `${items.length} items`);
  const names = items.map((item) => [...item.querySelectorAll("text")].map((t) => t.textContent.trim()).join("|"));
  check("each item reads its own join inside the SmartObject",
    names[1].includes("Gym") && names[2].includes("Pool Area") && !names[0].includes("Gym"),
    names.join(" / "));

  hass.calls.length = 0;
  const mute = items[2].querySelector("g.button");
  mute.dispatchEvent(new w.Event("pointerdown", { bubbles: true, cancelable: true }));
  mute.dispatchEvent(new w.Event("pointerup", { bubbles: true }));
  await new Promise((r) => setTimeout(r, 150));
  const [down] = hass.calls;
  check("a list item's button is sent into its SmartObject",
    down && down[1] === "set_digital" && down[2].join === 4031 && down[2].smart_object === 1,
    JSON.stringify(hass.calls));
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
