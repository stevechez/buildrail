# 12-DECISIONS.md | Architecture & Strategy Log

## [YYYY-MM-DD] Choice of Core Tech Stack

- **Decision:** Standardized on Next.js (App Router), Tailwind CSS, shadcn/ui, and Supabase.
- **Context:** Chosen to maximize solo-developer deployment speed while maintaining strict multi-tenant data safety via Postgres Row-Level Security (RLS).
- **Consequence:** All future modules or sub-apps added to the ecosystem must integrate natively with this backend layer.

---

## [2026-06-29] Instant Estimator wizard follows existing app brand, not 04-DESIGN-SYSTEM.md palette

- **Decision:** The Instant Estimator step-wizard uses `instant-estimate`'s existing navy/amber/steel palette (defined in its `globals.css`) instead of the seafoam/ocean-blue "Coastal Modern" colors described in `04-DESIGN-SYSTEM.md`. Glassmorphism, thin borders, and `duration-150` micro-interactions from the design system were still applied.
- **Context:** `instant-estimate`'s landing page (Hero, Pricing, etc.) was already built on a live navy/amber brand before this ticket. Building the wizard in the documented Coastal Modern colors would have made it visually clash with the page it's meant to sit on. User confirmed: match the existing brand for now.
- **Consequence:** `04-DESIGN-SYSTEM.md`'s color spec is not yet the source of truth for any shipped product. Before applying it literally to new work, check whether the target app already has a live palette and confirm with the user which takes precedence. A future task should reconcile the manual's color spec with what's actually live across all 9 project folders.

## [2026-06-29] shadcn/ui hand-scaffolded instead of via CLI

- **Decision:** `npx shadcn@latest init` failed in this sandbox (registry returned "not authorized" / cancelled requests). `components.json`, `lib/utils.ts`, and `components/ui/{button,input,label,card}.tsx` were hand-written to match shadcn's standard output instead.
- **Context:** No network path to `ui.shadcn.com` from this environment. Manually writing the standard shadcn primitives unblocked the ticket without waiting on registry access.
- **Consequence:** Future `shadcn add <component>` runs should be attempted first himself on the user's machine where network access works; if working from this environment again, expect to hand-write any new primitives the same way.

## [2026-07-02] Second /dashboard ↔ /no-access redirect loop — this one from a silently-ignored query error

- **Decision:** `lib/current-profile.ts`'s `requireCurrentProfile()` now runs the profile lookup and the organization-name lookup as two separate queries, and logs (rather than silently swallows) any error from either. Only the profile query's result decides whether to redirect to `/no-access`; a failure fetching just the display name falls back to "Your organization" instead.
- **Context:** After the self-serve signup fix above, the user hit a *new* infinite loop between the same two routes, immediately after successfully creating their organization. Root cause: the old single query embedded `organizations(name)` in the same `.select()` and only checked `data`, never `error`. An embedded join can fail for reasons that have nothing to do with whether the profile row exists — most plausibly here, PostgREST's schema cache not yet reflecting the FK relationship from a just-run migration. `/no-access`'s own profile check has no embed, so it kept succeeding — meaning the two routes disagreed about the same underlying fact and bounced the user between them forever.
- **Consequence:** Any future "does this user have access" check must decide based on a query that can only fail for the reason it's actually checking, not one bundled with an unrelated presentation-only join. If a Supabase embedded-select call anywhere in this app starts silently returning `null`, check PostgREST's schema cache first (Supabase dashboard → Settings → API → reload schema, or `NOTIFY pgrst, 'reload schema';`) before assuming it's a data or RLS bug — `lib/portal-token.ts` and the invite lookup in `app/no-access/page.tsx` have the same embedded-join shape and weren't hardened in this pass; worth revisiting if this recurs elsewhere (see `11-TODO.md`).

## [2026-07-02] Self-serve org creation + email invites replace the manual-SQL onboarding step

