import Link from "next/link";
import { redirect } from "next/navigation";
import { env } from "@/src/env";
import { customerEmail } from "@/src/lib/auth";
import { db } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { PortalBody } from "@/src/components/site/portal";
import { EmptyState } from "@/src/components/ui/misc";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Your referrals", description: "Your code, your referrals, your thank-yous.", path: "/referrals/", indexable: false });

/** Customer referrer portal: magic-link session on Supabase Auth (Project A); referrer data lives in Payload, matched by email. */
export default async function CustomerPortal() {
  const email = await customerEmail();
  if (!email) redirect("/referrals/login/");
  const payload = await db();
  const referrer = (await payload.find({ collection: "referrers", where: { and: [{ track: { equals: "customer" } }, { email: { equals: email } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  return (
    <div className="mx-auto grid max-w-measure-page gap-8 px-4 py-10 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4"><h1>Your referrals</h1><form action="/referrals/auth/signout/" method="post"><button className="min-h-11 rounded-control border border-border-strong px-4 font-sans text-small font-semibold">Sign out</button></form></div>
      {referrer ? <PortalBody payload={payload} referrer={referrer as never} siteUrl={env.NEXT_PUBLIC_SITE_URL} track="customer" /> : <EmptyState title="No referral code is linked to this email" action={{ label: "Ask the office for a code", href: "/contact/" }}>You are signed in as {email}. Codes are issued by the office to clients who ask for one. <Link href="/">Home</Link></EmptyState>}
    </div>
  );
}
