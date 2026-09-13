import { NextResponse } from "next/server";
import { env } from "@/src/env";
import { supabaseServer } from "@/src/lib/auth";
export const dynamic = "force-dynamic";
export async function POST() {
  const sb = await supabaseServer();
  await sb.auth.signOut().catch(() => null);
  return NextResponse.redirect(new URL("/", env.NEXT_PUBLIC_SITE_URL), 303);
}