- **Decision:** Reversed the earlier "single-tenant pilot, manual SQL to attach a profile" scope cut. `/no-access` (a signed-in user with no `profiles` row) now offers a real path forward: create a brand-new organization and become its admin (`lib/actions/auth-setup.ts:createOrganizationAndProfile`), or accept a pending invite into an existing org (`acceptInvite`) if one exists for their email. Admins invite teammates from a new `/dashboard/team` page (`createInvite`/`revokeInvite`), backed by a new `invites` table (`supabase/migrations/005_invites.sql`).
- **Context:** User asked directly whether onboarding other businesses/teammates would require running SQL by hand every time. It would have — the original scope cut (see the `[2026-07-02] BuildRail Field built as a standalone app...` entry above) explicitly deferred this to keep the initial build small. Once asked, building it was small enough to do immediately rather than leave as a known gap.
- **Consequence:** `organizations`/`profiles` inserts for signup and invite-acceptance go through the service-role admin client (`lib/supabase-admin.ts`), not RLS-scoped queries — a brand-new user has no `current_org_id()` yet, so ordinary policies have nothing to scope against. This is the same trusted-server-code pattern already used for the Twilio webhook and the client portal; `supabase-admin.ts`'s doc comment now lists all three call sites. Role enforcement (admin-only invite/revoke) happens in the server action, not RLS — consistent with how `profiles.role` is checked everywhere else in this app.

## [2026-07-02] Fixed magic-link sign-in never completing (bounced back to /login after clicking the link)

- **Decision:** `lib/supabase.ts`'s browser client now uses `createBrowserClient` from `@supabase/ssr`, not `createClient` from `@supabase/supabase-js`. `app/auth/callback/route.ts` now checks the result of `exchangeCodeForSession()` and redirects to `/login?error=...` on failure instead of silently proceeding to `/dashboard`. `/login` shows that error via a `useSearchParams()`-based banner (wrapped in `Suspense` to avoid de-opting the whole route to dynamic).
- **Context:** `signInWithOtp()` on `/login` uses PKCE under the hood, which requires a `code_verifier` generated client-side to still be available when `/auth/callback` exchanges the emailed code server-side. The plain `@supabase/supabase-js` client persists auth state (session + code_verifier) in `localStorage`, which the server can't read. `createServerClient`/middleware read the session from cookies. Result: the exchange silently failed every time, no session cookie was ever set, and clicking the magic link always landed back on `/login` with zero indication why — looked identical to "the link didn't work" from the user's side.
- **Consequence:** Any client-side Supabase client added to this app in the future must be `@supabase/ssr`'s `createBrowserClient`, never the plain `@supabase/supabase-js` client, or auth breaks silently again. `instant-estimate`'s `lib/supabase.ts` should be audited too if/when it grows real user auth (today it's only used for anonymous inserts, where this doesn't matter).

## [2026-07-02] Fixed /dashboard ↔ /login infinite redirect loop (ERR_TOO_MANY_REDIRECTS)

- **Decision:** `lib/current-profile.ts`'s `requireCurrentProfile()` now redirects to a new `/no-access` page (not `/login`) when an authenticated user has no matching `profiles` row. `/no-access` is deliberately left out of `middleware.ts`'s `matcher`, so no redirect logic can ever run against it.
- **Context:** `middleware.ts` sends any request to `/login` with a valid Supabase session straight to `/dashboard` (session alone is enough). `requireCurrentProfile()` previously sent a session-but-no-profile user back to `/login`. Combined, that's an unconditional loop: `/dashboard` → no profile → `/login` → has session → `/dashboard` → … Hit exactly as predicted by the manual "attach the profiles row yourself" step in the README — anyone who logs in before running that SQL gets `ERR_TOO_MANY_REDIRECTS` instead of a helpful error.
- **Consequence:** Any future "gate" added to a page inside `/dashboard` must redirect to a destination outside middleware's protected matcher (or otherwise guarantee it can't be sent back to `/dashboard` or `/login` by session-presence alone) — never assume "has a session" and "is fully set up" are the same condition. `/no-access` now also doubles as the onboarding instructions (SQL pre-filled with the signed-in email) instead of a bare redirect.

## [2026-07-02] ANTHROPIC_API_KEY made optional in BuildRail Field

- **Decision:** `buildrail-field` runs fully without `ANTHROPIC_API_KEY` set. The inbound SMS webhook marks unstructured messages `ai_status: "skipped"` instead of erroring, the Messages dashboard is now message-centric (not flag-centric) so raw texts are always visible, and a "Flag this" manual-entry control (`components/dashboard/ManualFlagForm.tsx`) lets office staff create the same `message_flags` rows by hand.
- **Context:** User couldn't get an Anthropic API key purchased yet but had Supabase/Twilio configured and wanted to keep moving. AI structuring is genuinely optional to this product's value (per the original validation, the message-routing/SMS-infrastructure piece is the well-validated part; AI-parsing is the unproven wedge) — no reason to block the rest of the pilot on it.
- **Consequence:** Manually-created flags are indistinguishable downstream from AI-created ones (`details: { source: "manual" }` is the only marker) — change orders, the dashboard feed, and portal all work identically either way. Once `ANTHROPIC_API_KEY` is set, new inbound messages auto-structure with no other change needed.

