import { sectionSitemap } from "@/src/lib/sitemap";

export const revalidate = 3600;
export const GET = () => sectionSitemap("insurance");
