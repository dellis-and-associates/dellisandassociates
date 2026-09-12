import { normalizeCode } from "./codes.ts";

export const ATTRIBUTION_COOKIE = "dp_ref";

/** First-touch: set only when no cookie exists. Documented alternative (last-touch) is not shipped. */
export function attributionCookie(code: string, days: number, opts: { secure: boolean }): string {
  const maxAge = Math.max(1, Math.floor(days)) * 86_400;
  return `${ATTRIBUTION_COOKIE}=${encodeURIComponent(code)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${opts.secure ? "; Secure" : ""}`;
}

export function readAttributionCookie(cookieHeader: string | null | undefined): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${ATTRIBUTION_COOKIE}=`));
  return m ? normalizeCode(decodeURIComponent(m.slice(ATTRIBUTION_COOKIE.length + 1))) : undefined;
}

/** In-memory token bucket per key (IP hash). Enough for one instance; a shared store is a Phase 7 concern. */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  private readonly max: number;
  private readonly windowMs: number;
  constructor(max: number, windowMs: number) {
    this.max = max;
    this.windowMs = windowMs;
  }
  allow(key: string, now = Date.now()): boolean {
    const arr = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    if (arr.length >= this.max) {
      this.hits.set(key, arr);
      return false;
    }
    arr.push(now);
    this.hits.set(key, arr);
    return true;
  }
}