## [2026-07-02] BuildRail Field built as a standalone app with its own org/profiles tables

- **Decision:** BuildRail Field (`buildrail-field/`) ships with its own `organizations` and `profiles` tables and its own Supabase auth flow (magic-link), rather than reusing BuildRail App's tenant/auth model.
- **Context:** This product exists to test a specific, unproven demand signal (AI-structured SMS as a standalone purchase driver vs. a feature contractors expect inside a platform they already own — see `08-PRODUCTS.md` §5) before investing in deeper integration. Building it standalone kept the pilot buildable in one session and avoids coupling an unvalidated product to the core dashboard's data model.
- **Consequence:** If the pilot validates demand, the next step is unifying `organizations`/`profiles` with BuildRail App's tenant model (likely means BuildRail Field becomes a module inside the core dashboard rather than a separate Next.js app) rather than maintaining two parallel auth systems long-term. Flagged in `11-TODO.md`.

## [2026-07-02] @supabase/ssr must be >=0.12 with current @supabase/supabase-js — pin update needed ecosystem-wide

- **Decision:** Bumped `@supabase/ssr` to `^0.12` in `buildrail-field/package.json`. The `^0.6` pin used elsewhere in this workspace (e.g. `instant-estimate`) is incompatible with the currently-installed `@supabase/supabase-js@2.110.0` in a way that silently breaks types, not runtime.
- **Context:** `@supabase/ssr@0.6`'s `createServerClient()` type declarations import `GenericSchema`/`SupabaseClientOptions` from a `@supabase/supabase-js/dist/module/lib/types` subpath that no longer exists in `supabase-js@2.110.0`'s package layout. Because `tsconfig.json` has `skipLibCheck: true` (needed — every app in this workspace has it), that broken import inside node_modules produces no visible error; it just silently degrades every `createServerClient<Database>().from(...).select(...)` call to type as `never`, which then cascades into dozens of unrelated-looking "Property X does not exist on type 'never'" errors at every call site. Confirmed via isolated repro: identical query against a plain `createClient<Database>()` (supabase-js direct) typed correctly; the same query through `createServerClient` did not, until the `@supabase/ssr` pin was bumped to `0.12`.
- **Consequence:** `instant-estimate` likely has this same latent bug — it wasn't hit yet because `tsc --noEmit` may not have been re-run there since `supabase-js` last updated. Any future work touching `instant-estimate`'s Supabase code should bump its `@supabase/ssr` pin to `^0.12` too and re-run `pnpm typecheck` before trusting the types. General lesson for this workspace: a `never`-typed Supabase query result with no other explanation is a version-skew symptom, not necessarily a schema/RLS problem — check `@supabase/ssr` vs `@supabase/supabase-js` compatibility before debugging the query itself.

## [2026-07-02] Hand-written Database types need real `Relationships`, not `Relationships: []`

- **Decision:** `buildrail-field/types/supabase.ts` gives every table a `Relationships` array that actually lists its foreign keys, rather than the shortcut `Relationships: never[]` used in earlier drafts.
- **Context:** `@supabase/postgrest-js`'s `GenericTable` type requires a `Relationships` field, but leaving it empty doesn't just fail to type embedded joins loosely — it types the *entire* `.select()` result as `never` for any query using PostgREST's embedded-resource syntax (`.select("id, projects(name)")`). Confirmed via isolated repro: the same select typed correctly once a matching `{ foreignKeyName, columns, referencedRelation, referencedColumns }` entry was added for that specific join.
- **Consequence:** Any hand-written `types/supabase.ts` in this workspace (used when `supabase gen types` can't reach a linked project — see the entry below) must keep `Relationships` in sync with every embedded join actually used in the app's queries, not just the base columns. Prefer running `pnpm gen-types` against a real linked project as soon as one exists, since it produces this correctly by construction.

## [2026-06-29] Package installs must happen outside the mounted project folder

- **Decision:** `pnpm`/`npm install` fail with `EPERM: operation not permitted, unlink` when run directly inside this mounted workspace folder. Dependency installs are now done in a scratch copy outside the mount, then only source files and `package.json` are written back into the real project.
- **Context:** The mount appears to disallow the unlink/temp-file operations both package managers rely on internally, even though normal file writes succeed.
- **Consequence:** Any future task that adds or updates npm dependencies needs the same workaround, and the user must run `pnpm install` once locally afterward to regenerate `pnpm-lock.yaml` correctly.
