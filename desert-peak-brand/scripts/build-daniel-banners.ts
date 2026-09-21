/**
 * Daniel's badge, applied: (1) the tokens the website takes from the logo, written as aliases of the
 * existing brand tokens (logo-tokens.json + logo-tokens.css); (2) Facebook, LinkedIn and X banners
 * built around brand/logo/daniel-refined/web/logo-horizontal.svg — the slogan in Instrument Serif, the
 * display face the lockup itself is now set in, over the mono state line — with the same platform specs
 * and safe zones as scripts/build-social.ts. Writes brand/logo/daniel-refined/web/{tokens,banners}/.
 * Usage: node scripts/build-daniel-banners.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CACHE, ROOT, config, fitSize, htmlForSvg, measure, pngSize, prim, relFonts, renderAll, sem, svgDoc, svgText, wrap, write, type RenderJob } from "./collateral/lib.ts";
import { contrast } from "./lib.ts";

const TODAY = "2026-09-15";
const WEB = join(ROOT, "brand", "logo", "daniel-refined", "web");
const TOK = join(WEB, "tokens"), BAN = join(WEB, "banners");
mkdirSync(TOK, { recursive: true }); mkdirSync(BAN, { recursive: true });
const r = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------------------
// 1. Tokens extracted from the logo. Every value is an alias of an existing brand token.
// ---------------------------------------------------------------------------
const logoTokens = {
  $description: `Colours and type the website takes from Daniel's logo (brand/logo/daniel-refined/web). Extracted ${TODAY}. Every value aliases brand/design-tokens.json; the logo introduces no colour outside the palette, so the site keeps one source of truth. Use these roles where the site echoes the logo (header, footer, hero); use the ordinary semantic roles everywhere else.`,
  logo: {
    ring:        { $type: "color", $value: "{semantic.color.ink}", $description: "The ring and the main peak. Also the site's heading and nav colour." },
    peak:        { $type: "color", $value: "{semantic.color.ink}" },
    "peak-far":  { $type: "color", $value: "{semantic.color.ink-muted}", $description: "The secondary peak. Also secondary text." },
    snow:        { $type: "color", $value: "{semantic.color.surface-raised}", $description: "The snow cap. Also cards and raised surfaces." },
    cactus:      { $type: "color", $value: "{color.positive.500}", $description: "The saguaro (mid sage, 3:1 on the page). The one colour the logo adds to a page: use it for icons and a single accent (the active nav marker), never for text and never as a button fill; positive state text is the semantic positive role." },
    wordmark:    { $type: "color", $value: "{semantic.color.ink}", $description: "Desert Peak / INSURANCE in the web lockup." },
    "wordmark-accent": { $type: "color", $value: "{semantic.color.brand}", $description: "INSURANCE in the stacked print version (v1). On the site the action colour is the badge's navy: buttons, links." },
    ground:      { $type: "color", $value: "{semantic.color.surface}", $description: "The paper the logo sits on. The page background." },
    "ground-inverse": { $type: "color", $value: "{semantic.color.surface-inverse}", $description: "Where the reversed lockup goes: footer, dark panels." },
  },
  type: {
    wordmark: { $type: "fontFamily", $value: "{typography.family.sans}", $description: "Archivo, the wordmark's face. Headings and UI." },
    body:     { $type: "fontFamily", $value: "{typography.family.serif}", $description: "Source Serif 4 for long-form; the print card's serif is the same family." },
    "wordmark-width": { $type: "number", $value: "{typography.width.display}", $description: "The wordmark is set at Archivo width 112; use the same for display headings so the site and the logo share one voice." },
  },
  sizing: {
    "header-desktop": { $type: "dimension", $value: "48px", $description: "logo-horizontal.svg height in the site header (bar 80 px)." },
    "header-mobile":  { $type: "dimension", $value: "40px", $description: "Bar 64 px." },
    "favicon-note":   { $type: "string", $value: "The badge does not survive 16 px; use ../v2/logo-mark-small.svg or brand/logos/favicon.svg." },
  },
};
writeFileSync(join(TOK, "logo-tokens.json"), JSON.stringify(logoTokens, null, 2) + "\n");
const resolved: [string, string, string][] = [
  ["--dp-logo-ring", "ink", sem("ink")], ["--dp-logo-peak", "ink", sem("ink")], ["--dp-logo-peak-far", "ink-muted", sem("ink-muted")], ["--dp-logo-snow", "surface-raised", sem("surface-raised")],
  ["--dp-logo-cactus", "color-positive-500", prim("positive.500")], ["--dp-logo-wordmark", "ink", sem("ink")], ["--dp-logo-wordmark-accent", "brand", sem("brand")], ["--dp-logo-ground", "surface", sem("surface")], ["--dp-logo-ground-inverse", "surface-inverse", sem("surface-inverse")],
];
writeFileSync(join(TOK, "logo-tokens.css"), [`/* GENERATED ${TODAY} by scripts/build-daniel-banners.ts from logo-tokens.json. Import after brand/dist/tokens.css. */`, ":root {", ...resolved.map(([v, role]) => `  ${v}: var(--dp-${role});`), "  --dp-logo-font: var(--dp-font-sans);", "  --dp-logo-width: var(--dp-width-display);", "  --dp-logo-header-desktop: 48px;", "  --dp-logo-header-mobile: 40px;", "}", ""].join("\n"));
writeFileSync(join(TOK, "LOGO-TOKENS.md"), [`# Tokens from the logo`, ``, `Extracted ${TODAY} from \`brand/logo/daniel-refined/web/logo-horizontal.svg\`. The logo uses five colours and one typeface, all in \`brand/design-tokens.json\` v2 (the palette taken from the badge: navy, sage, rust on cream), so the website needs no values of its own: these roles are aliases. Import \`logo-tokens.css\` after \`brand/dist/tokens.css\` and use \`var(--dp-logo-*)\` where a page element echoes the logo.`, ``, `| Logo element | Role | Hex | Contrast on surface | Site use |`, `|---|---|---|---:|---|`,
  ...resolved.map(([v, role, hex]) => `| ${v.replace("--dp-logo-", "")} | \`${role}\` | ${hex} | ${contrast(hex, sem("surface")).toFixed(2)} | ${(logoTokens.logo as any)[v.replace("--dp-logo-", "")]?.$description ?? ""} |`),
  ``, `## What the logo adds to the site`, ``, `- **Sage** (\`positive.500\`, ${prim("positive.500")}) is the badge's saguaro and the one accent colour the logo gives the site: one accent per view (the active nav marker, a checklist icon), icons only (3:1), never text and never a button fill; navy (\`brand\`) is the action colour so the two never compete. Positive state text uses the darker semantic \`positive\`.`, `- **Ink and paper**: the logo is ink on paper, and so is the site. Headings, nav and the wordmark share \`ink\`; the page is \`surface\`; cards are \`surface-raised\` like the snow cap.`, `- **Archivo at width 112** for display headings, because that is how the wordmark is set; body stays Source Serif 4.`, ``, `These aliases resolve through \`brand/design-tokens.json\` v2, whose palette was taken from the badge on 2026-09-15 (navy neutrals and navy brand, sage positive, cream surfaces; see brand/DECISIONS.md).`, ``].join("\n"));

