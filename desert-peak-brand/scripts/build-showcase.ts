/**
 * Stage 5.6 — the showcase. One self-contained page (showcase/index.html) presenting the Strata system
 * applied: marks and lockups, the UI reference, social templates, the signature in a mail-client frame,
 * four deck slides, the business card at real proportion, the favicon in a tab-bar mock, OG previews.
 * Every image is a render produced by this repository's generators (copied into showcase/assets and
 * embedded as data URIs); nothing is a stock mockup or a hand-taken screenshot. One positioning line,
 * no agency copy. Printable to PDF. Usage: node scripts/build-showcase.ts
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOGOS, ROOT, TODAY, TOKENS_CSS, bannedGuard, config, dataUri, fontFaceCss, logoInner, logoViewBox, pngSize, sem, writeInventory, type InventoryRow } from "./collateral/lib.ts";

const SHOW = join(ROOT, "showcase");
const ASSETS = join(SHOW, "assets");
mkdirSync(ASSETS, { recursive: true });
const rows: InventoryRow[] = [];
const missing: string[] = [];

/** Copy a generated render into showcase/assets and return an <img> with a data URI. */
function img(relPath: string, alt: string, cls = ""): string {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) { missing.push(relPath); return `<div class="missing">Not rendered: <code>${relPath}</code></div>`; }
  const name = relPath.replace(/\//g, "__");
  copyFileSync(abs, join(ASSETS, name));
  const z = pngSize(abs);
  rows.push({ asset: `showcase/assets/${name}`, dimensions: `${z.w}×${z.h}`, source: `copy of ${relPath}`, notes: "embedded as data URI in index.html" });
  return `<img class="${cls}" src="${dataUri(abs, "image/png")}" width="${z.w}" height="${z.h}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy">`;
}
function logo(name: string, cls = ""): string {
  const vb = logoViewBox(name);
  return `<svg class="${cls}" viewBox="0 0 ${vb.w} ${vb.h}" role="img" aria-label="${name}"><g data-logo="${name}">${logoInner(name)}</g></svg>`;
}
const slides = (deck: string, nums: number[]) => nums.map((n) => `<figure>${img(`decks/renders/${deck}/slide-${String(n).padStart(2, "0")}.png`, `${deck} slide ${n}`)}<figcaption>Slide ${n}</figcaption></figure>`).join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Desert Peak Insurance — Strata, applied</title>
<style>
${fontFaceCss("data")}
${TOKENS_CSS}
*,*::before,*::after{box-sizing:border-box}
html{font-optical-sizing:auto}
body{margin:0;background:var(--dp-surface);color:var(--dp-ink);font-family:var(--dp-font-sans);font-size:var(--dp-text-small-size);line-height:var(--dp-text-small-line-height)}
.wrap{max-width:1160px;margin:0 auto;padding:var(--dp-space-12) var(--dp-space-6) var(--dp-space-24)}
header{display:flex;flex-direction:column;gap:var(--dp-space-6);margin-bottom:var(--dp-space-16)}
header svg{width:280px;height:auto}
h1{font-size:var(--dp-text-display-size);line-height:var(--dp-text-display-line-height);letter-spacing:var(--dp-text-display-letter-spacing);font-weight:var(--dp-text-display-weight);font-stretch:var(--dp-width-display);margin:0;max-width:18ch}
.meta{color:var(--dp-ink-muted);font-size:var(--dp-text-caption-size);letter-spacing:.06em;text-transform:uppercase;font-weight:600}
h2{font-size:var(--dp-text-title-size);line-height:var(--dp-text-title-line-height);letter-spacing:var(--dp-text-title-letter-spacing);font-weight:600;margin:var(--dp-space-16) 0 var(--dp-space-4);padding-top:var(--dp-space-4);border-top:2px solid var(--dp-ink)}
p.note{font-family:var(--dp-font-serif);font-size:var(--dp-text-body-size);line-height:var(--dp-text-body-line-height);max-width:var(--dp-measure-body);color:var(--dp-ink-muted);margin:0 0 var(--dp-space-6)}
.grid{display:grid;gap:var(--dp-space-5);grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.grid.two{grid-template-columns:repeat(auto-fit,minmax(420px,1fr))}
.grid.four{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
figure{margin:0;display:flex;flex-direction:column;gap:var(--dp-space-2)}
figcaption{font-size:var(--dp-text-caption-size);color:var(--dp-ink-muted)}
img,svg{max-width:100%;height:auto;display:block}
.panel{background:var(--dp-surface-raised);border:1px solid var(--dp-border);border-radius:var(--dp-radius-surface);padding:var(--dp-space-6);box-shadow:var(--dp-shadow-0)}
.panel.dark{background:var(--dp-surface-inverse)}
.panel.brand{background:var(--dp-brand)}
.logo-row{display:flex;flex-wrap:wrap;gap:var(--dp-space-8);align-items:center}
.logo-row svg{height:44px;width:auto}
.mail{background:var(--dp-surface-raised);border:1px solid var(--dp-border-strong);border-radius:var(--dp-radius-surface);overflow:hidden;box-shadow:var(--dp-shadow-2);max-width:640px}
.mail .bar{display:flex;gap:6px;padding:10px 12px;background:var(--dp-surface-sunken);border-bottom:1px solid var(--dp-border)}
.mail .bar i{width:10px;height:10px;border-radius:var(--dp-radius-pill);background:var(--dp-border-strong);display:block}
.mail .head{padding:12px 16px;border-bottom:1px solid var(--dp-border);font-size:var(--dp-text-caption-size);color:var(--dp-ink-muted);display:grid;gap:4px}
.mail .head b{color:var(--dp-ink)}
.mail .body{padding:16px;font-family:var(--dp-font-serif);font-size:var(--dp-text-small-size)}
.mail .body img{width:100%;max-width:600px}
.card{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--dp-space-5)}
.card img{aspect-ratio:3.75/2.25;width:100%;box-shadow:var(--dp-shadow-2);border-radius:var(--dp-radius-control)}
.posts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--dp-space-4);align-items:start}
.story{grid-row:span 2}
.stat{display:flex;flex-wrap:wrap;gap:var(--dp-space-8);margin-top:var(--dp-space-6)}
.stat div{display:flex;flex-direction:column}
.stat b{font-size:var(--dp-text-title-lg-size);font-weight:600;letter-spacing:-0.012em;font-variant-numeric:tabular-nums}
.stat span{color:var(--dp-ink-muted);font-size:var(--dp-text-caption-size)}
.missing{padding:var(--dp-space-4);border:1px dashed var(--dp-critical-border);color:var(--dp-critical);border-radius:var(--dp-radius-surface);font-size:var(--dp-text-caption-size)}
footer{margin-top:var(--dp-space-16);color:var(--dp-ink-muted);font-size:var(--dp-text-caption-size)}
@media print{body{background:#FFF0}.wrap{max-width:none;padding:0}h2{break-before:page;margin-top:0}h2:first-of-type{break-before:auto}figure,.panel,.mail,.card{break-inside:avoid}img{box-shadow:none}}
</style>
</head>
<body>
<div class="wrap">
<header>
  ${logo("logo-horizontal.svg")}
  <p class="meta">Strata · applied</p>
  <h1>${config.positioningLine}</h1>
</header>

<h2>Mark and lockups</h2>
<div class="grid">
  <div class="panel"><div class="logo-row">${logo("logo-horizontal.svg")}${logo("mark.svg")}${logo("wordmark.svg")}</div></div>
  <div class="panel dark"><div class="logo-row">${logo("logo-reversed.svg")}</div></div>
  <div class="panel brand"><div class="logo-row">${logo("logo-reversed.svg")}</div></div>
</div>

<h2>Website</h2>
<p class="note">The site's design system reference, generated from the same tokens the site imports. The homepage itself is rendered in the site repository once its build runs; it is not reproduced here by hand.</p>
<div class="grid two">
  <figure>${img("web/ui-elements.png", "UI elements reference")}<figcaption>web/ui-elements.html</figcaption></figure>
  <figure>${img("web/favicons/tests/tab-bars.png", "Favicon on light and dark tab bars")}<figcaption>Favicon at 16 px, light and dark tab bars</figcaption>
    ${img("web/og/samples/product-city.png", "Open Graph image, product × city")}<figcaption>Open Graph image, product × city template</figcaption>
    ${img("web/og/samples/product-medicare.png", "Open Graph image with the disclaimer band")}<figcaption>Open Graph image, health-plan page with the disclaimer band</figcaption></figure>
</div>

<h2>Social</h2>
<div class="posts">
  <figure>${img("social/profile/profile-400.png", "Profile picture")}<figcaption>Profile, 400 px</figcaption></figure>
  <figure>${img("social/profile/profile-reversed-400.png", "Profile picture, reversed")}<figcaption>Profile, reversed</figcaption></figure>
  <figure>${img("social/posts/term/1080x1080/deductible.png", "Term of the week post")}<figcaption>Term of the week</figcaption></figure>
  <figure>${img("social/posts/state-fact/1080x1080/az-auto-minimums.png", "State fact post")}<figcaption>State fact, with source line</figcaption></figure>
  <figure>${img("social/posts/finding/1080x1080/keep-what-you-have.png", "The finding post")}<figcaption>The finding</figcaption></figure>
  <figure>${img("social/posts/seasonal/1080x1080/monsoon.png", "Seasonal post")}<figcaption>Seasonal</figcaption></figure>
  <figure class="story">${img("social/posts/seasonal/1080x1920/open-enrollment-medicare.png", "Story post with the disclaimer band")}<figcaption>Story, open-enrollment variant with the disclaimer band</figcaption></figure>
  <figure>${img("social/posts/term/1080x1350/actual-cash-value.png", "Portrait post")}<figcaption>Portrait feed size</figcaption></figure>
</div>
<div class="grid two" style="margin-top:var(--dp-space-5)">
  <figure>${img("social/banners/linkedin-personal-1584x396.png", "LinkedIn banner")}<figcaption>LinkedIn profile banner, 1584×396</figcaption></figure>
  <figure>${img("social/banners/x-1500x500.png", "X header")}<figcaption>X header, 1500×500</figcaption></figure>
  <figure>${img("social/banners/linkedin-company-1512x256.png", "LinkedIn Page cover")}<figcaption>LinkedIn Page cover, 1512×256</figcaption></figure>
  <figure>${img("social/banners/safe-zone/facebook-820x312-safe-zone.png", "Facebook cover safe-zone overlay")}<figcaption>Facebook cover with the safe-zone overlay</figcaption></figure>
</div>

<h2>Email</h2>
<div class="mail">
  <div class="bar"><i></i><i></i><i></i></div>
  <div class="head"><span><b>From</b> daniel@${config.domain}</span><span><b>Subject</b> Your coverage review</span></div>
  <div class="body">Thanks for sending the declarations pages. The comparison is attached; the short version is that keeping your home policy is the right call and the auto limits are worth raising before the umbrella can be written.<br><br>${img("email/renders/daniel-600.png", "Email signature")}</div>
</div>

<h2>Decks</h2>
<div class="grid four">${slides("client-pitch", [1, 4, 6, 9])}</div>

<h2>Business card</h2>
<div class="card">
  <figure>${img("print/renders/business-card-daniel-front.png", "Business card front")}<figcaption>Front, 3.5 × 2 in with 0.125 in bleed shown</figcaption></figure>
  <figure>${img("print/renders/business-card-daniel-back.png", "Business card back")}<figcaption>Back</figcaption></figure>
</div>

<div class="stat">
  <div><b>1</b><span>token file</span></div>
  <div><b>7</b><span>logo files</span></div>
  <div><b>6</b><span>surfaces</span></div>
  <div><b>0</b><span>colours outside the tokens</span></div>
</div>

<footer>Desert Peak Insurance · Strata, applied · generated ${TODAY} by scripts/build-showcase.ts from the repository's own renders · ${config.domain}</footer>
</div>
</body>
</html>
`;
bannedGuard("showcase/index.html", html.replace(/<style[\s\S]*?<\/style>/, "").replace(/data:[^"]+/g, "").replace(/<[^>]+>/g, " "));
writeFileSync(join(SHOW, "index.html"), html);
rows.push({ asset: "showcase/index.html", dimensions: `${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB, self-contained`, source: "scripts/build-showcase.ts", notes: missing.length ? `missing renders: ${missing.join(", ")}` : "every image is a repository render" });
writeInventory(SHOW, rows);
if (missing.length) console.warn(`build-showcase: ${missing.length} render(s) missing: ${missing.join(", ")}`);
console.log(`build-showcase: showcase/index.html (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB), ${rows.length - 1} embedded renders`);
void sem; void LOGOS;
