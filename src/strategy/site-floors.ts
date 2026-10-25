/**
 * A dashboard that is the building: floors, then areas, then what is in them.
 *
 * Built because the same pages generated once as static cards go stale the
 * moment a device is moved. A strategy runs on every page load, so changing
 * an item's area in Home Assistant moves it on the next refresh and there
 * is nothing to regenerate.
 *
 *   strategy:
 *     type: custom:site-floors
 *
 * One view per floor listing its areas, and a subview per area holding:
 *
 *   the area      Home Assistant's own area card, for context and controls
 *   Equipment     whatever the bridges draw for that area
 *   Cameras       the low-quality stream on the card, the full one on tap
 *   Everything else  the remaining entities, grouped by their device
 *
 * An area page can also be given `rooms`, which lays its rooms' equipment
 * out in room-number order, three to a row. See `Rooms`.
 *
 * Sections that would be empty are left out, so an area with nothing in it
 * is one card rather than three empty headings.
 */
import {
  type GeneratedCard,
  type HassLike,
  type StrategyConfig,
  NOTE,
  areaName,
  collect,
} from "./bridge-devices-shared";
// Registers custom:room-grid-card, which the rooms layout draws with.
import "./room-grid";
// Registers custom:ac-history-card, which goes under every AC unit.
import "../cards/hvac/ac-history-card";
// And custom:ac-mapping-card, its BACnet address and objects.
import "../cards/hvac/ac-mapping-card";

/** Which camera stream goes on the card, best first.
 *
 * The third stream is the low-quality one on this site's NVR, which is what
 * belongs on a page showing several cameras at once; the first is full
 * quality and is what a tap should open. Not every camera has a third, so
 * this falls back rather than dropping the camera.
 */
const THUMBNAIL_ORDER = ["s2", "s1", "s0"];

const CAMERA_TOKEN = /token_(\d+_\d+_\d+_\d+_\d+)_(s\d)$/;

/** The three content sections, by the names the config uses for them. */
const SECTION_NAMES = ["equipment", "cameras", "other"] as const;
type SectionName = (typeof SECTION_NAMES)[number];

/** Layout a dashboard can ask for.
 *
 * A strategy rebuilds its views, so they cannot be rearranged by hand in
 * the editor — which is the price of pages that follow the registry. These
 * are the knobs instead, and they are deliberately the two Home Assistant
 * keys this instance's own editor writes: `max_columns` on the view and
 * `column_span` on a section. `grid_options` per card is not used, because
 * nothing here has seen this core write one and a strategy that emits keys
 * the frontend ignores is worse than one with fewer options.
 */
interface Layout {
  /** How many columns wide the page may be. 1 to 4. */
  max_columns?: number;
  /** Which sections to draw, in order. Omitted ones are left out. */
  order?: SectionName[];
  /** How many columns a section spans. Per section name. */
  span?: Partial<Record<SectionName, number>>;
  /** `name` (default) or `reverse`, for the cards inside each section. */
  sort?: "name" | "reverse";
}

/** The rooms an area page expects.
 *
 *   rooms:
 *     - [104, 103]
 *     - [105, 101]
 *     - [null, 151]
 *
 * Every bridge card whose device is called `Room <number>…` is drawn in a
 * grid in room-number order, three to a row where the screen allows, and
 * a suite's bed and living units stack in one cell. The list itself only
 * says which rooms should be there: one listed with nothing on it shows
 * its number in its place, because a hole where a room should be is worth
 * seeing. The rows were once drawn as the corridor runs, two sides facing;
 * in use, number order read better, so the row shape (and `null` gaps) is
 * now ignored and old configs still work.
 */
type Rooms = (string | number | null)[][];

/** The narrowest a room's panel may be drawn before the grid goes to one
 * column: the indoor unit is drawn 360 wide, and much under that its
 * lettering stops being readable. */
const ROOM_MIN_WIDTH = 340;

/** Rooms to a row at most; fewer as the screen narrows. */
const ROOM_COLUMNS = 3;

/** Room keys in number order: 320 before 1001, then anything not a number. */
function byRoomNumber(a: string, b: string): number {
  const na = Number.parseInt(a, 10);
  const nb = Number.parseInt(b, 10);
  const fa = Number.isFinite(na);
  const fb = Number.isFinite(nb);
  if (fa && fb && na !== nb) return na - nb;
  if (fa !== fb) return fa ? -1 : 1;
  return a.localeCompare(b, undefined, { numeric: true });
}

