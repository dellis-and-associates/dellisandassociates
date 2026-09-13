import Link from "next/link";

export type Crumb = { label: string; href: string };

/** Everywhere below the top level. The last item is the current page. */
export function Breadcrumb({ items, label = "Breadcrumb" }: { items: Crumb[]; label?: string }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label={label} className="font-sans text-small text-ink-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link href="/" className="ui-link text-ink-muted hover:text-ink">Home</Link></li>
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {i === items.length - 1 ? <span aria-current="page" className="text-ink">{c.label}</span> : <Link href={c.href} className="ui-link text-ink-muted hover:text-ink">{c.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: Crumb[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${siteUrl}${c.href}` })),
  };
}
