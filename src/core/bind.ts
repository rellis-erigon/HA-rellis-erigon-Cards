/**
 * Resolving roles to entities.
 *
 * A region names a role; this decides which entity fills it. Three ways, in
 * order of authority: what the user configured, what a Niagara device
 * template already named its slots, and finally a guess from device class.
 */

import { HassEntity, HomeAssistant, Reading } from "./types";

/**
 * Roles the faceplates use, and the slot keys they correspond to in the
 * Niagara templates. Slot keys come first because a typed device has
 * already had a person confirm them.
 *
 * This is the shared vocabulary. The same equipment reaches Home Assistant
 * by more than one road on a real estate — a Daikin fan coil arrives as
 * BACnet objects through the D-BACS gateway, as oBIX points through
 * Niagara, and sometimes as joins through a Crestron processor — and a card
 * should not care which. So a role is named for what the point *means*, and
 * every spelling the bridges produce for it is listed against that one name
 * rather than mapped per integration.
 */
export const ROLE_SLOTS: Record<string, string[]> = {
  energy_total: ["energy_total", "energy", "energy_generated"],
  power_total: ["power_total", "power"],
  power_l1: ["power_l1"],
  power_l2: ["power_l2"],
  power_l3: ["power_l3"],
  volts_l1: ["volts_l1", "voltage_l1"],
  volts_l2: ["volts_l2", "voltage_l2"],
  volts_l3: ["volts_l3", "voltage_l3"],
  current_l1: ["current_l1"],
  current_l2: ["current_l2"],
  current_l3: ["current_l3"],
  power_factor: ["power_factor"],
  frequency: ["frequency"],
  volume_total: ["volume_total", "water_total", "volume"],
  bypass_total: ["bypass_total"],
  flow_rate: ["flow_rate", "flow"],
  battery: ["battery"],
  alarm: ["alarm", "common_fault", "fault"],
  reverse_flow: ["reverse_flow", "reverse"],

  // --- HVAC, shared across every bridge -----------------------------------
  run: ["run_status", "run", "on_off_status", "running", "command"],
  fault: ["alarm", "fault", "common_fault"],
  fault_code: ["malfunction_code", "fault_code", "error_code"],
  hvac_mode: ["mode", "mode_status", "hvac_mode", "operation_mode"],
  hvac_action: ["thermo_status", "thermostat", "hvac_action"],
  room_temp: ["room_temperature", "room_temp", "space_temperature"],
  setpoint: ["setpoint", "set_temperature"],
  setpoint_adjust: ["temp_adjust", "setpoint_adjust", "temp_offset"],
  setpoint_cool: ["cooling_setpoint", "setpoint_cool"],
  setpoint_heat: ["heating_setpoint", "setpoint_heat"],
  fan_speed: ["fan_speed", "fan_status", "airflow_rate"],
  fan_running: ["indoor_fan", "fan_running", "supply_fan_status"],
  swing: ["air_direction", "swing", "vane", "louvre"],
  filter: ["filter", "filter_sign", "filter_alarm"],
  filter_dp: ["filter_dp", "filter_differential_pressure"],
  //: The button that clears a filter sign, as opposed to `filter`, which is
  //: the sign itself. A unit has both and they are not interchangeable.
  filter_reset: ["reset_filter_sign", "filter_reset", "reset_filter"],
  //: A D-BACS gateway publishes an accumulator per indoor unit. `power` in
  //: its name, kilowatt-hours in its value — it belongs with energy_total,
  //: not with the instantaneous power roles.
  gas_total: ["accumulated_gas", "gas_total"],
  //: Whether the wall controller has been locked out, per function. A hotel
  //: room is normally locked and a plant room is not, so this is worth
  //: drawing rather than inferring.
  lock_power: ["remote_lock_on_off", "wall_controller_power", "lock_power"],
  lock_mode: ["remote_lock_mode", "wall_controller_mode", "lock_mode"],
  lock_setpoint: [
    "remote_lock_setpoint", "wall_controller_setpoint", "lock_setpoint",
  ],
  //: The gateway refusing sub-group control, which is the reason a write
  //: can be accepted and do nothing.
  central_rejected: [
    "central_control_rejection", "reject_sub_group_control",
  ],
  ventilation_mode: ["ventilation_mode"],
  ventilation_amount: ["ventilation_amount"],
  compressor: ["compressor", "compressor_status"],
  heater: ["heater", "heater_status"],
  comms: ["communication", "communication_status", "comms"],
  energy_saving: ["energy_saving", "eco", "setback"],
  thermo_off: ["forced_thermostat_off", "thermo_off"],
  forced_off: ["forced_stop", "system_forced_off", "forced_off"],
  supply_air_temp: ["supply_air_temp", "supply_air_temperature"],
  return_air_temp: ["return_air_temp", "return_air_temperature"],
  outside_air_temp: ["outside_air_temp", "ambient_temperature"],
  humidity: ["humidity", "relative_humidity"],
  humidity_setpoint: ["humidity_setpoint"],
  co2: ["co2", "carbon_dioxide"],
  valve_position: ["valve_position", "valve"],
  damper_position: ["damper_position", "damper"],
  occupancy: ["occupancy", "occupied"],
};

