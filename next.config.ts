import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
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
  async redirects() {
    // Legacy WordPress-era slugs. Phase 3 moves the full map into the Redirects collection.
    return [
      { source: "/medicare-insurance-prescription-drug-form-2", destination: "/medication-intake-form", permanent: true },
      { source: "/dental-and-vision-insurance-2", destination: "/dental-and-vision-insurance", permanent: true },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