const ROOM_NAME = /^Room (\S+)(?:\s|$)/;

function roomsOf(config: StrategyConfig): Rooms | null {
  const given = (config as StrategyConfig & { rooms?: unknown }).rooms;
  if (!Array.isArray(given)) return null;
  const rows = given
    .filter((row): row is unknown[] => Array.isArray(row))
    .map((row) => row.map((cell) =>
      cell === null || cell === undefined || cell === "" ? null
        : typeof cell === "number" || typeof cell === "string" ? cell
        : null));
  return rows.length ? rows : null;
}

/** The rooms grid, and the bridge cards it did not place. */
function roomGrid(rooms: Rooms, bridge: GeneratedCard[]) {
  const byRoom = new Map<string, GeneratedCard[]>();
  for (const entry of bridge) {
    const found = ROOM_NAME.exec(entry.device);
    if (!found) continue;
    if (!byRoom.has(found[1])) byRoom.set(found[1], []);
    byRoom.get(found[1])!.push(entry);
  }

  const listed = rooms.flat()
    .filter((cell): cell is string | number => cell !== null)
    .map(String);
  const keys = [...new Set([...listed, ...byRoom.keys()])].sort(byRoomNumber);
  const placed = new Set<GeneratedCard>();
  const cells: (Record<string, unknown> | null)[] = [];
  for (const key of keys) {
    // Bed before Living: the device names sort that way.
    const found = (byRoom.get(key) ?? [])
      .sort((a, b) => a.device.localeCompare(b.device));
    for (const entry of found) placed.add(entry);
    if (!found.length) {
      cells.push({ type: "heading", heading: `Room ${key}`,
                   heading_style: "subtitle" });
    } else if (found.length === 1) {
      cells.push(found[0].card);
    } else {
      cells.push({ type: "vertical-stack",
                   cards: found.map((entry) => entry.card) });
    }
  }
  return {
    // Not Home Assistant's grid card: that holds its columns however
    // narrow the window, and a panel three to a row in 700px is
    // unreadable. This one drops to two, then one, as the space shrinks.
    card: { type: "custom:room-grid-card", columns: ROOM_COLUMNS,
            min_width: ROOM_MIN_WIDTH, cells },
    rest: bridge.filter((entry) => !placed.has(entry)),
  };
}

function layoutOf(config: StrategyConfig): Layout {
  const given = (config as StrategyConfig & { layout?: Layout }).layout ?? {};
  const order = (given.order ?? [...SECTION_NAMES]).filter(
    (name): name is SectionName =>
      (SECTION_NAMES as readonly string[]).includes(name)
  );
  const columns = Number(given.max_columns ?? 4);
  return {
    max_columns: Math.min(4, Math.max(1, Number.isFinite(columns) ? columns : 4)),
    order: order.length ? order : [...SECTION_NAMES],
    span: given.span ?? {},
    sort: given.sort === "reverse" ? "reverse" : "name",
  };
}

/** A section with the span the layout asked for, if any. */
function section(
  name: SectionName,
  layout: Layout,
  cards: Record<string, unknown>[]
): Record<string, unknown> {
  const span = layout.span?.[name];
  const built: Record<string, unknown> = { type: "grid", cards };
  if (span) built.column_span = Math.min(4, Math.max(1, Number(span)));
  return built;
}

interface FloorLike {
  floor_id?: string;
  name?: string;
  level?: number | null;
  icon?: string | null;
}

interface AreaLike {
  area_id?: string;
  name?: string;
  floor_id?: string | null;
  icon?: string | null;
}

interface DeviceLike {
  id?: string;
  area_id?: string | null;
  name_by_user?: string | null;
  name?: string | null;
}

interface EntityLike {
  entity_id: string;
  area_id?: string | null;
  device_id?: string | null;
  hidden?: boolean;
  entity_category?: string | null;
}

