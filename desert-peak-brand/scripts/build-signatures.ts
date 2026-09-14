/**
 * Stage 5.2 — email signatures. Reads people.json and emits, per person, a table-based
 * HTML signature (inline styles only, ≤ 10 KB, one hosted logo PNG, no web fonts), a
 * plain-text fallback, and renders at 600 px, 320 px and in a dark-mode simulation.
 * Also produces the single hosted logo asset (email/email-logo@1x.png, @2x.png, .svg).
 *
 * Nothing here is typed by hand: change people.json or collateral.config.json and re-run.
 * Usage: node scripts/build-signatures.ts
 */
import { readFileSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";
import {
  CACHE, ROOT, TPMO_TEXT, bannedGuard, chrome, config, esc, fitTransform, fullName, htmlForSvg, isTodo, licenseLine, lockupBlock,
  logoViewBox, medicareGuard, people, renderAll, sem, svgDoc, write, writeInventory, type InventoryRow, type Person, type RenderJob,
} from "./collateral/lib.ts";

const EMAIL = join(ROOT, "email");
const MAX_BYTES = 10240;
const FONT_STACK = [...config.fallbackFonts.email.map((f) => (/\s/.test(f) ? `'${f}'` : f)), "sans-serif"].join(",");
const LOGO_URL = `${config.mediaBaseUrl}/email-logo@2x.png`;
const LOGO_W = 200, LOGO_H = 50; // 1× display size; the hosted PNG is 2× (400×100)
const rows: InventoryRow[] = [];

// ---------------------------------------------------------------------------
// 1. Hosted logo asset: the horizontal lockup on a padded surface panel with a hairline edge,
//    so dark-mode clients that invert or darken images keep the mark on its own light ground.
// ---------------------------------------------------------------------------
async function buildLogoAsset(): Promise<void> {
  const natural = logoViewBox("logo-horizontal.svg");
  const pad = 8; // ≥ 24% of the placed mark height (mark ≈ 32.5 px tall → 7.8 px)
  const fit = fitTransform(natural, { x: pad, y: pad, w: LOGO_W - 2 * pad, h: LOGO_H - 2 * pad });
  const body =
    `<rect x="0.5" y="0.5" width="${LOGO_W - 1}" height="${LOGO_H - 1}" fill="${sem("surface")}" stroke="${sem("border")}" stroke-width="1"/>` +
    lockupBlock("logo-horizontal.svg", fit.transform);
  const svg = svgDoc(LOGO_W, LOGO_H, body, { title: "Desert Peak Insurance", desc: "Email signature logo: horizontal lockup on a padded surface panel." });
  write(join(EMAIL, "email-logo.svg"), svg);
  const html = join(CACHE, "email", "email-logo.html");
  write(html, htmlForSvg(svg, LOGO_W, LOGO_H));
  const jobs: RenderJob[] = [
    { src: html, out: join(EMAIL, "email-logo@1x.png"), w: LOGO_W, h: LOGO_H, transparent: true, scale: 1 },
    { src: html, out: join(EMAIL, "email-logo@2x.png"), w: LOGO_W, h: LOGO_H, transparent: true, scale: 2 },
  ];
  await renderAll(jobs);
  rows.push({ asset: "email/email-logo.svg", dimensions: `${LOGO_W}×${LOGO_H}`, source: "scripts/build-signatures.ts", notes: "Master. Lockup on surface panel, 8px padding, 1px border." });
  rows.push({ asset: "email/email-logo@1x.png", dimensions: `${LOGO_W}×${LOGO_H}`, source: "scripts/build-signatures.ts", notes: "Fallback; the signature references the 2× file." });
  rows.push({ asset: "email/email-logo@2x.png", dimensions: `${LOGO_W * 2}×${LOGO_H * 2}`, source: "scripts/build-signatures.ts", notes: `Hosted at ${LOGO_URL} (unconfirmed until the domain is).` });
}

// ---------------------------------------------------------------------------
// 2. Signature HTML and text
// ---------------------------------------------------------------------------
const td = (style: string, inner: string) => `<td style="${style}">${inner}</td>`;
const base = `font-family:${FONT_STACK};font-size:14px;line-height:20px;color:${sem("ink")};`;
const small = `font-family:${FONT_STACK};font-size:12px;line-height:17px;color:${sem("ink-muted")};`;
const link = `color:${sem("brand")};text-decoration:none;`;

function phoneCell(p: Person): string {
  if (isTodo(p.phone)) return esc(p.phone);
  const digits = p.phone.replace(/[^\d+]/g, "");
  return `<a href="tel:${digits}" style="${link}">${esc(p.phone)}</a>`;
}
function phoneText(p: Person): string { return p.phone; }

function signatureHtml(p: Person, medicare: boolean): string {
  const name = fullName(p);
  const domainLabel = config.domain;
  const complianceA = `${config.licensedLine} · License # ${licenseLine(p)}`;
  const complianceB = config.independentAgencyLine;
  const lines: string[] = [];
  lines.push(`<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;max-width:600px;${base}">`);
  lines.push(`<tr>${td(`padding:0 0 2px 0;${base}font-weight:bold;`, esc(name))}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 10px 0;${base}`, esc(`${p.title}, ${config.company}`))}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 2px 0;${base}`, phoneCell(p))}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 2px 0;${base}`, `<a href="mailto:${esc(p.email)}" style="${link}">${esc(p.email)}</a>`)}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 12px 0;${base}`, `<a href="${esc(config.siteUrl)}" style="${link}">${esc(domainLabel)}</a>`)}</tr>`);
  lines.push(`<tr>${td(`padding:0;`, `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="200" style="border-collapse:collapse;"><tr><td bgcolor="${sem("brand")}" style="background-color:${sem("brand")};height:2px;line-height:2px;font-size:2px;padding:0;">&nbsp;</td></tr></table>`)}</tr>`);
  lines.push(`<tr>${td(`padding:12px 0 12px 0;`, `<img src="${LOGO_URL}" width="${LOGO_W}" height="${LOGO_H}" alt="Desert Peak Insurance" style="display:block;border:0;width:${LOGO_W}px;height:${LOGO_H}px;outline:none;text-decoration:none;">`)}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 4px 0;${small}`, esc(complianceA))}</tr>`);
  lines.push(`<tr>${td(`padding:0 0 ${medicare ? 4 : 0}px 0;${small}`, esc(complianceB))}</tr>`);
  if (medicare) lines.push(`<tr>${td(`padding:0;${small}`, esc(TPMO_TEXT))}</tr>`);
  lines.push(`</table>`);
  return lines.join("\n") + "\n";
}

function signatureText(p: Person, medicare: boolean): string {
  const out = [
    fullName(p),
    `${p.title}, ${config.company}`,
    phoneText(p),
    p.email,
    config.siteUrl,
    "",
    `${config.licensedLine} · License # ${licenseLine(p)}`,
    config.independentAgencyLine,
  ];
  if (medicare) out.push("", TPMO_TEXT);
  return out.join("\n") + "\n";
}

