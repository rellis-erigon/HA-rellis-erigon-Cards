/**
 * The guest-room faceplate can change things, not just report them.
 *
 * `indoor-unit` was written as a status panel and had no keys at all, so a
 * guest room drawn with it could be read and not touched. These check the
 * six keys exist, that each sends what it should, and that the one which
 * is not a climate service — clearing the filter sign — presses the right
 * button and says something useful when there is no button to press.
 */
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) { if (k in globalThis) continue; try { globalThis[k] = w[k]; } catch {} }
globalThis.window = w; globalThis.document = w.document; globalThis.customElements = w.customElements;
for (const k of ["Event", "CustomEvent", "MouseEvent"]) globalThis[k] = w[k];
await import("../dist/all-cards.js?t=" + Date.now());
const { getFaceplate } = await import("../dist/faceplates-registry.mjs?t=" + Date.now());

let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
};

const CLIMATE = "climate.room_401";
const S = (v, a = {}) => ({ state: String(v), attributes: a });

function states(extra = {}) {
  return {
    [CLIMATE]: S("heat", {
      temperature: 22,
      current_temperature: 21.4,
      fan_mode: "Low",
      fan_modes: ["Low", "Middle", "High", "Auto"],
      hvac_modes: ["off", "heat", "cool", "fan_only"],
    }),
    "button.unit_reset_filter_sign": S("unknown"),
    "binary_sensor.unit_filter": S("off"),
    ...extra,
  };
}

async function mount(config, st) {
  const C = customElements.get("hvac-controller-card");
  const el = new C();
  el.setConfig({ type: "custom:hvac-controller-card",
                 faceplate: "indoor-unit", ...config });
  const calls = [];
  const notes = [];
  el.addEventListener("hass-notification", (e) => notes.push(e.detail.message));
  el.hass = {
    states: st,
    entities: Object.fromEntries(Object.keys(st).map(
      (id) => [id, { entity_id: id, device_id: "dev1" }])),
    devices: { dev1: { id: "dev1", name: "Room 101" } },
    callService: async (domain, service, data) => { calls.push({ domain, service, data }); },
  };
  document.body.appendChild(el);
  await new Promise((r) => setTimeout(r, 160));
  const root = el.shadowRoot ?? el;
  const press = async (label) => {
    const g = [...root.querySelectorAll("g.button")].find(
      (n) => n.querySelector("text")?.textContent?.trim() === label);
    if (!g) return false;
    g.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 60));
    return true;
  };
  return { el, root, calls, notes, press };
}

// 1. The faceplate declares four keys; mode and fan are drop-downs.
{
  const fp = getFaceplate("hvac-controller-card", "indoor-unit");
  const keys = fp.regions.filter((r) => r.kind === "button");
  const actions = keys.map((k) => k.action).sort();
  check("four control keys and a pager", keys.length === 5,
    `${keys.length} keys`);
  check("the actions are the ones the card implements",
    JSON.stringify(actions) === JSON.stringify(
      ["filter_reset", "next_page", "power_toggle", "temp_down", "temp_up"]),
    actions.join(","));
  check("mode and fan are not keys any more",
    !actions.includes("mode_cycle") && !actions.includes("fan_cycle"));
  check("every key has a visible label", keys.every((k) => k.text));
  check("and a touch target of at least 30px high",
    keys.every((k) => (k.h ?? 0) >= 30));
}

// 2. Setpoint, mode, fan and power each send the right service.
{
  const { calls, press } = await mount({ climate: CLIMATE }, states());
  check("SET + is there", await press("SET +"));
  check("it raises the setpoint by half a degree",
    calls[0]?.service === "set_temperature" && calls[0]?.data.temperature === 22.5,
    JSON.stringify(calls[0]?.data));

  await press("SET −");
  check("SET − lowers it", calls[1]?.data.temperature === 21.5,
    JSON.stringify(calls[1]?.data));

  await press("ON / OFF");
  check("ON / OFF turns a running unit off",
    calls[2]?.service === "turn_off", calls[2]?.service);
}

