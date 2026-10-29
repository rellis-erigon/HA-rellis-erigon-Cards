/**
 * The floors-and-areas dashboard builds itself from the registries.
 *
 * The point of this strategy is that moving a device to another area moves
 * its card on the next page load, with nothing to regenerate. So the test
 * that matters is: change the registry, generate again, and see the card
 * move. The static generator this replaces could not do that, which is why
 * it existed as a script somebody had to remember to run.
 */
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) { if (k in globalThis) continue; try { globalThis[k] = w[k]; } catch {} }
globalThis.window = w; globalThis.document = w.document; globalThis.customElements = w.customElements;
await import("../dist/site-floors-strategy.js?t=" + Date.now());

let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
};

/** A hass with two floors, three areas and a handful of things in them. */
function makeHass(overrides = {}) {
  return {
    floors: {
      level_1: { floor_id: "level_1", name: "Level 1", level: 1 },
      roof: { floor_id: "roof", name: "Roof", level: 7 },
    },
    areas: {
      room_a: { area_id: "room_a", name: "Room A1", floor_id: "level_1" },
      room_b: { area_id: "room_b", name: "Room B1", floor_id: "level_1" },
      plant: { area_id: "plant", name: "Plant", floor_id: "roof" },
      nowhere: { area_id: "nowhere", name: "Spare", floor_id: null },
    },
    devices: {
      dev_fan: { id: "dev_fan", name: "AHU1", area_id: "room_a" },
      dev_cam: { id: "dev_cam", name: "Recorder", area_id: "plant" },
    },
    entities: {
      "sensor.fan_speed": { entity_id: "sensor.fan_speed", device_id: "dev_fan" },
      "sensor.hidden_one": { entity_id: "sensor.hidden_one", device_id: "dev_fan", hidden: true },
      "camera.uniview_token_17_0_9_1_9_s0": { entity_id: "camera.uniview_token_17_0_9_1_9_s0", device_id: "dev_cam" },
      "camera.uniview_token_17_0_9_1_9_s2": { entity_id: "camera.uniview_token_17_0_9_1_9_s2", device_id: "dev_cam" },
      // Not a camera, so the plant area has an "Everything else" section
      // to put in an order and to leave out of one.
      "sensor.recorder_uptime": { entity_id: "sensor.recorder_uptime", device_id: "dev_cam" },
    },
    states: {
      "camera.uniview_token_17_0_9_1_9_s0": { attributes: { friendly_name: "Plant Room" } },
      "camera.uniview_token_17_0_9_1_9_s2": { attributes: { friendly_name: "UNV - CCTV Token:17/0/9/1/9/s2" } },
    },
    services: {},
    callService: async () => ({}),
    ...overrides,
  };
}

const gen = async (hass, config = {}) =>
  customElements.get("ll-strategy-dashboard-site-floors").generate(config, hass);

const view = (res, path) => res.views.find((v) => v.path === path);
const cardsOf = (v) => (v.sections ?? []).flatMap((s) => s.cards ?? []);
const sectionNamed = (v, heading) =>
  (v.sections ?? []).find((s) => s.cards?.[0]?.heading === heading);

// 1. A view per floor, in level order, plus one per area as a subview.
{
  const res = await gen(makeHass());
  const tabs = res.views.filter((v) => !v.subview).map((v) => v.title);
  check("a view per floor, lowest first", 
    tabs[0] === "Level 1" && tabs[1] === "Roof", tabs.join(" / "));
  check("areas with no floor get their own tab", tabs.includes("Not on a floor"));
  const subs = res.views.filter((v) => v.subview);
  check("a subview per area", subs.length === 4, `${subs.length} subviews`);
}

// 2. Every area card on a floor page opens that area's own page.
{
  const res = await gen(makeHass());
  const floor = view(res, "floor-level-1");
  const areaCards = cardsOf(floor).filter((c) => c.type === "area");
  const paths = new Set(res.views.map((v) => v.path));
  check("the floor lists its two areas", areaCards.length === 2);
  check("each one navigates somewhere that exists",
    areaCards.every((c) => paths.has(c.tap_action?.navigation_path)));
}