const visible = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ");

function emit(p: Person, suffix: string, medicare: boolean): { html: string; txt: string } {
  const html = signatureHtml(p, medicare);
  const txt = signatureText(p, medicare);
  const name = `email/${p.slug}${suffix}.html`;
  medicareGuard(name, visible(html), medicare);
  medicareGuard(name.replace(".html", ".txt"), txt, medicare);
  bannedGuard(name, visible(html));
  bannedGuard(name.replace(".html", ".txt"), txt);
  const bytes = Buffer.byteLength(html, "utf8");
  if (bytes > MAX_BYTES) throw new Error(`REFUSED: ${name} is ${bytes} bytes (> ${MAX_BYTES})`);
  write(join(EMAIL, `${p.slug}${suffix}.html`), html);
  write(join(EMAIL, `${p.slug}${suffix}.txt`), txt);
  rows.push({ asset: name, dimensions: `${bytes} bytes (max ${MAX_BYTES})`, source: "scripts/build-signatures.ts", notes: medicare ? "Medicare track: carries the TPMO disclaimer." : "No Medicare disclaimer." });
  rows.push({ asset: name.replace(".html", ".txt"), dimensions: `${Buffer.byteLength(txt, "utf8")} bytes`, source: "scripts/build-signatures.ts", notes: "Plain-text fallback." });
  console.log(`  ${name}: ${bytes} bytes`);
  return { html, txt };
}

