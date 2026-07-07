"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { requireMembership } from "@buildrail/auth";
import { ACTIVE_ORG_COOKIE } from "@/lib/current-profile";

/**
 * Switches the user's active organization (docs/platform/
 * identity-foundation.md: "Switch organization"). Validates membership
 * first — requireMembership throws rather than trusting the client-passed
 * organizationId — then stores the selection in a cookie read by
 * lib/current-profile.ts on every subsequent request.
 */
export async function switchOrganization(organizationId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await requireMembership(supabase, user.id, organizationId, () => {
    throw new Error("You don't have access to that organization.");
  });

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_ORG_COOKIE, organizationId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect("/dashboard");
}