// 3. THE POINT: move a device and its entity follows on the next generate.
{
  const hass = makeHass();
  const before = await gen(hass);
  const inA = cardsOf(view(before, "area-room-a"))
    .some((c) => (c.entities ?? []).includes("sensor.fan_speed"));
  check("the fan sits in Room A1 to begin with", inA);

  hass.devices.dev_fan.area_id = "room_b";
  const after = await gen(hass);
  const stillA = cardsOf(view(after, "area-room-a"))
    .some((c) => (c.entities ?? []).includes("sensor.fan_speed"));
  const nowB = cardsOf(view(after, "area-room-b"))
    .some((c) => (c.entities ?? []).includes("sensor.fan_speed"));
  check("moving the device moves the card", nowB && !stillA,
    `room_a=${stillA} room_b=${nowB}`);
}

// 4. An entity's own area beats its device's.
{
  const hass = makeHass();
  hass.entities["sensor.fan_speed"].area_id = "plant";
  const res = await gen(hass);
  const inPlant = cardsOf(view(res, "area-plant"))
    .some((c) => (c.entities ?? []).includes("sensor.fan_speed"));
  check("an entity override wins over the device", inPlant);
}

// 5. Cameras: low stream on the card, full quality on tap, named once.
{
  const res = await gen(makeHass());
  const plant = view(res, "area-plant");
  const pics = cardsOf(plant).filter((c) => c.type === "picture-entity");
  check("one card per camera, not per stream", pics.length === 1,
    `${pics.length} cards`);
  const card = pics[0];
  check("the card shows the third stream",
    card?.entity?.endsWith("_s2"), card?.entity);
  check("tapping opens the first stream",
    card?.tap_action?.entity?.endsWith("_s0"), card?.tap_action?.entity);
  check("it is named from the recorder, not the token",
    card?.name === "Plant Room", card?.name);
  const lists = cardsOf(plant).filter((c) => c.type === "entities");
  const listed = lists.flatMap((c) => c.entities ?? []);
  check("camera streams are not also listed as entities",
    !listed.some((e) => e.startsWith("camera.")));
}

// 6. Hidden entities stay out of the lists but are still usable as streams.
{
  const res = await gen(makeHass());
  const listed = cardsOf(view(res, "area-room-a"))
    .filter((c) => c.type === "entities")
    .flatMap((c) => c.entities ?? []);
  check("a hidden entity is not listed", !listed.includes("sensor.hidden_one"));
  check("a visible one is", listed.includes("sensor.fan_speed"));
}

// 7. The area's name is the page title, not a card on the page.
{
  const res = await gen(makeHass());
  const roomA = view(res, "area-room-a");
  check("the page is titled with the area name",
    roomA.title === "Room A1", roomA.title);
  const cards = cardsOf(roomA);
  check("there is no area card", !cards.some((c) => c.type === "area"));
  check("and no heading repeating the name",
    !cards.some((c) => c.type === "heading" && c.heading === "Room A1"));
  check("the content sections are still there",
    cards.some((c) => c.type === "entities"));
}

// 7b. An empty area says so rather than being a blank page.
{
  const res = await gen(makeHass());
  const spare = view(res, "area-nowhere");
  check("an empty area has one section", spare.sections.length === 1,
    `${spare.sections.length} sections`);
  const cards = cardsOf(spare);
  check("holding a note, not an area card",
    cards.length === 1 && cards[0].type === "markdown",
    JSON.stringify(cards.map((c) => c.type)));
  check("that names the area and says what to do",
    /Spare/.test(cards[0].content) && /assigned/i.test(cards[0].content));
}

// 7c. Used as a view strategy, it still titles the top bar.
{
  const hass = makeHass();
  const out = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "plant" }, hass);
  check("a single-area view carries the area name",
    out.title === "Plant", out.title);
  check("and returns sections", Array.isArray(out.sections));
  const cards = (out.sections ?? []).flatMap((x) => x.cards ?? []);
  check("with no area card either", !cards.some((c) => c.type === "area"));
}

