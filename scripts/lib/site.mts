/** Shared helpers for the site-level verifiers: manifest from the database, fetching, HTML text extraction. */
import { validateEnv } from "../../src/env.schema.ts";
import { buildManifest, type RouteEntry } from "../../src/lib/routes.ts";

export const BASE = process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "http://localhost:3000";
export const env = validateEnv(process.env).env;

export async function withPayload<T>(fn: (payload: import("payload").Payload) => Promise<T>): Promise<T> {
  const { getPayload } = await import("payload");
  const config = (await import("../../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  try {
    return await fn(payload);
  } finally {
    await payload.db.destroy?.();
  }
}

export async function loadManifest(payload: import("payload").Payload): Promise<RouteEntry[]> {
  const all = async (collection: string) => (await payload.find({ collection: collection as never, limit: 0, pagination: false, depth: 0, overrideAccess: true })).docs as Record<string, unknown>[];
  const [products, states, cities, pages, articles, glossary] = await Promise.all(["products", "states", "cities", "pages", "articles", "glossary-terms"].map(all));
  const stateMap = states.map((s) => ({ slug: String(s.slug), cities: cities.filter((c) => (typeof c.state === "object" && c.state ? (c.state as { id: unknown }).id : c.state) === s.id).map((c) => ({ slug: String(c.slug), factsComplete: typeof c.factsComplete === "number" ? c.factsComplete : null })) }));
  return buildManifest({ products: products as never, states: stateMap as never, pages: pages as never, articles: articles as never, glossary: glossary as never });
}

export async function fetchPage(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual", ...init });
  const html = await res.text();
  return { status: res.status, location: res.headers.get("location"), html };
}

export const strip = (html: string) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
export const main = (html: string) => { const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/); return m ? m[1]! : html; };
export const between = (html: string, open: RegExp) => { const m = html.match(open); return m ? m[0] : ""; };
const decode = (t: string) => t.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
export const attr = (html: string, re: RegExp) => { const m = html.match(re)?.[1]; return m === undefined ? null : decode(m); };
export const links = (html: string) => [...html.matchAll(/<a\s[^>]*href=["']([^"'#?]+)[^"']*["']/g)].map((m) => m[1]!).filter((h) => h.startsWith("/"));
export const jsonLdBlocks = (html: string) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]!) as Record<string, unknown>; } catch { return null; } });

/** Bounded-concurrency map. */
export async function pmap<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]!); } }));
  return out;
}

export function report(name: string, failures: string[], notes: string[] = []) {
  for (const n of notes) console.log(`ok   ${n}`);
  for (const f of failures) console.error(`FAIL ${f}`);
  console.log(failures.length ? `\n${name} failed (${failures.length})` : `\n${name} passed`);
  process.exit(failures.length ? 1 : 0);
}
