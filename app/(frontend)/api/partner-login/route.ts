import config from "@payload-config";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";
/** Form login for the partner portal: Payload issues the auth cookie; we redirect. Never echoes the password or logs it. */
export async function POST(request: Request) {
  const fd = await request.formData();
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const password = String(fd.get("password") ?? "");
  const payload = await getPayload({ config });
  try {
    const { token, user } = await payload.login({ collection: "users", data: { email, password } });
    if (!token || !user || !user.roles?.some((r) => r === "partner" || r === "agent" || r === "admin")) throw new Error("not a portal role");
    const secure = new URL(request.url).protocol === "https:";
    return new Response(null, { status: 303, headers: { Location: "/partners/portal/", "Set-Cookie": `${payload.config.cookiePrefix}-token=${token}; Path=/; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}; Max-Age=${60 * 60 * 24 * 7}` } });
  } catch {
    return new Response(null, { status: 303, headers: { Location: "/partners/login/?error=1" } });
  }
}