/** An icon per floor when the floor registry has none, which is usual. */
function floorIcon(floor: FloorLike): string {
  if (floor.icon) return floor.icon;
  const name = (floor.name ?? "").toLowerCase();
  if (name.includes("roof")) return "mdi:home-roof";
  if (name.includes("basement") || /\bb\d/.test(name)) return "mdi:home-floor-b";
  if (name.includes("ground")) return "mdi:home-floor-g";
  const digit = name.match(/(\d)/);
  if (digit) return `mdi:home-floor-${digit[1]}`;
  return "mdi:office-building";
}

function areaPath(areaId: string): string {
  return "area-" + areaId.replace(/_/g, "-");
}

function floorPath(floorId: string): string {
  return "floor-" + floorId.replace(/_/g, "-");
}

function deviceLabel(hass: HassLike, deviceId: string | null | undefined) {
  if (!deviceId) return null;
  const device = (hass.devices ?? {})[deviceId] as DeviceLike | undefined;
  return device?.name_by_user || device?.name || null;
}

/** The area an entity belongs to: its own, else its device's. */
function entityArea(hass: HassLike, entity: EntityLike): string | null {
  if (entity.area_id) return entity.area_id;
  const device = entity.device_id
    ? ((hass.devices ?? {})[entity.device_id] as DeviceLike | undefined)
    : undefined;
  return device?.area_id ?? null;
}

function friendlyName(hass: HassLike, entityId: string): string {
  const state = (hass.states ?? {})[entityId] as
    | { attributes?: Record<string, unknown> }
    | undefined;
  const name = state?.attributes?.friendly_name;
  return typeof name === "string" ? name : "";
}

/**
 * A card per camera, grouped by camera rather than by entity.
 *
 * One camera is three entities and three cards of the same view would be
 * silly. The name comes from the first stream because that is the one the
 * recorder names; the others carry nothing but a token.
 */
function cameraCards(hass: HassLike, entities: EntityLike[]) {
  const streams = new Map<string, Record<string, string>>();
  for (const entity of entities) {
    if (!entity.entity_id.startsWith("camera.")) continue;
    const found = CAMERA_TOKEN.exec(entity.entity_id);
    if (!found) continue;
    const group = streams.get(found[1]) ?? {};
    group[found[2]] = entity.entity_id;
    streams.set(found[1], group);
  }

  const used = new Set<string>();
  const cards: Record<string, unknown>[] = [];
  const ordered = [...streams.entries()].sort((a, b) => {
    const an = friendlyName(hass, a[1].s0 ?? "") || a[0];
    const bn = friendlyName(hass, b[1].s0 ?? "") || b[0];
    return an.localeCompare(bn);
  });

  for (const [token, group] of ordered) {
    for (const id of Object.values(group)) used.add(id);
    const thumb = THUMBNAIL_ORDER.map((s) => group[s]).find(Boolean);
    if (!thumb) continue;
    const full = group.s0 ?? thumb;
    let label = friendlyName(hass, group.s0 ?? "");
    if (!label || label.startsWith("UNV - CCTV Token")) {
      label = `Camera ${token.split("_")[2]}`;
    }
    const card: Record<string, unknown> = {
      type: "picture-entity",
      entity: thumb,
      camera_view: "live",
      name: label,
      show_state: false,
    };
    if (full !== thumb) {
      card.tap_action = { action: "more-info", entity: full };
    }
    cards.push(card);
  }
  return { cards, used };
}

/** The remaining entities, one list per device. */
function leftoverCards(
  hass: HassLike,
  entities: EntityLike[],
  skip: Set<string>,
  coveredDevices: Set<string>
) {
  const byDevice = new Map<string, EntityLike[]>();
  for (const entity of entities) {
    if (skip.has(entity.entity_id)) continue;
    if (entity.hidden) continue;
    const device = entity.device_id ?? "";
    if (device && coveredDevices.has(device)) continue;
    if (!byDevice.has(device)) byDevice.set(device, []);
    byDevice.get(device)!.push(entity);
  }

  const cards: Record<string, unknown>[] = [];
  const ordered = [...byDevice.entries()].sort((a, b) => {
    const an = deviceLabel(hass, a[0]) ?? "~";
    const bn = deviceLabel(hass, b[0]) ?? "~";
    return an.localeCompare(bn);
  });
  for (const [device, group] of ordered) {
    group.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
    cards.push({
      type: "entities",
      title: deviceLabel(hass, device) ?? "Not on a device",
      show_header_toggle: false,
      entities: group.map((e) => e.entity_id),
    });
  }
  return cards;
}

