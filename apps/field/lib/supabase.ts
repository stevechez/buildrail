import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Missing Supabase env vars. Copy .env.local.example → .env.local and fill in your project URL and anon key."
  );
}

/**
 * Browser/client-side Supabase client. Subject to RLS as the `anon` role.
 *
 * Deliberately @supabase/ssr's createBrowserClient, NOT
 * @supabase/supabase-js's plain createClient. The plain client stores the
 * session (and the PKCE code_verifier used during magic-link sign-in) in
 * localStorage; createSupabaseServerClient / middleware read the session
 * from cookies instead. Using the plain client here means
 * /auth/callback's exchangeCodeForSession() can never find the matching
 * code_verifier — the exchange silently fails, no session cookie gets set,
 * and you get bounced straight back to /login after clicking the magic
 * link. See /AI/12-DECISIONS.md.
 */
export const supabase = createBrowserClient<Database>(url, key);
