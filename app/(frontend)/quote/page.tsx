import { redirect } from "next/navigation";
import { pageMetadata } from "@/src/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Request the analysis", description: "Tell us what to compare. Four short steps, saved as you go.", path: "/quote/", indexable: false });
/** /quote/ is step 1. Query params (product, state, city) prefill from the page the person came from. */
export default async function QuoteStart({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = new URLSearchParams(await searchParams);
  redirect(`/quote/1/${sp.toString() ? `?${sp}` : ""}`);
}
