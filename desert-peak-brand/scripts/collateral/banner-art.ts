/**
 * Brand illustration for the banners: a Basin and Range horizon built from the badge's own geometry.
 *
 * The brand guide's illustration direction is diagrammatic — strata bands, rules, contour and section
 * drawings, in token colours. This draws the same idea the mark draws: layered ridges, the nearest one
 * carrying the badge's snow notch, each layer a step along the brand ramp so depth comes from tonal
 * steps rather than shadow or gradient. Every peak uses the badge mountain's slope (154 run / 222 rise),
 * so the field and the mark are the same drawing at two scales.
 *
 * Deterministic: the ridge line is generated from a fixed seed, so a rebuild is byte-identical.
 * Shapes are wrapped in <g data-art="ridges"> so the identity lock can tell brand illustration from a
 * redrawn mark.
 */
import { prim, r2, sem } from "./lib.ts";

/** Mulberry32 — small, seeded, reproducible. */
function rng(seed: number) {
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const SLOPE = 222 / 154;   // the badge mountain's rise over run

export type Theme = "light" | "dark";
/** Ridge tints, far to near. Light: the brand ramp's pale steps. Dark: its deep steps, on surface-inverse. */
const LAYERS: Record<Theme, string[]> = {
  light: [prim("neutral.100"), prim("neutral.200"), prim("brand.200"), prim("brand.400")],
  dark: [prim("brand.800"), prim("brand.700"), prim("brand.600"), prim("brand.500")],
};
const SNOW: Record<Theme, string> = { light: sem("surface"), dark: sem("surface-inverse") };
const HORIZON: Record<Theme, string> = { light: prim("neutral.200"), dark: prim("brand.700") };

/**
 * One ridge: a run of triangular peaks across `w`, base at `baseY`, tallest peak `peakH`.
 * Peaks share the badge's slope, so their width follows their height.
 */
function ridge(w: number, baseY: number, peakH: number, seed: number, jitter: number): string {
  const rand = rng(seed);
  const pts: [number, number][] = [[-40, baseY]];
  let x = -40 + rand() * peakH * 0.4;
  while (x < w + 60) {
    const h = peakH * (0.55 + rand() * 0.45) * (1 - jitter / 2 + rand() * jitter);
    const half = h / SLOPE;
    pts.push([r2(x), r2(baseY)], [r2(x + half), r2(baseY - h)], [r2(x + half * 2), r2(baseY)]);
    x += half * 2 - half * (0.15 + rand() * 0.35);   // overlap the next peak so the ridge reads as a range
  }
  pts.push([r2(w + 60), baseY]);
  return pts.map((p) => p.join(",")).join(" ");
}

/** A snow notch on the nearest ridge's tallest peak, echoing the badge's cap. */
function snowNotch(apexX: number, apexY: number, depth: number, fill: string): string {
  const half = depth / SLOPE;
  const l = apexX - half, rr = apexX + half, y = apexY + depth;
  return `<path fill="${fill}" d="M ${r2(apexX)} ${r2(apexY)} L ${r2(rr)} ${r2(y)} q ${r2(-half * 0.55)} ${r2(depth * 0.3)} ${r2(-half * 0.9)} ${r2(-depth * 0.12)} q ${r2(-half * 0.5)} ${r2(depth * 0.36)} ${r2(-half * 1.1)} ${r2(-depth * 0.05)} L ${r2(l)} ${r2(y)} Z"/>`;
}

export type ArtOpts = { w: number; h: number; theme: Theme; /** how far across the banner the field reaches, 0–1 */ reach: number; seed?: number };
/**
 * The horizon field, anchored bottom-left and bleeding off the bottom and both sides it touches.
 * Returns a <g data-art="ridges"> ready to drop in behind the text.
 */
export function ridgeField({ w, h, theme, reach, seed = 20260921 }: ArtOpts): string {
  const layers = LAYERS[theme];
  const fieldW = Math.max(120, w * reach);
  const baseY = h + 2;                       // bleed past the bottom edge
  // peaks are bounded by the column as well as the banner, so a narrow column gets a finer range
  const tallest = Math.min(h * 0.62, fieldW * 0.52);
  const heights = [tallest * 0.46, tallest * 0.62, tallest * 0.8, tallest];
  const parts: string[] = [];
  // the horizon the range stands on
  parts.push(`<rect x="0" y="${r2(baseY - tallest * 0.30)}" width="${r2(fieldW)}" height="1" fill="${HORIZON[theme]}"/>`);
  for (let i = 0; i < layers.length; i++) {
    const isNear = i === layers.length - 1;
    const pts = ridge(fieldW, baseY, heights[i], seed + i * 977, isNear ? 0.12 : 0.3);
    parts.push(`<polygon fill="${layers[i]}" points="${pts}"/>`);
    if (isNear) {
      const coords = pts.split(" ").map((p) => p.split(",").map(Number) as [number, number]);
      const apex = coords.reduce((a, b) => (b[1] < a[1] ? b : a), coords[0]);
      parts.push(snowNotch(apex[0], apex[1], heights[i] * 0.2, SNOW[theme]));
    }
  }
  return `<g data-art="ridges">${parts.join("")}</g>`;
}
