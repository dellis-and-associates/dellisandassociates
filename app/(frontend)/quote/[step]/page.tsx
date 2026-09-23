import { notFound } from "next/navigation";
import { getProducts } from "@/src/lib/content";
import { loadSession, STEPS } from "@/src/lib/quote";
import { pageMetadata } from "@/src/lib/seo";
import { QuoteStepForm } from "@/src/components/site/quote-step";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ step: string }> }) {
  const n = Number((await params).step);
  const s = STEPS.find((x) => x.n === n);
  return pageMetadata({ title: s ? `Request a quote · ${s.label}` : "Request a quote", description: "Four short steps, saved as you go.", path: `/quote/${n}/`, indexable: false });
}
export default async function QuoteStep({ params, searchParams }: { params: Promise<{ step: string }>; searchParams: Promise<Record<string, string>> }) {
  const n = Number((await params).step);
  if (![1, 2, 3].includes(n)) notFound();
  const [session, products, sp] = await Promise.all([loadSession(), getProducts(), searchParams]);
  const data = { ...session.data };
  if (n === 1 && !data.products?.length && sp.product) data.products = [sp.product];
  if (n === 1 && !data.state && sp.state) data.state = sp.state;
  if (n === 1 && !data.city && sp.city) data.city = sp.city;
  return <QuoteStepForm step={n} data={data} products={products.filter((p) => !p.parent).map((p) => ({ slug: p.slug, name: p.name, category: p.category }))} />;
}
