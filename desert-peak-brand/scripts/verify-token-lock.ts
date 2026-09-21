/**
 * The identity lock. Walks every SVG, HTML, CSS, TS/TSX source, PPTX (XML inside the zip) and
 * PDF-generating source in Stage 5 and FAILS on:
 *   - any colour literal that is not a value in brand/design-tokens.json
 *     (hex, rgb()/rgba(), named CSS colours, PPTX srgbClr / sysClr);
 *   - any font family that is not a token family or a declared fallback (collateral.config.json);
 *   - any mark or lockup geometry that is not a byte-identical copy of brand/logos/*.svg
 *     (SVG: every <path>/<polygon> must sit in a <g data-logo="file"> whose content matches the file;
 *      PPTX: every image in ppt/media must be one of the generated logo PNGs by hash).
 * Runs in CI. This is what "without changing the colours" means in practice.
 *
 * Usage: node scripts/verify-token-lock.ts   (exit 1 on any finding)
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { ALLOWED_HEX, FAMILY, LOGOS, ROOT, config, listFiles, logoInner, rel } from "./collateral/lib.ts";

const require = createRequire(import.meta.url);
const JSZip = require("jszip");

const SCAN_DIRS = ["social", "email", "decks", "web", "print", "showcase"].map((d) => join(ROOT, d));
// Stage 5 generator sources (the identity stage has its own audit). Template literals are scanned for literal colours only.
const SOURCE_FILES = [...listFiles(join(ROOT, "scripts"), /^build-(social|signatures|decks|web|print|showcase|collateral|inventory)\.ts$|^preflight-print\.ts$/), ...listFiles(join(ROOT, "scripts", "collateral"), /\.ts$/)];
const TEXT_EXT = /\.(svg|html|css|ts|tsx|mjs|js|json|webmanifest)$/i;
const SKIP = /node_modules|\.cache|\/renders?\/|\.png$|\.pdf$|\.ico$|\.woff2?$|preflight\//;

const allowedFonts = new Set<string>([FAMILY.sans, FAMILY.serif, "sans-serif", "serif", "monospace", "system-ui", "inherit", "initial",
  ...(config as any).fallbackFonts.email, ...(config as any).fallbackFonts.deck]);
const ALLOWED_WORDS = new Set(["currentcolor", "none", "transparent", "inherit", "initial", "unset"]);
const NAMED = /\b(?:fill|stroke|color|background|background-color|border-color|outline-color|stop-color|flood-color)\s*[:=]\s*["']?\s*(white|black|red|blue|green|gray|grey|yellow|orange|purple|silver|navy|maroon|teal|olive|aqua|fuchsia|lime)\b/gi;

const findings: string[] = [];
const hex3 = (h: string) => "#" + h.slice(1).split("").map((c) => c + c).join("").toUpperCase();
const rgbHex = (r: number, g: number, b: number) => "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();

function checkColours(file: string, text: string, ctx = "") {
  // strip data: URIs (fonts/images) and PNG hashes before scanning
  const t = text.replace(/data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+/g, "data:_").replace(/sha256-[A-Za-z0-9+/=]+/g, "");
  for (const m of t.matchAll(/#([0-9a-fA-F]{6})\b(?![0-9a-fA-F])/g)) {
    const h = "#" + m[1].toUpperCase();
    if (!ALLOWED_HEX.has(h)) findings.push(`${rel(file)}${ctx}: colour ${h} is not a token`);
  }
  for (const m of t.matchAll(/(?<![\w-])#([0-9a-fA-F]{3})\b(?![0-9a-fA-F\w-])/g)) {
    // 3-digit hex only where it is clearly a colour (attribute/style context)
    const before = t.slice(Math.max(0, m.index! - 12), m.index!);
    if (/(fill|stroke|color|background)[^;]*[:=]\s*["']?$/i.test(before)) { const h = hex3("#" + m[1]); if (!ALLOWED_HEX.has(h)) findings.push(`${rel(file)}${ctx}: colour ${h} is not a token`); }
  }
  for (const m of t.matchAll(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/g)) {
    const h = rgbHex(+m[1], +m[2], +m[3]);
    if (!ALLOWED_HEX.has(h)) findings.push(`${rel(file)}${ctx}: colour rgb(${m[1]} ${m[2]} ${m[3]}) = ${h} is not a token`);
  }
  for (const m of t.matchAll(NAMED)) findings.push(`${rel(file)}${ctx}: named colour "${m[1]}" is not a token`);
  for (const m of t.matchAll(/(?:fill|stroke)="([^"#]+)"/g)) {
    const v = m[1].trim().toLowerCase();
    if (!ALLOWED_WORDS.has(v) && !v.startsWith("url(") && !v.startsWith("var(")) findings.push(`${rel(file)}${ctx}: fill/stroke "${m[1]}" is not a token colour`);
  }
}
function checkFonts(file: string, text: string, ctx = "") {
  const decls = [...text.matchAll(/font-family\s*[:=]\s*["']?([^;"'>}]+)/gi)].map((m) => m[1]);
  for (const d of decls) for (const f of d.split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean)) {
    if (!allowedFonts.has(f) && !f.startsWith("var(")) findings.push(`${rel(file)}${ctx}: font "${f}" is not a token family or declared fallback`);
  }
  for (const m of text.matchAll(/typeface="([^"]+)"/g)) if (m[1] && !allowedFonts.has(m[1]) && !m[1].startsWith("+")) findings.push(`${rel(file)}${ctx}: PPTX typeface "${m[1]}" is not a token family or declared fallback`);
}
const referenceInner = new Map<string, string>();
const norm = (s: string) => s.replace(/fill="[^"]*"/g, "").replace(/\s+/g, " ").trim();
for (const f of ["mark.svg", "favicon.svg", "logo-horizontal.svg", "logo-stacked.svg", "logo-reversed.svg", "logo-mono.svg", "wordmark.svg"]) referenceInner.set(f, norm(logoInner(f)));

/** Return the inner text of the <g ...> that starts at `open` (index of "<g"), honouring nested <g>. */
function groupInner(svg: string, open: number): { inner: string; end: number } | null {
  const tagEnd = svg.indexOf(">", open); if (tagEnd < 0) return null;
  let depth = 1, i = tagEnd + 1;
  const re = /<g\b|<\/g>/g; re.lastIndex = i;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg))) {
    if (m[0] === "<g" ) depth++; else depth--;
    if (depth === 0) return { inner: svg.slice(tagEnd + 1, m.index), end: m.index + 4 };
  }
  return null;
}
/** Brand illustration (ridge fields, strata bands) is declared with data-art and is allowed geometry. */
function stripArt(svg: string): string {
  let out = "", cursor = 0;
  for (const m of svg.matchAll(/<g data-art="[^"]+"[^>]*>/g)) {
    const g = groupInner(svg, m.index!);
    if (!g) continue;
    out += svg.slice(cursor, m.index!); cursor = g.end;
  }
  return out + svg.slice(cursor);
}
function checkMarks(file: string, svg: string) {
  if (file.startsWith(LOGOS)) return;
  svg = stripArt(svg);
  // web/logos and web/favicons hold optimised whole-file copies of the reference logos: accept a file whose entire inner content matches one
  if (/\/web\/(logos|favicons)\/[^/]+\.svg$/.test(file)) {
    const inner = norm(svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[^>]*>[^<]*<\/title>/, ""));
    if ([...referenceInner.values()].includes(inner)) return;
    findings.push(`${rel(file)}: not a verbatim copy of any brand/logos file`);
    return;
  }
  let stripped = "";
  let cursor = 0;
  for (const m of svg.matchAll(/<g data-logo="([^"]+)"[^>]*>/g)) {
    const name = m[1];
    const g = groupInner(svg, m.index!);
    if (!g) { findings.push(`${rel(file)}: unterminated logo group "${name}"`); continue; }
    const refI = referenceInner.get(name);
    if (!refI) findings.push(`${rel(file)}: unknown logo reference "${name}"`);
    else if (norm(g.inner) !== refI) findings.push(`${rel(file)}: logo "${name}" geometry differs from brand/logos/${name}`);
    stripped += svg.slice(cursor, m.index!); cursor = g.end;
  }
  stripped += svg.slice(cursor);
  // any geometry outside a data-logo group is a redrawn mark or an icon: not allowed
  if (/<(path|polygon|polyline)\b/.test(stripped)) findings.push(`${rel(file)}: <path>/<polygon> outside a data-logo group (redrawn mark or icon)`);
}

