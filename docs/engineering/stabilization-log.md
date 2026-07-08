# BuildRail Stabilization Log

## Purpose

Track platform stabilization work after the BuildRail monorepo foundation milestone.

The goal is to move BuildRail from a functioning collection of applications into a reliable SaaS platform.

---

# Baseline

Date: 2026-07-08

Foundation Commit:

---

# Phase 4 — Authentication Foundation (started)

Date: 2026-07-07

## What shipped

- `packages/types` — canonical `Role` (owner/admin/manager/member/viewer),
  `Organization`, `Profile`, `Membership`, `OrganizationContext` contracts.
- `packages/database` — shared Supabase client factories: browser, cookie-aware
  server, middleware, and admin (service-role) clients. Subpath exports
  (`@buildrail/database/admin`, etc.) so `server-only` code never leaks into
  client bundles — see the barrel-export note in `src/index.ts`.
- `packages/auth` — `getCurrentUser`/`requireUser`, `requireCurrentProfile`
  (generalized from `apps/field/lib/current-profile.ts`), and a
  `can()`/`requirePermission()` role-permission layer per
  `docs/platform/roles-permissions.md`.
- `apps/field` migrated onto all three packages as the reference
  implementation. Verified with `pnpm typecheck` and `pnpm build`
  (Next.js/Turbopack) after migration — both pass clean.

## What this surfaced

Auditing every app's `lib/supabase*.ts` before writing the shared packages
found **three incompatible tenant models sharing one Supabase project**
(`fotxgbqyevodoqwgmqbs`):

1. `apps/field` — `organizations` + `profiles` (`organization_id` FK),
   `current_org_id()` RLS helper. Closest to the documented model.
