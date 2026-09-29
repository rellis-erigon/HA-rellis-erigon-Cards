/**
 * The write half of a faceplate: what a button on one actually does.
 *
 * Read-only cards resolve roles and stop there. A zone strip and a room
 * panel both have to act, and they act on the same three things — a
 * toggle, and a level that steps up or down — so the behaviour lives here
 * rather than once per card, where the two would drift.
 *
 * A button names the *role* it acts on, never an entity. The same strip is
 * drawn once per zone and only the role differs.
 */

import { deviceDisplayName } from "./bind";
import type { FaceplateCardConfig, HomeAssistant, Region } from "./types";

export const DEFAULT_STEP = 1;

/** Told to the user when an action cannot be carried out. */
export type Notify = (message: string) => void;

export async function runControlAction(
  hass: HomeAssistant,
  entities: Record<string, string> | undefined,
  region: Region,
  notify: Notify,
  step: number = DEFAULT_STEP,
  /** Where on a fader the click landed, in the region's own scale. */
  at?: number,
): Promise<void> {
  const entity = region.target ? entities?.[region.target] : undefined;
  if (!entity) {
    notify(`Nothing is bound to ${region.target ?? "this control"}.`);
    return;
  }

  const state = hass.states[entity];
  if (!state) {
    notify(`${entity} does not exist.`);
    return;
  }

  if (region.action === "source_cycle") {
    const domain = entity.split(".")[0];
    if (domain !== "select" && domain !== "input_select") {
      notify(`${entity} is a ${domain}; it has no source list to step.`);
      return;
    }
    await hass.callService(domain, "select_next", {
      entity_id: entity,
      cycle: true,
    });
    return;
  }

  if (region.action === "mute_toggle" || region.action === "power_toggle") {
    const domain = entity.split(".")[0];
    if (domain === "sensor" || domain === "binary_sensor") {
      // A BMS or CIP bridge may expose a read-only copy of a state. Saying
      // so beats a service call that fails somewhere the user cannot see.
      notify(`${entity} is read-only — it reports state but cannot be set.`);
      return;
    }
    // homeassistant.toggle rather than switch.toggle: the same role is a
    // switch on one bridge and an input_boolean or light on another.
    await hass.callService("homeassistant", "toggle", { entity_id: entity });
    return;
  }

  const current = Number(state.state);
  if (!Number.isFinite(current)) {
    notify(`${entity} has no numeric level to change.`);
    return;
  }
  const min = Number(state.attributes.min ?? -Infinity);
  const max = Number(state.attributes.max ?? Infinity);

  let next: number;
  if (region.action === "set_level") {
    if (at === undefined || !Number.isFinite(at)) return;
    // The entity's own staging wins over the drawing's scale: a fader
    // drawn -80..+10 must not drive a block staged -100..0 off its end.
    next = Math.min(max, Math.max(min, at));
    // Respect the entity's step so the value is one it can actually take.
    const grid = Number(state.attributes.step);
    if (Number.isFinite(grid) && grid > 0) {
      next = Math.round(next / grid) * grid;
    }
    next = Math.round(next * 100) / 100;
  } else {
    const size = Number(step) || DEFAULT_STEP;
    const delta = region.action === "level_up" ? size : -size;
    next = Math.min(max, Math.max(min, current + delta));
    if (next === current) {
      notify(`${entity} is already at its ${delta > 0 ? "maximum" : "minimum"}.`);
      return;
    }
  }
  if (next === current) return;

  const domain = entity.split(".")[0];
  if (domain !== "number" && domain !== "input_number") {
    notify(`${entity} is a ${domain}; its level cannot be set from here.`);
    return;
  }
  await hass.callService(domain, "set_value", {
    entity_id: entity,
    value: next,
  });
}

/**
 * Print operators' own names on a repeated faceplate.
 *
 * A faceplate that repeats a strip draws its label regions as `name1`,
 * `name2` and so on, and that numbering is the contract: a label belongs
 * to the nth thing, and there is no entity carrying a name.
 */
export function withLabels<T extends { regions: Region[] }>(
  faceplate: T,
  labels: Record<string, string> | undefined,
  prefix: string,
): T {
  if (!labels) return faceplate;
  return {
    ...faceplate,
    regions: faceplate.regions.map((region) => {
      const match = /^name(\d+)$/.exec(region.id);
      const label = match ? labels[`${prefix}${match[1]}`] : undefined;
      return label ? { ...region, text: label } : region;
    }),
  };
}

/**
 * Print the device's name on the faceplate itself.
 *
 * A faceplate opts in by declaring a region with the id `device_name`,
 * positioned where the real equipment carries its label — the engraved
 * strip on a meter, the room name on a controller's screen. Where a
 * faceplate does that, the card drops its own heading so the name is not
 * shown twice.
 */
export function withDeviceName<T extends { regions: Region[] }>(
  faceplate: T,
  name: string | undefined,
): T {
  if (!name) return faceplate;
  return {
    ...faceplate,
    regions: faceplate.regions.map((region) =>
      region.id === DEVICE_NAME ? { ...region, text: name } : region
    ),
  };
}

/** Whether this faceplate prints the name itself. */
export function drawsDeviceName(faceplate: { regions: Region[] }): boolean {
  return faceplate.regions.some((region) => region.id === DEVICE_NAME);
}

export const DEVICE_NAME = "device_name";

/**
 * The nameplate text for a card.
 *
 * An explicit title wins, then the older `name` spelling, and failing
 * both the name of the device the card is pointed at — a card told which
 * device it is should not have to be told what that device is called.
 */
export function cardTitle(
  hass: HomeAssistant | undefined,
  config: FaceplateCardConfig | undefined,
): string | undefined {
  if (!config) return undefined;
  const explicit = (config.title ?? config.name ?? "").trim();
  if (explicit) return explicit;
  if (hass && config.device) return deviceDisplayName(hass, config.device);
  return undefined;
}
