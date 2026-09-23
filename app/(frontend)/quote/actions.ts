"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hashIp, readAttributionCookie } from "@desert-peak/referrals/engine";
import { env } from "@/src/env";
import { db, getProducts } from "@/src/lib/content";
import { clearSession, loadSession, saveSession, validateStep, type QuoteData } from "@/src/lib/quote";
import { verifyTurnstile } from "@/src/lib/turnstile";
import type { FieldError } from "@/src/lib/validate";

export type StepState = { errors: FieldError[]; values?: Record<string, string> };

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function saveStep(step: number, _prev: StepState | undefined, fd: FormData): Promise<StepState> {
  const patch: Partial<QuoteData> = {};
  if (step === 1) Object.assign(patch, { products: fd.getAll("products").map(String), zip: str(fd, "zip"), state: str(fd, "state") || undefined, city: str(fd, "city") || undefined });
  if (step === 2) Object.assign(patch, { name: str(fd, "name"), email: str(fd, "email"), phone: str(fd, "phone"), dob: str(fd, "dob") || undefined, address: str(fd, "address") || undefined });
  if (step === 3) {
    const vehicles = [0, 1, 2].map((i) => ({ year: str(fd, `vehicle-${i}-year`), make: str(fd, `vehicle-${i}-make`), model: str(fd, `vehicle-${i}-model`), vin: str(fd, `vehicle-${i}-vin`).toUpperCase() })).filter((v) => v.year || v.make || v.model || v.vin);
    Object.assign(patch, { vehicles, property: { yearBuilt: str(fd, "property-yearBuilt") || undefined, roof: str(fd, "property-roof") || undefined, ownership: str(fd, "property-ownership") || undefined }, notes: str(fd, "notes") || undefined });
  }
  const merged = { ...(await loadSession()).data, ...patch };
  const errors = validateStep(step, merged);
  // Save even when invalid: nothing typed is ever lost.
  await saveSession(patch, step);
  if (errors.length) {
    const values: Record<string, string> = {};
    for (const [k, v] of fd.entries()) if (typeof v === "string") values[k] = values[k] ? `${values[k]},${v}` : v;
    return { errors, values };
  }
  redirect(step < 3 ? `/quote/${step + 1}/` : "/quote/summary/");
}

export async function submitQuote(_prev: StepState | undefined, fd: FormData): Promise<StepState> {
  const consent = fd.get("consent") === "yes";
  const session = await loadSession();
  const data = { ...session.data, consent };
  const errors = [1, 2, 3, 4].flatMap((s) => validateStep(s, data));
  if (errors.length) return { errors };
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const bot = await verifyTurnstile(String(fd.get("cf-turnstile-response") ?? ""), ip);
  const products = await getProducts();
  const payload = await db();
  const { consent: _c, ...answers } = data;
  const lead = await payload.create({
    collection: "leads",
    data: {
      type: "quote",
      status: "new",
      contact: { name: data.name, email: data.email, phone: data.phone },
      interest: products.filter((p) => data.products?.includes(p.slug)).map((p) => p.id),
      data: { ...answers, botCheck: bot, consentAt: new Date().toISOString() },
      source: { page: "/quote/", referralCode: readAttributionCookie(h.get("cookie")), ipHash: ip ? hashIp(ip, env.REFERRAL_HASH_SALT) : undefined, userAgent: h.get("user-agent")?.slice(0, 200) ?? undefined },
      notes: bot.passed ? undefined : `Bot check not passed (${bot.reason}). Review before contacting.`,
    },
    overrideAccess: true,
    depth: 0,
  });
  await clearSession();
  redirect(`/quote/done/?ref=${encodeURIComponent(lead.reference ?? "")}`);
}
