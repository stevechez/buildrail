import { requireCurrentProfile } from "@/lib/current-profile";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireCurrentProfile();

  return (
    <div className="flex min-h-screen bg-[var(--slate-950)]">
      <Sidebar organizationName={profile.organizationName} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
