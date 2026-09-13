import type { MetadataRoute } from "next";
import { getArticles, getCities, getGlossary, getPages, getProducts, getStates } from "@/src/lib/content";
import { buildManifest } from "@/src/lib/routes";
import { abs } from "@/src/lib/seo";

export const revalidate = false;

/** Generated from the route manifest; only indexable routes (reviewed, wave 1, not utility). The shipped fixture is a regression input, never read here. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, states, cities, pages, articles, glossary] = await Promise.all([getProducts(), getStates(), getCities(), getPages(), getArticles(), getGlossary()]);
  const stateMap = states.map((s) => ({ ...s, cities: cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id) }));
  const manifest = buildManifest({ products, states: stateMap, pages, articles, glossary });
  return manifest.filter((r) => r.indexable).map((r) => ({ url: abs(r.path), changeFrequency: r.changefreq, priority: r.priority }));
}
