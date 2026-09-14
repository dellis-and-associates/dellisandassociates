/**
 * Stage 5.4 — website and UI assets, produced once here so nothing is recreated in app/.
 *
 *   node scripts/build-web.ts                       everything below
 *   node scripts/build-web.ts og --family product-city --title "Auto insurance in Phoenix, Arizona" \
 *        [--subtitle "..."] [--medicare] --out path.png     one OG image from a snippet
 *
 * Sections: logos (PNG 1x/2x, SVGO-optimised SVGs with geometry asserted identical, React components),
 * favicons + app icons + manifest, OG image generator (five templates), transactional email header,
 * ui-elements.html. Every colour is a token (sem()), every mark is the reference file (markBlock/lockupBlock),
 * every Medicare title carries the TPMO band or the generator refuses.
 */
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import {
  CACHE, LOGOS, ROOT, TOKENS_CSS, TPMO_TEXT, TYPE_STEPS, bannedGuard, config, esc, fitSize, fitTransform, fontFaceCss, htmlForSvg, logoInner, logoViewBox,
  markBlock, lockupBlock, medicareGuard, mentionsMedicare, pngSize, r2, relFonts, renderAll, sem, svgDoc, svgText, wrap, write, writeInventory, type InventoryRow, type RenderJob,
} from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const { optimize } = require("svgo");

const WEB = join(ROOT, "web");
const rows: InventoryRow[] = [];
const CHECKED = "2026-09-13";
const bytes = (p: string) => statSync(p).size;
const row = (asset: string, dimensions: string, extra: Partial<InventoryRow> = {}) => rows.push({ asset: `web/${asset}`, dimensions, source: "scripts/build-web.ts", ...extra });

// ---------------------------------------------------------------------------
// Logos: PNG 1x/2x on transparent, rendered straight from brand/logos (no redraw)
// ---------------------------------------------------------------------------
const LOGO_FILES = ["mark.svg", "favicon.svg", "logo-horizontal.svg", "logo-stacked.svg", "logo-reversed.svg", "logo-mono.svg", "wordmark.svg"] as const;
const BASE_HEIGHT: Record<string, number> = { "mark.svg": 64, "favicon.svg": 64, "logo-horizontal.svg": 64, "logo-stacked.svg": 128, "logo-reversed.svg": 64, "logo-mono.svg": 64, "wordmark.svg": 48 };
export async function buildLogoPngs(): Promise<void> {
  const jobs: RenderJob[] = [];
  for (const f of LOGO_FILES) {
    const vb = logoViewBox(f);
    const base = f.replace(".svg", "");
    for (const scale of [1, 2]) {
      const h = BASE_HEIGHT[f] * scale, w = Math.round((vb.w / vb.h) * h);
      let svg = readFileSync(join(LOGOS, f), "utf8").replace(/<svg /, `<svg width="${w}" height="${h}" `);
      if (f === "logo-mono.svg") svg = svg.replace(/<svg /, `<svg color="${sem("ink")}" `);
      const html = join(CACHE, "web", `${base}@${scale}x.html`);
      write(html, htmlForSvg(svg, w, h));
      const out = join(WEB, "logos", `${base}@${scale}x.png`);
      jobs.push({ src: html, out, w, h, transparent: true });
      rows.push({ asset: `web/logos/${base}@${scale}x.png`, dimensions: `${w}×${h}`, source: "scripts/build-web.ts", notes: `${scale}× on transparent${f === "logo-mono.svg" ? ", currentColor rendered as ink" : ""}` });
    }
  }
  await renderAll(jobs);
}

