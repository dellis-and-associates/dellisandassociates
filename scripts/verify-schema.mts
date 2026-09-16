/**
 * pnpm verify:schema — every JSON-LD block on every template family: valid
 * JSON, a known @type, required fields present, absolute URLs, and markup only
 * for things the page actually shows (SEO brief, section 5). No ratings without
 * reviews, no Person before real people exist, no FAQPage without a visible FAQ.
 */
import { attr, fetchPage, jsonLdBlocks, loadManifest, main, pmap, report, strip, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
const REQUIRED: Record<string, string[]> = {
  InsuranceAgency: ["name", "url"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  Service: ["serviceType", "provider", "url"],
  FAQPage: ["mainEntity"],
  Article: ["headline", "url", "datePublished", "publisher"],
  DefinedTerm: ["name", "url", "inDefinedTermSet"],
  Person: ["name", "url"],
  LocalBusiness: ["name", "url"],
};
const ABSOLUTE_FIELDS = ["url", "item", "logo", "target"];
const FORBIDDEN = ["aggregateRating", "review", "ratingValue", "priceRange", "offers"];

/** One representative route per group, plus the homepage: the markup is generated per family. */
const byGroup = new Map<string, string>();
for (const r of manifest) if (!byGroup.has(r.group)) byGroup.set(r.group, r.path);
const sample = ["/", ...byGroup.values()].filter((v, i, a) => a.indexOf(v) === i);

/** Entities, curly quotes and collapsed whitespace differ between JSON-LD and rendered HTML; compare the words. */
const plain = (s: string) => s.replace(/&(amp|#x27|#39|rsquo|lsquo|quot|nbsp);/g, " ").replace(/[\u2018\u2019\u201c\u201d]/g, " ").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
const absoluteOk = (v: unknown): boolean => typeof v !== "string" || !/^\/(?!\/)/.test(v);
function walk(node: unknown, path: string, where: string) {
  if (Array.isArray(node)) return node.forEach((n) => walk(n, path, where));
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    if (FORBIDDEN.includes(k)) failures.push(`${where}: ${path} contains "${k}" — markup for something the page does not show`);
    if (ABSOLUTE_FIELDS.includes(k) && !absoluteOk(v)) failures.push(`${where}: ${path}.${k} is a relative URL (${String(v)})`);
    walk(v, `${path}.${k}`, where);
  }
}

let checked = 0, blocks = 0;
await pmap(sample, 6, async (path) => {
  const { status, html } = await fetchPage(path);
  if (status !== 200) { failures.push(`${path}: ${status}`); return; }
  checked++;
  const parsed = jsonLdBlocks(html);
  if (parsed.some((b) => b === null)) { failures.push(`${path}: invalid JSON-LD`); return; }
  const body = strip(main(html));
  for (const block of parsed) {
    if (!block) continue;
    blocks++;
    const types = [block["@type"]].flat().filter(Boolean) as string[];
    if (!block["@context"]) failures.push(`${path}: a JSON-LD block has no @context`);
    for (const t of types) {
      const required = REQUIRED[t];
      if (!required) { failures.push(`${path}: unknown @type "${t}"`); continue; }
      for (const field of required) if (!(field in block)) failures.push(`${path}: ${t} is missing "${field}"`);
      if (t === "FAQPage" && !/data-faq/.test(html)) failures.push(`${path}: FAQPage without a visible FAQ`);
      if (t === "Person") {
        const name = String((block as { name?: unknown }).name ?? "");
        if (name && !plain(body).includes(plain(name))) failures.push(`${path}: Person "${name}" is not named on the page`);
      }
      if (t === "BreadcrumbList") {
        const items = (block.itemListElement as { name?: string }[] | undefined) ?? [];
        for (const item of items.slice(1)) if (item.name && !plain(body).includes(plain(item.name))) failures.push(`${path}: breadcrumb "${item.name}" is not in the visible breadcrumb`);
      }
    }
    walk(block, types.join("/"), path);
  }
  // The site-wide blocks belong on the homepage.
  if (path === "/") {
    const types = new Set(parsed.flatMap((b) => (b ? [b["@type"]].flat() : [])));
    for (const t of ["InsuranceAgency", "WebSite"]) if (!types.has(t)) failures.push(`/: missing ${t} JSON-LD`);
  }
});
notes.push(`checked ${checked} template families, ${blocks} JSON-LD blocks`);
report("verify:schema", failures, notes);