function areaView(
  hass: HassLike,
  area: AreaLike,
  bridge: GeneratedCard[],
  entities: EntityLike[],
  layout: Layout,
  rooms: Rooms | null = null
) {
  const areaId = area.area_id!;
  // No area card and no heading: the area's name belongs in the top bar,
  // which the view title puts it in, and saying it three times on one page
  // is two times too many. The card itself was context for a page that had
  // none; now the page is the area.
  const cameras = cameraCards(hass, entities);
  const reorder = <T,>(cards: T[]): T[] =>
    layout.sort === "reverse" ? [...cards].reverse() : cards;

  const built: Partial<Record<SectionName, Record<string, unknown>>> = {};

  if (bridge.length && rooms) {
    // The grid takes the whole width of the page, unless the dashboard said
    // otherwise. A faceplate scales with its card, so a room grid squeezed
    // into half the page draws its lettering at half size — unreadable on
    // a desk screen. Full width lets the cards grow with the screen.
    const grid = roomGrid(rooms, bridge);
    const wide = section("equipment", layout, [
      { type: "heading", heading: "Equipment" },
      grid.card,
      ...reorder(grid.rest.map((entry) => entry.card)),
    ]);
    if (!layout.span?.equipment) {
      wide.column_span = layout.max_columns ?? 4;
    }
    built.equipment = wide;
  } else if (bridge.length) {
    built.equipment = section("equipment", layout, [
      { type: "heading", heading: "Equipment" },
      ...reorder(bridge.map((entry) => entry.card)),
    ]);
  }
  if (cameras.cards.length) {
    built.cameras = section("cameras", layout, [
      { type: "heading", heading: "Cameras" },
      ...reorder(cameras.cards),
    ]);
  }

  // A device the bridges already drew must not be listed again. They are
  // matched by name because that is what a generated card carries.
  const coveredNames = new Set(bridge.map((entry) => entry.device));
  const coveredDevices = new Set<string>();
  for (const [id, device] of Object.entries(hass.devices ?? {})) {
    const named = (device as DeviceLike).name_by_user
      || (device as DeviceLike).name;
    if (named && coveredNames.has(named)) coveredDevices.add(id);
  }

  const rest = leftoverCards(hass, entities, cameras.used, coveredDevices);
  if (rest.length) {
    built.other = section("other", layout, [
      { type: "heading", heading: "Everything else" },
      ...reorder(rest),
    ]);
  }

  // The order the dashboard asked for, leaving out anything it did not.
  const sections = (layout.order ?? [...SECTION_NAMES])
    .map((name) => built[name])
    .filter((entry): entry is Record<string, unknown> => Boolean(entry));

  if (!sections.length) {
    // Without the area card an empty area would be a blank page, which
    // reads as broken rather than as empty.
    sections.push({
      type: "grid",
      cards: [NOTE(
        `### ${area.name ?? areaId}\n` +
        "Nothing is assigned to this area yet. Put a device in it from " +
        "Settings → Devices, and it appears here on the next page load."
      )],
    });
  }

  return {
    title: area.name ?? areaId,
    path: areaPath(areaId),
    subview: true,
    type: "sections",
    max_columns: layout.max_columns ?? 4,
    sections,
  };
}

