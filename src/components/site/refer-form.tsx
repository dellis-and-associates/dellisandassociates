"use client";
import Link from "next/link";
import { useActionState } from "react";
import { submitReferral, type ReferState } from "../../../app/(frontend)/actions/refer.ts";
import { publicEnv } from "../../env.public.ts";
import { ChoiceGroup, ErrorSummary, SelectField, TextField } from "../ui/field.tsx";
import { Callout } from "../ui/callout.tsx";

/** Referral submission. The consent affirmation is explicit and never pre-checked; the referee gets exactly one message and can decline. */
export function ReferForm({ track, products, back }: { track: "customer" | "partner"; products: { slug: string; name: string }[]; back: string }) {
  const [state, formAction, pending] = useActionState<ReferState | undefined, FormData>(submitReferral.bind(null, track), undefined);
  const errors = state?.errors ?? [];
  const err = (f: string) => errors.find((e) => e.field === f)?.message;
  if (state?.done) return (
    <div className="mx-auto grid max-w-measure-shell gap-6 px-gutter py-10"><h1>Sent</h1>
      {state.done === "submitted" ? <Callout kind="positive" lead="One message is on its way.">{state.firstName} will get a single email from us that names you. If they say yes, we get in touch; if not, that is the end of it.</Callout> : <Callout kind="notice" lead="Not sent.">{state.reason === "self-referral" ? "That looks like your own contact details. Referrals are for other people." : state.reason === "duplicate-referee" ? "Someone has already referred this person recently." : state.reason === "disposable-email" ? "That email domain is a temporary-address service. Use their usual address." : "This referral could not be sent. The office can see why and will follow up if needed."}</Callout>}
      <p className="font-text text-copy"><Link href={back}>Back to the portal</Link></p>
    </div>
  );
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-10">
      <div className="grid max-w-measure-body gap-6">
        <h1>Refer someone</h1>
        <p className="max-w-measure-body">They get one email from us, naming you, and can say no. We do not call or text anyone before they say yes.</p>
        <form key={state ? `attempt-${errors.length}` : "initial"} action={formAction} method="post" className="grid gap-6" noValidate aria-busy={pending || undefined}>
          <ErrorSummary errors={errors} />
          <TextField id="firstName" name="firstName" label="Their first name" required autoComplete="off" error={err("firstName")} />
          <TextField id="lastName" name="lastName" label="Their last name" autoComplete="off" error={err("lastName")} />
          <TextField id="email" name="email" label="Their email" type="email" required autoComplete="off" inputMode="email" error={err("email")} help="Where the one opt-in message goes." />
          <TextField id="phone" name="phone" label="Their phone" type="tel" autoComplete="off" inputMode="tel" error={err("phone")} help="Only used after they say yes." />
          <SelectField id="stateAbbr" name="stateAbbr" label="Their state" required options={[{ label: "Arizona", value: "AZ" }, { label: "Nevada", value: "NV" }, { label: "Utah", value: "UT" }, { label: "Idaho", value: "ID" }]} placeholder="Choose one" error={err("stateAbbr")} />
          <ChoiceGroup id="interest" name="interest" legend="What might they need?" type="checkbox" options={products.map((p) => ({ label: p.name, value: p.slug }))} help="Optional. Medicare-related referrals follow Medicare's own rules." />
          <ChoiceGroup id="affirm" name="affirm" legend="Permission" type="checkbox" required options={[{ label: "I have this person's permission to share their details with Desert Peak Insurance, and they expect to hear from you.", value: "yes" }]} error={err("affirm")} />
          <div className="cf-turnstile" data-sitekey={publicEnv.TURNSTILE_SITE_KEY} data-size="flexible" />
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink hover:bg-brand-hover" disabled={pending}>Send the one message</button>
            <Link href={back} className="ui-link font-text text-copy underline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
