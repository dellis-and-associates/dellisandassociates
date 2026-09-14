import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // The IA uses trailing slashes everywhere (sitemap package, redirect map, canonical URLs).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    localPatterns: [{ pathname: "/api/media/file/**" }],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
};

const config = withPayload(nextConfig, { devBundleServerPackages: false });

/**
 * withPayload adds `Accept-CH` / `Critical-CH: Sec-CH-Prefers-Color-Scheme` on every route for the admin's dark
 * mode. Chrome answers a Critical-CH it has not sent by restarting the navigation (Lighthouse records it as a
 * 307 to the same URL, ~600 ms on Slow 4G), on every cold visit to every page. The admin is the only consumer,
 * so the hint is scoped to /admin.
 */
const payloadHeaders = config.headers;
config.headers = async () => {
  const entries = payloadHeaders ? await payloadHeaders() : [];
  return entries.map((entry) => (entry.headers.some((h) => h.key === "Critical-CH") ? { ...entry, source: "/admin/:path*" } : entry));
};

export default config;