/**
 * Last-resort matching on the entity id, for entities that were never typed
 * against a template. Deliberately anchored: a loose pattern here binds the
 * wrong point, which is the single most repeated bug in this workspace.
 */
const ROLE_PATTERNS: Record<string, RegExp> = {
  energy_total: /metertotal$|_energy_total$|_kwh_total$|_accumulated_power$/,
  power_total: /3phase_active_power$|_active_power$|_power_total$/,
  power_l1: /active_power_p1$/,
  power_l2: /active_power_p2$/,
  power_l3: /active_power_p3$/,
  volts_l1: /phase_1_v$|_l1_n$|_voltage_l1$/,
  volts_l2: /phase_2_v$|_l2_n$|_voltage_l2$/,
  volts_l3: /phase_3_v$|_l3_n$|_voltage_l3$/,
  current_l1: /phase_1_a$|_current_l1$/,
  current_l2: /phase_2_a$|_current_l2$/,
  current_l3: /phase_3_a$|_current_l3$/,
  power_factor: /power_factor$/,
  frequency: /frequency$/,
  // Cumulative volume. Anchored to totals: a daily or weekly register is
  // not a lifetime total and must never be bound as one.
  volume_total: /_cubicmetre$|_volume_total$|_water_total$|watermeter_total$/,
  // A second register on a compound body, not a share of the first.
  bypass_total: /_bypass_total$|_bypass_cubicmetre$/,
  // Rate, never a total: a register bound here would climb forever and
  // read as a flow that never stops.
  flow_rate: /_flow_rate$|_flowrate$|_l_min$|_l_s$|_m3_h$/,
  battery: /_battery$|_battery_level$|_batt$/,
  alarm: /_alarm$|_common_fault$/,
  reverse_flow: /_reverse_flow$|_reverse$/,

  // --- HVAC ---------------------------------------------------------------
  //
  // Two spellings run through all of these. The generic one is what a
  // bridge names a point when it is naming it for people
  // (`_room_temperature`), and the compressed one is the manufacturer's own
  // object name arriving untouched through a BMS (`_roomtemp`,
  // `_startstopstatus`). The same Daikin unit produces both depending on
  // which bridge it came through, so both are matched against the one role.
  run: /_running$|_run_status$|_on_off_status$|_startstopstatus$/,
  fault: /_alarm$|_fault$|_common_fault$/,
  fault_code: /_malfunction_code$|_malfunctioncode$|_fault_code$|_error_code$/,
  // Not a wall-controller lock and not a ventilation mode: both end in
  // `_mode` and would otherwise be read as the unit's operating mode,
  // which is the kind of mis-binding that shows a wrong number rather
  // than no number.
  hvac_mode:
    /(?<!controller)(?<!ventilation)_mode$|_mode_status$|_operation_mode$|_airconmodestatus$/,
  // The thermostat is what says whether a unit is calling for anything, as
  // opposed to merely switched on.
  hvac_action: /_thermostat$|_thermo_status$|_thermostatus$|_hvac_action$/,
  room_temp: /_room_temperature$|_room_temp$|_roomtemp$|_space_temp(erature)?$/,
  // `_tempadjust` is Daikin's own name for the absolute room setpoint. On
  // some controllers the same word means a plus-or-minus offset from a base
  // setpoint instead, which is why setpoint_adjust exists as its own role —
  // binding an offset where a setpoint belongs shows 2 °C in a room.
  // Negative lookbehind, because a dual-setpoint controller publishes
  // `cooling_setpoint` and `heating_setpoint` alongside nothing called just
  // "setpoint", and binding one of those as *the* setpoint shows a room
  // being held at a temperature it is not being held at.
  setpoint:
    /(?<!cooling|heating|cool|heat|humidity|rh|controller)_setpoint$|_set_temperature$|_set_temp$|_stpt$|_tempadjust$/,
  setpoint_adjust: /_setpoint_adjust$|_temp_adjust$|_temp_offset$/,
  setpoint_cool: /_cooling_setpoint$|_setpoint_cool$|_cool_setpoint$/,
  setpoint_heat: /_heating_setpoint$|_setpoint_heat$|_heat_setpoint$/,
  // Speed, not whether the fan is turning: fan_running is that.
  fan_speed: /_fan_speed$|_fan_status$|_fanstatus$|_airflowrate(status)?$/,
  fan_running: /_indoor_fan$|_indoorfanstatus$|_fan_running$|_supply_fan$/,
  swing: /_air_direction$|_airdirection(status)?$|_swing(_mode)?$|_vane$|_louvre$/,
  // The sign itself, not the button that clears it: `_reset_filter_sign`
  // ends with `_filter_sign` and would otherwise bind here, leaving the
  // filter_reset role empty and the FILTER CLEAN key inert.
  filter: /(?<!reset)_filter$|(?<!reset)_filter_sign$|_filtersign$|_filter_alarm$|_filter_dirty$/,
  filter_dp: /_filter_dp$|_filter_differential_pressure$/,
  filter_reset: /_reset_filter_sign$|_filter_reset$|_reset_filter$/,
  gas_total: /_accumulated_gas$|_gas_total$/,
  lock_power: /_wall_controller_power$|_remote_lock_on_off$|_lock_power$/,
  lock_mode: /_wall_controller_mode$|_remote_lock_mode$|_lock_mode$/,
  lock_setpoint:
    /_wall_controller_setpoint$|_remote_lock_setpoint$|_lock_setpoint$/,
  central_rejected:
    /_reject_sub_group_control$|_central_control_rejection$/,
  ventilation_mode: /_ventilation_mode$/,
  ventilation_amount: /_ventilation_amount$/,
  compressor: /_compressor$|_compressorstatus$/,
  heater: /_heater$|_heaterstatus$/,
  comms: /_communication$|_communicationstatus$|_comms$|_offline$/,
  energy_saving: /_energy_saving$|_energyefficiencystatus$|_eco$|_setback$/,
  thermo_off: /_forced_thermostat_off$|_forcedthermooffstatus$/,
  forced_off: /_forced_stop$|_systemforcedoff$|_forced_off$/,
  supply_air_temp: /_supply_air_temp(erature)?$|_discharge_air_temp$|_sat$/,
  return_air_temp: /_return_air_temp(erature)?$|_rat$/,
  outside_air_temp: /_outside_air_temp(erature)?$|_ambient_temp(erature)?$|_oat$/,
  humidity: /_humidity$|_relative_humidity$|_rh$/,
  humidity_setpoint: /_humidity_setpoint$|_rh_setpoint$/,
  co2: /_co2$|_carbon_dioxide$|_co2_level$/,
  valve_position: /_valve_position$|_valve$|_vlv_pos$/,
  damper_position: /_damper_position$|_damper$|_dmp_pos$/,
  occupancy: /_occupancy$|_occupied$/,
};

