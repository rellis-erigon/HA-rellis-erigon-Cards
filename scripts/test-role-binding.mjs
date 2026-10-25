/**
 * The HVAC role vocabulary has to be shared, and it has to be exact.
 *
 * The same equipment reaches Home Assistant by more than one road on a real
 * estate: a Daikin fan coil arrives as BACnet objects through the D-BACS
 * gateway, as oBIX points through Niagara, and sometimes as joins through a
 * Crestron processor. A card should not care which, so every spelling the
 * bridges produce is listed against one role name.
 *
 * Two things are checked, and the second matters more:
 *
 *  1. each bridge's spelling binds to the role it means;
 *  2. it binds to *nothing else*.
 *
 * A loose pattern here is the single most repeated bug in this workspace —
 * the card still renders, it just shows the wrong number, which is worse
 * than showing none. Anything matching two roles fails this test.
 */
import { readFileSync } from "node:fs";
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

// Pull the patterns straight out of the source, so the test cannot drift
// from the table it is testing.
const source = readFileSync("src/core/bind.ts", "utf8");
const block = source.slice(
  source.indexOf("const ROLE_PATTERNS"),
  source.indexOf("const UNAVAILABLE"),
);
const PATTERNS = {};
for (const [, role, body, flags] of block.matchAll(
  /^\s*([a-z_0-9]+):\s*\/(.+?)\/([a-z]*),$/gm,
)) {
  PATTERNS[role] = new RegExp(body, flags);
}
check("patterns parsed out of the source", Object.keys(PATTERNS).length > 30,
  `${Object.keys(PATTERNS).length} found`);

/** Every role an entity id matches. */
function rolesFor(id) {
  return Object.entries(PATTERNS)
    .filter(([, pattern]) => pattern.test(id))
    .map(([role]) => role);
}

// What each bridge actually names its entities, taken from the live
// integrations rather than invented. The D-BACS names are what the Daikin
// gateway integration produces; the compressed ones are Daikin's own object
// names arriving untouched through a BMS.
const CASES = [
  // --- D-BACS, named for people ---
  ["sensor.dbacs_1_1_00_room_temperature", "room_temp"],
  ["sensor.dbacs_1_1_00_setpoint", "setpoint"],
  ["sensor.dbacs_1_1_00_mode", "hvac_mode"],
  ["sensor.dbacs_1_1_00_fan_speed", "fan_speed"],
  ["sensor.dbacs_1_1_00_air_direction", "swing"],
  ["sensor.dbacs_1_1_00_malfunction_code", "fault_code"],
  ["binary_sensor.dbacs_1_1_00_running", "run"],
  ["binary_sensor.dbacs_1_1_00_alarm", "fault"],
  ["binary_sensor.dbacs_1_1_00_filter", "filter"],
  ["binary_sensor.dbacs_1_1_00_thermostat", "hvac_action"],
  ["binary_sensor.dbacs_1_1_00_compressor", "compressor"],
  ["binary_sensor.dbacs_1_1_00_indoor_fan", "fan_running"],
  ["binary_sensor.dbacs_1_1_00_heater", "heater"],
  ["binary_sensor.dbacs_1_1_00_communication", "comms"],
  ["binary_sensor.dbacs_1_1_00_energy_saving", "energy_saving"],
  ["binary_sensor.dbacs_1_1_00_forced_thermostat_off", "thermo_off"],

  // --- the same Daikin unit through a BMS, object names untouched ---
  ["sensor.fcu_12_roomtemp", "room_temp"],
  ["sensor.fcu_12_tempadjust", "setpoint"],
  ["sensor.fcu_12_airconmodestatus", "hvac_mode"],
  ["sensor.fcu_12_airflowratestatus", "fan_speed"],
  ["sensor.fcu_12_malfunctioncode", "fault_code"],
  ["binary_sensor.fcu_12_startstopstatus", "run"],
  ["binary_sensor.fcu_12_filtersign", "filter"],
  ["binary_sensor.fcu_12_thermostatus", "hvac_action"],
  ["binary_sensor.fcu_12_compressorstatus", "compressor"],
  ["binary_sensor.fcu_12_indoorfanstatus", "fan_running"],
  ["binary_sensor.fcu_12_heaterstatus", "heater"],
  ["binary_sensor.fcu_12_communicationstatus", "comms"],
  ["binary_sensor.fcu_12_energyefficiencystatus", "energy_saving"],

  // --- generic BMS points, which is what an AHU or a third-party FCU gives ---
  ["sensor.ahu_1_supply_air_temperature", "supply_air_temp"],
  ["sensor.ahu_1_return_air_temperature", "return_air_temp"],
  ["sensor.ahu_1_outside_air_temperature", "outside_air_temp"],
  ["sensor.ahu_1_humidity", "humidity"],
  ["sensor.ahu_1_co2", "co2"],
  ["sensor.ahu_1_valve_position", "valve_position"],
  ["sensor.ahu_1_damper_position", "damper_position"],
  ["sensor.ahu_1_filter_dp", "filter_dp"],

  // The D-BACS points that no faceplate drew until the Daikin faces were
  // extended. The accumulator is the awkward one: it is called power and
  // measures energy.
  ["sensor.dbacs_1_1_00_accumulated_power", "energy_total"],
  ["sensor.dbacs_1_1_00_accumulated_gas", "gas_total"],
  ["binary_sensor.dbacs_1_1_00_wall_controller_power", "lock_power"],
  ["binary_sensor.dbacs_1_1_00_wall_controller_mode", "lock_mode"],
  ["binary_sensor.dbacs_1_1_00_wall_controller_setpoint", "lock_setpoint"],
  ["binary_sensor.dbacs_1_1_00_reject_sub_group_control", "central_rejected"],
  ["binary_sensor.dbacs_1_1_00_forced_stop", "forced_off"],
  ["sensor.dbacs_1_1_00_ventilation_mode", "ventilation_mode"],
  ["sensor.dbacs_1_1_00_ventilation_amount", "ventilation_amount"],
  ["binary_sensor.office_occupancy", "occupancy"],
  ["sensor.room_12_space_temperature", "room_temp"],
  ["sensor.room_12_cooling_setpoint", "setpoint_cool"],
  ["sensor.room_12_heating_setpoint", "setpoint_heat"],
  ["sensor.room_12_setpoint_adjust", "setpoint_adjust"],
];

