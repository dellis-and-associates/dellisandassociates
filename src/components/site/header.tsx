import Link from "next/link";
import { getProducts, getSiteSettings, getStates } from "../../lib/content.ts";
import { productPath, statePath } from "../../lib/routes.ts";
import { IconPhone } from "../ui/icons.tsx";
import { Lockup, Mark } from "../ui/logo.tsx";

/**
 * Sticky, 64 px. Products and locations open as <details> menus, so the nav
 * works with no JavaScript; on phones the whole nav is one <details>. The
 * phone number and the primary action are always visible.
 */
export async function Header() {
  const [site, products, states] = await Promise.all([getSiteSettings(), getProducts(), getStates()]);
  const personal = products.filter((p) => p.category === "Personal" && !p.parent);
  const commercial = products.filter((p) => p.category === "Commercial");
  const menu = "absolute left-0 top-full z-30 mt-2 hidden w-72 rounded-surface border border-border bg-surface-raised p-4 shadow-2 group-open:block md:group-open:block";
  const item = "ui-link block min-h-6 py-1 font-sans text-small text-ink hover:text-brand";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-sans focus:text-small">Skip to content</a>
      <div className="mx-auto flex h-16 max-w-measure-page items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="ui-link shrink-0" aria-label="Desert Peak Insurance, home">
          <span className="lockup-full"><Lockup /></span>
          <span className="lockup-mark"><Mark className="h-8 w-auto text-brand" /></span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 font-sans text-small font-semibold">
            <li className="group relative">
              <details className="group">
                <summary className="flex min-h-11 items-center gap-1 text-ink">Insurance <span aria-hidden className="text-ink-muted">⌄</span></summary>
                <div className={menu}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="kicker mb-2">Personal</p>
                      {personal.map((p) => <Link key={p.id} href={productPath(p)} className={item}>{p.name}</Link>)}
                    </div>
                    <div>
                      <p className="kicker mb-2">Commercial</p>
                      {commercial.slice(0, 8).map((p) => <Link key={p.id} href={productPath(p)} className={item}>{p.name}</Link>)}
                      <Link href="/insurance/" className={`${item} mt-2 font-semibold text-brand`}>All lines</Link>
                    </div>
                  </div>
                </div>
              </details>
            </li>
            <li className="group relative">
              <details className="group">
                <summary className="flex min-h-11 items-center gap-1 text-ink">Locations <span aria-hidden className="text-ink-muted">⌄</span></summary>
                <div className={menu}>
                  {states.map((s) => <Link key={s.id} href={statePath(s)} className={item}>{s.name}</Link>)}
                  <Link href="/locations/" className={`${item} mt-2 font-semibold text-brand`}>Every city we serve</Link>
                </div>
              </details>
            </li>
            <li><Link href="/resources/" className="ui-link flex min-h-11 items-center text-ink">Resources</Link></li>
            <li><Link href="/claims/" className="ui-link flex min-h-11 items-center text-ink">Claims</Link></li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <form action="/search/" method="get" role="search" aria-label="Site search" className="hidden lg:block">
            <label htmlFor="q" className="sr-only">Search products, places and terms</label>
            <input id="q" name="q" type="search" placeholder="Search" autoComplete="off" className="h-11 w-40 rounded-control border border-border-strong bg-surface-raised px-3 font-sans text-small" />
          </form>
          {site.phoneHref ? (
            <a href={site.phoneHref} className="ui-link inline-flex min-h-11 min-w-11 items-center gap-2 font-sans text-small font-semibold text-ink" data-contact>
              <IconPhone label="" /> <span className="hidden sm:inline tabular">{site.phone}</span><span className="sr-only sm:hidden">Call {site.phone}</span>
            </a>
          ) : null}
          <Link href="/quote/" className="hidden min-h-11 items-center rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink no-underline hover:bg-brand-hover sm:inline-flex">Request the analysis</Link>
          <details className="group relative md:hidden">
            <summary className="flex min-h-11 min-w-11 items-center justify-center rounded-control border border-border-strong text-ink" aria-label="Menu">
              <span className="group-open:hidden"><span aria-hidden>≡</span></span><span className="hidden group-open:inline" aria-hidden>×</span>
            </summary>
            <nav aria-label="Primary, mobile" className="absolute right-0 top-full z-30 mt-2 w-72 rounded-surface border border-border bg-surface-raised p-4 shadow-2">
              <p className="kicker mb-2">Insurance</p>
              {personal.slice(0, 6).map((p) => <Link key={p.id} href={productPath(p)} className={item}>{p.name}</Link>)}
              <Link href="/insurance/" className={`${item} font-semibold text-brand`}>All lines</Link>
              <p className="kicker mb-2 mt-4">Locations</p>
              {states.map((s) => <Link key={s.id} href={statePath(s)} className={item}>{s.name}</Link>)}
              <hr className="my-3" />
              <Link href="/resources/" className={item}>Resources</Link>
              <Link href="/claims/" className={item}>Claims</Link>
              <Link href="/contact/" className={item}>Contact</Link>
              <Link href="/quote/" className={`${item} mt-2 font-semibold text-brand`}>Request the analysis</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
