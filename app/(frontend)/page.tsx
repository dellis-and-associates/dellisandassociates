import Link from "next/link";
import { getPage, getProducts, getSiteSettings, getStates } from "@/src/lib/content";
import { productPath, statePath } from "@/src/lib/routes";
import { isIndexable, jsonLd, orgJsonLd, pageMetadata } from "@/src/lib/seo";
import { PageBlocks } from "@/src/components/site/page-blocks";
import { StrataRule } from "@/src/components/ui/misc";
import { TableWrap, td, th } from "@/src/components/ui/table";

export const revalidate = false;

export async function generateMetadata() {
  const page = await getPage("/");
  return pageMetadata({ title: "Desert Peak Insurance — independent, AZ · NV · UT · ID", description: page?.seo?.description ?? "We compare the carriers we represent across auto, home, life, Medicare and commercial lines, and tell you what we find. The analysis costs nothing.", path: "/", indexable: page ? isIndexable(page) : false });
}

export default async function Home() {
  const [page, products, states, site] = await Promise.all([getPage("/"), getProducts(), getStates(), getSiteSettings()]);
  const personal = products.filter((p) => p.category === "Personal" && !p.parent);
  const commercial = products.filter((p) => p.category === "Commercial");
  const org = orgJsonLd(site, states.map((s) => s.name));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(org)} />
      {/* The one bold element: the strata band hero. A statement, no photograph. */}
      <section className="bg-brand text-brand-ink">
        <div className="mx-auto grid max-w-measure-page gap-6 px-4 py-16 md:px-8 md:py-24">
          <StrataRule className="bg-brand-ink" />
          <h1 className="display max-w-measure-wide text-brand-ink">{page?.lede && !page.lede.includes("{{TODO") ? page.title : "Compared across carriers. Explained with the math."}</h1>
          <p className="lead max-w-measure-body text-brand-ink">We compare your current policies against the carriers we represent in {states.map((s) => s.name).join(", ")}. It costs nothing, and if what you have is the best option, we say so.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote/" className="inline-flex min-h-11 items-center rounded-control bg-brand-ink px-5 font-sans text-small font-semibold text-brand no-underline hover:bg-surface">Request the analysis</Link>
            {site.phoneHref ? <a href={site.phoneHref} className="inline-flex min-h-11 items-center rounded-control border border-brand-ink px-5 font-sans text-small font-semibold text-brand-ink no-underline tabular hover:bg-brand-hover">Call {site.phone}</a> : null}
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-measure-page gap-16 px-4 py-16 md:px-8">
        <section aria-labelledby="lines" className="grid gap-6">
          <h2 id="lines">What we write</h2>
          <TableWrap caption="Insurance lines by category">
            <table>
              <thead><tr><th scope="col" className={th}>Personal</th><th scope="col" className={th}>Commercial</th></tr></thead>
              <tbody>
                {Array.from({ length: Math.max(personal.length, commercial.length) }, (_, i) => (
                  <tr key={i}>
                    <td className={td}>{personal[i] ? <Link href={productPath(personal[i])} className="ui-link font-semibold text-ink">{personal[i].name}</Link> : null}{personal[i]?.summary && !personal[i].summary?.includes("{{TODO") ? <span className="block text-ink-muted">{personal[i].summary}</span> : null}</td>
                    <td className={td}>{commercial[i] ? <Link href={productPath(commercial[i])} className="ui-link font-semibold text-ink">{commercial[i].name}</Link> : null}{commercial[i]?.summary && !commercial[i].summary?.includes("{{TODO") ? <span className="block text-ink-muted">{commercial[i].summary}</span> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </section>
        <section aria-labelledby="states" className="grid gap-6">
          <h2 id="states">Where we are licensed</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {states.map((s) => (
              <li key={s.id} className="rounded-surface border border-border bg-surface-raised p-5">
                <Link href={statePath(s)} className="ui-link font-sans text-title-sm text-ink">{s.name}</Link>
                <p className="mt-1 font-sans text-small text-ink-muted">{s.doi?.url && !s.doi.url.includes("{{TODO") ? <a href={s.doi.url} rel="noopener">{s.doi.name}</a> : "State requirements and licensing"}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="how" className="grid gap-6 md:grid-cols-3">
          <h2 id="how" className="md:col-span-3">How the analysis works</h2>
          <ol className="contents">
            {[
              ["Send what you have", "Your current declarations pages, or the answers in the quote flow. Twenty minutes at most."],
              ["We compare", "Limits, deductibles and exclusions across the carriers we represent, line by line."],
              ["You get the finding", "A recommendation with the math shown. If keeping what you have is right, that is the answer."],
            ].map(([t, b], i) => (
              <li key={t} className="grid gap-2 border-t-2 border-ink pt-4">
                <span className="font-sans text-caption font-medium text-ink-muted tabular">Step {i + 1}</span>
                <h3 className="font-sans text-title-sm">{t}</h3>
                <p className="font-sans text-small text-ink-muted">{b}</p>
              </li>
            ))}
          </ol>
        </section>
        <PageBlocks layout={page?.layout} />
      </div>
    </>
  );
}
