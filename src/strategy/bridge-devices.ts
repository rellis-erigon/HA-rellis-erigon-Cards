/**
 * A dashboard that builds itself from the bridges, grouped by area.
 *
 * Home Assistant's own device page cannot host a custom card, so a strategy
 * is the supported way to get generated cards onto a real page.
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
 *
 * For floors and areas with everything in them, see site-floors.ts.
 */
import {
  type HassLike,
  type StrategyConfig,
  NOTE,
  areaName,
  byArea,
  collect,
} from "./bridge-devices-shared";
// Registers custom:ac-history-card, which goes under every AC unit.
import "../cards/hvac/ac-history-card";
// And custom:ac-mapping-card, its BACnet address and objects.
import "../cards/hvac/ac-mapping-card";

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
