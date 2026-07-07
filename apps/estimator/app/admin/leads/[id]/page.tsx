import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { ContactToggle } from "@/components/admin/ContactToggle";
import type { Database } from "@/types/supabase";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const SCOPE_COLORS: Record<string, string> = {
  Remodel:    "bg-[var(--steel)]/15 text-[var(--steel-light)]",
  Addition:   "bg-[var(--amber)]/15 text-[var(--amber)]",
  "New Build": "bg-[var(--success)]/15 text-[var(--success)]",
};

const SOURCE_LABELS: Record<string, string> = {
  "instant-estimate":    "Instant Estimate",
  "buildrail-main-site": "BuildRail.com",
  "buildrail-sites":     "BuildRail Sites",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return { title: "Lead Detail — BuildRail Admin" };
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const lead = data as Database["public"]["Tables"]["leads"]["Row"];

  const midpoint = Math.round((lead.estimate_min + lead.estimate_max) / 2);

  return (
    <div className="mx-auto max-w-2xl">
      {/* ── Back link ───────────────────────────────────────────────────── */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--slate)] transition-colors hover:text-[var(--white)]"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All leads
      </Link>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--white)]">{lead.name}</h1>
          <p className="mt-1 text-sm text-[var(--slate)]">Submitted {fmtDate(lead.created_at)}</p>
        </div>

        {/* Scope badge */}
        {lead.scope && (
          <span
            className={[
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
              SCOPE_COLORS[lead.scope] ?? "bg-white/10 text-[var(--white-dim)]",
            ].join(" ")}
          >
            {lead.scope}
          </span>
        )}
      </div>

      {/* ── Contact card ────────────────────────────────────────────────── */}
      <section className="mt-8 rounded-2xl border border-white/[0.06] bg-[var(--navy-light)] p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--slate)]">
          Contact
        </h2>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[var(--slate)]">Email</dt>
            <dd>
              <a
                href={`mailto:${lead.email}`}
                className="text-sm font-medium text-[var(--amber)] hover:underline"
              >
                {lead.email}
              </a>
            </dd>
          </div>
          {lead.phone && (
            <div>
              <dt className="text-xs text-[var(--slate)]">Phone</dt>
              <dd>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-sm font-medium text-[var(--white)] hover:text-[var(--amber)]"
                >
                  {lead.phone}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-[var(--slate)]">Source</dt>
            <dd className="text-sm text-[var(--white-dim)]">
              {SOURCE_LABELS[lead.source] ?? lead.source}
            </dd>
          </div>
        </dl>

        {/* Mark as contacted */}
        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <ContactToggle leadId={lead.id} contactedAt={lead.contacted_at} />
        </div>
      </section>

      {/* ── Estimate range ──────────────────────────────────────────────── */}
      <section className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--slate)]">
          Estimated project cost
        </p>
        <p className="mt-3 text-4xl font-bold tracking-tight text-amber-400 sm:text-5xl">
          {fmt(lead.estimate_min)}
          <span className="mx-2 font-light opacity-40">–</span>
          {fmt(lead.estimate_max)}
        </p>
        <p className="mt-2 text-sm text-[var(--slate)]">
          Midpoint <span className="font-semibold text-[var(--white-dim)]">{fmt(midpoint)}</span>
        </p>
      </section>

      {/* ── Project details ─────────────────────────────────────────────── */}
      <section className="mt-6 rounded-2xl border border-white/[0.06] bg-[var(--navy-light)] p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--slate)]">
          Project answers
        </h2>
        <dl className="space-y-3">
          {[
            { label: "Project type",   value: lead.scope },
            { label: "Square footage", value: lead.size },
            { label: "Finish level",   value: lead.finish },
          ].map(({ label, value }) =>
            value ? (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-[var(--slate)]">{label}</dt>
                <dd className="text-sm font-medium text-[var(--white)]">{value}</dd>
              </div>
            ) : null
          )}

          {lead.remodel_rooms && lead.remodel_rooms.length > 0 && (
            <div className="flex items-start justify-between gap-4">
              <dt className="text-sm text-[var(--slate)]">Spaces</dt>
              <dd className="text-right text-sm font-medium text-[var(--white)]">
                {lead.remodel_rooms.join(", ")}
              </dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  );
}
