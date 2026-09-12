export type Track = "customer" | "partner";
export const TRACKS: readonly Track[] = ["customer", "partner"];

export type ReferralStatus = "submitted" | "contacted" | "qualified" | "quoted" | "bound" | "closed" | "rejected";
export const REFERRAL_STATUSES: readonly ReferralStatus[] = ["submitted", "contacted", "qualified", "quoted", "bound", "closed", "rejected"];

export type RejectionReason =
  | "self-referral"
  | "duplicate-referee"
  | "disposable-email"
  | "velocity-referrer"
  | "velocity-ip"
  | "bot-check-failed"
  | "consent-not-affirmed"
  | "referee-declined"
  | "referee-no-response"
  | "manual";
export const REJECTION_REASONS: readonly RejectionReason[] = [
  "self-referral", "duplicate-referee", "disposable-email", "velocity-referrer", "velocity-ip", "bot-check-failed", "consent-not-affirmed", "referee-declined", "referee-no-response", "manual",
];

export type RewardType = "gift-card" | "merchandise" | "account-credit" | "none";
export const REWARD_TYPES: readonly RewardType[] = ["gift-card", "merchandise", "account-credit", "none"];

export type LedgerEntryType = "earned" | "issued" | "reversed";

export type RewardRefusal =
  | "tenant-disabled"
  | "program-inactive"
  | "rule-missing"
  | "rule-incomplete"
  | "reward-type-not-allowed"
  | "per-referral-cap-exceeded"
  | "annual-cap-exceeded"
  | "cash-equivalent-not-allowed"
  | "medicare-non-cash-only"
  | "referrer-not-active";

export type Actor = { type: "user"; id: number | string } | { type: "system"; job: string } | { type: "referrer"; id: number | string } | { type: "referee" };

export type SendEmail = (msg: { to: string[] | string; subject: string; text: string; purpose: "referee-opt-in" | "referrer-welcome" }) => Promise<{ sent: boolean; skipped?: string }>;

export type ReferralsPluginOptions = {
  /** Slug of the tenant that public routes resolve to when no tenant is on the request. */
  defaultTenantSlug: string;
  /** Injected so the engine never imports app code; the app owns the Resend fallback. */
  sendEmail: SendEmail;
  /** Absolute site URL for opt-in links. */
  siteUrl: string;
  /** Salt for IP hashing in ReferralEvents and Referrals. */
  hashSalt: string;
  /** First-party attribution cookie window in days. */
  cookieDays: number;
  /** Rich text editor is the host's choice; the plugin only uses textarea. */
};
