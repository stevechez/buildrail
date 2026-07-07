-- ─── BuildRail Field: Module 3 — client SMS portal access ───────────────────
-- Clients reach a project's portal via a texted magic link
-- (buildrailfield.app/portal/<token>) — no account, no password.
-- The token is validated server-side with the service role key
-- (see lib/portal-token.ts); RLS below is a defense-in-depth backstop only,
-- since the portal route never runs as the `anon` role against these tables.

create table if not exists portal_tokens (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  project_id       uuid        not null references projects (id) on delete cascade,
  created_at       timestamptz not null default now(),

  token            text        not null unique,
  expires_at       timestamptz not null default (now() + interval '90 days'),
  revoked_at       timestamptz
);

create index if not exists portal_tokens_project_idx on portal_tokens (project_id);
create index if not exists portal_tokens_token_idx   on portal_tokens (token);

alter table portal_tokens enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'portal_tokens' and policyname = 'members manage own org portal tokens'
  ) then
    create policy "members manage own org portal tokens"
      on portal_tokens for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;

-- No anon policy: the anon role has zero access to any BuildRail Field
-- table. The public portal page always reads through a server-only
-- service-role client after validating the token, per /AI/03-ARCHITECTURE.md.
