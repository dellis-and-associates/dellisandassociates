import type { Metadata, Viewport } from "next";
import "./globals.css";
import { env } from "@/src/env";
import { Document } from "@/src/components/site/document";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Desert Peak Insurance", template: "%s — Desert Peak Insurance" },
  description: "Independent insurance agency in Arizona, Nevada, Utah and Idaho. We compare the carriers we represent and tell you what we find.",
  // Favicon and app icons are the brand package's own files (desert-peak-brand/web/favicons → public/, byte-identical).
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon.svg", type: "image/svg+xml" }], apple: "/apple-touch-icon.png" },
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light" };

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}
