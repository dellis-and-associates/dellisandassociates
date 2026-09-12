/**
 * pnpm seed [--dry-run] [--only=products,states,...] [--allow-production]
 *
 * Idempotent and non-destructive (hard rule 6). Every document is upserted by
 * its slug (or path / from). On an existing document the seed only FILLS
 * fields that are empty (null, "", [], or a {{TODO:…}} token); a field that
 * already holds a different value is reported as a conflict and left alone.
 * Article and glossary shells are created as reviewStatus draft and never
 * touched again beyond structural fields. Nothing here ever sets `reviewed`.
 * Legacy URLs from inputs/legacy-crawl.json become Redirects; the ones with
 * no equivalent go to REDIRECTS-UNRESOLVED.md. Prints a reconciliation table.
 * Runs over the direct connection (PAYLOAD_MIGRATING=true via the script).
 * Logs slugs and counts only, never a document's contents.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { CollectionSlug, GlobalSlug, Payload } from "payload";
import { validateEnv } from "../src/env.schema.ts";
import { TODO_TOKEN } from "../src/fields/index.ts";

type Json = Record<string, unknown>;
type Counts = { created: number; updated: number; skipped: number; conflicts: number; conflictList: string[] };
export type SeedReport = Record<string, Counts>;
export type SeedOptions = { dryRun: boolean; only?: Set<string>; root?: string };

const DRY_ID = -1;
const isTodo = (v: unknown) => typeof v === "string" && TODO_TOKEN.test(v);
const isEmpty = (v: unknown): boolean => v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0) || isTodo(v);
const isPlainObject = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v) && !(v instanceof Date);
const relId = (v: unknown): unknown => (isPlainObject(v) && "id" in v ? v.id : v);
const same = (have: unknown, want: unknown): boolean => {
  if (Array.isArray(have) && Array.isArray(want)) return have.length === want.length && have.every((h, i) => same(h, want[i]));
  if (isPlainObject(have) && isPlainObject(want)) return Object.keys(want).every((k) => same(have[k], want[k]));
  return String(relId(have)) === String(relId(want));
};

export async function runSeed(payload: Payload, opts: SeedOptions): Promise<SeedReport> {
  const root = opts.root ?? process.cwd();
  const report: SeedReport = {};
  const counts = (name: string): Counts => (report[name] ??= { created: 0, updated: 0, skipped: 0, conflicts: 0, conflictList: [] });
  const want = (name: string) => !opts.only || opts.only.has(name);
  const readJson = <T,>(rel: string): T => JSON.parse(readFileSync(join(root, rel), "utf8")) as T;
  const log = (m: string) => payload.logger.info(`[seed] ${m}`);

  /**
   * Diff `data` against `existing`, returning the patch of fillable fields and
   * the list of conflicts. Groups recurse; arrays and everything else are leaves.
   */
  const diff = (existing: Json, data: Json, path = ""): { patch: Json; conflicts: string[] } => {
    const patch: Json = {};
    const conflicts: string[] = [];
    for (const [k, w] of Object.entries(data)) {
      const h = existing[k];
      const p = path ? `${path}.${k}` : k;
      if (isPlainObject(w) && !("id" in w)) {
        const sub = diff(isPlainObject(h) ? h : {}, w, p);
        if (Object.keys(sub.patch).length) patch[k] = { ...(isPlainObject(h) ? h : {}), ...sub.patch };
        conflicts.push(...sub.conflicts);
        continue;
      }
      if (isEmpty(w)) continue; // the seed has nothing to say
      if (isEmpty(h)) patch[k] = w;
      else if (!same(h, w)) conflicts.push(p);
    }
    return { patch, conflicts };
  };

  /** One query per collection instead of one per document: everything keyed by the upsert field. */
  const cache = new Map<string, Map<string, Json>>();
  const lookup = async (collection: CollectionSlug, field: string, value: string): Promise<Json | undefined> => {
    const k = `${collection}.${field}`;
    if (!cache.has(k)) {
      const all = (await payload.find({ collection, limit: 0, depth: 0, overrideAccess: true, pagination: false })).docs as unknown as Json[];
      cache.set(k, new Map(all.map((d) => [String(d[field]), d])));
    }
    return cache.get(k)!.get(value);
  };
  /** Run tasks with at most `n` in flight; the migrating pool is 5 wide. */
  const parallel = async <T,>(items: T[], n: number, fn: (item: T) => Promise<unknown>) => {
    const queue = [...items];
    await Promise.all(Array.from({ length: Math.min(n, queue.length) }, async () => {
      while (queue.length) await fn(queue.shift()!);
    }));
  };
  const CONCURRENCY = 4;

  const upsert = async (
    collection: CollectionSlug,
    key: { field: string; value: string },
    data: Json,
    createOnly: Json = {},
    /** When true for an existing row, the seed owns it and may overwrite (used for crawl-sourced redirects, whose map is the source of truth). */
    ownsRow: (existing: Json) => boolean = () => false,
  ): Promise<number> => {
    const c = counts(collection);
    const existing = await lookup(collection, key.field, key.value);
    if (!existing) {
      c.created++;
      if (opts.dryRun) return DRY_ID;
      const doc = await payload.create({ collection, data: { ...data, ...createOnly, [key.field]: key.value } as never, overrideAccess: true, depth: 0 });
      cache.get(`${collection}.${key.field}`)?.set(key.value, doc as unknown as Json);
      return doc.id as number;
    }
    const owned = ownsRow(existing);
    const { patch, conflicts } = diff(existing, data);
    if (owned) for (const f of conflicts) patch[f.split(".")[0]!] = data[f.split(".")[0]!];
    else {
      for (const f of conflicts) c.conflictList.push(`${key.value}: ${f}`);
      c.conflicts += conflicts.length;
    }
    if (Object.keys(patch).length) {
      c.updated++;
      if (!opts.dryRun) await payload.update({ collection, id: existing.id as number, data: patch as never, overrideAccess: true, depth: 0 });
    } else c.skipped++;
    return existing.id as number;
  };

  const upsertGlobal = async (slug: GlobalSlug, data: Json) => {
    const c = counts(`global:${slug}`);
    const existing = (await payload.findGlobal({ slug, depth: 0, overrideAccess: true })) as unknown as Json;
    const { patch, conflicts } = diff(existing, data);
    for (const f of conflicts) c.conflictList.push(f);
    c.conflicts += conflicts.length;
    if (Object.keys(patch).length) {
      c.updated++;
      if (!opts.dryRun) await payload.updateGlobal({ slug, data: patch as never, overrideAccess: true, depth: 0 });
    } else c.skipped++;
  };

  const todo = (key: string) => `{{TODO:${key}}}`;

  // ── Products ──────────────────────────────────────────────────────────
  type P = { name: string; slug: string; tier: "1" | "2"; category: string; parent: string | null; thirdSubpage: string; medicareTouching: boolean };
  const products = readJson<P[]>("src/seed-data/products.json");
  const productId: Record<string, number> = {};
  if (want("products")) {
    await parallel(products, CONCURRENCY, async (p) => {
      productId[p.slug] = await upsert("products", { field: "slug", value: p.slug }, { name: p.name, tier: p.tier, category: p.category, thirdSubpage: p.thirdSubpage, medicareTouching: p.medicareTouching }, { reviewStatus: "draft", indexWave: "1" });
    });
    for (const p of products.filter((x) => x.parent)) {
      const parent = productId[p.parent!];
      if (parent === undefined || parent === DRY_ID || productId[p.slug] === DRY_ID) continue;
      await upsert("products", { field: "slug", value: p.slug }, { parent });
      counts("products").skipped--; // the second pass is part of the same upsert, not a separate document
    }
    log(`products: ${products.length} in seed data`);
  }

  // ── States and cities ─────────────────────────────────────────────────
  type S = { name: string; slug: string; abbr: string; cities: { name: string; slug: string }[] };
  const states = readJson<S[]>("src/seed-data/states.json");
  const cityFacts = readJson<Record<string, { county: string; sizeBand: string }>>("src/seed-data/city-facts.json");
  // Department of Insurance links. NV and UT resolved from the build machine on 2026-09-12;
  // AZ and ID were verified by the client from outside this network the same day (TODO-CLIENT-DATA.md #12, closed).
  const DOI: Record<string, { name: string; url: string }> = {
    arizona: { name: "Arizona Department of Insurance and Financial Institutions", url: "https://difi.az.gov/" },
    nevada: { name: "Nevada Division of Insurance", url: "https://doi.nv.gov/" },
    utah: { name: "Utah Insurance Department", url: "https://insurance.utah.gov/" },
    idaho: { name: "Idaho Department of Insurance", url: "https://doi.idaho.gov/" },
  };
  const stateId: Record<string, number> = {};
  if (want("states")) {
    for (const s of states) {
      stateId[s.slug] = await upsert(
        "states",
        { field: "slug", value: s.slug },
        { name: s.name, abbr: s.abbr, licenseNumber: todo(`state.${s.slug}.licenseNumber`), doi: DOI[s.slug] ?? { name: todo(`state.${s.slug}.doi.name`), url: todo(`state.${s.slug}.doi.url`) } },
      );
    }
  }
  if (want("cities")) {
    for (const s of states) {
      const sid = stateId[s.slug] ?? ((await lookup("states", "slug", s.slug))?.id as number | undefined);
      await parallel(s.cities, CONCURRENCY, async (c) => {
        const ref = cityFacts[c.slug];
        if (!ref) throw new Error(`city-facts.json has no entry for ${c.slug}`);
        await upsert(
          "cities",
          { field: "slug", value: c.slug },
          {
            name: c.name,
            ...(sid === undefined || sid === DRY_ID ? {} : { state: sid }),
            sizeBand: ref.sizeBand,
            cityFacts: {
              county: ref.county,
              nearestOfficeOrAgent: todo(`city.${c.slug}.nearestOfficeOrAgent`),
              housingStock: todo(`city.${c.slug}.housingStock`),
              drivingContext: todo(`city.${c.slug}.drivingContext`),
              notableRegulatory: todo(`city.${c.slug}.notableRegulatory`),
            },
          },
        );
      });
    }
  }

  // ── Pages ─────────────────────────────────────────────────────────────
  type Pg = { title: string; path: string; template: string; legalState: string | null };
  if (want("pages")) {
    await parallel(readJson<Pg[]>("src/seed-data/pages.json"), CONCURRENCY, async (p) => {
      const ls = p.legalState ? stateId[p.legalState] : undefined;
      await upsert("pages", { field: "path", value: p.path }, { template: p.template, ...(ls !== undefined && ls !== DRY_ID ? { legalState: ls } : {}) }, { title: p.title, reviewStatus: "draft", indexWave: "1" });
    });
    // Routes outside the 1,117 plan (src/seed-data/extra-routes.json): utility routes are noindex by template.
    for (const r of readJson<Pg[]>("src/seed-data/extra-routes.json")) {
      await upsert("pages", { field: "path", value: r.path }, { template: r.template }, { title: r.title, reviewStatus: "draft", indexWave: "3" });
    }
  }

  // ── Article and glossary shells ───────────────────────────────────────
  if (want("articles")) {
    await parallel(readJson<{ section: string; slug: string; placeholderTitle: string }[]>("src/seed-data/articles.json"), CONCURRENCY, async (a) => {
      await upsert("articles", { field: "slug", value: a.slug }, { section: a.section }, { title: a.placeholderTitle, reviewStatus: "draft", indexWave: "3", generation: { status: "pending" } });
    });
  }
  if (want("glossary-terms")) {
    await parallel(readJson<{ slug: string; placeholderTerm: string }[]>("src/seed-data/glossary.json"), CONCURRENCY, async (g) => {
      await upsert("glossary-terms", { field: "slug", value: g.slug }, {}, { term: g.placeholderTerm, reviewStatus: "draft", indexWave: "3", generation: { status: "pending" } });
    });
  }

  // ── Forms (legacy parity rows 5, 7, 8 — exact legacy fields) ──────────
  if (want("forms")) {
    const text = (name: string, label: string, extra: Json = {}) => ({ name, label, type: "text", required: false, pii: false, ...extra });
    const contact = [
      text("name", "Full name", { required: true, autocomplete: "name" }),
      text("phone", "Phone", { type: "tel", required: true, autocomplete: "tel", inputmode: "tel", pii: true }),
      text("email", "Email", { type: "email", autocomplete: "email", inputmode: "email", pii: true }),
      { name: "interest", label: "I'm interested in", type: "select", required: false, pii: false, optionsFromProducts: true, options: [{ label: "A full policy review", value: "full-policy-review" }, { label: "Working as an agent", value: "working-as-an-agent" }] },
      text("message", "Anything we should know?", { type: "textarea" }),
    ];
    const intake = [
      text("name", "Full name", { required: true, autocomplete: "name" }),
      text("dateOfBirth", "Date of birth", { type: "date", autocomplete: "bday", pii: true }),
      text("phone", "Phone", { type: "tel", required: true, autocomplete: "tel", inputmode: "tel", pii: true }),
      text("email", "Email", { type: "email", autocomplete: "email", inputmode: "email", pii: true }),
      text("address", "Address", { type: "address", autocomplete: "street-address", pii: true }),
      { name: "interested", label: "Interested in", type: "checkbox-group", required: false, pii: false, optionsFromProducts: true },
      text("householdSize", "Household size", { inputmode: "numeric" }),
      text("currentCoverage", "Current coverage", { type: "textarea" }),
      text("notes", "Notes", { type: "textarea" }),
    ];
    const medication = [
      text("name", "Full name", { required: true, autocomplete: "name" }),
      text("dateOfBirth", "Date of birth", { type: "date", autocomplete: "bday", pii: true }),
      text("phone", "Phone", { type: "tel", required: true, autocomplete: "tel", inputmode: "tel", pii: true }),
      text("pharmacy", "Pharmacy", { pii: true }),
      ...[1, 2, 3, 4, 5].flatMap((n) => [
        text(`medication${n}`, `Medication ${n}`, { pii: true }),
        text(`medication${n}Dosage`, `Medication ${n} dosage`, { pii: true }),
        text(`medication${n}Frequency`, `Medication ${n} frequency`, { pii: true }),
      ]),
      text("allergies", "Allergies", { pii: true }),
      text("notes", "Notes", { type: "textarea", pii: true }),
    ];
    await upsert("forms", { field: "slug", value: "book-a-policy-review" }, { leadType: "contact", collectsHealthInformation: false }, { name: "Book a policy review", submitLabel: "Book a policy review", fields: contact });
    await upsert("forms", { field: "slug", value: "new-client-intake" }, { leadType: "intake", collectsHealthInformation: false }, { name: "New client intake", submitLabel: "Submit intake form", fields: intake });
    await upsert("forms", { field: "slug", value: "medication-intake" }, { leadType: "medication", collectsHealthInformation: true }, { name: "Client medication intake", submitLabel: "Submit medication list", fields: medication });
  }

  // ── Redirects from the legacy crawl ───────────────────────────────────
  if (want("redirects")) {
    type Crawl = { pages: Record<string, { status: number; location?: string }> };
    const crawl = readJson<Crawl>("inputs/legacy-crawl.json");
    const map: Record<string, string> = {
      "/about-us": "/about/",
      "/contact-us": "/contact/",
      "/work-with-us": "/partners/",
      "/agents-resource": "/partners/portal/",
      "/agent-training": "/partners/portal/",
      "/new-client-intake-form": "/forms/new-client-intake/",
      "/medication-intake-form": "/forms/medication-intake/",
      "/medicare-insurance-prescription-drug-form-2": "/forms/medication-intake/",
      "/resources": "/resources/", // same path on the new site: skipped below, never a redirect
      "/insurance-services": "/insurance/",
      "/life-insurance": "/insurance/life-insurance/",
      "/whole-life-insurance": "/insurance/whole-life-insurance/",
      "/term-life-insurance": "/insurance/term-life-insurance/",
      "/iul": "/insurance/indexed-universal-life-insurance/",
      "/annuities": "/insurance/annuities/",
      "/medicare": "/insurance/medicare/",
      "/health-insurance": "/insurance/health-insurance/",
      "/dental-and-vision-insurance": "/insurance/dental-and-vision-insurance/",
      "/dental-and-vision-insurance-2": "/insurance/dental-and-vision-insurance/",
    };
    const gone = new Set(["/feed", "/feed/", "/wp-admin", "/wp-admin/", "/wp-login.php"]);
    const unresolved: { from: string; reason: string; proposed: string }[] = [];
    const seen = new Set<string>(); // /feed and /feed/ normalize to one row
    for (const [path, page] of Object.entries(crawl.pages)) {
      if (path === "/" || path === "/robots.txt" || path === "/sitemap.xml" || path.includes("parity-probe")) continue;
      const from = path.endsWith("/") ? path : `${path}/`;
      if (seen.has(from)) continue;
      seen.add(from);
      if (gone.has(path)) {
        await upsert("redirects", { field: "from", value: from }, { statusCode: "410", source: "legacy-crawl" }, { note: "Dead WordPress path" });
        continue;
      }
      const target = map[path] ?? (page.status === 308 && page.location ? map[page.location] : undefined);
      if (`${path}/` === target) continue; // same path on the new site (legacy /resources → /resources/): no redirect
      if (target) {
        // Crawl-sourced rows follow the map; a row an editor re-sourced as "manual" is left alone.
        await upsert("redirects", { field: "from", value: from }, { to: target, statusCode: "301", source: "legacy-crawl" }, { note: `legacy ${page.status}` }, (row) => row.source === "legacy-crawl");
        continue;
      }
      if (page.status === 200 || page.status === 308) {
        const reason =
          path.startsWith("/agent") ? "Agent-facing section maps to the Phase 4 partner portal; route not defined yet"
          : path.includes("intake-form") || page.location?.includes("intake-form") ? "Intake forms have no route in the IA; adding /forms/* changes the route count and needs a decision"
          : "No equivalent page in the IA";
        const proposed = path.includes("medication") || page.location?.includes("medication") ? "/forms/medication-intake/" : path.includes("intake") ? "/forms/new-client-intake/" : "/partners/ (Phase 4)";
        unresolved.push({ from: path, reason, proposed });
      }
    }
    const lines = [
      "# Legacy URLs without a redirect target",
      "",
      "Generated by `pnpm seed`. Each row is a live legacy URL (200 or 308) that has no",
      "equivalent in the IA. Nothing here is redirected to `/`; a decision is needed.",
      "",
      "| Legacy URL | Why unresolved | Proposed target |",
      "|---|---|---|",
      ...unresolved.map((u) => `| \`${u.from}\` | ${u.reason} | \`${u.proposed}\` |`),
      "",
      "Chains to note: `next.config.ts` still carries the two WordPress `-2` redirects",
      "pointing at the old scaffold pages; they are removed when collection-driven",
      "redirects go live (Phase 6), at which point `/dental-and-vision-insurance-2/`",
      "resolves directly to its final target as seeded here.",
      "",
    ];
    if (!opts.dryRun) writeFileSync(join(root, "REDIRECTS-UNRESOLVED.md"), lines.join("\n"));
    counts("redirects:unresolved").skipped = unresolved.length;
  }

  // ── Globals ───────────────────────────────────────────────────────────
  if (want("site-settings")) {
    // Facts from the legacy crawl (the legacy site wins on facts about the business); TODO-CLIENT-DATA.md #7 keeps them open for the new entity.
    await upsertGlobal("site-settings", {
      name: "Desert Peak Insurance",
      legalName: todo("site.legalName"),
      phone: "801-300-9980",
      phoneHref: "tel:8013009980",
      email: "daniel@dellisandassociates.com",
      social: { facebook: "https://www.facebook.com/people/DEllis-and-Associates/100063451816513/", instagram: "https://www.instagram.com/dellisandassociates/" },
      defaultSeo: { titleSuffix: " — Desert Peak Insurance" },
    });
  }
  if (want("compliance-settings")) {
    await upsertGlobal("compliance-settings", {
      medicareInScope: true,
      medicareTpmoDisclaimer: todo("compliance.medicareTpmoDisclaimer"),
    });
  }

  // ── Referral engine: tenant #1, disabled; programs inactive; every rule row null ──
  if (want("referrals")) {
    const tenantId = await upsert("tenants", { field: "slug", value: "desert-peak" }, { name: "Desert Peak Insurance", agencyDisplayName: "Desert Peak Insurance" }, { referralsEnabled: false });
    if (tenantId !== DRY_ID) {
      const tracks = ["customer", "partner"] as const;
      for (const track of tracks) {
        const c = counts("referral-programs");
        const found = await payload.find({ collection: "referral-programs", where: { and: [{ tenant: { equals: tenantId } }, { track: { equals: track } }] }, limit: 1, depth: 0, overrideAccess: true });
        if (found.totalDocs) c.skipped++;
        else {
          c.created++;
          if (!opts.dryRun)
            await payload.create({
              collection: "referral-programs",
              data: { tenant: tenantId, name: `${track === "customer" ? "Customer" : "Partner"} referral program`, track, active: false, terms: [{ version: "1", effectiveFrom: new Date().toISOString(), text: todo(`referrals.terms.${track}.v1`) }], currentTermsVersion: "1" },
              overrideAccess: true,
            });
        }
      }
      for (const s of states) {
        for (const [track, medicare] of [["customer", false], ["partner", false], ["customer", true]] as const) {
          const c = counts("referral-reward-rules");
          const found = await payload.find({ collection: "referral-reward-rules", where: { and: [{ tenant: { equals: tenantId } }, { stateAbbr: { equals: s.abbr } }, { track: { equals: track } }, { medicareRuleSet: { equals: medicare } }] }, limit: 1, depth: 0, overrideAccess: true });
          if (found.totalDocs) c.skipped++;
          else {
            c.created++;
            if (!opts.dryRun) await payload.create({ collection: "referral-reward-rules", data: { tenant: tenantId, stateAbbr: s.abbr, track, medicareRuleSet: medicare }, overrideAccess: true });
          }
        }
      }
      const c = counts("message-templates");
      const found = await payload.find({ collection: "message-templates", where: { and: [{ tenant: { equals: tenantId } }, { key: { equals: "referee-opt-in" } }] }, limit: 1, depth: 0, overrideAccess: true });
      if (found.totalDocs) c.skipped++;
      else {
        c.created++;
        if (!opts.dryRun)
          await payload.create({
            collection: "message-templates",
            data: {
              tenant: tenantId,
              key: "referee-opt-in",
              version: 1,
              active: true,
              subject: "{{referrerFirstName}} suggested we reach out",
              body: "Hi {{refereeFirstName}},\n\n{{referrerFirstName}} thought {{agencyName}} might be useful to you and asked us to get in touch. We will not call or text unless you say yes.\n\nYes, please contact me: {{acceptUrl}}\nNo thanks: {{declineUrl}}\n\nThis is the only message you will receive from us about this. {{agencyName}} is an independent insurance agency, not an insurer.",
            },
            overrideAccess: true,
          });
      }
    } else {
      counts("referral-programs").created += 2;
      counts("referral-reward-rules").created += states.length * 3;
      counts("message-templates").created += 1;
    }
  }

  return report;
}

