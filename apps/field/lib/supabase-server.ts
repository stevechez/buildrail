import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@buildrail/database";
import type { Database } from "@/types/supabase";

/**
 * Cookie-aware Supabase client for Server Components, Server Actions, and
 * Route Handlers in the authenticated dashboard. Runs as the logged-in
 * office user, so RLS (`is_org_member()`/`is_org_admin()`) scopes every
 * query to their org.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerSupabaseClient<Database>(cookieStore);
}
