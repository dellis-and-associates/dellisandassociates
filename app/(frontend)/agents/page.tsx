import { getAgents, getPage, getPromotedWave } from "@/src/lib/content";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { EmptyState } from "@/src/components/ui/misc";
import { Card, CardGrid } from "@/src/components/ui/card";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/agents/");
  return pageMetadata({ title: "Meet the team", description: "The licensed agents at Desert Peak Insurance, with the states they hold licenses in and the lines they write.", path: "/agents/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}
/** Renders from an empty-but-typed roster. No placeholder person, ever (page-generation defect 5). */
export default async function Agents() {
  const agents = await getAgents();
  return (
    <div className="mx-auto grid max-w-measure-shell gap-10 px-gutter py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Meet the team", href: "/agents/"}], SITE))} />
      <Breadcrumb items={[{ label: "Meet the team", href: "/agents/" }]} />
      <header className="grid gap-4"><h1>Meet the team</h1><p className="lead max-w-measure-body">Licensed agents, with license numbers on file per state. Profiles appear here once the roster is confirmed.</p></header>
      {agents.length === 0 ? <EmptyState title="Talk to a licensed advisor" action={{ label: "Contact the office", href: "/contact/" }}>Call or send a message and a licensed advisor will answer, compare the carriers we represent and show you the numbers.</EmptyState> : (
        <CardGrid>{agents.map((a) => <Card key={a.id} as="h2" title={a.name} href={`/agents/${a.slug}/`} meta={(a.licenses ?? []).map((l) => (typeof l.state === "object" ? l.state.abbr : "")).filter(Boolean).join(" · ")}>{a.title}</Card>)}</CardGrid>
      )}
    </div>
  );
}
