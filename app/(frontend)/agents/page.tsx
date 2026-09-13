import { getAgents, getPage } from "@/src/lib/content";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { EmptyState } from "@/src/components/ui/misc";
import { Card, CardGrid } from "@/src/components/ui/card";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/agents/");
  return pageMetadata({ title: "Meet the team", description: "The licensed agents at Desert Peak Insurance, with the states they hold licenses in and the lines they write.", path: "/agents/", indexable: page ? isIndexable(page) : false });
}
/** Renders from an empty-but-typed roster. No placeholder person, ever (page-generation defect 5). */
export default async function Agents() {
  const agents = await getAgents();
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Meet the team", href: "/agents/"}], SITE))} />
      <Breadcrumb items={[{ label: "Meet the team", href: "/agents/" }]} />
      <header className="grid gap-4"><h1>Meet the team</h1><p className="lead max-w-measure-body">Licensed agents, with license numbers on file per state. Profiles appear here once the roster is confirmed.</p></header>
      {agents.length === 0 ? <EmptyState title="Profiles are being confirmed" action={{ label: "Talk to a person", href: "/contact/" }}>We list agents only with their real names, license numbers and a photo release on file. Until then, the office is one call away.</EmptyState> : (
        <CardGrid>{agents.map((a) => <Card key={a.id} as="h2" title={a.name} href={`/agents/${a.slug}/`} meta={(a.licenses ?? []).map((l) => (typeof l.state === "object" ? l.state.abbr : "")).filter(Boolean).join(" · ")}>{a.title}</Card>)}</CardGrid>
      )}
    </div>
  );
}
