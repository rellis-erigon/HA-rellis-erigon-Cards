/**
 * Publish faceplates/index.json: what faceplates exist, which card renders
 * each, and which roles each one binds.
 *
 * The roles matter as much as the ids. The three bridge add-ons generate
 * Lovelace cards for their devices, and to do that they have to know what
 * a faceplate expects to be handed. Publishing that here keeps them from
 * hard-coding a list that drifts.
 *
 * This runs the registry rather than reading the source, because a
 * parametric faceplate builds its regions from its options and its roles
 * do not appear literally anywhere in the file.
 */
import { writeFileSync, mkdirSync } from "node:fs";

// The faceplates build their regions with lit's `svg` tag, so importing the
// registry pulls lit in, and lit walks a real document as it loads. Nothing
// here renders; jsdom is only here so the import succeeds.
import { JSDOM } from "jsdom";
const { window } = new JSDOM("<!doctype html><html></html>");
globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.customElements = window.customElements;

const { FACEPLATES, resolveFaceplate } = await import(
  "../dist/faceplates-registry.mjs"
);

const entries = FACEPLATES.map((faceplate) => {
  // Resolve at default options so a parametric faceplate reports the roles
  // of its default size, and note the option that changes them.
  const resolved = resolveFaceplate(faceplate, {});
  const roles = [
    ...new Set(resolved.regions.map((r) => r.role).filter(Boolean)),
  ].sort();

  const entry = {
    id: faceplate.id,
    name: faceplate.name,
    card: faceplate.card,
    description: faceplate.description ?? "",
    emulates: faceplate.emulates ?? null,
    pages: faceplate.pages ?? [],
    roles,
  };
  if (faceplate.options?.length) {
    entry.options = faceplate.options.map((o) => ({
      key: o.key, label: o.label, type: o.type,
      min: o.min, max: o.max, default: o.default,
    }));
    entry.roles_vary_with_options = true;
  }
  return entry;
});

mkdirSync("faceplates", { recursive: true });
writeFileSync(
  "faceplates/index.json",
  JSON.stringify(
    { generated: new Date().toISOString().slice(0, 10),
      faceplates: entries.sort((a, b) => a.id.localeCompare(b.id)) },
    null, 2,
  ) + "\n",
);
console.log(`catalogue: ${entries.length} faceplates`);
