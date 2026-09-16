import { SITEMAP_SECTIONS, indexXml, indexableRoutes, sectionRoutes, xmlResponse } from "@/src/lib/sitemap";

export const revalidate = 3600;

/** The sitemap index: one entry per section child, each dated by its newest document. */
export async function GET() {
  const routes = await indexableRoutes();
  const children = SITEMAP_SECTIONS.map((section) => {
    const inSection = sectionRoutes(routes, section);
    const lastmod = inSection.map((r) => r.lastmod).filter((d): d is string => Boolean(d)).sort().at(-1);
    return { section, lastmod, count: inSection.length };
  }).filter((c) => c.count > 0);
  return xmlResponse(indexXml(children));
}