// 2b. Mode and fan are selects, offering what the unit reports.
{
  const { root, calls } = await mount(
    { climate: CLIMATE, device: "Room 101" }, states());
  const selects = [...root.querySelectorAll(".picks select")];
  check("two drop-downs", selects.length === 2, `${selects.length}`);

  const labels = [...root.querySelectorAll(".picks label span")]
    .map((n) => n.textContent.trim());
  check("labelled Mode and Fan",
    JSON.stringify(labels) === JSON.stringify(["Mode", "Fan"]),
    labels.join(","));

  const modeOpts = [...selects[0].querySelectorAll("option")]
    .map((o) => o.value);
  check("mode offers what the unit reports",
    JSON.stringify(modeOpts) === JSON.stringify(
      ["off", "heat", "cool", "fan_only"]), modeOpts.join(","));
  check("and shows the current one",
    selects[0].querySelector("option[selected]")?.value === "heat");

  const fanOpts = [...selects[1].querySelectorAll("option")].map((o) => o.value);
  check("fan offers all four speeds",
    JSON.stringify(fanOpts) === JSON.stringify(
      ["Low", "Middle", "High", "Auto"]), fanOpts.join(","));

  selects[0].value = "cool";
  selects[0].dispatchEvent(new w.Event("change", { bubbles: true }));
  await new Promise((r) => setTimeout(r, 60));
  check("picking a mode sets it directly, not by stepping",
    calls.at(-1)?.service === "set_hvac_mode"
      && calls.at(-1)?.data.hvac_mode === "cool",
    JSON.stringify(calls.at(-1)?.data));

  selects[1].value = "Auto";
  selects[1].dispatchEvent(new w.Event("change", { bubbles: true }));
  await new Promise((r) => setTimeout(r, 60));
  check("and a fan speed likewise",
    calls.at(-1)?.service === "set_fan_mode"
      && calls.at(-1)?.data.fan_mode === "Auto",
    JSON.stringify(calls.at(-1)?.data));
}

// 2c. A read-only unit gets no drop-downs to pretend with.
{
  const { root } = await mount(
    { entities: { room_temp: "sensor.r" } },
    { ...states(), "sensor.r": S(21) });
  check("no drop-downs without a climate entity",
    root.querySelectorAll(".picks select").length === 0);
}

// 3. FILTER presses the button, which is not a climate service.
{
  // A dirty filter, since a clean one is deliberately not written to.
  const { calls, notes, press } = await mount(
    { climate: CLIMATE, device: "Room 101" },
    states({ "binary_sensor.unit_filter": S("on") }));
  check("FILTER is there", await press("FILTER"));
  const call = calls.at(-1);
  check("it presses the unit's reset button",
    call?.domain === "button" && call?.service === "press"
      && call?.data.entity_id === "button.unit_reset_filter_sign",
    JSON.stringify(call));
  check("and says it has done it", notes.some((n) => /filter/i.test(n)),
    notes.join(" | "));
}

// 3b. A unit with no filter sign is told so, rather than "cleared".
{
  const st = states({ "binary_sensor.unit_filter": S("off") });
  const { calls, notes, press } = await mount(
    { climate: CLIMATE, device: "Room 101" }, st);
  await press("FILTER");
  check("a clean unit is not written to",
    !calls.some((c) => c.domain === "button"));
  check("and says there was nothing to clear",
    notes.some((n) => /nothing to clear/i.test(n)), notes.join(" | "));
}

// 3c. A dirty filter is cleared and reported as cleared.
{
  const st = states({ "binary_sensor.unit_filter": S("on") });
  const { calls, notes, press } = await mount(
    { climate: CLIMATE, device: "Room 101" }, st);
  await press("FILTER");
  check("a dirty unit is written to",
    calls.some((c) => c.domain === "button" && c.service === "press"));
  check("and reported cleared",
    notes.some((n) => /cleared/i.test(n)), notes.join(" | "));
}

// 4. With no reset button, it explains rather than doing nothing.
{
  const st = states();
  delete st["button.unit_reset_filter_sign"];
  const { calls, notes, press } = await mount(
    { climate: CLIMATE, device: "Room 101" }, st);
  await press("FILTER");
  check("no service is called", !calls.some((c) => c.domain === "button"));
  check("and the reason is shown",
    notes.some((n) => /filter-reset button/i.test(n)), notes.join(" | "));
}

