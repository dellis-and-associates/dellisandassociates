import Link from "next/link";
import { getArticles, getCities, getGlossary, getPages, getProducts, getStates } from "../../lib/content.ts";
import { buildManifest, type RouteGroup } from "../../lib/routes.ts";

const LABEL: Record<RouteGroup, string> = { core: "Pages", legal: "Legal", "product-hub": "Insurance lines", "product-coverage": "Coverage details", "product-third": "Discounts, plans and questions", "state-hub": "States", "product-state": "Lines by state", "product-city": "Lines by city", article: "Guides", glossary: "Glossary", agent: "Agents", carrier: "Carriers", utility: "Forms and portals" };

/** The human site map: every route from the manifest, grouped. */
export async function SiteMapList() {
  const [products, states, cities, pages, articles, glossary] = await Promise.all([getProducts(), getStates(), getCities(), getPages(), getArticles(), getGlossary()]);
  const stateMap = states.map((s) => ({ ...s, cities: cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id) }));
  const manifest = buildManifest({ products, states: stateMap, pages, articles, glossary });
  const groups = [...new Set(manifest.map((r) => r.group))];
  return (
    <div className="grid gap-8">
      {groups.map((g) => {
        const list = manifest.filter((r) => r.group === g);
        return (
          <section key={g} aria-labelledby={`sm-${g}`} className="grid gap-2">
            <h2 id={`sm-${g}`} className="font-sans text-title-sm">{LABEL[g]} <span className="text-ink-muted tabular">({list.length})</span></h2>
            <ul className="columns-1 gap-6 font-sans text-small sm:columns-2 lg:columns-3">{list.map((r) => <li key={r.path}><Link href={r.path} className="ui-link text-ink">{r.path}</Link></li>)}</ul>
          </section>
        );
      })}
    </div>
  );
}
