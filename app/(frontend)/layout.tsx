import type { Metadata, Viewport } from "next";
import "./globals.css";
import { env } from "@/src/env";
import { Document } from "@/src/components/site/document";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Desert Peak Insurance", template: "%s — Desert Peak Insurance" },
  description: "Independent insurance agency in Arizona, Nevada, Utah and Idaho. We compare the carriers we represent and tell you what we find.",
  // Favicon: Daniel's badge (desert-peak-brand/brand/logo/daniel-refined/logo-mark.svg). favicon.svg and the 16/32 ICO entries are
  // the badge redrawn on a coarser grid (ring 28, saguaro 36 of 400) so every element survives one or two pixels; 48 and up are the
  // lockup's own badge on a paper tile (scripts in DECISIONS.md, "Brand: Daniel's badge"). Every route also gets an OG image: routes
  // that use pageMetadata() render their own from the badge template (src/lib/og.tsx); this default covers the rest.
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
  manifest: "/manifest.webmanifest",
  openGraph: { siteName: "Desert Peak Insurance", type: "website", images: [{ url: "/og/image.png", width: 1200, height: 630, alt: "Desert Peak Insurance" }] },
  twitter: { card: "summary_large_image", images: ["/og/image.png"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light" };

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}
