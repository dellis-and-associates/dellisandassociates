import Link from "next/link";
import type { City, Product, State } from "../../payload-types.ts";
import { ctaLabel } from "../../lib/compose.ts";
import { productCityPath, productPath, productStatePath, statePath } from "../../lib/routes.ts";
import { breadcrumbJsonLd, jsonLd, serviceJsonLd, SITE } from "../../lib/seo.ts";
import { Breadcrumb } from "../ui/breadcrumb.tsx";
import { CtaBand, RelatedLinks, StrataRule } from "../ui/misc.tsx";
import { RichText } from "../site/richtext.tsx";
import { CoverageBlocks, CoveredLists, Faq, MedicareDisclaimer, StateMinimumsTable } from "./shared.tsx";

export function ProductStateTemplate({ product, state, cities }: { product: Product; state: State; cities: City[] }) {
  const path = productStatePath(product, state);
  const crumbs = [{ label: "Insurance", href: "/insurance/" }, { label: product.name, href: productPath(product) }, { label: state.name, href: path }];
  return (
    <div className="mx-auto grid max-w-measure-shell gap-10 px-gutter py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceJsonLd(`${product.name} in ${state.name}`, path, product.summary ?? "", [state.name]))} />
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4">
        <h1>{product.name} in {state.name}</h1>
        {product.summary && !product.summary.includes("{{TODO") ? <p className="lead max-w-measure-body">{product.summary}</p> : null}
        <StrataRule />
      </header>
      <div className="grid gap-12">
        <StateMinimumsTable state={state} product={product} />
        {product.intro ? <RichText value={product.intro} /> : null}
        <CoverageBlocks product={product} />
        <CoveredLists product={product} />
        {state.notableRegulatory && !state.notableRegulatory.includes("{{TODO") ? (
          <section aria-labelledby="reg" className="grid gap-3"><h2 id="reg">Worth knowing in {state.name}</h2><p className="max-w-measure-body">{state.notableRegulatory}</p></section>
        ) : null}
        <Faq product={product} />
        <MedicareDisclaimer product={product} />
      </div>
      {cities.length ? (
        <section aria-labelledby="cities" className="grid gap-4">
          <h2 id="cities">{product.name} by city in {state.name}</h2>
          <ul className="grid gap-2 font-text text-copy sm:grid-cols-2 lg:grid-cols-4">{cities.map((c) => <li key={c.id}><Link href={productCityPath(product, state, c)} className="ui-link text-ink">{c.name}</Link></li>)}</ul>
        </section>
      ) : null}
      <CtaBand heading={`${ctaLabel(product)} for ${product.name.toLowerCase()} in ${state.name}`} action={{ label: ctaLabel(product), href: `/quote/?product=${product.slug}&state=${state.slug}` }} secondary={{ label: "Talk to a person", href: "/contact/" }} sticky />
      <RelatedLinks items={[{ label: `All insurance in ${state.name}`, href: statePath(state) }, { label: `${product.name} overview`, href: productPath(product) }]} />
    </div>
  );
}
