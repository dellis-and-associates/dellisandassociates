import type { RejectionReason } from "../types.ts";
import { isDisposableDomain } from "./disposable.ts";
import { emailDomain, normalizeEmail, normalizePhone } from "./normalize.ts";

export type ScreenInput = {
  referrer: { emailNormalized?: string | null; phoneNormalized?: string | null; addressNormalized?: string | null };
  referee: { email?: string | null; phone?: string | null; address?: string | null };
  referrerAffirmedPermission: boolean;
  botCheckPassed: boolean;
  /** Existing referee keys (normalized email/phone) already referred within the dedupe window, any referrer, same tenant. */
  existingRefereeKeys: Set<string>;
  referralsByReferrerLast24h: number;
  referralsByIpLastHour: number;
  limits?: { perReferrerPerDay?: number; perIpPerHour?: number; extraDisposableDomains?: Iterable<string> };
};

export type ScreenResult = { ok: true; keys: { emailNormalized?: string; phoneNormalized?: string } } | { ok: false; reason: RejectionReason; flags: Partial<Record<"selfReferral" | "duplicateReferee" | "disposableEmail" | "velocity", boolean>> };

export const DEFAULT_LIMITS = { perReferrerPerDay: 10, perIpPerHour: 20 };

/** Order matters: the cheapest, most certain rejections first. Every path returns a reason code. */
export function screen(input: ScreenInput): ScreenResult {
  const limits = { ...DEFAULT_LIMITS, ...input.limits };
  if (!input.referrerAffirmedPermission) return { ok: false, reason: "consent-not-affirmed", flags: {} };
  if (!input.botCheckPassed) return { ok: false, reason: "bot-check-failed", flags: {} };
  const emailNormalized = input.referee.email ? normalizeEmail(input.referee.email) : undefined;
  const phoneNormalized = input.referee.phone ? normalizePhone(input.referee.phone) : undefined;
  if (input.referee.email && isDisposableDomain(emailDomain(input.referee.email), limits.extraDisposableDomains)) return { ok: false, reason: "disposable-email", flags: { disposableEmail: true } };
  const self =
    (emailNormalized && input.referrer.emailNormalized && emailNormalized === input.referrer.emailNormalized) ||
    (phoneNormalized && input.referrer.phoneNormalized && phoneNormalized === input.referrer.phoneNormalized) ||
    (input.referee.address && input.referrer.addressNormalized && input.referrer.addressNormalized === input.referee.address);
  if (self) return { ok: false, reason: "self-referral", flags: { selfReferral: true } };
  if ((emailNormalized && input.existingRefereeKeys.has(`email:${emailNormalized}`)) || (phoneNormalized && input.existingRefereeKeys.has(`phone:${phoneNormalized}`)))
    return { ok: false, reason: "duplicate-referee", flags: { duplicateReferee: true } };
  if (input.referralsByReferrerLast24h >= limits.perReferrerPerDay) return { ok: false, reason: "velocity-referrer", flags: { velocity: true } };
  if (input.referralsByIpLastHour >= limits.perIpPerHour) return { ok: false, reason: "velocity-ip", flags: { velocity: true } };
  return { ok: true, keys: { emailNormalized, phoneNormalized } };
}
