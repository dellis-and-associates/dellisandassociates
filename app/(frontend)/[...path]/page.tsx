import { isUtilityPath } from "@/src/lib/routes";
import { displayText } from "@/src/lib/text";
import { notFound } from "next/navigation";
import { getPage, getPages, getStates, getPromotedWave } from "@/src/lib/content";
import { isIndexable, pageMetadata, breadcrumbJsonLd, jsonLd, SITE } from "@/src/lib/seo";
import { Breadcrumb } from "@/src/components/ui/breadcrumb";
import { PageBlocks } from "@/src/components/site/page-blocks";
import { SiteMapList } from "@/src/components/site/site-map";
import { StrataRule } from "@/src/components/ui/misc";

export const revalidate = false;
export const dynamicParams = true;

/**
 * Hand-built pages from the Pages collection (core, legal, utility). The
 * redirect map is served by proxy.ts from the same Redirects collection.
 */
export async function generateStaticParams() {
  const pages = await getPages();
  const reserved = new Set(["/", "/insurance/", "/locations/", "/resources/", "/resources/glossary/", "/agents/", "/carriers/", "/quote/", "/search/", "/partners/portal/"]);
  return pages.filter((p) => !reserved.has(p.path) && p.reviewStatus === "reviewed").map((p) => ({ path: p.path.split("/").filter(Boolean) }));
}

const toPath = (segs: string[]) => `/${segs.join("/")}/`;

export async function generateMetadata({ params }: { params: Promise<{ path: string[] }> }) {
  const path = toPath((await params).path);
  const page = await getPage(path);
  if (!page) return {};
  return pageMetadata({ title: page.seo?.title ?? page.title, description: page.seo?.description ?? page.lede ?? `${page.title} — Desert Peak Insurance.`, path, indexable: isIndexable(page, { promotedWave: await getPromotedWave(), utility: page.template === "utility" || page.noindex === true || isUtilityPath(page.path) }) });
}

export default async function CmsPage({ params }: { params: Promise<{ path: string[] }> }) {
  const segs = (await params).path;
  const path = toPath(segs);
  const page = await getPage(path);
  if (!page) notFound();
  const legalState = typeof page.legalState === "object" ? page.legalState : page.legalState ? (await getStates()).find((s) => s.id === page.legalState) : undefined;
  const known = new Set((await getPages()).map((p) => p.path));
  // Intermediate segments with no page of their own (e.g. /legal/) are not linked.
  const crumbs = segs.map((_, i) => ({ label: i === segs.length - 1 ? page.title : segs[i]!.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()), href: toPath(segs.slice(0, i + 1)) })).filter((c) => known.has(c.href));
  return (
    <div className="mx-auto grid max-w-measure-page gap-10 px-4 py-10 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(crumbs, SITE))} />
      <Breadcrumb items={crumbs} />
      <header className="grid gap-4"><h1>{page.title}</h1>{page.lede ? <p className="lead max-w-measure-body">{displayText(page.lede)}</p> : null}<StrataRule /></header>
      <div className="grid gap-10">
        <PageBlocks layout={page.layout} stateLicense={legalState ? { state: legalState.name, licenseNumber: legalState.licenseNumber } : undefined} />
        {legalState ? <p data-license className="rounded-surface border border-border bg-surface-sunken p-4 font-sans text-small">{legalState.licenseNumber && !legalState.licenseNumber.includes("{{TODO") ? <>License, {legalState.name}: <span className="tabular">{legalState.licenseNumber}</span></> : <>Licensed in {legalState.name}. Verify the license</>}{legalState.doi?.url && !legalState.doi.url.includes("{{TODO") ? <> with the <a href={legalState.doi.url} rel="noopener">{legalState.doi.name}</a></> : null}.</p> : null}
        {path === "/sitemap/" ? <SiteMapList /> : !page.layout?.length ? <p className="max-w-measure-body font-sans text-small text-ink-muted">This page is being written.</p> : null}
      </div>
    </div>
  );
}
