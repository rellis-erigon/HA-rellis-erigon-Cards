/**
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

interface StrategyConfig {
  area?: string;
  /** Which bridges to include. Default: all that are set up. */
  bridges?: string[];
  /** Cards per view before an area is split across pages. Default 24. */
  max_per_view?: number;
}

interface HassLike {
  areas?: Record<string, { area_id?: string; name?: string }>;
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

interface GeneratedCard {
  device: string;
  area_id?: string;
  card: Record<string, unknown>;
}

const NOTE = (text: string) => ({ type: "markdown", content: text });

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

async function collect(hass: HassLike, config: StrategyConfig) {
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

function areaName(hass: HassLike, areaId: string): string {
  return hass.areas?.[areaId]?.name ?? areaId;
}

function byArea(hass: HassLike, cards: GeneratedCard[]) {
  const groups = new Map<string, GeneratedCard[]>();
  for (const entry of cards) {
    const key = entry.area_id || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(entry);
  }
  for (const entries of groups.values()) {
    entries.sort((a, b) => a.device.localeCompare(b.device));
  }
  return [...groups.entries()].sort(([a], [b]) => {
    // Unplaced last: it is a to-do list, not a room.
    if (!a) return 1;
    if (!b) return -1;
    return areaName(hass, a).localeCompare(areaName(hass, b));
  });
}

class BridgeDevicesViewStrategy extends HTMLElement {
  static async generate(config: StrategyConfig, hass: HassLike) {
    const { cards, problems } = await collect(hass, config);
    if (!cards.length) {
      return {
        cards: [NOTE(
          "### Nothing to show yet\n" +
          "No bridge returned a card. Type and publish a device in the " +
          "Niagara add-on, or expose controls in the Q-SYS or Crestron " +
          "add-ons, and this view fills itself."
        )],
      };
    }
    return {
      cards: [
        ...problems.map((p) => NOTE(p)),
        ...cards.map((entry) => entry.card),
      ],
    };
  }
}

class BridgeDevicesDashboardStrategy extends HTMLElement {
  static async generate(config: StrategyConfig, hass: HassLike) {
    const { cards, problems } = await collect(hass, config);
    const views: Record<string, unknown>[] = [];

    // A station exported with a shallow area depth puts nearly everything
    // in one area — here that is 195 switchboards. One view of 195 cards
    // is not a page anyone can use, so an oversized area is paged.
    const perView = Math.max(1, Number(config.max_per_view ?? 24));

    for (const [areaId, entries] of byArea(hass, cards)) {
      const title = areaId ? areaName(hass, areaId) : "Unplaced";
      const path = areaId || "unplaced";
      if (entries.length <= perView) {
        views.push({ title, path, cards: entries.map((e) => e.card) });
        continue;
      }
      const pages = Math.ceil(entries.length / perView);
      for (let page = 0; page < pages; page++) {
        const slice = entries.slice(page * perView, (page + 1) * perView);
        views.push({
          title: `${title} ${page + 1}/${pages}`,
          path: `${path}-${page + 1}`,
          cards: slice.map((e) => e.card),
        });
      }
    }

    if (!views.length) {
      views.push({
        title: "Nothing yet",
        path: "empty",
        cards: [NOTE(
          "### Nothing to show yet\n" +
          "No bridge returned a card. Type and publish a device in the " +
          "Niagara add-on, or expose controls in the Q-SYS or Crestron " +
          "add-ons, and this dashboard fills itself."
        )],
      });
    } else if (problems.length) {
      views.push({
        title: "Notes",
        path: "notes",
        icon: "mdi:alert-circle-outline",
        cards: problems.map((p) => NOTE(p)),
      });
    }

    return { title: "Bridge Devices", views };
  }
}

customElements.define("ll-strategy-view-bridge-devices", BridgeDevicesViewStrategy);
customElements.define(
  "ll-strategy-dashboard-bridge-devices", BridgeDevicesDashboardStrategy
);
