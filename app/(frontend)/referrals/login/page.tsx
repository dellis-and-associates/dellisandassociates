import { pageMetadata } from "@/src/lib/seo";
import { TextField } from "@/src/components/ui/field";
import { Callout } from "@/src/components/ui/callout";
import { sendMagicLink } from "@/src/components/site/magic-link";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Sign in", description: "Sign in with a link sent to your email.", path: "/referrals/login/", indexable: false });
/** No password. A link to the email on file; nothing else to remember. */
export default async function CustomerLogin({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const { sent, error } = await searchParams;
  return (
    <div className="mx-auto grid max-w-measure-shell gap-6 px-gutter py-16">
      <div className="grid max-w-measure-narrow gap-6">
        <h1>Sign in</h1>
        {sent ? <Callout kind="positive" lead="Check your email.">If that address has a referral code, a sign-in link is on its way. It works once and expires in an hour.</Callout> : null}
        {error ? <Callout kind="critical" lead="That link did not work.">It may have expired or been used already. Request a new one below.</Callout> : null}
        <form action={sendMagicLink} method="post" className="grid gap-4">
          <TextField id="email" name="email" label="Email" type="email" autoComplete="email" inputMode="email" required help="The email the office has for you." />
          <button className="inline-flex min-h-11 w-fit items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink hover:bg-brand-hover">Email me a sign-in link</button>
        </form>
        <p className="font-text text-copy text-ink-muted">Partner accounts are created by the office after your agreement is on file.</p>
      </div>
    </div>
  );
}
