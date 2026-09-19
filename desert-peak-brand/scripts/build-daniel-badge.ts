/**
 * Updates the badge inside every Desert Peak logo file, on Daniel's notes (2026-09-19):
 *   1. a slightly darker beige disc behind the mountain, so the white snow cap reads;
 *   2. the small peak behind the mountain removed.
 * Everything else is untouched: the ring, the mountain, the snow line, the saguaro, the wordmark,
 * the lockup geometry and each file's viewBox are byte-identical to what they were. The mountain is
 * now clipped to the disc, because with a filled disc its base corners would otherwise stick out
 * past the circle onto the page.
 *
 *   node scripts/build-daniel-badge.ts --disc neutral.200 [--out <dir>]
 *
 * Default --out is brand/logo/daniel-refined/web. Pass a scratch dir to preview without committing.
 */
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, prim, sem } from "./collateral/lib.ts";

const arg = (k: string, d?: string) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const SRC = join(ROOT, "brand", "logo", "daniel-refined", "web");
const OUT = arg("out", SRC)!;
const DISC = prim(arg("disc", "neutral.200")!);
mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------------------
// Geometry, lifted verbatim from the committed artwork (400×400 badge space)
// ---------------------------------------------------------------------------
const MOUNTAIN = "m200 102 154 222H46z";
const SNOW = "m200 102 37.46 54q-12.49 9-24.97-3-12.49 12-24.98 0-12.48 12-24.97 3Z";
const APEX = "M162.54 156 200 102l37.46 54";
const CACTUS = `<rect width="24" height="166" x="188" y="158" rx="12"/><path d="M188 284h24v40h-24z"/><rect width="20" height="56" x="226" y="180" rx="10"/><rect width="38" height="20" x="208" y="204" rx="10"/><rect width="20" height="54" x="154" y="216" rx="10"/><rect width="38" height="20" x="154" y="238" rx="10"/>`;
const DISC_CIRCLE = `<circle cx="200" cy="200" r="192"`;
const CLIP = `<clipPath id="dpc"><circle cx="200" cy="200" r="192"/></clipPath>`;
const MASK = (extra = "") => `<mask id="m" width="400" height="400" x="0" y="0" maskUnits="userSpaceOnUse"><path fill="#fff" d="M0 0h400v400H0z"/><path d="${SNOW}"/>${CACTUS}</mask>${extra}`;

const INK = sem("ink"), SNOW_FILL = sem("surface-raised"), SAGE = prim("positive.500"), LIGHT = sem("ink-inverse");
/** Light badge: beige disc, mountain clipped to it, ring on top. */
const badgeLight = (ink: string, snow: string, sage: string, disc: string) =>
  `${DISC_CIRCLE} fill="${disc}"/>${CLIP}<g clip-path="url(#dpc)"><path fill="${ink}" d="${MOUNTAIN}"/><path fill="${snow}" d="${SNOW}"/><g fill="${sage}">${CACTUS}</g></g>${DISC_CIRCLE} fill="none" stroke="${ink}" stroke-width="8"/>`;
/** Single-colour badge for dark grounds: snow and saguaro cut out of the mountain, ground shows through. */
const badgeSingle = (c: string) =>
  `${CLIP}${MASK()}<g clip-path="url(#dpc)"><path fill="${c}" d="${MOUNTAIN}" mask="url(#m)"/></g><path fill="none" stroke="${c}" stroke-linejoin="round" stroke-width="4" d="${APEX}"/>${DISC_CIRCLE} fill="none" stroke="${c}" stroke-width="8"/>`;

// ---------------------------------------------------------------------------
// Swap the badge block in each file, leaving everything else byte-identical
// ---------------------------------------------------------------------------
type Kind = "light" | "single";
const FILES: { file: string; kind: Kind; colour: string }[] = [
  { file: "mark.svg", kind: "light", colour: INK },
  { file: "logo-horizontal.svg", kind: "light", colour: INK },
  { file: "logo-stacked.svg", kind: "light", colour: INK },
  { file: "mark-reversed.svg", kind: "single", colour: LIGHT },
  { file: "logo-horizontal-reversed.svg", kind: "single", colour: LIGHT },
  { file: "logo-stacked-reversed.svg", kind: "single", colour: LIGHT },
  { file: "logo-horizontal-mono.svg", kind: "single", colour: "currentColor" },
];

/** Locate the badge: from the ring circle to the end of the cactus group (light) or the apex stroke (single). */
function badgeSpan(svg: string, kind: Kind): [number, number] {
  const start = svg.indexOf(DISC_CIRCLE);
  if (start < 0) throw new Error("badge ring not found");
  if (kind === "light") {
    const g = svg.indexOf(`<g fill="`, start);
    const end = svg.indexOf("</g>", g);
    if (g < 0 || end < 0) throw new Error("cactus group not found");
    return [start, end + 4];
  }
  const marker = `d="${APEX}"/>`;
  const end = svg.indexOf(marker, start);
  if (end < 0) throw new Error("apex stroke not found");
  return [start, end + marker.length];
}

const report: string[] = [];
for (const { file, kind, colour } of FILES) {
  const svg = readFileSync(join(SRC, file), "utf8");
  const [a, b] = badgeSpan(svg, kind);
  const old = svg.slice(a, b);
  if (!old.includes("m282 196 56 128H226z")) throw new Error(`${file}: the small back peak was not in the block being replaced`);
  const next = kind === "light" ? badgeLight(colour, SNOW_FILL, SAGE, DISC) : badgeSingle(colour);
  const out = svg.slice(0, a) + next + svg.slice(b);
  if (out.includes("m282 196 56 128H226z")) throw new Error(`${file}: the small back peak survived`);
  if (out.slice(0, a) !== svg.slice(0, a) || out.slice(a + next.length) !== svg.slice(b)) throw new Error(`${file}: content outside the badge changed`);
  writeFileSync(join(OUT, file), out);
  report.push(`  ${file.padEnd(30)} ${svg.length} -> ${out.length} bytes`);
}
// the wordmark is untouched; carry it along so the folder stays complete when previewing elsewhere
if (OUT !== SRC) for (const f of readdirSync(SRC).filter((f) => f.endsWith(".svg") && !FILES.some((x) => x.file === f))) copyFileSync(join(SRC, f), join(OUT, f));

console.log(`build-daniel-badge: disc ${DISC}, small back peak removed, mountain clipped to the disc -> ${OUT}`);
for (const r of report) console.log(r);
