/**
 * pnpm import:package — the committed conversion from the sitemap package to
 * typed seed data (page-generation Phase 1: "derived from the corrected XML by
 * a committed conversion script, not by hand"). Writes src/seed-data/*.json.
 * The article and glossary slugs come from full-sitemap.xml, its one remaining
 * role besides regression; titles are placeholders derived from the slug and
 * are replaced by generation in the batched content phase.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { isNormalizedSlug, slugify } from "../src/lib/slug.ts";

const src = join(process.cwd(), "desert-peak-insurance-sitemap");
const out = join(process.cwd(), "src", "seed-data");
mkdirSync(out, { recursive: true });
const read = (f: string) => readFileSync(join(src, f), "utf8");
const attrs = (s: string) => Object.fromEntries([...s.matchAll(/(\w+)="([^"]*)"/g)].map((a) => [a[1], a[2]]));
const unescape = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// Products
const products = [...read("data-products.xml").matchAll(/<product\s+([^>]*)>([^<]*)<\/product>/g)].map((m) => {
  const a = attrs(m[1]);
  const slug = slugify(a.slug);
  if (!isNormalizedSlug(a.slug)) throw new Error(`product slug not normalized in data file: ${a.slug}`);
  return {
    name: unescape(m[2]),
    slug,
    tier: a.tier as "1" | "2",
    category: a.category as "Personal" | "Commercial",
    parent: a.parent ?? null,
    thirdSubpage: (a.subpage3 ?? "discounts-faq") as "discounts-faq" | "plans-enrollment-faq",
    medicareTouching: slug === "medicare",
  };
});

// States + cities
const states = [...read("data-locations.xml").matchAll(/<state\s+([^>]*)>([\s\S]*?)<\/state>/g)].map((m) => {
  const a = attrs(m[1]);
  return {
    name: a.name,
    slug: a.slug,
    abbr: a.abbr,
    cities: [...m[2].matchAll(/<city\s+slug="([^"]*)">([^<]*)<\/city>/g)].map((c) => ({ name: unescape(c[2]), slug: c[1] })),
  };
});

// Pages (core + legal) from the architecture
const arch = read("site-architecture.xml");
const pages = [...arch.matchAll(/<page\s+([^>]*)\/>/g)]
  .map((m) => attrs(m[1]))
  .filter((a) => a.url)
  .map((a) => ({
    title: unescape(a.title),
    path: a.url,
    template: a.template,
    priority: a.priority ? Number(a.priority) : null,
    changefreq: a.changefreq ?? null,
    legalState: /^\/legal\/licensing\/([a-z-]+)\/$/.exec(a.url)?.[1] ?? null,
  }));

// Articles + glossary slugs from the fixture
const locs = [...read("full-sitemap.xml").matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const SMALL = new Set(["a", "an", "and", "as", "at", "by", "for", "from", "in", "is", "of", "on", "or", "the", "to", "vs", "with", "your"]);
const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((w, i) => (i > 0 && SMALL.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/(\w) S\b/g, "$1's") // beginner-s-guide → Beginner's Guide
    .replace(/\bVs\b/g, "vs.");
const articles = locs
  .map((p) => /^\/resources\/(guides|state-requirements|compare|how-to|life-events|seasonal)\/([a-z0-9-]+)\/$/.exec(p))
  .filter((m): m is RegExpExecArray => Boolean(m))
  .map((m) => ({ section: m[1], slug: m[2], placeholderTitle: titleFromSlug(m[2]) }));
const glossary = locs
  .map((p) => /^\/resources\/glossary\/([a-z0-9-]+)\/$/.exec(p))
  .filter((m): m is RegExpExecArray => Boolean(m))
  .map((m) => ({ slug: m[1], placeholderTerm: titleFromSlug(m[1]) }));

for (const [name, data] of Object.entries({ products, states, pages, articles, glossary })) {
  writeFileSync(join(out, `${name}.json`), JSON.stringify(data, null, 2) + "\n");
}
console.log(`products ${products.length}, states ${states.length}, cities ${states.reduce((n, s) => n + s.cities.length, 0)}, pages ${pages.length}, articles ${articles.length}, glossary ${glossary.length}`);
const dupes = (xs: string[]) => xs.filter((x, i) => xs.indexOf(x) !== i);
const d = [...dupes(articles.map((a) => a.slug)), ...dupes(glossary.map((g) => g.slug)), ...dupes(pages.map((p) => p.path))];
if (d.length) {
  console.error("duplicate slugs:", d);
  process.exit(1);
}