// 5. A read-only unit keeps its keys and says why when pressed.
{
  const { calls, notes, press } = await mount(
    { entities: { room_temp: "sensor.r" } },
    { ...states(), "sensor.r": S(21) });
  check("the keys are still drawn", await press("SET +"));
  check("nothing is written", calls.length === 0);
  check("and it says it is read-only",
    notes.some((n) => /read-only/i.test(n)), notes.join(" | "));
}

// 6. The second page carries the points no face drew before.
{
  const fp = getFaceplate("hvac-controller-card", "indoor-unit");
  check("the faceplate has two pages",
    JSON.stringify(fp.pages) === JSON.stringify(["status", "more"]),
    JSON.stringify(fp.pages));

  const roles = new Set(fp.regions.map((r) => r.role).filter(Boolean));
  for (const role of ["energy_total", "gas_total", "ventilation_mode",
                      "ventilation_amount", "lock_power", "lock_mode",
                      "lock_setpoint", "central_rejected", "forced_off"]) {
    check(`it draws ${role}`, roles.has(role));
  }

  const onMore = fp.regions.filter((r) => r.page === "more");
  const onStatus = fp.regions.filter((r) => r.page === "status");
  check("the new points are on the second page", onMore.length >= 13,
    `${onMore.length} regions`);
  check("and the readings stay on the first", onStatus.length >= 16,
    `${onStatus.length} regions`);
  check("every reading is pinned to a page, or it draws on both",
    fp.regions.filter((r) => !r.page && r.kind === "text").length === 0);

  const pager = fp.regions.find((r) => r.action === "next_page");
  check("there is a key to reach it", Boolean(pager));
  check("and it is on both pages", pager && !pager.page);
}

// 7. Every point a D-BACS unit publishes now has a role.
{
  // The member labels the bridge turns into entity names, slugged.
  const points = [
    "running", "alarm", "malfunction_code", "mode", "fan_speed",
    "room_temperature", "setpoint", "filter", "reset_filter_sign",
    "communication", "air_direction", "forced_thermostat_off",
    "energy_saving", "thermostat", "compressor", "indoor_fan", "heater",
    "accumulated_power", "accumulated_gas", "ventilation_mode",
    "ventilation_amount", "wall_controller_power", "wall_controller_mode",
    "wall_controller_setpoint", "reject_sub_group_control", "forced_stop",
  ];
  const { ROLE_PATTERNS } = await import(
    "../dist/all-cards.js?t=" + Date.now()).then((m) => m).catch(() => ({}));
  // ROLE_PATTERNS is not exported from the bundle, so this checks the
  // faceplate instead: every point either maps to a role the face draws,
  // or is named here as one it deliberately does not.
  const drawn = new Set(
    getFaceplate("hvac-controller-card", "indoor-unit")
      .regions.map((r) => r.role).filter(Boolean));
  const viaClimate = new Set(["running", "mode", "setpoint", "fan_speed",
                              "room_temperature", "air_direction"]);
  const byRole = {
    running: "run", alarm: "fault", malfunction_code: "fault_code",
    mode: "hvac_mode", fan_speed: "fan_speed", room_temperature: "room_temp",
    setpoint: "setpoint", filter: "filter",
    reset_filter_sign: "filter_reset", communication: "comms",
    air_direction: "swing", forced_thermostat_off: "thermo_off",
    energy_saving: "energy_saving", thermostat: "hvac_action",
    compressor: "compressor", indoor_fan: "fan_running", heater: "heater",
    accumulated_power: "energy_total", accumulated_gas: "gas_total",
    ventilation_mode: "ventilation_mode",
    ventilation_amount: "ventilation_amount",
    wall_controller_power: "lock_power", wall_controller_mode: "lock_mode",
    wall_controller_setpoint: "lock_setpoint",
    reject_sub_group_control: "central_rejected", forced_stop: "forced_off",
  };
  const missing = points.filter((pt) => !drawn.has(byRole[pt]));
  check(`all ${points.length} published points are drawn`,
    missing.length === 0, missing.join(", "));
}

