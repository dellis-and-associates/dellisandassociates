// Authoring helper that produced the first brand/design-tokens.json (ramp recipe + semantic mapping).
// design-tokens.json is the source of truth and is edited by hand from here on. Re-running this
// OVERWRITES it with the recipe below; do that only to re-derive ramps, then diff carefully.
import { writeFileSync } from "node:fs";

// ---------- OKLCH -> sRGB with chroma gamut mapping ----------
const clamp01 = (v) => Math.min(1, Math.max(0, v));
function oklchToLinearSrgb(L, C, h) {
  const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}
const inGamut = (rgb) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);
const gamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
function toHex(L, C, h) {
  let c = C;
  while (!inGamut(oklchToLinearSrgb(L, c, h)) && c > 0) c -= 0.001;
  const rgb = oklchToLinearSrgb(L, c, h).map((v) => Math.round(clamp01(gamma(clamp01(v))) * 255));
  return { hex: "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase(), C: +c.toFixed(3) };
}

// ---------- ramp recipe ----------
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const L = { 50: 0.97, 100: 0.94, 200: 0.88, 300: 0.79, 400: 0.68, 500: 0.57, 600: 0.47, 700: 0.39, 800: 0.31, 900: 0.24, 950: 0.17 };
const CHROMA_PROFILE = { 50: 0.12, 100: 0.22, 200: 0.4, 300: 0.62, 400: 0.85, 500: 1, 600: 1, 700: 0.9, 800: 0.75, 900: 0.6, 950: 0.45 };
const NEUTRAL_PROFILE = { 50: 0.9, 100: 1, 200: 1, 300: 1, 400: 1, 500: 1, 600: 1, 700: 0.9, 800: 0.8, 900: 0.7, 950: 0.6 };

const HUES = {
  brand:    { hue: 35,  maxC: 0.12,  desc: "Hematite. Iron-oxide red-brown of exposed strata; the brand colour." },
  neutral:  { hue: 75,  maxC: 0.014, desc: "Caliche to basalt. Warm-tinted neutral; never a pure gray.", profile: NEUTRAL_PROFILE },
  accent:   { hue: 76,  maxC: 0.135, desc: "Ochre. Decorative accent for rules and marks; not a text colour on light surfaces." },
  positive: { hue: 175, maxC: 0.085, desc: "Agave. Positive / success state. Deliberately blue-leaning: under red-green colour-vision deficiency a yellow-green collapses into amber, a teal-green does not." },
  notice:   { hue: 88,  maxC: 0.13,  desc: "Amber. Notice / caution state." },
  critical: { hue: 22,  maxC: 0.18,  desc: "Crimson. Critical / error state. Deliberately more saturated and cooler than brand." },
};

const color = {};
for (const [name, cfg] of Object.entries(HUES)) {
  color[name] = { $description: cfg.desc };
  const profile = cfg.profile ?? CHROMA_PROFILE;
  for (const s of STEPS) {
    const l = L[s], c = +(cfg.maxC * profile[s]).toFixed(3);
    const { hex, C } = toHex(l, c, cfg.hue);
    color[name][s] = { $type: "color", $value: `oklch(${(l * 100).toFixed(0)}% ${C.toFixed(3)} ${cfg.hue})`, $extensions: { "com.desertpeak.hex": hex } };
  }
}
// two extras: near-white and true-dark anchors
color.neutral[0] = { $type: "color", $value: "oklch(99% 0.005 80)", $extensions: { "com.desertpeak.hex": toHex(0.99, 0.005, 80).hex }, $description: "Near-white for raised surfaces. Not pure #FFFFFF." };

const ref = (p) => `{color.${p}}`;
const semantic = {
  $description: "Roles that components reference. A component never references a primitive ramp directly. Dark theme swaps these aliases and nothing else.",
  surface:            { $type: "color", $value: ref("neutral.50"),  $description: "Page background." },
  "surface-raised":   { $type: "color", $value: ref("neutral.0"),   $description: "Cards, popovers, anything lifted off the page." },
  "surface-sunken":   { $type: "color", $value: ref("neutral.100"), $description: "Wells, table headers, inset areas." },
  "surface-inverse":  { $type: "color", $value: ref("neutral.950"), $description: "Dark panels and footers. Pair with ink-inverse." },
  ink:                { $type: "color", $value: ref("neutral.900"), $description: "Body and heading text." },
  "ink-muted":        { $type: "color", $value: ref("neutral.600"), $description: "Secondary text, captions, metadata. Still AA for body." },
  "ink-inverse":      { $type: "color", $value: ref("neutral.50"),  $description: "Text on surface-inverse and on brand." },
  border:             { $type: "color", $value: ref("neutral.200"), $description: "Hairlines and dividers. Decorative; not relied on for meaning." },
  "border-strong":    { $type: "color", $value: ref("neutral.500"), $description: "Input borders and any boundary that must be perceivable (3:1)." },
  brand:              { $type: "color", $value: ref("brand.600"),   $description: "Primary actions, links, the mark." },
  "brand-hover":      { $type: "color", $value: ref("brand.700") },
  "brand-active":     { $type: "color", $value: ref("brand.800") },
  "brand-ink":        { $type: "color", $value: ref("neutral.50"),  $description: "Text and icons on brand fills." },
  "brand-subtle":     { $type: "color", $value: ref("brand.100"),   $description: "Tinted background for brand-flavoured panels, the recommended column, tags. brand.100, not 50: 50 is indistinguishable from surface." },
  "brand-subtle-ink": { $type: "color", $value: ref("brand.800"),   $description: "Text on brand-subtle." },
  accent:             { $type: "color", $value: ref("accent.500"),  $description: "Ochre rules, marks and highlights. Never text on a light surface." },
  "accent-strong":    { $type: "color", $value: ref("accent.700"),  $description: "Ochre where it must carry text or an icon on a light surface." },
  "focus-ring":       { $type: "color", $value: ref("neutral.900"), $description: "2px ring. Always paired with focus-ring-offset as a 2px halo so it passes against both adjacent surfaces." },
  "focus-ring-offset":{ $type: "color", $value: ref("neutral.50") },
  positive:           { $type: "color", $value: ref("positive.700"), $description: "Positive state text and icons on surface. The three states sit on a lightness ladder (notice .47 / positive .39 / critical .31) so they stay apart without hue; re-pointing one to a step that shares another state's lightness will fail the audit." },
  "positive-surface": { $type: "color", $value: ref("positive.50") },
  "positive-border":  { $type: "color", $value: ref("positive.500") },
  "positive-ink":     { $type: "color", $value: ref("positive.900"), $description: "Text on positive-surface." },
  notice:             { $type: "color", $value: ref("notice.600"),   $description: "Notice state text and icons on surface." },
  "notice-surface":   { $type: "color", $value: ref("notice.50") },
  "notice-border":    { $type: "color", $value: ref("notice.500") },
  "notice-ink":       { $type: "color", $value: ref("notice.900") },
  critical:           { $type: "color", $value: ref("critical.800"), $description: "Critical state text and icons on surface. Never a solid fill; destructive actions are outlined. Darkest of the three states on purpose (see positive)." },
  "critical-surface": { $type: "color", $value: ref("critical.50") },
  "critical-border":  { $type: "color", $value: ref("critical.500") },
  "critical-ink":     { $type: "color", $value: ref("critical.900") },
};

// ---------- typography ----------
// Named scale: "Minor third", ratio 1.2, base 17px, rounded to whole pixels, expressed in rem (16px root).
const rem = (px) => `${(px / 16).toFixed(4).replace(/\.?0+$/, "")}rem`;
const scale = {
  caption:      { px: 12, lh: 1.4,  ls: "0.01em",   family: "sans",  weight: 500, desc: "Captions, table footnotes, legal lines. Never below 12px." },
  small:        { px: 14, lh: 1.5,  ls: "0",        family: "sans",  weight: 400, desc: "UI text, table cells, form help." },
  body:         { px: 17, lh: 1.6,  ls: "0",        family: "serif", weight: 400, desc: "Long-form paragraphs. Source Serif 4 at opsz 17." },
  lead:         { px: 20, lh: 1.55, ls: "0",        family: "serif", weight: 400, desc: "Article intros and pull text." },
  "title-sm":   { px: 24, lh: 1.3,  ls: "-0.005em", family: "sans",  weight: 600, desc: "h4, card titles." },
  title:        { px: 29, lh: 1.25, ls: "-0.01em",  family: "sans",  weight: 600, desc: "h3." },
  "title-lg":   { px: 35, lh: 1.2,  ls: "-0.012em", family: "sans",  weight: 600, desc: "h2." },
  headline:     { px: 42, lh: 1.12, ls: "-0.015em", family: "sans",  weight: 640, desc: "h1 on content pages." },
  display:      { px: 51, lh: 1.06, ls: "-0.02em",  family: "sans",  weight: 660, desc: "Home and hub page heroes." },
  "display-lg": { px: 61, lh: 1.02, ls: "-0.022em", family: "sans",  weight: 680, desc: "Rare. Campaign or landing heroes only." },
};
const typography = {
  $description: "Two families. Archivo (variable: wght 100-900, wdth 62-125) for display and UI; Source Serif 4 (variable: wght 200-900, opsz 8-60) for long-form body. Scale is a minor third (1.2) on a 17px base, rounded to whole pixels.",
  family: {
    sans:  { $type: "fontFamily", $value: ["Archivo", "Archivo Fallback", "Helvetica Neue", "Arial", "sans-serif"], $description: "Display, headings, UI, tables." },
    serif: { $type: "fontFamily", $value: ["Source Serif 4", "Source Serif Fallback", "Iowan Old Style", "Georgia", "serif"], $description: "Body copy and long-form." },
  },
  width: {
    display: { $type: "number", $value: 112, $description: "Archivo wdth axis for display and headline steps. Slightly extended to echo the strata bands." },
    ui:      { $type: "number", $value: 100, $description: "Archivo wdth axis for UI and titles." },
  },
  weight: {
    regular: { $type: "fontWeight", $value: 400 },
    medium:  { $type: "fontWeight", $value: 500 },
    semibold:{ $type: "fontWeight", $value: 600 },
    display: { $type: "fontWeight", $value: 660 },
  },
  scale: { $description: "Minor third, ratio 1.2, base 17px. Each step pairs its own line-height and letter-spacing." },
  measure: {
    narrow: { $type: "dimension", $value: "45ch", $description: "Captions, sidebars, form help." },
    body:   { $type: "dimension", $value: "68ch", $description: "Article body. The 65-75ch working range for 1,800-word pieces." },
    wide:   { $type: "dimension", $value: "84ch", $description: "Comparison tables and code. Never running prose." },
  },
  numeric: {
    tabular: { $type: "fontFeature", $value: "tabular-nums", $description: "font-variant-numeric for every numeric column: limits, deductibles, premiums, comparison tables. Both families ship tnum." },
    default: { $type: "fontFeature", $value: "proportional-nums" },
  },
};
for (const [name, s] of Object.entries(scale)) {
  typography.scale[name] = {
    $type: "typography",
    $value: { fontFamily: `{typography.family.${s.family}}`, fontSize: rem(s.px), lineHeight: s.lh, letterSpacing: s.ls, fontWeight: s.weight },
    $description: `${s.px}px. ${s.desc}`,
  };
}

// ---------- spacing / radius / shadow / motion ----------
const space = { $description: "4px base. Numeric keys are multiples of 4px." };
for (const n of [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32]) space[n] = { $type: "dimension", $value: n === 0 ? "0px" : rem(n * 4) };
space.px = { $type: "dimension", $value: "1px", $description: "Hairlines only." };

const radius = {
  $description: "By role, not size. Strata is a hard-edged system.",
  control: { $type: "dimension", $value: "2px", $description: "Buttons, inputs, tags." },
  surface: { $type: "dimension", $value: "4px", $description: "Cards, panels, images, table containers." },
  pill:    { $type: "dimension", $value: "9999px", $description: "Status dots and counters only. Not buttons." },
};

const shadowColor = "oklch(24% 0.008 75)"; // basalt
const shadow = {
  $description: "Elevation ladder. Warm-tinted; a black shadow on a caliche page looks like dirt.",
  0: { $type: "shadow", $value: [{ color: "oklch(24% 0.010 75 / 0.06)", offsetX: "0px", offsetY: "1px", blur: "2px", spread: "0px" }], $description: "Resting cards, table containers." },
  1: { $type: "shadow", $value: [{ color: "oklch(24% 0.010 75 / 0.08)", offsetX: "0px", offsetY: "2px", blur: "6px", spread: "-1px" }, { color: "oklch(24% 0.010 75 / 0.05)", offsetX: "0px", offsetY: "1px", blur: "2px", spread: "0px" }], $description: "Hover on interactive cards, dropdown menus." },
  2: { $type: "shadow", $value: [{ color: "oklch(24% 0.010 75 / 0.12)", offsetX: "0px", offsetY: "8px", blur: "20px", spread: "-4px" }, { color: "oklch(24% 0.010 75 / 0.06)", offsetX: "0px", offsetY: "2px", blur: "6px", spread: "-1px" }], $description: "Popovers, sticky headers." },
  3: { $type: "shadow", $value: [{ color: "oklch(24% 0.010 75 / 0.18)", offsetX: "0px", offsetY: "20px", blur: "48px", spread: "-8px" }, { color: "oklch(24% 0.010 75 / 0.08)", offsetX: "0px", offsetY: "8px", blur: "20px", spread: "-4px" }], $description: "Modals and drawers." },
};

const motion = {
  $description: "Durations collapse to 0ms under prefers-reduced-motion (emitted in tokens.css). Nothing on this site should move for decoration.",
  duration: {
    fast:       { $type: "duration", $value: "120ms", $description: "Hover, focus, colour changes." },
    base:       { $type: "duration", $value: "200ms", $description: "Reveals, menus, accordions." },
    slow:       { $type: "duration", $value: "320ms", $description: "Drawers, modals." },
    deliberate: { $type: "duration", $value: "480ms", $description: "Page-level transitions. Rare." },
  },
  easing: {
    standard:   { $type: "cubicBezier", $value: [0.2, 0, 0, 1], $description: "Default for anything that moves on screen." },
    enter:      { $type: "cubicBezier", $value: [0, 0, 0.2, 1] },
    exit:       { $type: "cubicBezier", $value: [0.4, 0, 1, 1] },
  },
};

const tokens = {
  $schema: "https://tr.designtokens.org/format/",
  $description: "Desert Peak Insurance design tokens. Single source of truth. Direction 1 (Strata). Everything in dist/ and brand-sheet.html is generated from this file by scripts/build-tokens.ts; do not edit generated files.",
  $extensions: { "com.desertpeak": { version: "1.0.0", direction: "strata", theme: { light: "populated", dark: "wired, not populated in v1" } } },
  color,
  semantic: { color: semantic },
  typography,
  space,
  radius,
  shadow,
  motion,
};
writeFileSync(new URL("../brand/design-tokens.json", import.meta.url), JSON.stringify(tokens, null, 2) + "\n");
for (const [n, r] of Object.entries(color)) console.log(n.padEnd(9), STEPS.map((s) => r[s].$extensions["com.desertpeak.hex"]).join(" "));
