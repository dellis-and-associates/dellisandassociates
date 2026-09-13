import Link from "next/link";
import { getGlossary, getPage } from "@/src/lib/content";
import { glossaryPath } from "@/src/lib/routes";
import { breadcrumbJsonLd, jsonLd, pageMetadata, SITE } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/resources/glossary/");
  return pageMetadata({ title: "Insurance glossary", description: "The words on your policy, defined in plain language with a worked example each: deductible, premium, liability limit, endorsement and more.", path: "/resources/glossary/", indexable: page ? page.reviewStatus === "reviewed" : true });
}
export default async function Glossary() {
  const terms = await getGlossary();
  const byLetter = new Map<string, typeof terms>();
  for (const t of terms) {
    const l = t.term.charAt(0).toUpperCase();
    byLetter.set(l, [...(byLetter.get(l) ?? []), t]);
  }
  const letters = [...byLetter.keys()].sort();
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ label: "Resources", href: "/resources/" }, { label: "Glossary", href: "/resources/glossary/" }], SITE))} />
      <Breadcrumb items={[{ label: "Resources", href: "/resources/" }, { label: "Glossary", href: "/resources/glossary/" }]} />
      <header className="grid gap-4"><h1>Insurance glossary</h1><p className="lead max-w-measure-body">{terms.length} terms. Each one is defined in plain words, shown in practice, and worked through with an example. Nothing is defined using itself.</p></header>
      <nav aria-label="Jump to letter" className="flex flex-wrap gap-1 font-sans text-small">{letters.map((l) => <a key={l} href={`#letter-${l}`} className="ui-link inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-border text-ink">{l}</a>)}</nav>
      {letters.map((l) => (
        <section key={l} aria-labelledby={`letter-${l}`} className="grid gap-3">
          <h2 id={`letter-${l}`} className="font-sans text-title-sm">{l}</h2>
          <ul className="grid gap-2 font-sans text-small sm:grid-cols-2 lg:grid-cols-3">{byLetter.get(l)!.map((t) => <li key={t.id}><Link href={glossaryPath(t.slug)} className="ui-link text-ink">{t.term}</Link>{t.reviewStatus !== "reviewed" ? <span className="ml-2 text-ink-muted">(draft)</span> : null}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