async function checkPptx(file: string) {
  const zip = await JSZip.loadAsync(readFileSync(file));
  const logoHashes = new Set(listFiles(join(ROOT, "web", "logos"), /\.png$/).concat(listFiles(join(ROOT, "web"), /^icon-.*\.png$/)).map((p) => createHash("sha256").update(readFileSync(p)).digest("hex")));
  for (const name of Object.keys(zip.files)) {
    if (zip.files[name].dir) continue;
    if (name.endsWith(".xml") || name.endsWith(".rels")) {
      const xml = await zip.files[name].async("string");
      for (const m of xml.matchAll(/srgbClr val="([0-9A-Fa-f]{6})"/g)) { const h = "#" + m[1].toUpperCase(); if (!ALLOWED_HEX.has(h)) findings.push(`${rel(file)} [${name}]: colour ${h} is not a token`); }
      for (const m of xml.matchAll(/sysClr val="([^"]+)" lastClr="([0-9A-Fa-f]{6})"/g)) { const h = "#" + m[2].toUpperCase(); if (!ALLOWED_HEX.has(h)) findings.push(`${rel(file)} [${name}]: system colour ${m[1]} (${h}) is not a token`); }
      checkFonts(file, xml, ` [${name}]`);
    } else if (/^ppt\/media\//.test(name)) {
      const buf = await zip.files[name].async("nodebuffer");
      const h = createHash("sha256").update(buf).digest("hex");
      if (!logoHashes.has(h)) findings.push(`${rel(file)} [${name}]: image is not one of the generated logo PNGs (hash ${h.slice(0, 12)})`);
    }
  }
}

