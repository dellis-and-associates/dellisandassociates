import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/src/lib/content";
import { articlePath } from "@/src/lib/routes";
import { breadcrumbJsonLd, jsonLd, pageMetadata, SITE } from "@/src/lib/seo";
import { ARTICLE_SECTIONS } from "@/src/collections/Articles";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { EmptyState } from "@/src/components/ui/misc";

export const revalidate = false;
const section = (v: string) => ARTICLE_SECTIONS.find((s) => s.value === v);
export function generateStaticParams() {
  return ARTICLE_SECTIONS.map((s) => ({ section: s.value }));
}
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const s = section((await params).section);
  if (!s) return {};
  return pageMetadata({ title: s.label, description: `${s.label} from Desert Peak Insurance: plain-language answers with sources.`, path: `/resources/${s.value}/`, indexable: false });
}
export default async function Section({ params }: { params: Promise<{ section: string }> }) {
  const s = section((await params).section);
  if (!s) notFound();
  const list = (await getArticles()).filter((a) => a.section === s.value);
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ label: "Resources", href: "/resources/" }, { label: s.label, href: `/resources/${s.value}/` }], SITE))} />
      <Breadcrumb items={[{ label: "Resources", href: "/resources/" }, { label: s.label, href: `/resources/${s.value}/` }]} />
      <h1>{s.label}</h1>
      {list.length ? <ul className="grid gap-3 font-sans text-small sm:grid-cols-2">{list.map((a) => <li key={a.id}><Link href={articlePath(a.section, a.slug)} className="ui-link font-semibold text-ink">{a.title}</Link>{a.reviewStatus !== "reviewed" ? <span className="ml-2 text-ink-muted">(draft)</span> : null}{a.excerpt ? <span className="block text-ink-muted">{a.excerpt}</span> : null}</li>)}</ul> : <EmptyState title="Nothing published here yet" action={{ label: "Browse the glossary", href: "/resources/glossary/" }}>Guides in this section are drafted and waiting for review.</EmptyState>}
    </div>
  );
}
