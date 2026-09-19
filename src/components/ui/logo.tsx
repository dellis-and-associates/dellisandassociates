/**
 * The logo files exactly as the brand package ships them
 * (desert-peak-brand/brand/logo/daniel-refined/web → public/brand, byte-identical:
 * Daniel's badge with the wordmark set in Figtree, the brand text face). Nothing is re-drawn or re-typeset
 * here; the <img> keeps each file's own <title>. The badge alone (mark.svg,
 * mark-reversed.svg) is the lockup's own badge group at 400 × 400.
 * Sizes from the logo tokens: 48 px in the header on desktop, 40 on mobile
 * (`.lockup-header`), the badge alone under 360 px; 56 px in the footer. The badge reads fully at
 * 40 px and above and as ring-and-peak at 24–32 px (web/CHANGES.md).
 */
const LOCKUP = { w: 297.44, h: 69 }; // viewBox of logo-horizontal.svg / logo-reversed.svg / logo-mono.svg
const STACKED = { w: 205.05, h: 270 }; // viewBox of logo-stacked.svg / logo-stacked-reversed.svg
const MARK = { w: 400, h: 400 }; // viewBox of mark.svg / mark-reversed.svg
const at = (box: { w: number; h: number }, h: number) => ({ width: Math.round((box.w / box.h) * h), height: h });
const ALT = "Desert Peak Insurance";

// The height class is explicit: the base stylesheet sets img { height: auto }, and an SVG file's intrinsic size is its viewBox aspect only.
const H: Record<number, string> = { 24: "h-6", 32: "h-8", 40: "h-10", 48: "h-12", 56: "h-14", 120: "h-30", 160: "h-40" };

/**
 * Horizontal lockup. `reversed` for surface-inverse and brand fills; `mono`
 * inherits the text colour (currentColor). `height="header"` takes the
 * header sizes from the logo tokens (40 px, 48 px from 768 px).
 */
export function Lockup({ reversed = false, mono = false, height = 40, className = "", lazy = false }: { reversed?: boolean; mono?: boolean; height?: 32 | 40 | 48 | 56 | "header"; className?: string; lazy?: boolean }) {
  const d = at(LOCKUP, height === "header" ? 48 : height);
  const src = mono ? "/brand/logo-mono.svg" : reversed ? "/brand/logo-reversed.svg" : "/brand/logo-horizontal.svg";
  const size = height === "header" ? "lockup-header" : H[height];
  return <img src={src} alt={ALT} width={d.width} height={d.height} className={`${size} w-auto ${className}`} decoding="async" loading={lazy ? "lazy" : undefined} />;
}

/** Stacked lockup for cards and anywhere square, or where the width is under about 200 px. */
export function Stacked({ reversed = false, height = 120, className = "", lazy = false }: { reversed?: boolean; height?: 120 | 160; className?: string; lazy?: boolean }) {
  const d = at(STACKED, height);
  return <img src={reversed ? "/brand/logo-stacked-reversed.svg" : "/brand/logo-stacked.svg"} alt={ALT} width={d.width} height={d.height} className={`${H[height]} w-auto ${className}`} decoding="async" loading={lazy ? "lazy" : undefined} />;
}

/** The badge alone, 24 px and above, where the name appears elsewhere. */
export function Mark({ reversed = false, height = 32, className = "", alt = ALT }: { reversed?: boolean; height?: 24 | 32 | 40 | 48; className?: string; alt?: string }) {
  const d = at(MARK, height);
  return <img src={reversed ? "/brand/mark-reversed.svg" : "/brand/mark.svg"} alt={alt} width={d.width} height={d.height} className={`${H[height]} w-auto ${className}`} decoding="async" />;
}
