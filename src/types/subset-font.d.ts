/** subset-font ships no types; only the surface scripts/font-subset.mts uses. */
declare module "subset-font" {
  type AxisRange = number | { min: number; max: number; default?: number };
  export default function subsetFont(
    buffer: Buffer,
    text: string,
    options?: { targetFormat?: "sfnt" | "woff" | "woff2"; variationAxes?: Record<string, AxisRange>; preserveNameIds?: number[] },
  ): Promise<Buffer>;
}
