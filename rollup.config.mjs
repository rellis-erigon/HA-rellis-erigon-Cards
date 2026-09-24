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
  // Convenience bundle for anyone who would rather add one resource.
  {
    input: "src/all-cards.ts",
    output: { file: "dist/all-cards.js", format: "es", sourcemap: false },
    plugins,
  },
];