// ---------------------------------------------------------------------------
// 2. Banners around the new lockup. Specs and safe zones as in scripts/build-social.ts (verified 2026-09-13).
// ---------------------------------------------------------------------------
type Zone = { x: number; y: number; w: number; h: number; label: string };
type Banner = { key: string; platform: string; w: number; h: number; safe: { x: number; y: number; w: number; h: number }; zones: Zone[]; spec: string };
const BANNERS: Banner[] = [
  { key: "linkedin-company", platform: "LinkedIn Page cover", w: 1512, h: 256, safe: { x: 370, y: 30, w: 1100, h: 196 }, zones: [{ x: 0, y: 146, w: 330, h: 110, label: "Page logo overlaps (desktop)" }, { x: 0, y: 0, w: 1512, h: 24, label: "crop risk (mobile)" }, { x: 0, y: 232, w: 1512, h: 24, label: "crop risk (mobile)" }], spec: "1512×256, LinkedIn Help a563309" },
  { key: "linkedin-personal", platform: "LinkedIn profile banner", w: 1584, h: 396, safe: { x: 510, y: 50, w: 1030, h: 296 }, zones: [{ x: 0, y: 190, w: 470, h: 206, label: "Profile photo and name card overlap (desktop)" }, { x: 0, y: 0, w: 1584, h: 40, label: "crop risk (mobile)" }, { x: 0, y: 356, w: 1584, h: 40, label: "crop risk (mobile)" }], spec: "1584×396, LinkedIn Help a568217" },
  { key: "facebook", platform: "Facebook Page cover", w: 820, h: 312, safe: { x: 215, y: 28, w: 460, h: 256 }, zones: [{ x: 0, y: 0, w: 133, h: 312, label: "cropped on mobile" }, { x: 687, y: 0, w: 133, h: 312, label: "cropped on mobile" }, { x: 24, y: 196, w: 180, h: 116, label: "profile picture overlap (desktop)" }], spec: "820×312 desktop / 640×360 mobile" },
  { key: "x", platform: "X header", w: 1500, h: 500, safe: { x: 450, y: 80, w: 1010, h: 340 }, zones: [{ x: 0, y: 0, w: 1500, h: 60, label: "may be cropped" }, { x: 0, y: 440, w: 1500, h: 60, label: "may be cropped" }, { x: 0, y: 300, w: 420, h: 200, label: "avatar overlap" }], spec: "1500×500" },
];
const lockupFile = join(WEB, "logo-horizontal.svg");
const lockupSvg = readFileSync(lockupFile, "utf8");
const LK = { w: parseFloat(lockupSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)![1]), h: parseFloat(lockupSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)![2]) };
const lockupInner = lockupSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[^>]*>[^<]*<\/title>/, "");
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const STATES = config.states.map((s) => (config.stateNames as Record<string, string>)[s]).join(" · ");
const SLOGAN: string = (config as any).bannerSlogan ?? config.positioningLine;   // client line, see bannerSloganNote
// Break a two-clause slogan at its comma rather than wherever the column runs out: greedy wrapping put
// "Peak Protection, Every" on the first line and left "Policy" alone on the second.
const SLOGAN_SET = SLOGAN.replace(/,\s+/, ",\n");