// 8. A core with no floors still works, and says why.
{
  const hass = makeHass({ floors: {} });
  const res = await gen(hass);
  check("every area falls under one tab", !!view(res, "no-floor"));
  const notes = view(res, "notes");
  check("and the reason is on a Notes page",
    !!notes && JSON.stringify(notes.cards).includes("No floors are set up"));
}

// 9. Bridge cards land in their own area and are not duplicated below.
{
  const hass = makeHass({
    services: { niagara: { generate_cards: {} } },
    callService: async () => ({
      response: {
        cards: [{ device: "AHU1", area_id: "room_a", card: { type: "custom:x" } }],
      },
    }),
  });
  const res = await gen(hass);
  const roomA = view(res, "area-room-a");
  const equip = sectionNamed(roomA, "Equipment");
  check("the bridge card is in Equipment", !!equip && equip.cards.length === 2);
  const listed = cardsOf(roomA).filter((c) => c.type === "entities")
    .flatMap((c) => c.entities ?? []);
  check("and that device's entities are not listed again",
    !listed.includes("sensor.fan_speed"), listed.join(","));
}

// 10. The layout is configurable, because a strategy cannot be rearranged
// by hand and pages that cannot be widened or reordered are not much use.
{
  const hass = makeHass();
  const plain = await gen(hass);
  check("four columns by default",
    view(plain, "area-plant").max_columns === 4);
  check("and the default order is equipment, cameras, else",
    JSON.stringify((view(plain, "area-plant").sections ?? [])
      .map((s) => s.cards?.[0]?.heading)) ===
      JSON.stringify(["Cameras", "Everything else"]));

  const narrow = await gen(hass, { layout: { max_columns: 2 } });
  check("max_columns is honoured",
    view(narrow, "area-plant").max_columns === 2);

  const clamped = await gen(hass, { layout: { max_columns: 99 } });
  check("and clamped to what Home Assistant allows",
    view(clamped, "area-plant").max_columns === 4,
    String(view(clamped, "area-plant").max_columns));

  const wide = await gen(hass, { layout: { span: { cameras: 2 } } });
  const cams = (view(wide, "area-plant").sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Cameras");
  check("a section can be widened", cams?.column_span === 2,
    JSON.stringify(cams?.column_span));
  const others = (view(wide, "area-plant").sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Everything else");
  check("and one not asked for carries no span",
    others?.column_span === undefined);

  const flipped = await gen(hass, { layout: { order: ["other", "cameras"] } });
  check("sections come back in the order asked for",
    JSON.stringify((view(flipped, "area-plant").sections ?? [])
      .map((s) => s.cards?.[0]?.heading)) ===
      JSON.stringify(["Everything else", "Cameras"]));

  const only = await gen(hass, { layout: { order: ["cameras"] } });
  check("a section left out of the order is left out",
    (view(only, "area-plant").sections ?? []).length === 1);

  const junk = await gen(hass, { layout: { order: ["nonsense"] } });
  check("an unknown section name falls back to all of them",
    (view(junk, "area-plant").sections ?? []).length === 2);
}

// 11. Card order inside a section can be reversed.
{
  const hass = makeHass();
  const forward = await gen(hass);
  const back = await gen(hass, { layout: { sort: "reverse" } });
  const names = (res) => (view(res, "area-room-a").sections ?? [])
    .flatMap((s) => (s.cards ?? []).filter((c) => c.type === "entities"))
    .map((c) => c.title);
  check("reverse flips the cards in a section",
    JSON.stringify(names(back)) ===
      JSON.stringify([...names(forward)].reverse()),
    JSON.stringify(names(back)));
  check("the heading stays at the top",
    (view(back, "area-room-a").sections ?? [])[0].cards[0].type === "heading");
}

// 12. The view strategy takes the same layout.
{
  const hass = makeHass();
  const out = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "plant", layout: { max_columns: 1,
                                         span: { cameras: 3 } } }, hass);
  check("a single-area view honours max_columns", out.max_columns === 1,
    String(out.max_columns));
  const cams = (out.sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Cameras");
  check("and the span", cams?.column_span === 3,
    JSON.stringify(cams?.column_span));
}

// 13. Rooms in number order, three to a row: suites stacked, missing
// rooms shown, the corridor rows and gaps no longer shaping the grid,
// equipment that is not a room not lost.
{
  const unit = (device) => ({ device, area_id: "plant",
                              card: { type: "custom:x", name: device } });
  const hass = makeHass({
    services: { daikin_dbacs: { generate_cards: {} } },
    callService: async () => ({ response: { cards: [
      unit("Room 104 ACU A-16"), unit("Room 103 ACU A-15"),
      unit("Room 101 Living ACU A-14a"), unit("Room 101 Bed ACU A-14"),
      unit("Room 1010 ACU A-99"),       // not 101: the number must end
      unit("Room 99 ACU A-00"),         // numbers, not text: 99 first
      unit("Hall ACU A-C1"),            // not a room at all
    ] } }),
  });
  const out = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "plant", rooms: [[104, 103], [null, "101"], [122]] },
              hass);
  const equip = (out.sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Equipment");
  const grid = equip?.cards?.[1];
  check("the rooms are one grid, three to a row",
    grid?.type === "custom:room-grid-card" && grid.columns === 3
      && grid.min_width > 0,
    JSON.stringify(grid && { type: grid.type, columns: grid.columns }));
  const cells = grid?.cells ?? [];
  const label = (c) => c?.name ?? c?.heading ?? c?.cards?.[0]?.name ?? String(c);
  check("in room-number order, no gaps",
    JSON.stringify(cells.map(label)) === JSON.stringify([
      "Room 99 ACU A-00", "Room 101 Bed ACU A-14", "Room 103 ACU A-15",
      "Room 104 ACU A-16", "Room 122", "Room 1010 ACU A-99"]),
    JSON.stringify(cells.map(label)));
  check("a suite's two units share a cell, bed first",
    cells[1]?.type === "vertical-stack" && cells[1]?.cards?.length === 2
      && cells[1].cards[1].name === "Room 101 Living ACU A-14a",
    JSON.stringify(cells[1]?.type));
  check("a room with nothing on it shows its number",
    cells[4]?.heading === "Room 122");
  const after = (equip?.cards ?? []).slice(2).map((c) => c.name);
  check("equipment that is not a room follows the grid",
    JSON.stringify(after) === JSON.stringify(["Hall ACU A-C1"]),
    JSON.stringify(after));
  check("the room grid takes the whole page width",
    equip?.column_span === 4, JSON.stringify(equip?.column_span));

  const plain = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "plant" }, hass);
  const flat = (plain.sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Equipment");
  check("without rooms the page is as it was",
    flat?.cards?.length === 8 && flat.column_span === undefined,
    String(flat?.cards?.length));
}

