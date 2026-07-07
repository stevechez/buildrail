import Link from "next/link";
import { Inbox, FileText, FolderKanban, LayoutDashboard, Users } from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/messages", label: "Messages", icon: Inbox },
  { href: "/dashboard/change-orders", label: "Change Orders", icon: FileText },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/team", label: "Team", icon: Users },
];

export function Sidebar({ organizationName }: { organizationName: string }) {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-white/5 bg-white/[0.015] px-4 py-6">
      <div className="px-2 pb-8">
        <p className="font-[Space_Grotesk] text-sm font-semibold text-[var(--white)]">
          Build<span className="text-seafoam">Rail</span> Field
        </p>
        <p className="mt-0.5 truncate text-xs text-muted">{organizationName}</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-all duration-150 ease-in-out hover:bg-white/5 hover:text-white"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-all duration-150 ease-in-out hover:bg-white/5 hover:text-white"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
