import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { publicEnv } from "./src/env.public.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // The IA uses trailing slashes everywhere (sitemap package, redirect map, canonical URLs).
  trailingSlash: true,
  poweredByHeader: false,
  // Size build workers from available memory instead of CPU count: a full build prerenders ~475 pages, each worker
  // loads Payload, and on a memory-constrained machine the CPU-count default was killed by the OOM killer.
  experimental: { memoryBasedWorkersCount: true },
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

/**
 * Security headers.
 *
 * The CSP is static rather than nonce-based. Next's nonce recipe requires dynamic rendering on every page that
 * carries one; this site prerenders 1,083 pages with `revalidate: false`, so nonces would trade the whole static
 * build for a directive. The cost is `'unsafe-inline'` on scripts — Next's own hydration bootstrap is inline and
 * its content varies per page, so neither a nonce nor a hash can cover it without going dynamic. Everything else
 * is locked: no eval, no plugins, no framing, no third-party origins except the two Turnstile needs.
 *
 * Origins: Cloudflare Turnstile serves the bot-check script and runs it in an iframe; Supabase is the customer
 * portal's magic-link auth, read from the one sanctioned public-env module. Media is served through Payload's own
 * route (`images.localPatterns` above), so images stay same-origin.
 */
const TURNSTILE = "https://challenges.cloudflare.com";
const supabaseOrigin = publicEnv.SUPABASE_URL ? new URL(publicEnv.SUPABASE_URL).origin : "";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${TURNSTILE}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${supabaseOrigin ? ` ${supabaseOrigin}` : ""}`,
  `frame-src ${TURNSTILE}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Nothing here needs a device sensor, a payment handler or a camera; the site asks for none of them. */
const permissionsPolicy = ["accelerometer", "autoplay", "camera", "display-capture", "encrypted-media", "geolocation", "gyroscope", "magnetometer", "microphone", "midi", "payment", "picture-in-picture", "usb", "xr-spatial-tracking"]
  .map((f) => `${f}=()`)
  .join(", ");

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
];

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
  return [
    ...entries.map((entry) => (entry.headers.some((h) => h.key === "Critical-CH") ? { ...entry, source: "/admin/:path*" } : entry)),
    { source: "/:path*", headers: securityHeaders },
    // The admin is Payload's own bundle: authenticated, noindex, and it loads what it needs to render a CMS.
    // The site's CSP is written for the public pages and is applied to everything except that subtree.
    { source: "/((?!admin).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
  ];
};

export default config;
