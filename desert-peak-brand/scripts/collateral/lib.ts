/**
 * Shared helpers for every Stage 5 collateral generator.
 *
 * Principles enforced here, so generators cannot forget them:
 *  - colours come only from brand/design-tokens.json (sem() / prim());
 *  - the mark and lockups are copied verbatim from brand/logos (markBlock() / lockupBlock());
 *  - fonts are the two token families, self-hosted, measured with fontkit for exact wrapping;
 *  - anything mentioning Medicare must carry the TPMO text (medicareGuard());
 *  - TODO tokens stay visibly unfinished (isTodo()); nothing invents a fact.
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { aliasChainEnd, flatten, loadTokens, toHex, type Flat } from "../lib.ts";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");

export const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BRAND = join(ROOT, "brand");
export const LOGOS = join(BRAND, "logos");
export const FONTS = join(BRAND, "fonts");
export const CACHE = join(ROOT, ".cache");
export const TODAY = "2026-09-13";
mkdirSync(CACHE, { recursive: true });

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------
const tree = loadTokens();
const flat: Flat = flatten(tree);
const primHex = new Map<string, string>();
for (const [p, t] of flat) if (p.startsWith("color.")) primHex.set(p.replace("color.", ""), toHex(t.$value as string));
const semHex = new Map<string, string>();
for (const [p, t] of flat) if (p.startsWith("semantic.color.")) semHex.set(p.replace("semantic.color.", ""), primHex.get(aliasChainEnd(t.$value, flat)!.replace("color.", ""))!);

/** Semantic role -> hex. Throws on unknown role so a typo cannot introduce a colour. */
export function sem(role: string): string { const h = semHex.get(role); if (!h) throw new Error(`Unknown semantic colour role: ${role}`); return h; }
/** Primitive step ("brand.600") -> hex. Use only where the guide allows (ramps in documentation). */
export function prim(path: string): string { const h = primHex.get(path); if (!h) throw new Error(`Unknown primitive: ${path}`); return h; }
export const ALLOWED_HEX: ReadonlySet<string> = new Set(primHex.values());
export const SEMANTIC: ReadonlyMap<string, string> = semHex;
export const PRIMITIVES: ReadonlyMap<string, string> = primHex;

type Step = { fontSize: string; lineHeight: number; letterSpacing: string; fontWeight: number; family: "sans" | "serif"; px: number };
const scale = new Map<string, Step>();
for (const [p, t] of flat) if (p.startsWith("typography.scale.")) {
  const v = t.$value as any;
  const family = aliasChainEnd(v.fontFamily, flat)!.endsWith("serif") ? "serif" : "sans";
  scale.set(p.replace("typography.scale.", ""), { fontSize: v.fontSize, lineHeight: v.lineHeight, letterSpacing: v.letterSpacing, fontWeight: v.fontWeight, family, px: Math.round(parseFloat(v.fontSize) * 16) });
}
export function step(name: string): Step { const s = scale.get(name); if (!s) throw new Error(`Unknown type step: ${name}`); return s; }
export const TYPE_STEPS: ReadonlyMap<string, Step> = scale;
export const FAMILY = { sans: "Archivo", serif: "Source Serif 4" } as const;
export const DISPLAY_WIDTH = (flat.get("typography.width.display")!.$value as number);
export const RADIUS = { control: flat.get("radius.control")!.$value as string, surface: flat.get("radius.surface")!.$value as string, pill: flat.get("radius.pill")!.$value as string };
export const TOKENS_CSS = readFileSync(join(BRAND, "dist", "tokens.css"), "utf8");

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------
export type Person = { slug: string; name: string; lastName: string; title: string; phone: string; email: string; licenses: Record<string, string>; medicareTrack: boolean; photo: string | null; linkedin: string | null };
export type Config = typeof import("../../collateral.config.json");
export const config: Config = JSON.parse(readFileSync(join(ROOT, "collateral.config.json"), "utf8"));
export const people: Person[] = JSON.parse(readFileSync(join(ROOT, "people.json"), "utf8")).people;
export const bannedPhrases: string[] = JSON.parse(readFileSync(join(ROOT, "content", "banned-phrases.json"), "utf8")).phrases;

