import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

/**
 * Exchanges a Supabase magic-link code for a session, then lands in the
 * dashboard — or back at `returnTo` (another product's URL) if the user
 * arrived here after being bounced from Field/Estimator/SiteVerdict/Vault's
 * middleware. See app/login/page.tsx for where returnTo is set.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnTo = url.searchParams.get("returnTo");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // Surfaced on /login instead of silently landing on a session-less
    // /dashboard (which middleware would just bounce back to /login anyway,
    // with no clue why). Common cause: the browser-side Supabase client
    // isn't cookie-based — see lib/supabase.ts.
    console.error("Magic-link code exchange failed:", error.message);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, req.url));
  }

  // Only honor returnTo if it's a same-origin-looking relative path or a
  // full URL — never redirect somewhere based on unvalidated input beyond
  // that basic shape check.
  if (returnTo && (returnTo.startsWith("/") || returnTo.startsWith("http"))) {
    return NextResponse.redirect(returnTo);
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
