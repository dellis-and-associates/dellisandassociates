import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/src/lib/content";
import { articlePath, glossaryPath, productPath, isWritten } from "@/src/lib/routes";
import { articleJsonLd, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata, SITE } from "@/src/lib/seo";
import { ARTICLE_SECTIONS } from "@/src/collections/Articles";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { CtaBand, RelatedLinks, StrataRule } from "@/src/components/ui/misc";
import { RichText } from "@/src/components/site/richtext";
import { richTextToPlain } from "@/src/lib/text";

export const revalidate = false;
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getArticles()).filter((a) => a.reviewStatus === "reviewed" && a.indexWave === "1").map((a) => ({ section: a.section, slug: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const a = await getArticle(section, slug);
  if (!a) return {};
  const fallback = `${a.title}: a plain-language guide from an independent agency in Arizona, Nevada, Utah and Idaho.`;
  return pageMetadata({ title: a.seo?.title ?? a.title, description: a.seo?.description ?? a.excerpt ?? (richTextToPlain(a.body).slice(0, 150) || fallback), path: articlePath(section, slug), indexable: isIndexable(a), type: "article" });
}
export default async function ArticlePage({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params;
  const a = await getArticle(section, slug);
  if (!a || !isWritten(a)) notFound();
  const sec = ARTICLE_SECTIONS.find((s) => s.value === section);
  const path = articlePath(section, slug);
  const crumbs = [{ label: "Resources", href: "/resources/" }, { label: sec?.label ?? section, href: `/resources/${section}/` }, { label: a.title, href: path }];
  const products = (a.relatedProducts ?? []).filter((p): p is Exclude<typeof p, number> => typeof p === "object");
  const articles = (a.relatedArticles ?? []).filter((p): p is Exclude<typeof p, number> => typeof p === "object");
  const terms = (a.relatedTerms ?? []).filter((p): p is Exclude<typeof p, number> => typeof p === "object");
  const drafted = a.generation?.status === "drafted" || (a.wordCount ?? 0) > 0;
  return (
    <article className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleJsonLd(a.title, path, a.excerpt ?? "", { published: a.createdAt, modified: a.updatedAt }))} />
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4">
        <p className="kicker">{sec?.label}</p>
        <h1>{a.title}</h1>
        {a.excerpt ? <p className="lead max-w-measure-body">{a.excerpt}</p> : null}
        <p className="font-sans text-caption text-ink-muted tabular">Updated {new Date(a.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}{a.wordCount ? ` · ${a.wordCount} words` : ""}</p>
        <StrataRule />
      </header>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-10">
          {drafted ? <RichText value={a.body} /> : null}
        </div>
        <aside className="grid content-start gap-8 lg:sticky lg:top-24 lg:self-start">
          {terms.length ? <nav aria-label="Terms used" className="grid gap-2"><h2 className="font-sans text-title-sm">Terms used</h2><ul className="grid gap-1 font-sans text-small">{terms.map((t) => <li key={t.id}><Link href={glossaryPath(t.slug)} className="ui-link">{t.term}</Link></li>)}</ul></nav> : null}
          {products.length ? <nav aria-label="Lines this applies to" className="grid gap-2"><h2 className="font-sans text-title-sm">Applies to</h2><ul className="grid gap-1 font-sans text-small">{products.map((p) => <li key={p.id}><Link href={productPath(p)} className="ui-link">{p.name}</Link></li>)}</ul></nav> : null}
        </aside>
      </div>
      <CtaBand heading="Want this applied to your policy?" body="Send us what you have. We compare it against the carriers we represent and show the math." action={{ label: "Request the analysis", href: "/quote/" }} />
      <RelatedLinks title="Related guides" items={articles.map((r) => ({ label: r.title, href: articlePath(r.section, r.slug), note: r.excerpt ?? undefined }))} />
    </article>
  );
}
