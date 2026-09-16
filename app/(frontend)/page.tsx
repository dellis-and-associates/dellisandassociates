import { getPage, getProducts, getSiteSettings, getStates, getPromotedWave } from "@/src/lib/content";
import { faqJsonLd, isIndexable, jsonLd, orgJsonLd, pageMetadata, websiteJsonLd } from "@/src/lib/seo";
import { richTextToPlain } from "@/src/lib/text";
import { PageBlocks } from "@/src/components/site/page-blocks";
import { CarrierStrip, ClosingBand, CoverageGroups, Faq, Hero, LifeEvents, Recognition, Testimonials, homeFaqs } from "@/src/components/site/home";
import { orderStates } from "@/src/lib/groups";

export const revalidate = false;

export async function generateMetadata() {
  const page = await getPage("/");
  return pageMetadata({ title: "Desert Peak Insurance — independent, AZ · NV · UT · ID", description: page?.seo?.description ?? "We compare the carriers we represent across auto, home, life, Medicare and commercial lines, and tell you what we find. The analysis costs nothing.", path: "/", indexable: page ? isIndexable(page, { promotedWave: await getPromotedWave() }) : false });
}

/**
 * Home: the hero (the page's one bold element) with the advisor panel, the
 * carrier strip, coverage in four groups, the policy-review moments, the
 * questions people ask, consented testimonials, the plan-year recognition,
 * and the closing band. No table; every line is two clicks away.
 */
export default async function Home() {
  const [page, products, states, site] = await Promise.all([getPage("/"), getProducts(), getStates(), getSiteSettings()]);
  const headline = page?.title && !page.title.includes("{{TODO") && page.title !== "Home" ? page.title : "Compared across carriers. Explained with the math.";
  const lede = page?.lede && !page.lede.includes("{{TODO") ? page.lede : `We compare your current policies against the carriers we represent in ${orderStates(states).map((s) => s.name).join(", ")}. It costs nothing, and if what you have is the best option, we say so.`;
  const faqs = homeFaqs(products);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(orgJsonLd(site, states.map((s) => s.name)))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd())} />
      {faqs.length ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(faqs.map((f) => ({ q: f.question, a: richTextToPlain(f.answer) }))))} /> : null}
      <Hero site={site} states={states} headline={headline} lede={lede} />
      <CarrierStrip site={site} />
      <div className="mx-auto grid max-w-measure-page gap-16 px-4 py-16 md:px-8 md:gap-20">
        <CoverageGroups products={products} />
        <LifeEvents />
        <Faq items={faqs} />
        <Testimonials site={site} />
        <Recognition />
        <PageBlocks layout={page?.layout} />
      </div>
      <ClosingBand site={site} />
    </>
  );
}
