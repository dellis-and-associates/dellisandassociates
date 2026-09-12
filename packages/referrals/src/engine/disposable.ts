/** Starter list; a tenant may extend it in configuration. Matching is by exact domain. */
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org", "yopmail.com", "sharklasers.com", "trashmail.com", "getnada.com", "dispostable.com", "throwawaymail.com", "maildrop.cc", "fakeinbox.com", "mailnesia.com", "tempr.email", "discard.email", "spamgourmet.com", "mytemp.email",
]);
export const isDisposableDomain = (domain: string, extra: Iterable<string> = []): boolean => DISPOSABLE_DOMAINS.has(domain) || new Set(extra).has(domain);
