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
