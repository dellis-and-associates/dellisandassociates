/**
 * pnpm test:revalidate — a product edit fans out to dependent routes by tag;
 * a compliance edit changes every footer. The edits go through the running
 * server's REST API as a temporary admin (created and removed through the
 * local API), because revalidateTag only works from inside the Next process
 * where an editor's admin save runs.
 */
import { BASE, fetchPage, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const marker = `Revalidation probe ${Date.now()}.`;
const routes = ["/insurance/auto-insurance/", "/insurance/auto-insurance/arizona/", "/insurance/auto-insurance/arizona/chandler/"];
const settle = async (test: () => Promise<boolean>, ms = 15_000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await test()) return true; await new Promise((r) => setTimeout(r, 500)); } return false; };
await withPayload(async (p) => {
  const email = `revalidate-${Date.now()}@test.local`;
  const password = `pw-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const admin = await p.create({ collection: "users", data: { email, password, roles: ["admin"] }, overrideAccess: true });
  const login = await fetch(`${BASE}/api/users/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
  const token = ((await login.json()) as { token?: string }).token;
  const rest = (path: string, method: string, body: unknown) => fetch(`${BASE}/api${path}`, { method, headers: { "content-type": "application/json", authorization: `JWT ${token}` }, body: JSON.stringify(body) });
  try {
    if (!token) { failures.push("could not log the temporary admin in through /api/users/login"); return; }
    const product = (await p.find({ collection: "products", where: { slug: { equals: "auto-insurance" } }, limit: 1, depth: 0, overrideAccess: true })).docs[0]!;
    const original = product.summary ?? null;
    for (const r of routes) await fetchPage(r); // warm
    const upd = await rest(`/products/${product.id}?depth=0`, "PATCH", { summary: marker });
    if (!upd.ok) failures.push(`product PATCH through REST returned ${upd.status}`);
    for (const r of routes) { const ok = await settle(async () => (await fetchPage(r)).html.includes(marker)); if (ok) notes.push(`${r} shows the edit`); else failures.push(`${r} did not update within 15 s`); }
    await rest(`/products/${product.id}?depth=0`, "PATCH", { summary: original });
    const c = await p.findGlobal({ slug: "compliance-settings", depth: 0, overrideAccess: true });
    const disc = c.independentAgencyDisclosure;
    await rest(`/globals/compliance-settings`, "POST", { independentAgencyDisclosure: `${disc} ${marker}` });
    const ok = await settle(async () => (await fetchPage("/")).html.includes(marker));
    if (ok) notes.push("home footer shows the compliance edit"); else failures.push("home footer did not update within 15 s");
    await rest(`/globals/compliance-settings`, "POST", { independentAgencyDisclosure: disc });
    await settle(async () => !(await fetchPage("/")).html.includes(marker));
  } finally {
    await p.delete({ collection: "users", id: admin.id, overrideAccess: true });
  }
});
report("test:revalidate", failures, notes);
