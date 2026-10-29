/**
 * What the dashboard strategies share: the bridge round-trip and the
 * shapes it returns.
 *
 * Split out when a second strategy needed the same `collect()`. Keeping
 * one copy matters because every bridge that gains a card service has to
 * be added here exactly once.
 *
 * The original header, which describes how a strategy is used:
 *
 * A dashboard that builds itself from the bridges, grouped by area.
 *
 * Home Assistant's own device page cannot host a custom card — it is
 * assembled by the frontend from the entity registry and has no slot an
 * integration can fill. A strategy is the supported way to get generated
 * cards onto a real page, and it has the advantage that a device typed in
 * the add-on appears here without anyone editing YAML.
 *
 *   views:
 *     - strategy:
 *         type: custom:bridge-devices
 *         area: b3_loading_bay      # optional
 *
 * or as a whole dashboard:
 *
 *   strategy:
 *     type: custom:bridge-devices
 */

export interface StrategyConfig {
  area?: string;
  /** Which bridges to include. Default: all that are set up. */
  bridges?: string[];
  /** Cards per view before an area is split across pages. Default 24. */
  max_per_view?: number;
  /**
   * Draw every card this strategy generates with one faceplate.
   *
   * Bulk restyling without touching a device or a mapping file: a
   * dashboard says how it wants its equipment drawn and the bridges
   * oblige. Only passed to bridges whose generate_cards accepts it, so
   * adding it here cannot break a bridge that does not.
   *
   * A per-device choice still wins — a bridge that knows one unit should
   * be drawn differently keeps drawing it differently.
   */
  faceplate?: string;
}

export interface HassLike {
  areas?: Record<string, { area_id?: string; name?: string; floor_id?: string | null; icon?: string | null }>;
  /** Present from the floors release onwards; absent on older cores. */
  floors?: Record<string, unknown>;
  devices?: Record<string, unknown>;
  /** The display registry: enabled entities only, which is what is wanted. */
  entities?: Record<string, unknown>;
  states?: Record<string, unknown>;
  services: Record<string, Record<string, unknown>>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: unknown,
    notifyOnError?: boolean,
    returnResponse?: boolean
  ): Promise<{ response?: unknown }>;
}

export interface GeneratedCard {
  device: string;
  area_id?: string;
  card: Record<string, unknown>;
  /** A controller for the whole area rather than one device: drawn first. */
  group?: boolean;
}

export const NOTE = (text: string) => ({ type: "markdown", content: text });

/** Call a service that returns a response, or null if it is not there. */
async function ask(
  hass: HassLike,
  domain: string,
  service: string,
  data: Record<string, unknown> = {}
): Promise<Record<string, unknown> | null> {
  if (!hass.services?.[domain]?.[service]) return null;
  try {
    const result = await hass.callService(
      domain, service, data, undefined, false, true
    );
    return (result?.response ?? null) as Record<string, unknown> | null;
  } catch (err) {
    // A bridge with nothing exposed raises rather than returning an empty
    // list. That is not a reason to fail the whole dashboard.
    return null;
  }
}

export async function collect(hass: HassLike, config: StrategyConfig) {
  const wanted = config.bridges;
  const include = (name: string) => !wanted || wanted.includes(name);
  const cards: GeneratedCard[] = [];
  const problems: string[] = [];

  if (include("niagara")) {
    const out = await ask(hass, "niagara", "generate_cards",
      config.area ? { area: config.area } : {});
    if (out) {
      cards.push(...((out.cards ?? []) as GeneratedCard[]));
      const skipped = (out.skipped ?? []) as string[];
      if (skipped.length) {
        problems.push(
          `${skipped.length} Niagara device(s) have no card yet — their ` +
          `points are bound but not enabled: ${skipped.slice(0, 6).join(", ")}`
        );
      }
    }
  }

  // One controller per area with two or more air conditioners, from the
  // area_climate integration. Marked as a group so the area's page puts it
  // above the units it controls.
  if (include("area_climate")) {
    const args: Record<string, unknown> = {};
    if (config.area) args.area = config.area;
    const out = await ask(hass, "area_climate", "generate_cards", args);
    if (out) {
      cards.push(...((out.cards ?? []) as GeneratedCard[])
        .map((entry) => ({ ...entry, group: true })));
    }
  }

  // The Daikin gateway is per-device like Niagara: one indoor unit, one
  // card. Its units are named from a site mapping file, so a unit with no
  // name yet is reported rather than drawn anonymously.
  if (include("daikin_dbacs")) {
    const args: Record<string, unknown> = {};
    if (config.area) args.area = config.area;
    if (config.faceplate) args.faceplate = config.faceplate;
    const out = await ask(hass, "daikin_dbacs", "generate_cards", args);
    if (out) {
      // Each unit's panel gets its history underneath: what it was set to,
      // what the room did, when the compressor ran. Closed until opened,
      // so a floor of panels does not ask the recorder for anything.
      cards.push(...((out.cards ?? []) as GeneratedCard[]).map((entry) =>
        entry.card?.climate
          ? { ...entry, card: { type: "vertical-stack", cards: [
              entry.card,
              { type: "custom:ac-history-card", climate: entry.card.climate },
              { type: "custom:ac-mapping-card", climate: entry.card.climate },
            ] } }
          : entry));
      const skipped = (out.skipped ?? []) as string[];
      if (skipped.length) {
        problems.push(
          `${skipped.length} Daikin indoor unit(s) have no card yet: ` +
          `${skipped.slice(0, 6).join(", ")}`
        );
      }
    }
  }

  // The AV bridges produce one card each rather than one per device, so
  // they have no area of their own and sit in an Audio/AV view.
  if (include("qsys_bridge")) {
    const out = await ask(hass, "qsys_bridge", "generate_zone_card");
    if (out?.card) {
      cards.push({ device: "Audio zones", card: out.card as Record<string, unknown> });
      const omitted = (out.omitted_zones ?? []) as string[];
      if (omitted.length) {
        problems.push(
          `${omitted.length} Q-SYS zone(s) did not fit on the rack: ` +
          omitted.join(", ")
        );
      }
    }
  }

  if (include("crestron_cip")) {
    const out = await ask(hass, "crestron_cip", "generate_room_card");
    if (out?.card) {
      cards.push({ device: "AV room", card: out.card as Record<string, unknown> });
    }
  }

  return { cards, problems };
}

/** Area controllers first, then devices by name. */
export function byDevice(a: GeneratedCard, b: GeneratedCard): number {
  if (Boolean(a.group) !== Boolean(b.group)) return a.group ? -1 : 1;
  return a.device.localeCompare(b.device);
}

export function areaName(hass: HassLike, areaId: string): string {
  return hass.areas?.[areaId]?.name ?? areaId;
}

export function byArea(hass: HassLike, cards: GeneratedCard[]) {
  const groups = new Map<string, GeneratedCard[]>();
  for (const entry of cards) {
    const key = entry.area_id || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }
  for (const entries of groups.values()) {
    entries.sort(byDevice);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    // Unplaced last: it is a to-do list, not a room.
    if (!a) return 1;
    if (!b) return -1;
    return areaName(hass, a).localeCompare(areaName(hass, b));
  });
}

