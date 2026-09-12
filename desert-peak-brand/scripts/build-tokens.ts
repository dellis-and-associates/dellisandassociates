/**
 * Generates everything derived from brand/design-tokens.json:
 *   brand/dist/tokens.css          CSS custom properties (:root, dark block wired, reduced-motion)
 *   brand/dist/fonts.css           @font-face for the self-hosted variable fonts
 *   brand/dist/theme.css           Tailwind v4 @theme block (semantic roles -> utilities)
 *   brand/dist/tailwind-preset.ts  Tailwind v3-style preset (also usable via @config in v4)
 *   brand/dist/tokens.ts           typed export for components and CMS admin theming
 *   brand/brand-sheet.html         client approval sheet (from scripts/brand-sheet.template.html)
 *
 * Deterministic and idempotent: running it twice produces identical files.
 * Usage: node scripts/build-tokens.ts
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  BRAND, ROOT, PAIRINGS, aliasChainEnd, contrast, cssVar, flatten, fmt, loadTokens, parseOklch, resolve, toHex, type Flat, type Token,
} from "./lib.ts";

const tree = loadTokens();
const flat: Flat = flatten(tree);
const DIST = join(BRAND, "dist");
mkdirSync(DIST, { recursive: true });
const version = (tree.$extensions as any)?.["com.desertpeak"]?.version ?? "0.0.0";
const HEADER = `GENERATED from brand/design-tokens.json (v${version}) by scripts/build-tokens.ts. Do not edit by hand.`;

// ---------------------------------------------------------------------------
// Collect
// ---------------------------------------------------------------------------
const entries = (prefix: string) => [...flat.entries()].filter(([p]) => p.startsWith(prefix + "."));
const primitives = entries("color").map(([p, t]) => ({ path: p, hex: toHex(t.$value as string), oklch: t.$value as string }));
const primitiveHex = new Map(primitives.map((p) => [p.path, p.hex]));
const semantic = entries("semantic.color").map(([p, t]) => {
  const ref = aliasChainEnd(t.$value, flat)!;
  return { path: p, name: p.replace("semantic.color.", ""), ref, hex: primitiveHex.get(ref)!, description: t.$description ?? "" };
});
const semHex = new Map(semantic.map((s) => [s.name, s.hex]));

type Step = { name: string; fontFamily: string[]; fontSize: string; lineHeight: number; letterSpacing: string; fontWeight: number; family: "sans" | "serif"; description: string };
const steps: Step[] = entries("typography.scale").map(([p, t]) => {
  const v = resolve<any>(t.$value, flat);
  const family = aliasChainEnd((t.$value as any).fontFamily, flat)!.endsWith("serif") ? "serif" : "sans";
  return { name: p.replace("typography.scale.", ""), ...v, family, description: t.$description ?? "" };
});
const families = entries("typography.family").map(([p, t]) => ({ name: p.replace("typography.family.", ""), stack: t.$value as string[] }));
const stackCss = (s: string[]) => s.map((f) => (/\s/.test(f) || /^[A-Z]/.test(f) ? `"${f}"` : f)).join(", ");
const widths = entries("typography.width").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as number }));
const weights = entries("typography.weight").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as number }));
const measures = entries("typography.measure").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as string }));
const numerics = entries("typography.numeric").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as string }));
const spaces = entries("space").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as string }));
const radii = entries("radius").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as string, description: t.$description ?? "" }));
const durations = entries("motion.duration").map(([p, t]) => ({ name: p.split(".").pop()!, value: t.$value as string }));
const easings = entries("motion.easing").map(([p, t]) => ({ name: p.split(".").pop()!, value: `cubic-bezier(${(t.$value as number[]).join(", ")})` }));

type ShadowLayer = { color: string; offsetX: string; offsetY: string; blur: string; spread: string };
function shadowCss(layers: ShadowLayer[]): string {
  return layers.map((l) => {
    const { alpha } = parseOklch(l.color);
    const hex = toHex(l.color.replace(/\s*\/\s*[\d.]+%?\s*\)$/, ")"));
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread} rgb(${r} ${g} ${b} / ${alpha})`;
  }).join(", ");
}
const shadows = entries("shadow").map(([p, t]) => ({ name: p.split(".").pop()!, value: shadowCss(t.$value as ShadowLayer[]), description: t.$description ?? "" }));

// ---------------------------------------------------------------------------
// tokens.css
// ---------------------------------------------------------------------------
{
  const L: string[] = [`/* ${HEADER} */`, "", ":root {", "  color-scheme: light;", "", "  /* Primitive ramps. Authored in OKLCH; emitted as sRGB hex. Components never reference these. */"];
  for (const p of primitives) L.push(`  ${cssVar(p.path)}: ${p.hex}; /* ${p.oklch} */`);
  L.push("", "  /* Semantic roles. This is the layer components use. */");
  for (const s of semantic) L.push(`  ${cssVar(s.path)}: var(${cssVar(s.ref)});`);
  L.push("", "  /* Typography */");
  for (const f of families) L.push(`  --dp-font-${f.name}: ${stackCss(f.stack)};`);
  for (const w of widths) L.push(`  --dp-width-${w.name}: ${w.value}%;`);
  for (const w of weights) L.push(`  --dp-weight-${w.name}: ${w.value};`);
  for (const m of measures) L.push(`  --dp-measure-${m.name}: ${m.value};`);
  for (const n of numerics) L.push(`  --dp-numeric-${n.name}: ${n.value};`);
  for (const s of steps) {
    L.push(`  --dp-text-${s.name}-family: var(--dp-font-${s.family});`);
    L.push(`  --dp-text-${s.name}-size: ${s.fontSize};`);
    L.push(`  --dp-text-${s.name}-line-height: ${s.lineHeight};`);
    L.push(`  --dp-text-${s.name}-letter-spacing: ${s.letterSpacing};`);
    L.push(`  --dp-text-${s.name}-weight: ${s.fontWeight};`);
  }
  L.push("", "  /* Space (4px base) */");
  for (const s of spaces) L.push(`  --dp-space-${s.name}: ${s.value};`);
  L.push("", "  /* Radius, by role */");
  for (const r of radii) L.push(`  --dp-radius-${r.name}: ${r.value};`);
  L.push("", "  /* Elevation */");
  for (const s of shadows) L.push(`  --dp-shadow-${s.name}: ${s.value};`);
  L.push("", "  /* Motion */");
  for (const d of durations) L.push(`  --dp-duration-${d.name}: ${d.value};`);
  for (const e of easings) L.push(`  --dp-ease-${e.name}: ${e.value};`);
  L.push("}", "");
  L.push(`[data-theme="dark"] {`, "  color-scheme: dark;", "  /*", "   * Wired, not populated (v1 ships light only).", "   * To ship dark mode: re-point the semantic roles below to dark-appropriate primitive steps.", "   * Never add primitives here and never touch component CSS; if a component needs a change, it was referencing a primitive.", "   */");
  for (const s of semantic) L.push(`  /* ${cssVar(s.path)}: var(${cssVar(s.ref)}); */`);
  L.push("}", "");
  L.push("@media (prefers-reduced-motion: reduce) {", "  :root {");
  for (const d of durations) L.push(`    --dp-duration-${d.name}: 0ms;`);
  L.push("  }", "}", "");
  writeFileSync(join(DIST, "tokens.css"), L.join("\n"));
}

// ---------------------------------------------------------------------------
// fonts.css
// ---------------------------------------------------------------------------
const FONT_FILES = [
  { family: "Archivo", file: "archivo-variable.woff2", style: "normal", weight: "100 900", stretch: "62% 125%" },
  { family: "Archivo", file: "archivo-italic-variable.woff2", style: "italic", weight: "100 900", stretch: "62% 125%" },
  { family: "Source Serif 4", file: "source-serif-4-variable.woff2", style: "normal", weight: "200 900", stretch: "" },
  { family: "Source Serif 4", file: "source-serif-4-italic-variable.woff2", style: "italic", weight: "200 900", stretch: "" },
];
function fontFace(src: (file: string) => string): string {
  return FONT_FILES.map((f) => [
    "@font-face {",
    `  font-family: "${f.family}";`,
    `  src: url("${src(f.file)}") format("woff2");`,
    `  font-weight: ${f.weight};`,
    f.stretch ? `  font-stretch: ${f.stretch};` : null,
    `  font-style: ${f.style};`,
    "  font-display: swap;",
    "}",
  ].filter(Boolean).join("\n")).join("\n");
}
writeFileSync(join(DIST, "fonts.css"), `/* ${HEADER} */\n/* Self-hosted, Latin-subset variable fonts. Licenses: brand/LICENSES.md */\n\n${fontFace((f) => `../fonts/${f}`)}\n\n:root { font-optical-sizing: auto; }\n`);

// ---------------------------------------------------------------------------
// theme.css (Tailwind v4)
// ---------------------------------------------------------------------------
{
  const L: string[] = [`/* ${HEADER} */`, "/* Tailwind v4. Import after tokens.css:  @import \"@desert-peak/brand/tokens.css\"; @import \"@desert-peak/brand/theme.css\"; */", "", "@theme inline {", "  /* Rule 3: tokens are the only source of colour. The default palette is removed so bg-red-500 does not exist. */", "  --color-*: initial;"];
  for (const s of semantic) L.push(`  --color-${s.name}: var(${cssVar(s.path)});`);
  L.push("", "  --font-*: initial;");
  for (const f of families) L.push(`  --font-${f.name}: var(--dp-font-${f.name});`);
  L.push("", "  --text-*: initial;");
  for (const s of steps) {
    L.push(`  --text-${s.name}: var(--dp-text-${s.name}-size);`);
    L.push(`  --text-${s.name}--line-height: var(--dp-text-${s.name}-line-height);`);
    L.push(`  --text-${s.name}--letter-spacing: var(--dp-text-${s.name}-letter-spacing);`);
    L.push(`  --text-${s.name}--font-weight: var(--dp-text-${s.name}-weight);`);
  }
  L.push("", "  --spacing: 0.25rem; /* 4px base; p-4 = 16px */");
  L.push("", "  --radius-*: initial;");
  for (const r of radii) L.push(`  --radius-${r.name}: var(--dp-radius-${r.name});`);
  L.push("", "  --shadow-*: initial;");
  for (const s of shadows) L.push(`  --shadow-${s.name}: var(--dp-shadow-${s.name});`);
  L.push("", "  --ease-*: initial;");
  for (const e of easings) L.push(`  --ease-${e.name}: var(--dp-ease-${e.name});`);
  L.push(`  --default-transition-duration: var(--dp-duration-base);`);
  L.push(`  --default-transition-timing-function: var(--dp-ease-standard);`);
  L.push("", "  --container-*: initial;");
  for (const m of measures) L.push(`  --container-measure-${m.name}: var(--dp-measure-${m.name});`);
  L.push("}", "");
  L.push("@utility tabular { font-variant-numeric: var(--dp-numeric-tabular); }");
  L.push("@utility measure { max-width: var(--dp-measure-body); }");
  L.push("@utility focus-ring { outline: 2px solid var(--dp-focus-ring); outline-offset: 2px; box-shadow: 0 0 0 2px var(--dp-focus-ring-offset); }");
  L.push("");
  writeFileSync(join(DIST, "theme.css"), L.join("\n"));
}

// ---------------------------------------------------------------------------
// tailwind-preset.ts (v3-style object; usable in v4 via @config)
// ---------------------------------------------------------------------------
{
  const colors: Record<string, Record<string, string>> = {};
  for (const s of semantic) {
    const [group, ...rest] = s.name.split("-");
    colors[group] ??= {};
    colors[group][rest.length ? rest.join("-") : "DEFAULT"] = `var(${cssVar(s.path)})`;
  }
  const fontSize: Record<string, [string, Record<string, string>]> = {};
  for (const s of steps) fontSize[s.name] = [`var(--dp-text-${s.name}-size)`, { lineHeight: `var(--dp-text-${s.name}-line-height)`, letterSpacing: `var(--dp-text-${s.name}-letter-spacing)`, fontWeight: `var(--dp-text-${s.name}-weight)` }];
  const preset = {
    theme: {
      colors: { transparent: "transparent", current: "currentColor", ...colors },
      fontFamily: Object.fromEntries(families.map((f) => [f.name, [`var(--dp-font-${f.name})`]])),
      fontSize,
      spacing: Object.fromEntries(spaces.map((s) => [s.name, `var(--dp-space-${s.name})`])),
      borderRadius: { none: "0px", ...Object.fromEntries(radii.map((r) => [r.name, `var(--dp-radius-${r.name})`])) },
      boxShadow: { none: "none", ...Object.fromEntries(shadows.map((s) => [s.name, `var(--dp-shadow-${s.name})`])) },
      transitionDuration: Object.fromEntries(durations.map((d) => [d.name, `var(--dp-duration-${d.name})`])),
      transitionTimingFunction: Object.fromEntries(easings.map((e) => [e.name, `var(--dp-ease-${e.name})`])),
      extend: {
        maxWidth: Object.fromEntries(measures.map((m) => [`measure-${m.name}`, `var(--dp-measure-${m.name})`])),
      },
    },
  };
  const src = [
    `/* ${HEADER} */`,
    "/**",
    " * Tailwind preset: semantic roles -> utility names. Every value is a CSS variable from tokens.css,",
    " * so dark mode is a token swap, not a rebuild. The default colour palette is replaced (not extended)",
    " * on purpose: the site never hardcodes a hex.",
    " *",
    " *   // tailwind.config.ts (v3)         // app.css (v4)",
    " *   presets: [desertPeak]              @config \"@desert-peak/brand/tailwind-preset\";",
    " */",
    `const desertPeak = ${JSON.stringify(preset, null, 2)} as const;`,
    "",
    "export default desertPeak;",
    "",
  ].join("\n");
  writeFileSync(join(DIST, "tailwind-preset.ts"), src);
}

// ---------------------------------------------------------------------------
// tokens.ts
// ---------------------------------------------------------------------------
{
  const prim: Record<string, Record<string, { hex: string; oklch: string }>> = {};
  for (const p of primitives) { const [, ramp, step] = p.path.split("."); (prim[ramp] ??= {})[step] = { hex: p.hex, oklch: p.oklch }; }
  const sem = Object.fromEntries(semantic.map((s) => [s.name, { var: cssVar(s.path), css: `var(${cssVar(s.path)})`, hex: s.hex, ref: s.ref.replace("color.", ""), description: s.description }]));
  const typ = {
    family: Object.fromEntries(families.map((f) => [f.name, { stack: f.stack, css: `var(--dp-font-${f.name})` }])),
    width: Object.fromEntries(widths.map((w) => [w.name, w.value])),
    weight: Object.fromEntries(weights.map((w) => [w.name, w.value])),
    measure: Object.fromEntries(measures.map((m) => [m.name, m.value])),
    numeric: Object.fromEntries(numerics.map((n) => [n.name, n.value])),
    scale: Object.fromEntries(steps.map((s) => [s.name, { family: s.family, fontSize: s.fontSize, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, fontWeight: s.fontWeight, description: s.description }])),
  };
  const out = {
    version, primitives: prim, semantic: sem, typography: typ,
    space: Object.fromEntries(spaces.map((s) => [s.name, s.value])),
    radius: Object.fromEntries(radii.map((r) => [r.name, r.value])),
    shadow: Object.fromEntries(shadows.map((s) => [s.name, s.value])),
    motion: { duration: Object.fromEntries(durations.map((d) => [d.name, d.value])), easing: Object.fromEntries(easings.map((e) => [e.name, e.value])) },
  };
  const src = [
    `/* ${HEADER} */`,
    "/** Typed token export. Prefer `semantic.*.css` in components; `hex` exists for places CSS variables cannot reach (email, canvas, PDF, CMS admin previews). */",
    `export const tokens = ${JSON.stringify(out, null, 2)} as const;`,
    "",
    "export type SemanticColor = keyof typeof tokens.semantic;",
    "export type PrimitiveRamp = keyof typeof tokens.primitives;",
    "export type TypeStep = keyof typeof tokens.typography.scale;",
    "export type SpaceStep = keyof typeof tokens.space;",
    "export const { primitives, semantic, typography, space, radius, shadow, motion } = tokens;",
    "export default tokens;",
    "",
  ].join("\n");
  writeFileSync(join(DIST, "tokens.ts"), src);
}

// ---------------------------------------------------------------------------
// brand-sheet.html
// ---------------------------------------------------------------------------
{
  const tpl = join(ROOT, "scripts", "brand-sheet.template.html");
  if (!existsSync(tpl)) { console.warn("brand-sheet.template.html missing; sheet not generated"); }
  else {
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const fontsDir = join(BRAND, "fonts");
    const fontFaces = fontFace((f) => `data:font/woff2;base64,${readFileSync(join(fontsDir, f)).toString("base64")}`);
    const surfaceHex = semHex.get("surface")!, inkHex = semHex.get("ink")!;
    const rampNames = [...new Set(primitives.map((p) => p.path.split(".")[1]))];
    const ramps = rampNames.map((ramp) => {
      const desc = (tree as any).color[ramp].$description ?? "";
      const sw = primitives.filter((p) => p.path.startsWith(`color.${ramp}.`)).map((p) => {
        const step = p.path.split(".")[2];
        const cs = contrast(p.hex, surfaceHex), ci = contrast(p.hex, inkHex);
        const text = ci >= 4.5 ? inkHex : surfaceHex;
        return `<div class="sw" style="background:${p.hex};color:${text};box-shadow:inset 0 0 0 1px rgb(0 0 0 / 0.08)"><b>${step}</b><span>${p.hex}</span><span class="cr" title="contrast on surface / on ink">${fmt(cs)} · ${fmt(ci)}</span></div>`;
      }).join("");
      return `<section class="ramp"><h4>${ramp} <small>${esc(desc)}</small></h4><div class="ramp-row">${sw}</div></section>`;
    }).join("\n");
    const semanticRows = semantic.map((s) => `<tr><td><span class="chip" style="background:${s.hex}"></span></td><td><code>${s.name}</code></td><td><code>${cssVar(s.path)}</code></td><td><code>${s.ref.replace("color.", "")}</code></td><td class="tab">${s.hex}</td><td>${esc(s.description)}</td></tr>`).join("\n");
    const contrastRows = PAIRINGS.map((p) => {
      const r = contrast(semHex.get(p.fg)!, semHex.get(p.bg)!);
      const ok = p.min === 0 ? "—" : r >= p.min ? "pass" : "FAIL";
      return `<tr class="${ok === "FAIL" ? "fail" : ""}"><td><span class="pair" style="background:${semHex.get(p.bg)};color:${semHex.get(p.fg)}">Aa</span></td><td><code>${p.fg}</code> on <code>${p.bg}</code></td><td class="tab">${fmt(r)}</td><td class="tab">${p.min || "n/a"}</td><td>${ok}</td><td>${esc(p.note)}</td></tr>`;
    }).join("\n");
    const typeRows = steps.map((s) => {
      const px = Math.round(parseFloat(s.fontSize) * 16);
      const style = `font-family:var(--dp-font-${s.family});font-size:${s.fontSize};line-height:${s.lineHeight};letter-spacing:${s.letterSpacing};font-weight:${s.fontWeight};${s.family === "sans" && px >= 42 ? "font-stretch:var(--dp-width-display);" : ""}`;
      return `<div class="ts"><div class="ts-meta"><code>${s.name}</code><span class="tab">${px}px / ${s.lineHeight} / ${s.letterSpacing}</span><span>${s.family === "sans" ? "Archivo" : "Source Serif 4"} ${s.fontWeight}</span></div><div class="ts-sample" style="${style}">${esc(s.description.replace(/^\d+px\. /, ""))}</div></div>`;
    }).join("\n");
    const logosDir = join(BRAND, "logos");
    const logo = (file: string) => existsSync(join(logosDir, file)) ? readFileSync(join(logosDir, file), "utf8").replace(/<\?xml[^>]*>/, "") : `<p class="missing">logos/${file} not built yet</p>`;
    const logoFiles = existsSync(logosDir) ? readdirSync(logosDir).filter((f) => f.endsWith(".svg")).sort() : [];
    const html = readFileSync(tpl, "utf8")
      .replaceAll("{{VERSION}}", version)
      .replace("{{TOKENS_CSS}}", readFileSync(join(DIST, "tokens.css"), "utf8"))
      .replace("{{FONT_FACES}}", fontFaces)
      .replace("{{RAMPS}}", ramps)
      .replace("{{SEMANTIC_ROWS}}", semanticRows)
      .replace("{{CONTRAST_ROWS}}", contrastRows)
      .replace("{{TYPE_ROWS}}", typeRows)
      .replace(/\{\{LOGO:([\w.-]+)\}\}/g, (_, f) => logo(f))
      .replace("{{LOGO_LIST}}", logoFiles.map((f) => `<code>${f}</code>`).join(", "));
    writeFileSync(join(BRAND, "brand-sheet.html"), html);
  }
}

console.log(`build-tokens: ${primitives.length} primitives, ${semantic.length} semantic roles, ${steps.length} type steps -> brand/dist + brand-sheet.html`);
