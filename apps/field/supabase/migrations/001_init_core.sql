-- ─── BuildRail Field: core multi-tenant schema ─────────────────────────────
-- organizations, profiles, projects, contacts.
-- Every tenant-scoped table carries organization_id and has RLS enabled,
-- per /AI/03-ARCHITECTURE.md.

-- ─── organizations ──────────────────────────────────────────────────────────
create table if not exists organizations (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  name         text        not null,
  -- Twilio number this org's crews/clients text. Used to route inbound SMS
  -- to the correct tenant before any project/contact match is attempted.
  sms_number   text        unique
);

alter table organizations enable row level security;

-- ─── profiles ────────────────────────────────────────────────────────────────
-- One row per auth.users member of the BuildRail Field office staff.
create table if not exists profiles (
  id               uuid        primary key references auth.users (id) on delete cascade,
  organization_id  uuid        not null references organizations (id) on delete cascade,
  created_at       timestamptz not null default now(),
  full_name        text,
  role             text        not null default 'staff' check (role in ('admin', 'staff'))
);

alter table profiles enable row level security;

-- Helper: current user's organization_id, without re-triggering RLS on
-- `profiles` itself (security definer). Used by every other policy below.
create or replace function current_org_id()
returns uuid
language sql
security definer
stable
set search_path = public
as $$
  select organization_id from profiles where id = auth.uid();
$$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'members read own org profiles'
  ) then
    create policy "members read own org profiles"
      on profiles for select
      to authenticated
      using (organization_id = current_org_id());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'members read own profile row'
  ) then
    create policy "members read own profile row"
      on profiles for select
      to authenticated
      using (id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'organizations' and policyname = 'members read own org'
  ) then
    create policy "members read own org"
      on organizations for select
      to authenticated
      using (id = current_org_id());
  end if;
end $$;

-- ─── projects ────────────────────────────────────────────────────────────────
create table if not exists projects (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  created_at       timestamptz not null default now(),
  name             text        not null,
  address          text,
  client_name      text,
  client_phone     text,
  client_email     text,
  status           text        not null default 'active' check (status in ('active', 'on_hold', 'complete', 'archived'))
);

create index if not exists projects_org_idx on projects (organization_id);

alter table projects enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'projects' and policyname = 'members manage own org projects'
  ) then
    create policy "members manage own org projects"
      on projects for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;

-- ─── contacts ────────────────────────────────────────────────────────────────
-- Phone directory used to route inbound SMS to a project without the crew
-- installing an app. A phone number can appear on multiple projects over time
-- (e.g. a foreman working several jobs), so contacts are project-scoped.
create table if not exists contacts (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  project_id       uuid        references projects (id) on delete cascade,
  created_at       timestamptz not null default now(),
  name             text,
  phone            text        not null,
  kind             text        not null default 'crew' check (kind in ('crew', 'foreman', 'client', 'subcontractor'))
);

create index if not exists contacts_org_idx   on contacts (organization_id);
create index if not exists contacts_phone_idx on contacts (phone);

alter table contacts enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'contacts' and policyname = 'members manage own org contacts'
  ) then
    create policy "members manage own org contacts"
      on contacts for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;
