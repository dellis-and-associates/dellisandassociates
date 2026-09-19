import Link from "next/link";
import { getArticles, getPage, getPromotedWave } from "@/src/lib/content";
import { articlePath, isWritten } from "@/src/lib/routes";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { ARTICLE_SECTIONS } from "@/src/collections/Articles";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { EmptyState } from "@/src/components/ui/misc";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/resources/");
  return pageMetadata({ title: "Insurance guides and glossary", description: "Plain-language guides to auto, home, life, Medicare and commercial insurance in Arizona, Nevada, Utah and Idaho, plus a glossary of the words on your policy.", path: "/resources/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}

export default async function Resources() {
  const articles = (await getArticles()).filter(isWritten);
  return (
    <div className="mx-auto grid max-w-measure-shell gap-10 px-gutter py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Resources", href: "/resources/"}], SITE))} />
      <Breadcrumb items={[{ label: "Resources", href: "/resources/" }]} />
      <header className="grid gap-4"><h1>Guides, comparisons and the glossary</h1><p className="lead max-w-measure-body">Written to answer the question you actually typed. Where a fact depends on state law we cite the source; where we have not verified it yet, we say so.</p></header>
      <p className="font-text text-copy"><Link href="/resources/glossary/" className="font-semibold">Glossary of insurance terms</Link></p>
      {articles.length === 0 ? <EmptyState title="Start with the glossary">Plain-language definitions of the terms on your policy, with worked examples.</EmptyState> : null}
      {ARTICLE_SECTIONS.map((s) => {
        const list = articles.filter((a) => a.section === s.value);
        if (!list.length) return null;
        return (
          <section key={s.value} aria-labelledby={`sec-${s.value}`} className="grid gap-3">
            <h2 id={`sec-${s.value}`}><Link href={`/resources/${s.value}/`} className="ui-link text-ink">{s.label}</Link></h2>
            <ul className="grid gap-2 font-text text-copy sm:grid-cols-2">{list.slice(0, 8).map((a) => <li key={a.id}><Link href={articlePath(a.section, a.slug)} className="ui-link text-ink">{a.title}</Link>{a.reviewStatus !== "reviewed" ? <span className="ml-2 text-ink-muted">(draft)</span> : null}</li>)}</ul>
            {list.length > 8 ? <Link href={`/resources/${s.value}/`} className="ui-link font-text text-copy font-semibold">All {list.length} in {s.label.toLowerCase()}</Link> : null}
          </section>
        );
      })}
    </div>
  );
}
