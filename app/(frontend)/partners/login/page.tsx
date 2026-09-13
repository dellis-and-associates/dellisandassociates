import { pageMetadata } from "@/src/lib/seo";
import { TextField } from "@/src/components/ui/field";
import { Callout } from "@/src/components/ui/callout";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Partner sign in", description: "Sign in to the partner portal.", path: "/partners/login/", indexable: false });
/** Plain form posting to Payload's login endpoint; the cookie it sets is the portal session. Works without JavaScript. */
export default async function PartnerLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto grid max-w-measure-page gap-6 px-4 py-16 md:px-8">
      <div className="grid max-w-measure-narrow gap-6">
        <h1>Partner sign in</h1>
        {error ? <Callout kind="critical" lead="Not signed in.">Check the email and password. Accounts are created by the office; ask if you do not have one.</Callout> : null}
        <form action="/api/partner-login/" method="post" className="grid gap-4">
          <TextField id="email" name="email" label="Email" type="email" autoComplete="email" inputMode="email" required />
          <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" required />
          <button className="inline-flex min-h-11 w-fit items-center rounded-control bg-brand px-5 font-sans text-small font-semibold text-brand-ink hover:bg-brand-hover">Sign in</button>
        </form>
        <p className="font-sans text-small text-ink-muted">Partner accounts are created by the office after your agreement is on file.</p>
      </div>
    </div>
  );
}
