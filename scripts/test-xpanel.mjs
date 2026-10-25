/**
 * crestron-xpanel-card must hand the compiled XPanel exactly what the
 * Crestron-hosted page would: the processor and IPID as page parameters,
 * and a socket that goes to the integration's relay, signed, rather than
 * to the processor (which a browser cannot reach over raw TCP).
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://ha.local:8123/",
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

let loaded;
const created = [];
window.RufflePlayer = {
  newest: () => ({
    createPlayer() {
      const el = document.createElement("div");
      el.ruffle = () => ({ load: async (options) => { loaded = options; } });
      created.push(el);
      return el;
    },
  }),
};

globalThis.fetch = async (url) => ({
  ok: url === "/local/crestron-panels/BGM/panel.json",
  json: async () => ({ size: [1024, 600],
    page_joins: { "1.0-Init": 11, "2.0-Start": 12, "3.0-Main": 13, "x": 12 } }),
});
const mod = await import("../dist/crestron-xpanel-card.js");
const { ipidParameter, relaySocketUrl, ratioOf, panelJsonUrl, scaleOf } = mod;
const Card = customElements.get("crestron-xpanel-card");

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`crestron-xpanel-card: ${name} ${ok ? "ok" : "FAILED " + detail}`);
  if (!ok) failures++;
};

check("ipid is decimal, as AS3 int() reads it", ipidParameter(3) === "3" && ipidParameter(0x0a) === "10");
check("aspect ratios read every way", ratioOf("1280 / 800") === 1.6 && ratioOf("16:10") === 1.6
  && ratioOf("1.5") === 1.5 && ratioOf("nonsense") === 1.6 && ratioOf(undefined) === 1.6);
check("panel.json sits beside the xpanel folder",
  panelJsonUrl("/local/crestron-panels/BGM/xpanel/container.swf?v=1") === "/local/crestron-panels/BGM/panel.json");
check("scale is held to 0.1-1", scaleOf(0.75) === 0.75 && scaleOf(3) === 1 && scaleOf(0.01) === 0.1
  && scaleOf("x") === 1 && scaleOf(undefined) === 1);
check("relay is wss on https",
  relaySocketUrl({ protocol: "https:", host: "ha.example:8123" }, "/api/x?authSig=s")
    === "wss://ha.example:8123/api/x?authSig=s");

const calls = [];
const signedPaths = [];
const hass = {
  states: {},
  entities: { "binary_sensor.bgm_connection": { entity_id: "binary_sensor.bgm_connection", device_id: "dev1", platform: "crestron_cip" } },
  devices: { dev1: { id: "dev1", name: "BGM", config_entries: ["entry1"] },
    room2: { id: "room2", name: "BGM Room 2", config_entries: ["entry1"] } },
  callService: async () => {},
  callWS: async (msg) => {
    calls.push(msg);
    if (msg.type === "crestron_cip/xpanel_info" && msg.device_id === "room2") {
      return { host: "192.0.2.1", port: 41794, ipid: 4, relay: "/api/crestron_cip/xpanel/entry1",
        key: "k3y", panel: "Room_2",
        xpanel_url: "/local/crestron-panels/BGM_Room_2/xpanel/container.swf?v=def" };
    }
    if (msg.type === "crestron_cip/xpanel_info") {
      return { host: "192.0.2.1", port: 41794, ipid: 3, relay: "/api/crestron_cip/xpanel/entry1",
        key: "k3y",
        xpanel_url: "/local/crestron-panels/BGM/xpanel/container.swf?v=abc" };
    }
    if (msg.type === "auth/sign_path") {
      signedPaths.push(msg.path);
      // As Home Assistant does: the query is signed, authSig appended.
      return { path: `${msg.path}${msg.path.includes("?") ? "&" : "?"}authSig=sig` };
    }
    throw new Error(msg.type);
  },
};
hass.states["binary_sensor.bgm_connection"] = { entity_id: "binary_sensor.bgm_connection", state: "on", attributes: {} };

let threw = false;
try { new Card().setConfig({ type: "custom:crestron-xpanel-card" }); } catch { threw = true; }
check("a processor is required", threw);
check("the editor picks Crestron CIP processors",
  Card.getConfigForm().schema[0].selector.device.filter.integration === "crestron_cip");
check("a new card starts on the first Crestron processor",
  Card.getStubConfig(hass).device === "dev1");

const card = new Card();
card.setConfig({ type: "custom:crestron-xpanel-card", device: "BGM",
  xpanel_url: "/local/crestron-panels/BGM/xpanel/container.swf" });
card.hass = hass;
document.body.appendChild(card);
for (let i = 0; i < 20 && !loaded; i++) await new Promise((r) => setTimeout(r, 5));

check("loads the container", loaded?.url === "/local/crestron-panels/BGM/xpanel/container.swf");
check("relative files resolve beside it", loaded?.base === "/local/crestron-panels/BGM/xpanel/");
check("asks about the device it was given", calls[0]?.device_id === "dev1", JSON.stringify(calls[0]));
check("page parameters as Crestron's page gives them",
  JSON.stringify(loaded?.parameters) === JSON.stringify({
    host: "192.0.2.1", port: "41794", ipid: "3", bypasslogindialog: "true", id: "", password: "", enablessl: "false" }),
  JSON.stringify(loaded?.parameters));
const proxy = loaded?.socketProxy?.[0];
check("the socket goes to the relay with the entry's key",
  proxy?.host === "192.0.2.1" && proxy?.port === 41794
    && /^wss?:\/\/[^/]+\/api\/crestron_cip\/xpanel\/entry1\?key=k3y&pages=11%2C12%2C13$/.test(proxy?.proxyUrl ?? ""),
  JSON.stringify(proxy));
const stage = card.renderRoot.querySelector(".stage");
check("fits the window by default", /min\(100%, calc\(\(100vh/.test(stage?.getAttribute("style") ?? ""),
  stage?.getAttribute("style"));
check("the engine gets the panel's own screen size, from its import",
  created[0].style.width === "1024px" && created[0].style.height === "600px",
  `${created[0].style.width} x ${created[0].style.height}`);
check("the card takes the panel's proportions",
  /aspect-ratio: 1\.70?6/.test(card.renderRoot.querySelector(".stage")?.getAttribute("style") ?? ""),
  card.renderRoot.querySelector(".stage")?.getAttribute("style"));
{
  const small = new Card();
  small.setConfig({ type: "custom:crestron-xpanel-card", device: "BGM", scale: 0.6,
    xpanel_url: "/local/crestron-panels/BGM/xpanel/container.swf" });
  document.body.appendChild(small);
  await small.updateComplete;
  const style = small.renderRoot.querySelector(".stage")?.getAttribute("style") ?? "";
  check("a scaled card is that fraction of the fitted size", /\* 0\.6\)/.test(style), style);
  small.remove();
}
check("the panel runs in a host of its own on the page",
  created.length === 1 && created[0].parentElement?.classList.contains("crestron-xpanel-host"));

card.remove();
check("leaving the view keeps the panel running", created[0].isConnected);
await new Promise((r) => setTimeout(r, 20));
check("and moves it off screen", created[0].parentElement.style.left === "-20000px");

const again = new Card();
again.setConfig({ type: "custom:crestron-xpanel-card", device: "BGM",
  xpanel_url: "/local/crestron-panels/BGM/xpanel/container.swf" });
again.hass = hass;
document.body.appendChild(again);
await new Promise((r) => setTimeout(r, 20));
check("coming back reuses it rather than loading it again",
  created.length === 1 && calls.filter((c) => c.type === "crestron_cip/xpanel_info").length === 1);

{
  // Given only the processor, the card runs the panel configured for it.
  const plain = new Card();
  plain.setConfig({ type: "custom:crestron-xpanel-card", device: "BGM" });
  plain.hass = hass;
  document.body.appendChild(plain);
  for (let i = 0; i < 40 && created.length < 2; i++) await new Promise((r) => setTimeout(r, 5));
  check("with no URL it runs the processor's configured panel",
    loaded?.url === "/local/crestron-panels/BGM/xpanel/container.swf?v=abc", loaded?.url);
}

{
  // A room panel's device: its own panel, at its own IPID.
  const room = new Card();
  room.setConfig({ type: "custom:crestron-xpanel-card", device: "room2" });
  room.hass = hass;
  document.body.appendChild(room);
  for (let i = 0; i < 40 && created.length < 3; i++) await new Promise((r) => setTimeout(r, 5));
  check("a room's device runs that room's panel",
    loaded?.url === "/local/crestron-panels/BGM_Room_2/xpanel/container.swf?v=def", loaded?.url);
  check("at the room panel's IPID", loaded?.parameters?.ipid === "4", loaded?.parameters?.ipid);
  check("and the relay is told which panel",
    /[?&]panel=Room_2(&|$)/.test(loaded?.socketProxy?.[0]?.proxyUrl ?? ""), loaded?.socketProxy?.[0]?.proxyUrl);
}

{
  // Background panels: found in any dashboard, started before their view shows.
  const { backgroundCards, startBackgroundPanels } = mod;
  const dash = { views: [{ sections: [{ cards: [
    { type: "custom:crestron-xpanel-card", device: "room2", background: true },
    { type: "custom:crestron-xpanel-card", device: "dev1" },
    { type: "vertical-stack", cards: [{ type: "custom:crestron-xpanel-card", device: "dev1", background: true }] },
  ] }] }] };
  check("finds the cards set to run in the background, nested too",
    backgroundCards(dash).map((c) => c.device).join() === "room2,dev1");
  const bgHass = { ...hass, callWS: async (msg) => {
    if (msg.type === "lovelace/dashboards/list") return [{ url_path: "av-system" }];
    if (msg.type === "lovelace/config") {
      if (msg.url_path === "av-system") return { views: [{ cards: [
        { type: "custom:crestron-xpanel-card", entry_id: "entry1", panel: "Room_9", background: true }] }] };
      throw new Error("strategy dashboard");
    }
    return hass.callWS(msg);
  } };
  const before = created.length;
  const n = await startBackgroundPanels(bgHass);
  for (let i = 0; i < 40 && created.length === before; i++) await new Promise((r) => setTimeout(r, 5));
  check("starts them with no card on screen", n === 1 && created.length === before + 1, `${n} ${created.length - before}`);
}

if (failures) {
  console.log(`${failures} failure(s)`);
  process.exit(1);
}
// The card follows its stage every frame while shown; end here.
process.exit(0);
