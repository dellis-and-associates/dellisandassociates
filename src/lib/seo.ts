import type { Metadata } from "next";
import { env } from "../env.ts";
import { hasTodo } from "../fields/index.ts";
import type { Crumb } from "../components/ui/breadcrumb.tsx";
export { breadcrumbJsonLd } from "../components/ui/breadcrumb.tsx";

export const SITE = env.NEXT_PUBLIC_SITE_URL;
export const abs = (path: string) => `${SITE}${path}`;

const trim = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);

/**
 * Metadata for a route. Indexability is structural: a route is indexable only
 * when its document is reviewed, its wave is 1 (or promoted), and it is not a
 * utility route; a TODO token anywhere in the local text also means noindex
 * (page-generation: unknown field → the page does not build as indexable).
 */
export function pageMetadata(opts: { title: string; description: string; path: string; indexable: boolean; image?: string | null; type?: "website" | "article" }): Metadata {
  // Absolute: the layout's "— Desert Peak Insurance" template would push most titles past 60 characters.
  const title = trim(opts.title, 60);
  const description = trim(opts.description, 155);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(opts.path) },
    robots: opts.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url: abs(opts.path), siteName: "Desert Peak Insurance", type: opts.type ?? "website", ...(opts.image ? { images: [{ url: opts.image }] } : {}) },
    twitter: { card: "summary", title, description },
  };
}

export function isIndexable(doc: { reviewStatus?: string | null; indexWave?: string | null }, extra: { utility?: boolean; hasTodo?: boolean } = {}): boolean {
  return doc.reviewStatus === "reviewed" && doc.indexWave === "1" && !extra.utility && !extra.hasTodo;
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

export const articleJsonLd = (title: string, path: string, description: string, dates: { published: string; modified: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  url: abs(path),
  description,
  datePublished: dates.published,
  dateModified: dates.modified,
  publisher: { "@type": "Organization", name: "Desert Peak Insurance", url: SITE },
});

export type { Crumb };
