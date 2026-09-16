import Link from "next/link";
import type { City, Product, State } from "../../payload-types.ts";
import { productCityPath, productStatePath, statePath } from "../../lib/routes.ts";
import { breadcrumbJsonLd, jsonLd, SITE } from "../../lib/seo.ts";
import { hasTodo } from "../../fields/index.ts";
import { Breadcrumb } from "../ui/breadcrumb.tsx";
import { CtaBand, StrataRule } from "../ui/misc.tsx";
import { TableWrap, td, th } from "../ui/table.tsx";
import { RichText } from "../site/richtext.tsx";

/** State hub: the statutory minimums table is the bold element; every row cited; then every line and every city. */
export function StateHubTemplate({ state, cities, products }: { state: State; cities: City[]; products: Product[] }) {
  const crumbs = [{ label: "Insurance", href: "/insurance/" }, { label: state.name, href: statePath(state) }];
  const tier1 = products.filter((p) => p.tier === "1");
  const tier2 = products.filter((p) => p.tier === "2");
  const mins = state.statutoryMinimums ?? [];
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4">
        <h1>Insurance in {state.name}</h1>
        {state.updatedAt ? <p className="font-sans text-caption text-ink-muted tabular">Last reviewed {new Date(state.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p> : null}
        <p className="lead max-w-measure-body">What {state.name} requires, the lines we write there, and the {cities.length} cities where we have local pages. Every minimum below is cited to its source; where we have not verified one, we say so.</p>
        <StrataRule />
      </header>
      <section aria-labelledby="req" className="grid gap-4" data-minimums>
        <h2 id="req">What {state.name} requires</h2>
        {mins.length ? (
          <TableWrap caption={`${state.name} statutory minimums`}>
            <table>
              <thead><tr><th scope="col" className={th}>Line</th><th scope="col" className={th}>Coverage</th><th scope="col" className={`${th} text-right`}>Minimum</th><th scope="col" className={th}>Source</th></tr></thead>
              <tbody>
                {mins.map((m, i) => (
                  <tr key={i}>
                    <td className={td}>{typeof m.product === "object" ? <Link href={productStatePath(m.product, state)} className="ui-link text-ink">{m.product.name}</Link> : null}</td>
                    <th scope="row" className={`${td} text-left font-medium`}>{m.coverage}</th>
                    <td className={`${td} text-right tabular`}>{m.requirement}</td>
                    <td className={td}><a href={m.sourceUrl} rel="noopener">{state.doi?.name && !hasTodo(state.doi.name) ? state.doi.name : "Source"}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        ) : (
          <p className="max-w-measure-body font-sans text-small text-ink-muted">Statutory minimums for {state.name} are being verified against the {state.doi?.url && !hasTodo(state.doi.url) ? <a href={state.doi.url} rel="noopener">{state.doi.name}</a> : "state Department of Insurance"} and will appear here with their citations. We do not publish a figure without its source.</p>
        )}
        {state.riskNotes ? <RichText value={state.riskNotes} /> : null}
      </section>
      <section aria-labelledby="lines" className="grid gap-4">
        <h2 id="lines">Lines we write in {state.name}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div><h3 className="font-sans text-title-sm">With local pages in every city</h3><ul className="mt-3 grid gap-2 font-sans text-small">{tier1.map((p) => <li key={p.id}><Link href={productStatePath(p, state)} className="ui-link text-ink">{p.name} in {state.name}</Link></li>)}</ul></div>
          <div><h3 className="font-sans text-title-sm">Statewide</h3><ul className="mt-3 grid gap-2 font-sans text-small sm:grid-cols-2">{tier2.map((p) => <li key={p.id}><Link href={productStatePath(p, state)} className="ui-link text-ink">{p.name}</Link></li>)}</ul></div>
        </div>
      </section>
      <section aria-labelledby="cities" className="grid gap-4">
        <h2 id="cities">Cities we serve in {state.name}</h2>
        <ul className="grid gap-2 font-sans text-small sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => <li key={c.id}><Link href={productCityPath(tier1[0] ?? { slug: "auto-insurance" }, state, c)} className="ui-link text-ink">{c.name}</Link>{c.cityFacts?.county && !hasTodo(c.cityFacts.county) ? <span className="block text-ink-muted">{c.cityFacts.county}</span> : null}</li>)}
        </ul>
      </section>
      <CtaBand heading={`Request the analysis in ${state.name}`} body="Send what you have. We compare it against the carriers we represent and show the math." action={{ label: "Request the analysis", href: `/quote/?state=${state.slug}` }} />
    </div>
  );
}
