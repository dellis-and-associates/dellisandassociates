import { redirect } from "next/navigation";
import { currentUser } from "@/src/lib/auth";
import { db, getProducts } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { ReferForm } from "@/src/components/site/refer-form";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Refer someone", description: "Refer someone to Desert Peak Insurance.", path: "/partners/portal/refer/", indexable: false });
export default async function Refer() {
  const user = await currentUser();
  if (!user) redirect("/partners/login/");
  const payload = await db();
  const referrer = (await payload.find({ collection: "referrers", where: { user: { equals: user.id } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (!referrer) redirect("/partners/portal/");
  const products = (await getProducts()).filter((p) => !p.parent);
  return <ReferForm track="partner" products={products.map((p) => ({ slug: p.slug, name: p.name }))} back="/partners/portal/" />;
}