console.log("\neach bridge's spelling binds to the role it means");
for (const [id, role] of CASES) {
  const found = rolesFor(id);
  check(`${id} -> ${role}`, found.includes(role), `matched ${found.join(", ") || "nothing"}`);
}

// Roles that deliberately mean the same point under two names, because the
// faceplate families call it different things: a meter's common fault is an
// air conditioner's alarm. A faceplate declares one or the other, never
// both, so the overlap is not ambiguity.
const SYNONYMS = { fault: ["alarm"], alarm: ["fault"] };

console.log("\nand to nothing else");
for (const [id, role] of CASES) {
  const found = rolesFor(id);
  const allowed = new Set([role, ...(SYNONYMS[role] ?? [])]);
  const extra = found.filter((r) => !allowed.has(r));
  check(
    `${id} is only ${role}`,
    extra.length === 0,
    `also matched ${extra.join(", ")}`,
  );
}

console.log("\npoints that must not bind to an HVAC role at all");
// Each of these looked bindable to an earlier version of this table.
const NEGATIVE = [
  "sensor.db_l3_ke_power_3phase_active_power",
  "sensor.water_meter_main_cubicmetre",
  "sensor.pump_1_speed",
  "binary_sensor.fip_zone_3",
  "sensor.boiler_flow_rate",
];
const HVAC_ROLES = new Set([
  "run", "fault", "fault_code", "hvac_mode", "hvac_action", "room_temp",
  "setpoint", "setpoint_adjust", "setpoint_cool", "setpoint_heat",
  "fan_speed", "fan_running", "swing", "filter", "compressor", "heater",
  "comms", "energy_saving", "thermo_off", "forced_off", "supply_air_temp",
  "return_air_temp", "outside_air_temp", "humidity", "humidity_setpoint",
  "co2", "valve_position", "damper_position", "occupancy",
]);
for (const id of NEGATIVE) {
  const found = rolesFor(id).filter((r) => HVAC_ROLES.has(r));
  check(`${id} binds no HVAC role`, found.length === 0, `matched ${found.join(", ")}`);
}

