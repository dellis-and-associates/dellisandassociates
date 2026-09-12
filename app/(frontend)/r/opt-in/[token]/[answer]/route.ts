import { ReferralEngine } from "@desert-peak/referrals";
import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

/** The referee's answer to the one opt-in message. Phase 5 replaces the plain text with the designed confirmation page. */
export async function GET(request: Request, ctx: { params: Promise<{ token: string; answer: string }> }) {
  const { token, answer } = await ctx.params;
  if (answer !== "accept" && answer !== "decline") return new Response("Not found", { status: 404 });
  const payload = await getPayload({ config });
  const engine = new ReferralEngine(payload);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;
  try {
    await engine.respondOptIn(token, answer === "accept", ip);
  } catch {
    return new Response("This link is no longer valid.", { status: 410, headers: { "Content-Type": "text/plain" } });
  }
  return new Response(answer === "accept" ? "Thank you. Someone from the agency will be in touch." : "Understood. You will not hear from us about this.", { status: 200, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" } });
}
