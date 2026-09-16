import type { City, Product, State } from "../../payload-types.ts";
import { localText, titles } from "../../lib/compose.ts";
import { getPromotedWave } from "../../lib/content.ts";
import { productCityPath, productPath, productStatePath, productSubPath, statePath } from "../../lib/routes.ts";
import { isIndexable, pageMetadata } from "../../lib/seo.ts";
import { richTextToPlain } from "../../lib/text.ts";

const summary = (p: Product) => (p.summary && !p.summary.includes("{{TODO") ? p.summary : richTextToPlain(p.intro).slice(0, 150) || `${p.name} from an independent agency in Arizona, Nevada, Utah and Idaho. We compare the carriers we represent and tell you what we find.`);
/** The four states as the title patterns abbreviate them (SEO brief, section 2). */
const STATES_SHORT = "AZ, NV, UT & ID";

export const metaProduct = async (p: Product, sub: "coverage" | "third" | null) => {
  const path = sub ? productSubPath(p, sub) : productPath(p);
  const title = sub === "coverage" ? titles.coverage(p) : sub === "third" ? titles.third(p) : `${p.name} in ${STATES_SHORT}`;
  const description =
    sub === "coverage" ? `What ${p.name.toLowerCase()} covers and does not cover, part by part, from an independent agency in Arizona, Nevada, Utah and Idaho.`
    : sub === "third" ? (p.thirdSubpage === "plans-enrollment-faq" ? `${p.name} plans, enrollment windows and the questions people ask, answered plainly by an independent agency in Arizona, Nevada, Utah and Idaho.` : `Discounts carriers commonly offer on ${p.name.toLowerCase()}, and the questions people ask, answered plainly by an independent agency in AZ, NV, UT and ID.`)
    : (p.seo?.description ?? summary(p));
  return pageMetadata({ title: p.seo?.title && !sub ? p.seo.title : title, description, path, indexable: isIndexable(p, { promotedWave: await getPromotedWave() }) });
};
export const metaStateHub = async (s: State) => pageMetadata({ title: `Insurance in ${s.name}`, description: `What ${s.name} requires, which lines we write there, and every city we serve. Statutory minimums cited to the ${s.doi?.name && !s.doi.name.includes("{{TODO") ? s.doi.name : "state Department of Insurance"}.`, path: statePath(s), indexable: true });
export const metaProductState = async (p: Product, s: State) => pageMetadata({ title: `${p.name} in ${s.name}`, description: `${p.name} in ${s.name}: what the state requires, what the policy covers, and how we compare the carriers we represent. ${summary(p)}`, path: productStatePath(p, s), indexable: isIndexable(p, { promotedWave: await getPromotedWave() }) && p.tier === "1" });
export const metaProductCity = async (p: Product, s: State, c: City) => {
  const local = localText(p, c, s);
  return pageMetadata({ title: `${p.name} in ${c.name}, ${s.abbr}`, description: `${p.name} for ${c.name}, ${s.name}: local risks, ${s.name} minimums with their sources, and an independent comparison of the carriers we represent.`, path: productCityPath(p, s, c), indexable: isIndexable(p, { hasTodo: !local.complete, promotedWave: await getPromotedWave() }) });
};
