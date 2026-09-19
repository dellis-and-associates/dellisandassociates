import Link from "next/link";
import type { ReactNode } from "react";

/** Tag: a label, never a button. */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-control bg-brand-subtle px-2 py-0.5 font-text text-meta font-medium tracking-wide uppercase text-brand-subtle-ink">{children}</span>;
}

/** Progress and steppers are text first: "Step 2 of 4 · Vehicles". The bar is decoration for the same fact. */
export function Stepper({ step, total, label, steps }: { step: number; total: number; label: string; steps?: string[] }) {
  return (
    <div className="grid gap-2">
      <p className="font-text text-copy font-semibold text-ink" aria-live="polite">Step {step} of {total} · {label}</p>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-control ${i < step ? "bg-brand" : "bg-border"}`} />
        ))}
      </div>
      {steps ? (
        <ol className="sr-only">
          {steps.map((s, i) => (
            <li key={s} aria-current={i + 1 === step ? "step" : undefined}>{s}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function Progress({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  return (
    <div className="grid gap-1 font-text text-copy">
      <div className="flex justify-between"><span>{label}</span><span className="tabular">{Math.round((value / max) * 100)}%</span></div>
      <progress value={value} max={max} className="h-2 w-full overflow-hidden rounded-control bg-border [&::-webkit-progress-bar]:bg-border [&::-webkit-progress-value]:bg-brand [&::-moz-progress-bar]:bg-brand" />
    </div>
  );
}

/** Skeleton matches the final dimensions of what it stands in for, so nothing shifts. */
export function Skeleton({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`grid gap-2 ${className}`} aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className={`block h-4 rounded-control bg-surface-sunken ${i === lines - 1 ? "w-2/3" : "w-full"}`} aria-hidden />
      ))}
    </div>
  );
}

/** Empty states point at the next step. */
export function EmptyState({ title, children, action, as: Tag = "h2" }: { title: string; children?: ReactNode; action?: { label: string; href: string }; as?: "h2" | "h3" }) {
  return (
    <div className="rounded-surface border border-border bg-surface-sunken p-6">
      <Tag className="font-text text-title-sm">{title}</Tag>
      {children ? <p className="mt-2 max-w-measure-narrow font-text text-copy text-ink-muted">{children}</p> : null}
      {action ? <Link href={action.href} className="ui-link mt-4 font-text text-copy font-semibold">{action.label}</Link> : null}
    </div>
  );
}

/** Pagination: plain links, current page marked, previous/next named. */
export function Pagination({ page, pages, href }: { page: number; pages: number; href: (p: number) => string }) {
  if (pages <= 1) return null;
  const items = Array.from({ length: pages }, (_, i) => i + 1).filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 2);
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2 font-text text-copy">
      {page > 1 ? <Link href={href(page - 1)} className="ui-link min-h-6 px-2 py-1">Previous</Link> : null}
      {items.map((p, i) => (
        <span key={p} className="contents">
          {i > 0 && items[i - 1] !== p - 1 ? <span aria-hidden>…</span> : null}
          {p === page ? <span aria-current="page" className="min-h-6 rounded-control bg-brand-subtle px-2 py-1 text-brand-subtle-ink tabular">{p}</span> : <Link href={href(p)} className="ui-link min-h-6 px-2 py-1 tabular">{p}</Link>}
        </span>
      ))}
      {page < pages ? <Link href={href(page + 1)} className="ui-link min-h-6 px-2 py-1">Next</Link> : null}
    </nav>
  );
}

/** Tabs that are links: each tab is a page, so they work without JavaScript and the URL is the state. */
export function LinkTabs({ items, current, label }: { items: { label: string; href: string }[]; current: string; label: string }) {
  return (
    <nav aria-label={label} className="border-b border-border">
      <ul className="flex flex-wrap gap-x-6">
        {items.map((t) => {
          const active = t.href === current;
          return (
            <li key={t.href}>
              <Link href={t.href} aria-current={active ? "page" : undefined} className={`ui-link inline-block min-h-11 border-b-2 py-3 font-text text-copy font-semibold ${active ? "border-brand text-ink" : "border-transparent text-ink-muted hover:text-ink"}`}>{t.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Accordion: native details/summary; open works without JS; 120 ms opacity on the body only. */
export function Accordion({ items, name, tone = "default", openFirst = false }: { items: { id: string; question: string; answer: ReactNode }[]; name?: string; tone?: "default" | "inverse"; openFirst?: boolean }) {
  // <details> rather than a button + JS: it is a native disclosure, so it carries aria-expanded, works from the
  // keyboard, keeps its answer in the DOM for search engines, and opens with JavaScript off.
  const inverse = tone === "inverse";
  return (
    <div className={`divide-y ${inverse ? "divide-ink-inverse/25 border-y border-ink-inverse/25" : "divide-border rounded-surface border border-border"}`} data-faq>
      {items.map((it, i) => (
        <details key={it.id} id={it.id} name={name} open={openFirst && i === 0} className="group">
          <summary className={`flex min-h-11 items-center justify-between gap-4 py-5 font-text text-subhead font-medium ${inverse ? "text-ink-inverse" : "px-4 text-ink hover:bg-surface-sunken"}`}>
            <span>{it.question}</span>
            <span aria-hidden className={`transition-transform duration-(--dp-duration-fast) group-open:rotate-180 ${inverse ? "text-ink-inverse-secondary" : "text-ink-muted"}`}>⌄</span>
          </summary>
          <div className={`prose max-w-measure-editorial pb-6 font-text text-copy ${inverse ? "text-ink-inverse-secondary" : "px-4 pt-1 text-ink-secondary"}`}>{it.answer}</div>
        </details>
      ))}
    </div>
  );
}

/** Toast region: a polite live region the page owns; messages are also rendered inline where the action happened. */
export function Toast({ message, kind = "info" }: { message?: string; kind?: "info" | "positive" | "critical" }) {
  const cls = kind === "positive" ? "border-positive-border bg-positive-surface text-positive-ink" : kind === "critical" ? "border-critical-border bg-critical-surface text-critical-ink" : "border-border bg-surface-raised text-ink";
  return (
    <div role="status" aria-live="polite" className="fixed inset-x-4 bottom-4 z-40 sm:left-auto sm:w-96">
      {message ? <div className={`rounded-surface border border-l-4 p-4 font-text text-copy shadow-2 ${cls}`}>{message}</div> : null}
    </div>
  );
}

/** Tooltip: never the only place information lives; the trigger is a real button with the text also available on focus. */
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <span className="group relative inline-block">
      <button type="button" className="ui-link min-h-6 cursor-help font-text text-copy underline decoration-dotted underline-offset-4" aria-describedby={undefined}>{children}</button>
      <span role="tooltip" className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-64 rounded-surface border border-border bg-surface-raised p-3 font-text text-copy text-ink shadow-2 group-focus-within:block group-hover:block">{text}</span>
    </span>
  );
}

/** Dialog: the native element; opened with the HTML `open` attribute server-side or by a tiny client toggle. */
export function Dialog({ id, title, children, open, className = "" }: { id: string; title: string; children: ReactNode; open?: boolean; className?: string }) {
  return (
    <dialog id={id} open={open} className={`w-full max-w-measure-narrow rounded-surface border border-border bg-surface-raised p-6 text-ink shadow-3 backdrop:bg-surface-inverse/60 ${className}`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="font-text text-title-sm">{title}</h2>
      <div className="mt-3 font-text text-copy">{children}</div>
      <form method="dialog" className="mt-4"><button className="min-h-11 rounded-control border border-border-strong px-5 font-text text-copy font-semibold">Close</button></form>
    </dialog>
  );
}

/** The one large brand area on a template. Sticky bottom bar on phones for product and location templates. */
export function CtaBand({ heading, body, action, secondary, sticky = false }: { heading: string; body?: string; action: { label: string; href: string }; secondary?: { label: string; href: string }; sticky?: boolean }) {
  return (
    <section aria-labelledby="cta-heading" className={`cta-band bg-brand text-brand-ink ${sticky ? "max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:z-30 max-md:shadow-3" : "rounded-surface"}`} data-no-print>
      <div className={`mx-auto flex max-w-measure-shell flex-wrap items-center justify-between gap-4 ${sticky ? "px-gutter py-2 md:py-8" : "px-6 py-8 md:px-10"}`}>
        <div className={sticky ? "max-md:hidden" : ""}>
          <h2 id="cta-heading" className="font-text text-title-sm text-brand-ink">{heading}</h2>
          {body ? <p className="mt-1 max-w-measure-narrow font-text text-copy text-brand-ink">{body}</p> : null}
        </div>
        <div className={`flex flex-wrap gap-3 ${sticky ? "max-md:w-full max-md:flex-nowrap max-md:[&>a]:flex-1 max-md:[&>a]:justify-center" : ""}`}>
          <Link href={action.href} className="inline-flex min-h-11 items-center rounded-control border border-brand-ink bg-brand-ink px-5 font-text text-copy font-semibold text-brand no-underline hover:bg-surface">{action.label}</Link>
          {secondary ? <Link href={secondary.href} className="inline-flex min-h-11 items-center rounded-control border border-brand-ink px-5 font-text text-copy font-semibold text-brand-ink no-underline hover:bg-brand-hover">{secondary.label}</Link> : null}
        </div>
      </div>
    </section>
  );
}

export function StrataRule({ className = "" }: { className?: string }) {
  return <div className={`strata ${className}`} role="separator" aria-hidden />;
}

export function Section({ title, children, id, className = "" }: { title?: string; children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} aria-labelledby={title && id ? `${id}-h` : undefined} className={`grid gap-6 ${className}`}>
      {title ? <h2 id={id ? `${id}-h` : undefined}>{title}</h2> : null}
      {children}
    </section>
  );
}

export function RelatedLinks({ title = "Related", items }: { title?: string; items: { label: string; href: string; note?: string }[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label={title} className="grid gap-3">
      <h2 className="font-text text-title-sm">{title}</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href} className="font-text text-copy">
            <Link href={i.href} className="ui-link text-ink font-semibold">{i.label}</Link>
            {i.note ? <span className="block text-ink-muted">{i.note}</span> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
