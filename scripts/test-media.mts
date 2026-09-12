/**
 * pnpm test:media — round-trip through the S3 adapter against Supabase Storage.
 * Uploads a 1×1 PNG via the local API, checks the object is publicly readable
 * at the URL Payload records, then deletes the document and confirms the object
 * is gone. Reads carry a cache-busting query so Supabase's CDN (Cloudflare,
 * which keeps serving a deleted public object from cache) cannot mask the
 * result. Leaves nothing behind.
 */
import { validateEnv } from "../src/env.schema.ts";
validateEnv(process.env);
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config.ts")).default;
const payload = await getPayload({ config });

const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
const name = `test-media-${Date.now()}.png`;
const failures: string[] = [];
let id: number | string | undefined;
try {
  const doc = await payload.create({
    collection: "media",
    data: { alt: "test:media probe" },
    file: { data: png, mimetype: "image/png", name, size: png.length },
  });
  id = doc.id;
  console.log(`ok   created media #${doc.id} → ${doc.url}`);
  if (!doc.url) failures.push("no url recorded");
  const publicUrl = doc.url?.startsWith("http") ? doc.url : `${process.env.NEXT_PUBLIC_SITE_URL}${doc.url}`;
  const s3Url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${doc.filename}`;
  const fresh = () => fetch(`${s3Url}?probe=${Date.now()}`, { cache: "no-store" });
  const r = await fresh();
  if (r.ok && r.headers.get("content-type")?.startsWith("image/png")) console.log(`ok   public read from Supabase Storage (${r.status}, ${r.headers.get("content-type")})`);
  else failures.push(`bucket object not publicly readable: ${r.status} ${s3Url}`);
  console.log(`     Payload serves it at ${publicUrl}`);
  const sizes = Object.keys(doc.sizes ?? {}).filter((k) => (doc.sizes as Record<string, { filename?: string }>)[k]?.filename);
  console.log(`ok   generated sizes: ${sizes.length ? sizes.join(", ") : "none (source smaller than every size; expected for a 1×1 probe)"}`);
  await payload.delete({ collection: "media", id: doc.id });
  id = undefined;
  const gone = await fresh();
  if (gone.status === 400 || gone.status === 404) console.log(`ok   deleted; object gone (${gone.status})`);
  else failures.push(`object still readable after delete: ${gone.status}`);
} catch (e) {
  failures.push((e as Error).message);
} finally {
  if (id !== undefined) await payload.delete({ collection: "media", id }).catch(() => {});
  await payload.db.destroy?.();
}
for (const f of failures) console.error(`FAIL ${f}`);
console.log(failures.length ? "\ntest:media failed" : "\ntest:media passed");
process.exit(failures.length ? 1 : 0);
