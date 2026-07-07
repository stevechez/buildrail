import { createSupabaseServerClient } from "@/lib/supabase-server";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { Tables } from "@/types/supabase";

export const metadata = { title: "Leads — BuildRail Admin" };

// Revalidate every 60 seconds so the page stays reasonably fresh
// without requiring a full reload on every visit.
export const revalidate = 60;

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-5 py-4 text-sm text-[var(--danger)]">
        Failed to load leads: {error.message}
      </div>
    );
  }

  const leads: Tables<"leads">[] = data ?? [];
  const totalMin = leads.reduce((s, l) => s + l.estimate_min, 0);
  const totalMax = leads.reduce((s, l) => s + l.estimate_max, 0);
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div>
      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--white)]">Leads</h1>
        <p className="mt-1 text-sm text-[var(--slate)]">
          Every completed estimator submission — contact info, project scope, and estimate range.
        </p>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total leads",     value: leads.length.toString() },
          { label: "Pipeline low",    value: fmt(totalMin) },
          { label: "Pipeline high",   value: fmt(totalMax) },
          {
            label: "Avg estimate",
            value: leads.length
              ? fmt(Math.round((totalMin + totalMax) / 2 / leads.length))
              : "—",
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.06] bg-[var(--navy-light)] px-5 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--slate)]">
              {label}
            </p>
            <p className="mt-1.5 text-xl font-bold text-[var(--white)]">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Table ─────────────────────────────────────────────────────── */}
      <LeadsTable leads={leads} />
    </div>
  );
}
