/**
 * The route manifest. Every indexable and utility route on the site is
 * derived here from the data (products, states, cities, pages, articles,
 * glossary), never hand-listed. The generated sitemap, the static params of
 * each template, the verify:routes check and the redirect-chain test all read
 * from this one place.
 */
import type { City, Page, Product, State } from "../payload-types.ts";

export type RouteGroup =
  | "core" | "legal" | "product-hub" | "product-coverage" | "product-third" | "state-hub"
  | "product-state" | "product-city" | "article" | "glossary" | "agent" | "carrier" | "utility";

export type RouteEntry = {
  path: string;
  group: RouteGroup;
  /** Documents this route is composed from, by slug, for cache tags. */
  tags: string[];
  /** 1 = launch, 2, 3 — per the indexation wave plan. Utility routes are never indexable. */
  wave: 1 | 2 | 3;
  indexable: boolean;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
};

export const TOP_CITY_SLUGS = new Set([
  "phoenix", "tucson", "mesa", "scottsdale", "chandler", "gilbert", "glendale", "tempe", "peoria", "surprise",
  "las-vegas", "henderson", "reno", "north-las-vegas", "sparks",
  "salt-lake-city", "west-valley-city", "provo", "west-jordan", "orem", "sandy", "ogden", "st-george",
  "boise", "meridian", "nampa", "idaho-falls", "pocatello", "caldwell", "coeur-d-alene",
]);

export const productPath = (p: Pick<Product, "slug">) => `/insurance/${p.slug}/`;
export const productSubPath = (p: Pick<Product, "slug" | "thirdSubpage">, sub: "coverage" | "third") => `/insurance/${p.slug}/${sub === "coverage" ? "coverage" : p.thirdSubpage}/`;
export const statePath = (s: Pick<State, "slug">) => `/insurance/${s.slug}/`;
export const productStatePath = (p: Pick<Product, "slug">, s: Pick<State, "slug">) => `/insurance/${p.slug}/${s.slug}/`;
export const productCityPath = (p: Pick<Product, "slug">, s: Pick<State, "slug">, c: Pick<City, "slug">) => `/insurance/${p.slug}/${s.slug}/${c.slug}/`;
export const articlePath = (section: string, slug: string) => `/resources/${section}/${slug}/`;
export const glossaryPath = (slug: string) => `/resources/glossary/${slug}/`;

export const tag = {
  product: (slug: string) => `product:${slug}`,
  state: (slug: string) => `state:${slug}`,
  city: (stateSlug: string, citySlug: string) => `city:${stateSlug}-${citySlug}`,
  article: (slug: string) => `article:${slug}`,
  glossary: (slug: string) => `glossary:${slug}`,
  page: (path: string) => `page:${path}`,
  nav: "global:nav",
  compliance: "global:compliance",
  redirects: "global:redirects",
  referrals: (tenant: string) => `tenant:${tenant}:referrals`,
};

type ReviewLike = { reviewStatus?: string | null; indexWave?: string | null };
const reviewed = (d: ReviewLike) => d.reviewStatus === "reviewed";
export type ArticleLike = { section: string; slug: string; reviewStatus?: string | null; indexWave?: string | null; wordCount?: number | null; generation?: { status?: string | null } | null };
/** Written = generated from an authored draft (or given a body in the admin). Seeded shells are not public. */
export const isWritten = (a: Pick<ArticleLike, "wordCount" | "generation">): boolean => a.generation?.status === "drafted" || (a.wordCount ?? 0) > 0;
const wave = (d: ReviewLike, fallback: 1 | 2 | 3): 1 | 2 | 3 => (d.indexWave === "1" ? 1 : d.indexWave === "2" ? 2 : d.indexWave === "3" ? 3 : fallback);