const UNAVAILABLE = new Set(["unavailable", "unknown", "none", ""]);

/**
 * Roles a meter displays but rarely publishes as a point of its own. A real
 * PM2200 summary page shows average volts and amps; BMS boards almost always
 * expose the three phases and nothing else, so these are derived rather than
 * left blank.
 */
export const DERIVED_ROLES: Record<string, string[]> = {
  volts_avg: ["volts_l1", "volts_l2", "volts_l3"],
  current_avg: ["current_l1", "current_l2", "current_l3"],
};

/**
 * The entity ids belonging to a device, for `device:` in a card config.
 *
 * Takes an id or the name shown in Home Assistant, because a device id is
 * a 32-character hash that nobody wants to type or read back later.
 *
 * Only entities that currently have a state are returned. The registry
 * also lists disabled ones, and binding a role to an entity that will
 * never report is worse than leaving the region dark — it looks bound.
 */
export function deviceEntityIds(hass: HomeAssistant, device: string): string[] {
  const registry = hass.entities ?? {};
  const deviceId = resolveDeviceId(hass, device);

  const ids = Object.values(registry)
    .filter((entry) => entry.device_id === deviceId)
    .map((entry) => entry.entity_id)
    .filter((id) => hass.states[id] !== undefined)
    .sort();
  if (ids.length) return ids;

  // Last resort: treat the value as a fragment of the entity ids. Older
  // frontends do not expose the registry, and a card that silently binds
  // nothing is harder to diagnose than one that guesses from the name.
  return Object.keys(hass.states).filter((id) => id.includes(device)).sort();
}

