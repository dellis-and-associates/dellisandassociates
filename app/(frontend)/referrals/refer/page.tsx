import { redirect } from "next/navigation";
import { customerEmail } from "@/src/lib/auth";
import { getProducts } from "@/src/lib/content";
import { pageMetadata } from "@/src/lib/seo";
import { ReferForm } from "@/src/components/site/refer-form";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata({ title: "Refer someone", description: "Refer someone to Desert Peak Insurance.", path: "/referrals/refer/", indexable: false });
export default async function CustomerRefer() {
  if (!(await customerEmail())) redirect("/referrals/login/");
  const products = (await getProducts()).filter((p) => !p.parent);
  return <ReferForm track="customer" products={products.map((p) => ({ slug: p.slug, name: p.name }))} back="/referrals/" />;
}
