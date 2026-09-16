/**
 * Read side for the templates. Local API only (overrideAccess: the site
 * renders drafts and applies noindex itself). Every fetch is wrapped in
 * unstable_cache with the tags from src/lib/routes.ts so Payload hooks can
 * revalidate by tag (Phase 6).
 */
import config from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload, type Payload } from "payload";
import type { Article, City, ComplianceSetting, GlossaryTerm, Page, Product, SiteSetting, State } from "../payload-types.ts";
import { tag } from "./routes.ts";

let cached: Promise<Payload> | undefined;
export const db = () => (cached ??= getPayload({ config }));

const cachedFind = <T>(key: string[], tags: string[], fn: () => Promise<T>) => unstable_cache(fn, key, { tags, revalidate: false })();

export const getSiteSettings = () => cachedFind(["site-settings"], [tag.nav], async () => (await db()).findGlobal({ slug: "site-settings", depth: 1 }) as Promise<SiteSetting>);
/** The promoted indexation wave (SiteSettings). Cached with the nav tag, so a change revalidates with the rest of the shell. */
export const getPromotedWave = async (): Promise<number> => Number((await getSiteSettings()).promotedWave ?? 1);
export const getCompliance = () => cachedFind(["compliance-settings"], [tag.compliance], async () => (await db()).findGlobal({ slug: "compliance-settings", depth: 0 }) as Promise<ComplianceSetting>);

export const getProducts = () => cachedFind(["products"], ["products"], async () => (await (await db()).find({ collection: "products", limit: 0, pagination: false, depth: 0, sort: "name" })).docs as Product[]);
export const getProduct = (slug: string) => cachedFind(["product", slug], [tag.product(slug), "products"], async () => ((await (await db()).find({ collection: "products", where: { slug: { equals: slug } }, limit: 1, depth: 1 })).docs[0] as Product | undefined) ?? null);
export const getStates = () => cachedFind(["states"], ["states"], async () => (await (await db()).find({ collection: "states", limit: 0, pagination: false, depth: 0, sort: "name" })).docs as State[]);
export const getState = (slug: string) => cachedFind(["state", slug], [tag.state(slug), "states"], async () => ((await (await db()).find({ collection: "states", where: { slug: { equals: slug } }, limit: 1, depth: 1 })).docs[0] as State | undefined) ?? null);
export const getCities = () => cachedFind(["cities"], ["cities"], async () => (await (await db()).find({ collection: "cities", limit: 0, pagination: false, depth: 0, sort: "name" })).docs as City[]);
export const getCity = (stateSlug: string, citySlug: string) =>
  cachedFind(["city", stateSlug, citySlug], [tag.city(stateSlug, citySlug), "cities"], async () => {
    const p = await db();
    const state = (await p.find({ collection: "states", where: { slug: { equals: stateSlug } }, limit: 1, depth: 0 })).docs[0];
    if (!state) return null;
    return ((await p.find({ collection: "cities", where: { and: [{ slug: { equals: citySlug } }, { state: { equals: state.id } }] }, limit: 1, depth: 1 })).docs[0] as City | undefined) ?? null;
  });
export const getCitiesOfState = (stateId: number) => cachedFind(["cities-of", String(stateId)], ["cities"], async () => (await (await db()).find({ collection: "cities", where: { state: { equals: stateId } }, limit: 0, pagination: false, depth: 0, sort: "name" })).docs as City[]);
export const getOverride = (productId: number, cityId: number) =>
  cachedFind(["override", String(productId), String(cityId)], ["location-overrides"], async () => (await (await db()).find({ collection: "location-overrides", where: { and: [{ product: { equals: productId } }, { city: { equals: cityId } }] }, limit: 1, depth: 1 })).docs[0] ?? null);
export const getPage = (path: string) => cachedFind(["page", path], [tag.page(path), "pages"], async () => ((await (await db()).find({ collection: "pages", where: { path: { equals: path } }, limit: 1, depth: 1 })).docs[0] as Page | undefined) ?? null);
export const getPages = () => cachedFind(["pages"], ["pages"], async () => (await (await db()).find({ collection: "pages", limit: 0, pagination: false, depth: 0, sort: "path" })).docs as Page[]);
/** Listing fields only: with every body the list is several MB, over the data-cache limit, and each render would query the database. */
export const getArticles = () => cachedFind(["articles"], ["articles"], async () => (await (await db()).find({ collection: "articles", limit: 0, pagination: false, depth: 0, sort: "title", select: { title: true, slug: true, section: true, excerpt: true, reviewStatus: true, indexWave: true, wordCount: true, generation: true, updatedAt: true, createdAt: true } })).docs as Article[]);
export const getArticle = (section: string, slug: string) => cachedFind(["article", section, slug], [tag.article(slug), "articles"], async () => ((await (await db()).find({ collection: "articles", where: { and: [{ slug: { equals: slug } }, { section: { equals: section } }] }, limit: 1, depth: 1 })).docs[0] as Article | undefined) ?? null);
export const getGlossary = () => cachedFind(["glossary"], ["glossary"], async () => (await (await db()).find({ collection: "glossary-terms", limit: 0, pagination: false, depth: 0, sort: "term" })).docs as GlossaryTerm[]);
export const getTerm = (slug: string) => cachedFind(["term", slug], [tag.glossary(slug), "glossary"], async () => ((await (await db()).find({ collection: "glossary-terms", where: { slug: { equals: slug } }, limit: 1, depth: 1 })).docs[0] as GlossaryTerm | undefined) ?? null);
export const getAgents = () => cachedFind(["agents"], ["agents"], async () => (await (await db()).find({ collection: "agents", where: { active: { equals: true } }, limit: 0, pagination: false, depth: 1, sort: "name" })).docs);
export const getCarriers = () => cachedFind(["carriers"], ["carriers"], async () => (await (await db()).find({ collection: "carriers", where: { active: { equals: true } }, limit: 0, pagination: false, depth: 1, sort: "name" })).docs);
export const getForm = (slug: string) => cachedFind(["form", slug], ["forms"], async () => (await (await db()).find({ collection: "forms", where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0] ?? null);
export const getRedirect = (from: string) => cachedFind(["redirect", from], [tag.redirects], async () => (await (await db()).find({ collection: "redirects", where: { from: { equals: from } }, limit: 1, depth: 0 })).docs[0] ?? null);

export const rel = <T>(v: number | T | null | undefined): T | null => (typeof v === "object" && v !== null ? (v as T) : null);
export const relId = (v: unknown): number | null => (typeof v === "object" && v !== null ? ((v as { id: number }).id ?? null) : typeof v === "number" ? v : null);
