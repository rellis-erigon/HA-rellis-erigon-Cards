/**
 * The faceplate registry.
 *
 * Faceplates are bundled rather than fetched: one file, works offline, and
 * nothing to configure. The add-on's picker reads the separately published
 * faceplates/index.json instead, which is generated from this list.
 */

import { BuildContext, Faceplate } from "../core/types";
import { PM2200 } from "./meter/pm2200";
import { GENERIC_3PHASE } from "./meter/generic3phase";
import { DIN_3PHASE } from "./meter/din3phase";
import { CVM_E3_MINI } from "./meter/cvm-e3-mini";
import { MULTIJET_REGISTER } from "./meter/multijet-register";
import { MADOKA_BRC1H as BRC1H63K_MADOKA } from "./hvac/madoka-brc1h";
import { BRC1E63 } from "./hvac/brc1e63";
import { BRC315D7 } from "./hvac/brc315d7";
import { PUMPSET } from "./plant/pumpset";
import { BRC2E61 } from "./hvac/brc2e61";

import { WOLTMANN_REGISTER } from "./meter/woltmann-register";
import { LCD_WATER_METER } from "./meter/lcd-water-meter";
import { DIAL_WATER_METER } from "./meter/dial-water-meter";
import { COMPOUND_METER } from "./meter/compound-meter";
import { SMART_WATER_METER } from "./meter/smart-water-meter";
import { SUPPLY_FAN_TOP, SUPPLY_FAN_LEFT, SUPPLY_FAN_RIGHT, EXHAUST_FAN } from "./plant/fans";
import { HOT_WATER_UNIT } from "./plant/hot-water-unit";
import { CIRCULATION_PUMPS } from "./plant/circulation-pumps";
import { GENERIC_FIP } from "./fire/generic-fip";
import { QSYS_ZONES } from "./audio/qsys-zones";
import { ZONE_MIXER } from "./audio/zone-mixer";
import { ROOM_CONTROLLER } from "./av/room-controller";

export const FACEPLATES: Faceplate[] = [CVM_E3_MINI, PM2200, DIN_3PHASE, GENERIC_3PHASE, MULTIJET_REGISTER, BRC1E63, BRC2E61, BRC1H63K_MADOKA, BRC315D7, PUMPSET, QSYS_ZONES, ROOM_CONTROLLER,
  WOLTMANN_REGISTER, LCD_WATER_METER, DIAL_WATER_METER, COMPOUND_METER, SMART_WATER_METER,
  SUPPLY_FAN_TOP, SUPPLY_FAN_LEFT, SUPPLY_FAN_RIGHT, EXHAUST_FAN,
  HOT_WATER_UNIT, CIRCULATION_PUMPS, GENERIC_FIP, ZONE_MIXER];

export function faceplatesFor(card: string): Faceplate[] {
  return FACEPLATES.filter((f) => f.card === card);
}

export function getFaceplate(card: string, id?: string): Faceplate {
  const available = faceplatesFor(card);
  return available.find((f) => f.id === id) ?? available[0];
}


/**
 * Apply option values to a faceplate that builds itself.
 *
 * Faceplates with fixed artwork come back untouched, so every card can call
 * this without caring which kind it has.
 */
export function resolveFaceplate(
  faceplate: Faceplate,
  values: Record<string, number> = {},
  ctx?: BuildContext
): Faceplate {
  if (!faceplate.build) return faceplate;
  const merged: Record<string, number> = {};
  for (const option of faceplate.options ?? []) {
    const given = values[option.key];
    merged[option.key] =
      typeof given === "number" && Number.isFinite(given)
        ? Math.max(option.min, Math.min(option.max, given))
        : option.default;
  }
  return { ...faceplate, ...faceplate.build(merged, ctx) };
}