function banner(b: Banner, overlay: boolean): string {
  const { safe } = b;
  const stacked = safe.w < 700;
  let lockH = clamp(b.h * 0.34, 48, 110), lockW = (LK.w / LK.h) * lockH;
  if (!stacked && lockW > safe.w * 0.48) { lockW = safe.w * 0.48; lockH = lockW * LK.h / LK.w; }
  if (stacked) { lockH = clamp(b.h * 0.2, 40, 64); lockW = (LK.w / LK.h) * lockH; }
  const gap = clamp(b.h * 0.16, 28, 64);
  const textX = stacked ? safe.x : safe.x + lockW + gap, textW = stacked ? safe.w : safe.x + safe.w - textX;
  let posSize = fitSize(SLOGAN_SET, "display-400", textW, 2, clamp(Math.round(b.h * 0.16), 24, 58), 22, -0.005);   // Instrument Serif, the display face, never below its floor at banner scale
  let metaSize = clamp(Math.round(b.h * (stacked ? 0.06 : 0.072)), 13, 21);   // DM Mono metadata line
  const meta = `${STATES}\n${config.domain}`;   // always two lines: the states read as a list, the domain as its own line
  let posLines: string[] = [], metaLines: string[] = [], posBlock = 0, textBlockH = 0, blockH = 0;
  for (;;) {
    posLines = wrap(SLOGAN_SET, "display-400", posSize, textW, -0.005); metaLines = wrap(meta, "mono-400", metaSize, textW);
    posBlock = posLines.length * posSize * 1.18; textBlockH = posBlock + posSize * 0.35 + metaSize * 1.6 * metaLines.length;
    blockH = stacked ? lockH + gap * 0.6 + textBlockH : Math.max(textBlockH, lockH);
    if (blockH <= safe.h || posSize <= 20) break; posSize -= 2; if (metaSize > 15) metaSize -= 1;
  }
  const top = safe.y + (safe.h - blockH) / 2;
  const lockY = stacked ? top : top + (blockH - lockH) / 2, textTop = stacked ? top + lockH + gap * 0.6 : top + (blockH - textBlockH) / 2;
  const s = lockH / LK.h;
  let body = `<rect width="${b.w}" height="${b.h}" fill="${sem("surface")}"/>` +
    `<g data-logo="daniel/logo-horizontal.svg" transform="translate(${r(safe.x)} ${r(lockY)}) scale(${r(s)})">${lockupInner}</g>` +
    svgText({ x: textX, y: textTop + posSize * 0.95, lines: posLines, size: posSize, family: "display", weight: 400, tracking: "-0.005em", fill: sem("ink"), lineHeight: 1.1 }) +
    svgText({ x: textX, y: textTop + posBlock + posSize * 0.35 + metaSize * 1.2, lines: metaLines, size: metaSize, family: "mono", weight: 400, fill: sem("ink-muted"), lineHeight: 1.7 });
  if (overlay) {
    for (const z of b.zones) body += `<rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" fill="${sem("accent")}" fill-opacity="0.35" stroke="${sem("critical")}" stroke-width="2"/>` + svgText({ x: z.x + 8, y: z.y + clamp(Math.round(b.h * 0.06), 12, 18) + 6, lines: [z.label], size: clamp(Math.round(b.h * 0.06), 12, 18), family: "text", weight: 600, fill: sem("critical"), lineHeight: 1.2 });
    body += `<rect x="${safe.x}" y="${safe.y}" width="${safe.w}" height="${safe.h}" fill="none" stroke="${sem("positive")}" stroke-width="2" stroke-dasharray="8 6"/>`;
  }
  void measure;
  return body;
}

