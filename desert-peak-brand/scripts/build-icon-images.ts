/**
 * Raster images of the logo without text: the badge alone (ring, peaks, snow cap, saguaro) as PNG and
 * JPEG, in the current palette. Sources are the badge-only SVGs in brand/logo/daniel-refined/web
 * (mark.svg, mark-reversed.svg), which are what the site serves from public/brand.
 *
 *   transparent PNG      square, nothing behind it: web, docs, anything that composites
 *   on-surface PNG/JPEG  badge padded on the page colour: avatars, JPEG-only uploads
 *   on-brand PNG/JPEG    reversed badge on navy: dark headers, social avatars
 *
 * JPEG cannot carry transparency, so every JPEG is flattened on a token background.
 * Usage: node scripts/build-icon-images.ts
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { ALLOWED_HEX as ALLOWED, CACHE, ROOT, htmlForSvg, pngSize, prim, renderAll, sem, type RenderJob } from "./collateral/lib.ts";

const WEB = join(ROOT, "brand", "logo", "daniel-refined", "web");
const OUT = join(WEB, "icon");
mkdirSync(OUT, { recursive: true });
mkdirSync(join(CACHE, "icon"), { recursive: true });

const MARK = join(WEB, "mark.svg"), MARK_REV = join(WEB, "mark-reversed.svg");
for (const f of [MARK, MARK_REV]) if (!existsSync(f)) throw new Error(`missing ${f}: the badge-only SVG must live in the brand package (the site's public/brand copies are byte-identical copies of it)`);
const mark = readFileSync(MARK, "utf8"), markRev = readFileSync(MARK_REV, "utf8");
const SURFACE = sem("surface"), BRAND = sem("brand");

/**
 * The badge for a navy ground. The strict single-colour reversal (mark-reversed.svg) cuts the snow and
 * the saguaro out of the peak, which on navy reads as a keyhole rather than a cactus, so the dark-ground
 * badge is two-colour: light peak and ring, the snow as the navy ground showing through, a light slate
 * distant ridge, and the saguaro one step darker (positive-600) so it holds against the light peak.
 * Same geometry: only the fills are remapped, from mark.svg.
 */
