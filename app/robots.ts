import type { MetadataRoute } from "next";
import { env } from "@/src/env";
import { abs } from "@/src/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const production = env.APP_ENV === "production";
  return {
    rules: production ? [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/quote/", "/forms/", "/partners/portal/", "/referrals/", "/r/", "/design-system/", "/search/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: production ? abs("/sitemap.xml") : undefined,
  };
}
