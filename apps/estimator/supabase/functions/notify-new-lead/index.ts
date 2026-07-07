// Supabase Edge Function — notify-new-lead
// Triggered by a Database Webhook on INSERT to `leads`.
// Sends a notification email via Resend.
//
// Required secrets (set via `supabase secrets set`):
//   RESEND_API_KEY      — from resend.com/api-keys
//   NOTIFY_EMAIL        — where to send the notification (your inbox)
//   NOTIFY_FROM_EMAIL   — verified sender, e.g. "BuildRail <noreply@buildrailhq.com>"
//                         (use "onboarding@resend.dev" while testing)

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  scope: string | null;
  size: string | null;
  finish: string | null;
  remodel_rooms: string[] | null;
  estimate_min: number;
  estimate_max: number;
  source: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: Lead;
  old_record: Lead | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "long", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  });

const SOURCE_LABELS: Record<string, string> = {
  "instant-estimate":    "Instant Estimate (recover.buildrailhq.com)",
  "buildrail-main-site": "BuildRail.com",
  "buildrail-sites":     "BuildRail Sites",
};

function buildEmailHtml(lead: Lead, adminUrl: string): string {
  const midpoint = Math.round((lead.estimate_min + lead.estimate_max) / 2);
  const answers = [
    lead.scope  && `<tr><td style="padding:6px 0;color:#94a3b8;font-size:13px;">Project type</td><td style="padding:6px 0;color:#f8fafc;font-size:13px;text-align:right;">${lead.scope}</td></tr>`,
    lead.size   && `<tr><td style="padding:6px 0;color:#94a3b8;font-size:13px;">Square footage</td><td style="padding:6px 0;color:#f8fafc;font-size:13px;text-align:right;">${lead.size}</td></tr>`,
    lead.finish && `<tr><td style="padding:6px 0;color:#94a3b8;font-size:13px;">Finish level</td><td style="padding:6px 0;color:#f8fafc;font-size:13px;text-align:right;">${lead.finish}</td></tr>`,
    lead.remodel_rooms?.length && `<tr><td style="padding:6px 0;color:#94a3b8;font-size:13px;">Spaces</td><td style="padding:6px 0;color:#f8fafc;font-size:13px;text-align:right;">${lead.remodel_rooms!.join(", ")}</td></tr>`,
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:540px;" cellpadding="0" cellspacing="0">

        <!-- Header -->
        <tr><td style="padding-bottom:24px;">
          <span style="font-size:18px;font-weight:700;color:#f8fafc;">Build</span><span style="font-size:18px;font-weight:700;color:#f59e0b;">Rail</span>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding-bottom:24px;">
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#f8fafc;">New lead submitted</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#64748b;">${fmtDate(lead.created_at)} · ${SOURCE_LABELS[lead.source] ?? lead.source}</p>
        </td></tr>

        <!-- Contact card -->
        <tr><td style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:16px;">
          <p style="margin:0 0 4px;font-size:18px;font-weight:600;color:#f8fafc;">${lead.name}</p>
          <p style="margin:0 0 2px;font-size:13px;color:#94a3b8;"><a href="mailto:${lead.email}" style="color:#f59e0b;text-decoration:none;">${lead.email}</a></p>
          ${lead.phone ? `<p style="margin:0;font-size:13px;color:#94a3b8;">${lead.phone}</p>` : ""}
        </td></tr>

        <!-- Spacer -->
        <tr><td style="height:12px;"></td></tr>

        <!-- Estimate range -->
        <tr><td style="background:#1e293b;border-radius:12px;border:1px solid rgba(245,158,11,0.2);padding:20px;text-align:center;">
          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Estimated project cost</p>
          <p style="margin:0;font-size:32px;font-weight:700;color:#f59e0b;">${fmt(lead.estimate_min)}&nbsp;–&nbsp;${fmt(lead.estimate_max)}</p>
          <p style="margin:6px 0 0;font-size:13px;color:#64748b;">Midpoint <strong style="color:#94a3b8;">${fmt(midpoint)}</strong></p>
        </td></tr>

        <!-- Spacer -->
        <tr><td style="height:12px;"></td></tr>

        <!-- Project answers -->
        ${answers ? `
        <tr><td style="background:#1e293b;border-radius:12px;padding:20px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Project answers</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${answers}
          </table>
        </td></tr>
        <tr><td style="height:12px;"></td></tr>
        ` : ""}

        <!-- CTA -->
        <tr><td style="text-align:center;padding:8px 0 32px;">
          <a href="${adminUrl}/admin/leads/${lead.id}"
            style="display:inline-block;background:#f59e0b;color:#0f172a;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:10px;">
            View lead in admin →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="border-top:1px solid #1e293b;padding-top:20px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#334155;">BuildRail Instant Estimator · You're receiving this because you're an admin.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Verify the webhook is from our Supabase project (service role key as Bearer)
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("Authorization");
  if (!serviceRoleKey || authHeader !== `Bearer ${serviceRoleKey}`) {
    console.error("Unauthorized webhook call");
    return new Response("Unauthorized", { status: 401 });
  }

  // Parse payload
  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Only act on INSERT events
  if (payload.type !== "INSERT" || !payload.record) {
    return new Response("Ignored", { status: 200 });
  }

  const lead = payload.record;
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyEmail = Deno.env.get("NOTIFY_EMAIL");
  const fromEmail = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "onboarding@resend.dev";
  const adminUrl = Deno.env.get("ADMIN_URL") ?? "https://recover.buildrailhq.com";

  if (!resendApiKey || !notifyEmail) {
    console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL secrets");
    return new Response("Misconfigured", { status: 500 });
  }

  // Send email
  const scope = lead.scope ?? "estimate request";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject: `New lead: ${lead.name} — ${scope} (${fmt(lead.estimate_min)}–${fmt(lead.estimate_max)})`,
      html: buildEmailHtml(lead, adminUrl),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Resend error ${res.status}:`, body);
    return new Response("Failed to send email", { status: 500 });
  }

  const { id: emailId } = await res.json();
  console.log(`Email sent for lead ${lead.id} — Resend ID: ${emailId}`);
  return new Response(JSON.stringify({ ok: true, emailId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
