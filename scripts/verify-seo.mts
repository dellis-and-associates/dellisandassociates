/** pnpm verify:seo — unique titles/descriptions/h1, canonical, noindex iff not indexable, structured data per template. */
import { attr, fetchPage, jsonLdBlocks, loadManifest, pmap, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
const titles = new Map<string, string>(), descs = new Map<string, string>(), h1s = new Map<string, string>();
const pages = await pmap(manifest, 8, async (r) => ({ r, ...(await fetchPage(r.path)) }));
let checked = 0;
for (const { r, status, html } of pages) {
  if (status !== 200) continue;
  checked++;
  const title = attr(html, /<title>([^<]*)<\/title>/) ?? "";
  const desc = attr(html, /<meta name="description" content="([^"]*)"/) ?? "";
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/) ?? "";
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) ?? "";
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1]!.replace(/<[^>]+>/g, "").trim());
  if (!title) failures.push(`${r.path}: no title`);
  if (title.length > 60) failures.push(`${r.path}: title ${title.length} chars`);
  if (titles.has(title)) failures.push(`${r.path}: duplicate title of ${titles.get(title)}`); else titles.set(title, r.path);
  if (!desc) failures.push(`${r.path}: no description`);
  if (desc.length > 155) failures.push(`${r.path}: description ${desc.length} chars`);
  if (descs.has(desc)) failures.push(`${r.path}: duplicate description of ${descs.get(desc)}`); else descs.set(desc, r.path);
  if (!canonical.endsWith(r.path)) failures.push(`${r.path}: canonical is ${canonical || "missing"}`);
  if (h1.length !== 1) failures.push(`${r.path}: ${h1.length} h1`);
  else if (h1s.has(h1[0]!)) failures.push(`${r.path}: duplicate h1 of ${h1s.get(h1[0]!)}`); else h1s.set(h1[0]!, r.path);
  const noindex = /noindex/.test(robots);
  if (r.indexable && noindex) failures.push(`${r.path}: indexable but noindex`);
  if (!r.indexable && !noindex) failures.push(`${r.path}: not indexable but no noindex`);
  if (!attr(html, /<meta property="og:title" content="([^"]*)"/)) failures.push(`${r.path}: no og:title`);
  const ld = jsonLdBlocks(html);
  if (ld.some((b) => b === null)) failures.push(`${r.path}: invalid JSON-LD`);
  const types = new Set(ld.flatMap((b) => (b ? [b["@type"]].flat() : [])));
  if (r.path !== "/" && r.group !== "utility" && !types.has("BreadcrumbList")) failures.push(`${r.path}: no BreadcrumbList`);
  if (r.group === "product-city" && !types.has("InsuranceAgency") && !types.has("LocalBusiness")) failures.push(`${r.path}: no LocalBusiness`);
  if (["product-hub", "product-coverage", "product-third", "product-state"].includes(r.group) && !types.has("Service")) failures.push(`${r.path}: no Service`);
  if (types.has("FAQPage") && !/data-faq/.test(html)) failures.push(`${r.path}: FAQPage without visible FAQ`);
  if (r.group === "glossary" && !types.has("DefinedTerm") && r.indexable) failures.push(`${r.path}: no DefinedTerm`);
  if (types.has("Person")) failures.push(`${r.path}: Person schema before agents exist`);
}
notes.push(`checked ${checked} routes: ${titles.size} unique titles, ${descs.size} unique descriptions, ${h1s.size} unique h1`);
report("verify:seo", failures, notes);
