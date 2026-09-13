/**
 * Tag-based revalidation (Phase 6). Payload afterChange/afterDelete hooks call
 * this with the tags a document participates in; the read layer
 * (src/lib/content.ts) cached under the same tags. Path revalidation is never
 * used: one product edit fans out to 38 city pages, 4 state hubs, 3 product
 * pages and every linking article, and the tags already know that.
 * Outside the Next runtime (seed, migrations, tests) revalidateTag throws;
 * that is swallowed on purpose.
 */
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";
import { tag } from "../lib/routes.ts";

async function revalidate(tags: string[]): Promise<void> {
  const unique = [...new Set(tags)].filter(Boolean);
  if (!unique.length) return;
  try {
    const { revalidateTag } = await import("next/cache");
    for (const t of unique) revalidateTag(t, "max");
  } catch {
    /* not inside a Next request/runtime */
  }
}

const slugOf = (d: unknown) => (d as { slug?: string } | undefined)?.slug ?? "";

/** Which tags a document invalidates, by collection. */
export function tagsFor(collection: string, doc: Record<string, unknown>, previous?: Record<string, unknown>): string[] {
  const s = slugOf(doc);
  const ps = previous ? slugOf(previous) : "";
  const both = (f: (x: string) => string) => [f(s), ...(ps && ps !== s ? [f(ps)] : [])];
  switch (collection) {
    case "products": return ["products", ...both(tag.product), tag.nav];
    case "states": return ["states", ...both(tag.state), tag.nav, "cities"];
    case "cities": {
      const state = doc.state as { slug?: string } | number | undefined;
      const stateSlug = typeof state === "object" ? (state?.slug ?? "") : "";
      return ["cities", ...(stateSlug ? both((x) => tag.city(stateSlug, x)) : [])];
    }
    case "location-overrides": return ["location-overrides", "cities"];
    case "articles": return ["articles", ...both(tag.article)];
    case "glossary-terms": return ["glossary", ...both(tag.glossary)];
    case "pages": return ["pages", tag.page(String(doc.path ?? "")), ...(previous?.path && previous.path !== doc.path ? [tag.page(String(previous.path))] : [])];
    case "agents": return ["agents"];
    case "carriers": return ["carriers"];
    case "forms": return ["forms"];
    case "redirects": return [tag.redirects];
    case "media": return ["media"];
    default: return [];
  }
}

export const afterChangeRevalidate: CollectionAfterChangeHook = async ({ doc, previousDoc, collection }) => {
  await revalidate(tagsFor(collection.slug, doc as Record<string, unknown>, previousDoc as Record<string, unknown> | undefined));
  return doc;
};
export const afterDeleteRevalidate: CollectionAfterDeleteHook = async ({ doc, collection }) => {
  await revalidate(tagsFor(collection.slug, doc as Record<string, unknown>));
  return doc;
};
/** A ComplianceSettings or SiteSettings change invalidates everything that reads them: every page. Correct, and rare. */
export const globalAfterChangeRevalidate: GlobalAfterChangeHook = async ({ doc, global }) => {
  await revalidate(global.slug === "compliance-settings" ? [tag.compliance, "products", "states", "cities", "articles", "glossary", "pages"] : [tag.nav]);
  return doc;
};
