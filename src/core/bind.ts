/**
 * Resolving roles to entities.
 *
 * A region names a role; this decides which entity fills it. Three ways, in
 * order of authority: what the user configured, what a Niagara device
 * template already named its slots, and finally a guess from device class.
 */

import { HassEntity, HomeAssistant, Reading } from "./types";

/**
 * Roles the meter faceplates use, and the slot keys they correspond to in
 * the Niagara templates. Slot keys come first because a typed device has
 * already had a person confirm them.
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
};

/**
 * Last-resort matching on the entity id, for entities that were never typed
 * against a template. Deliberately anchored: a loose pattern here binds the
 * wrong point, which is the single most repeated bug in this workspace.
 */
const ROLE_PATTERNS: Record<string, RegExp> = {
  energy_total: /metertotal$|_energy_total$|_kwh_total$/,
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

/** Build the role → entity id map for a card. */
export function resolveRoles(
  hass: HomeAssistant,
  roles: string[],
  explicit: Record<string, string> = {},
  deviceEntities: string[] = []
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
    if (!pattern) continue;
    const hit = candidates.find((id) => pattern.test(id));
    if (hit) map[role] = hit;
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

  switch (role) {
    case "hvac_mode":
      return pick(entity.state);
    case "hvac_action":
      return pick(attr.hvac_action ?? entity.state);
    case "setpoint":
      return pick(attr.temperature, "\u00b0C");
    case "room_temp":
      return pick(attr.current_temperature, "\u00b0C");
    case "fan_speed":
      return pick(attr.fan_mode);
    case "swing":
      return pick(attr.swing_mode);
    case "power":
      return pick(entity.state === "off" ? "off" : "on");
    case "humidity":
      return pick(attr.current_humidity, "%");
    default:
      return { entityId, dark: true, stale: false };
  }
}