export const TODO_RE = /\{\{TODO:[^}]+\}\}/g;
export const isTodo = (v: unknown): boolean => typeof v === "string" && /\{\{TODO:/.test(v);
/** Full display name; a TODO last name renders as the token so the gap is visible. */
export const fullName = (p: Person): string => isTodo(p.lastName) ? `${p.name} ${p.lastName}` : `${p.name} ${p.lastName}`.trim();
export const licenseLine = (p: Person): string => config.states.map((s) => `${s} ${p.licenses[s] ?? "{{TODO:license}}"}`).join(" · ");

// ---------------------------------------------------------------------------
// Compliance
// ---------------------------------------------------------------------------
export const TPMO_TEXT: string = config.medicare.tpmo.text;
const MEDICARE_RE = new RegExp(config.medicare.keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");
export const mentionsMedicare = (text: string): boolean => MEDICARE_RE.test(text);
/**
 * Every generator calls this with the asset's complete visible text before writing it.
 * If the text mentions Medicare and the TPMO text is not part of it, the asset does not export.
 */
export function medicareGuard(assetName: string, visibleText: string, flaggedMedicare: boolean): void {
  const mentions = mentionsMedicare(visibleText.replace(TPMO_TEXT, ""));
  const hasTpmo = visibleText.includes(TPMO_TEXT);
  if ((mentions || flaggedMedicare) && !hasTpmo) throw new Error(`REFUSED: ${assetName} mentions Medicare but does not carry the TPMO disclaimer.`);
}
/** Returns the banned phrases (and superlatives) found in a text layer. */
export function findBanned(text: string): string[] {
  const t = ` ${text.toLowerCase().replace(/\s+/g, " ")} `;
  return bannedPhrases.filter((p) => new RegExp(`(^|[^a-z0-9])${p.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(t));
}
export function bannedGuard(assetName: string, text: string): void {
  const hits = findBanned(text);
  if (hits.length) throw new Error(`REFUSED: ${assetName} contains banned phrase(s): ${hits.join(", ")}`);
}

// ---------------------------------------------------------------------------
// Marks and lockups: verbatim from brand/logos, never redrawn
// ---------------------------------------------------------------------------
const logoCache = new Map<string, string>();
function logoFile(name: string): string { if (!logoCache.has(name)) logoCache.set(name, readFileSync(join(LOGOS, name), "utf8")); return logoCache.get(name)!; }
export function logoViewBox(name: string): { w: number; h: number } {
  const m = logoFile(name).match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)!; return { w: parseFloat(m[1]), h: parseFloat(m[2]) };
}
/** The inner markup of a logo file (everything between <svg ...> and </svg>, minus the <title>). */
export function logoInner(name: string): string {
  return logoFile(name).replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[^>]*>[^<]*<\/title>/, "");
}
/**
 * The mark (or favicon variant) as a <g> you can transform, with the polygons byte-identical to the
 * reference file except for the fill, which must be a token colour or currentColor.
 */
export function markBlock(opts: { variant?: "mark" | "favicon"; fill: string; transform?: string }): string {
  const file = opts.variant === "favicon" ? "favicon.svg" : "mark.svg";
  const inner = logoInner(file).replace(/fill="#[0-9A-Fa-f]{6}"/g, "");
  if (opts.fill !== "currentColor" && !ALLOWED_HEX.has(opts.fill.toUpperCase())) throw new Error(`Mark fill is not a token colour: ${opts.fill}`);
  return `<g data-logo="${file}" fill="${opts.fill}"${opts.transform ? ` transform="${opts.transform}"` : ""}>${inner}</g>`;
}
/** A lockup (horizontal, stacked, reversed, mono, wordmark) as a transformable <g>, colours untouched. */
export function lockupBlock(name: "logo-horizontal.svg" | "logo-stacked.svg" | "logo-reversed.svg" | "logo-mono.svg" | "wordmark.svg", transform?: string): string {
  return `<g data-logo="${name}"${transform ? ` transform="${transform}"` : ""}>${logoInner(name)}</g>`;
}
/** Scale + translate so a logo of natural size (w×h) fits a box; returns the transform and the placed size. */
export function fitTransform(natural: { w: number; h: number }, box: { x: number; y: number; w: number; h: number }, align: "center" | "left" = "center") {
  const s = Math.min(box.w / natural.w, box.h / natural.h);
  const pw = natural.w * s, ph = natural.h * s;
  const x = align === "left" ? box.x : box.x + (box.w - pw) / 2;
  const y = box.y + (box.h - ph) / 2;
  return { transform: `translate(${r2(x)} ${r2(y)}) scale(${r2(s)})`, w: pw, h: ph, x, y, s };
}

// ---------------------------------------------------------------------------
// Fonts: @font-face for renders, fontkit for measurement
// ---------------------------------------------------------------------------
const FONT_FILES = [
  { family: "Archivo", file: "archivo-variable.woff2", style: "normal", weight: "100 900", stretch: "62% 125%" },
  { family: "Archivo", file: "archivo-italic-variable.woff2", style: "italic", weight: "100 900", stretch: "62% 125%" },
  { family: "Source Serif 4", file: "source-serif-4-variable.woff2", style: "normal", weight: "200 900", stretch: "" },
  { family: "Source Serif 4", file: "source-serif-4-italic-variable.woff2", style: "italic", weight: "200 900", stretch: "" },
];
/** @font-face rules. `base` is the URL prefix for the woff2 files (relative path or data:). */
export function fontFaceCss(base: string | "data"): string {
  return FONT_FILES.map((f) => {
    const src = base === "data" ? `data:font/woff2;base64,${readFileSync(join(FONTS, f.file)).toString("base64")}` : `${base}/${f.file}`;
    return `@font-face{font-family:"${f.family}";src:url("${src}") format("woff2");font-weight:${f.weight};${f.stretch ? `font-stretch:${f.stretch};` : ""}font-style:${f.style};font-display:block}`;
  }).join("\n");
}
export type FontKey = "sans-400" | "sans-500" | "sans-600" | "sans-display" | "serif-400" | "serif-600" | "serif-italic";
const STATIC: Record<FontKey, string> = {
  "sans-400": "Archivo-Regular.ttf", "sans-500": "Archivo-Medium.ttf", "sans-600": "Archivo-SemiBold.ttf", "sans-display": "ArchivoDisplay-SemiBold.ttf",
  "serif-400": "SourceSerif4-Regular.ttf", "serif-600": "SourceSerif4-SemiBold.ttf", "serif-italic": "SourceSerif4-Italic.ttf",
};
export const staticFontPath = (k: FontKey) => join(FONTS, "static", STATIC[k]);
const fkCache = new Map<FontKey, any>();
function fk(k: FontKey) { if (!fkCache.has(k)) fkCache.set(k, fontkit.openSync(staticFontPath(k))); return fkCache.get(k); }
/** Advance width of a string in px at `size`, with the font's own kerning, plus tracking in em. */
export function measure(text: string, key: FontKey, size: number, trackingEm = 0): number {
  const f = fk(key);
  const run = f.layout(text);
  return (run.advanceWidth / f.unitsPerEm) * size + trackingEm * size * Math.max(0, text.length - 1);
}
/** Greedy word wrap using real glyph advances. Returns lines; never breaks a word. */
export function wrap(text: string, key: FontKey, size: number, maxWidth: number, trackingEm = 0): string[] {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    const words = para.split(/\s+/).filter(Boolean);
    let line = "";
    for (const w of words) {
      const trial = line ? `${line} ${w}` : w;
      if (measure(trial, key, size, trackingEm) <= maxWidth || !line) line = trial;
      else { lines.push(line); line = w; }
    }
    lines.push(line);
  }
  return lines;
}
/** Largest size ≤ max at which the text fits `maxLines` lines within maxWidth (min-bounded). */
export function fitSize(text: string, key: FontKey, maxWidth: number, maxLines: number, max: number, min: number, trackingEm = 0): number {
  for (let s = max; s >= min; s -= 1) if (wrap(text, key, s, maxWidth, trackingEm).length <= maxLines) return s;
  return min;
}
export const capHeightRatio = (key: FontKey) => fk(key).capHeight / fk(key).unitsPerEm;

/** SVG <text> with one <tspan> per wrapped line. Weight/family are token families only. */
export function svgText(opts: { x: number; y: number; lines: string[]; size: number; family: "sans" | "serif"; weight: number; fill: string; lineHeight: number; tracking?: string; anchor?: "start" | "middle" | "end"; stretch?: number; italic?: boolean; extra?: string }): string {
  const fam = opts.family === "sans" ? FAMILY.sans : FAMILY.serif;
  const lh = opts.size * opts.lineHeight;
  const spans = opts.lines.map((l, i) => `<tspan x="${r2(opts.x)}" y="${r2(opts.y + i * lh)}">${esc(l)}</tspan>`).join("");
  return `<text font-family="${fam}" font-size="${r2(opts.size)}" font-weight="${opts.weight}" fill="${opts.fill}"${opts.tracking ? ` letter-spacing="${opts.tracking}"` : ""}${opts.anchor ? ` text-anchor="${opts.anchor}"` : ""}${opts.stretch ? ` font-stretch="${opts.stretch}%"` : ""}${opts.italic ? ` font-style="italic"` : ""}${opts.extra ? ` ${opts.extra}` : ""}>${spans}</text>`;
}

// ---------------------------------------------------------------------------
// Files and rendering
// ---------------------------------------------------------------------------
export const r2 = (n: number) => Math.round(n * 100) / 100;
export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function write(path: string, content: string | Buffer): void { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); }
export function svgDoc(w: number, h: number, body: string, opts: { title: string; fontBase?: string; desc?: string }): string {
  const style = opts.fontBase ? `<style>${fontFaceCss(opts.fontBase)}</style>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t">\n<title id="t">${esc(opts.title)}</title>${opts.desc ? `<desc>${esc(opts.desc)}</desc>` : ""}\n${style}\n${body}\n</svg>\n`;
}
export function relFonts(fromFile: string): string { return relative(dirname(fromFile), FONTS).split("\\").join("/"); }

let chromeBin: string | null = null;
export function chrome(): string {
  if (chromeBin) return chromeBin;
  for (const c of [process.env.CHROME, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    if (!c) continue;
    try { execFileSync("which", [c], { stdio: "pipe" }); chromeBin = c; return c; } catch {}
  }
  throw new Error("No Chrome/Chromium found. Install one or set CHROME=/path/to/chrome.");
}
export type RenderJob = { src: string; out: string; w: number; h: number; transparent?: boolean; scale?: number };

/**
 * Deterministic rendering through the DevTools protocol (one Chrome for all jobs):
 * Emulation.setDeviceMetricsOverride fixes the viewport and device scale factor BEFORE navigation,
 * document.fonts.ready is awaited, then Page.captureScreenshot with an explicit clip. The
 * `--screenshot` flag in Chrome's new headless mode races both the window size and the scale factor
 * (renders came out truncated or half-scale at random), so it is not used.
 */
class Cdp {
  private ws!: WebSocket; private id = 0; private pending = new Map<number, { res: (v: any) => void; rej: (e: any) => void }>();
  private events = new Map<string, ((p: any) => void)[]>();
  proc!: import("node:child_process").ChildProcess;
  profile = join(CACHE, `chrome-profile-cdp-${process.pid}-${Math.random().toString(36).slice(2)}`);
  async start(): Promise<void> {
    const bin = chrome();
    const args = ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--disable-extensions", "--no-first-run", "--no-default-browser-check", "--disable-dev-shm-usage", "--remote-debugging-port=0", `--user-data-dir=${this.profile}`, "about:blank"];
    this.proc = spawn(bin, args, { stdio: ["ignore", "ignore", "pipe"] });
    const url = await new Promise<string>((res, rej) => {
      let buf = ""; const t = setTimeout(() => rej(new Error("Chrome did not expose a DevTools endpoint in 30s")), 30_000);
      this.proc.stderr!.on("data", (d) => { buf += d.toString(); const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); res(m[1]); } });
      this.proc.on("exit", () => rej(new Error("Chrome exited before exposing DevTools")));
    });
    this.ws = new WebSocket(url);
    await new Promise<void>((res, rej) => { this.ws.addEventListener("open", () => res()); this.ws.addEventListener("error", (e) => rej(e)); });
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && this.pending.has(msg.id)) { const p = this.pending.get(msg.id)!; this.pending.delete(msg.id); msg.error ? p.rej(new Error(msg.error.message)) : p.res(msg.result); }
      else if (msg.method) for (const h of this.events.get(`${msg.sessionId ?? ""}:${msg.method}`) ?? []) h(msg.params);
    });
  }
  send(method: string, params: Record<string, unknown> = {}, sessionId?: string): Promise<any> {
    const id = ++this.id;
    return new Promise((res, rej) => { this.pending.set(id, { res, rej }); this.ws.send(JSON.stringify({ id, method, params, sessionId })); });
  }
  once(sessionId: string, method: string): Promise<any> {
    return new Promise((res) => { const key = `${sessionId}:${method}`; const h = (p: any) => { this.events.set(key, (this.events.get(key) ?? []).filter((x) => x !== h)); res(p); }; this.events.set(key, [...(this.events.get(key) ?? []), h]); });
  }
  async render(j: RenderJob): Promise<void> {
    const { targetId } = await this.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await this.send("Target.attachToTarget", { targetId, flatten: true });
    try {
      await this.send("Page.enable", {}, sessionId);
      await this.send("Emulation.setDeviceMetricsOverride", { width: j.w, height: j.h, deviceScaleFactor: j.scale ?? 1, mobile: false }, sessionId);
      if (j.transparent) await this.send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } }, sessionId);
      const loaded = this.once(sessionId, "Page.loadEventFired");
      await this.send("Page.navigate", { url: `file://${resolvePath(j.src)}` }, sessionId);
      await Promise.race([loaded, new Promise((_, rej) => setTimeout(() => rej(new Error(`load timeout: ${j.src}`)), 30_000))]);
      await this.send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))", awaitPromise: true }, sessionId);
      const { data } = await this.send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: j.w, height: j.h, scale: 1 }, captureBeyondViewport: true, fromSurface: true }, sessionId);
      mkdirSync(dirname(j.out), { recursive: true });
      writeFileSync(j.out, Buffer.from(data, "base64"));
    } finally {
      await this.send("Target.closeTarget", { targetId }).catch(() => {});
    }
  }
  async stop(): Promise<void> {
    try { this.ws.close(); } catch {}
    try { this.proc.kill("SIGKILL"); } catch {}
    try { rmSync(this.profile, { recursive: true, force: true }); } catch {}
  }
}
/** Render local HTML/SVG files to PNG at exact pixel sizes. One Chrome, sequential targets, deterministic. */
export async function renderAll(jobs: RenderJob[], _concurrency = 2): Promise<void> {
  if (!jobs.length) return;
  const cdp = new Cdp();
  await cdp.start();
  try {
    for (const j of jobs) {
      let lastErr: unknown = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try { await cdp.render(j); lastErr = null; break; } catch (e) { lastErr = e; console.warn(`render: retry ${attempt + 1} for ${j.out}: ${(e as Error).message}`); }
      }
      if (lastErr) throw lastErr;
      const z = pngSize(j.out); const s = j.scale ?? 1;
      if (z.w !== Math.round(j.w * s) || z.h !== Math.round(j.h * s)) throw new Error(`render: ${j.out} is ${z.w}×${z.h}, expected ${j.w * s}×${j.h * s}`);
    }
  } finally { await cdp.stop(); }
}
/** Wrap a standalone SVG string in a minimal HTML document sized to it (so fonts resolve and the screenshot is exact). */
export function htmlForSvg(svg: string, w: number, h: number, bg = "transparent"): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:${bg};width:${w}px;height:${h}px;overflow:hidden}svg{display:block}</style></head><body>${svg}</body></html>`;
}
export function pngSize(path: string): { w: number; h: number } {
  const b = readFileSync(path);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
export function listFiles(dir: string, ext: RegExp): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) out.push(...listFiles(p, ext)); else if (ext.test(f.name)) out.push(p);
  }
  return out.sort();
}
export const dataUri = (path: string, mime: string) => `data:${mime};base64,${readFileSync(path).toString("base64")}`;
export const rel = (p: string) => relative(ROOT, p).split("\\").join("/");

// ---------------------------------------------------------------------------
// Inventory: every generator records what it produced; build-inventory.ts composes COLLATERAL-INVENTORY.md
// ---------------------------------------------------------------------------
export type InventoryRow = { asset: string; dimensions: string; source: string; spec?: string; specUrl?: string; checked?: string; notes?: string };
export function writeInventory(surfaceDir: string, rows: InventoryRow[]): void {
  write(join(surfaceDir, "INVENTORY.json"), JSON.stringify({ generated: TODAY, rows }, null, 2) + "\n");
}
