import Link from "next/link";
import { notFound } from "next/navigation";
import { getGlossary, getTerm } from "@/src/lib/content";
import { glossaryPath, productPath } from "@/src/lib/routes";
import { breadcrumbJsonLd, definedTermJsonLd, isIndexable, jsonLd, pageMetadata, SITE } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { RelatedLinks } from "@/src/components/ui/misc";
import { RichText } from "@/src/components/site/richtext";
import { richTextToPlain } from "@/src/lib/text";

export const revalidate = false;
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getGlossary()).filter((g) => g.reviewStatus === "reviewed" && g.indexWave === "1").map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTerm((await params).slug);
  if (!t) return {};
  return pageMetadata({ title: `${t.term}, defined`, description: t.seo?.description ?? (richTextToPlain(t.definition).slice(0, 150) || `What "${t.term}" means on an insurance policy, in plain language, with a worked example.`), path: glossaryPath(t.slug), indexable: isIndexable(t) });
}
export default async function Term({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTerm((await params).slug);
  if (!t) notFound();
  const path = glossaryPath(t.slug);
  const crumbs = [{ label: "Resources", href: "/resources/" }, { label: "Glossary", href: "/resources/glossary/" }, { label: t.term, href: path }];
  const related = (t.relatedTerms ?? []).filter((r): r is Exclude<typeof r, number> => typeof r === "object");
  const products = (t.relatedProducts ?? []).filter((r): r is Exclude<typeof r, number> => typeof r === "object");
  const def = richTextToPlain(t.definition);
  return (
    <article className="mx-auto grid max-w-measure-page gap-8 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      {def ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(definedTermJsonLd(t.term, path, def))} /> : null}
      <Breadcrumb items={crumbs} />
      <header className="grid gap-2"><p className="kicker">Glossary</p><h1>{t.term}, defined</h1></header>
      {def ? (
        <>
          <RichText value={t.definition} className="prose lead" />
          {t.inPractice ? <section aria-labelledby="practice" className="grid gap-3"><h2 id="practice" className="font-sans text-title-sm">In practice</h2><RichText value={t.inPractice} /></section> : null}
          {t.example ? <section aria-labelledby="example" className="grid gap-3 rounded-surface border border-border bg-surface-sunken p-6"><h2 id="example" className="font-sans text-title-sm">A worked example</h2><RichText value={t.example} /></section> : null}
        </>
      ) : (
        <p className="max-w-measure-body font-sans text-small text-ink-muted">This definition is scheduled and not yet written.</p>
      )}
      {t.reviewStatus !== "reviewed" ? <p className="font-sans text-caption text-ink-muted">Draft. Not yet reviewed by a licensed person.</p> : null}
      {products.length ? <p className="font-sans text-small">Applies to: {products.map((p) => <Link key={p.id} href={productPath(p)} className="mr-3">{p.name}</Link>)}</p> : null}
      <RelatedLinks title="Related terms" items={related.slice(0, 5).map((r) => ({ label: r.term, href: glossaryPath(r.slug) }))} />
      <p className="font-sans text-small"><Link href="/resources/glossary/">All terms</Link></p>
    </article>
  );
}
