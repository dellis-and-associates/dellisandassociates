import { getArticles, getCities, getGlossary, getPages, getProducts, getStates, getPromotedWave } from "@/src/lib/content";
import { buildManifest } from "@/src/lib/routes";

export const revalidate = false;
/** Every route path the site serves, for the proxy's 404 decision. Cached by the same tags as the pages. */
export async function GET() {
  const [products, states, cities, pages, articles, glossary] = await Promise.all([getProducts(), getStates(), getCities(), getPages(), getArticles(), getGlossary()]);
  const promotedWave = await getPromotedWave();
  const stateMap = states.map((s) => ({ ...s, cities: cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id) }));
  const paths = buildManifest({ products, states: stateMap, pages, articles, glossary }, { promotedWave }).map((r) => r.path);
  return Response.json({ paths }, { headers: { "cache-control": "public, max-age=600" } });
}
