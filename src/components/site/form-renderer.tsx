import type { Form } from "../../payload-types.ts";
import { getProducts } from "../../lib/content.ts";
import { publicEnv } from "../../env.public.ts";
import { ClientForm, type FieldDef } from "./client-form.tsx";

/** Resolves a Forms document into plain props for the client form (which owns the action state). */
export async function FormRenderer({ form, page }: { form: Form; page?: string }) {
  const products = (await getProducts()).filter((p) => !p.parent);
  const fields: FieldDef[] = form.fields.map((f) => ({
    name: f.name,
    label: f.label,
    type: f.type,
    required: Boolean(f.required),
    help: f.help ?? undefined,
    placeholder: f.placeholder ?? undefined,
    autocomplete: f.autocomplete ?? undefined,
    inputmode: f.inputmode ?? undefined,
    options: [...(f.options ?? []).map((o) => ({ label: o.label, value: o.value })), ...(f.optionsFromProducts ? products.map((p) => ({ label: p.name, value: p.slug })) : [])],
  }));
  return <ClientForm slug={form.slug} page={page ?? ""} fields={fields} submitLabel={form.submitLabel} siteKey={publicEnv.TURNSTILE_SITE_KEY} />;
}
