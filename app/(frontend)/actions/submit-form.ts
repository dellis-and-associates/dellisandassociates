"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hashIp } from "@desert-peak/referrals/engine";
import { readAttributionCookie } from "@desert-peak/referrals/engine";
import { env } from "@/src/env";
import { db, getForm, getProducts } from "@/src/lib/content";
import { verifyTurnstile } from "@/src/lib/turnstile";
import { validateField, type FieldError } from "@/src/lib/validate";

export type FormState = { errors: FieldError[]; values: Record<string, string> };

/**
 * One handler for every Forms document. Validates, verifies Turnstile, saves
 * a Lead through the local API (the only create path), then redirects to the
 * confirmation with a reference. Never logs field contents. Works as a plain
 * POST with JavaScript off: the action re-renders the page with the values
 * and errors, so nothing typed is lost.
 */
export async function submitForm(slug: string, page: string, _prev: FormState | undefined, data: FormData): Promise<FormState> {
  const form = await getForm(slug);
  if (!form) return { errors: [{ field: "form", message: "This form is no longer available." }], values: {} };
  const values: Record<string, string> = {};
  const errors: FieldError[] = [];
  for (const f of form.fields) {
    const raw = f.type === "checkbox-group" ? data.getAll(f.name).map(String).join(",") : String(data.get(f.name) ?? "");
    values[f.name] = raw;
    const e = validateField({ name: f.name, label: f.label, type: f.type, required: f.required }, raw);
    if (e) errors.push(e);
  }
  if (errors.length) return { errors, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const bot = await verifyTurnstile(String(data.get("cf-turnstile-response") ?? ""), ip);
  const products = await getProducts();
  const interestSlugs = [values.interest, ...(values.interested ?? "").split(",")].filter(Boolean);
  const interest = products.filter((p) => interestSlugs.includes(p.slug)).map((p) => p.id);
  const contact = { name: values.name || undefined, email: values.email || undefined, phone: values.phone || undefined };
  const pii: Record<string, string> = {};
  for (const f of form.fields) if (values[f.name]) pii[f.name] = values[f.name]!;

  const payload = await db();
  const lead = await payload.create({
    collection: "leads",
    data: {
      form: form.id,
      type: form.leadType,
      status: "new",
      contact,
      interest,
      data: { ...pii, botCheck: bot },
      containsHealthInformation: form.collectsHealthInformation ?? false,
      source: { page: page || undefined, referralCode: readAttributionCookie(h.get("cookie")), ipHash: ip ? hashIp(ip, env.REFERRAL_HASH_SALT) : undefined, userAgent: h.get("user-agent")?.slice(0, 200) ?? undefined },
      notes: bot.passed ? undefined : `Bot check not passed (${bot.reason}). Review before contacting.`,
    },
    overrideAccess: true,
    depth: 0,
  });
  redirect(`/contact/thanks/?ref=${encodeURIComponent(lead.reference ?? "")}`);
}
