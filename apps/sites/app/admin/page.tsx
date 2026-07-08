import { createSupabaseServerClient } from "@/lib/supabase-server";
import { toggleLeadContacted, updateSiteLeadStatus } from "@/lib/actions/admin";

export const metadata = { title: "Leads — BuildRail Sites Admin" };
export const revalidate = 0;

const STATUS_STYLES: Record<string, string> = {
  new: "bg-orange bg-opacity-10 text-orange border-orange border-opacity-30",
  contacted: "bg-blue-500 bg-opacity-10 text-blue-400 border-blue-500 border-opacity-30",
  won: "bg-jade bg-opacity-10 text-jade border-jade border-opacity-30",
  lost: "bg-red bg-opacity-10 text-red border-red border-opacity-30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        STATUS_STYLES[status] ?? "bg-card text-fog border-rim"
      }`}
    >
      {status}
    </span>
  );
}

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  const [{ data: siteLeads, error: siteLeadsError }, { data: estimateLeads, error: estimateLeadsError }] =
    await Promise.all([
      supabase.from("site_leads").select("*").order("created_at", { ascending: false }),
      supabase
        .from("leads")
        .select("*")
        .ilike("source", "buildrail-sites%")
        .order("created_at", { ascending: false }),
    ]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-black text-chalk">Leads</h1>
        <p className="mt-1 text-sm text-fog">
          Everyone who has submitted the /start form or the /estimate quiz on BuildRail Sites.
        </p>
      </div>

      {/* ── /start business-intake submissions ── */}
      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-silver">
          Business intake ({siteLeads?.length ?? 0})
        </h2>

        {siteLeadsError ? (
          <div className="rounded-xl border border-red border-opacity-30 bg-red bg-opacity-5 px-5 py-4 text-sm text-red">
            Failed to load: {siteLeadsError.message}
          </div>
        ) : !siteLeads || siteLeads.length === 0 ? (
          <p className="text-sm text-fog">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-rim bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rim text-xs uppercase tracking-wide text-fog">
                  <th className="px-4 py-3">Name / business</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Trade</th>
                  <th className="px-4 py-3">Service area</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {siteLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-rim last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-chalk">{lead.full_name}</div>
                      <div className="text-xs text-fog">{lead.business_name}</div>
                    </td>
                    <td className="px-4 py-3 text-silver">
                      {lead.email && <div>{lead.email}</div>}
                      {lead.phone && <div className="text-xs text-fog">{lead.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-silver">{lead.trade}</td>
                    <td className="px-4 py-3 text-silver">{lead.service_area || "—"}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-fog">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(["contacted", "won", "lost"] as const)
                          .filter((s) => s !== lead.status)
                          .map((s) => (
                            <form key={s} action={updateSiteLeadStatus.bind(null, lead.id, s)}>
                              <button
                                type="submit"
                                className="rounded-lg border border-rim px-2 py-1 text-xs text-fog hover:border-wire hover:text-chalk"
                              >
                                Mark {s}
                              </button>
                            </form>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── /estimate instant-estimate submissions ── */}
      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-silver">
          Instant estimate quiz ({estimateLeads?.length ?? 0})
        </h2>
        <p className="mb-4 text-xs text-fog">
          Shared with apps/estimator&apos;s own pipeline — filtered here to submissions sourced from
          BuildRail Sites specifically.
        </p>

        {estimateLeadsError ? (
          <div className="rounded-xl border border-red border-opacity-30 bg-red bg-opacity-5 px-5 py-4 text-sm text-red">
            Failed to load: {estimateLeadsError.message}
          </div>
        ) : !estimateLeads || estimateLeads.length === 0 ? (
          <p className="text-sm text-fog">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-rim bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rim text-xs uppercase tracking-wide text-fog">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Scope</th>
                  <th className="px-4 py-3">Estimate</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Contacted</th>
                </tr>
              </thead>
              <tbody>
                {estimateLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-rim last:border-0">
                    <td className="px-4 py-3 font-semibold text-chalk">{lead.name}</td>
                    <td className="px-4 py-3 text-silver">
                      {lead.email && <div>{lead.email}</div>}
                      {lead.phone && <div className="text-xs text-fog">{lead.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-silver">
                      {[lead.scope, lead.size, lead.finish].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-silver">
                      ${lead.estimate_min.toLocaleString()} – ${lead.estimate_max.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-fog">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <form action={toggleLeadContacted.bind(null, lead.id, !lead.contacted_at)}>
                        <button
                          type="submit"
                          className={`rounded-lg border px-2 py-1 text-xs ${
                            lead.contacted_at
                              ? "border-jade border-opacity-30 text-jade"
                              : "border-rim text-fog hover:border-wire hover:text-chalk"
                          }`}
                        >
                          {lead.contacted_at ? "Contacted" : "Mark contacted"}
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
