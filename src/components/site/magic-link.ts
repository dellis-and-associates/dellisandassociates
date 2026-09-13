"use server";
import { redirect } from "next/navigation";
import { env } from "../../env.ts";
import { supabaseServer } from "../../lib/auth.ts";

/** Supabase Auth magic link (Project A). We never say whether the address exists. */
export async function sendMagicLink(fd: FormData) {
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  if (email) {
    const sb = await supabaseServer();
    await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/referrals/auth/callback/`, shouldCreateUser: true } }).catch(() => null);
  }
  redirect("/referrals/login/?sent=1");
}