2. `ai-receptionist` / `estimator` — `businesses` + `business_members`
   (`business_id` FK), `is_business_owner/admin/member()` helpers. Confirmed
   via `apps/estimator/types/supabase.ts`, which is a generated type file
   covering the *whole* shared schema (so it also lists `calls`,
   `intake_scripts`, `receptionist_settings` — ai-receptionist tables, not
   estimator's own `leads`).
3. `apps/siteverdict` — no tenant model (`assessments`, `submissions` only).

## Not done yet

- **businesses -> organizations convergence.** Draft migration authored at
  `packages/database/migrations/0001_converge_businesses_to_organizations.sql`,
  but not applied — the Supabase MCP connector available in this environment
  is linked to a different Supabase account than BuildRail's project, so it
  could not be run or validated against the live schema. Needs a human with
  direct project access to review and run it (ideally against a branch/
  staging DB first).
- `apps/estimator` and `apps/siteverdict` still have their own local
  `lib/supabase.ts` duplicates — not yet migrated onto `@buildrail/database`.
  `siteverdict` also has no organization model to migrate onto until the
  convergence above lands.
- `packages/auth`'s permission matrix currently covers only the generic
  platform permissions from `docs/platform/roles-permissions.md` section 9 —
  product-specific permissions (e.g. `audits.share`, `estimates.approve`)
  still need per-product registries per section 15 of that doc.

---

# Phase 4 (continued) — Real database + "one primary service, one login"

Date: 2026-07-07 (same session, continued)

## What shipped

- **A real Supabase project.** Every app previously pointed at a
  fabricated placeholder (`fotxgbqyevodoqwgmqbs`, a fictional project ref
  with a hand-crafted JWT — see `AI/11-TODO.md`'s top TODO item, which
  called this out directly). Provisioned a real project (`buildrail`, ref
  `qdcfokengexarxitgckp`) and applied the canonical identity schema
  (`organizations`, `profiles`, `organization_members`, `invitations`) plus
  `apps/field`'s full product schema directly to it, with RLS on every
  table. Every app's shared `.env.local` now points here.
- **`docs/platform/identity-foundation.md`'s canonical model implemented
  as designed**, not the earlier field-only shortcut: `profiles` is
  identity-only (no `organization_id`/`role`); `organization_members` is
  the tenancy/role join table, supporting multiple orgs per user.
  `@buildrail/types`/`@buildrail/auth` were redesigned to match, and
  `apps/field` was migrated onto the new tables (`current-profile.ts`,
  `auth-setup.ts`, `team/page.tsx`, and the action files in
  `lib/actions/*.ts` all updated).
- **`apps/app` — the BuildRail hub.** `AI/02-ECOSYSTEM.md` already
  described "BuildRail App — the core dashboard; the hub every other
  product feeds into," and `AI/12-DECISIONS.md` flagged that Field was
  built standalone as a shortcut, always meant to be unified with this hub
  later — but the hub itself had never been built. It now exists:
  magic-link login (`/login`), auth callback, onboarding
  (`/onboarding` — create org or accept a pending invite, reusing
  `@buildrail/auth`'s `createOrganizationAndOwner`/`acceptInvitation`), and
  a dashboard showing the org, its members, an organization switcher, team
  invite management, and links out to every product.
- **Organization switching**, implemented as a cookie
  (`buildrail_active_org`, set by `lib/actions/switch-organization.ts`)
  rather than a `profiles` column — keeps `profiles` identity-only per the
  doc, and `requireMembership()` validates the cookie's org id is an actual
  membership before trusting it.
- **Shared-session SSO across subdomains.** `@buildrail/database` gained
  `resolveCookieDomain()` (`NEXT_PUBLIC_COOKIE_DOMAIN`), wired into the
  browser/server/middleware client factories. In production, setting this
  to a leading-dot root domain (e.g. `.buildrail.app`) on every app means a
  session started at the hub is already valid on every product subdomain —
  no second login. **Local dev caveat:** bare `localhost` can't share
  cookies across ports/subdomains, so this only demonstrably works once
  apps are deployed to real subdomains (or tested via a `*.localhost`-style
  local DNS trick) — not verified end-to-end in this sandbox.
- **`apps/field` now redirects to the hub** instead of maintaining its own
  login: `middleware.ts` sends unauthenticated `/dashboard` visits to the
  hub's `/login?returnTo=...`, and users with no organization membership go
  to the hub's `/onboarding` instead of a local no-access page. Field's old
  `/login`, `/auth/callback`, and `/no-access` routes are now stub
  redirects to the hub (kept as stubs, not deleted — this environment
  can't delete files) and `lib/actions/auth-setup.ts`'s org-creation/invite-
  acceptance functions are marked `@deprecated` for the same reason.

## Not done yet

- `SUPABASE_SERVICE_ROLE_KEY` was added to the shared `.env.local` by the
  user, outside this session — not verified from within the sandbox (the
  mounted copy visible here still showed the placeholder at time of
  writing).
- Field's own per-product team-invite UI (`team/page.tsx`,
  `lib/actions/auth-setup.ts`'s `createInvite`/`revokeInvite`) still works
  standalone and wasn't consolidated into the hub's team management — both
  now exist. Fine short-term, but worth picking one home for invites later.
- `apps/estimator`, `apps/siteverdict`, `apps/vault` still aren't wired
  onto `@buildrail/database`/`@buildrail/auth` or linked from the hub's
  product list beyond a placeholder URL — the hub's `getProducts()` in
  `apps/app/lib/products.ts` points at `localhost` ports that don't
  necessarily match those apps' actual dev ports yet.
- The `businesses`/`business_members` convergence noted in the previous
  Phase 4 entry is still unapplied — separate from this session's schema
  work, since it concerns `ai-receptionist`/`estimator`'s tables, not the
  new project.

---

# Sprint 3 — BuildRail Sites (First Customer Product)

Date: 2026-07-07 (same session, continued)

Per `docs/engineering/platform-stabilization.md` section 8, Sprint 2
("Platform Core" — auth, organizations, permissions) was done; Sprint 3
says to stop widening the platform and take **one** revenue product through
the Phase 10 Product Readiness Checklist instead. Chose **BuildRail Sites**
over Local Lead OS: Sites already had real pages, a design system, and two
half-built lead-capture flows to finish; Local Lead OS was still just the
default `create-next-app` scaffold (`app/page.tsx` untouched), which would
mean starting a product from zero rather than finishing one — the doc's
own instruction ("prefer 1 customer-ready product over 10 unfinished
ones") pointed at Sites.

## What shipped

- **A real `leads` table.** `apps/sites/components/estimator/SitesEstimator.tsx`
  (the `/estimate` quiz widget) already inserted into a table literally
  named `leads` — it just silently failed (`console.error` only) because
  that table never existed in the live Supabase project. Created it via
  migration, with columns covering both that flow's fields (`scope`,
  `size`, `finish`, `remodel_rooms`, `estimate_min/max`) and the `/start`
  form's business-intake fields (`business_name`, `trade`, `service_area`,
  `existing_website`, `target_clients`) — one shared table for both of
  Sites' own top-of-funnel entry points, not two. RLS: insert-only for
  `anon`/`authenticated` (`with check (true)` — flagged by the security
  advisor as expected/intentional for a public lead form, no select/update/
  delete policy so a submitter can never read back other rows; staff review
  is service-role-only, same trusted-server pattern used elsewhere).
- **`apps/sites` wired onto `@buildrail/database`.** Replaced the app-local
  `createClient` call in `lib/supabase.ts` with the shared
  `createBrowserSupabaseClient`, added `lib/supabase-server.ts` (cookie-aware,
  same shape as `apps/field`'s), and a real generated `types/supabase.ts`.
  Sites has no authenticated pages, so this mostly future-proofs it (a
  later staff lead-review dashboard would already be consistent with the
  rest of the platform) rather than changing current behavior.
- **`/start` form actually submits.** It previously just flipped a
  client-side `submitted` boolean with nothing persisted anywhere. Added
  `lib/actions/leads.ts`'s `submitStartForm` server action (inserts into
  `leads` via the anon-role RLS policy) and wired real loading/error states
  into the form per `platform-stabilization.md` Phase 7 (Application
  Standards — every app should have real loading/empty/error states, not
  fake ones).
- Verified `pnpm --filter @buildrail/sites typecheck / build / lint` all
  pass clean, and that `packages/database`/`types`/`auth` typecheck
  unaffected.

## Product Readiness Checklist — status for Sites

| Area             | Status | Notes |
| ---------------- | ------ | ----- |
| Authentication   | N/A    | Sites is a public marketing/lead-gen site today; no authenticated pages exist yet (only relevant once a per-customer site dashboard exists). |
| Organizations    | ☐      | Not started — today's leads aren't organization-scoped by design (see table comment), but a real multi-tenant "each contractor gets a site" model (per `docs/products/sites.md` section 8) is still just documentation, not code. |
| Permissions      | N/A    | Same caveat as Authentication — nothing to permission yet. |
| Billing          | ☐      | Not started. The $2,499 one-time offer is sold manually today (no Stripe/checkout integration). |
| Error Handling   | ✅     | `/start` and `/estimate` now both have real success/error/loading states instead of silent failures. |
| Documentation    | ✅     | `apps/sites/README.md` updated to describe current vs. planned implementation. |
| Deployment       | ☐      | Not verified this session — no changes made to Vercel config. |
| Customer Support | ☐      | Not started — no staff-facing lead review UI yet; leads are readable only via the Supabase dashboard directly. |

## Not done yet

- Sites is still fundamentally BuildRail's own sales funnel for the Sites
  product, not the multi-tenant "every contractor gets a website" builder
  `docs/products/sites.md` describes (organizations, per-customer domains,
  a CMS). That's a substantially larger build than this session's scope —
  flagging it explicitly rather than overstating what shipped.
  Billing (Stripe), a staff-facing lead dashboard, and deployment
  verification are the next concrete steps toward Phase 10 completion for
  this product.

---

# Sprint 3 (cont'd) — businesses -> organizations migration

Date: 2026-07-07 (same session, continued)

Picked up the "Database migrations" gap flagged as the biggest open Track A
item: the drafted `businesses`/`business_members` -> `organizations`/
`profiles` convergence (`packages/database/migrations/0001_*.sql`) had
never been applied. Investigating it against the live project changed the
scope significantly from what that draft assumed.

## What investigation found

- **apps/estimator: false alarm.** Its real application code (not its
  stale generated `types/supabase.ts`) has zero runtime dependency on
  `businesses`/`business_members` — its `/admin` auth is just "is a user
  logged in," nothing organization-scoped. No migration needed.
- **A real regression from earlier this session.** apps/sites' `/estimate`
  widget and apps/estimator's own instant-estimate flow correctly share one
  `leads` table (both built on `@buildrail/estimator-ui`) — that part was
  right. But adding Sites' `/start` business-intake columns onto that same
  table (nullable `estimate_min`/`estimate_max`) would have broken
  Estimator's admin dashboard, which sums those fields as non-null numbers.
  Fixed: `leads` reverted to Estimator's exact original shape (plus a
  missing `contacted_at` column its own code already wrote to), and Sites'
  `/start` submissions moved to their own `site_leads` table.
- **apps/growth-system/ai-receptionist ("LunchBreak AI") was the real
  target, and "convergence" was the wrong frame for it.** There was no
  data to converge — `businesses`/`business_members` never existed in the
  live project at all, for either app. The one source of ground truth
  (a types file generated from the old shared project) didn't even
  contain a `leads` table matching ai-receptionist's own code (no
  `caller_name`, no `business_id`) — meaning this product's schema may
  never have been deployed anywhere, even before this session touched
  anything.

