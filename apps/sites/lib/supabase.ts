import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Returns null if env vars are not set so the estimator still renders
// even before Supabase is wired up in this project's Vercel settings.
export const supabase =
  url && key ? createClient(url, key) : null;
