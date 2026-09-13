import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

const METRICS = new Set(["CLS", "INP", "LCP", "TTFB", "FCP"]);
const bucket = new Map<string, number[]>();

/**
 * Our own RUM endpoint. Accepts one web-vitals sample per POST, stores the
 * metric, value, rating, path and a coarse UA. No IP, no cookie, no ids
 * beyond the metric's own. Rate-limited per process.
 */
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  const now = Date.now();
  const hits = (bucket.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (hits.length > 60) return new Response(null, { status: 429 });
  hits.push(now);
  bucket.set(ip, hits);
  let body: { name?: string; value?: number; rating?: string; path?: string; nav?: string; ua?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!body.name || !METRICS.has(body.name) || typeof body.value !== "number" || !body.path) return new Response(null, { status: 400 });
  const payload = await getPayload({ config });
  await payload.create({
    collection: "rum-samples",
    data: { metric: body.name as "CLS", value: Math.round(body.value * 1000) / 1000, rating: ["good", "needs-improvement", "poor"].includes(body.rating ?? "") ? (body.rating as "good") : "good", path: body.path.slice(0, 200), navigationType: body.nav?.slice(0, 40), device: /Mobi|Android/i.test(body.ua ?? "") ? "mobile" : "desktop" },
    overrideAccess: true,
    depth: 0,
  });
  return new Response(null, { status: 204 });
}
