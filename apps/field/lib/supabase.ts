import { createBrowserSupabaseClient } from "@buildrail/database";
import type { Database } from "@/types/supabase";

/**
 * Browser/client-side Supabase client. Subject to RLS as the `anon` role.
 * See @buildrail/database's createBrowserSupabaseClient for why this must
 * stay createBrowserClient-based, not the plain supabase-js client.
 */
export const supabase = createBrowserSupabaseClient<Database>();
