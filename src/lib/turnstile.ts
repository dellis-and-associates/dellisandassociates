import { env } from "../env.ts";
import { TURNSTILE_TEST_SECRET_KEYS } from "../env.schema.ts";

/**
 * Cloudflare Turnstile server check. With a test secret (local/preview) the
 * verify endpoint always passes. A missing token (JavaScript off) is not a
 * failure: the lead is saved with botCheckPassed = false and flagged for
 * review, because a lost lead costs more than a reviewed one.
 */
export async function verifyTurnstile(token: string | null | undefined, ip?: string): Promise<{ passed: boolean; reason?: string }> {
  if (!token) return { passed: false, reason: "no-token" };
  if (TURNSTILE_TEST_SECRET_KEYS.has(env.TURNSTILE_SECRET_KEY)) return { passed: true };
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token, ...(ip ? { remoteip: ip } : {}) }),
  }).catch(() => null);
  if (!res?.ok) return { passed: false, reason: "verify-unreachable" };
  const body = (await res.json()) as { success: boolean; "error-codes"?: string[] };
  return body.success ? { passed: true } : { passed: false, reason: body["error-codes"]?.join(",") ?? "failed" };
}