class SiteFloorsDashboardStrategy extends HTMLElement {
  static async generate(config: StrategyConfig, hass: HassLike) {
    const { cards, problems } = await collect(hass, config);
    const layout = layoutOf(config);

    const areas = Object.values(hass.areas ?? {}) as AreaLike[];
    const floors = Object.values(hass.floors ?? {}) as FloorLike[];

    const bridgeByArea = new Map<string, GeneratedCard[]>();
    for (const entry of cards) {
      const key = entry.area_id ?? "";
      if (!bridgeByArea.has(key)) bridgeByArea.set(key, []);
      bridgeByArea.get(key)!.push(entry);
    }
    for (const list of bridgeByArea.values()) {
      list.sort((a, b) => a.device.localeCompare(b.device));
    }

    const entitiesByArea = new Map<string, EntityLike[]>();
    for (const entity of Object.values(hass.entities ?? {}) as EntityLike[]) {
      const area = entityArea(hass, entity);
      if (!area) continue;
      if (!entitiesByArea.has(area)) entitiesByArea.set(area, []);
      entitiesByArea.get(area)!.push(entity);
    }

    const sorted = [...areas]
      .filter((a) => a.area_id)
      .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

    const views: Record<string, unknown>[] = [];
    const floorOrder = [...floors].sort((a, b) => {
      const al = a.level ?? null;
      const bl = b.level ?? null;
      if (al !== null && bl !== null && al !== bl) return al - bl;
      return (a.name ?? "").localeCompare(b.name ?? "");
    });

    const placed = new Set<string>();
    for (const floor of floorOrder) {
      const mine = sorted.filter((a) => a.floor_id === floor.floor_id);
      if (!mine.length) continue;
      for (const area of mine) placed.add(area.area_id!);
      views.push({
        title: floor.name ?? floor.floor_id,
        path: floorPath(floor.floor_id!),
        icon: floorIcon(floor),
        type: "sections",
        max_columns: layout.max_columns ?? 4,
        sections: [{
          type: "grid",
          cards: [
            { type: "heading", heading: floor.name ?? floor.floor_id },
            ...mine.map((area) => ({
              type: "area",
              area: area.area_id,
              tap_action: {
                action: "navigate",
                navigation_path: areaPath(area.area_id!),
              },
            })),
          ],
        }],
      });
    }

    const strays = sorted.filter((a) => !placed.has(a.area_id!));
    if (strays.length) {
      views.push({
        title: "Not on a floor",
        path: "no-floor",
        icon: "mdi:help-circle-outline",
        type: "sections",
        max_columns: 4,
        sections: [{
          type: "grid",
          cards: [
            { type: "heading", heading: "Areas with no floor set" },
            ...strays.map((area) => ({
              type: "area",
              area: area.area_id,
              tap_action: {
                action: "navigate",
                navigation_path: areaPath(area.area_id!),
              },
            })),
          ],
        }],
      });
    }

    for (const area of sorted) {
      views.push(areaView(
        hass,
        area,
        bridgeByArea.get(area.area_id!) ?? [],
        entitiesByArea.get(area.area_id!) ?? [],
        layout
      ));
    }

    if (!floors.length) {
      problems.unshift(
        "No floors are set up, so every area is under “Not on a floor”. " +
        "Settings → Areas → Floors, then reload this page."
      );
    }
    if (problems.length) {
      views.push({
        title: "Notes",
        path: "notes",
        icon: "mdi:alert-circle-outline",
        cards: problems.map((p) => NOTE(p)),
      });
    }

    if (!views.length) {
      views.push({
        title: "Nothing yet",
        path: "empty",
        cards: [NOTE(
          "### No areas yet\n" +
          "Create some areas and assign devices to them, and this " +
          "dashboard builds itself."
        )],
      });
    }

    return { views };
  }
}

/** A single floor, or a single area, as one view inside another dashboard. */
class SiteFloorsViewStrategy extends HTMLElement {
  static async generate(config: StrategyConfig, hass: HassLike) {
    const wanted = (config as { area?: string }).area;
    if (!wanted) {
      return {
        cards: [NOTE(
          "### Which area?\n" +
          "This view strategy draws one area. Give it `area: <area_id>`, " +
          "or use it as a whole dashboard for floors and areas together."
        )],
      };
    }
    const { cards } = await collect(hass, config);
    const area = (hass.areas ?? {})[wanted] as AreaLike | undefined;
    const entities = (Object.values(hass.entities ?? {}) as EntityLike[])
      .filter((e) => entityArea(hass, e) === wanted);
    const view = areaView(
      hass,
      area ?? { area_id: wanted, name: areaName(hass, wanted) },
      cards.filter((c) => c.area_id === wanted),
      entities,
      layoutOf(config),
      roomsOf(config)
    );
    // The title goes back with it: a view strategy that returns only
    // sections leaves the top bar to whatever the dashboard happened to
    // call the page, and the area's own name is the right answer.
    return {
      title: view.title,
      type: "sections",
      max_columns: view.max_columns,
      sections: view.sections,
    };
  }
}

customElements.define("ll-strategy-dashboard-site-floors", SiteFloorsDashboardStrategy);
customElements.define("ll-strategy-view-site-floors", SiteFloorsViewStrategy);
