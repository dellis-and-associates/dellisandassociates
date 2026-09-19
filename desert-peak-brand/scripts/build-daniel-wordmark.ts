/**
 * Re-outlines the logo wordmark, leaving the badge byte-for-byte alone.
 *
 * The name is set in Instrument Serif, the brand's display face, and "INSURANCE" in DM Mono, its label
 * face — the same display-plus-label pairing every band on the site opens with. It replaced a Figtree
 * SemiBold wordmark (itself replacing Archivo) that read as UI rather than as an identity: a geometric
 * sans over a serif site is two brands in one lockup. The sub-line is left-aligned to the name rather
 * than centred under it, because a centred, widely tracked sub-line is the small-agency pattern.
 *
 * Only the typesetting changes. The badge group, the lockup height and the vertical centring are the
 * ones already in the files; widths shift with the face, so each lockup's viewBox is recomputed and
 * printed — update src/components/ui/logo.tsx with the new numbers.
 *
 * Usage: node scripts/build-daniel-wordmark.ts [--name-file X.ttf] [--sub-file Y.ttf] [--out <dir>]
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { BRAND, ROOT, sem } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");
const { optimize } = require("svgo");

const arg = (k: string, d?: string) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const WEB = join(ROOT, "brand", "logo", "daniel-refined", "web");
const OUT = arg("out", WEB)!;
const NAME_FILE = arg("name-file", "InstrumentSerif-Regular.ttf")!;
const SUB_FILE = arg("sub-file", "DMMono-Regular.ttf")!;
mkdirSync(OUT, { recursive: true });
const r = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// The wordmark, outlined. Metrics are the ones the current lockups use.
// ---------------------------------------------------------------------------
// The serif carries less negative tracking than a geometric sans, and stands a little taller against the
// badge so the two have the same optical weight; the mono sub-line sits on the name's left edge.
const NAME_CAP = 32, SUB_CAP = 9, NAME_TRACK = -0.005, SUB_TRACK = 0.2, SUB_GAP = 12;
const BLOCK_H = NAME_CAP + SUB_GAP + SUB_CAP;
function outline(file: string, text: string, capHeight: number, trackEm: number): { d: string; w: number } {
  const f = fontkit.openSync(join(BRAND, "fonts", "static", file));
  const size = capHeight / (f.capHeight / f.unitsPerEm), s = size / f.unitsPerEm;
  const run = f.layout(text, ["kern"]);
  let x = 0; const ds: string[] = [];
  run.glyphs.forEach((g: any, i: number) => {
    const p = run.positions[i];
    const d = g.path.transform(s, 0, 0, -s, x + p.xOffset * s, 0).toSVG();
    if (d) ds.push(d);
    x += p.xAdvance * s + trackEm * size;
  });
  return { d: ds.join(" "), w: x - trackEm * size };
}
const NAME = outline(NAME_FILE, "Desert Peak", NAME_CAP, NAME_TRACK);
const SUB = outline(SUB_FILE, "INSURANCE", SUB_CAP, SUB_TRACK);
const WM_W = Math.max(NAME.w, SUB.w);
/** Wordmark at (x, y) where y is the top of the block; the sub-line starts on the name's left edge. */
const wordmark = (x: number, yTop: number, fill: string) =>
  `<g fill="${fill}" data-logo="wordmark.svg"><path transform="translate(${r(x)} ${r(yTop + NAME_CAP)})" d="${NAME.d}"/><path transform="translate(${r(x)} ${r(yTop + BLOCK_H)})" d="${SUB.d}"/></g>`;

