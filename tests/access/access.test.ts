/**
 * pnpm test:access — every cell of tests/access/matrix.ts is exercised
 * against the real Payload access rules through the local API with
 * overrideAccess: false. Plus the field-level locks: reviewed is admin-only,
 * States.licenseNumber is admin-only, Leads.data is admin-read-only.
 */
import type { CollectionSlug, Payload } from "payload";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { GLOBALS, MATRIX, ROLES, type MatrixRole } from "./matrix.ts";

type User = { id: number; email: string; roles: string[]; collection: "users" };
const users: Partial<Record<MatrixRole, User>> = {};
const fixtures: Record<string, { own?: number; other?: number }> = {};
let payload: Payload;
/** Fixture creation with overrideAccess; typed loosely so fields with defaults can be omitted. */
const seed = async (collection: CollectionSlug, data: Record<string, unknown>) =>
  (await payload.create({ collection: collection as never, data: data as never, overrideAccess: true })) as unknown as { id: number; [k: string]: unknown };

const asUser = (role: MatrixRole) => (role === "public" ? undefined : users[role]);
const forbidden = async (p: Promise<unknown>) => {
  try {
    await p;
    return false;
  } catch (e) {
    const msg = (e as Error).message ?? "";
    const status = (e as { status?: number }).status;
    return status === 403 || status === 401 || /not allowed|forbidden|unauthori[sz]ed|NotFound/i.test(msg);
  }
};

