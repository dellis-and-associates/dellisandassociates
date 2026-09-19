import Link from "next/link";
import { getArticles, getCities, getGlossary, getProducts, getStates } from "@/src/lib/content";
import { articlePath, glossaryPath, productCityPath, productPath, statePath } from "@/src/lib/routes";
import { pageMetadata } from "@/src/lib/seo";
import { EmptyState } from "@/src/components/ui/misc";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Search", description: "Search products, places and glossary terms.", path: "/search/", indexable: false });

/** Server-rendered search: works with no JavaScript; the typeahead is progressive enhancement over this. */
export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim().toLowerCase();
  const [products, states, cities, terms, articles] = await Promise.all([getProducts(), getStates(), getCities(), getGlossary(), getArticles()]);
  const hit = (s: string | null | undefined) => Boolean(q) && (s ?? "").toLowerCase().includes(q);
  const auto = products.find((p) => p.slug === "auto-insurance") ?? products[0]!;
  const results = q
    ? [
        ...products.filter((p) => hit(p.name)).map((p) => ({ label: p.name, href: productPath(p), kind: "Insurance line" })),
        ...states.filter((s) => hit(s.name)).map((s) => ({ label: `Insurance in ${s.name}`, href: statePath(s), kind: "State" })),
        ...cities.filter((c) => hit(c.name)).map((c) => { const s = states.find((x) => x.id === (typeof c.state === "object" ? c.state.id : c.state))!; return { label: `${c.name}, ${s.abbr}`, href: productCityPath(auto, s, c), kind: "City" }; }),
        ...terms.filter((t) => hit(t.term)).map((t) => ({ label: t.term, href: glossaryPath(t.slug), kind: "Glossary" })),
        ...articles.filter((a) => a.reviewStatus === "reviewed" && hit(a.title)).map((a) => ({ label: a.title, href: articlePath(a.section, a.slug), kind: "Guide" })),
      ]
    : [];
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-10">
      <h1>Search</h1>
      <form action="/search/" method="get" role="search" aria-label="Search results" className="flex max-w-measure-body gap-2">
        <label htmlFor="s-q" className="sr-only">Search products, places and terms</label>
        <input id="s-q" name="q" type="search" defaultValue={q} autoFocus className="min-h-11 flex-1 rounded-control border border-border-strong bg-surface-raised px-3 font-text text-body" />
        <button className="min-h-11 rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink">Search</button>
      </form>
      {q && results.length === 0 ? <EmptyState title={`Nothing matched “${q}”`} action={{ label: "See every line we write", href: "/insurance/" }}>Try the name of a line (auto, home, umbrella), a city, or a word from your policy.</EmptyState> : null}
      {results.length ? <ol className="grid gap-3 font-text text-copy" aria-label="Results">{results.slice(0, 50).map((r) => <li key={r.href}><span className="kicker mr-2">{r.kind}</span><Link href={r.href} className="font-semibold">{r.label}</Link></li>)}</ol> : null}
    </div>
  );
}
