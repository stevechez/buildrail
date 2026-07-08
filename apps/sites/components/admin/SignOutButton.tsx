"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { getHubUrl } from "@/lib/hub";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await supabase?.auth.signOut();
    router.push(getHubUrl());
  }

  return (
    <button
      onClick={signOut}
      className="rounded-lg border border-rim px-3 py-1.5 text-xs font-medium text-fog hover:border-wire hover:text-chalk"
    >
      Sign out
    </button>
  );
}
