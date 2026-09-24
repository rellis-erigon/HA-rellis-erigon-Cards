/**
 * Publish the faceplate catalogue as data.
 *
 * The add-on's Devices view offers a faceplate picker, and must render it
 * without importing any card JavaScript. So the list of faceplates is
 * emitted as a plain JSON file alongside the bundles.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = "src/faceplates";
const entries = [];

// Every category directory, not just meters: the add-on picker needs the
// whole catalogue to offer a card per device type.
const files = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(join(ROOT, d.name))
      .filter((f) => f.endsWith(".ts"))
      .map((f) => join(ROOT, d.name, f))
  );

for (const file of files) {
  const whole = readFileSync(file, "utf8");
  // Parse only the exported Faceplate object. Reading the first `id:` in the
  // file picked up a dial definition declared above it, and published a
  // faceplate called "d10".
  const start = whole.search(/export const \w+\s*:\s*Faceplate\s*=\s*\{/);
  if (start === -1) continue;
  const source = whole.slice(start);
  const pick = (key) =>
    source.match(new RegExp(`${key}:\\s*\n?\\s*"([^"]+)"`))?.[1];
  const id = pick("id");
  if (!id) continue;
  const pages = source.match(/pages:\s*\[([^\]]*)\]/)?.[1];
  entries.push({
    id,
    name: pick("name"),
    card: pick("card"),
    description: pick("description") ?? "",
    emulates: pick("emulates") ?? null,
    pages: pages
      ? pages.split(",").map((p) => p.trim().replace(/"/g, "")).filter(Boolean)
      : [],
  });
}

const catalogue = {
  generated: new Date().toISOString().slice(0, 10),
  faceplates: entries.sort((a, b) => a.id.localeCompare(b.id)),
};

writeFileSync("faceplates/index.json", JSON.stringify(catalogue, null, 2) + "\n");
console.log(`catalogue: ${entries.length} faceplates`);
