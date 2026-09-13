import Link from "next/link";
import { getSiteSettings } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { Callout } from "@/src/components/ui/callout";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Received", description: "Your message has been received.", path: "/contact/thanks/", indexable: false });

export default async function Thanks({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const site = await getSiteSettings();
  return (
    <div className="mx-auto grid max-w-measure-page gap-6 px-4 py-16 md:px-8">
      <h1>Received</h1>
      <Callout kind="positive" lead="Saved.">Your reference is <strong className="tabular">{ref}</strong>. A licensed agent will read it and reply, usually the same business day.</Callout>
      <p className="max-w-measure-body">If it is urgent{site.phone ? <>, call <a href={site.phoneHref ?? "#"} className="tabular">{site.phone}</a></> : ", call the office"}. Nothing is bound by this message.</p>
      <p className="font-sans text-small"><Link href="/">Back to the home page</Link></p>
    </div>
  );
}