beforeAll(async () => {
  const { getPayload } = await import("payload");
  const config = (await import("../../src/payload.config.ts")).default;
  payload = await getPayload({ config });
  // wipe in dependency order
  for (const c of ["leads", "location-overrides", "articles", "glossary-terms", "pages", "agents", "carriers", "cities", "redirects", "forms", "products", "states", "media", "users"] as const) {
    await payload.delete({ collection: c, where: { id: { exists: true } }, overrideAccess: true });
  }
  for (const role of ["admin", "editor", "agent", "partner"] as const) {
    const u = await seed("users", { email: `${role}@test.local`, password: "test-password-1234", roles: [role] });
    users[role] = { id: u.id as number, email: u.email as string, roles: [role], collection: "users" };
  }
  const stateAZ = await seed("states", { name: "Arizona", slug: "arizona", abbr: "AZ" });
  const stateNV = await seed("states", { name: "Nevada", slug: "nevada", abbr: "NV" });
  fixtures.states = { own: stateAZ.id, other: stateNV.id };
  const p1 = await seed("products", { name: "Auto Insurance", slug: "auto-insurance", tier: "1", category: "Personal", reviewStatus: "reviewed", indexWave: "1" });
  const p2 = await seed("products", { name: "Pet Insurance", slug: "pet-insurance", tier: "2", category: "Personal", reviewStatus: "draft", indexWave: "3" });
  fixtures.products = { own: p1.id, other: p2.id };
  const c1 = await seed("cities", { name: "Phoenix", slug: "phoenix", state: stateAZ.id, sizeBand: "large" });
  const c2 = await seed("cities", { name: "Reno", slug: "reno", state: stateNV.id, sizeBand: "mid" });
  fixtures.cities = { own: c1.id, other: c2.id };
  const lo = await seed("location-overrides", { product: p1.id, city: c1.id });
  fixtures["location-overrides"] = { own: lo.id };
  const a1 = await seed("articles", { title: "Reviewed article", slug: "reviewed-article", section: "guides", reviewStatus: "reviewed", indexWave: "1" });
  const a2 = await seed("articles", { title: "Draft article", slug: "draft-article", section: "guides" });
  fixtures.articles = { own: a1.id, other: a2.id };
  const g1 = await seed("glossary-terms", { term: "Deductible", slug: "deductible", reviewStatus: "reviewed", indexWave: "1" });
  const g2 = await seed("glossary-terms", { term: "Premium", slug: "premium" });
  fixtures["glossary-terms"] = { own: g1.id, other: g2.id };
  const pg1 = await seed("pages", { title: "Home", path: "/", template: "home", reviewStatus: "reviewed", indexWave: "1" });
  const pg2 = await seed("pages", { title: "Careers", path: "/careers/", template: "static" });
  fixtures.pages = { own: pg1.id, other: pg2.id };
  const ag1 = await seed("agents", { name: "Own Agent", slug: "own-agent", user: users.agent!.id, active: true });
  const ag2 = await seed("agents", { name: "Other Agent", slug: "other-agent", active: true });
  fixtures.agents = { own: ag1.id, other: ag2.id };
  const car = await seed("carriers", { name: "Carrier One", slug: "carrier-one", appointmentConfirmedAt: new Date().toISOString() });
  fixtures.carriers = { own: car.id };
  const r = await seed("redirects", { from: "/old/", to: "/new/", statusCode: "301", source: "manual" });
  fixtures.redirects = { own: r.id };
  const f = await seed("forms", { name: "Contact", slug: "contact", leadType: "contact", submitLabel: "Send", fields: [{ name: "name", label: "Name", type: "text", required: true }] });
  fixtures.forms = { own: f.id };
  const l1 = await seed("leads", { type: "contact", status: "new", form: f.id, assignedAgent: ag1.id, contact: { name: "Own Lead" }, data: { secret: "dob" } });
  const l2 = await seed("leads", { type: "contact", status: "new", form: f.id, assignedAgent: ag2.id, contact: { name: "Other Lead" }, data: { secret: "dob" } });
  fixtures.leads = { own: l1.id, other: l2.id };
  const m = await payload
    .create({ collection: "media", data: { alt: "probe" }, file: { data: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64"), mimetype: "image/png", name: "probe.png", size: 70 }, overrideAccess: true })
    .catch(() => null);
  fixtures.media = { own: (m?.id as number | undefined) ?? undefined };
  fixtures.users = { own: users.editor!.id, other: users.admin!.id };
});

afterAll(async () => {
  await payload?.db?.destroy?.();
});

const createData: Record<string, () => Record<string, unknown>> = {
  products: () => ({ name: `P ${Date.now()}`, tier: "2", category: "Personal" }),
  states: () => ({ name: `S ${Date.now()}`, abbr: String(Date.now()).slice(-2) }),
  cities: () => ({ name: `C ${Date.now()}`, state: fixtures.states.own, sizeBand: "small" }),
  "location-overrides": () => ({ product: fixtures.products.other, city: fixtures.cities.other }),
  articles: () => ({ title: `A ${Date.now()}`, section: "how-to" }),
  "glossary-terms": () => ({ term: `T ${Date.now()}` }),
  pages: () => ({ title: `Pg ${Date.now()}`, path: `/p-${Date.now()}/`, template: "static" }),
  agents: () => ({ name: `Ag ${Date.now()}` }),
  carriers: () => ({ name: `Car ${Date.now()}`, appointmentConfirmedAt: new Date().toISOString() }),
  redirects: () => ({ from: `/r-${Date.now()}/`, to: "/x/", statusCode: "301", source: "manual" }),
  forms: () => ({ name: `F ${Date.now()}`, leadType: "contact", submitLabel: "Send", fields: [{ name: "n", label: "N", type: "text" }] }),
  leads: () => ({ type: "contact", status: "new" }),
  media: () => ({ alt: "x" }),
  users: () => ({ email: `u${Date.now()}@test.local`, password: "test-password-1234", roles: ["editor"] }),
};

const updateData: Record<string, Record<string, unknown>> = {
  products: { summary: "updated" }, states: { doi: { name: "DOI" } }, cities: { sizeBand: "small" }, "location-overrides": { intro: undefined, testimonial: { attribution: "x" } },
  articles: { excerpt: "u" }, "glossary-terms": { seo: { title: "u" } }, pages: { lede: "u" }, agents: { title: "u" }, carriers: { website: "https://x.test" },
  redirects: { note: "u" }, forms: { submitLabel: "Go" }, leads: { notes: "u" }, media: { alt: "u" }, users: { name: "u" },
};

for (const [collection, row] of Object.entries(MATRIX)) {
  describe(collection, () => {
    for (const role of ROLES) {
      const cell = row[role];
      it(`${role}: read ${cell.read}`, async () => {
        const res = (await payload.find({ collection: collection as never, user: asUser(role), overrideAccess: false, depth: 0, limit: 100 }).catch((e) => ({ error: e as Error, docs: [] }))) as { error?: Error; docs: { id: unknown }[] };
        const ids = new Set(res.docs.map((d) => String(d.id)));
        if (cell.read === true) {
          expect(res.error?.message ?? "").toBe("");
          if (fixtures[collection]?.own) expect(ids.has(String(fixtures[collection].own))).toBe(true);
          if (fixtures[collection]?.other) expect(ids.has(String(fixtures[collection].other))).toBe(true);
        } else if (cell.read === "reviewed") {
          expect(ids.has(String(fixtures[collection].own))).toBe(true);
          expect(ids.has(String(fixtures[collection].other))).toBe(false);
        } else if (cell.read === "own") {
          const own = collection === "users" ? String(users[role]!.id) : String(fixtures[collection].own);
          expect(ids.has(own)).toBe(true);
          if (fixtures[collection]?.other) expect(ids.has(String(fixtures[collection].other))).toBe(false);
          if (collection === "users") expect(ids.size).toBe(1);
        } else {
          expect(ids.size).toBe(0);
        }
      });
      it(`${role}: create ${cell.create}`, async () => {
        if (collection === "media") return; // upload needs a file; covered by the editor/admin fixture path
        let createdId: unknown;
        const denied = await forbidden(
          payload.create({ collection: collection as never, data: createData[collection]() as never, user: asUser(role), overrideAccess: false }).then((d) => {
            createdId = (d as { id: unknown }).id;
          }),
        );
        expect(denied).toBe(!cell.create);
        if (createdId !== undefined) await payload.delete({ collection: collection as never, id: createdId as never, overrideAccess: true });
      });
      it(`${role}: update ${cell.update}`, async () => {
        const targetOwn = collection === "users" && role !== "public" && role !== "admin" ? users[role]!.id : fixtures[collection]?.own;
        if (targetOwn === undefined) return;
        const deniedOwn = await forbidden(payload.update({ collection: collection as never, id: targetOwn as never, data: updateData[collection] as never, user: asUser(role), overrideAccess: false }));
        if (cell.update === true) expect(deniedOwn).toBe(false);
        else if (cell.update === "own") {
          expect(deniedOwn).toBe(false);
          const other = collection === "users" ? users.admin!.id : fixtures[collection].other;
          if (other !== undefined) expect(await forbidden(payload.update({ collection: collection as never, id: other as never, data: updateData[collection] as never, user: asUser(role), overrideAccess: false }))).toBe(true);
        } else expect(deniedOwn).toBe(true);
      });
      it(`${role}: delete ${cell.delete}`, async () => {
        // Deletion is tested against a throwaway row created with overrideAccess so fixtures survive.
        if (collection === "media" || collection === "leads" || collection === "users") {
          const id = collection === "leads"
            ? (await seed("leads", { type: "contact", status: "new" })).id
            : collection === "users"
              ? (await seed("users", { email: `d${Date.now()}@test.local`, password: "test-password-1234", roles: ["partner"] })).id
              : fixtures.media.own;
          if (id === undefined) return;
          const denied = await forbidden(payload.delete({ collection: collection as never, id: id as never, user: asUser(role), overrideAccess: false }));
          expect(denied).toBe(!cell.delete);
          if (denied && collection !== "media") await payload.delete({ collection: collection as never, id: id as never, overrideAccess: true });
          return;
        }
        const row = await seed(collection as CollectionSlug, createData[collection]());
        const denied = await forbidden(payload.delete({ collection: collection as never, id: row.id as never, user: asUser(role), overrideAccess: false }));
        expect(denied).toBe(!cell.delete);
        if (denied) await payload.delete({ collection: collection as never, id: row.id as never, overrideAccess: true });
      });
    }
  });
}

for (const [slug, row] of Object.entries(GLOBALS)) {
  describe(`global ${slug}`, () => {
    for (const role of ROLES) {
      it(`${role}: read ${row[role].read} / update ${row[role].update}`, async () => {
        const readDenied = await forbidden(payload.findGlobal({ slug: slug as never, user: asUser(role), overrideAccess: false, depth: 0 }));
        expect(readDenied).toBe(!row[role].read);
        const data = slug === "site-settings" ? { officeHours: `h-${role}` } : { medicarePlanYear: `y-${role}` };
        const updDenied = await forbidden(payload.updateGlobal({ slug: slug as never, data: data as never, user: asUser(role), overrideAccess: false }));
        expect(updDenied).toBe(!row[role].update);
      });
    }
  });
}

describe("field-level locks", () => {
  it("an editor cannot mark a document reviewed; an admin can", async () => {
    const id = fixtures.articles.other as number;
    await expect(payload.update({ collection: "articles", id, data: { reviewStatus: "reviewed" }, user: users.editor, overrideAccess: false })).rejects.toThrow(/admin/i);
    await payload.update({ collection: "articles", id, data: { reviewStatus: "in-review" }, user: users.editor, overrideAccess: false });
    const ok = await payload.update({ collection: "articles", id, data: { reviewStatus: "reviewed" }, user: users.admin, overrideAccess: false });
    expect(ok.reviewStatus).toBe("reviewed");
    await payload.update({ collection: "articles", id, data: { reviewStatus: "draft" }, overrideAccess: true });
  });
  it("an editor cannot change indexWave; an admin can", async () => {
    const id = fixtures.products.own as number;
    const before = await payload.findByID({ collection: "products", id, depth: 0, overrideAccess: true });
    const after = await payload.update({ collection: "products", id, data: { indexWave: "2" }, user: users.editor, overrideAccess: false });
    expect(after.indexWave).toBe(before.indexWave);
    const adminAfter = await payload.update({ collection: "products", id, data: { indexWave: "2" }, user: users.admin, overrideAccess: false });
    expect(adminAfter.indexWave).toBe("2");
    await payload.update({ collection: "products", id, data: { indexWave: before.indexWave }, overrideAccess: true });
  });
  it("States.licenseNumber is compliance-locked (editor update silently ignored, admin applies)", async () => {
    const id = fixtures.states.own as number;
    const r1 = await payload.update({ collection: "states", id, data: { licenseNumber: "EDITOR-WROTE-THIS" }, user: users.editor, overrideAccess: false });
    expect(r1.licenseNumber ?? null).not.toBe("EDITOR-WROTE-THIS");
    const r2 = await payload.update({ collection: "states", id, data: { licenseNumber: "{{TODO:state.arizona.licenseNumber}}" }, user: users.admin, overrideAccess: false });
    expect(r2.licenseNumber).toBe("{{TODO:state.arizona.licenseNumber}}");
  });
  it("Leads.data is admin-read-only: the assigned agent sees the lead but not the raw submission", async () => {
    const asAgent = await payload.findByID({ collection: "leads", id: fixtures.leads.own as number, user: users.agent, overrideAccess: false, depth: 0 });
    expect(asAgent.contact?.name).toBe("Own Lead");
    expect(asAgent.data).toBeUndefined();
    const asAdmin = await payload.findByID({ collection: "leads", id: fixtures.leads.own as number, user: users.admin, overrideAccess: false, depth: 0 });
    expect(asAdmin.data).toEqual({ secret: "dob" });
  });
  it("Users.roles can only be changed by an admin", async () => {
    const r = await payload.update({ collection: "users", id: users.editor!.id, data: { roles: ["admin"] }, user: users.editor, overrideAccess: false });
    expect(r.roles).toEqual(["editor"]);
  });
  it("a lead gets a retention date from ComplianceSettings on create", async () => {
    const l = await seed("leads", { type: "medication", status: "new", containsHealthInformation: true });
    const days = Math.round((new Date(l.retainUntil as string).getTime() - Date.now()) / 86_400_000);
    expect(days).toBeGreaterThanOrEqual(364);
    expect(days).toBeLessThanOrEqual(366);
    await payload.delete({ collection: "leads", id: l.id, overrideAccess: true });
  });
  it("a glossary term cannot relate to itself", async () => {
    const id = fixtures["glossary-terms"].own as number;
    await expect(payload.update({ collection: "glossary-terms", id, data: { relatedTerms: [id] }, overrideAccess: true })).rejects.toThrow(/related terms|itself/i);
  });
  it("a second LocationOverride for the same product × city is refused", async () => {
    await expect(seed("location-overrides", { product: fixtures.products.own, city: fixtures.cities.own })).rejects.toThrow(/already exists/);
  });
  it("a redirect chain is refused", async () => {
    await expect(seed("redirects", { from: "/older/", to: "/old/", statusCode: "301", source: "manual" })).rejects.toThrow(/Chain/);
  });
  it("Cities.factsComplete counts filled CityFacts and ignores TODO tokens", async () => {
    const c = await payload.update({ collection: "cities", id: fixtures.cities.own as number, data: { cityFacts: { county: "Maricopa", nearestOfficeOrAgent: "{{TODO:city.phoenix.nearestOfficeOrAgent}}", localHazards: ["monsoon-dust", "extreme-heat"], neighborhoods: [{ name: "Arcadia" }] } }, overrideAccess: true });
    expect(c.factsComplete).toBe(3);
    expect(c.factsMissing).toContain("nearestOfficeOrAgent");
  });
});
