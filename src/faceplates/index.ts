/**
 * The faceplate registry.
 *
 * Faceplates are bundled rather than fetched: one file, works offline, and
 * nothing to configure. The add-on's picker reads the separately published
 * faceplates/index.json instead, which is generated from this list.
 */

import { Faceplate } from "../core/types";
import { PM2200 } from "./meter/pm2200";
import { GENERIC_3PHASE } from "./meter/generic3phase";
import { DIN_3PHASE } from "./meter/din3phase";
import { CVM_E3_MINI } from "./meter/cvm-e3-mini";
import { MULTIJET_REGISTER } from "./meter/multijet-register";
import { MADOKA_BRC1H as BRC1H63K_MADOKA } from "./hvac/madoka-brc1h";
import { BRC1E63 } from "./hvac/brc1e63";
import { BRC315D7 } from "./hvac/brc315d7";
import { BRC2E61 } from "./hvac/brc2e61";

export const FACEPLATES: Faceplate[] = [CVM_E3_MINI, PM2200, DIN_3PHASE, GENERIC_3PHASE, MULTIJET_REGISTER, BRC1E63, BRC2E61, BRC1H63K_MADOKA, BRC315D7];

export function faceplatesFor(card: string): Faceplate[] {
  return FACEPLATES.filter((f) => f.card === card);
}

export function getFaceplate(card: string, id?: string): Faceplate {
  const available = faceplatesFor(card);
  return available.find((f) => f.id === id) ?? available[0];
}
