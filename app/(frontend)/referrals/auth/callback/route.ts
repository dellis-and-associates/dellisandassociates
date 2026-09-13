import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/src/env";

export const dynamic = "force-dynamic";
/** Exchanges the magic-link code for a session cookie, then lands on the portal. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const res = NextResponse.redirect(new URL(code ? "/referrals/" : "/referrals/login/?error=1", env.NEXT_PUBLIC_SITE_URL), 303);
  if (!code) return res;
  const sb = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: { getAll: () => request.headers.get("cookie")?.split(";").map((c) => { const [name, ...v] = c.trim().split("="); return { name: name ?? "", value: v.join("=") }; }) ?? [], setAll: (list) => { for (const c of list) res.cookies.set(c.name, c.value, c.options); } },
  });
  const { error } = await sb.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/referrals/login/?error=1", env.NEXT_PUBLIC_SITE_URL), 303);
  return res;
}
