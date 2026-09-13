import Link from "next/link";
import type { ReactNode } from "react";

/** One kind of card: bordered, radius-surface, shadow-0. Hover is a border change, nothing lifts. */
export function Card({ href, title, children, meta, className = "", as: Tag = "h3" }: { href?: string; title: string; children?: ReactNode; meta?: ReactNode; className?: string; as?: "h2" | "h3" }) {
  const body = (
    <>
      <Tag className="font-sans text-title-sm">{href ? <Link href={href} className="ui-link text-ink after:absolute after:inset-0">{title}</Link> : title}</Tag>
      {children ? <div className="mt-2 font-sans text-small text-ink-muted">{children}</div> : null}
      {meta ? <div className="mt-3 font-sans text-caption text-ink-muted">{meta}</div> : null}
    </>
  );
  return <article className={`relative rounded-surface border border-border bg-surface-raised p-5 shadow-0 transition-colors duration-(--dp-duration-fast) hover:border-border-strong ${className}`}>{body}</article>;
}

export function CardGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>{children}</div>;
}
