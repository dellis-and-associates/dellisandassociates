import Link from "next/link";
import { getProducts, getSiteSettings, getStates } from "../../lib/content.ts";
import { GROUPS, groupProducts, orderStates } from "../../lib/groups.ts";
import { productPath, statePath } from "../../lib/routes.ts";
import { IconChevron, IconClose, IconMenu, IconPhone } from "../ui/icons.tsx";
import { Lockup, Mark } from "../ui/logo.tsx";
import { HeaderBehaviour, SearchDialog } from "./header-client.tsx";

const CTA = "Request the analysis";
const TOP = [["Resources", "/resources/"], ["Claims", "/claims/"], ["For partners", "/partners/"]] as const;

/**
 * Sticky, 64 px, 56 px once the page has scrolled (header-client.tsx). Skip
 * link first in the DOM; the shipped lockup at left (mark alone under 360 px).
 * Insurance and Locations are <details> menus, so the nav works with no
 * JavaScript; under 1024 px the whole nav is a <details> drawer. The phone
 * number is visible from 1280 px (a 1024 px bar cannot hold the 40 px lockup,
 * five entries, the number, search and the CTA without wrapping; DECISIONS.md),
 * the icon below. Search is a link that JavaScript turns into a ⌘K dialog.
 * One CTA verb site-wide.
 */
export async function Header() {
  const [site, products, allStates] = await Promise.all([getSiteSettings(), getProducts(), getStates()]);
  const states = orderStates(allStates);
  const groups = GROUPS.map((g) => ({ ...g, ...groupProducts(products, g.key) }));
  const top = "ui-link flex min-h-11 items-center gap-1 whitespace-nowrap px-2 font-sans text-small font-semibold text-ink hover:text-brand";
  const item = "ui-link block min-h-6 py-1 font-sans text-small text-ink hover:text-brand";
  const panel = "absolute left-0 top-full z-30 mt-1 hidden rounded-surface border border-border bg-surface-raised p-6 shadow-2 group-open:block";
  const quick = [...products.filter((p) => p.tier === "1").slice(0, 4).map((p) => ({ label: p.name, href: productPath(p) })), ...states.map((s) => ({ label: s.name, href: statePath(s) })), { label: "Glossary", href: "/resources/glossary/" }];
  return (
    <header data-shell-header data-compact="false" className="sticky top-0 z-40 border-b border-border bg-surface shadow-0">
      <HeaderBehaviour />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-sans focus:text-small">Skip to content</a>
      <div className="shell-bar mx-auto flex max-w-measure-page items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="ui-link shrink-0 py-2" aria-label="Desert Peak Insurance, home">
          <span className="lockup-full"><span className="block md:hidden"><Lockup height={32} /></span><span className="hidden md:block"><Lockup height={40} /></span></span>
          <span className="lockup-mark"><Mark height={32} /></span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0 xl:gap-2">
            <li className="relative">
              <details data-menu className="group">
                <summary className={top} aria-haspopup="true">Insurance <IconChevron size={16} className="transition-transform duration-(--dp-duration-fast) group-open:rotate-180" /></summary>
                <div className={`${panel} mega`}>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {groups.map((g) => (
                      <div key={g.key}>
                        <p className="mb-2 font-sans text-small font-semibold text-ink">{g.name}</p>
                        {g.headline.map((p) => <Link key={p.id} href={productPath(p)} className={item}>{p.name}</Link>)}
                      </div>
                    ))}
                  </div>
                  <Link href="/insurance/" className={`${item} mt-4 border-t border-border pt-4 font-semibold text-brand`}>All {products.length} lines</Link>
                </div>
              </details>
            </li>
            <li className="relative">
              <details data-menu className="group">
                <summary className={top} aria-haspopup="true">Locations <IconChevron size={16} className="transition-transform duration-(--dp-duration-fast) group-open:rotate-180" /></summary>
                <div className={`${panel} w-64`}>
                  {states.map((s) => <Link key={s.id} href={statePath(s)} className={item}>{s.name}</Link>)}
                  <Link href="/locations/" className={`${item} mt-3 border-t border-border pt-3 font-semibold text-brand`}>Every city</Link>
                </div>
              </details>
            </li>
            {TOP.map(([label, href]) => <li key={href}><Link href={href} className={top}>{label}</Link></li>)}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {site.phoneHref ? (
            <a href={site.phoneHref} className="ui-link inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control px-2 font-sans text-small font-semibold text-ink hover:bg-surface-sunken" data-contact>
              <IconPhone /> <span className="hidden whitespace-nowrap xl:inline tabular">{site.phone}</span><span className="sr-only xl:hidden">Call {site.phone}</span>
            </a>
          ) : null}
          <SearchDialog quickLinks={quick.map((q) => <Link key={q.href} href={q.href} className="ui-link text-brand">{q.label}</Link>)} />
          <Link href="/quote/" className="hidden min-h-11 items-center whitespace-nowrap rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink no-underline hover:bg-brand-hover sm:inline-flex">{CTA}</Link>
          <details data-drawer className="group lg:hidden">
            <summary className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-border-strong text-ink" aria-label="Menu">
              <span className="group-open:hidden"><IconMenu /></span><span className="hidden group-open:inline"><IconClose /></span>
            </summary>
            <div className="drawer fixed inset-x-0 bottom-0 top-16 z-30 hidden overflow-y-auto bg-surface group-open:grid">
              <nav aria-label="Primary, phone" className="grid content-start gap-6 px-4 py-6">
                {groups.map((g) => (
                  <div key={g.key} className="grid gap-1">
                    <p className="font-sans text-small font-semibold text-ink-muted">{g.name}</p>
                    {g.headline.map((p) => <Link key={p.id} href={productPath(p)} className="ui-link min-h-11 font-sans text-body text-ink">{p.name}</Link>)}
                  </div>
                ))}
                <Link href="/insurance/" className="ui-link min-h-11 font-sans text-body font-semibold text-brand">All {products.length} lines</Link>
                <div className="grid gap-1 border-t border-border pt-6">
                  <p className="font-sans text-small font-semibold text-ink-muted">Licensed in</p>
                  {states.map((s) => <Link key={s.id} href={statePath(s)} className="ui-link min-h-11 font-sans text-body text-ink">{s.name}</Link>)}
                  <Link href="/locations/" className="ui-link min-h-11 font-sans text-body font-semibold text-brand">Every city</Link>
                </div>
                <div className="grid gap-1 border-t border-border pt-6">
                  {TOP.map(([label, href]) => <Link key={href} href={href} className="ui-link min-h-11 font-sans text-body text-ink">{label}</Link>)}
                  <Link href="/contact/" className="ui-link min-h-11 font-sans text-body text-ink">Contact</Link>
                </div>
              </nav>
              <div className="sticky bottom-0 mt-auto grid grid-cols-2 gap-3 border-t border-border bg-surface-raised px-4 py-3">
                {site.phoneHref ? <a href={site.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border-strong font-sans text-small font-semibold text-ink no-underline tabular"><IconPhone />{site.phone}</a> : <span />}
                <Link href="/quote/" className="inline-flex min-h-11 items-center justify-center rounded-control bg-brand px-4 font-sans text-small font-semibold text-brand-ink no-underline">{CTA}</Link>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