// ---------------------------------------------------------------------------
// 3. Renders (600 px, 320 px, dark-mode simulation). The temporary copies under .cache
//    swap the hosted URL for the local file; committed HTML keeps the https URL.
// ---------------------------------------------------------------------------
function wrapper(html: string, width: number, dark: boolean): string {
  const local = html.replace(LOGO_URL, `file://${join(EMAIL, "email-logo@2x.png")}`);
  const bg = dark ? sem("surface-inverse") : sem("surface-raised");
  const fg = dark ? sem("ink-inverse") : sem("ink");
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:${bg};color:${fg};overflow-x:hidden}body{width:${width}px;padding:16px;box-sizing:border-box}</style></head><body>${local}</body></html>`;
}

/** Chrome's forced dark mode auto-darkens backgrounds and lightens text while leaving images alone,
 *  which is the closest headless approximation of Gmail and Outlook dark modes. */
function renderForcedDark(src: string, out: string, w: number, h: number): Promise<void> {
  const args = ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-dark-mode", "--enable-features=WebContentsForceDark",
    "--force-device-scale-factor=1", `--window-size=${w},${h}`, `--screenshot=${out}`, `--user-data-dir=${join(CACHE, "chrome-profile-dark-" + process.pid)}`, `file://${src}`];
  return new Promise((res, rej) => { const p = spawn(chrome(), args, { stdio: "ignore" }); p.on("exit", (c) => (c === 0 ? res() : rej(new Error(`Chrome dark render failed: ${src}`)))); });
}

async function main(): Promise<void> {
  await buildLogoAsset();
  const jobs: RenderJob[] = [];
  const darkJobs: { src: string; out: string }[] = [];
  const variants: { slug: string; html: string }[] = [];
  for (const p of people) {
    const primary = emit(p, "", p.medicareTrack);
    variants.push({ slug: p.slug, html: primary.html });
    if (p.medicareTrack) {
      const alt = emit(p, "-no-medicare", false);
      variants.push({ slug: `${p.slug}-no-medicare`, html: alt.html });
    }
  }
  for (const v of variants) {
    const w600 = join(CACHE, "email", `${v.slug}-600.html`), w320 = join(CACHE, "email", `${v.slug}-320.html`), dark = join(CACHE, "email", `${v.slug}-dark.html`);
    write(w600, wrapper(v.html, 600, false));
    write(w320, wrapper(v.html, 320, false));
    write(dark, wrapper(v.html, 600, false));
    jobs.push({ src: w600, out: join(EMAIL, "renders", `${v.slug}-600.png`), w: 600, h: 460 });
    jobs.push({ src: w320, out: join(EMAIL, "renders", `${v.slug}-320.png`), w: 320, h: 520 });
    darkJobs.push({ src: dark, out: join(EMAIL, "renders", `${v.slug}-dark.png`) });
    for (const s of ["600", "320", "dark"]) rows.push({ asset: `email/renders/${v.slug}-${s}.png`, dimensions: s === "320" ? "320×520" : "600×460", source: "scripts/build-signatures.ts", notes: s === "dark" ? "Dark-mode simulation: Chrome forced dark (auto-inverts text and backgrounds, leaves images alone, as Gmail and Outlook do); the padded logo panel must survive." : "Headless Chrome render; Outlook needs a manual check." });
  }
  await renderAll(jobs);
  for (const j of darkJobs) await renderForcedDark(j.src, j.out, 600, 460);
  writeInventory(EMAIL, rows);
  const total = rows.length;
  console.log(`build-signatures: ${people.length} people, ${variants.length} signature variants, ${total} inventory rows -> email/`);
  // sanity: the committed HTML must reference the hosted URL, not a local path
  for (const v of variants) {
    const committed = readFileSync(join(EMAIL, `${v.slug}.html`), "utf8");
    if (!committed.includes(LOGO_URL) || committed.includes("file://")) throw new Error(`${v.slug}.html does not reference the hosted logo URL`);
    void statSync;
  }
}

await main();
