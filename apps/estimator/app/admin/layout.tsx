import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata = { title: "Admin — BuildRail Instant Estimate" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware handles the primary redirect; this is a defence-in-depth check
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[var(--navy)]">
      {/* Nav bar */}
      <header className="sticky top-0 z-10 border-b border-white/[0.06] bg-[var(--navy-light)]/80 backdrop-blur-md">
        <div className="page-container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[var(--white)]">BuildRail</span>
            <span className="text-white/20">/</span>
            <span className="text-sm font-semibold text-[var(--amber)]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-[var(--slate)] sm:block">
              {user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="page-container py-10">{children}</main>
    </div>
  );
}
