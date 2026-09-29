import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

// One bundle per card, so a dashboard loads only what it uses. The plan
// calls this "selectable install": HACS copies the whole release into
// www/community/, and the choosing happens when resources are added.
const cards = {
  "bms-meter-card": "src/cards/meter/bms-meter-card.ts",
  "hvac-controller-card": "src/cards/hvac/hvac-controller-card.ts",
  "pump-system-card": "src/cards/plant/pump-system-card.ts",
  "audio-zone-card": "src/cards/audio/audio-zone-card.ts",
  "room-controller-card": "src/cards/av/room-controller-card.ts",
  // Not a card: a dashboard/view strategy, added as its own resource.
  "plant-equipment-card": "src/cards/plant/plant-equipment-card.ts",
  "fire-panel-card": "src/cards/fire/fire-panel-card.ts",
  "bridge-devices-strategy": "src/strategy/bridge-devices.ts",
};

const plugins = [
  resolve(),
  typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: true }),
  terser({ format: { comments: false } }),
];

export default [
  ...Object.entries(cards).map(([name, input]) => ({
    input,
    output: { file: `dist/${name}.js`, format: "es", sourcemap: false },
    plugins,
  })),
  // Not a card: the faceplate registry as a plain module, so tooling can
  // enumerate faceplates and their roles by running them rather than by
  // pattern-matching the source. Parametric faceplates build their regions
  // at runtime, so a regex over the source cannot see their roles at all.
  {
    input: "src/faceplates/index.ts",
    output: { file: "dist/faceplates-registry.mjs", format: "es", sourcemap: false },
    plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: true })],
  },
  // Convenience bundle for anyone who would rather add one resource.
  {
    input: "src/all-cards.ts",
    output: { file: "dist/all-cards.js", format: "es", sourcemap: false },
    plugins,
  },
];
