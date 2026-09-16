import { notFound } from "next/navigation";
import { getCities, getCitiesOfState, getCity, getOverride, getProduct, getProducts, getState, getStates } from "@/src/lib/content";
import { buildManifest } from "@/src/lib/routes";
import { ProductTemplate } from "@/src/components/templates/product";
import { StateHubTemplate } from "@/src/components/templates/state-hub";
import { ProductStateTemplate } from "@/src/components/templates/product-state";
import { ProductCityTemplate } from "@/src/components/templates/product-city";
import { metaProduct, metaProductCity, metaProductState, metaStateHub } from "@/src/components/templates/meta";

export const revalidate = false;
export const dynamicParams = true;

/**
 * One dynamic segment tree for /insurance/... (page-generation defect 3):
 *   /{product}/                      product hub
 *   /{product}/coverage/             coverage subpage
 *   /{product}/{thirdSubpage}/       discounts-faq | plans-enrollment-faq
 *   /{state}/                        state hub
 *   /{product}/{state}/              product × state
 *   /{product}/{state}/{city}/       product × city (tier 1 only)
 * Product and state slug sets never intersect (tests/unit/reserved-slugs.test.ts).
 */
type Params = { segments: string[] };

/** Prerender indexation wave 1; everything else renders on first request and is kept fresh by tags. */
export async function generateStaticParams(): Promise<Params[]> {
  const [products, states, cities] = await Promise.all([getProducts(), getStates(), getCities()]);
  const stateMap = states.map((s) => ({ ...s, cities: cities.filter((c) => (typeof c.state === "object" ? c.state.id : c.state) === s.id) }));
  const manifest = buildManifest({ products, states: stateMap, pages: [], articles: [], glossary: [] });
  return manifest.filter((r) => r.wave === 1 && r.path.startsWith("/insurance/") && r.path !== "/insurance/").map((r) => ({ segments: r.path.split("/").filter(Boolean).slice(1) }));
}

async function resolve(segments: string[]) {
  const [a, b, c] = segments;
  if (!a || segments.length > 3) return null;
  const [product, state] = await Promise.all([getProduct(a), getState(a)]);
  if (state && !product) return segments.length === 1 ? { kind: "state" as const, state } : null;
  if (!product) return null;
  if (segments.length === 1) return { kind: "product" as const, product, sub: null };
  if (segments.length === 2) {
    if (b === "coverage") return { kind: "product" as const, product, sub: "coverage" as const };
    if (b === product.thirdSubpage) return { kind: "product" as const, product, sub: "third" as const };
    const st = await getState(b!);
    return st ? { kind: "product-state" as const, product, state: st } : null;
  }
  if (product.tier !== "1") return null;
  const st = await getState(b!);
  if (!st) return null;
  const city = await getCity(st.slug, c!);
  return city ? { kind: "product-city" as const, product, state: st, city } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { segments } = await params;
  const r = await resolve(segments);
  if (!r) return {};
  if (r.kind === "state") return await metaStateHub(r.state);
  if (r.kind === "product") return await metaProduct(r.product, r.sub);
  if (r.kind === "product-state") return await metaProductState(r.product, r.state);
  return await metaProductCity(r.product, r.state, r.city);
}

export default async function InsuranceRoute({ params }: { params: Promise<Params> }) {
  const { segments } = await params;
  const r = await resolve(segments);
  if (!r) notFound();
  if (r.kind === "state") {
    const cities = await getCitiesOfState(r.state.id);
    return <StateHubTemplate state={r.state} cities={cities} products={await getProducts()} />;
  }
  if (r.kind === "product") return <ProductTemplate product={r.product} sub={r.sub} states={await getStates()} />;
  if (r.kind === "product-state") {
    const cities = r.product.tier === "1" ? await getCitiesOfState(r.state.id) : [];
    return <ProductStateTemplate product={r.product} state={r.state} cities={cities} />;
  }
  const [override, siblings] = await Promise.all([getOverride(r.product.id, r.city.id), getProducts()]);
  return <ProductCityTemplate product={r.product} state={r.state} city={r.city} override={override} siblings={siblings.filter((p) => p.tier === "1" && p.id !== r.product.id)} />;
}
