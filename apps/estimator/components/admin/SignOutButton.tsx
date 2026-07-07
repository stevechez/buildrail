"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <button
      onClick={signOut}
      className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[var(--slate)] transition-all duration-150 hover:border-white/20 hover:text-[var(--white)]"
    >
      Sign out
    </button>
  );
}
