/**
 * Brand marks, inlined so they inherit nothing they should not and keep
 * their <title>. Geometry is copied verbatim from desert-peak-brand/brand/logos;
 * the hex literals are the brand's own (BRAND-GUIDE §6: logos carry hex).
 */
// tokens-ok: logo files carry brand hex by design (BRAND-GUIDE.md §6, DECISIONS.md "Logos carry hex literals")
const MARK = "M0 7h35.91l-1.57 10H0zM0 21h33.72l-1.56 10H0zM0 35h31.53l-1.56 10H0zM0 49h29.34l-1.56 10H0zM41 0h23v10H39.44zM38.81 14H64v10H37.25zM36.62 28H64v10H35.06zM34.43 42H64v10H32.87z";

export function Mark({ className, title = "Desert Peak Insurance" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 59" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <path d={MARK} fill="currentColor" />
    </svg>
  );
}

/** Horizontal lockup: mark + wordmark set in Archivo. 40 px tall on desktop, 32 on mobile; mark alone under 360 px (handled by the header). */
export function Lockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Mark className="h-8 w-auto text-brand md:h-10" />
      <span className="flex flex-col leading-none font-sans">
        <span className="text-title-sm font-semibold tracking-tight text-ink">Desert Peak</span>
        <span className="text-caption tracking-widest uppercase text-ink-muted">Insurance</span>
      </span>
    </span>
  );
}