const jobs: RenderJob[] = [];
const rows: string[] = [];
for (const b of BANNERS) {
  for (const overlay of [false, true]) {
    const name = `${b.key}-${b.w}x${b.h}${overlay ? "-safe-zone" : ""}`;
    const svgPath = join(BAN, `${name}.svg`);
    const body = banner(b, overlay);
    write(svgPath, svgDoc(b.w, b.h, body, { title: `Desert Peak Insurance ${b.platform}${overlay ? " (safe-zone overlay)" : ""}`, fontBase: relFonts(svgPath) }));
    const html = join(CACHE, "daniel-banners", `${name}.html`); mkdirSync(join(CACHE, "daniel-banners"), { recursive: true });
    write(html, htmlForSvg(svgDoc(b.w, b.h, body, { title: name, fontBase: relFonts(html) }), b.w, b.h));
    jobs.push({ src: html, out: join(BAN, `${name}.png`), w: b.w, h: b.h });
    if (!overlay) jobs.push({ src: html, out: join(BAN, `${name}@2x.png`), w: b.w, h: b.h, scale: 2 });
    rows.push(`| ${b.platform} | ${name}.png${overlay ? "" : " (+ @2x)"} | ${b.w}×${b.h} | ${b.spec} |`);
  }
}
await renderAll(jobs);
writeFileSync(join(BAN, "README.md"), [`# Banners with Daniel's badge`, ``, `Generated ${TODAY} by \`scripts/build-daniel-banners.ts\` from \`../logo-horizontal.svg\`, \`collateral.config.json\` (positioning line, states, domain) and the platform specs verified on 2026-09-13 (see \`social/USAGE.md\`). Upload the @2x file where the platform accepts it. The \`-safe-zone\` files show what each platform crops or covers; they are not for posting.`, ``, `| Platform | File | Size | Spec |`, `|---|---|---|---|`, ...rows, ``, `The Strata-lockup versions of the same banners are in \`social/banners/\`; these are the same layouts with the badge lockup so the client can compare.`, ``].join("\n"));
console.log(`build-daniel-banners: ${BANNERS.length} banners (+ safe-zone overlays, 1× and 2×) -> ${BAN}; tokens -> ${TOK}`);
for (const j of jobs.filter((j) => !j.scale && !j.out.includes("safe"))) { const z = pngSize(j.out); console.log(`  ${j.out.split("/").pop()} ${z.w}×${z.h}`); }
void prim;
