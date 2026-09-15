import Link from "next/link";
import type { City, LocationOverride, Product, State } from "../../payload-types.ts";
import { blockOrder, ctaLabel, hazardLabel, localText } from "../../lib/compose.ts";
import { productCityPath, productPath, productStatePath, statePath } from "../../lib/routes.ts";
import { breadcrumbJsonLd, jsonLd, localBusinessJsonLd, SITE } from "../../lib/seo.ts";
import { hasTodo } from "../../fields/index.ts";
import { getSiteSettings } from "../../lib/content.ts";
import { Breadcrumb } from "../ui/breadcrumb.tsx";
import { CtaBand, RelatedLinks, StrataRule } from "../ui/misc.tsx";
import { RichText } from "../site/richtext.tsx";
import { CoverageBlocks, CoveredLists, Discounts, Faq, MedicareDisclaimer, StateMinimumsTable } from "./shared.tsx";

/**
 * The volume template. The bold element is the local risk panel, assembled
 * only from CityFacts; a missing fact is shown as missing and makes the page
 * noindex, never guessed. Block order varies by tier and size band.
 */
export async function ProductCityTemplate({ product, state, city, override, siblings }: { product: Product; state: State; city: City; override: LocationOverride | null; siblings: Product[] }) {
  const site = await getSiteSettings();
  const path = productCityPath(product, state, city);
  const crumbs = [{ label: "Insurance", href: "/insurance/" }, { label: product.name, href: productPath(product) }, { label: state.name, href: productStatePath(product, state) }, { label: city.name, href: path }];
  const local = localText(product, city, state);
  const order = blockOrder(product, city);
  const f = city.cityFacts ?? {};
  const testimonial = override?.testimonial?.consentOnFile && override.testimonial.quote ? override.testimonial : null;
  const blocks: Record<string, React.ReactNode> = {
    intro: (
      <div className="grid gap-4" data-local>
        {override?.intro ? <RichText value={override.intro} /> : city.intro ? <RichText value={city.intro} /> : null}
      </div>
    ),
    "local-risk": (
      <section aria-labelledby="local" className="grid gap-4" data-local>
        <h2 id="local">{product.name} in {city.name}: what is different here</h2>
        <div className="grid gap-4 rounded-surface border border-border bg-surface-raised p-6 md:grid-cols-2">
          <dl className="grid gap-3 font-sans text-small">
            {f.county && !hasTodo(f.county) ? <div><dt className="kicker">County</dt><dd>{f.county}</dd></div> : null}
            {f.localHazards?.length ? <div><dt className="kicker">Local hazards</dt><dd><ul className="mt-1 grid gap-1">{f.localHazards.map((h) => <li key={h} className="border-l-2 border-accent pl-3">{hazardLabel(h)}</li>)}</ul></dd></div> : null}
            {f.nearestOfficeOrAgent && !hasTodo(f.nearestOfficeOrAgent) ? <div><dt className="kicker">Nearest office or agent</dt><dd>{f.nearestOfficeOrAgent}</dd></div> : null}
          </dl>
          <dl className="grid gap-3 font-sans text-small">
            {f.housingStock && !hasTodo(f.housingStock) ? <div><dt className="kicker">Housing</dt><dd>{f.housingStock}</dd></div> : null}
            {f.drivingContext && !hasTodo(f.drivingContext) ? <div><dt className="kicker">Driving</dt><dd>{f.drivingContext}</dd></div> : null}
            {f.neighborhoods?.length ? <div><dt className="kicker">Neighborhoods</dt><dd>{f.neighborhoods.map((n) => n.name).join(", ")}</dd></div> : null}
          </dl>
        </div>
        {f.notableRegulatory && !hasTodo(f.notableRegulatory) ? <p className="max-w-measure-body">{f.notableRegulatory}</p> : null}
        <p className="sr-only">{local.parts.map((p) => p.text).join(" ")}</p>
      </section>
    ),
    "state-minimums": <StateMinimumsTable state={state} product={product} />,
    coverage: <CoverageBlocks product={product} />,
    covered: <CoveredLists product={product} />,
    discounts: <Discounts product={product} />,
    faq: <Faq product={product} extra={(override?.customFaqs ?? []).map((q) => ({ question: q.question, answer: q.answer }))} />,
    cta: <CtaBand heading={`${ctaLabel(product)} for ${product.name.toLowerCase()} in ${city.name}`} body={site.phone ? `Or call ${site.phone}. A licensed agent, not a call centre.` : undefined} action={{ label: ctaLabel(product), href: `/quote/?product=${product.slug}&state=${state.slug}&city=${city.slug}` }} secondary={site.phoneHref ? { label: `Call ${site.phone}`, href: site.phoneHref } : undefined} sticky />,
    related: (
      <RelatedLinks title={`More in ${city.name}`} items={[...siblings.slice(0, 5).map((p) => ({ label: `${p.name} in ${city.name}`, href: productCityPath(p, state, city) })), { label: `${product.name} in ${state.name}`, href: productStatePath(product, state) }, { label: `Insurance in ${state.name}`, href: statePath(state) }]} />
    ),
  };
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 pb-24 md:px-8 md:pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd(`${site.name} — ${product.name} in ${city.name}`, path, city.name, state.name, site.phone))} />
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4">
        <h1>{product.name} in {city.name}, {state.abbr}</h1>
        <p className="lead max-w-measure-body">{product.summary && !hasTodo(product.summary) ? product.summary : `An independent comparison of ${product.name.toLowerCase()} for ${city.name}, ${state.name}, across the carriers we represent.`}</p>
        <StrataRule />
      </header>
      {testimonial ? <blockquote data-testimonial className="max-w-measure-body border-l-4 border-accent pl-4"><p>“{testimonial.quote}”</p><footer className="mt-2 font-sans text-small text-ink-muted">{testimonial.attribution}</footer></blockquote> : null}
      <div className="grid gap-12">{order.map((b) => <div key={b}>{blocks[b]}</div>)}</div>
      <MedicareDisclaimer product={product} />
      <p className="font-sans text-caption text-ink-muted">Also: <Link href={productStatePath(product, state)} className="ui-link">{product.name} in {state.name}</Link></p>
    </div>
  );
}
