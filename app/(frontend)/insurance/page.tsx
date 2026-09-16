import Link from "next/link";
import { getPage, getProducts, getStates, getPromotedWave } from "@/src/lib/content";
import { productPath, statePath } from "@/src/lib/routes";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { CtaBand } from "@/src/components/ui/misc";
import { TableWrap, td, th } from "@/src/components/ui/table";
import { PageBlocks } from "@/src/components/site/page-blocks";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/insurance/");
  return pageMetadata({ title: "Insurance lines we write", description: "Every personal and commercial line Desert Peak Insurance writes, with what each policy is for and where it is available.", path: "/insurance/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}

export default async function InsuranceHub() {
  const [page, products, states] = await Promise.all([getPage("/insurance/"), getProducts(), getStates()]);
  const groups = [["Personal", products.filter((p) => p.category === "Personal")], ["Commercial", products.filter((p) => p.category === "Commercial")]] as const;
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Insurance", href: "/insurance/"}], SITE))} />
      <Breadcrumb items={[{ label: "Insurance", href: "/insurance/" }]} />
      <div className="grid gap-4">
        <h1>{page?.title ?? "Insurance lines we write"}</h1>
        <p className="lead max-w-measure-body">{page?.lede ?? `Thirty-six lines across ${states.map((s) => s.name).join(", ")}. Ten of them have local pages for every city we serve; the rest are written statewide.`}</p>
      </div>
      {groups.map(([label, list]) => (
        <section key={label} aria-labelledby={`g-${label}`} className="grid gap-4">
          <h2 id={`g-${label}`}>{label}</h2>
          <TableWrap caption={`${label} insurance lines`}>
            <table>
              <thead><tr><th scope="col" className={th}>Line</th><th scope="col" className={th}>What it is for</th><th scope="col" className={th}>Pages</th></tr></thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id}>
                    <th scope="row" className={`${td} text-left`}><Link href={productPath(p)} className="ui-link font-semibold text-ink">{p.name}</Link>{p.parent ? <span className="block font-normal text-ink-muted">Part of {typeof p.parent === "object" ? p.parent.name : "life insurance"}</span> : null}</th>
                    <td className={td}>{p.summary && !p.summary.includes("{{TODO") ? p.summary : <span className="text-ink-muted">Coverage details on the line&rsquo;s page.</span>}</td>
                    <td className={td}>{p.tier === "1" ? "Every city" : "Statewide"} · {states.map((s) => <Link key={s.id} href={`/insurance/${p.slug}/${s.slug}/`} className="mr-2">{s.abbr}</Link>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </section>
      ))}
      <PageBlocks layout={page?.layout} />
      <CtaBand heading="Not sure which line you need?" body="Tell us what you own and what you are worried about. We will say which policies matter and which do not." action={{ label: "Request the analysis", href: "/quote/" }} />
      <p className="font-sans text-small text-ink-muted">States: {states.map((s) => <Link key={s.id} href={statePath(s)} className="mr-3">{s.name}</Link>)}</p>
    </div>
  );
}
