import type { CollectionSlug, PayloadRequest } from "payload";

const idOf = (v: unknown) => (typeof v === "object" && v !== null ? (v as { id: unknown }).id : v);

/** Every related document must belong to the same tenant as the one being written. */
export async function assertSameTenant(req: PayloadRequest, data: Record<string, unknown> | undefined, relations: [field: string, collection: CollectionSlug][]): Promise<void> {
  if (!data?.tenant) return;
  const tenant = String(idOf(data.tenant));
  for (const [field, collection] of relations) {
    const id = idOf(data[field]);
    if (id === undefined || id === null) continue;
    const doc = (await req.payload.findByID({ collection, id: id as number, depth: 0, overrideAccess: true }).catch(() => null)) as { tenant?: unknown } | null;
    if (!doc) throw new Error(`${field}: ${collection} ${String(id)} does not exist`);
    if (String(idOf(doc.tenant)) !== tenant) throw new Error(`${field} belongs to a different tenant`);
  }
}
