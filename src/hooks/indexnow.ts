/**
 * IndexNow submission (SEO brief, section 4). When a document that backs an
 * indexable route changes in production and INDEXNOW_KEY is set, the route's
 * URL is submitted once. Bing and Yandex honour IndexNow; Google does not, and
 * SEO-PLAYBOOK.md says so. Failures are logged and swallowed: a search-engine
 * ping must never fail an editor's save.
 */
import type { Payload } from "payload";
import { env } from "../env.ts";
import { abs, SITE } from "../lib/seo.ts";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const indexNowKeyPath = (key: string) => `/${key}.txt`;

export async function submitToIndexNow(paths: string[], payload?: Payload): Promise<"skipped" | "sent" | "failed"> {
  const key = env.INDEXNOW_KEY;
  if (!key || env.APP_ENV !== "production" || !paths.length) return "skipped";
  const host = new URL(SITE).host;
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: abs(indexNowKeyPath(key)), urlList: [...new Set(paths)].map(abs) }),
    });
    if (!res.ok) throw new Error(`IndexNow responded ${res.status}`);
    return "sent";
  } catch (e) {
    payload?.logger.warn({ msg: "IndexNow submission failed", error: (e as Error).message });
    return "failed";
  }
}