// 8. Turning the page shows the second set and writes nothing.
{
  const { root, calls, press } = await mount(
    { climate: CLIMATE, device: "Room 101" },
    states({ "sensor.unit_accumulated_power": S(1234, {
      unit_of_measurement: "kWh" }) }));

  const labels = () => [...root.querySelectorAll("text")]
    .map((t) => t.textContent.trim());
  check("the first page shows the readings", labels().includes("ROOM"));
  check("and not the second page's", !labels().includes("ENERGY"));

  check("there is a MORE key", await press("MORE \u203a"));
  check("turning the page writes nothing", calls.length === 0,
    JSON.stringify(calls));
  check("the second page shows its readings", labels().includes("ENERGY"),
    labels().slice(0, 8).join(","));
  check("and the first page's are gone", !labels().includes("ROOM"));
  check("the keys are still there", labels().includes("SET +"));

  await press("MORE \u203a");
  check("pressing again comes back", labels().includes("ROOM"));
}

// 9. A change is followed until the unit confirms it, and a refusal or a
// unit that never follows is said plainly.
{
  const settle = () => new Promise((r) => setTimeout(r, 60));
  const withState = (el, climate) => {
    el.hass = { ...el.hass, states: { ...el.hass.states, [CLIMATE]: climate } };
  };
  const base = states()[CLIMATE];
  const status = (root) => {
    const n = root.querySelector(".change");
    return n ? { phase: [...n.classList].find((c) => c !== "change"),
                 text: n.textContent.replace(/\s+/g, " ").trim() } : null;
  };

  // Any climate entity: confirmed when it shows what was asked.
  {
    const { el, root, notes, press } = await mount({ climate: CLIMATE }, states());
    await press("SET +");
    await settle();
    check("after a key, it says the change is waiting",
      status(root)?.phase === "waiting", JSON.stringify(status(root)));
    withState(el, { ...base, attributes: { ...base.attributes, temperature: 22.5 } });
    await settle();
    check("and confirms once the unit shows it",
      status(root)?.phase === "confirmed"
        && /Setpoint → 22\.5° confirmed/.test(status(root).text),
      JSON.stringify(status(root)));
    check("with a toast as well",
      notes.some((n) => /confirmed by the unit/.test(n)), notes.join(" | "));
  }

  // An integration that reports pending writes: not confirmed by its own echo.
  {
    const { el, root, press } = await mount({ climate: CLIMATE }, states());
    await press("SET +");
    withState(el, { ...base, attributes: { ...base.attributes, temperature: 22.5,
      pending_changes: [{ setting: "temperature", value: 22.5, state: "sent" }] } });
    await settle();
    check("a value shown before the unit read it back is not confirmed",
      status(root)?.phase === "waiting", JSON.stringify(status(root)));
    withState(el, { ...base, attributes: { ...base.attributes, temperature: 22,
      last_change: { setting: "temperature", value: 22.5, result: "not_confirmed",
                     reported: 22, at: new Date().toISOString() } } });
    await settle();
    check("a unit that never follows is reported, with what it shows",
      status(root)?.phase === "failed" && /still reports 22/.test(status(root).text),
      JSON.stringify(status(root)));
  }

  // A change the integration queued behind the write-rate guard.
  {
    const { el, root, press } = await mount({ climate: CLIMATE }, states());
    await press("SET +");
    withState(el, { ...base, attributes: { ...base.attributes,
      pending_changes: [{ setting: "temperature", value: 22.5, state: "held" }] } });
    await settle();
    check("a held change says it is queued",
      status(root)?.phase === "held" && /queued/.test(status(root).text),
      JSON.stringify(status(root)));
  }

  // A refused call.
  {
    const { el, root, press } = await mount({ climate: CLIMATE }, states());
    el.hass = { ...el.hass, callService: async () => {
      throw new Error("held at BACnet priority 8 by another client"); } };
    await press("ON / OFF");
    await settle();
    check("a refusal is shown with its reason",
      status(root)?.phase === "failed" && /not sent: held at BACnet priority 8/
        .test(status(root).text), JSON.stringify(status(root)));
  }
}

console.log(failures ? `\n${failures} failed` : "\nall control checks passed");
process.exit(failures ? 1 : 0);
