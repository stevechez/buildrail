import { createBrowserSupabaseClient } from "@buildrail/database/browser";
import { resolveSupabasePublicConfig } from "@buildrail/database";
import type { Database } from "@/types/supabase";

// Same shared client factory every other BuildRail app uses (see
// @buildrail/database/browser) rather than an app-local createClient call —
// keeps the magic-link/PKCE cookie behavior consistent platform-wide, even
// though apps/sites doesn't currently have any authenticated pages of its
// own. Still resolves to null if env vars aren't set (e.g. a Vercel preview
// without Supabase configured) so public pages keep rendering.
function hasSupabaseConfig() {
  try {
    resolveSupabasePublicConfig();
    return true;
  } catch {
    return false;
  }
}

export const supabase = hasSupabaseConfig()
  ? createBrowserSupabaseClient<Database>()
  : null;