## What shipped

- Built ai-receptionist's entire schema fresh, directly on
  `organizations`/`organization_members` (no separate businesses model):
  `calls`, `receptionist_leads` (renamed from a table this app's code
  calls "leads" — renamed specifically to avoid colliding with apps/sites'
  and apps/estimator's *different* `leads` table, both living in the same
  Supabase project's public schema), `intake_scripts`,
  `receptionist_settings`, `notifications`, `subscriptions`,
  `beta_requests`. Column shapes were reconstructed from ai-receptionist's
  actual `.from()`/`.select()`/`.insert()`/`.update()` calls, not guessed.
  `organizations` gained the product-specific columns the old draft
  migration had proposed (vertical, service_area, status, website_url,
  notification_email/phone, business_phone, twilio_phone_number,
  timezone).
- RLS on every organization-scoped table reuses the existing
  `is_org_member()`/`is_org_admin()` helpers — no new
  `is_business_owner/admin/member()` functions, per "shared problems need
  shared solutions."
- Recreated the `create_onboarding_business` RPC (referenced by
  `src/app/onboarding/actions.ts` but never actually applied to any live
  project) with the *same name and parameter signature*, so that one call
  site needed zero code changes — it now creates an organization +
  `owner` organization_members row + default `receptionist_settings` row
  in one transaction instead of a business + business_members row.
  Restricted its `EXECUTE` grant to `authenticated`/`service_role` after
  the security advisor flagged it as callable by `anon` (it depends on
  `auth.uid()`, so anon calls would have failed anyway, but the grant is
  tightened regardless).
- Rewrote ai-receptionist's application code (~20 files under
  `src/app/**` and `src/lib/notifications/**`) via a scoped subagent given
  an exact rename table: `business_members`→`organization_members`,
  `businesses`→`organizations`, `business_id`→`organization_id`,
  `businessId`→`organizationId` (plus matching function renames like
  `getCurrentBusinessId`→`getCurrentOrganizationId`), and this app's own
  `leads`→`receptionist_leads`. Added a real generated
  `src/types/supabase.ts` (this app had none before) wired into its
  Supabase client factories. Verified independently afterward (not just
  trusting the subagent's report): grepped for zero remaining
  `business_id`/`businessId`/`business_members` references, `tsc --noEmit`
  clean, `eslint .` clean. `next build` fails only on a Google Fonts
  network fetch (`fonts.googleapis.com` unreachable from this sandbox) —
  unrelated to the rename, would not occur on Vercel.
- Marked `packages/database/migrations/0001_converge_businesses_to_organizations.sql`
  as superseded (kept for its design reasoning, not meant to be run).

## Not done yet

- `beta_requests` intentionally preserves a pre-existing product-level gap:
  its dashboard page lets any authenticated user view/update the whole
  waitlist, not scoped to their own organization (it never was, even
  before this session — beta signups aren't organization-scoped data).
  Not fixed here since it's a product behavior question, not something to
  silently change as part of a schema rename.
- Billing (`subscriptions`/Lemon Squeezy), Twilio call routing, and the
  onboarding vertical-specific greeting logic were not functionally
  tested end-to-end (no Lemon Squeezy/Twilio credentials in this
  sandbox) — only verified to typecheck/build/lint correctly against the
  new schema.
- The two pre-existing `is_org_admin()`/`is_org_member()` security-definer
  advisor warnings (callable by `authenticated` via RPC) are still
  unresolved, unrelated to this migration.

---

# Sprint 3 (cont'd) — Sites staff lead dashboard (Customer Support)

Date: 2026-07-07 (same session, continued)

Next Sprint 3 gap tackled for BuildRail Sites' Product Readiness Checklist:
Customer Support (no way to see submitted leads without going into the
Supabase dashboard directly).

## What shipped

- **Discovered `leads` and `site_leads` had insert-only RLS.** Both tables
  only had a public INSERT policy — no SELECT/UPDATE for anyone, which
  meant apps/estimator's existing `/admin` dashboard has actually been
  returning zero rows since the `leads` table was created, not just a
  hypothetical gap for Sites. Added `authenticated`-role SELECT/UPDATE
  policies to both tables, fixing Estimator's admin page as a side effect.
- **apps/sites' `/admin`** — a staff lead dashboard listing `site_leads`
  (business-intake) and `leads` filtered to `source ilike
  'buildrail-sites%'` (this app's own instant-estimate submissions,
  without pulling in Estimator's), with inline status/contacted actions
  via server actions (`lib/actions/admin.ts`). Gated the same way
  apps/field gates `/dashboard`: `middleware.ts` redirects unauthenticated
  visitors to the shared hub's `/login`, per "one primary service, one
  login" — no bespoke local login page.
- **Found and fixed a latent cross-origin redirect bug** while wiring this
  up: `getHubLoginUrl(returnPath)` was being called with just a pathname
  (e.g. `/dashboard`) in both the new Sites code and the existing Field
  code it was copied from. The hub redirects back to `returnTo` verbatim
  after auth, and Field/Sites run on different origins/ports than the hub
  — a bare path would land the user back on the *hub's* origin instead of
  back on the product they came from. Fixed in both apps: middleware now
  passes `request.nextUrl.href` (full absolute URL); the two remaining
  static call sites in apps/field (`app/page.tsx`'s "Get Started Free"
  link, `app/login/page.tsx`'s redirect) now build an absolute URL via
  `next/headers`' `headers()` instead of a bare `/dashboard` string.
- Verified: `pnpm typecheck`/`build`/`lint` clean for both apps/sites and
  apps/field after the changes.

## Product Readiness Checklist — Sites, updated

| Area             | Status | Notes |
| ---------------- | ------ | ----- |
| Customer Support | ✅     | Staff can now review and action every lead from `/admin` without touching the Supabase dashboard directly. |

(Authentication/Organizations/Permissions/Billing/Deployment unchanged from the prior entry.)

## Not done yet / known limitations

- **No "BuildRail staff" role exists in the identity model.** `/admin`'s
  RLS policies grant read/update to any *authenticated* Supabase user
  platform-wide, not a staff-only subset — because there's no such concept
  yet (roles are per-organization: owner/admin/manager/member/viewer).
  This is not a new regression: apps/estimator's `/admin` has always
  worked this way (its middleware only checks "is a user logged in"). Both
  are now consistent and documented rather than silently relied upon, but
  a real "internal BuildRail staff" concept — separate from customer
  organization membership — is an open platform question, not something
  to invent as a side effect of a lead dashboard.
- No pagination on `/admin` — fine at current volume, will need it once
  lead counts grow.
