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

/**
 * Every role a faceplate can ever bind, not just the ones its default
 * shape happens to have.
 *
 * Resolving at defaults alone under-reports a parametric faceplate: a tank
 * set defaulting to two tanks never mentions tank3_level, and a consumer
 * validating against that list rejects a perfectly good binding. So build
 * at the bottom, the middle and the top of every option's range and take
 * the union. A mixer declares all sixteen channels, a tank farm all four.
 */
function allRoles(faceplate) {
  const options = faceplate.options ?? [];
  const shapes = [{}];
  if (options.length) {
    for (const pick of ["min", "default", "max"]) {
      shapes.push(Object.fromEntries(options.map((o) => [o.key, o[pick]])));
    }
    // Also each option at its maximum on its own: two options can be
    // mutually exclusive in the drawing, and taking both to the top at
    // once could leave one of them out.
    for (const o of options) {
      shapes.push({ ...Object.fromEntries(
        options.map((x) => [x.key, x.default])), [o.key]: o.max });
    }
  }
  const roles = new Set();
  for (const shape of shapes) {
    for (const region of resolveFaceplate(faceplate, shape).regions) {
      if (region.role) roles.add(region.role);
    }
  }
  return [...roles].sort();
}

const entries = FACEPLATES.map((faceplate) => {
  const roles = allRoles(faceplate);

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
    // What the default shape actually draws, for a picker that wants to
    // show the common case rather than everything possible.
    entry.roles_at_default = [
      ...new Set(resolveFaceplate(faceplate, {}).regions
        .map((r) => r.role).filter(Boolean)),
    ].sort();
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
