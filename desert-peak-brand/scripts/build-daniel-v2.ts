/**
 * Version 2 of Daniel's concept: same idea (ring, snow-capped peak, saguaro, two-line serif wordmark),
 * with the geometry, shapes and colours redesigned to be better rather than merely cleaned:
 *  - the peak sits off-centre with room inside the ring, a distant ridge behind it for depth;
 *  - the saguaro stands on the flank, not on the summit, so the snow cap is visible;
 *  - the peak is the brand's red rock (hematite), the ridge a lighter haze, the cactus light agave
 *    so it holds against the rock, the snow near-white; ring and wordmark in ink;
 *  - a small-size mark (peak and snow only) for favicons, and a horizontal lockup for headers.
 * Writes brand/logo/daniel-refined/v2/. Usage: node scripts/build-daniel-v2.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { CACHE, ROOT, dataUri, htmlForSvg, pngSize, prim, renderAll, sem, type RenderJob } from "./collateral/lib.ts";
import { contrast } from "./lib.ts";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");
const { optimize } = require("svgo");

const OUT = join(ROOT, "brand", "logo", "daniel-refined", "v2");
mkdirSync(join(OUT, "tests"), { recursive: true });
const r = (n: number) => Math.round(n * 100) / 100;
const U = 8;   // ring stroke = unit

// Colours: artwork may use primitive steps (the token lock only requires token values); text roles stay semantic
const C = { ring: sem("ink"), peak: sem("brand"), ridge: prim("brand.400"), snow: sem("surface-raised"), cactus: prim("positive.400"), name: sem("ink"), sub: sem("brand"), ground: sem("surface"), light: sem("ink-inverse"), dark: sem("surface-inverse") };

// ---------------------------------------------------------------------------
// Badge 400×400. Peak off-centre right, ridge behind right, saguaro front-left on the flank.
// ---------------------------------------------------------------------------
const CX = 200, CY = 200, R = 196 - U / 2;
const APEX = { x: 216, y: 112 }, BASE_Y = 312, BASE_L = 96, BASE_R = 336;
const RIDGE = { apex: { x: 296, y: 192 }, baseR: 348 };
const SNOW_Y = 160;
const slopeX = (y: number, side: -1 | 1) => APEX.x + side * ((y - APEX.y) / (BASE_Y - APEX.y)) * (BASE_R - APEX.x);
function snowPath(): string {
  const xl = r(slopeX(SNOW_Y, -1)), xr = r(slopeX(SNOW_Y, 1));
  // one clean snow line with three teeth, deeper on the sunlit side
  const pts = [[xr, SNOW_Y], [238, 170], [226, 154], [212, 172], [198, 156], [186, 166], [xl, SNOW_Y]];
  return `M ${APEX.x} ${APEX.y} L ${pts.map((p) => p.join(" ")).join(" L ")} Z`;
}
function saguaro(): string {
  // trunk on the flank, arms at two heights, rounded elbows; grounded on the baseline
  const cx = 156, tw = 22, top = 176, aw = 18;
  const trunk = `M ${cx - tw / 2} ${BASE_Y} V ${top + tw / 2} a ${tw / 2} ${tw / 2} 0 0 1 ${tw} 0 V ${BASE_Y} Z`;
  const armR = `M ${cx + tw / 2 - 2} ${228} h ${18} a ${aw / 2} ${aw / 2} 0 0 0 ${aw / 2} -${aw / 2} V 198 a ${aw / 2} ${aw / 2} 0 0 1 ${aw} 0 V ${222} a ${aw} ${aw} 0 0 1 -${aw} ${aw} h -${18 + aw / 2 - 2} Z`;
  const armL = `M ${cx - tw / 2 + 2} ${252} h -${18} a ${aw / 2} ${aw / 2} 0 0 1 -${aw / 2} -${aw / 2} V 222 a ${aw / 2} ${aw / 2} 0 0 0 -${aw} 0 V ${246} a ${aw} ${aw} 0 0 0 ${aw} ${aw} h ${18 + aw / 2 - 2} Z`;
  return `${trunk} ${armR} ${armL}`;
}
const SAGUARO = saguaro();
const SNOW = snowPath();
const PEAK = `${APEX.x},${APEX.y} ${BASE_R},${BASE_Y} ${BASE_L},${BASE_Y}`;
const RIDGE_PTS = `${RIDGE.apex.x},${RIDGE.apex.y} ${RIDGE.baseR},${BASE_Y} ${r(RIDGE.apex.x - (RIDGE.baseR - RIDGE.apex.x))},${BASE_Y}`;

type Fills = { ring: string; peak: string; ridge: string; snow: string; cactus: string };
function badge(f: Fills, single = false): string {
  const parts: string[] = [`<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${f.ring}" stroke-width="${U}"/>`];
  if (single) {
    parts.push(`<polygon fill="none" stroke="${f.ridge}" stroke-width="${U * 0.75}" stroke-linejoin="round" points="${RIDGE_PTS}"/>`);
    parts.push(`<mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><rect width="400" height="400" fill="#FFFFFF"/><path fill="#000000" d="${SNOW}"/><path fill="#000000" d="${SAGUARO}"/></mask>`);
    parts.push(`<polygon fill="${f.peak}" mask="url(#m)" points="${PEAK}"/>`);
    parts.push(`<path fill="none" stroke="${f.peak}" stroke-width="${U / 2}" stroke-linejoin="round" d="M ${r(slopeX(SNOW_Y, -1))} ${SNOW_Y} L ${APEX.x} ${APEX.y} L ${r(slopeX(SNOW_Y, 1))} ${SNOW_Y}"/>`);
    // the part of the saguaro that stands outside the peak silhouette: draw it filled so it does not vanish
    parts.push(`<path fill="${f.peak}" d="${SAGUARO}" clip-path="url(#outside)"/>`);
    parts.unshift(`<clipPath id="outside"><path fill-rule="evenodd" d="M 0 0 H 400 V 400 H 0 Z M ${PEAK.split(" ").map((p) => p.replace(",", " ")).join(" L ")} Z"/></clipPath>`);
  } else {
    parts.push(`<polygon fill="${f.ridge}" points="${RIDGE_PTS}"/>`);
    parts.push(`<polygon fill="${f.peak}" points="${PEAK}"/>`);
    parts.push(`<path fill="${f.snow}" d="${SNOW}"/>`);
    parts.push(`<path fill="${f.cactus}" d="${SAGUARO}"/>`);
  }
  return parts.join("");
}
/** Small-size mark: peak and snow only, no ring, no cactus. Reads at 16 px. */
function smallMark(peak: string, snow: string): string {
  return `<polygon fill="${peak}" points="${PEAK}"/><path fill="${snow}" d="${SNOW}"/>`;
}

