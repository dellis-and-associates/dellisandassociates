import config from "@payload-config";
import { getPayload } from "payload";
export const dynamic = "force-dynamic";
export async function POST() {
  const payload = await getPayload({ config });
  return new Response(null, { status: 303, headers: { Location: "/partners/", "Set-Cookie": `${payload.config.cookiePrefix}-token=; Path=/; HttpOnly; Max-Age=0` } });
}
