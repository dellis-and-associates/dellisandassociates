import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "../env.ts";
import { db } from "./content.ts";

/** Payload session (partner track: users with the partner or agent role). */
export async function currentUser() {
  const payload = await db();
  const h = await headers();
  const { user } = await payload.auth({ headers: h });
  return user ?? null;
}

/** Supabase Auth session (customer track: magic link on Project A; no app tables, RLS-on by policy). */
export async function supabaseServer() {
  const jar = await cookies();
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll: (list) => {
        try {
          for (const c of list) jar.set(c.name, c.value, c.options);
        } catch {
          /* called from a Server Component render: cookies are read-only there; the route handler sets them */
        }
      },
    },
  });
}

export async function customerEmail(): Promise<string | null> {
  const sb = await supabaseServer();
  const { data } = await sb.auth.getUser();
  return data.user?.email ?? null;
}
