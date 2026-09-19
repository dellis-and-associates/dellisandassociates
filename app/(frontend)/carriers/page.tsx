import { getCarriers, getPage, getPromotedWave } from "@/src/lib/content";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { EmptyState } from "@/src/components/ui/misc";
import { TableWrap, td, th } from "@/src/components/ui/table";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/carriers/");
  return pageMetadata({ title: "Carrier partners", description: "The insurance carriers Desert Peak Insurance is appointed with, by line and by state.", path: "/carriers/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}
export default async function Carriers() {
  const carriers = await getCarriers();
  return (
    <div className="mx-auto grid max-w-measure-shell gap-10 px-gutter py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Carrier partners", href: "/carriers/"}], SITE))} />
      <Breadcrumb items={[{ label: "Carrier partners", href: "/carriers/" }]} />
      <header className="grid gap-4"><h1>Carrier partners</h1><p className="lead max-w-measure-body">An independent agency is appointed with several carriers and compares them for you. Each carrier below is listed only with a confirmed appointment date.</p></header>
      {carriers.length === 0 ? <EmptyState title="Ask which carriers write your line" action={{ label: "Request the analysis", href: "/quote/" }}>As an independent agency we place coverage with the carriers we are appointed with. The analysis shows which of them write your line in your state, side by side.</EmptyState> : (
        <TableWrap caption="Carriers by line and state"><table><thead><tr><th scope="col" className={th}>Carrier</th><th scope="col" className={th}>Lines</th><th scope="col" className={th}>States</th></tr></thead><tbody>{carriers.map((c) => <tr key={c.id}><th scope="row" className={`${td} text-left font-medium`}>{c.website ? <a href={c.website} rel="noopener">{c.name}</a> : c.name}</th><td className={td}>{(c.lines ?? []).map((l) => (typeof l === "object" ? l.name : "")).join(", ")}</td><td className={td}>{(c.states ?? []).map((s) => (typeof s === "object" ? s.abbr : "")).join(", ")}</td></tr>)}</tbody></table></TableWrap>
      )}
    </div>
  );
}
