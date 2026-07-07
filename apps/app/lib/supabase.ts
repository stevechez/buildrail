import { createBrowserSupabaseClient } from "@buildrail/database";
import type { Database } from "@/types/supabase";

/**
 * Browser/client-side Supabase client. Subject to RLS as the `anon` role.
 * Honors NEXT_PUBLIC_COOKIE_DOMAIN for shared-session SSO across BuildRail
 * subdomains — see @buildrail/database's resolveCookieDomain.
 */
export const supabase = createBrowserSupabaseClient<Database>();