export function formatReport(report: SeedReport, dryRun: boolean): string {
  const rows = Object.entries(report).filter(([k]) => k !== "redirects:unresolved");
  const t = [
    `| Collection | created | updated | skipped | conflicts |`,
    `|---|---:|---:|---:|---:|`,
    ...rows.map(([k, c]) => `| ${k} | ${c.created} | ${c.updated} | ${c.skipped} | ${c.conflicts} |`),
  ];
  const tot = rows.reduce((a, [, c]) => ({ created: a.created + c.created, updated: a.updated + c.updated, skipped: a.skipped + c.skipped, conflicts: a.conflicts + c.conflicts }), { created: 0, updated: 0, skipped: 0, conflicts: 0 });
  t.push(`| **total** | **${tot.created}** | **${tot.updated}** | **${tot.skipped}** | **${tot.conflicts}** |`);
  const conflicts = rows.flatMap(([k, c]) => c.conflictList.map((x) => `  ${k} ${x}`));
  const unresolved = report["redirects:unresolved"]?.skipped ?? 0;
  return [`seed ${dryRun ? "(dry run — nothing written)" : "(applied)"}`, ...t, `legacy URLs unresolved: ${unresolved} (REDIRECTS-UNRESOLVED.md)`, ...(conflicts.length ? ["conflicts (left untouched):", ...conflicts] : [])].join("\n");
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { env } = validateEnv(process.env);
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
  if (env.APP_ENV === "production" && !args.includes("--allow-production")) {
    console.error("refusing to seed a production deployment without --allow-production");
    process.exit(1);
  }
  const { getPayload } = await import("payload");
  const config = (await import("../src/payload.config.ts")).default;
  const payload = await getPayload({ config });
  console.log(`target: ${new URL(env.PAYLOAD_DATABASE_URI_DIRECT ?? env.PAYLOAD_DATABASE_URI).host}`);
  const report = await runSeed(payload, { dryRun, only: only ? new Set(only) : undefined });
  console.log(formatReport(report, dryRun));
  await payload.db.destroy?.();
  process.exit(0);
}
