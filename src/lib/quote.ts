/**
 * The quote flow model: four steps, each asking only what the next step
 * needs, never twice. Persisted server-side in quote-sessions keyed by an
 * httpOnly cookie, so a reload, a back navigation or a dropped connection
 * loses nothing. Every string here is reviewed against a grade-8 target.
 */
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "../env.ts";
import { db } from "./content.ts";
import { isDate, isEmail, isPhone, isVin, isYear, isZip, type FieldError } from "./validate.ts";

export const COOKIE = "dp_quote";
export const STEPS = [
  { n: 1, slug: "coverage", label: "What to compare" },
  { n: 2, slug: "about-you", label: "About you" },
  { n: 3, slug: "details", label: "Details" },
  { n: 4, slug: "summary", label: "Check and send" },
] as const;

export type QuoteData = {
  products?: string[];
  zip?: string;
  state?: string;
  city?: string;
  name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  address?: string;
  vehicles?: { year: string; make: string; model: string; vin: string }[];
  property?: { yearBuilt?: string; roof?: string; ownership?: string };
  notes?: string;
  consent?: boolean;
  ref?: string;
};

const DAYS = 7;

export async function loadSession(): Promise<{ token: string | null; data: QuoteData; step: number }> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value ?? null;
  if (!token) return { token: null, data: {}, step: 1 };
  const payload = await db();
  const doc = (await payload.find({ collection: "quote-sessions", where: { and: [{ token: { equals: token } }, { expiresAt: { greater_than: new Date().toISOString() } }] }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (!doc) return { token: null, data: {}, step: 1 };
  return { token, data: (doc.data as QuoteData) ?? {}, step: doc.step };
}

export async function saveSession(patch: Partial<QuoteData>, step: number): Promise<QuoteData> {
  const current = await loadSession();
  const data = { ...current.data, ...patch };
  const payload = await db();
  const expiresAt = new Date(Date.now() + DAYS * 86_400_000).toISOString();
  let token = current.token;
  if (token) {
    const existing = (await payload.find({ collection: "quote-sessions", where: { token: { equals: token } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
    if (existing) await payload.db.updateOne({ collection: "quote-sessions", id: existing.id, data: { data, step, expiresAt } });
    else token = null;
  }
  if (!token) {
    token = randomBytes(24).toString("hex");
    await payload.db.create({ collection: "quote-sessions", data: { token, data, step, expiresAt } });
  }
  const jar = await cookies();
  jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: env.NEXT_PUBLIC_SITE_URL.startsWith("https://"), path: "/quote", maxAge: DAYS * 86_400 });
  return data;
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function validateStep(step: number, d: QuoteData): FieldError[] {
  const e: FieldError[] = [];
  if (step === 1) {
    if (!d.products?.length) e.push({ field: "products", message: "Choose at least one line to compare." });
    if (!d.zip || !isZip(d.zip)) e.push({ field: "zip", message: "Enter a five-digit ZIP code." });
  }
  if (step === 2) {
    if (!d.name?.trim()) e.push({ field: "name", message: "Enter your name." });
    if (!d.email || !isEmail(d.email)) e.push({ field: "email", message: "Enter an email address like name@example.com." });
    if (!d.phone || !isPhone(d.phone)) e.push({ field: "phone", message: "Enter a phone number with at least 10 digits." });
    if (d.dob && !isDate(d.dob)) e.push({ field: "dob", message: "Enter your date of birth as a date." });
  }
  if (step === 3) {
    if (d.products?.includes("auto-insurance")) {
      const v = d.vehicles ?? [];
      if (!v.length || !v[0]?.make?.trim()) e.push({ field: "vehicle-0-make", message: "Enter the make of your first vehicle." });
      v.forEach((x, i) => {
        if (x.year && !isYear(x.year)) e.push({ field: `vehicle-${i}-year`, message: `Enter a four-digit year for vehicle ${i + 1}.` });
        // The VIN is required for every vehicle entered: it is what a carrier rates on, not the make and model.
        if (!x.vin?.trim()) e.push({ field: `vehicle-${i}-vin`, message: `Enter the 17-character VIN for vehicle ${i + 1}.` });
        else if (!isVin(x.vin)) e.push({ field: `vehicle-${i}-vin`, message: `A VIN is 17 letters and digits, with no I, O or Q. Check vehicle ${i + 1}.` });
      });
    }
    if (d.products?.includes("home-insurance") && d.property?.yearBuilt && !isYear(d.property.yearBuilt)) e.push({ field: "property-yearBuilt", message: "Enter a four-digit year the home was built." });
  }
  if (step === 4 && !d.consent) e.push({ field: "consent", message: "Tick the box to confirm we may contact you about this comparison." });
  return e;
}