console.log("\nthe slot table and the pattern table agree");
const slotBlock = source.slice(
  source.indexOf("export const ROLE_SLOTS"),
  source.indexOf("const ROLE_PATTERNS"),
);
const slotRoles = new Set(
  [...slotBlock.matchAll(/^\s*([a-z_0-9]+):\s*\[/gm)].map((m) => m[1]),
);
for (const role of HVAC_ROLES) {
  check(`${role} is in both tables`,
    slotRoles.has(role) && role in PATTERNS,
    `slots: ${slotRoles.has(role)}, patterns: ${role in PATTERNS}`);
}

// -- and the whole point, end to end -------------------------------------
//
// A card pointed at a device, with no `entities:` block at all, has to bind
// every role the faceplate draws. This is what "the point names work for
// all integrations" means in practice: one dashboard line per unit, no
// mapping, whichever bridge the unit arrived through.

await import("../dist/hvac-controller-card.js");
const Card = customElements.get("hvac-controller-card");

/** A device whose entities are named the way one bridge names them. */
function deviceWith(points, deviceName) {
  const states = {};
  const entities = {};
  for (const [id, value] of Object.entries(points)) {
    states[id] = {
      entity_id: id,
      state: String(value),
      attributes: { friendly_name: id },
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
  card.setConfig({ type: "custom:hvac-controller-card", ...config });
  card.hass = hass;
  document.body.appendChild(card);
  await new Promise((r) => setTimeout(r, 120));
  const root = card.shadowRoot ?? card;
  return root.querySelector("svg");
}

const BRIDGES = {
  "D-BACS": {
    "sensor.dbacs_1_1_00_room_temperature": "21.6",
    "sensor.dbacs_1_1_00_setpoint": "22.0",
    "sensor.dbacs_1_1_00_mode": "Heat",
    "sensor.dbacs_1_1_00_fan_speed": "High",
    "binary_sensor.dbacs_1_1_00_running": "on",
    "binary_sensor.dbacs_1_1_00_alarm": "off",
  },
  "a BMS carrying the same unit": {
    "sensor.fcu_12_roomtemp": "21.6",
    "sensor.fcu_12_tempadjust": "22.0",
    "sensor.fcu_12_airconmodestatus": "Heat",
    "sensor.fcu_12_airflowratestatus": "High",
    "binary_sensor.fcu_12_startstopstatus": "on",
    "binary_sensor.fcu_12_alarm": "off",
  },
};

for (const [bridge, points] of Object.entries(BRIDGES)) {
  console.log(`\nthrough ${bridge}, from the device alone`);
  const svg = await mount(
    { faceplate: "fcu-unit", device: "Unit", hide_unbound: false },
    deviceWith(points, "Unit"),
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  check("the room temperature binds", texts.some((t) => t.includes("21.6")),
    texts.join(" | "));
  check("the setpoint binds", texts.some((t) => t.includes("22")),
    texts.join(" | "));
  check("the mode binds", texts.some((t) => /heat/i.test(t)),
    texts.join(" | "));
  check("the fan speed binds", texts.some((t) => /high/i.test(t)),
    texts.join(" | "));
}

// -- the full-status faceplate draws the extended vocabulary -------------
//
// fcu-unit shows four things because it is built to tile. indoor-unit is
// the one that has to draw everything a gateway publishes, so it is the
// test of whether the extended roles reach a drawing at all.

{
  const points = {
    "sensor.dbacs_1_1_00_room_temperature": "21.6",
    "sensor.dbacs_1_1_00_setpoint": "22.0",
    "sensor.dbacs_1_1_00_mode": "Heat",
    "sensor.dbacs_1_1_00_fan_speed": "High",
    "sensor.dbacs_1_1_00_air_direction": "Swing",
    "sensor.dbacs_1_1_00_malfunction_code": "E5",
    "binary_sensor.dbacs_1_1_00_running": "on",
    "binary_sensor.dbacs_1_1_00_alarm": "on",
    "binary_sensor.dbacs_1_1_00_filter": "off",
    "binary_sensor.dbacs_1_1_00_compressor": "on",
    "binary_sensor.dbacs_1_1_00_indoor_fan": "on",
    "binary_sensor.dbacs_1_1_00_heater": "off",
    "binary_sensor.dbacs_1_1_00_communication": "off",
    "binary_sensor.dbacs_1_1_00_energy_saving": "off",
    "binary_sensor.dbacs_1_1_00_forced_thermostat_off": "off",
    "binary_sensor.dbacs_1_1_00_thermostat": "on",
  };
  console.log("\nindoor-unit, from the device alone");
  const svg = await mount(
    { faceplate: "indoor-unit", device: "Unit", hide_unbound: false },
    deviceWith(points, "Unit"),
  );
  const texts = [...svg.querySelectorAll("text")].map((t) =>
    t.textContent.trim(),
  );
  const shown = texts.join(" | ");
  for (const [what, probe] of [
    ["the room temperature", "21.6"],
    ["the setpoint", "22"],
    ["the mode", /heat/i],
    ["the fan speed", /high/i],
    ["the air direction", /swing/i],
    ["the manufacturer's fault code", "E5"],
  ]) {
    const hit = typeof probe === "string"
      ? texts.some((t) => t.includes(probe))
      : texts.some((t) => probe.test(t));
    check(`${what} binds`, hit, shown);
  }
  // Nine lamps, and they have to be lamps rather than text: a lamp is how
  // "the compressor is running" reads at a glance.
  const lamps = svg.querySelectorAll("circle, rect");
  check("the lamps are drawn", lamps.length >= 9, `${lamps.length} shapes`);
  for (const label of ["RUN", "ALARM", "FILTER", "COMP", "FAN", "HEATER",
                       "COMMS", "ECO", "T-OFF"]) {
    check(`the ${label} lamp is labelled`,
      texts.some((t) => t === label), shown);
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