// ---------------------------------------------------------------------------
// Logos: SVGO-optimised copies (geometry asserted byte-identical) and React components
// ---------------------------------------------------------------------------
const geometry = (s: string) => (s.match(/(?:points|d)="[^"]*"/g) ?? []).join("|");
export function buildLogoSvgsAndReact(): void {
  const components: [string, string][] = [["mark.svg", "Mark"], ["favicon.svg", "Favicon"], ["logo-horizontal.svg", "LogoHorizontal"], ["logo-stacked.svg", "LogoStacked"], ["logo-reversed.svg", "LogoReversed"], ["logo-mono.svg", "LogoMono"], ["wordmark.svg", "Wordmark"]];
  const index: string[] = [];
  for (const [file, name] of components) {
    const src = readFileSync(join(LOGOS, file), "utf8");
    const out = optimize(src, { path: file, multipass: false, plugins: ["removeDoctype", "removeXMLProcInst", "removeComments", "removeMetadata", "removeEmptyText", "removeEmptyAttrs"] }).data as string;
    if (geometry(out) !== geometry(src)) throw new Error(`SVGO changed geometry of ${file}; refusing to write`);
    if (!/viewBox=/.test(out) || !/<title/.test(out) || !/aria-labelledby/.test(out)) throw new Error(`SVGO dropped viewBox/title/aria on ${file}`);
    write(join(WEB, "logos", file), out + "\n");
    row(`logos/${file}`, `viewBox ${logoViewBox(file).w}×${logoViewBox(file).h}`, { notes: `SVGO ${require("svgo").VERSION}, geometry asserted identical to brand/logos/${file}; ${bytes(join(WEB, "logos", file))} bytes` });
    // React component: the exact inline <svg>, ids made component-specific so several can share a page
    const id = `dp-${file.replace(".svg", "")}-title`;
    const jsx = out.replace(/\s*\n\s*/g, "").replace(/id="t"/, `id="${id}"`).replace(/aria-labelledby="t"/, `aria-labelledby="${id}"`)
      .replace(/<svg /, "<svg {...props} ").replace(/xmlns="http:\/\/www.w3.org\/2000\/svg" /, "");
    const tsx = `/* GENERATED by scripts/build-web.ts from brand/logos/${file}. Do not edit; the geometry is the locked identity. */\nimport type { SVGProps } from "react";\n\n/** ${name}: inline SVG, scales with width/height or CSS; ${file === "logo-mono.svg" ? "uses currentColor so it inherits the text colour." : "colours are token values."} */\nexport function ${name}(props: SVGProps<SVGSVGElement>) {\n  return (\n    ${jsx}\n  );\n}\n`;
    write(join(WEB, "logos", "react", `${name}.tsx`), tsx);
    index.push(`export { ${name} } from "./${name}.tsx";`);
    row(`logos/react/${name}.tsx`, "inline <svg>", { notes: "React function component; spreads props" });
  }
  write(join(WEB, "logos", "react", "index.ts"), `/* GENERATED by scripts/build-web.ts */\n${index.join("\n")}\n`);
}

// ---------------------------------------------------------------------------
// Favicons, app icons, manifest
// ---------------------------------------------------------------------------
function tileSvg(size: number, markFraction: number): string {
  const vb = logoViewBox("favicon.svg");
  const mw = size * markFraction;
  const t = fitTransform(vb, { x: (size - mw) / 2, y: (size - mw) / 2, w: mw, h: mw });
  return svgDoc(size, size, `<rect width="${size}" height="${size}" fill="${sem("brand")}"/>${markBlock({ variant: "favicon", fill: sem("brand-ink"), transform: t.transform })}`, { title: `${config.company} app icon` });
}
function ico(pngs: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + 16 * pngs.length;
  pngs.forEach((p, i) => {
    const o = i * 16;
    dir.writeUInt8(p.size >= 256 ? 0 : p.size, o); dir.writeUInt8(p.size >= 256 ? 0 : p.size, o + 1);
    dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3); dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(p.data.length, o + 8); dir.writeUInt32LE(offset, o + 12);
    offset += p.data.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.data)]);
}
function verifyIco(buf: Buffer, sizes: number[]): void {
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1 || buf.readUInt16LE(4) !== sizes.length) throw new Error("ICO header wrong");
  sizes.forEach((s, i) => {
    const o = 6 + i * 16;
    const len = buf.readUInt32LE(o + 8), off = buf.readUInt32LE(o + 12);
    const png = buf.subarray(off, off + len);
    if (png.readUInt32BE(0) !== 0x89504e47 || png.readUInt32BE(16) !== s || png.readUInt32BE(20) !== s) throw new Error(`ICO entry ${i} is not a ${s}px PNG`);
  });
}
export async function buildFavicons(): Promise<void> {
  mkdirSync(join(WEB, "favicons"), { recursive: true });
  const FAV = join(WEB, "favicons");
  copyFileSync(join(LOGOS, "favicon.svg"), join(FAV, "favicon.svg"));
  if (readFileSync(join(FAV, "favicon.svg")).equals(readFileSync(join(LOGOS, "favicon.svg"))) === false) throw new Error("favicon.svg copy differs");
  row("favicons/favicon.svg", "viewBox 64×64", { notes: "byte-identical copy of brand/logos/favicon.svg", spec: "SVG favicon via <link rel=icon type=image/svg+xml>" });
  const favSvg = readFileSync(join(LOGOS, "favicon.svg"), "utf8");
  const jobs: RenderJob[] = [];
  for (const s of [16, 32, 48]) {
    const html = join(CACHE, "web", `ico-${s}.html`);
    write(html, htmlForSvg(favSvg.replace(/<svg /, `<svg width="${s}" height="${s}" `), s, s));
    jobs.push({ src: html, out: join(CACHE, "web", `ico-${s}.png`), w: s, h: s, transparent: true });
  }
  const tiles: [string, number, number][] = [["apple-touch-icon.png", 180, 0.6], ["icon-192.png", 192, 0.6], ["icon-512.png", 512, 0.6], ["icon-512-maskable.png", 512, 0.8 * 0.6]];
  for (const [name, size, frac] of tiles) {
    const html = join(CACHE, "web", name.replace(".png", ".html"));
    write(html, htmlForSvg(tileSvg(size, frac), size, size, sem("brand")));
    jobs.push({ src: html, out: join(FAV, name), w: size, h: size });
  }
  // 16px tab-bar test: light strip on surface-sunken, dark strip on surface-inverse
  const tab = (bg: string, fg: string, label: string) => `<div style="background:${bg};color:${fg};padding:8px 10px;display:flex;gap:8px;align-items:center;font:12px Archivo,sans-serif"><span style="display:inline-flex;align-items:center;gap:6px;background:${bg === sem("surface-sunken") ? sem("surface-raised") : sem("ink")};padding:6px 12px;border-radius:8px 8px 0 0"><img src="../../../brand/logos/favicon.svg" width="16" height="16" alt=""> ${config.domain}</span><span style="opacity:.7">${label}</span></div>`;
  const tabHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${fontFaceCss(relFonts(join(CACHE, "web", "tabs.html")))}body{margin:0;width:420px;background:${sem("surface")}}</style></head><body>${tab(sem("surface-sunken"), sem("ink"), "light tab bar, 16 px")}${tab(sem("surface-inverse"), sem("ink-inverse"), "dark tab bar, 16 px")}</body></html>`;
  write(join(CACHE, "web", "tabs.html"), tabHtml);
  jobs.push({ src: join(CACHE, "web", "tabs.html"), out: join(FAV, "tests", "tab-bars.png"), w: 420, h: 84 });
  await renderAll(jobs);
  const pngs = [16, 32, 48].map((s) => ({ size: s, data: readFileSync(join(CACHE, "web", `ico-${s}.png`)) }));
  const icoBuf = ico(pngs); verifyIco(icoBuf, [16, 32, 48]);
  write(join(FAV, "favicon.ico"), icoBuf);
  row("favicons/favicon.ico", "16, 32, 48 px (PNG-encoded ICO entries, 32 bpp)", { notes: `${icoBuf.length} bytes; header and directory verified by the build`, spec: "ICO container; PNG entries supported by every current browser" });
  for (const [name, size, frac] of tiles) {
    const d = pngSize(join(FAV, name)); if (d.w !== size || d.h !== size) throw new Error(`${name} is ${d.w}×${d.h}`);
    const isMask = name.includes("maskable");
    row(`favicons/${name}`, `${size}×${size}`, {
      notes: `reversed three-band mark at ${Math.round(frac * 100)}% width on solid brand tile, square corners (the OS masks)${isMask ? "; mark within the 40%-radius safe circle" : ""}`,
      spec: isMask ? "W3C Web App Manifest: maskable safe zone = circle of radius 40% of icon size" : name.startsWith("apple") ? "apple-touch-icon 180×180 (Apple HIG app icons; page returned no content to automated fetch on the day, size taken from the HIG as published)" : "W3C Web App Manifest icons, purpose any",
      specUrl: isMask ? "https://www.w3.org/TR/appmanifest/" : name.startsWith("apple") ? "https://developer.apple.com/design/human-interface-guidelines/app-icons" : "https://web.dev/articles/maskable-icon", checked: CHECKED,
    });
  }
  const manifest = {
    name: config.company, short_name: config.shortName, start_url: "/", display: "standalone", theme_color: sem("brand"), background_color: sem("surface"),
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
  write(join(FAV, "manifest.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
  row("favicons/manifest.webmanifest", "—", { notes: "theme_color = brand, background_color = surface, icons any + maskable", spec: "W3C Web App Manifest", specUrl: "https://www.w3.org/TR/appmanifest/", checked: CHECKED });
  row("favicons/tests/tab-bars.png", "420×84", { notes: "16 px favicon on light and dark tab strips; looked at during the build" });
}

// ---------------------------------------------------------------------------
// OG images: five templates keyed to the site's page families
// ---------------------------------------------------------------------------
export type OgFamily = "product" | "product-city" | "article" | "glossary" | "state";
export type OgInput = { family: OgFamily; title: string; subtitle?: string; medicare?: boolean };
const KICKER: Record<OgFamily, (i: OgInput) => string> = {
  product: (i) => i.subtitle ?? "Coverage",
  "product-city": (i) => i.subtitle ?? "Local coverage",
  article: (i) => i.subtitle ?? "Insurance 101",
  glossary: () => "Glossary",
  state: (i) => i.subtitle ?? "State requirements",
};
const OG_W = 1200, OG_H = 630, OG_PAD = 72;
export function ogSvg(input: OgInput, fontBase: string): string {
  const medicare = !!input.medicare || mentionsMedicare(input.title + " " + (input.subtitle ?? ""));
  const kicker = KICKER[input.family](input);
  const maxW0 = OG_W - OG_PAD * 2;
  const tpmoSize = 20, tpmoLh = 1.4;
  const tpmoLines = medicare ? wrap(TPMO_TEXT, "sans-400", tpmoSize, maxW0) : [];
  const bandH = medicare ? Math.ceil(28 + tpmoLines.length * tpmoSize * tpmoLh + 24) : 0;   // sized from the wrapped disclaimer, never clipped
  const bodyBottom = OG_H - bandH;
  // mark, top-left, 64 tall
  const mk = fitTransform(logoViewBox("mark.svg"), { x: OG_PAD, y: OG_PAD, w: 80, h: 64 }, "left");
  // headline: Archivo display (stretch 112), ≤ 3 lines
  const maxW = OG_W - OG_PAD * 2;
  const lh = 1.06;
  const kickerY = 196;
  const domainY = bodyBottom - OG_PAD + 8;
  // headline: largest size ≤ 84 whose wrapped block clears the rule above the domain line
  let size = fitSize(input.title, "sans-display", maxW, 3, 84, 44, -0.02);
  let lines = wrap(input.title, "sans-display", size, maxW, -0.02);
  let headY = kickerY + 40 + size * 0.9;
  while (headY + (lines.length - 1) * size * lh + size * 0.3 > domainY - 64 && size > 44) {
    size -= 2; lines = wrap(input.title, "sans-display", size, maxW, -0.02); headY = kickerY + 40 + size * 0.9;
  }
  let body = `<rect width="${OG_W}" height="${OG_H}" fill="${sem("surface")}"/>`;
  body += markBlock({ fill: sem("brand"), transform: mk.transform });
  body += svgText({ x: OG_PAD, y: kickerY, lines: [kicker.toUpperCase()], size: 22, family: "sans", weight: 600, fill: sem("brand"), lineHeight: 1, tracking: "0.08em" });
  body += svgText({ x: OG_PAD, y: headY, lines, size, family: "sans", weight: 660, fill: sem("ink"), lineHeight: lh, tracking: "-0.02em", stretch: 112 });
  body += `<rect x="${OG_PAD}" y="${domainY - 44}" width="48" height="4" fill="${sem("brand")}"/>`;
  body += svgText({ x: OG_PAD, y: domainY, lines: [config.domain], size: 26, family: "sans", weight: 500, fill: sem("ink-muted"), lineHeight: 1 });
  let visible = `${kicker} ${input.title} ${config.domain}`;
  if (medicare) {
    const tl = tpmoLines;
    if (tl.length > 4) throw new Error("TPMO band would need more than 4 lines at 20px; shorten or widen");
    body += `<rect x="0" y="${bodyBottom}" width="${OG_W}" height="${bandH}" fill="${sem("surface-sunken")}"/><rect x="0" y="${bodyBottom}" width="${OG_W}" height="2" fill="${sem("border-strong")}"/>`;
    body += svgText({ x: OG_PAD, y: bodyBottom + 28 + tpmoSize * 0.9, lines: tl, size: tpmoSize, family: "sans", weight: 400, fill: sem("ink"), lineHeight: tpmoLh });
    visible += " " + TPMO_TEXT;
  }
  medicareGuard(`og:${input.family}:${input.title}`, visible, medicare);
  bannedGuard(`og:${input.family}:${input.title}`, visible);
  return svgDoc(OG_W, OG_H, body, { title: `${input.title} — ${config.company}`, fontBase, desc: `Open Graph image, ${input.family} template` });
}
const OG_SAMPLES: OgInput[] = [
  { family: "product", title: "Umbrella insurance", subtitle: "Personal coverage" },
  { family: "product-city", title: "Auto insurance in Phoenix, Arizona", subtitle: "Auto insurance · Phoenix, Arizona" },
  { family: "article", title: "What an umbrella policy actually covers", subtitle: "Insurance 101" },
  { family: "glossary", title: "Deductible" },
  { family: "state", title: "Insurance in Nevada", subtitle: "Nevada" },
];
const OG_MEDICARE_SAMPLE: OgInput = { family: "product", title: "Medicare Advantage in Arizona", subtitle: "Medicare" };
export async function renderOg(input: OgInput, outPng: string, widthPx = OG_W): Promise<void> {
  const html = join(CACHE, "web", "og", `${input.family}-${input.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${widthPx}.html`);
  const h = Math.round((OG_H / OG_W) * widthPx);
  const svg = ogSvg(input, relFonts(html)).replace(`width="${OG_W}" height="${OG_H}"`, `width="${widthPx}" height="${h}"`);
  write(html, htmlForSvg(svg, widthPx, h, sem("surface")));
  await renderAll([{ src: html, out: outPng, w: widthPx, h }]);
}
export async function buildOg(): Promise<void> {
  const OG = join(WEB, "og");
  for (const s of OG_SAMPLES) {
    const master = join(OG, `${s.family}.svg`);
    write(master, ogSvg(s, relFonts(master)));
    await renderOg(s, join(OG, "samples", `${s.family}.png`));
    row(`og/${s.family}.svg`, `${OG_W}×${OG_H}`, { notes: `SVG master, ${s.family} template; sample title "${s.title}"`, spec: "Open Graph image 1200×630 (1.91:1)", specUrl: "https://developers.facebook.com/docs/sharing/webmasters/images/", checked: CHECKED });
    row(`og/samples/${s.family}.png`, `${OG_W}×${OG_H}`, { notes: "rendered sample" });
  }
  const med = join(OG, "product-medicare.svg");
  write(med, ogSvg(OG_MEDICARE_SAMPLE, relFonts(med)));
  await renderOg(OG_MEDICARE_SAMPLE, join(OG, "samples", "product-medicare.png"));
  row("og/product-medicare.svg", `${OG_W}×${OG_H}`, { notes: "Medicare variant: TPMO footer band added automatically (title mentions Medicare)" });
  row("og/samples/product-medicare.png", `${OG_W}×${OG_H}`, { notes: "rendered Medicare sample with TPMO band" });
  await renderOg(OG_SAMPLES[1], join(OG, "samples", "product-city-400.png"), 400);
  row("og/samples/product-city-400.png", "400×210", { notes: "chat-preview legibility check; looked at during the build" });
}

// ---------------------------------------------------------------------------
// Transactional email header (Resend templates)
// ---------------------------------------------------------------------------
export async function buildEmailHeader(): Promise<void> {
  const EH = join(WEB, "email-header");
  const W = 600, H = 100;
  const lk = fitTransform(logoViewBox("logo-horizontal.svg"), { x: 24, y: 24, w: 300, h: 48 }, "left");
  const svg = svgDoc(W, H, `<rect width="${W}" height="${H}" fill="${sem("surface")}"/>${lockupBlock("logo-horizontal.svg", lk.transform)}<rect x="0" y="${H - 2}" width="${W}" height="2" fill="${sem("brand")}"/>`, { title: `${config.company} email header` });
  write(join(EH, "email-header.svg"), svg);
  const jobs: RenderJob[] = [];
  for (const scale of [1, 2]) {
    const html = join(CACHE, "web", `email-header@${scale}x.html`);
    write(html, htmlForSvg(svg, W, H, sem("surface")));
    jobs.push({ src: html, out: join(EH, `email-header@${scale}x.png`), w: W, h: H, scale });
  }
  await renderAll(jobs);
  const b1 = bytes(join(EH, "email-header@1x.png")), b2 = bytes(join(EH, "email-header@2x.png"));
  if (b1 > 30 * 1024) throw new Error(`email-header@1x.png is ${b1} bytes (> 30 KB)`);
  const d2 = pngSize(join(EH, "email-header@2x.png"));
  row("email-header/email-header.svg", `${W}×${H}`, { notes: "master" });
  row("email-header/email-header@1x.png", `${W}×${H}`, { notes: `${b1} bytes (≤ 30 KB asserted); use as the Resend template header at width 600` });
  row("email-header/email-header@2x.png", `${d2.w}×${d2.h}`, { notes: `${b2} bytes; retina, display at 600×100` });
}

// ---------------------------------------------------------------------------
// ui-elements.html: documentation generated from the tokens the site imports
// ---------------------------------------------------------------------------
export async function buildUiElements(): Promise<void> {
  const steps = [...TYPE_STEPS.entries()];
  const typeRows = steps.map(([name, s]) => `<div class="ts"><div class="ts-meta"><code>${name}</code><span class="tab">${s.px}px / ${s.lineHeight} / ${s.letterSpacing}</span><span>${s.family === "sans" ? "Archivo" : "Source Serif 4"} ${s.fontWeight}</span></div><div class="ts-sample" style="font-family:var(--dp-font-${s.family});font-size:${s.fontSize};line-height:${s.lineHeight};letter-spacing:${s.letterSpacing};font-weight:${s.fontWeight};${s.family === "sans" && s.px >= 42 ? "font-stretch:var(--dp-width-display);" : ""}">The analysis costs nothing.</div></div>`).join("\n");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${config.company} — UI elements</title>
<style>
${fontFaceCss("data")}
${TOKENS_CSS}
*,*::before,*::after{box-sizing:border-box}
html{font-optical-sizing:auto}
body{margin:0;background:var(--dp-surface);color:var(--dp-ink);font-family:var(--dp-font-sans);font-size:var(--dp-text-small-size);line-height:var(--dp-text-small-line-height)}
.wrap{max-width:1120px;margin:0 auto;padding:var(--dp-space-8) var(--dp-space-6) var(--dp-space-16)}
h1{font-size:var(--dp-text-headline-size);line-height:var(--dp-text-headline-line-height);letter-spacing:var(--dp-text-headline-letter-spacing);font-weight:var(--dp-text-headline-weight);font-stretch:var(--dp-width-display);margin:0 0 var(--dp-space-2)}
h2{font-size:var(--dp-text-title-lg-size);line-height:var(--dp-text-title-lg-line-height);letter-spacing:var(--dp-text-title-lg-letter-spacing);font-weight:var(--dp-text-title-lg-weight);margin:var(--dp-space-12) 0 var(--dp-space-4);padding-top:var(--dp-space-4);border-top:3px solid var(--dp-ink)}
h3{font-size:var(--dp-text-title-sm-size);line-height:var(--dp-text-title-sm-line-height);letter-spacing:var(--dp-text-title-sm-letter-spacing);font-weight:var(--dp-text-title-sm-weight);margin:var(--dp-space-8) 0 var(--dp-space-3)}
p.meta{color:var(--dp-ink-muted);max-width:var(--dp-measure-body)}
code{font-family:monospace;font-size:.92em;background:var(--dp-surface-sunken);padding:0 .3em;border-radius:var(--dp-radius-control)}
.tab{font-variant-numeric:var(--dp-numeric-tabular)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--dp-space-2);min-height:44px;padding:0 var(--dp-space-5);border-radius:var(--dp-radius-control);border:1px solid transparent;font:600 var(--dp-text-small-size)/1 var(--dp-font-sans);letter-spacing:.005em;cursor:pointer;transition:background var(--dp-duration-fast) var(--dp-ease-standard),color var(--dp-duration-fast) var(--dp-ease-standard)}
.btn-primary{background:var(--dp-brand);color:var(--dp-brand-ink)}
.btn-primary.is-hover,.btn-primary:hover{background:var(--dp-brand-hover)}
.btn-primary.is-active,.btn-primary:active{background:var(--dp-brand-active)}
.btn-secondary{background:transparent;color:var(--dp-ink);border-color:var(--dp-border-strong)}
.btn-secondary.is-hover,.btn-secondary:hover{background:var(--dp-surface-sunken)}
.btn-secondary.is-active,.btn-secondary:active{background:var(--dp-border)}
.btn-ghost{background:transparent;color:var(--dp-brand);padding-inline:var(--dp-space-2)}
.btn-ghost.is-hover,.btn-ghost:hover{color:var(--dp-brand-hover);text-decoration:underline;text-underline-offset:3px}
.btn-ghost.is-active,.btn-ghost:active{color:var(--dp-brand-active);text-decoration:underline;text-underline-offset:3px}
.btn-danger{background:transparent;color:var(--dp-critical);border-color:var(--dp-critical)}
.btn-danger.is-hover,.btn-danger:hover{background:var(--dp-critical-surface)}
.is-focus,:focus-visible{outline:2px solid var(--dp-focus-ring);outline-offset:2px;box-shadow:0 0 0 2px var(--dp-focus-ring-offset)}
.is-disabled,[disabled]{opacity:.45;cursor:not-allowed}
.states{display:flex;flex-wrap:wrap;gap:var(--dp-space-3);align-items:center;margin:var(--dp-space-2) 0 var(--dp-space-5)}
.states>span{font-size:var(--dp-text-caption-size);color:var(--dp-ink-muted);min-width:92px}
.grid{display:grid;gap:var(--dp-space-4);grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.field{display:flex;flex-direction:column;gap:var(--dp-space-1);max-width:320px}
.field label{font-weight:600;font-size:var(--dp-text-small-size)}
.field .help{font-size:var(--dp-text-caption-size);color:var(--dp-ink-muted)}
.input{min-height:44px;padding:0 var(--dp-space-3);border:1px solid var(--dp-border-strong);border-radius:var(--dp-radius-control);background:var(--dp-surface-raised);color:var(--dp-ink);font:400 var(--dp-text-body-size)/1 var(--dp-font-sans)}
.input.is-invalid{border-color:var(--dp-critical);border-width:2px}
.field .error{font-size:var(--dp-text-caption-size);color:var(--dp-critical);font-weight:600}
.ts{display:grid;grid-template-columns:220px 1fr;gap:var(--dp-space-6);padding:var(--dp-space-4) 0;border-bottom:1px solid var(--dp-border);align-items:baseline}
.ts-meta{display:flex;flex-direction:column;gap:2px;color:var(--dp-ink-muted);font-size:var(--dp-text-caption-size)}
.ts-meta code{align-self:flex-start}
.ts-sample{overflow-wrap:anywhere}
table{border-collapse:collapse;font-size:var(--dp-text-small-size)}
th,td{text-align:right;padding:var(--dp-space-2) var(--dp-space-3);border-bottom:1px solid var(--dp-border)}
th{background:var(--dp-surface-sunken);font-size:var(--dp-text-caption-size);text-transform:uppercase;letter-spacing:.06em;color:var(--dp-ink-muted)}
td:first-child,th:first-child{text-align:left}
@media (max-width:720px){.ts{grid-template-columns:1fr;gap:var(--dp-space-2)}}
</style></head><body><div class="wrap">
<p class="meta">UI elements reference · generated by <code>scripts/build-web.ts</code> from <code>brand/design-tokens.json</code></p>
<h1>UI elements</h1>
<p class="meta">This page is documentation, generated from the same tokens the site imports (<code>dist/tokens.css</code>). It is not a second implementation: the class recipes below are the ones in BRAND-GUIDE.md section 5, and the site's components must resolve to the same token values.</p>

<h2>Buttons</h2>
<div class="states"><span>Primary</span><button class="btn btn-primary">Request the analysis</button><button class="btn btn-primary is-hover">Hover</button><button class="btn btn-primary is-active">Pressed</button><button class="btn btn-primary is-focus">Focused</button><button class="btn btn-primary is-disabled">Disabled</button></div>
<div class="states"><span>Secondary</span><button class="btn btn-secondary">See coverage options</button><button class="btn btn-secondary is-hover">Hover</button><button class="btn btn-secondary is-active">Pressed</button><button class="btn btn-secondary is-focus">Focused</button><button class="btn btn-secondary is-disabled">Disabled</button></div>
<div class="states"><span>Ghost</span><button class="btn btn-ghost">Compare limits</button><button class="btn btn-ghost is-hover">Hover</button><button class="btn btn-ghost is-active">Pressed</button><button class="btn btn-ghost is-focus">Focused</button><button class="btn btn-ghost is-disabled">Disabled</button></div>
<div class="states"><span>Destructive</span><button class="btn btn-danger">Remove driver</button><button class="btn btn-danger is-hover">Hover</button><button class="btn btn-danger is-focus">Focused</button><button class="btn btn-danger is-disabled">Disabled</button></div>
<p class="meta">44 px minimum height, <code>radius-control</code>. Destructive actions are outlined in <code>critical</code>, never a solid fill. Focus is a 2 px <code>focus-ring</code> outline offset 2 px, with a 2 px <code>focus-ring-offset</code> halo; the pair passes 3:1 against every surface and against brand.</p>

<h2>Inputs</h2>
<div class="grid">
<div class="field"><label>ZIP code</label><input class="input" value="85251"><span class="help">Default</span></div>
<div class="field"><label>ZIP code</label><input class="input is-focus" value="85251"><span class="help">Focused</span></div>
<div class="field"><label>ZIP code</label><input class="input is-invalid" value="8525"><span class="error">Enter a five-digit ZIP code.</span></div>
<div class="field"><label>ZIP code</label><input class="input is-disabled" value="85251" disabled><span class="help">Disabled</span></div>
</div>

<h2>Type scale</h2>
<p class="meta">Minor third (1.2) on a 17 px base. Each step carries its own line-height and letter-spacing; <code>headline</code> and above use the display width (112).</p>
${typeRows}

<h2>Tabular figures</h2>
<p class="meta">Every numeric column uses <code>font-variant-numeric: tabular-nums</code> (<code>--dp-numeric-tabular</code>). Both families ship <code>tnum</code>.</p>
<table class="tab"><thead><tr><th>Coverage</th><th>Current</th><th>Option A</th></tr></thead><tbody>
<tr><td>Bodily injury, per person</td><td>$100,000</td><td>$250,000</td></tr>
<tr><td>Bodily injury, per accident</td><td>$300,000</td><td>$500,000</td></tr>
<tr><td>Property damage</td><td>$50,000</td><td>$100,000</td></tr>
<tr><td>Collision deductible</td><td>$500</td><td>$1,000</td></tr>
</tbody></table>
<p class="meta">Illustrative figures for layout review only. Not a quote.</p>
</div></body></html>
`;
  write(join(WEB, "ui-elements.html"), html);
  await renderAll([{ src: join(WEB, "ui-elements.html"), out: join(WEB, "ui-elements.png"), w: 1200, h: 2000 }]);
  row("ui-elements.html", "responsive; self-contained (fonts embedded)", { notes: `${bytes(join(WEB, "ui-elements.html"))} bytes; documentation, not a second implementation` });
  row("ui-elements.png", "1200×2000", { notes: "render for the showcase" });
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs(argv: string[]): Record<string, string | true> {
  const out: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) { const k = a.slice(2); const v = argv[i + 1]; if (v && !v.startsWith("--")) { out[k] = v; i++; } else out[k] = true; }
  }
  return out;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv[2] === "og") {
    const a = parseArgs(process.argv.slice(3));
    const family = a.family as OgFamily;
    if (!family || !(family in KICKER) || typeof a.title !== "string" || typeof a.out !== "string") { console.error(`usage: node scripts/build-web.ts og --family <${Object.keys(KICKER).join("|")}> --title "..." [--subtitle "..."] [--medicare] --out file.png`); process.exit(2); }
    await renderOg({ family, title: a.title, subtitle: typeof a.subtitle === "string" ? a.subtitle : undefined, medicare: a.medicare === true }, a.out);
    console.log(`og: ${a.out}`);
  } else {
    await buildLogoPngs();
    buildLogoSvgsAndReact();
    await buildFavicons();
    await buildOg();
    await buildEmailHeader();
    await buildUiElements();
    writeInventory(WEB, rows);
    console.log(`build-web: ${rows.length} assets -> web/`);
  }
}
