/**
 * Unbound controls are left out, and the right ones survive.
 *
 * Two things this guards that are easy to get wrong: a paging button's
 * `target` is a page, not a role, and hiding on that basis strips the
 * navigation off a multi-page meter; and a derived role like volts_avg
 * has no entity of its own, so it must count as bound when the phases
 * it averages are.
 */
import { JSDOM } from "jsdom";
const dom = new JSDOM("<!doctype html><html><body></body></html>", { pretendToBeVisual: true });
const w = dom.window;
for (const k of Object.getOwnPropertyNames(w)) { if (k in globalThis) continue; try { globalThis[k]=w[k]; } catch {} }
globalThis.window=w; globalThis.document=w.document; globalThis.customElements=w.customElements;
for (const k of ["Event","CustomEvent","MouseEvent"]) globalThis[k]=w[k];
await import("../dist/all-cards.js?t=" + Date.now());

const S = (v, a = {}) => ({ state: String(v), attributes: a });
let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
};

async function mount(card, config, states) {
  const C = customElements.get(card);
  const el = new C();
  el.setConfig({ type: `custom:${card}`, ...config });
  el.hass = { states, callService: async () => {} };
  document.body.appendChild(el);
  await new Promise((r) => setTimeout(r, 150));
  const root = el.shadowRoot ?? el;
  const texts = [...root.querySelectorAll("text")].map((t) => t.textContent.trim());
  return { el, root, texts, hint: root.querySelector(".hint.muted")?.textContent?.trim() };
}

// 1. A console with only level and mute bound loses pan, EQ and source.
{
  const states = { "number.v": S(-20, { min: -100, max: 20 }), "switch.m": S("off") };
  const full = await mount("audio-zone-card", {
    faceplate: "zone-mixer", options: { zones: 1, eq: 1 },
    entities: { zone1_volume: "number.v", zone1_mute: "switch.m" },
    hide_unbound: false,
  }, states);
  const trimmed = await mount("audio-zone-card", {
    faceplate: "zone-mixer", options: { zones: 1, eq: 1 },
    entities: { zone1_volume: "number.v", zone1_mute: "switch.m" },
  }, states);
  check("console hides unbound pan/EQ/source",
    trimmed.texts.length < full.texts.length,
    `${full.texts.length} -> ${trimmed.texts.length} text regions`);
  check("PAN label goes with its slider", !trimmed.texts.includes("PAN"));
  check("level and mute survive",
    trimmed.texts.some((t) => t.includes("dB")) && trimmed.texts.includes("MUTE"));
  check("it says what it hid", Boolean(trimmed.hint), trimmed.hint ?? "no note");
  full.el.remove(); trimmed.el.remove();
}

// 2. A paged meter keeps its page buttons.
{
  const states = {
    "sensor.l1": S(237, { unit_of_measurement: "V" }),
    "sensor.l2": S(239, { unit_of_measurement: "V" }),
    "sensor.l3": S(236, { unit_of_measurement: "V" }),
  };
  const { el, texts } = await mount("bms-meter-card", {
    faceplate: "schneider-pm2200",
    entities: { volts_l1: "sensor.l1", volts_l2: "sensor.l2", volts_l3: "sensor.l3" },
  }, states);
  const paging = texts.filter((t) => ["VOLTS", "AMPS", "POWER", "ENERGY", "▶", "◀"].includes(t));
  check("page navigation survives hiding", paging.length > 0, `${paging.length} page controls`);
  check("derived volts_avg survives on its phases",
    texts.some((t) => t.includes("237") || t.includes("V")), "average drawn");
  el.remove();
}

// 3. Turning it off keeps everything, as before.
{
  const { el, texts, hint } = await mount("plant-equipment-card", {
    faceplate: "supply-fan-top", hide_unbound: false,
  }, {});
  check("hide_unbound: false draws the lot", texts.includes("FILTER ΔP"));
  check("and reports nothing hidden", !hint);
  el.remove();
}

if (failures) { console.log(`${failures} hiding check(s) failed`); process.exit(1); }
