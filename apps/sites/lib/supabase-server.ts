import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@buildrail/database/server";
import type { Database } from "@/types/supabase";

/**
 * Cookie-aware Supabase client for Server Actions/Route Handlers. apps/sites
 * has no authenticated pages, so in practice every caller here runs as the
 * `anon` role — this is still the shared factory (not a bespoke
 * createClient call) so the client behaves identically to every other
 * BuildRail app if/when this app ever needs a session (e.g. a future staff
 * lead-review dashboard).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerSupabaseClient<Database>(cookieStore);
}
