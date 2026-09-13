import Link from "next/link";
import { getSiteSettings } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { Callout } from "@/src/components/ui/callout";
import { ClearDraft } from "@/src/components/site/clear-draft";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Request received", description: "Your comparison request has been received.", path: "/quote/done/", indexable: false });
export default async function Done({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const site = await getSiteSettings();
  return (
    <div className="mx-auto grid max-w-measure-page gap-6 px-4 py-16 md:px-8" data-quote-done>
      <ClearDraft />
      <h1>Request received</h1>
      <Callout kind="positive" lead="Saved.">Reference <strong className="tabular" data-reference>{ref}</strong>. A licensed agent will compare the carriers we represent and send you the finding, usually within two business days. If keeping what you have is right, that is what you will hear.</Callout>
      <p className="max-w-measure-body">Questions in the meantime{site.phone ? <>: call <a href={site.phoneHref ?? "#"} className="tabular">{site.phone}</a></> : ": use the contact page"}.</p>
      <p className="font-sans text-small"><Link href="/">Back to the home page</Link></p>
    </div>
  );
}
