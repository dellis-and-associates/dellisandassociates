import { readAttributionCookie, attributionCookie } from "@desert-peak/referrals/engine";
import { ReferralEngine } from "@desert-peak/referrals";
import config from "@payload-config";
import { getPayload } from "payload";
import { env } from "@/src/env";

export const dynamic = "force-dynamic";

/**
 * /r/{code}: first-touch attribution. Sets the first-party cookie only when
 * none exists, then passes through to the quote flow with the code prefilled.
 * Unknown or rate-limited codes still land on the quote page, without a cookie.
 */
export async function GET(request: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const payload = await getPayload({ config });
  const engine = new ReferralEngine(payload);
  const tenant = (await payload.find({ collection: "tenants", where: { slug: { equals: env.DEFAULT_TENANT_ID } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  const hit = tenant ? await engine.lookupCode(tenant.id, code, ip) : null;
  const existing = readAttributionCookie(request.headers.get("cookie"));
  const url = new URL("/quote/", env.NEXT_PUBLIC_SITE_URL);
  const headers = new Headers({ Location: url.toString(), "Cache-Control": "no-store" });
  if (hit) {
    url.searchParams.set("ref", code.toUpperCase());
    headers.set("Location", url.toString());
    if (!existing) headers.append("Set-Cookie", attributionCookie(code.toUpperCase(), Number(env.REFERRAL_COOKIE_DAYS), { secure: env.NEXT_PUBLIC_SITE_URL.startsWith("https://") }));
  }
  return new Response(null, { status: 302, headers });
}
