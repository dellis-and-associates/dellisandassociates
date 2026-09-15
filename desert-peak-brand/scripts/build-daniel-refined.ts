/**
 * Refines Daniel's logo concept (client/daniel-logo-concept.jpg) to clean vector without changing its
 * identity: same ring, two peaks, snow cap, saguaro, two-line serif wordmark, same arrangement.
 * Geometry is traced from measurements of the JPEG onto a 6-unit grid (the ring stroke is the unit);
 * the wordmark is outlined from Source Serif 4 SemiBold (the brand's approved serif) with fontkit;
 * every colour is a brand token. Writes brand/logo/daniel-refined/*.svg, comparison.html, the raster
 * tests and the token table for CHANGES.md. Usage: node scripts/build-daniel-refined.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { CACHE, ROOT, dataUri, htmlForSvg, pngSize, renderAll, sem, type RenderJob } from "./collateral/lib.ts";
import { contrast } from "./lib.ts";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");
const { optimize } = require("svgo");

const OUT = join(ROOT, "brand", "logo", "daniel-refined");
mkdirSync(join(OUT, "tests"), { recursive: true });
const U = 6;                                   // the unit: the ring's stroke weight
const r = (n: number) => Math.round(n * 100) / 100;
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);

// ---------------------------------------------------------------------------
// Colours: concept -> nearest token (see CHANGES.md for the table)
// ---------------------------------------------------------------------------
const C = {
  ring: sem("ink"), peak: sem("ink"), peak2: sem("ink-muted"), snow: sem("surface-raised"), cactus: sem("positive"),
  name: sem("ink"), sub: sem("brand"), ground: sem("surface"), light: sem("ink-inverse"), brown: sem("brand"),
};

// ---------------------------------------------------------------------------
// Badge geometry, 400×400, ring centre (200,200). Concept measurements scaled by 196/222.
// ---------------------------------------------------------------------------
const CX = 200, CY = 200, R_OUT = 196;
const APEX = { x: 200, y: 102 }, BASE_Y = 324, BASE_L = 46, BASE_R = 354;   // main peak
const PEAK2 = { apex: { x: 282, y: 196 }, baseR: 338 };                    // secondary peak, behind and right
const SNOW_Y = 156;                                                         // snow-cap depth (three scallops)
const half = (y: number) => ((y - APEX.y) / (BASE_Y - APEX.y)) * (APEX.x - BASE_L);
function badge(fills: { ring: string; peak: string; peak2: string; snow: string; cactus: string }, oneBit = false): string {
  const parts: string[] = [];
  // ring
  parts.push(`<circle cx="${CX}" cy="${CY}" r="${R_OUT - U / 2}" fill="none" stroke="${fills.ring}" stroke-width="${U}"/>`);
  // secondary peak (its left slope is hidden behind the main peak)
  const p2 = `${PEAK2.apex.x},${PEAK2.apex.y} ${PEAK2.baseR},${BASE_Y} ${r(PEAK2.apex.x - (PEAK2.baseR - PEAK2.apex.x))},${BASE_Y}`;
  parts.push(oneBit ? `<polygon fill="none" stroke="${fills.peak2}" stroke-width="${U}" stroke-linejoin="round" points="${p2}"/>` : `<polygon fill="${fills.peak2}" points="${p2}"/>`);
  // main peak
  // snow cap: the peak's top clipped by three scallops
  const hw = r(half(SNOW_Y)), xl = r(APEX.x - hw), xr = r(APEX.x + hw), y0 = SNOW_Y, d = 9, w = (hw * 2) / 3;
  const scallops = [0, 1, 2].map((i) => `Q ${r(xr - w * (i + 0.5))} ${y0 + d} ${r(xr - w * (i + 1))} ${i === 2 ? y0 : y0 - 3}`).join(" ");
  const snowPath = `M ${APEX.x} ${APEX.y} L ${xr} ${y0} ${scallops} Z`;
  void xl;
  // saguaro: trunk + two arms, one radius, one arm width; grounded on the baseline
  const T = { x: 188, w: 24, top: 158 }, A = 20, RA = 10;
  const trunk = `<rect x="${T.x}" y="${T.top}" width="${T.w}" height="${BASE_Y - T.top}" rx="${T.w / 2}"/>`;
  const trunkSquare = `<rect x="${T.x}" y="${BASE_Y - 40}" width="${T.w}" height="40"/>`;   // square the trunk's foot so it sits on the base line
  const rightArm = `<rect x="226" y="180" width="${A}" height="${216 - 180 + A}" rx="${RA}"/><rect x="${T.x + T.w - 4}" y="${216 - A / 2 - 2}" width="${226 + A - (T.x + T.w) + 4}" height="${A}" rx="${RA}"/>`;
  const leftArm = `<rect x="154" y="216" width="${A}" height="${250 - 216 + A}" rx="${RA}"/><rect x="154" y="${250 - A / 2 - 2}" width="${T.x - 154 + 4}" height="${A}" rx="${RA}"/>`;
  const cactusShapes = `${trunk}${trunkSquare}${rightArm}${leftArm}`;
  if (oneBit) {
    // single colour: the snow cap and the saguaro are cut out of the peak with a mask, so the ground shows through and
    // every element of the concept keeps its silhouette; the apex is kept as a thin outline so the peak is not decapitated
    const id = `m${Math.abs(hash(fills.peak))}`;
    parts.push(`<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><rect width="400" height="400" fill="#FFFFFF"/><path fill="#000000" d="${snowPath}"/><g fill="#000000">${cactusShapes}</g></mask>`);
    parts.push(`<polygon fill="${fills.peak}" mask="url(#${id})" points="${APEX.x},${APEX.y} ${BASE_R},${BASE_Y} ${BASE_L},${BASE_Y}"/>`);
    parts.push(`<path fill="none" stroke="${fills.peak}" stroke-width="${U / 2}" stroke-linejoin="round" d="M ${xl} ${y0} L ${APEX.x} ${APEX.y} L ${xr} ${y0}"/>`);
    return parts.join("");
  }
  parts.push(`<polygon fill="${fills.peak}" points="${APEX.x},${APEX.y} ${BASE_R},${BASE_Y} ${BASE_L},${BASE_Y}"/>`);
  parts.push(`<path fill="${fills.snow}" d="${snowPath}"/>`);
  parts.push(`<g fill="${fills.cactus}">${cactusShapes}</g>`);
  return parts.join("");
}

// ---------------------------------------------------------------------------
// Wordmark: Source Serif 4 SemiBold caps, outlined; tracking as in the concept
// ---------------------------------------------------------------------------
// Source Serif 4 at weight 500 (the concept's serif is a medium weight), instanced from the brand's own variable font
const font = fontkit.openSync(join(ROOT, "brand", "fonts", "static", "SourceSerif4-Medium.ttf"));
function outline(text: string, capHeight: number, trackingEm: number): { d: string; width: number } {
  const size = capHeight / (font.capHeight / font.unitsPerEm);
  const s = size / font.unitsPerEm;
  const run = font.layout(text, ["kern"]);
  let x = 0; const ds: string[] = [];
  run.glyphs.forEach((g: any, i: number) => {
    const pos = run.positions[i];
    const p = g.path.transform(s, 0, 0, -s, x + pos.xOffset * s, 0);   // baseline at y = 0, y up -> down
    const d = p.toSVG(); if (d) ds.push(d);
    x += pos.xAdvance * s + trackingEm * size;
  });
  return { d: ds.join(" "), width: x - trackingEm * size };
}
const NAME = outline("DESERT PEAK", 41, 0.12);
const SUB = outline("INSURANCE", 18, 0.35);

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------
const GAP_RING_NAME = 12 * U, GAP_NAME_SUB = 9 * U, MARGIN = 4 * U;
const lockW = Math.max(400, NAME.width) + 2 * MARGIN;
const lockH = MARGIN + 400 + GAP_RING_NAME + 41 + GAP_NAME_SUB + 18 + MARGIN;
const svg = (w: number, h: number, title: string, body: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" role="img" aria-labelledby="t"><title id="t">${title}</title>${body}</svg>\n`;
const badgeAt = (x: number, y: number, fills: Parameters<typeof badge>[0], oneBit = false) => `<g transform="translate(${r(x)} ${r(y)})">${badge(fills, oneBit)}</g>`;
const wordmarkAt = (x: number, y: number, nameFill: string, subFill: string) =>
  `<g fill="${nameFill}" transform="translate(${r(x)} ${r(y + 41)})"><path d="${NAME.d}"/></g><g fill="${subFill}" transform="translate(${r(x + (NAME.width - SUB.width) / 2)} ${r(y + 41 + GAP_NAME_SUB + 18)})"><path d="${SUB.d}"/></g>`;

const colour = { ring: C.ring, peak: C.peak, peak2: C.peak2, snow: C.snow, cactus: C.cactus };
const mono = (f: string, snow: string) => ({ ring: f, peak: f, peak2: f, snow, cactus: f });
const bx = (lockW - 400) / 2, wx = (lockW - NAME.width) / 2, wy = MARGIN + 400 + GAP_RING_NAME;
const files: Record<string, string> = {
  "logo-primary.svg": svg(lockW, lockH, "Desert Peak Insurance", badgeAt(bx, MARGIN, colour) + wordmarkAt(wx, wy, C.name, C.sub)),
  "logo-mark.svg": svg(400, 400, "Desert Peak Insurance mark", badge(colour)),
  "logo-wordmark.svg": svg(NAME.width, 41 + GAP_NAME_SUB + 18, "Desert Peak Insurance", wordmarkAt(0, 0, C.name, C.sub)),
  "logo-mono-dark.svg": svg(lockW, lockH, "Desert Peak Insurance", badgeAt(bx, MARGIN, mono(C.ring, C.ground), true) + wordmarkAt(wx, wy, C.ring, C.ring)),
  "logo-mono-light.svg": svg(lockW, lockH, "Desert Peak Insurance", badgeAt(bx, MARGIN, mono(C.light, C.peak), true) + wordmarkAt(wx, wy, C.light, C.light)),
  "logo-1bit.svg": svg(lockW, lockH, "Desert Peak Insurance", badgeAt(bx, MARGIN, { ring: "currentColor", peak: "currentColor", peak2: "currentColor", snow: "none", cactus: "currentColor" }, true) + wordmarkAt(wx, wy, "currentColor", "currentColor")),
};

// svgo: geometry-preserving optimisation; must be idempotent and warning-free
const svgoConfig = { multipass: true, plugins: [{ name: "preset-default", params: { overrides: { cleanupIds: false, convertPathData: { floatPrecision: 2 }, cleanupNumericValues: { floatPrecision: 2 } } } }] };
const written: Record<string, number> = {};
for (const [name, src] of Object.entries(files)) {
  const a = optimize(src, { path: name, ...svgoConfig }).data;
  const b = optimize(a, { path: name, ...svgoConfig }).data;
  if (a !== b) throw new Error(`svgo not idempotent on ${name}`);
  if (/<image|<text|<style|data:image/.test(a)) throw new Error(`${name} contains raster/text/style`);
  writeFileSync(join(OUT, name), a + "\n");
  written[name] = a.length;
}

// ---------------------------------------------------------------------------
// Gates: raster at 16/32/48/96 on light, dark, brown; token table
// ---------------------------------------------------------------------------
const jobs: RenderJob[] = [];
const SIZES = [16, 32, 48, 96];
const grounds: Record<string, string> = { light: C.ground, dark: sem("surface-inverse"), brown: C.brown };
for (const name of Object.keys(files)) {
  const s = readFileSync(join(OUT, name), "utf8");
  const vb = s.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)!; const ar = parseFloat(vb[1]) / parseFloat(vb[2]);
  for (const size of SIZES) {
    const h = size, w = Math.round(size * ar);
    const g = name.includes("light") ? "dark" : name.includes("1bit") ? "light" : "light";
    const colourStyle = name.includes("1bit") ? `color:${C.ring};` : "";
    const html = join(CACHE, "daniel", `${name}-${size}.html`);
    mkdirSync(join(CACHE, "daniel"), { recursive: true });
    writeFileSync(html, htmlForSvg(`<div style="width:${w}px;height:${h}px;${colourStyle}">${s.replace("<svg ", `<svg width="${w}" height="${h}" `)}</div>`, w, h, grounds[g]));
    jobs.push({ src: html, out: join(OUT, "tests", `${name.replace(".svg", "")}-${size}.png`), w, h });
  }
}
await renderAll(jobs);
// contact sheet of the raster tests (each variant at each size, magnified 1× and 4×)
const sheetRows = Object.keys(files).map((name) => `<div class="row"><b>${name}</b>${SIZES.map((sz) => { const p = join(OUT, "tests", `${name.replace(".svg", "")}-${sz}.png`); const z = pngSize(p); return `<span><img src="${dataUri(p, "image/png")}" width="${z.w}" height="${z.h}"><img src="${dataUri(p, "image/png")}" width="${z.w * 3}" height="${z.h * 3}" style="image-rendering:pixelated"><i>${sz}px</i></span>`; }).join("")}</div>`).join("");
writeFileSync(join(OUT, "tests", "raster-tests.html"), `<!doctype html><meta charset="utf-8"><title>Raster tests</title><style>body{font:12px Archivo,sans-serif;background:${C.ground};color:${C.ring};padding:24px}.row{display:flex;gap:24px;align-items:flex-end;margin:0 0 24px}.row b{width:180px}.row span{display:flex;flex-direction:column;gap:6px;align-items:flex-start}.row i{color:${sem("ink-muted")}}img{display:block;background:transparent}</style><h1>Raster tests, 16 / 32 / 48 / 96 px (1× and 3× magnified)</h1>${sheetRows}`);

const tokens = [["Ground", "#FBF6F3", "surface", C.ground], ["Ring, main peak, DESERT PEAK", "#1F2A3C", "ink", C.ring], ["Secondary peak", "#3F5266 (est.)", "ink-muted", C.peak2], ["Saguaro", "#6B906F", "positive", C.cactus], ["Snow cap", "#FFFFFF", "surface-raised", C.snow], ["INSURANCE", "#B4532D (est.)", "brand", C.sub], ["Mono light variant", "—", "ink-inverse", C.light], ["1-bit variant", "—", "currentColor", "inherits"]];
const usedHex = new Set<string>();
for (const name of Object.keys(files)) for (const m of readFileSync(join(OUT, name), "utf8").replace(/<mask[\s\S]*?<\/mask>/g, "").matchAll(/#[0-9A-Fa-f]{6}/g)) usedHex.add(m[0].toUpperCase());
const tokenHexes = new Set([C.ring, C.peak2, C.snow, C.cactus, C.sub, C.ground, C.light].map((h) => h.toUpperCase()));
const offToken = [...usedHex].filter((h) => !tokenHexes.has(h));
if (offToken.length) throw new Error(`off-token colours in output: ${offToken.join(", ")}`);
const table = ["| Element | Concept colour | Token | Hex | Contrast on surface | on surface-inverse | on brand |", "|---|---|---|---|---:|---:|---:|",
  ...tokens.map(([el, from, tok, hex]) => `| ${el} | ${from} | \`${tok}\` | ${hex} | ${hex.startsWith("#") ? contrast(hex, C.ground).toFixed(2) : "—"} | ${hex.startsWith("#") ? contrast(hex, sem("surface-inverse")).toFixed(2) : "—"} | ${hex.startsWith("#") ? contrast(hex, C.brown).toFixed(2) : "—"} |`)].join("\n");
writeFileSync(join(CACHE, "daniel", "token-table.md"), table);

// ---------------------------------------------------------------------------
// comparison.html: original beside refined at 256/96/48/32/16 on light, dark, brown
// ---------------------------------------------------------------------------
const orig = dataUri(join(ROOT, "client", "daniel-logo-concept.jpg"), "image/jpeg");
const primary = readFileSync(join(OUT, "logo-primary.svg"), "utf8");
const monoLight = readFileSync(join(OUT, "logo-mono-light.svg"), "utf8");
const cell = (size: number, g: string) => {
  const refined = g === "light" ? primary : monoLight;
  return `<div class="pair"><img src="${orig}" style="height:${size}px" alt="Original"><span class="refined" style="height:${size}px">${refined}</span></div>`;
};
const comparison = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Daniel's concept, refined</title><style>
body{margin:0;font:14px Archivo,"Helvetica Neue",Arial,sans-serif;color:${C.ring};background:${C.ground}}
.wrap{max-width:1200px;margin:0 auto;padding:32px 24px}
h1{font-size:28px;margin:0 0 4px}p{color:${sem("ink-muted")};max-width:70ch;margin:0 0 24px}
section{padding:24px;border-radius:4px;margin:0 0 24px}
section.light{background:${C.ground};border:1px solid ${sem("border")}}section.dark{background:${sem("surface-inverse")};color:${C.light}}section.brown{background:${C.brown};color:${C.light}}
h2{font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px;opacity:.8}
.rowc{display:flex;gap:32px;align-items:flex-end;flex-wrap:wrap;margin-bottom:24px}
.pair{display:flex;gap:16px;align-items:flex-end}.pair img{display:block;border-radius:4px}.refined{display:inline-block}.refined svg{height:100%;width:auto;display:block}
.lbl{font-size:12px;opacity:.7;margin:0 0 8px}
</style></head><body><div class="wrap">
<h1>Daniel's concept, refined</h1><p>Left: the original JPEG. Right: the refined vector (primary lockup on light; the light monochrome on dark and brown). Sizes 256, 96, 48, 32, 16 px. Nothing here loads from the network.</p>
${(["light", "dark", "brown"] as const).map((g) => `<section class="${g}"><h2>${g === "brown" ? "brand" : g} ground</h2>${[256, 96, 48, 32, 16].map((s) => `<div class="lbl">${s} px</div><div class="rowc">${cell(s, g)}</div>`).join("")}</section>`).join("")}
</div></body></html>`;
writeFileSync(join(OUT, "comparison.html"), comparison);
console.log(`build-daniel-refined: ${Object.keys(files).length} SVGs, ${jobs.length} raster tests, lockup ${r(lockW)}×${r(lockH)}, wordmark width ${r(NAME.width)}; sizes: ${Object.entries(written).map(([k, v]) => `${k} ${v} B`).join(", ")}`);
