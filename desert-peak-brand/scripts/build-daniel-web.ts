/**
 * Website lockups for Daniel's concept (v1 badge) set in the brand's own wordmark: the outlined Archivo
 * "Desert Peak / INSURANCE" from brand/logos/wordmark.svg, arranged exactly like brand/logos/logo-horizontal.svg
 * (badge left, text block vertically centred, one gap unit between) plus a stacked version.
 * The badge geometry is v1's; the ring stroke is thickened for header sizes.
 * Writes brand/logo/daniel-refined/web/. Usage: node scripts/build-daniel-web.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { CACHE, ROOT, dataUri, htmlForSvg, logoInner, logoViewBox, pngSize, prim, renderAll, sem, type RenderJob } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const { optimize } = require("svgo");
const OUT = join(ROOT, "brand", "logo", "daniel-refined", "web");
mkdirSync(join(OUT, "tests"), { recursive: true });
const r = (n: number) => Math.round(n * 100) / 100;

const C = { ink: sem("ink"), muted: sem("ink-muted"), snow: sem("surface-raised"), cactus: prim("positive.500"), ground: sem("surface"), light: sem("ink-inverse"), dark: sem("surface-inverse"), brand: sem("brand") };

// ---------------------------------------------------------------------------
// v1 badge geometry (400×400), ring stroke 8 for web (v1 print/stacked keeps 6)
// ---------------------------------------------------------------------------
const U = 8, CX = 200, CY = 200, R = 196 - U / 2;
const APEX = { x: 200, y: 102 }, BASE_Y = 324, BASE_L = 46, BASE_R = 354, SNOW_Y = 156;
const PEAK2 = { apex: { x: 282, y: 196 }, baseR: 338 };
const half = (y: number) => ((y - APEX.y) / (BASE_Y - APEX.y)) * (APEX.x - BASE_L);
const hw = r(half(SNOW_Y)), xl = r(APEX.x - hw), xr = r(APEX.x + hw), d = 9, w = (hw * 2) / 3;
const SNOW = `M ${APEX.x} ${APEX.y} L ${xr} ${SNOW_Y} ${[0, 1, 2].map((i) => `Q ${r(xr - w * (i + 0.5))} ${SNOW_Y + d} ${r(xr - w * (i + 1))} ${i === 2 ? SNOW_Y : SNOW_Y - 3}`).join(" ")} Z`;
const T = { x: 188, w: 24, top: 158 }, A = 20, RA = 10;
const CACTUS = `<rect x="${T.x}" y="${T.top}" width="${T.w}" height="${BASE_Y - T.top}" rx="${T.w / 2}"/><rect x="${T.x}" y="${BASE_Y - 40}" width="${T.w}" height="40"/><rect x="226" y="180" width="${A}" height="${216 - 180 + A}" rx="${RA}"/><rect x="${T.x + T.w - 4}" y="${216 - A / 2 - 2}" width="${226 + A - (T.x + T.w) + 4}" height="${A}" rx="${RA}"/><rect x="154" y="216" width="${A}" height="${250 - 216 + A}" rx="${RA}"/><rect x="154" y="${250 - A / 2 - 2}" width="${T.x - 154 + 4}" height="${A}" rx="${RA}"/>`;
const PEAK = `${APEX.x},${APEX.y} ${BASE_R},${BASE_Y} ${BASE_L},${BASE_Y}`;
const PEAK2_PTS = `${PEAK2.apex.x},${PEAK2.apex.y} ${PEAK2.baseR},${BASE_Y} ${r(PEAK2.apex.x - (PEAK2.baseR - PEAK2.apex.x))},${BASE_Y}`;
type Fills = { ring: string; peak: string; peak2: string; snow: string; cactus: string };
function badge(f: Fills, single = false): string {
  const p: string[] = [`<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${f.ring}" stroke-width="${U}"/>`];
  if (single) {
    p.push(`<polygon fill="none" stroke="${f.peak2}" stroke-width="${U * 0.75}" stroke-linejoin="round" points="${PEAK2_PTS}"/>`);
    p.push(`<mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><rect width="400" height="400" fill="#FFFFFF"/><path fill="#000000" d="${SNOW}"/><g fill="#000000">${CACTUS}</g></mask>`);
    p.push(`<polygon fill="${f.peak}" mask="url(#m)" points="${PEAK}"/>`);
    p.push(`<path fill="none" stroke="${f.peak}" stroke-width="${U / 2}" stroke-linejoin="round" d="M ${xl} ${SNOW_Y} L ${APEX.x} ${APEX.y} L ${xr} ${SNOW_Y}"/>`);
  } else {
    p.push(`<polygon fill="${f.peak2}" points="${PEAK2_PTS}"/>`, `<polygon fill="${f.peak}" points="${PEAK}"/>`, `<path fill="${f.snow}" d="${SNOW}"/>`, `<g fill="${f.cactus}">${CACTUS}</g>`);
  }
  return p.join("");
}

// ---------------------------------------------------------------------------
// The brand wordmark, verbatim paths from brand/logos/wordmark.svg (Archivo, outlined), recoloured per variant
// ---------------------------------------------------------------------------
const WM = logoViewBox("wordmark.svg");                       // 250.12 × 46
const wordmark = (fill: string) => logoInner("wordmark.svg").replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${fill}"`);

// ---------------------------------------------------------------------------
// Lockups. Horizontal follows brand/logos/logo-horizontal.svg: mark left, gap 20 at mark height 59 → here the
// badge is 1.5× the text block (69 units) so its ring survives at header size; gap = 20 × 69/59.
// ---------------------------------------------------------------------------
const svg = (w: number, h: number, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-labelledby="t"><title id="t">Desert Peak Insurance</title>${body}</svg>\n`;
const BH = 69, BS = BH / 400, GAP = r(20 * (BH / 59));
const hzW = BH + GAP + WM.w, hzH = BH;
const horizontal = (f: Fills, text: string, single = false) => svg(hzW, hzH, `<g transform="scale(${r(BS)})">${badge(f, single)}</g><g data-logo="wordmark.svg" transform="translate(${r(BH + GAP)} ${r((BH - WM.h) / 2)})">${wordmark(text)}</g>`);
const stW = Math.max(200, WM.w), stH = 200 + 24 + WM.h;
const stacked = (f: Fills, text: string, single = false) => svg(stW, stH, `<g transform="translate(${r((stW - 200) / 2)} 0) scale(0.5)">${badge(f, single)}</g><g data-logo="wordmark.svg" transform="translate(${r((stW - WM.w) / 2)} ${200 + 24})">${wordmark(text)}</g>`);

const colour: Fills = { ring: C.ink, peak: C.ink, peak2: C.muted, snow: C.snow, cactus: C.cactus };
const mono = (f: string): Fills => ({ ring: f, peak: f, peak2: f, snow: f, cactus: f });
const files: Record<string, string> = {
  "logo-horizontal.svg": horizontal(colour, C.ink),
  "logo-horizontal-reversed.svg": horizontal(mono(C.light), C.light, true),
  "logo-horizontal-mono.svg": horizontal(mono("currentColor"), "currentColor", true),
  "logo-stacked.svg": stacked(colour, C.ink),
  "logo-stacked-reversed.svg": stacked(mono(C.light), C.light, true),
};
const svgoConfig = { multipass: true, plugins: [{ name: "preset-default", params: { overrides: { cleanupIds: false, convertPathData: { floatPrecision: 2 }, cleanupNumericValues: { floatPrecision: 2 } } } }] };
const allowed = new Set([C.ink, C.muted, C.snow, C.cactus, C.light].map((h) => h.toUpperCase()));
for (const [name, src] of Object.entries(files)) {
  const a = optimize(src, { path: name, ...svgoConfig }).data, b = optimize(a, { path: name, ...svgoConfig }).data;
  if (a !== b) throw new Error(`svgo not idempotent on ${name}`);
  for (const m of a.replace(/<mask[\s\S]*?<\/mask>/g, "").matchAll(/#[0-9A-Fa-f]{6}/g)) if (!allowed.has(m[0].toUpperCase())) throw new Error(`${name}: off-token ${m[0]}`);
  writeFileSync(join(OUT, name), a + "\n");
}

// ---------------------------------------------------------------------------
// Raster tests at header sizes and comparison against the Strata reference lockup
// ---------------------------------------------------------------------------
const jobs: RenderJob[] = [];
const SIZES = [24, 32, 40, 64, 96];
mkdirSync(join(CACHE, "daniel-web"), { recursive: true });
for (const name of Object.keys(files)) {
  const s = readFileSync(join(OUT, name), "utf8"); const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)!; const ar = parseFloat(vb[1]) / parseFloat(vb[2]);
  for (const size of SIZES) {
    const h = size, wpx = Math.round(size * ar), g = name.includes("reversed") ? C.dark : C.ground;
    const html = join(CACHE, "daniel-web", `${name}-${size}.html`);
    writeFileSync(html, htmlForSvg(`<div style="width:${wpx}px;height:${h}px;color:${C.ink}">${s.replace("<svg ", `<svg width="${wpx}" height="${h}" `)}</div>`, wpx, h, g));
    jobs.push({ src: html, out: join(OUT, "tests", `${name.replace(".svg", "")}-${size}.png`), w: wpx, h });
  }
}
await renderAll(jobs);
const ref = readFileSync(join(ROOT, "brand", "logos", "logo-horizontal.svg"), "utf8"), refRev = readFileSync(join(ROOT, "brand", "logos", "logo-reversed.svg"), "utf8");
const v1 = readFileSync(join(ROOT, "brand", "logo", "daniel-refined", "logo-primary.svg"), "utf8");
const row = (h: number, g: "light" | "dark" | "brown") => `<div class="lbl">${h} px</div><div class="pair"><figure><span class="r" style="height:${h}px">${g === "light" ? ref : refRev}</span><figcaption>Strata reference</figcaption></figure><figure><span class="r" style="height:${h}px">${g === "light" ? files["logo-horizontal.svg"] : files["logo-horizontal-reversed.svg"]}</span><figcaption>Daniel's badge, brand wordmark</figcaption></figure></div>`;
const sheet = Object.keys(files).map((name) => `<div class="row"><b>${name}</b>${SIZES.map((sz) => { const p = join(OUT, "tests", `${name.replace(".svg", "")}-${sz}.png`); const z = pngSize(p); return `<span><img src="${dataUri(p, "image/png")}" width="${z.w}" height="${z.h}"><i>${sz}px</i></span>`; }).join("")}</div>`).join("");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Daniel's badge with the brand wordmark</title><style>
body{margin:0;font:14px Archivo,"Helvetica Neue",Arial,sans-serif;color:${C.ink};background:${C.ground}}.wrap{max-width:1200px;margin:0 auto;padding:32px 24px}h1{font-size:28px;margin:0 0 4px}p{color:${C.muted};max-width:70ch;margin:0 0 24px}
section{padding:24px;border-radius:4px;margin:0 0 24px}section.light{background:${C.ground};border:1px solid ${sem("border")}}section.dark{background:${C.dark};color:${C.light}}section.brown{background:${C.brand};color:${C.light}}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px;opacity:.8}.pair{display:flex;gap:48px;align-items:center;flex-wrap:wrap;margin-bottom:24px}figure{margin:0;display:flex;flex-direction:column;gap:6px}figcaption{font-size:11px;opacity:.7}.r{display:inline-block}.r svg{height:100%;width:auto;display:block}.lbl{font-size:12px;opacity:.7;margin:0 0 8px}
.row{display:flex;gap:24px;align-items:flex-end;margin:0 0 24px;flex-wrap:wrap}.row b{width:220px;font-size:12px}.row span{display:flex;flex-direction:column;gap:6px}.row i{font-size:11px;opacity:.7}.row img{display:block}
</style></head><body><div class="wrap"><h1>Daniel's badge with the brand wordmark</h1><p>The v1 badge (ring, peak, snow, saguaro) set beside the brand's outlined Archivo wordmark, arranged like the Strata reference lockup. Header sizes 96 / 64 / 40 / 32 / 24 px on light, dark and brand grounds. Self-contained.</p>
${(["light", "dark", "brown"] as const).map((g) => `<section class="${g}"><h2>${g === "brown" ? "brand" : g} ground</h2>${[96, 64, 40, 32, 24].map((h) => row(h, g)).join("")}</section>`).join("")}
<section class="light"><h2>Stacked, and the v1 serif version for reference</h2><div class="pair"><figure><span class="r" style="height:200px">${files["logo-stacked.svg"]}</span><figcaption>stacked, brand wordmark</figcaption></figure><figure><span class="r" style="height:200px">${v1}</span><figcaption>v1 serif</figcaption></figure></div></section>
<section class="light"><h2>Raster tests</h2>${sheet}</section></div></body></html>`;
writeFileSync(join(OUT, "comparison.html"), html);
console.log(`build-daniel-web: ${Object.keys(files).length} SVGs (horizontal ${r(hzW)}×${hzH}, stacked ${r(stW)}×${r(stH)}), ${jobs.length} raster tests`);
