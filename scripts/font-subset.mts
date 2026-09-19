/**
 * pnpm fonts:subset — writes public/fonts/*.woff2 from the brand package's
 * fonts (desert-peak-brand/brand/fonts, OFL 1.1, LICENSES.md), keeping only
 * the glyphs and variable-axis ranges the site renders:
 *   Figtree        wght 400–600 (the editorial text face)
 *   Instrument Serif, DM Mono  single static weights: glyph subset only
 * Glyphs: Basic Latin, Latin-1, Latin Extended-A, general punctuation, €, ™,
 * arrows, minus, fi/fl. The brand files are already Latin subsets; the
 * saving comes from the weight and width ranges (91→50 KB and 193→133 KB).
 * Deterministic: same input → same bytes, so a rerun is a no-op in git.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import subsetFont from "subset-font";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "../desert-peak-brand/brand/fonts");
const dest = join(here, "../public/fonts");
mkdirSync(dest, { recursive: true });

const RANGES: Array<[number, number]> = [
  [0x20, 0x7e], [0xa0, 0x17f], [0x2000, 0x206f], [0x20ac, 0x20ac], [0x2122, 0x2122],
  [0x2190, 0x2199], [0x2212, 0x2212], [0xfb01, 0xfb02],
];
let text = "";
for (const [a, b] of RANGES) for (let c = a; c <= b; c++) text += String.fromCodePoint(c);

// Figtree is variable and kept at the three weights the system uses; Instrument Serif and DM Mono ship as single
// static weights, so only the glyph set is trimmed. Archivo and Source Serif 4 stay in the brand package for print
// and collateral, but the site no longer loads them.
const TEXT = { wght: { min: 400, max: 600 } };
const STATIC = {};
const FILES: Array<[string, Record<string, { min: number; max: number }>]> = [
  ["instrument-serif-400.woff2", STATIC],
  ["figtree-variable.woff2", TEXT],
  ["figtree-italic-variable.woff2", TEXT],
  ["dm-mono-400.woff2", STATIC],
];

for (const [file, variationAxes] of FILES) {
  const input = readFileSync(join(src, file));
  const output = await subsetFont(input, text, { targetFormat: "woff2", variationAxes });
  writeFileSync(join(dest, file), output);
  console.log(`${file.padEnd(36)} ${String(input.length).padStart(7)} → ${String(output.length).padStart(7)} bytes`);
}
