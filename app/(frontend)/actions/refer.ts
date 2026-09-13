"use server";
import { headers } from "next/headers";
import { ReferralEngine } from "@desert-peak/referrals";
import { env } from "@/src/env";
import { currentUser, customerEmail } from "@/src/lib/auth";
import { db, getProducts } from "@/src/lib/content";
import { verifyTurnstile } from "@/src/lib/turnstile";
import { isEmail, isPhone, type FieldError } from "@/src/lib/validate";

export type ReferState = { errors: FieldError[]; done?: "submitted" | "rejected"; reason?: string; firstName?: string };

/** Both portals post here. The signed-in referrer is resolved server-side; the form never names a referrer id. */
export async function submitReferral(track: "customer" | "partner", _prev: ReferState | undefined, fd: FormData): Promise<ReferState> {
  const payload = await db();
  let referrer;
  if (track === "partner") {
    const user = await currentUser();
    if (!user) return { errors: [{ field: "affirm", message: "Sign in again to send a referral." }] };
    referrer = (await payload.find({ collection: "referrers", where: { user: { equals: user.id } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  } else {
    const email = await customerEmail();
    if (!email) return { errors: [{ field: "affirm", message: "Sign in again to send a referral." }] };
    referrer = (await payload.find({ collection: "referrers", where: { and: [{ track: { equals: "customer" } }, { email: { equals: email } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  }
  if (!referrer) return { errors: [{ field: "affirm", message: "Your referrer profile is not set up yet. Contact the office." }] };
  const v = (k: string) => String(fd.get(k) ?? "").trim();
  const errors: FieldError[] = [];
  if (!v("firstName")) errors.push({ field: "firstName", message: "Enter their first name." });
  if (!isEmail(v("email"))) errors.push({ field: "email", message: "Enter their email address like name@example.com." });
  if (v("phone") && !isPhone(v("phone"))) errors.push({ field: "phone", message: "Enter a phone number with at least 10 digits, or leave it blank." });
  if (!v("stateAbbr")) errors.push({ field: "stateAbbr", message: "Choose their state." });
  if (fd.get("affirm") !== "yes") errors.push({ field: "affirm", message: "Tick the box to confirm you have their permission." });
  if (errors.length) return { errors };
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const bot = await verifyTurnstile(String(fd.get("cf-turnstile-response") ?? ""), ip);
  const products = await getProducts();
  const slugs = fd.getAll("interest").map(String);
  const program = (await payload.find({ collection: "referral-programs", where: { and: [{ tenant: { equals: referrer.tenant } }, { track: { equals: track } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (!program) return { errors: [{ field: "affirm", message: "The referral program is not configured yet." }] };
  const engine = new ReferralEngine(payload);
  const r = await engine.createReferral({
    tenantId: typeof referrer.tenant === "object" ? referrer.tenant.id : referrer.tenant,
    programId: program.id,
    referrerId: referrer.id,
    referee: { firstName: v("firstName"), lastName: v("lastName") || undefined, email: v("email"), phone: v("phone") || undefined, stateAbbr: v("stateAbbr") },
    interestProductIds: products.filter((p) => slugs.includes(p.slug)).map((p) => p.id),
    source: "portal",
    attribution: { landingPage: track === "partner" ? "/partners/portal/refer/" : "/referrals/refer/", firstTouchAt: new Date().toISOString() },
    referrerAffirmedPermission: true,
    botCheckPassed: bot.passed,
    ip,
    actor: { type: "referrer", id: referrer.id },
  });
  void env;
  return r.status === "rejected" ? { errors: [], done: "rejected", reason: r.rejectionReason, firstName: v("firstName") } : { errors: [], done: "submitted", firstName: v("firstName") };
}
