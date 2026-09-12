/**
 * Shared helpers for build-tokens.ts and audit-contrast.ts.
 * Zero dependencies. Runs on Node ≥ 22.6 with native TypeScript type stripping.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const BRAND = join(ROOT, "brand");

// ---------------------------------------------------------------------------
// Token tree
// ---------------------------------------------------------------------------
export type Token = { $type?: string; $value: unknown; $description?: string; $extensions?: Record<string, unknown> };
export type Flat = Map<string, Token>;

export function loadTokens(): Record<string, unknown> {
  return JSON.parse(readFileSync(join(BRAND, "design-tokens.json"), "utf8"));
}

/** Flatten the tree into "a.b.c" -> token. Group-level $description etc. are skipped. */
export function flatten(tree: Record<string, unknown>, prefix: string[] = [], out: Flat = new Map()): Flat {
  for (const [k, v] of Object.entries(tree)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "$value" in (v as object)) out.set([...prefix, k].join("."), v as Token);
    else if (v && typeof v === "object") flatten(v as Record<string, unknown>, [...prefix, k], out);
  }
  return out;
}

const ALIAS = /^\{([^}]+)\}$/;
export function isAlias(v: unknown): v is string { return typeof v === "string" && ALIAS.test(v); }
export function aliasTarget(v: string): string { return v.match(ALIAS)![1]; }

/** Resolve a value (string, array or object) through aliases until it is concrete. */
export function resolve<T = unknown>(value: unknown, flat: Flat, seen: string[] = []): T {
  if (isAlias(value)) {
    const path = aliasTarget(value);
    if (seen.includes(path)) throw new Error(`Circular alias: ${[...seen, path].join(" -> ")}`);
    const t = flat.get(path);
    if (!t) throw new Error(`Unknown alias {${path}} referenced from ${seen.at(-1) ?? "root"}`);
    return resolve(t.$value, flat, [...seen, path]);
  }
  if (Array.isArray(value)) return value.map((v) => resolve(v, flat, seen)) as T;
  if (value && typeof value === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) o[k] = resolve(v, flat, seen);
    return o as T;
  }
  return value as T;
}

/** Follow an alias chain and return the final primitive path (for documentation). */
export function aliasChainEnd(value: unknown, flat: Flat): string | null {
  let cur = value, last: string | null = null;
  while (isAlias(cur)) { last = aliasTarget(cur); cur = flat.get(last)?.$value; }
  return last;
}

// ---------------------------------------------------------------------------
// Colour math (OKLCH ⇄ sRGB, WCAG, CVD simulation)
// ---------------------------------------------------------------------------
export type RGB = [number, number, number];

export function parseOklch(s: string): { L: number; C: number; h: number; alpha: number } {
  const m = s.trim().match(/^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)$/i);
  if (!m) throw new Error(`Not an oklch() string: ${s}`);
  let L = parseFloat(m[1]); if (s.includes("%") && m[1].length && /%/.test(s.split(/\s/)[0])) L /= 100; else if (L > 1) L /= 100;
  const alpha = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
  return { L, C: parseFloat(m[2]), h: parseFloat(m[3]), alpha };
}