const files = SCAN_DIRS.flatMap((d) => listFiles(d, /./)).filter((f) => !SKIP.test(f));
let scanned = 0;
for (const f of SOURCE_FILES) { scanned++; checkColours(f, readFileSync(f, "utf8").replace(/(?:fill|stroke)="\$\{[^}]*\}"/g, ""), " (source)"); }
for (const f of files) {
  if (/\.pptx$/i.test(f)) { await checkPptx(f); scanned++; continue; }
  if (!TEXT_EXT.test(f)) continue;
  const text = readFileSync(f, "utf8");
  scanned++;
  checkColours(f, text);
  checkFonts(f, text);
  if (/\.svg$/i.test(f)) checkMarks(f, text);
}
// the identity itself must be intact: hash the logo files against the committed manifest
const manifestPath = join(ROOT, "brand", "logos", "MANIFEST.sha256");
if (existsSync(manifestPath)) {
  for (const line of readFileSync(manifestPath, "utf8").trim().split("\n")) {
    const [hash, name] = line.split(/\s+/);
    const actual = createHash("sha256").update(readFileSync(join(LOGOS, name))).digest("hex");
    if (actual !== hash) findings.push(`brand/logos/${name}: modified since the identity was locked`);
  }
} else findings.push("brand/logos/MANIFEST.sha256 missing: run `pnpm lock:identity` once on the locked identity");

if (findings.length) {
  console.error(`verify-token-lock: ${findings.length} finding(s) in ${scanned} files`);
  for (const f of findings) console.error("  - " + f);
  process.exit(1);
}
console.log(`verify-token-lock: ${scanned} files scanned, zero off-token colours, fonts or altered marks`);