// 14. The room grid keeps panels readable: three where they fit, then
// two, then one, in the same order.
{
  const Grid = customElements.get("room-grid-card");
  check("the strategy bundle registers the room grid", !!Grid);
  const made = [];
  window.loadCardHelpers = async () => ({
    createCardElement: (config) => {
      const el = document.createElement("div");
      el.dataset.name = config.name;
      made.push(config);
      return el;
    },
  });
  const grid = new Grid();
  let width = 1200;
  Object.defineProperty(grid, "clientWidth", { get: () => width });
  grid.setConfig({ type: "custom:room-grid-card", columns: 3, min_width: 340,
    cells: [{ name: "101" }, { name: "103" }, { name: "104" }] });
  document.body.appendChild(grid);
  await new Promise((r) => setTimeout(r, 0));
  const inner = grid.shadowRoot.querySelector(".grid");
  grid.hass = { marker: 1 };
  check("every room becomes a card", made.length === 3, String(made.length));
  check("hass reaches the cards",
    [...inner.children].every((c) => c.hass?.marker === 1));
  const cols = () => inner.style.gridTemplateColumns;
  check("desk: three columns", cols() === "repeat(3, minmax(0, 1fr))", cols());

  width = 3 * 340 + 2 * 8 - 1;       // one pixel short of three
  grid.connectedCallback();
  check("tablet: two columns", cols() === "repeat(2, minmax(0, 1fr))", cols());

  width = 2 * 340 + 8;               // exactly enough for two
  grid.connectedCallback();
  check("two as soon as two fit", cols() === "repeat(2, minmax(0, 1fr))", cols());

  width = 470;                       // a phone
  grid.connectedCallback();
  check("phone: one to a row", cols() === "repeat(1, minmax(0, 1fr))", cols());

  let refused = false;
  try { new Grid().setConfig({ type: "custom:room-grid-card" }); }
  catch { refused = true; }
  check("a config with no cells is refused, not drawn blank", refused);
}