/** A device's registry id, from its id or the name shown in Home Assistant. */
export function resolveDeviceId(hass: HomeAssistant, device: string): string {
  const devices = hass.devices ?? {};
  if (devices[device]) return device;
  const wanted = device.trim().toLowerCase();
  const match = Object.entries(devices).find(
    ([, d]) =>
      (d.name_by_user ?? "").trim().toLowerCase() === wanted ||
      (d.name ?? "").trim().toLowerCase() === wanted
  );
  return match ? match[0] : device;
}

/**
 * The Crestron CIP config entry behind a device, or undefined.
 *
 * A card pointed at a processor this way can send the panel's own joins,
 * which is what makes it behave like the XPanel rather than like a set
 * of Home Assistant entities: the panel's volume up is a press of a
 * digital join that the program ramps, not a write of a level.
 */
export function cipEntryOf(hass: HomeAssistant, device: string): string | undefined {
  const deviceId = resolveDeviceId(hass, device);
  const ours = Object.values(hass.entities ?? {}).some(
    (entry) => entry.device_id === deviceId && entry.platform === "crestron_cip",
  );
  if (!ours) return undefined;
  return hass.devices?.[deviceId]?.config_entries?.[0];
}

/**
 * What a device is called in Home Assistant.
 *
 * A card pointed at a device should not also have to be told its name.
 * The user's own rename wins, as it does everywhere else in HA.
 */
export function deviceDisplayName(
  hass: HomeAssistant, device: string,
): string | undefined {
  const devices = hass.devices ?? {};
  const entry =
    devices[device] ??
    Object.values(devices).find((d) => {
      const wanted = device.trim().toLowerCase();
      return (
        (d.name_by_user ?? "").trim().toLowerCase() === wanted ||
        (d.name ?? "").trim().toLowerCase() === wanted
      );
    });
  const name = entry?.name_by_user || entry?.name;
  return name ?? undefined;
}

/**
 * Which bus a generated role sits on.
 *
 * Faceplates generated from a Crestron project name their roles after the
 * join behind them — `button_101`, `level_211`, `text_1` — because the role
 * is what the card editor shows whoever is binding entities. The bus has to
 * be recoverable from the name, so the prefix carries it. This mirrors
 * ROLE_SIGNAL in the add-on's panel_apply.py; the two have to agree.
 */
const ROLE_BUS: Record<string, string> = {
  button: "d",
  lamp: "d",
  level: "a",
  fader: "a",
  text: "s",
};

/**
 * Which Home Assistant domain a named control should land in.
 *
 * A level has to be settable or the strip is an ornament, so a sensor
 * carrying the same name is not a match.
 */
const DOMAIN_FOR_CONTROL: Record<string, string[]> = {
  level: ["number", "input_number"],
  mute: ["switch", "input_boolean"],
};

/** The role word at the end of a control's name, and the name without it. */
const CONTROL_WORDS: Record<string, string> = {
  gain: "level",
  level: "level",
  volume: "level",
  vol: "level",
  mute: "mute",
};

function controlBase(name: string): string {
  const flat = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const word of Object.keys(CONTROL_WORDS)) {
    if (flat.endsWith(word)) return flat.slice(0, -word.length);
  }
  return flat;
}

