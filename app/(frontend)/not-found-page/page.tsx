import { pageMetadata } from "@/src/lib/seo";
import { NotFoundBody } from "@/src/components/site/not-found-body";

export const revalidate = false;
export const metadata = pageMetadata({ title: "Page not found", description: "We could not find that page.", path: "/not-found-page/", indexable: false });
/** The server-rendered 404 body. proxy.ts serves it with a 404 status for any path outside the manifest; hitting it directly is a 200 and it is noindex. (Next reserves /404 itself, hence the name.) */
export default function NotFoundPage() {
  return <NotFoundBody />;
}