// 15. An area's AC controller sits above its units, with or without a
// rooms grid, and its entity is not listed again under Everything else.
{
  const unit = (device) => ({ device, area_id: "plant",
                              card: { type: "custom:x", name: device } });
  const controller = { device: "Plant — all 2 units", area_id: "plant",
    card: { type: "custom:hvac-controller-card", name: "controller",
            climate: "climate.plant_ac" } };
  const hass = makeHass({
    services: { daikin_dbacs: { generate_cards: {} },
                area_climate: { generate_cards: {} } },
    callService: async (domain) => ({ response: { cards:
      domain === "area_climate" ? [controller]
        : [unit("Room 102 ACU A-02"), unit("Room 101 ACU A-01"), unit("AHU")] } }),
  });
  hass.entities["climate.plant_ac"] = { entity_id: "climate.plant_ac", area_id: "plant" };
  const equipOf = (out) => (out.sections ?? [])
    .find((s) => s.cards?.[0]?.heading === "Equipment")?.cards ?? [];
  const View = customElements.get("ll-strategy-view-site-floors");

  for (const [label, config] of [
    ["no grid", { area: "plant" }],
    ["reversed", { area: "plant", layout: { sort: "reverse" } }],
    ["rooms grid", { area: "plant", rooms: [[101, 102]] }],
  ]) {
    const out = await View.generate(config, hass);
    const equip = equipOf(out);
    check(`${label}: the area controller comes first`,
      equip[1]?.name === "controller", JSON.stringify(equip[1]?.name ?? equip[1]?.type));
    check(`${label}: and only once`,
      equip.filter((c) => c.name === "controller").length === 1);
    const listed = JSON.stringify(out.sections ?? []);
    check(`${label}: its entity is not listed again`,
      !listed.includes('"climate.plant_ac"') || listed.split('"climate.plant_ac"').length === 2);
  }
}

// 16. An area's lights are one card, with one switch for them all, and
// are not listed again device by device.
{
  const hass = makeHass();
  hass.devices.dev_l1 = { id: "dev_l1", name: "Downlights", area_id: "room_a" };
  hass.devices.dev_l2 = { id: "dev_l2", name: "Pendants", area_id: "room_a" };
  hass.entities["light.pendants"] = { entity_id: "light.pendants", device_id: "dev_l2" };
  hass.entities["light.downlights"] = { entity_id: "light.downlights", device_id: "dev_l1" };
  hass.states["light.pendants"] = { attributes: { friendly_name: "Room 2 Pendants" } };
  hass.states["light.downlights"] = { attributes: { friendly_name: "Room 1 Downlights" } };
  const out = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "room_a" }, hass);
  const lights = sectionNamed(out, "Lights");
  const card = lights?.cards?.[1];
  check("one Lights section with one card",
    card?.type === "entities" && lights.cards.length === 2);
  check("every light on it, by name, with a switch for all",
    JSON.stringify(card?.entities) === JSON.stringify(["light.downlights", "light.pendants"])
      && card?.show_header_toggle === true, JSON.stringify(card));
  const other = JSON.stringify(sectionNamed(out, "Everything else") ?? {});
  check("not listed again under Everything else", !other.includes("light."), other);
  const names = (out.sections ?? []).map((s) => s.cards?.[0]?.heading);
  check("after the equipment, before everything else",
    names.indexOf("Lights") < names.indexOf("Everything else"), names.join(" / "));
  const none = await customElements.get("ll-strategy-view-site-floors")
    .generate({ area: "plant" }, makeHass());
  check("an area with no lights has no Lights section",
    !sectionNamed(none, "Lights"));
}

console.log(failures ? `\n${failures} failed` : "\nall strategy checks passed");
process.exit(failures ? 1 : 0);