/**
 * The entity a named control became, or "".
 *
 * A bridge names its entities after the control, but the role word
 * differs between the two — a DSP calls it gain where Home Assistant
 * calls it volume — so the base is matched and the domain settles the
 * rest. The closest remaining name wins, so `func1mic_volume` beats
 * `func1mic_volume_preset_2`.
 */
export function entityForControl(
  hass: HomeAssistant,
  control: string,
  kind: string,
  candidates: string[],
): string {
  const base = controlBase(control);
  if (!base) return "";
  const domains = DOMAIN_FOR_CONTROL[kind] ?? [];
  let best = "";
  let bestLength = Infinity;
  for (const id of candidates) {
    const [domain, objectId = ""] = id.split(".");
    if (domains.length && !domains.includes(domain)) continue;
    const flat = objectId.replace(/[^a-z0-9]/g, "");
    if (!flat.startsWith(base)) continue;
    if (flat.length < bestLength) {
      best = id;
      bestLength = flat.length;
    }
  }
  return best;
}

/** The join key a generated role refers to, or undefined if it names none. */
export function joinOfRole(role: string): string | undefined {
  // A join inside a SmartObject — a list item's — names its object:
  // `button_o1_4011` is digital 4011 of object 1, written "o1:d4011".
  const inObject = /^([a-z]+)_o(\d+)_(\d+)$/.exec(role);
  if (inObject) {
    const bus = ROLE_BUS[inObject[1]];
    if (!bus || Number(inObject[3]) < 1) return undefined;
    return `o${inObject[2]}:${bus}${inObject[3]}`;
  }
  const cut = role.lastIndexOf("_");
  if (cut <= 0) return undefined;
  const bus = ROLE_BUS[role.slice(0, cut)];
  const number = role.slice(cut + 1);
  // A role ending `_x7` is a control with no join at all — positional and
  // deliberately unbindable. Join 0 means "none" throughout Crestron's
  // tooling, never join zero.
  if (!bus || !/^\d+$/.test(number) || Number(number) < 1) return undefined;
  return `${bus}${number}`;
}

/** A join key split into its object (0 for none), bus and number. */
export function parseJoin(key: string): { obj: number; bus: string; join: number } | undefined {
  const match = /^(?:o(\d+):)?([das])(\d+)$/.exec(key);
  if (!match) return undefined;
  return { obj: Number(match[1] ?? 0), bus: match[2], join: Number(match[3]) };
}

/** Build the role → entity id map for a card. */
export function resolveRoles(
  hass: HomeAssistant,
  roles: string[],
  explicit: Record<string, string> = {},
  deviceEntities: string[] = [],
  /** role -> the control an import worked out sits behind it. */
  controls: Record<string, { control: string; kind: string }> = {}
): Record<string, string> {
  const map: Record<string, string> = {};

  for (const role of roles) {
    // 1. What the user said. Always wins, including when it is wrong —
    //    silently overriding an explicit choice is worse than showing it.
    if (explicit[role]) {
      map[role] = explicit[role];
      continue;
    }
    // 2. Anything in the device that matches the role by entity id.
    const candidates = deviceEntities.length
      ? deviceEntities
      : Object.keys(hass.states);
    const pattern = ROLE_PATTERNS[role];
    if (pattern) {
      const hit = candidates.find((id) => pattern.test(id));
      if (hit) {
        map[role] = hit;
        continue;
      }
    }
    // 3. A role generated from a panel project names the join it came
    //    from, and the CIP bridge publishes that join on every entity it
    //    creates. Matching on it is what lets an imported panel bind by
    //    pointing the card at the processor's device: 29 controls bind at
    //    once, and a join exposed later is picked up without anybody
    //    editing the dashboard.
    const join = joinOfRole(role);
    if (join) {
      const found = candidates.find(
        (id) => hass.states[id]?.attributes?.join === join
      );
      if (found) {
        map[role] = found;
        continue;
      }
    }
    // 4. What the processor's own program says is behind this control.
    //    Searched across everything rather than within the panel's
    //    device, because the thing a fader moves usually lives on
    //    another system entirely — the DSP, not the control processor.
    const hint = controls[role];
    if (!hint?.control) continue;
    const resolved = entityForControl(
      hass, hint.control, hint.kind, Object.keys(hass.states)
    );
    if (resolved) map[role] = resolved;
  }
  return map;
}