export function oklchToLinear(L: number, C: number, h: number): RGB {
  const a = C * Math.cos((h * Math.PI) / 180), b = C * Math.sin((h * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
export function linearToOklab([r, g, b]: RGB): [number, number, number] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const gamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
const degamma = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const inGamut = (rgb: RGB) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);

export function linearToHex(rgb: RGB): string {
  return "#" + rgb.map((v) => Math.round(clamp01(gamma(clamp01(v))) * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}
/** OKLCH -> sRGB hex, reducing chroma until the colour is inside sRGB (hue and lightness are preserved). */
export function oklchToHex(s: string): string {
  const { L, C, h } = parseOklch(s);
  let c = C;
  while (!inGamut(oklchToLinear(L, c, h)) && c > 0) c -= 0.001;
  return linearToHex(oklchToLinear(L, Math.max(0, c), h));
}
export function hexToLinear(hex: string): RGB {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => degamma(parseInt(h.slice(i, i + 2), 16) / 255)) as RGB;
}
export function hexToOklab(hex: string) { return linearToOklab(hexToLinear(hex)); }
export function hexToOklchString(hex: string): string {
  const [L, a, b] = hexToOklab(hex);
  let h = (Math.atan2(b, a) * 180) / Math.PI; if (h < 0) h += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${Math.hypot(a, b).toFixed(3)} ${h.toFixed(1)})`;
}
/** Any colour token value (oklch string or hex) -> hex. */
export function toHex(v: string): string {
  if (v.startsWith("#")) return v.toUpperCase();
  if (v.startsWith("oklch")) return oklchToHex(v);
  throw new Error(`Unsupported colour value: ${v}`);
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToLinear(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** WCAG 2.x contrast ratio. */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Machado, Oliveira & Fernandes (2009) severity-1.0 matrices, applied in linear sRGB. Same model Chrome DevTools uses. */
const CVD: Record<"protan" | "deutan", number[][]> = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
};
export function simulate(hex: string, kind: "protan" | "deutan"): string {
  const rgb = hexToLinear(hex);
  const M = CVD[kind];
  const out = M.map((row) => clamp01(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])) as RGB;
  return linearToHex(out);
}
/** Euclidean distance in OKLab. ~0.02 is a just-noticeable difference; 0.1 is clearly different. */
export function deltaE(a: string, b: string): number {
  const [l1, a1, b1] = hexToOklab(a), [l2, a2, b2] = hexToOklab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}
export function lightness(hex: string): number { return hexToOklab(hex)[0]; }

// ---------------------------------------------------------------------------
// Naming
// ---------------------------------------------------------------------------
/** "semantic.color.brand-hover" -> "--dp-brand-hover"; "color.brand.600" -> "--dp-color-brand-600" */
export function cssVar(path: string): string {
  const parts = path.split(".");
  if (parts[0] === "semantic" && parts[1] === "color") return `--dp-${parts.slice(2).join("-")}`;
  if (parts[0] === "typography" && parts[1] === "scale") return `--dp-text-${parts.slice(2).join("-")}`;
  if (parts[0] === "typography" && parts[1] === "family") return `--dp-font-${parts.slice(2).join("-")}`;
  if (parts[0] === "typography") return `--dp-${parts.slice(1).join("-")}`;
  if (parts[0] === "motion") return `--dp-${parts.slice(1).join("-")}`;
  return `--dp-${parts.join("-")}`;
}
export const fmt = (n: number) => n.toFixed(2);

// ---------------------------------------------------------------------------
// The contrast gate: every legitimate foreground/background pairing in the semantic layer.
// Shared by audit-contrast.ts (the gate) and build-tokens.ts (the approval sheet).
// ---------------------------------------------------------------------------
export type Pairing = { fg: string; bg: string; min: 4.5 | 3 | 0; kind: "text" | "ui" | "decorative"; note: string };
const T = (fg: string, bg: string, note: string): Pairing => ({ fg, bg, min: 4.5, kind: "text", note });
const U = (fg: string, bg: string, note: string): Pairing => ({ fg, bg, min: 3, kind: "ui", note });
const D = (fg: string, bg: string, note: string): Pairing => ({ fg, bg, min: 0, kind: "decorative", note });
export const PAIRINGS: Pairing[] = [
  T("ink", "surface", "Body text on the page"),
  T("ink", "surface-raised", "Body text on cards"),
  T("ink", "surface-sunken", "Body text in wells and table headers"),
  T("ink-muted", "surface", "Captions and metadata"),
  T("ink-muted", "surface-raised", "Captions on cards"),
  T("ink-muted", "surface-sunken", "Captions in wells"),
  T("ink-inverse", "surface-inverse", "Text on dark panels and footer"),
  T("brand", "surface", "Links and brand-coloured text"),
  T("brand", "surface-raised", "Links on cards"),
  T("brand-hover", "surface", "Hovered links"),
  T("brand-ink", "brand", "Primary button label"),
  T("brand-ink", "brand-hover", "Primary button label, hover"),
  T("brand-ink", "brand-active", "Primary button label, pressed"),
  T("brand-subtle-ink", "brand-subtle", "Text on brand-tinted panels"),
  T("ink", "brand-subtle", "Body text on brand-tinted panels"),
  T("accent-strong", "surface", "Ochre where it carries text or an icon"),
  T("positive", "surface", "Positive text and icons on the page"),
  T("positive-ink", "positive-surface", "Text inside a positive callout"),
  T("ink", "positive-surface", "Body text inside a positive callout"),
  T("notice", "surface", "Notice text and icons on the page"),
  T("notice-ink", "notice-surface", "Text inside a notice callout"),
  T("ink", "notice-surface", "Body text inside a notice callout"),
  T("critical", "surface", "Critical text and icons on the page"),
  T("critical-ink", "critical-surface", "Text inside a critical callout"),
  T("ink", "critical-surface", "Body text inside a critical callout"),
  U("border-strong", "surface", "Input borders on the page"),
  U("border-strong", "surface-raised", "Input borders on cards"),
  U("brand", "surface", "Primary button boundary and icon-only brand controls"),
  U("brand", "surface-raised", "Brand controls on cards"),
  U("positive-border", "surface", "Positive callout border"),
  U("notice-border", "surface", "Notice callout border"),
  U("critical-border", "surface", "Critical callout border and invalid-input outline"),
  U("critical", "surface-raised", "Destructive (outlined) button boundary on cards"),
  U("focus-ring", "surface", "Focus ring against the page"),
  U("focus-ring", "surface-raised", "Focus ring against cards"),
  U("focus-ring", "surface-sunken", "Focus ring against wells"),
  U("focus-ring", "focus-ring-offset", "Focus ring against its own 2px halo"),
  U("focus-ring-offset", "brand", "Focus halo against a primary button (the ring sits outside the halo)"),
  U("focus-ring-offset", "surface-inverse", "Focus halo against a dark panel"),
  U("ink-inverse", "brand", "Icons on brand fills"),
  D("border", "surface", "Hairline dividers. Decorative only; must never carry meaning"),
  D("accent", "surface", "Ochre rules and marks. Decorative only; never text"),
  D("surface-raised", "surface", "Card against page (shadow and border carry the edge)"),
  D("surface-sunken", "surface", "Well against page"),
];
/** State colours that must stay distinguishable from one another under colour-vision deficiency. */
export const STATE_SET = ["positive", "notice", "critical"] as const;
/** Reported against the states for information; brand is not a status colour and status UI never relies on colour alone. */
export const INFO_SET = ["brand"] as const;
export const CVD_MIN_DELTA_E = 0.08;   // OKLab distance between any two state colours, normal and simulated
export const CVD_MIN_DELTA_L = 0.05;   // lightness separation: the non-hue cue
