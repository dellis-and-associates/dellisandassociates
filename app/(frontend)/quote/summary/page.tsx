import { getProducts } from "@/src/lib/content";
import { loadSession } from "@/src/lib/quote";
import { pageMetadata } from "@/src/lib/seo";
import { QuoteSummaryForm } from "@/src/components/site/quote-summary";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Request a quote · Check and send", description: "Check what you entered, then send.", path: "/quote/summary/", indexable: false });

export default async function Summary() {
  const [session, products] = await Promise.all([loadSession(), getProducts()]);
  const names = (session.data.products ?? []).map((s) => products.find((p) => p.slug === s)?.name ?? s);
  return <QuoteSummaryForm data={session.data} productNames={names} />;
}
