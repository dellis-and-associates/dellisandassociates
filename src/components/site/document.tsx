import type { ReactNode } from "react";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { Vitals } from "./vitals.tsx";

/** The document shell shared by the frontend layout and the global not-found page. */
export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout: a plain <head> is the documented way to add a preload link; next/head is the Pages Router API. */}
      <head>
        {/* Only the heading face is preloaded: the h1 is the LCP element on every template and swaps as soon as Archivo lands. The serif body face is font-display: optional (fonts.css), so it never delays the largest paint. */}
        <link rel="preload" href="/fonts/archivo-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* The entrance animation hides elements until they scroll in, so it is gated on this flag: no JavaScript, no hiding.
            The failsafe drops the flag if the observer never mounts (a hydration error, a blocked chunk), so a broken build
            shows the copy rather than a blank band. Reveal sets data-reveal-ready when it mounts. */}
        <script dangerouslySetInnerHTML={{ __html: 'var d=document.documentElement;d.dataset.js="1";setTimeout(function(){if(!d.dataset.revealReady)delete d.dataset.js},2500)' }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Vitals />
      </body>
    </html>
  );
}
