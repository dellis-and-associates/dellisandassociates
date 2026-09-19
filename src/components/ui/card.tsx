import Link from "next/link";
import type { ReactNode } from "react";

/** One kind of card: bordered, radius-surface,. Hover is a border change, nothing lifts. */
export function Card({ href, title, children, meta, className = "", as: Tag = "h3" }: { href?: string; title: string; children?: ReactNode; meta?: ReactNode; className?: string; as?: "h2" | "h3" }) {
  const body = (
    <>
      <Tag className="font-text text-title-sm">{href ? <Link href={href} className="ui-link text-ink after:absolute after:inset-0">{title}</Link> : title}</Tag>
      {children ? <div className="mt-2 font-text text-copy text-ink-muted">{children}</div> : null}
      {meta ? <div className="mt-3 font-text text-meta text-ink-muted">{meta}</div> : null}
    </>
  );
  return <article className={`relative rounded-surface border border-border bg-surface-raised p-5 transition-colors duration-(--dp-duration-fast) hover:border-border-strong ${className}`}>{body}</article>;
}

export function CardGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>{children}</div>;
}