// ---------------------------------------------------------------------------
// Wordmark: Source Serif 4 Medium caps, outlined
// ---------------------------------------------------------------------------
const font = fontkit.openSync(join(ROOT, "brand", "fonts", "static", "SourceSerif4-Medium.ttf"));
function outline(text: string, capHeight: number, trackingEm: number): { d: string; width: number } {
  const size = capHeight / (font.capHeight / font.unitsPerEm), s = size / font.unitsPerEm;
  const run = font.layout(text, ["kern"]);
  let x = 0; const ds: string[] = [];
  run.glyphs.forEach((g: any, i: number) => { const pos = run.positions[i]; const d = g.path.transform(s, 0, 0, -s, x + pos.xOffset * s, 0).toSVG(); if (d) ds.push(d); x += pos.xAdvance * s + trackingEm * size; });
  return { d: ds.join(" "), width: x - trackingEm * size };
}
const NAME = outline("DESERT PEAK", 40, 0.1);
const SUB = outline("INSURANCE", 16, 0.36);
const GAP_NAME_SUB = 24;
const wordmark = (x: number, y: number, nameFill: string, subFill: string) =>
  `<g fill="${nameFill}" transform="translate(${r(x)} ${r(y + 40)})"><path d="${NAME.d}"/></g><g fill="${subFill}" transform="translate(${r(x + (NAME.width - SUB.width) / 2)} ${r(y + 40 + GAP_NAME_SUB + 16)})"><path d="${SUB.d}"/></g>`;
