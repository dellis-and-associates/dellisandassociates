import { getArticles, getCities, getGlossary, getPages, getProducts, getPromotedWave, getStates } from "./content.ts";
import { buildManifest, type RouteEntry, type RouteGroup } from "./routes.ts";
import { abs } from "./seo.ts";

/**
 * A sitemap index at /sitemap.xml with one child per section, as the SEO brief
 * specifies. Only indexable routes appear (the same resolver the robots meta
 * uses), and `lastmod` is the document's own updatedAt — never build time.
 */
export const SITEMAP_SECTIONS = ["core", "insurance", "locations", "resources", "glossary"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];
export const sitemapPath = (s: SitemapSection) => `/sitemap-${s}.xml`;

const SECTION_OF: Record<RouteGroup, SitemapSection> = {
  core: "core",
  legal: "core",
  utility: "core", // never indexable, so never emitted
  "product-hub": "insurance",
  "product-coverage": "insurance",
  "product-third": "insurance",
  "product-state": "insurance",
  "state-hub": "locations",
  "product-city": "locations",
  article: "resources",
  glossary: "glossary",
  agent: "core",
  carrier: "core",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const day = (iso?: string) => (iso ? new Date(iso).toISOString().slice(0, 10) : undefined);

export async function indexableRoutes(): Promise<RouteEntry[]> {
  const [products, states, cities, pages, articles, glossary, promotedWave] = await Promise.all([getProducts(), getStates(), getCities(), getPages(), getArticles(), getGlossary(), getPromotedWave()]);
  const stateMap = states.map((s) => ({ ...s, cities: cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id) }));
  return buildManifest({ products, states: stateMap, pages, articles, glossary }, { promotedWave }).filter((r) => r.indexable);
}

export const sectionRoutes = (routes: RouteEntry[], section: SitemapSection) => routes.filter((r) => SECTION_OF[r.group] === section);

export function urlsetXml(routes: RouteEntry[]): string {
  const urls = routes
    .map((r) => {
      const lastmod = day(r.lastmod);
      return `  <url>\n    <loc>${esc(abs(r.path))}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function indexXml(children: { section: SitemapSection; lastmod?: string }[]): string {
  const items = children
    .map((c) => {
      const lastmod = day(c.lastmod);
      return `  <sitemap>\n    <loc>${esc(abs(sitemapPath(c.section)))}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}  </sitemap>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const xmlResponse = (body: string) => new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600, s-maxage=3600" } });

/** One child sitemap; empty sections still answer 200 with an empty urlset so the index never points at a 404. */
export async function sectionSitemap(section: SitemapSection) {
  const routes = sectionRoutes(await indexableRoutes(), section);
  return xmlResponse(urlsetXml(routes));
}
