import type { Metadata } from "next";
import { env } from "../env.ts";
import { hasTodo } from "../fields/index.ts";
export { isIndexable } from "./indexable.ts";
export type Crumb = { label: string; href: string };

/** The visible breadcrumb as markup. Lives here, not in the component, so Node-run scripts and Payload hooks can import it. */
export function breadcrumbJsonLd(items: Crumb[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Home", href: "/" }, ...items].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${siteUrl}${c.href}` })),
  };
}

export const SITE = env.NEXT_PUBLIC_SITE_URL;
export const abs = (path: string) => `${SITE}${path}`;
/** /og/{path}.png — one image per route, generated from the brand's OG template. */
export const ogImagePath = (path: string) => abs(`/og${path === "/" ? "/" : path}image.png`);

const trim = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);

export const BRAND = "Desert Peak Insurance";
/** The principal advisor page every article byline and Article JSON-LD author points at. */
export const AUTHOR_PATH = "/about/daniel-ellis/";
export const TITLE_MAX = 60;
/**
 * The title contract: the template's own phrase, then " | Desert Peak Insurance"
 * when the pair fits in 60 characters. Long product and article names (the SEO
 * brief's patterns overflow on them) keep the phrase and drop the suffix rather
 * than ship a truncated brand name; see DECISIONS.md, SEO.
 */
export function seoTitle(base: string, brand: string | false = BRAND): string {
  const withBrand = brand ? `${base} | ${brand}` : base;
  if (withBrand.length <= TITLE_MAX) return withBrand;
  return trim(base, TITLE_MAX);
}

/**
 * Metadata for a route. Indexability is structural: a route is indexable only
 * when its document is reviewed, its wave is 1 (or promoted), and it is not a
 * utility route; a TODO token anywhere in the local text also means noindex
 * (page-generation: unknown field → the page does not build as indexable).
 */
export function pageMetadata(opts: { title: string; description: string; path: string; indexable: boolean; image?: string | null; type?: "website" | "article"; brand?: string | false }): Metadata {
  // Absolute: the layout's "— Desert Peak Insurance" template would push most titles past 60 characters.
  const title = seoTitle(opts.title, opts.brand ?? BRAND);
  const description = trim(opts.description, 155);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(opts.path) },
    robots: opts.indexable ? { index: true, follow: true } : { index: false, follow: true },
    // Every page ships an OG image: the brand template rendered for this path by app/(frontend)/og (verify:seo checks it).
    openGraph: { title, description, url: abs(opts.path), siteName: BRAND, locale: "en_US", type: opts.type ?? "website", images: [{ url: opts.image ?? ogImagePath(opts.path), width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: opts.image ?? ogImagePath(opts.path), alt: title }] },
  };
}


export const textHasTodo = (...values: (string | null | undefined)[]) => values.some((v) => hasTodo(v));

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}

export const orgJsonLd = (site: { name: string; phone?: string | null; email?: string | null; social?: { facebook?: string | null; instagram?: string | null } | null }, states: string[]) => ({
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: site.name,
  url: SITE,
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.email ? { email: site.email } : {}),
  areaServed: states.map((s) => ({ "@type": "State", name: s })),
  sameAs: [site.social?.facebook, site.social?.instagram].filter(Boolean),
});

/** WebSite + SearchAction: truthful because the header search dialog and /search/ both exist. */
export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE,
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE}/search/?q={search_term_string}` }, "query-input": "required name=search_term_string" },
});

/** The author every article points at; only fields that are visible on /about/daniel-ellis/. */
export const personJsonLd = (p: { name: string; jobTitle?: string | null; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: p.name,
  ...(p.jobTitle ? { jobTitle: p.jobTitle } : {}),
  url: abs(p.path),
  worksFor: { "@type": "InsuranceAgency", name: BRAND, url: SITE },
});

export const serviceJsonLd = (name: string, path: string, description: string, areas: string[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  name,
  url: abs(path),
  description,
  provider: { "@type": "InsuranceAgency", name: "Desert Peak Insurance", url: SITE },
  areaServed: areas.map((a) => ({ "@type": "AdministrativeArea", name: a })),
});

export const localBusinessJsonLd = (name: string, path: string, city: string, state: string, phone?: string | null) => ({
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  name,
  url: abs(path),
  ...(phone ? { telephone: phone } : {}),
  areaServed: { "@type": "City", name: city, containedInPlace: { "@type": "State", name: state } },
});

export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const definedTermJsonLd = (term: string, path: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: term,
  url: abs(path),
  description,
  inDefinedTermSet: { "@type": "DefinedTermSet", name: "Desert Peak Insurance glossary", url: abs("/resources/glossary/") },
});

export const articleJsonLd = (title: string, path: string, description: string, dates: { published: string; modified: string }, extra: { author?: { name: string; path: string } | null; reviewedAt?: string | null } = {}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  url: abs(path),
  description,
  datePublished: dates.published,
  dateModified: dates.modified,
  ...(extra.author ? { author: { "@type": "Person", name: extra.author.name, url: abs(extra.author.path) } } : {}),
  ...(extra.reviewedAt ? { reviewedBy: { "@type": "Person", name: extra.author?.name ?? BRAND, ...(extra.author ? { url: abs(extra.author.path) } : {}) } } : {}),
  publisher: { "@type": "Organization", name: BRAND, url: SITE },
});

