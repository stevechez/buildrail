-- ─── Platform migration: converge businesses/business_members onto organizations/profiles ──
--
-- Context (see docs/engineering/stabilization-log.md and
-- docs/platform/organizations.md):
--
-- All BuildRail apps share one Supabase project (fotxgbqyevodoqwgmqbs), but
-- three incompatible tenant models exist in it today:
--   1. apps/field:              organizations + profiles (organization_id FK)
--   2. ai-receptionist/estimator: businesses + business_members (business_id FK)
--   3. apps/siteverdict:         no tenant model at all
--
-- This migration converges model (2) onto model (1), which is the one the
-- platform docs and @buildrail/auth / @buildrail/database are built around.
-- It does NOT touch siteverdict — that app needs a tenant model added from
-- scratch, which is a separate, larger piece of work.
--
-- ⚠️  DO NOT RUN THIS DIRECTLY AGAINST PRODUCTION WITHOUT REVIEW.
-- This was authored by inspecting apps/estimator/types/supabase.ts (a
-- generated type file — the only local record of the `businesses` /
-- `business_members` shape, since ai-receptionist has no committed
-- migrations of its own) rather than a live schema inspection. The
-- Supabase MCP connector available in this environment is linked to a
-- different Supabase account than BuildRail's project, so this could not be
-- validated against the real database. Before running:
--   1. Confirm current column set with: supabase gen types typescript --linked --schema public
--   2. Run against a branch/staging database first (see docs/engineering/database-standards.md)
--   3. Take a backup
--
-- Design notes:
--   - Additive first: new columns are added to `organizations` rather than
--     dropping `businesses` columns outright, so nothing is destroyed if a
--     step needs to be re-run or rolled back.
--   - `business_members.role` is unconstrained text with no observed
--     values in the codebase (the ai-receptionist app never branches on
--     role). It's mapped to the canonical role set's `'member'` by default;
--     confirm this is correct for any existing rows before relying on it
--     for authorization.
--   - `organizations.sms_number` (field) and `businesses.twilio_phone_number`
--     serve the same purpose (routing inbound calls/SMS to a tenant). Kept
--     as two columns here rather than merged, since field's `sms_number` is
--     already referenced by field's own inbound-SMS routing — reconciling
--     the two is a follow-up once call/SMS routing is unified across
--     products, not part of this migration.

-- ── 1. Extend organizations with businesses' product-specific columns ──────
alter table organizations
  add column if not exists industry            text,
  add column if not exists timezone             text        not null default 'America/New_York',
  add column if not exists service_area         text,
  add column if not exists vertical             text,
  add column if not exists status               text        not null default 'active',
  add column if not exists website_url          text,
  add column if not exists notification_email   text,
  add column if not exists notification_phone   text,
  add column if not exists business_phone       text,
  add column if not exists twilio_phone_number  text,
  add column if not exists updated_at           timestamptz not null default now();

-- ── 2. Migrate businesses rows into organizations ───────────────────────────
-- id is preserved so every FK that currently points at businesses.id keeps
-- working once repointed at organizations.id in step 4 below.
insert into organizations (
  id, created_at, name, industry, timezone, service_area, vertical, status,
  website_url, notification_email, notification_phone, business_phone,
  twilio_phone_number, updated_at
)
select
  id, created_at, name, industry, timezone, service_area, vertical, status,
  website_url, notification_email, notification_phone, business_phone,
  twilio_phone_number, updated_at
from businesses
on conflict (id) do nothing;

-- ── 3. Migrate business_members rows into profiles ──────────────────────────
-- profiles.role has a `check (role in ('admin', 'staff'))` constraint from
-- apps/field/supabase/migrations/001_init_core.sql — widen it to the
-- canonical role set (docs/platform/roles-permissions.md) before inserting,
-- since business_members.role is unconstrained text today.
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check
  check (role in ('owner', 'admin', 'manager', 'member', 'viewer', 'staff'));
-- 'staff' is kept temporarily for backward compatibility with existing
-- apps/field rows; drop it once apps/field's own role values are migrated
-- (tracked separately — see FieldRole in apps/field/lib/current-profile.ts).

insert into profiles (id, organization_id, created_at, full_name, role)
select
  user_id,
  business_id,
  created_at,
  null,
  case when role in ('owner', 'admin', 'manager', 'member', 'viewer') then role else 'member' end
from business_members
on conflict (id) do nothing;

-- ── 4. Repoint dependent tables at organizations/organization_id ───────────
-- Run per-table once the actual FK list is confirmed against the live
-- schema (step 1 in the header above) — `calls`, `leads`, `intake_scripts`,
-- `receptionist_settings`, `notifications`, `subscriptions`, `beta_requests`
-- were observed in apps/estimator/types/supabase.ts as referencing
-- business_id and are the known candidates. Example for one table:
--
--   alter table calls rename column business_id to organization_id;
--   alter table calls
--     drop constraint if exists calls_business_id_fkey,
--     add constraint calls_organization_id_fkey
--       foreign key (organization_id) references organizations (id) on delete cascade;
--
-- Repeat for each dependent table, then update every app's queries/RLS
-- policies from `business_id` to `organization_id` and from
-- `is_business_owner()/is_business_admin()/is_business_member()` to
-- `current_org_id()` (apps/field/supabase/migrations/001_init_core.sql).

-- ── 5. Drop the old tables (separate, later migration) ──────────────────────
-- Do not drop `businesses` / `business_members` in the same migration that
-- creates the new data — leave both models live in parallel for one
-- deploy cycle, confirm every app reads/writes organizations/profiles
-- correctly, then drop the old tables in a follow-up migration.
