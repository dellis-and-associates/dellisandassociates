import { env } from "../env.ts";

export type EmailPurpose = "lead-notification" | "referee-opt-in" | "referrer-welcome" | "test";
export type SendResult = { sent: boolean; skipped?: "no-api-key" | "no-recipient"; id?: string };

/**
 * The one transactional channel (Resend, plain HTTP, no SDK). The documented
 * fallback is preserved: with no API key the message is logged and skipped,
 * never thrown — a missing key must not lose a lead. Bodies passed here must
 * already be PII-free; this function logs recipient count and purpose only.
 */
export async function sendEmail(msg: { to: string[] | string; subject: string; text: string; purpose: EmailPurpose }): Promise<SendResult> {
  const to = (Array.isArray(msg.to) ? msg.to : [msg.to]).filter(Boolean);
  if (to.length === 0 && env.OWNER_EMAIL) to.push(env.OWNER_EMAIL);
  if (to.length === 0) return { sent: false, skipped: "no-recipient" };
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.warn(`[email] skipped (${msg.purpose}): no RESEND_API_KEY/EMAIL_FROM; ${to.length} recipient(s), subject "${msg.subject}"`);
    return { sent: false, skipped: "no-api-key" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.EMAIL_FROM, to, subject: msg.subject, text: msg.text }),
  });
  if (!res.ok) {
    console.error(`[email] send failed (${msg.purpose}): HTTP ${res.status}`);
    return { sent: false };
  }
  const body = (await res.json().catch(() => ({}))) as { id?: string };
  return { sent: true, id: body.id };
}
