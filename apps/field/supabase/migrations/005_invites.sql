-- ─── BuildRail Field: self-serve signup — invites ───────────────────────────
-- Lets an admin invite a teammate by email into their *existing* organization,
-- instead of the teammate accidentally creating a brand new one when they
-- first sign in. See app/no-access/page.tsx and lib/actions/auth-setup.ts.

create table if not exists invites (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  created_at       timestamptz not null default now(),

  -- Always stored lowercased/trimmed (see lib/actions/auth-setup.ts) so
  -- lookup-by-email is a simple equality check, not a case-insensitive scan.
  email            text        not null,
  role             text        not null default 'staff' check (role in ('admin', 'staff')),
  invited_by       uuid        references profiles (id),
  accepted_at      timestamptz,

  unique (organization_id, email)
);

create index if not exists invites_email_idx on invites (email);
create index if not exists invites_org_idx   on invites (organization_id);

alter table invites enable row level security;

-- Same shape as every other tenant-scoped table: any authenticated member of
-- the org can see/manage its invites. Admin-only enforcement for *creating*
-- an invite happens in the server action (lib/actions/auth-setup.ts), not
-- here — matches how this app already treats role distinctions (see
-- profiles.role) as an application-layer concern, not an RLS one.
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'invites' and policyname = 'members manage own org invites'
  ) then
    create policy "members manage own org invites"
      on invites for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;

-- Deliberately NO anon/authenticated policy for "find an invite by email" —
-- a brand-new user has no organization_id yet, so current_org_id() is null
-- and the policy above can never match their own invite. That lookup goes
-- through the service-role admin client instead (same pattern as the Twilio
-- webhook and the client portal — see lib/supabase-admin.ts).