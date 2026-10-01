/**
 * Working out what a card should actually draw.
 *
 * A faceplate declares everything the equipment could have. Most
 * installations have some of it — a BGM zone with no EQ, a fan with no
 * filter sensor, a panel that exports two of its six status signals. By
 * default the card leaves out what has nothing behind it.
 *
 * This reverses the rule the plan originally set, which was that unbound
 * regions stay dark so a half-configured card looks half-configured.
 * That honesty is kept a different way: the card reports how many
 * controls it hid, so "clean" never quietly means "not wired up".
 *
 * Two passes are needed, because the roles a parametric faceplate names
 * depend on its options, and what is bound depends on the roles. The
 * first pass asks for everything and is used only to collect the role
 * list; the second builds the faceplate the viewer sees.
 */

import { resolveFaceplate } from "../faceplates/index";
import { DERIVED_ROLES, resolveRoles } from "./bind";
import { Faceplate, FaceplateCardConfig, HomeAssistant, Region } from "./types";

export interface Prepared {
  faceplate: Faceplate;
  /** role → entity id */
  bindings: Record<string, string>;
  /** Roles the faceplate declares, after any expansion. */
  roles: string[];
  /** How many controls were left out for having nothing bound. */
  hidden: number;
}

/**
 * Actions whose `target` names a role. The paging actions also use
 * `target`, but theirs is the name of a page — treating it as a role
 * hides every page button on a multi-page meter.
 */
const ACTS_ON_ROLE = new Set([
  "mute_toggle", "power_toggle", "level_up", "level_down",
  "set_level", "source_cycle",
]);

/** Whether a region is still worth drawing. */
function keep(
  region: Region,
  bound: (role: string) => boolean,
  groupAlive: (group: string) => boolean,
): boolean {
  if (region.group) return groupAlive(region.group);
  if (region.role) return bound(region.role);
  // A button acts on a role even though it displays none.
  if (region.target && region.action && ACTS_ON_ROLE.has(region.action)) {
    return bound(region.target);
  }
  return true;
}

export function prepare(
  hass: HomeAssistant,
  config: FaceplateCardConfig,
  base: Faceplate,
  deviceEntities: string[],
  expandRoles: (roles: string[]) => string[] = (r) => r,
): Prepared {
  const options = config.options ?? {};

  // Pass one: everything, purely to learn the roles.
  const full = resolveFaceplate(base, options, {
    bound: () => true,
    filtering: false,
  });
  const roles = expandRoles(
    [...new Set(full.regions.map((r) => r.role))].filter(Boolean)
  );
  const bindings = resolveRoles(hass, roles, config.entities ?? {}, deviceEntities);

  // A derived role has no entity of its own — an average is bound when
  // every phase it is averaged from is bound.
  const bound = (role: string): boolean => {
    if (bindings[role]) return true;
    const parts = DERIVED_ROLES[role];
    return Boolean(parts?.length && parts.every((part) => bindings[part]));
  };

  if (config.hide_unbound === false) {
    return { faceplate: full, bindings, roles, hidden: 0 };
  }

  // Pass two: only what is connected. A parametric faceplate can drop
  // whole sections and resize; the rest is filtered region by region.
  const trimmed = resolveFaceplate(base, options, { bound, filtering: true });

  const alive = new Set<string>();
  for (const region of trimmed.regions) {
    if (region.group && region.role && bound(region.role)) alive.add(region.group);
  }
  const groupAlive = (group: string) => alive.has(group);

  const regions = trimmed.regions.filter((r) => keep(r, bound, groupAlive));

  // Counted by control, not by region: a slider, its label and its
  // read-out are one thing to a reader, and reporting nine of them as
  // nine hidden controls turns a useful note into noise.
  const dropped = new Set<string>();
  let loose = 0;
  for (const region of trimmed.regions) {
    if (keep(region, bound, groupAlive)) continue;
    if (region.group) dropped.add(region.group);
    else loose += 1;
  }
  const hidden = dropped.size + loose;

  return {
    faceplate: { ...trimmed, regions },
    bindings,
    roles,
    hidden,
  };
}

/** The line a card prints when it has left something out. */
export function hiddenNote(hidden: number): string {
  return hidden === 1
    ? "1 control hidden — nothing bound to it."
    : `${hidden} controls hidden — nothing bound to them.`;
}