const DARK_MAP: Record<string, string> = {
  "#DED6D0": BRAND,                   // beige disc -> the navy ground, so the mountain has something to sit on
  "#1E293B": sem("ink-inverse"),      // ring stroke and mountain -> light
  "#FEFBF9": BRAND,                   // snow -> the navy ground showing through
  "#698E6E": prim("positive.600"),    // saguaro -> one step darker, holds on the light mountain
};
const markOnDark = Object.entries(DARK_MAP).reduce((s, [from, to]) => s.replace(new RegExp(from, "gi"), to), mark);
for (const m of markOnDark.matchAll(/#[0-9A-Fa-f]{6}/g)) if (!ALLOWED.has(m[0].toUpperCase())) throw new Error(`dark badge: off-token ${m[0]}`);

/** A square canvas with the badge scaled to `fraction` of its width. */
function canvas(svg: string, size: number, fraction: number, bg: string | "transparent"): string {
  const inner = Math.round(size * fraction), pad = Math.round((size - inner) / 2);
  const sized = svg.replace("<svg ", `<svg width="${inner}" height="${inner}" `);
  return htmlForSvg(`<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;padding:${pad}px;box-sizing:border-box">${sized}</div>`, size, size, bg);
}

type Variant = { name: string; svg: string; fraction: number; bg: string | "transparent"; jpegBg?: string; sizes: number[]; jpeg: number[]; note: string };
const VARIANTS: Variant[] = [
  { name: "mark", svg: mark, fraction: 1, bg: "transparent", sizes: [256, 512, 1024, 2048], jpeg: [], note: "Badge alone, transparent, edge to edge. Use where the background is already right." },
  { name: "mark-padded", svg: mark, fraction: 0.82, bg: "transparent", sizes: [512, 1024, 2048], jpeg: [], note: "Transparent with 9% breathing room each side, for circular avatar crops." },
  { name: "mark-on-surface", svg: mark, fraction: 0.82, bg: SURFACE, jpegBg: SURFACE, sizes: [512, 1024, 2048], jpeg: [1024, 2048], note: `Badge on the page colour ${SURFACE}. The light profile picture and any JPEG-only upload.` },
  { name: "mark-on-brand", svg: markOnDark, fraction: 0.82, bg: BRAND, jpegBg: BRAND, sizes: [512, 1024, 2048], jpeg: [1024, 2048], note: `Two-colour badge on brand navy ${BRAND}: light peak, sage saguaro. Dark headers and dark-feed avatars.` },
  { name: "mark-reversed", svg: markRev, fraction: 1, bg: "transparent", sizes: [512, 1024, 2048], jpeg: [], note: "Strict single-colour reversal, transparent: one ink for print, stamps and one-colour placements." },
  { name: "mark-on-dark", svg: markOnDark, fraction: 1, bg: "transparent", sizes: [512, 1024, 2048], jpeg: [], note: "Two-colour dark-ground badge, transparent, for compositing on any dark ground." },
];

const jobs: RenderJob[] = [];
for (const v of VARIANTS) for (const size of v.sizes) {
  const html = join(CACHE, "icon", `${v.name}-${size}.html`);
  writeFileSync(html, canvas(v.svg, size, v.fraction, v.bg));
  jobs.push({ src: html, out: join(OUT, `${v.name}-${size}.png`), w: size, h: size, transparent: v.bg === "transparent" });
}
await renderAll(jobs);

// JPEG: flatten the PNG on its token background (JPEG has no alpha), 4:4:4 so the ring edge stays clean.
// Pillow does the encode: this ImageMagick build has no PNG decode delegate.
const toJpeg = (src: string, out: string, bg: string) => execFileSync("python3", ["-c",
  "import sys\nfrom PIL import Image\nsrc,out,bg=sys.argv[1:4]\nim=Image.open(src).convert('RGBA')\nrgb=tuple(int(bg[i:i+2],16) for i in (1,3,5))\nflat=Image.new('RGB',im.size,rgb)\nflat.paste(im,mask=im.split()[3])\nflat.save(out,'JPEG',quality=92,subsampling=0,optimize=True)",
  src, out, bg], { stdio: "pipe" });
const made: { file: string; dims: string; bytes: number; note: string }[] = [];
for (const v of VARIANTS) {
  for (const size of v.sizes) {
    const p = join(OUT, `${v.name}-${size}.png`), z = pngSize(p);
    if (z.w !== size || z.h !== size) throw new Error(`${p} is ${z.w}×${z.h}, expected ${size}×${size}`);
    made.push({ file: `${v.name}-${size}.png`, dims: `${z.w}×${z.h}`, bytes: statSync(p).size, note: v.note });
  }
  for (const size of v.jpeg) {
    const src = join(OUT, `${v.name}-${size}.png`), out = join(OUT, `${v.name}-${size}.jpg`);
    toJpeg(src, out, v.jpegBg!);
    made.push({ file: `${v.name}-${size}.jpg`, dims: `${size}×${size}`, bytes: statSync(out).size, note: `JPEG of the above, flattened on ${v.jpegBg}` });
  }
}

writeFileSync(join(OUT, "README.md"), [
  `# Logo without text — raster images`,
  ``,
  `The badge alone (ring, peaks, snow cap, saguaro), no wordmark. Generated by \`scripts/build-icon-images.ts\` from \`../mark.svg\` and \`../mark-reversed.svg\`, which are the same files the site serves from \`public/brand\`. Colours are the current tokens: ring and peak \`ink\`, far peak \`ink-muted\`, snow \`surface-raised\`, saguaro \`positive\`, navy ground \`brand\` ${BRAND}, light ground \`surface\` ${SURFACE}.`,
  ``,
  `Prefer the SVG wherever it is accepted; these exist for the places that will not take one (uploads, Office, print-shop portals, email clients).`,
  ``,
  `| File | Size | Bytes | Use |`,
  `|---|---|---:|---|`,
  ...made.map((m) => `| ${m.file} | ${m.dims} | ${m.bytes.toLocaleString("en-US")} | ${m.note} |`),
  ``,
  `## Which one`,
  ``,
  `- **Website, app, anything composited**: \`mark-*.png\` (transparent).`,
  `- **Profile picture, light**: \`mark-on-surface-1024.png\`, or the JPEG if the platform insists.`,
  `- **Profile picture, dark feed**: \`mark-on-brand-1024.png\`.`,
  `- **Favicon**: none of these. The badge does not survive 16 px; use \`../../v2/logo-mark-small.svg\` or the site's \`public/favicon.svg\`.`,
  ``,
].join("\n"));

console.log(`build-icon-images: ${made.length} files -> ${OUT}`);
for (const m of made) console.log(`  ${m.file.padEnd(28)} ${m.dims.padEnd(11)} ${(m.bytes / 1024).toFixed(1)} KB`);
