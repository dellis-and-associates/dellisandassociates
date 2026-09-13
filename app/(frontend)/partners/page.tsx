import Link from "next/link";
import { getPage } from "@/src/lib/content";
import { SITE, breadcrumbJsonLd, isIndexable, jsonLd, pageMetadata } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { PageBlocks } from "@/src/components/site/page-blocks";
import { StrataRule } from "@/src/components/ui/misc";

export const revalidate = false;
export async function generateMetadata() {
  const page = await getPage("/partners/");
  return pageMetadata({ title: "Partner with Desert Peak", description: "For licensed producers, realtors, mortgage brokers and dealers: how referrals to Desert Peak Insurance work, and the portal where you see their status.", path: "/partners/", indexable: page ? isIndexable(page) : false });
}
/** Replaces the legacy /work-with-us. The program itself stays off until counsel has filled the rule table. */
export default async function Partners() {
  const page = await getPage("/partners/");
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{label: "Partners", href: "/partners/"}], SITE))} />
      <Breadcrumb items={[{ label: "Partners", href: "/partners/" }]} />
      <header className="grid gap-4"><h1>{page?.title ?? "Partner with Desert Peak"}</h1><p className="lead max-w-measure-body">{page?.lede ?? "Licensed producers, realtors, mortgage brokers and dealers refer people to us; we compare the carriers we represent and tell them what we find. The portal shows you the status of every referral you send."}</p><StrataRule /></header>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-8">
          <PageBlocks layout={page?.layout} />
          <section aria-labelledby="how" className="grid gap-4">
            <h2 id="how">How it works</h2>
            <ol className="grid gap-4 md:grid-cols-3">{[["You refer", "From the portal or your link, with the person's permission."], ["They opt in", "One message, from us, naming you. They can say no."], ["You see the status", "Contacted, qualified, and any thank-you the program allows in their state."]].map(([t, b], i) => <li key={t} className="grid gap-2 border-t-2 border-ink pt-4"><span className="font-sans text-caption font-medium text-ink-muted tabular">Step {i + 1}</span><h3 className="font-sans text-title-sm">{t}</h3><p className="font-sans text-small text-ink-muted">{b}</p></li>)}</ol>
          </section>
          <p className="max-w-measure-body font-sans text-small text-ink-muted">Any thank-you for a referral is set by state rules, is never contingent on a policy being sold, and is switched on only after counsel has confirmed the rules for each state. Until then the portal tracks referrals without rewards.</p>
        </div>
        <aside className="grid content-start gap-4 rounded-surface border border-border bg-surface-raised p-5">
          <h2 className="font-sans text-title-sm">Partner portal</h2>
          <p className="font-sans text-small text-ink-muted">Sign in to send a referral and see the status of the ones you have sent.</p>
          <Link href="/partners/portal/" className="inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink no-underline hover:bg-brand-hover">Open the portal</Link>
          <Link href="/contact/" className="ui-link font-sans text-small">Ask about partnering</Link>
        </aside>
      </div>
    </div>
  );
}
