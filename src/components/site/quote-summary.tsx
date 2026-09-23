"use client";
import Link from "next/link";
import { useActionState } from "react";
import { submitQuote, type StepState } from "../../../app/(frontend)/quote/actions.ts";
import type { QuoteData } from "../../lib/quote.ts";
import { STEPS } from "../../lib/quote-steps.ts";
import { publicEnv } from "../../env.public.ts";
import { ErrorSummary } from "../ui/field.tsx";
import { Stepper } from "../ui/misc.tsx";

/** Everything entered, editable in place (each section links back to its step). Consent is exact and never pre-checked. */
export function QuoteSummaryForm({ data, productNames }: { data: QuoteData; productNames: string[] }) {
  const [state, formAction, pending] = useActionState<StepState | undefined, FormData>(submitQuote, undefined);
  const errors = state?.errors ?? [];
  const row = (label: string, value?: string | null) => (
    <div className="grid grid-cols-[minmax(0,10rem)_1fr] gap-3 py-2 font-text text-copy"><dt className="text-ink-muted">{label}</dt><dd className="tabular">{value || <span className="text-ink-muted">not given</span>}</dd></div>
  );
  const section = (title: string, step: number, children: React.ReactNode) => (
    <section aria-labelledby={`s-${step}`} className="rounded-surface border border-border bg-surface-raised p-5">
      <div className="flex items-center justify-between gap-4"><h2 id={`s-${step}`} className="font-text text-title-sm">{title}</h2><Link href={`/quote/${step}/`} className="ui-link font-text text-copy underline">Edit {title.toLowerCase()}</Link></div>
      <dl className="mt-3 divide-y divide-border">{children}</dl>
    </section>
  );
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-10" data-quote-summary>
      <div className="grid max-w-measure-body gap-6">
        <h1>Request a quote</h1>
        <Stepper step={4} total={4} label="Check and send" steps={STEPS.map((s) => s.label)} />
        <form action={formAction} method="post" className="grid gap-6" noValidate aria-busy={pending || undefined}>
          <ErrorSummary errors={errors} />
          {section("What to compare", 1, <>{row("Lines", productNames.join(", "))}{row("ZIP code", data.zip)}</>)}
          {section("About you", 2, <>{row("Name", data.name)}{row("Email", data.email)}{row("Phone", data.phone)}{row("Date of birth", data.dob)}{row("Address", data.address)}</>)}
          {section("Details", 3, <>{(data.vehicles ?? []).map((v, i) => row(`Vehicle ${i + 1}`, [[v.year, v.make, v.model].filter(Boolean).join(" "), v.vin ? `VIN ${v.vin}` : ""].filter(Boolean).join(" · ")))}{data.property?.yearBuilt ? row("Year built", data.property.yearBuilt) : null}{data.property?.roof ? row("Roof", data.property.roof) : null}{data.property?.ownership ? row("You are the", data.property.ownership) : null}{row("Notes", data.notes)}</>)}
          <fieldset className="grid gap-2" aria-describedby={errors.find((e) => e.field === "consent") ? "consent-error" : undefined}>
            <legend className="sr-only">Consent</legend>
            <label htmlFor="consent" className="flex items-start gap-3 font-text text-copy">
              <input id="consent" name="consent" value="yes" type="checkbox" className="mt-0.5 size-5 shrink-0 appearance-none rounded-control border border-border-strong bg-surface-raised checked:border-brand checked:bg-brand" />
              <span>Desert Peak Insurance may contact me by phone or email about this comparison. I understand this is not an application and no coverage is bound.</span>
            </label>
            {errors.find((e) => e.field === "consent") ? <p id="consent-error" className="font-text text-meta font-semibold text-critical">{errors.find((e) => e.field === "consent")!.message}</p> : null}
          </fieldset>
          <div className="cf-turnstile" data-sitekey={publicEnv.TURNSTILE_SITE_KEY} data-size="flexible" />
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink hover:bg-brand-hover" disabled={pending}>Request my comparison</button>
            <Link href="/quote/3/" className="ui-link font-text text-copy underline">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
