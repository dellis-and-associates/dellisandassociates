import Link from "next/link";

/** Static: no data fetch, so the 404 renders fully on the server with or without JavaScript. */
export function NotFoundBody() {
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-16">
      <h1>We could not find that page</h1>
      <p className="max-w-measure-body">The address may have changed. Try a search, pick a place to start below, or <Link href="/">go to the home page</Link>.</p>
      <form action="/search/" method="get" role="search" aria-label="Search from this page" className="flex max-w-measure-narrow gap-2">
        <label htmlFor="nf-q" className="sr-only">Search</label>
        <input id="nf-q" name="q" type="search" className="min-h-11 flex-1 rounded-control border border-border-strong bg-surface-raised px-3 font-text text-copy" placeholder="Search products, places and terms" />
        <button className="min-h-11 rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink">Search</button>
      </form>
      <ul className="grid gap-2 font-text text-copy sm:grid-cols-2">
        <li><Link href="/insurance/">Every line we write</Link></li>
        <li><Link href="/locations/">Cities we serve</Link></li>
        <li><Link href="/resources/glossary/">The glossary</Link></li>
        <li><Link href="/contact/">Contact the office</Link></li>
      </ul>
    </div>
  );
}
