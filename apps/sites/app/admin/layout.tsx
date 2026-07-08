import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getHubLoginUrl } from "@/lib/hub";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata = { title: "Admin — BuildRail Sites" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware.ts handles the primary redirect; this is defence-in-depth.
  if (!user) redirect(getHubLoginUrl("/admin"));

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-10 border-b border-rim bg-carbon bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-chalk">
              BuildRail <span className="text-orange">Sites</span>
            </span>
            <span className="text-wire">/</span>
            <span className="text-sm font-semibold text-orange">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-fog sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">{children}</main>
    </div>
  );
}
