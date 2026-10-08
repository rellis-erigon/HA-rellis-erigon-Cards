/**
 * Guard the published contract: role names, faceplate ids, and card types.
 *
 * Three bridge add-ons generate Lovelace cards against these names. A
 * rename here does not break anything in this repository — the drawing is
 * fine — it breaks the templates in the *other* repositories, which carry
 * on binding the old key. The region then binds nothing, draws its
 * placeholder and looks like a device with a missing point. Nobody finds
 * that for weeks.
 *
 * So the contract is pinned. Adding a faceplate or a role is free;
 * removing or renaming one fails this check until the lock file is
 * updated, which makes it a deliberate act with a diff to review rather
 * than a silent break.
 *
 *   node scripts/test-contract.mjs           check against the lock
 *   node scripts/test-contract.mjs --update  accept the current shape
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const LOCK = "faceplates/roles.lock.json";
const CATALOGUE = "faceplates/index.json";

const update = process.argv.includes("--update");
const catalogue = JSON.parse(readFileSync(CATALOGUE, "utf8")).faceplates;

const current = Object.fromEntries(
  catalogue.map((f) => [f.id, { card: f.card, roles: [...f.roles].sort() }]),
);

if (update || !existsSync(LOCK)) {
  writeFileSync(LOCK, JSON.stringify(current, null, 2) + "\n");
  console.log(
    `${update ? "updated" : "created"} ${LOCK}: `
    + `${Object.keys(current).length} faceplates`,
  );
  process.exit(0);
}

const locked = JSON.parse(readFileSync(LOCK, "utf8"));
const problems = [];

for (const [id, was] of Object.entries(locked)) {
  const now = current[id];
  if (!now) {
    problems.push(
      `faceplate "${id}" is gone. Templates in the bridge repositories name `
      + `it and will silently fall back to their default.`,
    );
    continue;
  }
  if (now.card !== was.card) {
    problems.push(
      `faceplate "${id}" moved from custom:${was.card} to `
      + `custom:${now.card}. Cards naming it on the old type stop working.`,
    );
  }
  const lost = was.roles.filter((r) => !now.roles.includes(r));
  if (lost.length) {
    problems.push(
      `faceplate "${id}" no longer binds ${lost.join(", ")}. Any template `
      + `still sending those draws nothing and reports no error.`,
    );
  }
}

const added = Object.keys(current).filter((id) => !(id in locked));
const gained = Object.entries(current)
  .filter(([id]) => id in locked)
  .map(([id, now]) => [id, now.roles.filter(
    (r) => !locked[id].roles.includes(r))])
  .filter(([, roles]) => roles.length);

if (problems.length) {
  console.error("contract broken:\n");
  for (const p of problems) console.error("  - " + p);
  console.error(
    `\nIf the change is intended, run:\n`
    + `    node scripts/test-contract.mjs --update\n`
    + `and update the templates in the bridge repositories in the same `
    + `change.\n`,
  );
  process.exit(1);
}

console.log(
  `contract ok: ${Object.keys(current).length} faceplates`
  + (added.length ? `, ${added.length} new (${added.join(", ")})` : "")
  + (gained.length
    ? `, roles added to ${gained.map(([id]) => id).join(", ")}`
    : ""),
);
