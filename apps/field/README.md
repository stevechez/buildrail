# BuildRail Field

Field crews text like they already do. BuildRail Field turns those texts into flagged
dashboard items, draft change orders, and a client-facing approval portal — no app
install for the crew or the client.

Three modules, one Twilio number:

1. **AI message routing** — every inbound SMS is parsed by Claude into zero or more
   structured flags (material shortage, schedule delay, safety issue, change request,
   question, general update) and shown on the office dashboard. `ANTHROPIC_API_KEY` is
   optional — without it, messages still land on the dashboard and office staff flag
   them by hand with the same "Flag this" control; AI structuring turns on automatically
   once the key is set.
2. **Change-order approval** — turn a `change_request` flag (or a manual entry) into a
   change order, send it to the client by text, track approve/reject.
3. **Client SMS portal** — a texted magic link (`/portal/<token>`) shows project status
   and pending change orders. No account, no password.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui (hand-scaffolded, see
`/AI/12-DECISIONS.md`) · Supabase (Postgres + RLS + Auth) · Twilio · Anthropic API.

## Getting started

```bash
pnpm install        # from the workspace root
cp buildrail-field/.env.local.example buildrail-field/.env.local
# fill in Supabase / Twilio / Anthropic values
pnpm --filter buildrail-field dev
```

### Database

Run the migrations in `supabase/migrations/` in order (Supabase dashboard → SQL Editor,
or `supabase db push` if the CLI is linked). No manual seed rows needed — signup is
self-serve (see below). You'll still want to set an org's `sms_number` yourself once it
exists, for the Twilio webhook to route inbound texts.

### Signing up

Go to `/login`, enter your email, click the magic link. First person from a company signs
in and lands on `/no-access` with a "create your workspace" form (company name + your
name) — submitting it creates the organization and makes you its admin, then drops you
into `/dashboard`.

To bring teammates in under the *same* org instead of them accidentally creating their
own, invite them from `/dashboard/team` (admin-only). When they sign in with the invited
email, `/no-access` recognizes the pending invite and offers "Join `<org>`" instead of the
create-workspace form.

### Twilio

Point the org's Twilio number's "A message comes in" webhook at
`https://<your-domain>/api/sms/inbound` (HTTP POST). Signature verification is enabled
automatically once `TWILIO_AUTH_TOKEN` is set.

## Directory map

- `app/api/sms/inbound/` — Module 1 webhook + AI structuring entry point.
- `app/dashboard/` — office UI (Messages, Change Orders, Projects, Team).
- `app/portal/[token]/` — Module 3 public client portal.
- `app/no-access/` — self-serve org creation + invite acceptance for a signed-in user with no `profiles` row yet.
- `lib/ai/parse-message.ts` — the AI structuring prompt + call.
- `lib/actions/` — Server Actions (mutations), split by domain.
- `supabase/migrations/` — schema, in dependency order.
