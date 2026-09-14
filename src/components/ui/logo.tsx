/**
 * The logo files exactly as the brand package ships them
 * (desert-peak-brand/brand/logos → public/brand, byte-identical). Nothing is
 * re-drawn or re-typeset here; the <img> keeps each file's own <title>.
 * BRAND-GUIDE §6: lockup 40 px tall on desktop and 32 on mobile, the mark
 * alone under 360 px viewports, clear space of one band period (0.237 × height).
 */
const LOCKUP = { w: 334.12, h: 59 }; // viewBox of logo-horizontal.svg / logo-reversed.svg
const MARK = { w: 64, h: 59 };
const at = (box: { w: number; h: number }, h: number) => ({ width: Math.round((box.w / box.h) * h), height: h });

/** Horizontal lockup; `reversed` for surface-inverse and brand fills. */
const H: Record<number, string> = { 24: "h-6", 32: "h-8", 40: "h-10", 48: "h-12" };
export function Lockup({ reversed = false, height = 40, className = "", lazy = false }: { reversed?: boolean; height?: 32 | 40 | 48; className?: string; lazy?: boolean }) {
  const d = at(LOCKUP, height);
  // The height class is explicit: the base stylesheet sets img { height: auto }, and an SVG file's intrinsic size is its viewBox aspect only.
  return <img src={reversed ? "/brand/logo-reversed.svg" : "/brand/logo-horizontal.svg"} alt="Desert Peak Insurance" width={d.width} height={d.height} className={`${H[height]} w-auto ${className}`} decoding="async" loading={lazy ? "lazy" : undefined} />;
}

/** The mark alone, 24 px and above, where the name appears elsewhere. */
export function Mark({ height = 32, className = "", alt = "Desert Peak Insurance" }: { height?: 24 | 32 | 40 | 48; className?: string; alt?: string }) {
  const d = at(MARK, height);
  return <img src="/brand/mark.svg" alt={alt} width={d.width} height={d.height} className={`${H[height]} w-auto ${className}`} decoding="async" />;
}
