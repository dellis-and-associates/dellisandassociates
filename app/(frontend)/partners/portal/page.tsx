import { redirect } from "next/navigation";
import { env } from "@/src/env";
import { currentUser } from "@/src/lib/auth";
import { db } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { PortalBody } from "@/src/components/site/portal";
import { EmptyState } from "@/src/components/ui/misc";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Partner portal", description: "Your code, your referrals, your statement.", path: "/partners/portal/", indexable: false });

/** Gated by the partner (or agent/admin) role. Meets the same standard as the public site. */
export default async function PartnerPortal() {
  const user = await currentUser();
  if (!user) redirect("/partners/login/");
  const payload = await db();
  const referrer = (await payload.find({ collection: "referrers", where: { user: { equals: user.id } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-10">
      <div className="flex flex-wrap items-end justify-between gap-4"><h1>Partner portal</h1><form action="/api/partner-logout/" method="post"><button className="min-h-11 rounded-control border border-border-strong px-4 font-text text-copy font-semibold">Sign out</button></form></div>
      {referrer ? <PortalBody payload={payload} referrer={referrer as never} siteUrl={env.NEXT_PUBLIC_SITE_URL} track="partner" /> : <EmptyState title="Your referrer profile is not set up yet" action={{ label: "Contact the office", href: "/contact/" }}>Your login works, but the office has not linked it to a partner referral profile. Once they do, your code and referrals appear here.</EmptyState>}
    </div>
  );
}
