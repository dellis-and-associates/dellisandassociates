"use client";
import { useActionState } from "react";
import { submitForm, type FormState } from "../../../app/(frontend)/actions/submit-form.ts";
import { ChoiceGroup, ErrorSummary, SelectField, TextArea, TextField } from "../ui/field.tsx";

export type FieldDef = { name: string; label: string; type: string; required: boolean; help?: string; placeholder?: string; autocomplete?: string; inputmode?: string; options: { label: string; value: string }[] };

/**
 * A plain HTML form posting to a server action. Without JavaScript it is a
 * native POST that re-renders with values and errors; with JavaScript the
 * same happens in place. Turnstile adds a token when it can; without one the
 * lead is still saved and flagged.
 */
export function ClientForm({ slug, page, fields, submitLabel, siteKey }: { slug: string; page: string; fields: FieldDef[]; submitLabel: string; siteKey: string }) {
  const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(submitForm.bind(null, slug, page), undefined);
  const errors = state?.errors ?? [];
  const values = state?.values ?? {};
  const errorFor = (name: string) => errors.find((e) => e.field === name)?.message;
  return (
    <form key={state ? `attempt-${errors.length}-${JSON.stringify(values)}` : "initial"} action={formAction} method="post" className="grid max-w-measure-body gap-6" noValidate aria-busy={pending || undefined} data-form={slug}>
      <ErrorSummary errors={errors} />
      {fields.map((f) => {
        const common = { id: f.name, name: f.name, label: f.label, help: f.help, required: f.required, error: errorFor(f.name), autoComplete: f.autocomplete, inputMode: f.inputmode as "tel" | "email" | "numeric" | "text" | undefined, defaultValue: values[f.name], placeholder: f.placeholder };
        if (f.type === "textarea") return <TextArea key={f.name} {...common} />;
        if (f.type === "select") return <SelectField key={f.name} {...common} options={f.options} placeholder="Choose one" />;
        if (f.type === "checkbox-group") return <ChoiceGroup key={f.name} id={f.name} name={f.name} legend={f.label} type="checkbox" options={f.options} help={f.help} error={errorFor(f.name)} required={f.required} defaultValues={(values[f.name] ?? "").split(",").filter(Boolean)} />;
        if (f.type === "checkbox") return <ChoiceGroup key={f.name} id={f.name} name={f.name} legend={f.label} type="checkbox" options={[{ label: f.help ?? f.label, value: "yes" }]} required={f.required} error={errorFor(f.name)} />;
        if (f.type === "hidden") return <input key={f.name} type="hidden" name={f.name} value={values[f.name] ?? ""} />;
        return <TextField key={f.name} {...common} type={f.type === "address" ? "text" : f.type} />;
      })}
      <div className="cf-turnstile" data-sitekey={siteKey} data-size="flexible" />
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <p className="font-text text-meta text-ink-muted">Desert Peak Insurance is an independent agency, not an insurer. No coverage is bound by this form. We use what you send only to prepare your comparison.</p>
      <button className="inline-flex min-h-11 w-fit items-center rounded-control bg-brand px-5 font-text text-copy font-semibold text-brand-ink hover:bg-brand-hover" disabled={pending}>{submitLabel}</button>
    </form>
  );
}