/** Wave rules from the page-generation prompt: 1 = core, legal, product hubs, state hubs, top-30 city pages; 2 = remaining city and state-product pages; 3 = resources. */
export function buildManifest(input: {
  products: Pick<Product, "slug" | "tier" | "thirdSubpage" | "reviewStatus" | "indexWave">[];
  states: (Pick<State, "slug"> & { cities: Pick<City, "slug">[] })[];
  pages: Pick<Page, "path" | "template" | "reviewStatus" | "indexWave" | "noindex">[];
  articles: ArticleLike[];
  glossary: { slug: string; reviewStatus?: string | null; indexWave?: string | null }[];
}): RouteEntry[] {
  const out: RouteEntry[] = [];
  const push = (e: Omit<RouteEntry, "indexable"> & { reviewed: boolean }) => out.push({ ...e, indexable: e.reviewed && e.wave === 1 });
  for (const pg of input.pages) {
    const utility = pg.template === "utility" || pg.noindex === true;
    const group: RouteGroup = utility ? "utility" : pg.path.startsWith("/legal/") ? "legal" : "core";
    push({ path: pg.path, group, tags: [tag.page(pg.path)], wave: utility ? 3 : wave(pg, 1), reviewed: reviewed(pg) && !utility, priority: pg.path === "/" ? 1 : group === "legal" ? 0.3 : 0.6, changefreq: pg.path === "/" ? "weekly" : "monthly" });
  }
  for (const p of input.products) {
    const r = reviewed(p);
    push({ path: productPath(p), group: "product-hub", tags: [tag.product(p.slug)], wave: wave(p, 1), reviewed: r, priority: 0.8, changefreq: "monthly" });
    push({ path: productSubPath(p, "coverage"), group: "product-coverage", tags: [tag.product(p.slug)], wave: wave(p, 1), reviewed: r, priority: 0.7, changefreq: "monthly" });
    push({ path: productSubPath(p, "third"), group: "product-third", tags: [tag.product(p.slug)], wave: wave(p, 1), reviewed: r, priority: 0.6, changefreq: "monthly" });
    for (const s of input.states) {
      push({ path: productStatePath(p, s), group: "product-state", tags: [tag.product(p.slug), tag.state(s.slug)], wave: p.tier === "1" ? 1 : 2, reviewed: r, priority: 0.7, changefreq: "monthly" });
      if (p.tier === "1") for (const c of s.cities) push({ path: productCityPath(p, s, c), group: "product-city", tags: [tag.product(p.slug), tag.state(s.slug), tag.city(s.slug, c.slug)], wave: TOP_CITY_SLUGS.has(c.slug) ? 1 : 2, reviewed: r, priority: 0.6, changefreq: "monthly" });
    }
  }
  for (const s of input.states) push({ path: statePath(s), group: "state-hub", tags: [tag.state(s.slug)], wave: 1, reviewed: true, priority: 0.7, changefreq: "monthly" });
  // Resource index pages: the glossary hub is a complete, real index (indexable); the six section lists carry drafts and stay noindex until their sections are reviewed.
  const hasGlossaryPage = input.pages.some((pg) => pg.path === "/resources/glossary/");
  if (!hasGlossaryPage) push({ path: "/resources/glossary/", group: "core", tags: ["glossary"], wave: 1, reviewed: true, priority: 0.6, changefreq: "monthly" });
  for (const section of ["guides", "state-requirements", "compare", "how-to", "life-events", "seasonal"]) push({ path: `/resources/${section}/`, group: "core", tags: ["articles"], wave: 3, reviewed: false, priority: 0.5, changefreq: "weekly" });
  // An article shell with no body is not a public page: it is listed nowhere, is not in the manifest (so the proxy answers 404) and appears the day it is drafted.
  for (const a of input.articles.filter(isWritten)) push({ path: articlePath(a.section, a.slug), group: "article", tags: [tag.article(a.slug)], wave: wave(a, 3), reviewed: reviewed(a), priority: 0.5, changefreq: "monthly" });
  for (const g of input.glossary) push({ path: glossaryPath(g.slug), group: "glossary", tags: [tag.glossary(g.slug)], wave: wave(g, 3), reviewed: reviewed(g), priority: 0.4, changefreq: "yearly" });
  return out;
}

export const isUtilityPath = (path: string) => path.startsWith("/forms/") || path === "/partners/portal/" || path.startsWith("/partners/portal/") || path.startsWith("/quote/") || path.startsWith("/r/") || path.startsWith("/design-system") || path.startsWith("/referrals/") || path === "/not-found-page/" || path.startsWith("/api/");
