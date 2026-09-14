import { getArticle, getCity, getCompliance, getPage, getProduct, getState, getTerm } from "@/src/lib/content";
import { titles } from "@/src/lib/compose";
import { ogImage, type OgInput } from "@/src/lib/og";

export const dynamic = "force-dynamic";

/**
 * GET /og/{route path}image.png → the brand OG template for that route.
 * The text is never taken from the request: the path is resolved to a
 * document (product, state, city, article, term, page) and the image is
 * rendered from the document's own title, so nobody can put words on the
 * brand template. Unknown paths are 404.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ segments?: string[] }> }) {
  const segments = (await ctx.params).segments ?? [];
  if (segments[segments.length - 1] !== "image.png") return new Response("Not found", { status: 404 });
  const parts = segments.slice(0, -1);
  const path = `/${parts.join("/")}${parts.length ? "/" : ""}`;
  const input = await resolve(path, parts);
  if (!input) return new Response("Not found", { status: 404 });
  return ogImage(input);
}

async function resolve(path: string, parts: string[]): Promise<OgInput | null> {
  if (path === "/") return { family: "site", title: "Compared across carriers. Explained with the math.", kicker: "Independent insurance agency in Arizona, Nevada, Utah and Idaho" };
  const compliance = await getCompliance();
  const tpmoFor = (medicare: boolean) => (medicare && compliance.medicareInScope ? compliance.medicareTpmoDisclaimer : null);
  if (parts[0] === "insurance" && parts.length >= 2 && parts.length <= 4) {
    const [, a, b, c] = parts;
    const [product, state] = await Promise.all([getProduct(a!), getState(a!)]);
    if (state && !product && parts.length === 2) return { family: "state", title: titles.state(state), kicker: state.name };
    if (!product) return null;
    if (parts.length === 2) return { family: "product", title: titles.product(product), kicker: product.category === "Commercial" ? "Commercial coverage" : "Personal coverage", tpmo: tpmoFor(product.medicareTouching ?? false) };
    if (parts.length === 3) {
      if (b === "coverage") return { family: "product", title: titles.coverage(product), kicker: product.name, tpmo: tpmoFor(product.medicareTouching ?? false) };
      if (b === product.thirdSubpage) return { family: "product", title: titles.third(product), kicker: product.name, tpmo: tpmoFor(product.medicareTouching ?? false) };
      const s = await getState(b!);
      return s ? { family: "state", title: titles.productState(product, s), kicker: `${product.name} · ${s.name}`, tpmo: tpmoFor(product.medicareTouching ?? false) } : null;
    }
    const s = await getState(b!);
    const city = s ? await getCity(s.slug, c!) : null;
    return s && city ? { family: "product-city", title: titles.productCity(product, city, s), kicker: `${product.name} · ${city.name}, ${s.name}`, tpmo: tpmoFor(product.medicareTouching ?? false) } : null;
  }
  if (parts[0] === "resources" && parts[1] === "glossary" && parts.length === 3) {
    const term = await getTerm(parts[2]!);
    return term ? { family: "glossary", title: term.term } : null;
  }
  if (parts[0] === "resources" && parts.length === 3) {
    const article = await getArticle(parts[1]!, parts[2]!);
    return article ? { family: "article", title: article.title, kicker: article.section.replace(/-/g, " ") } : null;
  }
  const page = await getPage(path);
  if (page) return { family: "page", title: page.title, tpmo: null };
  return null;
}
