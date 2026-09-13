import type { Metadata, Viewport } from "next";
import "./globals.css";
import { env } from "@/src/env";
import { Document } from "@/src/components/site/document";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Desert Peak Insurance", template: "%s — Desert Peak Insurance" },
  description: "Independent insurance agency in Arizona, Nevada, Utah and Idaho. We compare the carriers we represent and tell you what we find.",
  icons: { icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }, { url: "/brand/icon-32.png", sizes: "32x32" }], apple: "/brand/icon-180.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, colorScheme: "light" };

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}