const WM_H = 40 + GAP_NAME_SUB + 16;

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------
const svg = (w: number, h: number, title: string, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-labelledby="t"><title id="t">${title}</title>${body}</svg>\n`;
const M = 4 * U, GAP = 10 * U;
const stW = Math.max(400, NAME.width) + 2 * M, stH = M + 400 + GAP + WM_H + M;
const stacked = (f: Fills, nameFill: string, subFill: string, single = false) => svg(stW, stH, "Desert Peak Insurance", `<g transform="translate(${r((stW - 400) / 2)} ${M})">${badge(f, single)}</g>${wordmark((stW - NAME.width) / 2, M + 400 + GAP, nameFill, subFill)}`);
const hzScale = 0.5, hzBadge = 400 * hzScale;
const hzW = M + hzBadge + GAP + NAME.width + M, hzH = M + hzBadge + M;
const horizontal = (f: Fills, nameFill: string, subFill: string, single = false) => svg(hzW, hzH, "Desert Peak Insurance", `<g transform="translate(${M} ${M}) scale(${hzScale})">${badge(f, single)}</g>${wordmark(M + hzBadge + GAP, M + (hzBadge - WM_H) / 2, nameFill, subFill)}`);

const colour: Fills = { ring: C.ring, peak: C.peak, ridge: C.ridge, snow: C.snow, cactus: C.cactus };
const mono = (f: string): Fills => ({ ring: f, peak: f, ridge: f, snow: f, cactus: f });
const files: Record<string, string> = {
  "logo-primary.svg": stacked(colour, C.name, C.sub),
  "logo-horizontal.svg": horizontal(colour, C.name, C.sub),
  "logo-mark.svg": svg(400, 400, "Desert Peak Insurance mark", badge(colour)),
  "logo-mark-small.svg": svg(260, 220, "Desert Peak Insurance", `<g transform="translate(-86 -102)">${smallMark(C.peak, C.snow)}</g>`),
  "logo-wordmark.svg": svg(NAME.width, WM_H, "Desert Peak Insurance", wordmark(0, 0, C.name, C.sub)),
  "logo-mono-dark.svg": stacked(mono(C.ring), C.ring, C.ring, true),
  "logo-mono-light.svg": stacked(mono(C.light), C.light, C.light, true),
  "logo-1bit.svg": stacked(mono("currentColor"), "currentColor", "currentColor", true),
};
const svgoConfig = { multipass: true, plugins: [{ name: "preset-default", params: { overrides: { cleanupIds: false, convertPathData: { floatPrecision: 2 }, cleanupNumericValues: { floatPrecision: 2 } } } }] };
for (const [name, src] of Object.entries(files)) {
  const a = optimize(src, { path: name, ...svgoConfig }).data, b = optimize(a, { path: name, ...svgoConfig }).data;
  if (a !== b) throw new Error(`svgo not idempotent on ${name}`);
  if (/<image|<text|<style|data:image/.test(a)) throw new Error(`${name} contains raster/text/style`);
  writeFileSync(join(OUT, name), a + "\n");
}
// token proof
const allowed = new Set([C.ring, C.peak, C.ridge, C.snow, C.cactus, C.sub, C.ground, C.light].map((h) => h.toUpperCase()));
for (const name of Object.keys(files)) {
  const s = readFileSync(join(OUT, name), "utf8").replace(/<mask[\s\S]*?<\/mask>/g, "");
  for (const m of s.matchAll(/#[0-9A-Fa-f]{6}/g)) if (!allowed.has(m[0].toUpperCase())) throw new Error(`${name}: off-token colour ${m[0]}`);
}

// ---------------------------------------------------------------------------
// Raster tests and comparison (original | v1 | v2)
// ---------------------------------------------------------------------------
const jobs: RenderJob[] = [];
const SIZES = [16, 32, 48, 96];
for (const name of Object.keys(files)) {
  const s = readFileSync(join(OUT, name), "utf8"); const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)!; const ar = parseFloat(vb[1]) / parseFloat(vb[2]);
  for (const size of SIZES) {
    const h = size, w = Math.round(size * ar);
    const g = name.includes("light") ? C.dark : C.ground;
    const html = join(CACHE, "daniel-v2", `${name}-${size}.html`); mkdirSync(join(CACHE, "daniel-v2"), { recursive: true });
    writeFileSync(html, htmlForSvg(`<div style="width:${w}px;height:${h}px;color:${C.ring}">${s.replace("<svg ", `<svg width="${w}" height="${h}" `)}</div>`, w, h, g));
    jobs.push({ src: html, out: join(OUT, "tests", `${name.replace(".svg", "")}-${size}.png`), w, h });
  }
}
await renderAll(jobs);
const sheet = Object.keys(files).map((name) => `<div class="row"><b>${name}</b>${SIZES.map((sz) => { const p = join(OUT, "tests", `${name.replace(".svg", "")}-${sz}.png`); const z = pngSize(p); return `<span><img src="${dataUri(p, "image/png")}" width="${z.w}" height="${z.h}"><img src="${dataUri(p, "image/png")}" width="${z.w * 3}" height="${z.h * 3}" style="image-rendering:pixelated"><i>${sz}px</i></span>`; }).join("")}</div>`).join("");
writeFileSync(join(OUT, "tests", "raster-tests.html"), `<!doctype html><meta charset="utf-8"><title>Raster tests v2</title><style>body{font:12px Archivo,sans-serif;background:${C.ground};color:${C.ring};padding:24px}.row{display:flex;gap:24px;align-items:flex-end;margin:0 0 24px}.row b{width:180px}.row span{display:flex;flex-direction:column;gap:6px}.row i{color:${sem("ink-muted")}}img{display:block}</style><h1>v2 raster tests, 16 / 32 / 48 / 96 px (1× and 3×)</h1>${sheet}`);

const orig = dataUri(join(ROOT, "client", "daniel-logo-concept.jpg"), "image/jpeg");
const v1 = readFileSync(join(ROOT, "brand", "logo", "daniel-refined", "logo-primary.svg"), "utf8"), v1light = readFileSync(join(ROOT, "brand", "logo", "daniel-refined", "logo-mono-light.svg"), "utf8");
const v2 = files["logo-primary.svg"], v2light = files["logo-mono-light.svg"];
const cell = (size: number, g: string) => `<div class="pair"><figure><img src="${orig}" style="height:${size}px" alt="Original"><figcaption>Original</figcaption></figure><figure><span class="r" style="height:${size}px">${g === "light" ? v1 : v1light}</span><figcaption>v1 refined</figcaption></figure><figure><span class="r" style="height:${size}px">${g === "light" ? v2 : v2light}</span><figcaption>v2 redesigned</figcaption></figure></div>`;
const comparison = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Daniel's concept: original, refined, redesigned</title><style>
body{margin:0;font:14px Archivo,"Helvetica Neue",Arial,sans-serif;color:${C.ring};background:${C.ground}}.wrap{max-width:1200px;margin:0 auto;padding:32px 24px}
h1{font-size:28px;margin:0 0 4px}p{color:${sem("ink-muted")};max-width:70ch;margin:0 0 24px}section{padding:24px;border-radius:4px;margin:0 0 24px}
section.light{background:${C.ground};border:1px solid ${sem("border")}}section.dark{background:${C.dark};color:${C.light}}section.brown{background:${C.peak};color:${C.light}}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px;opacity:.8}.pair{display:flex;gap:40px;align-items:flex-end;flex-wrap:wrap;margin-bottom:24px}
figure{margin:0;display:flex;flex-direction:column;gap:6px;align-items:center}figcaption{font-size:11px;opacity:.7}.pair img{display:block;border-radius:4px}.r{display:inline-block}.r svg{height:100%;width:auto;display:block}.lbl{font-size:12px;opacity:.7;margin:0 0 8px}
</style></head><body><div class="wrap"><h1>Daniel's concept: original, refined, redesigned</h1><p>Left: Daniel's JPEG. Middle: the faithful refinement (v1). Right: the redesign (v2), same idea with the geometry, shapes and colours reworked. Sizes 256, 96, 48, 32, 16 px on light, dark and brand grounds. Self-contained.</p>
${(["light", "dark", "brown"] as const).map((g) => `<section class="${g}"><h2>${g === "brown" ? "brand" : g} ground</h2>${[256, 96, 48, 32, 16].map((s) => `<div class="lbl">${s} px</div>${cell(s, g)}`).join("")}</section>`).join("")}
<section class="light"><h2>v2 small-size mark and horizontal lockup</h2><div class="pair"><figure><span class="r" style="height:96px">${files["logo-mark-small.svg"]}</span><figcaption>mark-small 96</figcaption></figure><figure><span class="r" style="height:32px">${files["logo-mark-small.svg"]}</span><figcaption>32</figcaption></figure><figure><span class="r" style="height:16px">${files["logo-mark-small.svg"]}</span><figcaption>16</figcaption></figure><figure><span class="r" style="height:96px">${files["logo-horizontal.svg"]}</span><figcaption>horizontal 96</figcaption></figure><figure><span class="r" style="height:40px">${files["logo-horizontal.svg"]}</span><figcaption>40</figcaption></figure></div></section>
</div></body></html>`;
writeFileSync(join(OUT, "comparison.html"), comparison);

const tokenRows = [["Ring, DESERT PEAK", "ink", C.ring], ["Peak", "brand (brand-600)", C.peak], ["Distant ridge", "brand-400", C.ridge], ["Snow", "surface-raised", C.snow], ["Saguaro", "positive-400", C.cactus], ["INSURANCE", "brand", C.sub]];
writeFileSync(join(CACHE, "daniel-v2", "token-table.md"), ["| Element | Token | Hex | on surface | on surface-inverse | on peak (brand) |", "|---|---|---|---:|---:|---:|", ...tokenRows.map(([e, t, h]) => `| ${e} | \`${t}\` | ${h} | ${contrast(h, C.ground).toFixed(2)} | ${contrast(h, C.dark).toFixed(2)} | ${contrast(h, C.peak).toFixed(2)} |`)].join("\n"));
console.log(`build-daniel-v2: ${Object.keys(files).length} SVGs, ${jobs.length} raster tests`);
