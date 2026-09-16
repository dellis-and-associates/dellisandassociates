import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/src/env";

/**
 * The redirect map, served with the right status codes. Rows come from the
 * Redirects collection through the public REST endpoint (read is public,
 * the payload is tiny) and are cached per instance for ten minutes; a
 * Payload afterChange on Redirects revalidates the page cache, and the
 * instance cache simply ages out. 301s and 410s cannot be produced from a
 * page component, so this is the one piece of edge logic on the site.
 */
type Row = { from: string; to?: string | null; statusCode: "301" | "410" };
let cache: { at: number; rows: Map<string, Row> } | null = null;
let manifest: { at: number; paths: Set<string> } | null = null;
const TTL = 10 * 60_000;
/** Route families that are not in the manifest but are real (dynamic, gated or utility). */
const DYNAMIC = [/^\/quote\//, /^\/r\//, /^\/partners\//, /^\/referrals\//, /^\/search\/$/, /^\/design-system\/$/, /^\/contact\/thanks\/$/, /^\/not-found-page\/$/, /^\/api\//];

async function knownPaths(origin: string): Promise<Set<string> | null> {
  if (manifest && Date.now() - manifest.at < TTL) return manifest.paths;
  try {
    const res = await fetch(`${origin}/api/manifest/`, { headers: { accept: "application/json" }, cache: "no-store" });
    const body = (await res.json()) as { paths?: string[] };
    if (!body.paths?.length) return manifest?.paths ?? null;
    manifest = { at: Date.now(), paths: new Set(body.paths) };
  } catch {
    return manifest?.paths ?? null;
  }
  return manifest.paths;
}

async function rows(origin: string): Promise<Map<string, Row>> {
  if (cache && Date.now() - cache.at < TTL) return cache.rows;
  try {
    const res = await fetch(`${origin}/api/redirects/?limit=500&depth=0`, { headers: { accept: "application/json" }, cache: "no-store" });
    const body = (await res.json()) as { docs?: Row[] };
    cache = { at: Date.now(), rows: new Map((body.docs ?? []).map((r) => [r.from, r])) };
  } catch {
    cache = { at: Date.now() - TTL + 30_000, rows: cache?.rows ?? new Map() };
  }
  return cache.rows;
}

const GONE = new Response("<!doctype html><title>Gone</title><h1>That page is gone</h1><p>It was part of the old site and has no replacement. <a href=\"/\">Home</a></p>", { status: 410, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" } });

export async function proxy(request: NextRequest) {
  // IndexNow ownership file: /{key}.txt containing the key, served from the env value so the key is never committed.
  if (env.INDEXNOW_KEY && request.nextUrl.pathname === `/${env.INDEXNOW_KEY}.txt`)
    return new Response(env.INDEXNOW_KEY, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" } });
  const path = request.nextUrl.pathname.endsWith("/") ? request.nextUrl.pathname : `${request.nextUrl.pathname}/`;
  const map = await rows(request.nextUrl.origin);
  const row = map.get(path.toLowerCase());
  if (row) {
    if (row.statusCode === "410") return GONE.clone();
    if (row.to) return NextResponse.redirect(row.to.startsWith("http") ? row.to : new URL(row.to, request.nextUrl.origin), 301);
  }
  // A path outside the manifest gets the real, server-rendered 404 page with a 404 status, JavaScript or not.
  // (A page component cannot do that: notFound() inside a dynamic segment streams a client-rendered shell.)
  if (request.method === "GET" && !DYNAMIC.some((re) => re.test(path))) {
    const known = await knownPaths(request.nextUrl.origin);
    if (known && !known.has(path)) {
      const page = await fetch(`${request.nextUrl.origin}/not-found-page/`, { headers: { accept: "text/html" } }).catch(() => null);
      if (page?.ok) return new Response(await page.text(), { status: 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    }
  }
  const next = NextResponse.next();
  // Every non-production deployment is noindex at the header level, whatever a page's own robots meta says.
  if (env.APP_ENV !== "production") next.headers.set("X-Robots-Tag", "noindex, nofollow");
  return next;
}

export const config = {
  // Everything except static assets, the admin, and the API itself.
  matcher: ["/((?!_next/|admin|api/|og/|fonts/|brand/|certificates/|favicon|apple-touch-icon|icon-|manifest\\.webmanifest|robots\\.txt|sitemap[a-z-]*\\.xml).*)"],
};