const TITLE = `<title id="t">Desert Peak Insurance</title>`;
const svg = (w: number, h: number, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="t" viewBox="0 0 ${r(w)} ${r(h)}">${TITLE}${body}</svg>\n`;

// ---------------------------------------------------------------------------
// Keep each file's badge group verbatim; re-lay the wordmark beside or beneath it
// ---------------------------------------------------------------------------
/** The `<g …>` wrapping the badge, taken byte-for-byte from the current file. */
function badgeGroup(svgText: string): string {
  const i = svgText.indexOf('<circle cx="200"');
  if (i < 0) throw new Error("badge not found");
  const g = svgText.lastIndexOf("<g ", i);
  if (g < 0) throw new Error("badge wrapper not found");
  let depth = 0, j = g;
  const re = /<g\b|<\/g>/g;
  for (;;) {
    re.lastIndex = j;
    const m = re.exec(svgText);
    if (!m) throw new Error("unbalanced badge group");
    depth += m[0] === "</g>" ? -1 : 1;
    j = m.index + m[0].length;
    if (depth === 0) return svgText.slice(g, j);
  }
}
const GAP_H = 22;               // badge to wordmark, horizontal lockup
const BADGE_H = 68;             // badge height in the horizontal lockup (scale .17 of 400)
const H_H = 69;                 // horizontal lockup height
const BADGE_S = 200;            // badge size in the stacked lockup (scale .5 of 400)
const STACK_GAP = 24;

type Job = { file: string; kind: "h" | "s"; fill: string };
const JOBS: Job[] = [
  { file: "logo-horizontal.svg", kind: "h", fill: sem("ink") },
  { file: "logo-horizontal-reversed.svg", kind: "h", fill: sem("ink-inverse") },
  { file: "logo-horizontal-mono.svg", kind: "h", fill: "currentColor" },
  { file: "logo-stacked.svg", kind: "s", fill: sem("ink") },
  { file: "logo-stacked-reversed.svg", kind: "s", fill: sem("ink-inverse") },
];

const svgoConfig = { multipass: true, plugins: [{ name: "preset-default", params: { overrides: { cleanupIds: false, convertPathData: { floatPrecision: 2 }, cleanupNumericValues: { floatPrecision: 2 } } } }] };
const dims: string[] = [];
for (const j of JOBS) {
  const current = readFileSync(join(WEB, j.file), "utf8");
  const badge = badgeGroup(current);
  let out: string;
  if (j.kind === "h") {
    const w = BADGE_H + GAP_H + WM_W;
    out = svg(w, H_H, badge + wordmark(BADGE_H + GAP_H, (H_H - BLOCK_H) / 2, j.fill));
    if (j.file === "logo-horizontal.svg") dims.push(`LOCKUP  { w: ${r(w)}, h: ${H_H} }`);
  } else {
    const w = Math.max(BADGE_S, WM_W), h = BADGE_S + STACK_GAP + BLOCK_H;
    // re-centre the badge for the new width
    const centred = badge.replace(/transform="translate\([\d.]+\)scale\(([\d.]+)\)"/, `transform="translate(${r((w - BADGE_S) / 2)})scale($1)"`);
    out = svg(w, h, centred + wordmark((w - NAME.w) / 2, BADGE_S + STACK_GAP, j.fill));
    if (j.file === "logo-stacked.svg") dims.push(`STACKED { w: ${r(w)}, h: ${r(h)} }`);
  }
  const a = optimize(out, { path: j.file, ...svgoConfig }).data;
  if (optimize(a, { path: j.file, ...svgoConfig }).data !== a) throw new Error(`svgo not idempotent on ${j.file}`);
  writeFileSync(join(OUT, j.file), a + "\n");
  console.log(`  ${j.file.padEnd(30)} ${current.length} -> ${a.length} bytes`);
}
// the wordmark on its own, same outlines
const wmSvg = optimize(svg(WM_W, BLOCK_H, wordmark((WM_W - NAME.w) / 2, 0, sem("ink"))), { path: "wordmark.svg", ...svgoConfig }).data;
writeFileSync(join(OUT, "wordmark.svg"), wmSvg + "\n");

console.log(`build-daniel-wordmark: ${NAME_FILE} + ${SUB_FILE}, "Desert Peak" ${r(NAME.w)} wide, "INSURANCE" ${r(SUB.w)} wide`);
for (const d of dims) console.log(`  update src/components/ui/logo.tsx: ${d}`);
