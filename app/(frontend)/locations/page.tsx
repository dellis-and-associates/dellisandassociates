import Link from "next/link";
import { getCities, getPage, getProducts, getStates, getPromotedWave } from "@/src/lib/content";
import { productCityPath, statePath } from "@/src/lib/routes";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { hasTodo } from "@/src/fields";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/locations/");
  return pageMetadata({ title: "Locations we serve", description: "Every city in Arizona, Nevada, Utah and Idaho where Desert Peak Insurance writes policies, with local pages for the ten lines people search for most.", path: "/locations/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}

export default async function Locations() {
  const [states, cities, products] = await Promise.all([getStates(), getCities(), getProducts()]);
  const auto = products.find((p) => p.slug === "auto-insurance") ?? products.find((p) => p.tier === "1")!;
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Locations", href: "/locations/"}], SITE))} />
      <Breadcrumb items={[{ label: "Locations", href: "/locations/" }]} />
      <header className="grid gap-4"><h1>Cities we serve</h1><p className="lead max-w-measure-body">{cities.length} cities across four states. Each city has local pages for the lines with real local demand; everything else is written statewide.</p></header>
      <div className="grid gap-10 md:grid-cols-2">
        {states.map((s) => {
          const list = cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id);
          return (
            <section key={s.id} aria-labelledby={`s-${s.slug}`} className="grid gap-3">
              <h2 id={`s-${s.slug}`}><Link href={statePath(s)} className="ui-link text-ink">{s.name}</Link></h2>
              <ul className="grid gap-2 font-sans text-small sm:grid-cols-2">
                {list.map((c) => <li key={c.id}><Link href={productCityPath(auto, s, c)} className="ui-link ui-link-inline text-ink">{c.name}</Link>{c.cityFacts?.county && !hasTodo(c.cityFacts.county) ? <span className="block text-ink-muted">{c.cityFacts.county}</span> : null}</li>)}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