/** Turn a resolved entity into something a region can draw. */
export function read(
  hass: HomeAssistant,
  entityId: string | undefined
): Reading {
  if (!entityId) return { dark: true, stale: false };

  const entity: HassEntity | undefined = hass.states[entityId];
  if (!entity) return { entityId, dark: true, stale: false };

  const raw = String(entity.state);
  if (UNAVAILABLE.has(raw.toLowerCase())) {
    // Unavailable is not zero. A faceplate showing a confident number from
    // a dead point is the failure this whole stack exists to avoid.
    return { entityId, state: raw, dark: true, stale: true };
  }

  const value = Number(raw);
  return {
    entityId,
    state: raw,
    value: Number.isFinite(value) ? value : undefined,
    unit: entity.attributes.unit_of_measurement,
    dark: false,
    stale: false,
  };
}

/**
 * Read a role, deriving it from its components where the meter itself does
 * not publish one. A derived value is only produced when *every* component
 * is present and live — averaging two live phases and one dead one would
 * produce a plausible number that is wrong, which is the failure mode this
 * whole stack is built to avoid.
 */
export function readRole(
  hass: HomeAssistant,
  bindings: Record<string, string>,
  role: string
): Reading {
  if (bindings[role]) return read(hass, bindings[role]);

  // Several controllers show a clock, and nothing in Home Assistant is going
  // to supply one as an entity. Rendering "--" where a wall controller shows
  // the time makes a working card look broken.
  if (role === "clock") {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return { state: `${hh}:${mm}`, dark: false, stale: false };
  }

  const parts = DERIVED_ROLES[role];
  if (!parts) return { dark: true, stale: false };

  const readings = parts.map((part) => read(hass, bindings[part]));
  if (readings.some((r) => r.dark || r.value === undefined)) {
    return { dark: true, stale: readings.some((r) => r.stale) };
  }
  const total = readings.reduce((sum, r) => sum + (r.value ?? 0), 0);
  return {
    value: total / readings.length,
    state: String(total / readings.length),
    unit: readings[0].unit,
    dark: false,
    stale: false,
  };
}

/** Format a reading the way a meter display would. */
export function format(reading: Reading, decimals = 1, unit?: string): string {
  if (reading.dark) return "--";
  if (reading.value === undefined) return reading.state ?? "--";
  const shown = reading.value.toFixed(decimals);
  const suffix = unit ?? reading.unit ?? "";
  return suffix ? `${shown} ${suffix}` : shown;
}


/**
 * Roles read from a single `climate` entity's attributes.
 *
 * A Daikin controller may reach Home Assistant two ways: as a climate
 * entity from a vendor integration, or as a handful of BMS points through
 * Niagara. The card supports both, because which one a site has is not
 * something the card can know.
 */
export function readClimate(
  hass: HomeAssistant,
  entityId: string,
  role: string
): Reading {
  const entity = hass.states[entityId];
  if (!entity) return { entityId, dark: true, stale: false };
  if (UNAVAILABLE.has(String(entity.state).toLowerCase())) {
    return { entityId, state: entity.state, dark: true, stale: true };
  }

  const attr = entity.attributes as Record<string, unknown>;
  const pick = (value: unknown, unit?: string): Reading => {
    if (value === undefined || value === null) return { entityId, dark: true, stale: false };
    const num = Number(value);
    return {
      entityId,
      state: String(value),
      value: Number.isFinite(num) ? num : undefined,
      unit,
      dark: false,
      stale: false,
    };
  };

  // Home Assistant's states are lower-case identifiers; a panel shows words.
  const word = (value: unknown) =>
    typeof value === "string" && value
      ? (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, " ")
      : value;

  switch (role) {
    case "hvac_mode":
      return pick(word(entity.state));
    case "hvac_action":
      return pick(word(attr.hvac_action ?? entity.state));
    case "setpoint":
      return pick(attr.temperature, "\u00b0C");
    case "room_temp":
      return pick(attr.current_temperature, "\u00b0C");
    case "fan_speed":
      return pick(word(attr.fan_mode));
    case "swing":
      return pick(word(attr.swing_mode));
    case "power":
      return pick(entity.state === "off" ? "off" : "on");
    case "humidity":
      return pick(attr.current_humidity, "%");
    default:
      return { entityId, dark: true, stale: false };
  }
}
