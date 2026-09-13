import Link from "next/link";
import type { Product, State } from "../../payload-types.ts";
import { ctaLabel, titles } from "../../lib/compose.ts";
import { productPath, productSubPath } from "../../lib/routes.ts";
import { jsonLd, serviceJsonLd, faqJsonLd, breadcrumbJsonLd, SITE } from "../../lib/seo.ts";
import { richTextToPlain } from "../../lib/text.ts";
import { Breadcrumb } from "../ui/breadcrumb.tsx";
import { CtaBand, LinkTabs, RelatedLinks, StrataRule } from "../ui/misc.tsx";
import { RichText } from "../site/richtext.tsx";
import { CoverageBlocks, CoveredLists, Discounts, Faq, MedicareDisclaimer, StateLinks } from "./shared.tsx";

export async function ProductTemplate({ product, sub, states }: { product: Product; sub: "coverage" | "third" | null; states: State[] }) {
  const path = sub ? productSubPath(product, sub) : productPath(product);
  const crumbs = [{ label: "Insurance", href: "/insurance/" }, ...(typeof product.parent === "object" && product.parent ? [{ label: product.parent.name, href: productPath(product.parent) }] : []), { label: product.name, href: productPath(product) }, ...(sub ? [{ label: sub === "coverage" ? "Coverage" : product.thirdSubpage === "plans-enrollment-faq" ? "Plans and enrollment" : "Discounts and FAQ", href: path }] : [])];
  const tabs = [{ label: "Overview", href: productPath(product) }, { label: "What it covers", href: productSubPath(product, "coverage") }, { label: product.thirdSubpage === "plans-enrollment-faq" ? "Plans and enrollment" : "Discounts and FAQ", href: productSubPath(product, "third") }];
  const related = (product.relatedProducts ?? []).map((r) => (typeof r === "object" ? r : null)).filter((r): r is Product => Boolean(r));
  const faqs = (product.faqs ?? []).map((f) => ({ q: f.question, a: richTextToPlain(f.answer) }));
  const title = sub === "coverage" ? titles.coverage(product) : sub === "third" ? titles.third(product) : product.name;
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceJsonLd(product.name, path, product.summary ?? "", states.map((s) => s.name)))} />
      {sub === "third" && faqs.length ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(faqs))} /> : null}
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4">
        <h1>{title}</h1>
        {product.summary && !product.summary.includes("{{TODO") ? <p className="lead max-w-measure-body">{product.summary}</p> : null}
        <StrataRule />
      </header>
      <LinkTabs label={`${product.name} pages`} items={tabs} current={path} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-12">
          {sub === null ? (
            <>
              {product.intro ? <RichText value={product.intro} /> : null}
              <CoveredLists product={product} />
              <CoverageBlocks product={product} />
            </>
          ) : sub === "coverage" ? (
            <>
              <CoverageBlocks product={product} />
              <CoveredLists product={product} />
            </>
          ) : (
            <>
              <Discounts product={product} />
              <Faq product={product} heading={product.thirdSubpage === "plans-enrollment-faq" ? "Plans and enrollment questions" : "Questions people ask"} />
            </>
          )}
          <MedicareDisclaimer product={product} />
        </div>
        <aside className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start" aria-label="On this line">
          <div className="rounded-surface border border-border bg-surface-raised p-5">
            <h2 className="font-sans text-title-sm">{ctaLabel(product)}</h2>
            <p className="mt-2 font-sans text-small text-ink-muted">We compare the carriers we represent for {product.name.toLowerCase()} and show the math. If what you have is right, we say so.</p>
            <Link href={`/quote/?product=${product.slug}`} className="mt-4 inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink no-underline hover:bg-brand-hover">{ctaLabel(product)}</Link>
          </div>
          <StateLinks product={product} states={states} />
        </aside>
      </div>
      <CtaBand heading={`${ctaLabel(product)} for ${product.name.toLowerCase()}`} action={{ label: ctaLabel(product), href: `/quote/?product=${product.slug}` }} secondary={{ label: "Talk to a person", href: "/contact/" }} sticky />
      <RelatedLinks title="Related lines" items={related.map((r) => ({ label: r.name, href: productPath(r), note: r.summary && !r.summary.includes("{{TODO") ? r.summary : undefined }))} />
    </div>
  );
}
