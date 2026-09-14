/**
 * Stage 5.1 — social media kit. Generated from brand/design-tokens.json + brand/logos + content/*.json.
 *
 *   node scripts/build-social.ts                 # everything: profile, banners (+safe zones), post samples, glossary set
 *   node scripts/build-social.ts post --family term --size 1080x1350 --json '{"term":"...","definition":"...","medicare":false}' --out path.svg
 *
 * Every asset's visible text passes bannedGuard() and medicareGuard() before it is written;
 * a Medicare post without the TPMO band does not export. Colours: sem() only. Marks: markBlock()/lockupBlock() only.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import {
  CACHE, ROOT, TODAY, TPMO_TEXT, bannedGuard, config, esc, fitSize, fitTransform, htmlForSvg, lockupBlock, logoViewBox, markBlock, medicareGuard,
  r2, relFonts, renderAll, sem, svgDoc, svgText, wrap, write, writeInventory, type InventoryRow, type RenderJob,
} from "./collateral/lib.ts";

const SOCIAL = join(ROOT, "social");
const rows: InventoryRow[] = [];
const jobs: RenderJob[] = [];
const rel = (p: string) => p.replace(ROOT + "/", "");

// ---------------------------------------------------------------------------
// Specs verified 2026-09-13 (see social/USAGE.md for what could not be fetched from the platform itself)
// ---------------------------------------------------------------------------
const SPECS = {
  profile: { spec: "Profile picture 400×400 minimum (LinkedIn Page logo 400×400; X 400×400)", specUrl: "https://www.linkedin.com/help/linkedin/answer/a563309", checked: TODAY },
  "linkedin-company": { w: 1512, h: 256, spec: "LinkedIn Page cover 1512×256 (recommended)", specUrl: "https://www.linkedin.com/help/linkedin/answer/a563309", checked: TODAY },
  "linkedin-personal": { w: 1584, h: 396, spec: "LinkedIn profile background 1584×396 (recommended)", specUrl: "https://www.linkedin.com/help/linkedin/answer/a568217", checked: TODAY },
  facebook: { w: 820, h: 312, spec: "Facebook Page cover 820×312 desktop, 640×360 mobile crop (official page did not return content to automated fetch; socialsizes.io + snappa.com confirm)", specUrl: "https://www.facebook.com/help/125379114252045", checked: TODAY },
  x: { w: 1500, h: 500, spec: "X header 1500×500 (help.x.com returned 403 to automated fetch; snappa.com + influencermarketinghub.com confirm 1500×500, ~60px top/bottom crop, avatar overlap bottom-left)", specUrl: "https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo", checked: TODAY },
  posts: { spec: "Feed 1080×1080 (1:1), portrait 1080×1350 (4:5), story 1080×1920 (9:16); story UI-safe area = middle 1080×1420 (250px top and bottom reserved)", specUrl: "https://help.instagram.com/1631821640426723", checked: TODAY },
} as const;

type Zone = { x: number; y: number; w: number; h: number; label: string };
type Banner = { key: keyof typeof SPECS & string; w: number; h: number; safe: { x: number; y: number; w: number; h: number }; zones: Zone[] };
const BANNERS: Banner[] = [
  { key: "linkedin-company", w: 1512, h: 256, safe: { x: 370, y: 30, w: 1100, h: 196 }, zones: [
    { x: 0, y: 146, w: 330, h: 110, label: "Page logo overlaps here (desktop)" }, { x: 0, y: 0, w: 1512, h: 24, label: "crop risk (mobile)" }, { x: 0, y: 232, w: 1512, h: 24, label: "crop risk (mobile)" }] },
  { key: "linkedin-personal", w: 1584, h: 396, safe: { x: 510, y: 50, w: 1030, h: 296 }, zones: [
    { x: 0, y: 190, w: 470, h: 206, label: "Profile photo and name card overlap (desktop)" }, { x: 0, y: 0, w: 1584, h: 40, label: "crop risk (mobile)" }, { x: 0, y: 356, w: 1584, h: 40, label: "crop risk (mobile)" }] },
  { key: "facebook", w: 820, h: 312, safe: { x: 215, y: 28, w: 460, h: 256 }, zones: [
    { x: 0, y: 0, w: 133, h: 312, label: "cropped on mobile" }, { x: 687, y: 0, w: 133, h: 312, label: "cropped on mobile" }, { x: 24, y: 196, w: 180, h: 116, label: "profile picture overlap (desktop)" }] },
  { key: "x", w: 1500, h: 500, safe: { x: 450, y: 80, w: 1010, h: 340 }, zones: [
    { x: 0, y: 0, w: 1500, h: 60, label: "may be cropped" }, { x: 0, y: 440, w: 1500, h: 60, label: "may be cropped" }, { x: 0, y: 300, w: 420, h: 200, label: "avatar overlap" }] },
];

const STATES_LINE = config.states.map((s) => (config.stateNames as Record<string, string>)[s]).join(" · ");
const DOMAIN = config.domain;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Write the SVG master and queue a PNG render. The master references ../brand/fonts relatively; the render wrapper references them from .cache. */
function emit(svgPath: string, w: number, h: number, body: string, title: string, text: string, medicare: boolean, opts: { scale?: number; pngPath?: string; extraRows?: Partial<InventoryRow> } = {}): void {
  bannedGuard(rel(svgPath), text);
  medicareGuard(rel(svgPath), text, medicare);
  write(svgPath, svgDoc(w, h, body, { title, fontBase: relFonts(svgPath) }));
  const html = join(CACHE, "social", rel(svgPath).replace(/\//g, "__") + (opts.scale ? `@${opts.scale}x` : "") + ".html");
  write(html, htmlForSvg(svgDoc(w, h, body, { title, fontBase: relFonts(html) }), w, h));
  const png = opts.pngPath ?? svgPath.replace(/\.svg$/, ".png");
  jobs.push({ src: html, out: png, w, h, scale: opts.scale });
  const s = opts.scale ?? 1;
  rows.push({ asset: rel(png), dimensions: `${w * s}×${h * s}`, source: "scripts/build-social.ts", ...opts.extraRows });
  if (!opts.scale) rows.push({ asset: rel(svgPath), dimensions: `${w}×${h} (SVG master)`, source: "scripts/build-social.ts", ...opts.extraRows });
}

// ---------------------------------------------------------------------------
// Profile pictures: mark at 60% of the diameter
// ---------------------------------------------------------------------------
function profile(size: number, reversed: boolean): void {
  const vb = logoViewBox("mark.svg");
  const target = size * 0.6;
  const s = target / Math.max(vb.w, vb.h);
  const w = vb.w * s, h = vb.h * s;
  const body = `<rect width="${size}" height="${size}" fill="${reversed ? sem("brand") : sem("surface")}"/>` +
    markBlock({ fill: reversed ? sem("brand-ink") : sem("brand"), transform: `translate(${r2((size - w) / 2)} ${r2((size - h) / 2)}) scale(${r2(s)})` });
  const name = `profile${reversed ? "-reversed" : ""}-${size}`;
  emit(join(SOCIAL, "profile", `${name}.svg`), size, size, body, `Desert Peak Insurance profile picture ${size}`, "", false,
    { extraRows: { spec: SPECS.profile.spec, specUrl: SPECS.profile.specUrl, checked: TODAY, notes: reversed ? "reversed: mark in brand-ink on brand" : "mark on surface; mark = 60% of diameter" } });
}

// ---------------------------------------------------------------------------
// Banners: positioning line, the four states, the domain. Nothing else.
// ---------------------------------------------------------------------------
function bannerBody(b: Banner, withZones: boolean): { body: string; text: string } {
  const { safe } = b;
  const lk = logoViewBox("logo-horizontal.svg");
  const stacked = safe.w < 700;                         // narrow safe zones (Facebook): lockup above the text
  let lockH = clamp(b.h * 0.42, 56, 120);
  let lockW = (lk.w / lk.h) * lockH;
  if (!stacked && lockW > safe.w * 0.42) { lockW = safe.w * 0.42; lockH = lockW * lk.h / lk.w; }
  if (stacked) { lockH = clamp(b.h * 0.2, 40, 64); lockW = (lk.w / lk.h) * lockH; }
  const gap = clamp(b.h * 0.16, 28, 64);
  const textX = stacked ? safe.x : safe.x + lockW + gap;
  const textW = stacked ? safe.w : safe.x + safe.w - textX;
  const posMax = clamp(Math.round(b.h * 0.15), 22, 56);
  let posSize = fitSize(config.positioningLine, "sans-display", textW, 2, posMax, 18, -0.015);
  let metaSize = clamp(Math.round(b.h * (stacked ? 0.07 : 0.085)), 15, 26);
  const meta = `${STATES_LINE}   ${DOMAIN}`;
  let posLines: string[] = [], metaLines: string[] = [], posBlock = 0, textBlockH = 0, blockH = 0;
  for (;;) {                                            // shrink until the whole block sits inside the safe zone
    posLines = wrap(config.positioningLine, "sans-display", posSize, textW, -0.015);
    metaLines = wrap(meta, "sans-500", metaSize, textW);
    posBlock = posLines.length * posSize * 1.1;
    textBlockH = posBlock + posSize * 0.35 + metaSize * 1.6 * metaLines.length;
    blockH = stacked ? lockH + gap * 0.6 + textBlockH : Math.max(textBlockH, lockH);
    if (blockH <= safe.h || posSize <= 18) break;
    posSize -= 2; if (metaSize > 15) metaSize -= 1;
  }
  if (blockH > safe.h) throw new Error(`REFUSED: banner ${b.key} does not fit its safe zone`);
  const top = safe.y + (safe.h - blockH) / 2;
  const fit = stacked ? fitTransform(lk, { x: safe.x, y: top, w: lockW, h: lockH }, "left") : fitTransform(lk, { x: safe.x, y: top, w: lockW, h: blockH }, "left");
  const textTop = stacked ? top + lockH + gap * 0.6 : top + (blockH - textBlockH) / 2;
  let body = `<rect width="${b.w}" height="${b.h}" fill="${sem("surface")}"/>` + lockupBlock("logo-horizontal.svg", fit.transform) +
    svgText({ x: textX, y: textTop + posSize * 0.95, lines: posLines, size: posSize, family: "sans", weight: 640, stretch: 112, tracking: "-0.015em", fill: sem("ink"), lineHeight: 1.1 }) +
    svgText({ x: textX, y: textTop + posBlock + posSize * 0.35 + metaSize * 1.2, lines: metaLines, size: metaSize, family: "sans", weight: 500, fill: sem("ink-muted"), lineHeight: 1.6 });
  if (withZones) {
    for (const z of b.zones) {
      body += `<rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" fill="${sem("accent")}" fill-opacity="0.35" stroke="${sem("critical")}" stroke-width="2"/>`;
      const ls = clamp(Math.round(b.h * 0.06), 12, 18);
      body += svgText({ x: z.x + 8, y: z.y + ls + 6, lines: [z.label], size: ls, family: "sans", weight: 600, fill: sem("critical"), lineHeight: 1.2 });
    }
    body += `<rect x="${safe.x}" y="${safe.y}" width="${safe.w}" height="${safe.h}" fill="none" stroke="${sem("positive")}" stroke-width="2" stroke-dasharray="8 6"/>`;
    body += svgText({ x: safe.x + 8, y: safe.y + safe.h - 8, lines: ["safe zone"], size: clamp(Math.round(b.h * 0.06), 12, 18), family: "sans", weight: 600, fill: sem("positive"), lineHeight: 1.2 });
  }
  return { body, text: `${config.positioningLine} ${meta}` };
}
function banners(): void {
  for (const b of BANNERS) {
    const spec = SPECS[b.key] as any;
    const { body, text } = bannerBody(b, false);
    const svgPath = join(SOCIAL, "banners", `${b.key}-${b.w}x${b.h}.svg`);
    emit(svgPath, b.w, b.h, body, `Desert Peak Insurance banner ${b.key}`, text, false, { extraRows: { spec: spec.spec, specUrl: spec.specUrl, checked: TODAY } });
    emit(svgPath, b.w, b.h, body, `Desert Peak Insurance banner ${b.key}`, text, false, { scale: 2, pngPath: svgPath.replace(/\.svg$/, "@2x.png"), extraRows: { spec: spec.spec, specUrl: spec.specUrl, checked: TODAY, notes: "2× export of the same master" } });
    const z = bannerBody(b, true);
    emit(join(SOCIAL, "banners", "safe-zone", `${b.key}-${b.w}x${b.h}-safe-zone.svg`), b.w, b.h, z.body, `Safe-zone overlay ${b.key}`, z.text + " " + b.zones.map((q) => q.label).join(" ") + " safe zone", false,
      { extraRows: { spec: spec.spec, specUrl: spec.specUrl, checked: TODAY, notes: "overlay shows crop and overlap regions; not for posting" } });
  }
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------
export type Family = "term" | "state-fact" | "finding" | "seasonal" | "referral";
export type PostInput = { id: string; label: string; headline: string; body?: string; source?: string; quote?: boolean; medicare?: boolean };
const SIZES: Record<string, { w: number; h: number }> = { "1080x1080": { w: 1080, h: 1080 }, "1080x1350": { w: 1080, h: 1350 }, "1080x1920": { w: 1080, h: 1920 } };

export function postBody(size: { w: number; h: number }, p: PostInput, family: Family): { body: string; text: string } {
  const { w, h } = size;
  const story = h === 1920;
  const m = 80;
  const top = story ? 280 : m;
  const bottomLimit = story ? h - 280 : h - m;
  const cw = w - 2 * m;
  const medicare = !!p.medicare;
  const texts: string[] = [];
  let body = `<rect width="${w}" height="${h}" fill="${sem("surface")}"/>`;

  // Medicare band: fixed footer, verbatim TPMO, ≥22px, on surface-sunken
  let footerTop = bottomLimit;
  if (medicare) {
    const ts = 24, pad = 40, lh = 1.45;
    const lines = wrap(TPMO_TEXT, "sans-500", ts, cw);
    const bandH = pad * 2 + lines.length * ts * lh;
    const bandTop = bottomLimit - bandH;
    body += `<rect x="0" y="${r2(bandTop)}" width="${w}" height="${r2(bandH)}" fill="${sem("surface-sunken")}"/>`;
    body += `<rect x="0" y="${r2(bandTop)}" width="${w}" height="2" fill="${sem("border")}"/>`;
    body += svgText({ x: m, y: bandTop + pad + ts * 0.9, lines, size: ts, family: "sans", weight: 500, fill: sem("ink"), lineHeight: lh });
    texts.push(TPMO_TEXT);
    footerTop = bandTop;
  }
  // domain line, bottom-left of the content area
  const domSize = 26;
  const domY = footerTop - (medicare ? 36 : 0) - domSize * 0.3;
  body += svgText({ x: m, y: domY, lines: [DOMAIN], size: domSize, family: "sans", weight: 500, fill: sem("ink-muted"), lineHeight: 1.4 });
  texts.push(DOMAIN);
  let contentBottom = domY - domSize * 1.6;

  // source line (state facts): small but legible, ≥24px, ink-muted
  if (p.source) {
    const ss = 24;
    const sl = wrap(p.source, "sans-400", ss, cw);
    contentBottom -= sl.length * ss * 1.4;
    body += svgText({ x: m, y: contentBottom + ss * 0.9, lines: sl, size: ss, family: "sans", weight: 400, fill: sem("ink-muted"), lineHeight: 1.4 });
    texts.push(p.source);
    contentBottom -= 48;
  }

  // lockup top-left, family label, headline, rule, body
  const lk = logoViewBox("logo-horizontal.svg");
  const lockH = 60;
  const fit = fitTransform(lk, { x: m, y: top, w: (lk.w / lk.h) * lockH, h: lockH }, "left");
  body += lockupBlock("logo-horizontal.svg", fit.transform);
  let y = top + lockH + 96;
  const labelSize = 26;
  body += svgText({ x: m, y: y, lines: [p.label.toUpperCase()], size: labelSize, family: "sans", weight: 500, tracking: "0.08em", fill: sem("ink-muted"), lineHeight: 1.4 });
  texts.push(p.label);
  y += 56;

  if (p.quote) {
    // quote-card: the finding, set large in the serif; no body
    const qs = fitSize(p.headline, "serif-400", cw, 6, 72, 36);
    const ql = wrap(p.headline, "serif-400", qs, cw);
    body += svgText({ x: m, y: y + qs * 0.85, lines: ql, size: qs, family: "serif", weight: 400, fill: sem("ink"), lineHeight: 1.25 });
    texts.push(p.headline);
    y += ql.length * qs * 1.25 + 40;
    body += `<rect x="${m}" y="${r2(y)}" width="120" height="3" fill="${sem("brand")}"/>`;
  } else {
    // headline first, then body; if the body does not fit, the headline gives up size before the body drops below 26px
    let hs = fitSize(p.headline, "sans-display", cw, 3, story ? 104 : 92, 52, -0.015);
    for (;;) {
      const hl = wrap(p.headline, "sans-display", hs, cw, -0.015);
      let yy = y + hl.length * hs * 1.08 + 36 + 56;
      let bs = story ? 44 : 40, bl: string[] = [];
      const lhr = 1.45;
      if (p.body) {
        const avail = contentBottom - yy;
        bl = wrap(p.body, "serif-400", bs, cw);
        while (bl.length * bs * lhr > avail && bs > 26) { bs -= 2; bl = wrap(p.body, "serif-400", bs, cw); }
        if (bl.length * bs * lhr > avail) {
          if (hs > 52) { hs -= 4; continue; }
          throw new Error(`REFUSED: ${family}/${p.id} body does not fit at ${w}×${h} even at 26px with a 52px headline; shorten the text`);
        }
      }
      body += svgText({ x: m, y: y + hs * 0.86, lines: hl, size: hs, family: "sans", weight: 660, stretch: 112, tracking: "-0.015em", fill: sem("ink"), lineHeight: 1.08 });
      texts.push(p.headline);
      y += hl.length * hs * 1.08 + 36;
      body += `<rect x="${m}" y="${r2(y)}" width="120" height="3" fill="${sem("brand")}"/>`;
      y += 56;
      if (p.body) {
        body += svgText({ x: m, y: y + bs * 0.9, lines: bl, size: bs, family: "serif", weight: 400, fill: sem("ink"), lineHeight: lhr });
        texts.push(p.body);
        y += bl.length * bs * lhr;
      }
      break;
    }
  }
  if (y > contentBottom) throw new Error(`REFUSED: ${family}/${p.id} content overruns the ${w}×${h} frame`);
  return { body, text: texts.join(" ") };
}

export function renderPost(family: Family, sizeKey: string, p: PostInput, outSvg: string): void {
  const size = SIZES[sizeKey]; if (!size) throw new Error(`Unknown size ${sizeKey}; use ${Object.keys(SIZES).join(", ")}`);
  const { body, text } = postBody(size, p, family);
  emit(outSvg, size.w, size.h, body, `Desert Peak Insurance post: ${p.headline}`, text, !!p.medicare,
    { extraRows: { spec: SPECS.posts.spec, specUrl: SPECS.posts.specUrl, checked: TODAY, notes: `${family}${p.medicare ? " · Medicare variant (TPMO band)" : ""}` } });
}

// content → PostInput
type Glossary = { terms: { slug: string; term: string; definition: string }[] };
type Facts = { facts: { id: string; state: string; headline: string; fact: string; sourceLine: string }[] };
type Findings = { items: { id: string; text: string; medicare?: boolean }[] };
type Seasonal = { items: { id: string; window: string; headline: string; text: string; medicare?: boolean }[] };
type Referral = { items: { id: string; headline: string; text: string }[] };
const readJson = <T,>(p: string): T => JSON.parse(readFileSync(join(ROOT, "content", p), "utf8"));
const glossary = readJson<Glossary>("glossary.json");
const facts = readJson<Facts>("state-facts.json");
const findings = readJson<Findings>("findings.json");
const seasonal = readJson<Seasonal>("seasonal.json");
const referral = readJson<Referral>("referral.json");
const openEnrollment = seasonal.items.find((i) => i.medicare)!;

const termInput = (t: Glossary["terms"][number]): PostInput => ({ id: t.slug, label: "Term of the week", headline: t.term, body: t.definition });
const factInput = (f: Facts["facts"][number]): PostInput => ({ id: f.id, label: `State fact · ${(config.stateNames as Record<string, string>)[f.state]}`, headline: f.headline, body: f.fact, source: f.sourceLine });
const findingInput = (f: Findings["items"][number]): PostInput => ({ id: f.id, label: "The finding", headline: f.text, quote: true });
const seasonalInput = (s: Seasonal["items"][number]): PostInput => ({ id: s.id, label: `Seasonal · ${s.window}`, headline: s.headline, body: s.text, medicare: !!s.medicare });
/** Medicare sample for families with no Medicare content: the open-enrollment reminder, labelled with the family, TPMO band on. */
const medicareSample = (label: string): PostInput => ({ id: "open-enrollment-medicare", label, headline: openEnrollment.headline, body: openEnrollment.text, medicare: true });

function posts(): string[] {
  const skipped: string[] = [];
  const out = (family: string, sizeKey: string, id: string) => join(SOCIAL, "posts", family, sizeKey, `${id}.svg`);
  const safe = (family: Family, sizeKey: string, p: PostInput) => {
    try { renderPost(family, sizeKey, p, out(family, sizeKey, p.id + (p.medicare ? "-medicare" : ""))); }
    catch (e: any) { if (/banned phrase/.test(e.message)) skipped.push(`${family}/${p.id}: ${e.message.replace(/^REFUSED: /, "")}`); else throw e; }
  };
  for (const sizeKey of Object.keys(SIZES)) {
    safe("term", sizeKey, termInput(glossary.terms[0]));
    safe("term", sizeKey, medicareSample("Term of the week"));
    safe("state-fact", sizeKey, factInput(facts.facts[0]));
    safe("state-fact", sizeKey, { ...medicareSample("State fact"), source: undefined });
    safe("finding", sizeKey, findingInput(findings.items.find((i) => !i.medicare)!));
    safe("finding", sizeKey, { ...findingInput(findings.items.find((i) => i.medicare)!), medicare: true });
    safe("seasonal", sizeKey, seasonalInput(seasonal.items[0]));
    safe("seasonal", sizeKey, seasonalInput(openEnrollment));
  }
  for (const t of glossary.terms) safe("term", "1080x1080", termInput(t));
  for (const f of facts.facts) safe("state-fact", "1080x1080", factInput(f));
  if ((config as any).referralProgramEnabled) {
    for (const sizeKey of Object.keys(SIZES)) for (const r of referral.items) {
      safe("referral", sizeKey, { id: r.id, label: "Referral program", headline: r.headline, body: `${r.text}\n${(config as any).referralDisclaimerSlot}` });
      safe("referral", sizeKey, { id: r.id, label: "Referral program", headline: r.headline, body: `${r.text}\n${(config as any).referralDisclaimerSlot}`, medicare: true });
    }
  } else {
    write(join(SOCIAL, "posts", "referral", "README.md"), `# Referral family: withheld\n\nNot rendered. \`collateral.config.json\` → \`referralProgramEnabled\` is \`false\`, which mirrors the site (every referral program is seeded \`program_enabled: false\` until counsel supplies the reward-rule table and its disclaimer, see the site's REFERRAL-COMPLIANCE.md).\n\nWhen counsel enables it: set the flag to \`true\`, replace \`referralDisclaimerSlot\` with the approved rule-table disclaimer, and run \`pnpm build:social\`. The master carries that disclaimer as the last line of the body; the Medicare variant adds the TPMO band. Content lives in \`content/referral.json\`.\n\nGenerated ${TODAY} by scripts/build-social.ts.\n`);
  }
  return skipped;
}

// ---------------------------------------------------------------------------
// Tests: avatar row (stand-ins committed; the real-avatar render stays in .cache), thumbnail
// ---------------------------------------------------------------------------
function tests(): void {
  const circle = (fill: string) => `<span style="display:inline-block;width:40px;height:40px;border-radius:50%;background:${fill};vertical-align:middle"></span>`;
  const circle32 = (fill: string) => `<span style="display:inline-block;width:32px;height:32px;border-radius:50%;background:${fill};vertical-align:middle"></span>`;
  const p400 = join(SOCIAL, "profile", "profile-400.png"), pr400 = join(SOCIAL, "profile", "profile-reversed-400.png");
  const img = (src: string, s: number) => `<img src="${src}" width="${s}" height="${s}" style="border-radius:50%;vertical-align:middle">`;
  const standIn = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:${sem("surface-raised")};font:13px Archivo,sans-serif;color:${sem("ink-muted")};padding:16px;width:600px">
<style>${readFileSync(join(ROOT, "brand", "dist", "fonts.css"), "utf8").replace(/\.\.\/fonts\//g, "../../brand/fonts/")}</style>
<p style="margin:0 0 10px">40 px, beside three stand-in avatars (neutral circles stand in for carrier marks, which are never committed here)</p>
<div style="display:flex;gap:14px;align-items:center">${img(p400, 40)}${circle(sem("ink-muted"))}${circle(sem("border-strong"))}${circle(sem("accent"))}${img(pr400, 40)}</div>
<p style="margin:18px 0 10px">32 px</p>
<div style="display:flex;gap:12px;align-items:center">${img(p400, 32)}${circle32(sem("ink-muted"))}${circle32(sem("border-strong"))}${circle32(sem("accent"))}${img(pr400, 32)}</div>
<p style="margin:18px 0 10px">on surface-inverse</p>
<div style="display:flex;gap:12px;align-items:center;background:${sem("surface-inverse")};padding:12px">${img(p400, 40)}${img(pr400, 40)}${img(p400, 32)}${img(pr400, 32)}</div></body>`;
  const html = join(CACHE, "social", "avatar-row.html");
  write(html, standIn);
  jobs.push({ src: html, out: join(SOCIAL, "tests", "avatar-row.png"), w: 632, h: 340 });
  rows.push({ asset: "social/tests/avatar-row.png", dimensions: "632×340", source: "scripts/build-social.ts", notes: "profile at 40px and 32px beside neutral stand-ins; real-avatar comparison documented in USAGE.md" });
  // private: real avatars (scratchpad only, never copied into the repo)
  const carriers = "/tmp/claude-1000/-home-abuhaithem-Documents-dellisandassociates-desert-peak-brand/ba44102e-9078-4df6-8331-adb85cc58f07/scratchpad/carriers";
  if (existsSync(carriers)) {
    const av = (f: string, s: number) => `<span style="display:inline-flex;width:${s}px;height:${s}px;border-radius:50%;background:#FEFBF8;align-items:center;justify-content:center;overflow:hidden;vertical-align:middle"><img src="${carriers}/${f}" style="width:${Math.round(s * 0.78)}px"></span>`;
    const real = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:${sem("surface-raised")};padding:16px;width:600px;font:13px sans-serif">
<div style="display:flex;gap:14px;align-items:center">${img(p400, 40)}${av("UnitedHealthcare_(logo).svg", 40)}${av("Aetna_logo.svg", 40)}${av("Humana_logo.svg", 40)}${img(pr400, 40)}</div>
<div style="display:flex;gap:12px;align-items:center;margin-top:16px">${img(p400, 32)}${av("UnitedHealthcare_(logo).svg", 32)}${av("Aetna_logo.svg", 32)}${av("Humana_logo.svg", 32)}${img(pr400, 32)}</div></body>`;
    const rh = join(CACHE, "social", "avatar-row-real.html");
    write(rh, real);
    jobs.push({ src: rh, out: join(CACHE, "social", "avatar-row-real.png"), w: 632, h: 130 });
  }
  // thumbnail check of the square term post at 200px
  const sq = join(SOCIAL, "posts", "term", "1080x1080", `${glossary.terms[0].slug}.svg`);
  if (existsSync(sq)) {
    const thumb = readFileSync(sq, "utf8").replace(/url\("([^"]+)"\)/g, (_, u) => `url("${join(dirname(sq), u)}")`).replace(/width="1080" height="1080"/, 'width="200" height="200"');
    const th = join(CACHE, "social", "thumb.html");
    write(th, htmlForSvg(thumb, 200, 200));
    jobs.push({ src: th, out: join(SOCIAL, "tests", "thumbnail-200.png"), w: 200, h: 200 });
    rows.push({ asset: "social/tests/thumbnail-200.png", dimensions: "200×200", source: "scripts/build-social.ts", notes: "the square term post as a feed thumbnail" });
  }
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
if (argv[0] === "post") {
  const arg = (k: string) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : undefined; };
  const family = arg("family") as Family, sizeKey = arg("size") ?? "1080x1080", json = arg("json"), out = arg("out");
  if (!family || !json || !out) { console.error("usage: node scripts/build-social.ts post --family term|state-fact|finding|seasonal --size 1080x1080 --json '{...}' --out path.svg"); process.exit(2); }
  const j = JSON.parse(json);
  const p: PostInput = family === "term" ? { id: basename(out, ".svg"), label: "Term of the week", headline: j.term, body: j.definition, medicare: !!j.medicare }
    : family === "state-fact" ? { id: basename(out, ".svg"), label: `State fact · ${j.state ?? ""}`.trim(), headline: j.headline, body: j.fact, source: j.sourceLine, medicare: !!j.medicare }
    : family === "finding" ? { id: basename(out, ".svg"), label: "The finding", headline: j.text, quote: true, medicare: !!j.medicare }
    : family === "seasonal" ? { id: basename(out, ".svg"), label: `Seasonal · ${j.window ?? ""}`.trim(), headline: j.headline, body: j.text, medicare: !!j.medicare }
    : (() => { if (!(config as any).referralProgramEnabled) throw new Error("REFUSED: referral family is withheld until collateral.config.json referralProgramEnabled is true"); return { id: basename(out, ".svg"), label: "Referral program", headline: j.headline, body: `${j.text}\n${(config as any).referralDisclaimerSlot}`, medicare: !!j.medicare }; })();
  if (family === "state-fact" && !p.source) throw new Error("REFUSED: state-fact posts require sourceLine (the DOI/statute source is mandatory)");
  renderPost(family, sizeKey, p, out);
  await renderAll(jobs);
  console.log(`build-social: wrote ${out} and ${out.replace(/\.svg$/, ".png")}`);
} else {
  for (const s of [400, 800, 1200]) { profile(s, false); profile(s, true); }
  banners();
  const skipped = posts();
  await renderAll(jobs);            // profile PNGs must exist before the avatar test renders
  jobs.length = 0;
  tests();
  await renderAll(jobs);
  write(join(SOCIAL, "posts", "SKIPPED.md"), `# Skipped by the banned-phrase guard\n\nGenerated ${TODAY}. These items tripped content/banned-phrases.json and were not exported; fix the wording at the content source (the site's glossary drafts or content/*.json) and re-run.\n\n${skipped.length ? skipped.map((s) => `- ${s}`).join("\n") : "_None._"}\n`);
  writeInventory(SOCIAL, rows);
  console.log(`build-social: ${rows.length} inventory rows, ${skipped.length} skipped by the banned-phrase guard`);
}
