"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { saveStep, type StepState } from "../../../app/(frontend)/quote/actions.ts";
import type { QuoteData } from "../../lib/quote.ts";
import { STEPS } from "../../lib/quote-steps.ts";
import { ChoiceGroup, ErrorSummary, SelectField, TextArea, TextField } from "../ui/field.tsx";
import { Stepper } from "../ui/misc.tsx";

/**
 * One client component for the three answer steps. It is a plain form with a
 * server action, so it posts without JavaScript; with JavaScript it re-renders
 * in place with the error summary focused. Validation happens on the server
 * on submit (and on blur in the browser through native constraint attributes),
 * never on keystroke.
 */
const COMMON = ["auto-insurance", "home-insurance", "renters-insurance", "life-insurance", "umbrella-insurance", "motorcycle-insurance", "medicare", "general-liability-insurance", "workers-compensation-insurance", "commercial-auto-insurance", "business-owners-policy"];

export function QuoteStepForm({ step, data, products }: { step: number; data: QuoteData; products: { slug: string; name: string; category: string }[] }) {
  const action = saveStep.bind(null, step);
  const [state, formAction, pending] = useActionState<StepState | undefined, FormData>(action, undefined);
  const errors = state?.errors ?? [];
  const err = (f: string) => errors.find((e) => e.field === f)?.message;
  /** After a failed submit React resets the form; the action returns what was typed so nothing is lost. */
  const val = (name: string, initial?: string | null) => state?.values?.[name] ?? initial ?? undefined;
  const chosen = state?.values?.products ? state.values.products.split(",") : (data.products ?? []);
  const meta = STEPS[step - 1]!;
  /**
   * Typed-but-unsubmitted answers survive Back and reload: every change is
   * mirrored to sessionStorage and restored into empty fields on mount. The
   * server session (saved on submit) remains the source of truth; this is
   * progressive enhancement and needs no network.
   */
  const formRef = useRef<HTMLFormElement>(null);
  const draftKey = `dp_quote_draft_${step}`;
  const mirror = () => {
    const form = formRef.current;
    if (!form) return;
    const entries: Record<string, string | string[]> = {};
    for (const [k, v] of new FormData(form).entries()) { if (typeof v !== "string") continue; const prev = entries[k]; entries[k] = prev === undefined ? v : Array.isArray(prev) ? [...prev, v] : [prev, v]; }
    try { sessionStorage.setItem(draftKey, JSON.stringify(entries)); } catch { /* storage unavailable */ }
  };
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    let stored: Record<string, string | string[]> = {};
    try { stored = JSON.parse(sessionStorage.getItem(draftKey) ?? "{}") as typeof stored; } catch { return; }
    for (const [k, v] of Object.entries(stored)) {
      for (const el of form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${k}"]`)) {
        if (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")) el.checked = (Array.isArray(v) ? v : [v]).includes(el.value);
        else if (!el.value) el.value = Array.isArray(v) ? v[0] ?? "" : v;
      }
    }
  }, [draftKey]);
  const wantsAuto = data.products?.includes("auto-insurance") || data.products?.includes("commercial-auto-insurance") || data.products?.includes("motorcycle-insurance");
  const wantsHome = data.products?.includes("home-insurance") || data.products?.includes("renters-insurance") || data.products?.includes("landlord-rental-property-insurance");
  return (
    <div className="mx-auto grid max-w-measure-shell gap-8 px-gutter py-10">
      <div className="grid max-w-measure-body gap-6">
        <h1>Request the analysis</h1>
        <Stepper step={step} total={4} label={meta.label} steps={STEPS.map((s) => s.label)} />
        <form key={state ? `attempt-${errors.length}-${JSON.stringify(state.values ?? "")}` : "initial"} ref={formRef} action={formAction} method="post" className="grid gap-6" noValidate aria-busy={pending || undefined} onChange={mirror}>
          <ErrorSummary errors={errors} />
          {step === 1 ? (
            <>
              <ChoiceGroup id="products" name="products" legend="What should we compare?" type="checkbox" required options={COMMON.map((slug) => products.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)).map((p) => ({ label: p.name, value: p.slug }))} defaultValues={chosen} error={err("products")} help="Tick every line you want looked at. You can add more later." />
              <details className="rounded-surface border border-border" open={chosen.some((s) => !COMMON.includes(s))}>
                <summary className="min-h-11 px-4 py-3 font-text text-copy font-semibold">More lines</summary>
                <div className="px-4 pb-4"><ChoiceGroup id="products-more" name="products" legend="Other lines" type="checkbox" options={products.filter((p) => !COMMON.includes(p.slug)).map((p) => ({ label: p.name, value: p.slug }))} defaultValues={chosen} /></div>
              </details>
              <TextField id="zip" name="zip" label="ZIP code" required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={10} defaultValue={val("zip", data.zip)} error={err("zip")} help="So we compare the carriers that write where you live." />
              <input type="hidden" name="state" value={data.state ?? ""} />
              <input type="hidden" name="city" value={data.city ?? ""} />
            </>
          ) : null}
          {step === 2 ? (
            <>
              <TextField id="name" name="name" label="Your name" required autoComplete="name" defaultValue={val("name", data.name)} error={err("name")} />
              <TextField id="email" name="email" label="Email" type="email" required autoComplete="email" inputMode="email" defaultValue={val("email", data.email)} error={err("email")} help="Where we send the comparison." />
              <TextField id="phone" name="phone" label="Phone" type="tel" required autoComplete="tel" inputMode="tel" defaultValue={val("phone", data.phone)} error={err("phone")} help="For questions about your current policy. We do not cold-call." />
              <TextField id="dob" name="dob" label="Date of birth" type="date" autoComplete="bday" defaultValue={val("dob", data.dob)} error={err("dob")} help="Carriers rate by age. Leave it out and we will ask later." />
              <TextField id="address" name="address" label="Street address" autoComplete="street-address" defaultValue={val("address", data.address)} error={err("address")} help="Only needed for home, renters or auto." />
            </>
          ) : null}
          {step === 3 ? (
            <>
              {wantsAuto ? (
                <fieldset className="grid gap-4">
                  <legend className="font-text text-title-sm">Vehicles</legend>
                  {[0, 1, 2].map((i) => {
                    const v = data.vehicles?.[i];
                    if (i > 0 && !data.vehicles?.[i - 1] && i > (data.vehicles?.length ?? 0)) return null;
                    return (
                      <div key={i} className="grid gap-3 rounded-surface border border-border p-4 sm:grid-cols-3">
                        <TextField id={`vehicle-${i}-year`} name={`vehicle-${i}-year`} label={`Vehicle ${i + 1} year`} inputMode="numeric" pattern="[0-9]{4}" maxLength={4} defaultValue={val(`vehicle-${i}-year`, v?.year)} error={err(`vehicle-${i}-year`)} required={i === 0} optionalLabel={i > 0} />
                        <TextField id={`vehicle-${i}-make`} name={`vehicle-${i}-make`} label="Make" defaultValue={val(`vehicle-${i}-make`, v?.make)} error={err(`vehicle-${i}-make`)} required={i === 0} optionalLabel={i > 0} />
                        <TextField id={`vehicle-${i}-model`} name={`vehicle-${i}-model`} label="Model" defaultValue={val(`vehicle-${i}-model`, v?.model)} required={i === 0} optionalLabel={i > 0} />
                      </div>
                    );
                  })}
                  <p className="font-text text-copy text-ink-muted">Up to three here; more on the call.</p>
                </fieldset>
              ) : null}
              {wantsHome ? (
                <fieldset className="grid gap-4">
                  <legend className="font-text text-title-sm">The property</legend>
                  <TextField id="property-yearBuilt" name="property-yearBuilt" label="Year built" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} defaultValue={val("property-yearBuilt", data.property?.yearBuilt)} error={err("property-yearBuilt")} />
                  <SelectField id="property-roof" name="property-roof" label="Roof" options={[{ label: "Asphalt shingle", value: "shingle" }, { label: "Tile", value: "tile" }, { label: "Metal", value: "metal" }, { label: "Flat or foam", value: "flat" }, { label: "Not sure", value: "unknown" }]} placeholder="Choose one" defaultValue={val("property-roof", data.property?.roof)} />
                  <SelectField id="property-ownership" name="property-ownership" label="You are the" options={[{ label: "Owner, living there", value: "owner" }, { label: "Renter", value: "renter" }, { label: "Landlord", value: "landlord" }]} placeholder="Choose one" defaultValue={val("property-ownership", data.property?.ownership)} />
                </fieldset>
              ) : null}
              {!wantsAuto && !wantsHome ? <p className="max-w-measure-body font-text text-copy text-ink-muted">Nothing more is needed for the lines you chose. Add anything you want us to know, then check and send.</p> : null}
              <TextArea id="notes" name="notes" label="Anything else we should know?" defaultValue={val("notes", data.notes)} help="Current carrier, renewal date, a claim you are worried about." />
            </>
          ) : null}
          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex min-h-11 items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink hover:bg-brand-hover" disabled={pending}>{step < 3 ? "Continue" : "Check and send"}</button>
            {step > 1 ? <Link href={`/quote/${step - 1}/`} className="ui-link font-text text-copy underline">Back</Link> : null}
            <span className="font-text text-meta text-ink-muted">Saved as you go. Come back any time this week.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
