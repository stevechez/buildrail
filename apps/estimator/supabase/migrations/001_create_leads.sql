-- ─── leads ───────────────────────────────────────────────────────────────────
-- One row per completed estimator flow.
-- Contact info + answers + estimate range stored together for easy CRM querying.
-- Run this in the Supabase dashboard → SQL Editor, or via `supabase db push`.

-- Drop any partial table from a previous failed run before recreating.
drop table if exists leads cascade;

create table leads (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),

  -- Contact (from LeadForm)
  name         text        not null,
  email        text        not null,
  phone        text,

  -- Estimator answers (step IDs from steps.config.ts)
  scope        text,                   -- "Remodel" | "Addition" | "New Build"
  size         text,                   -- "Under 1,000 sq ft" | "1,000 – 2,500 sq ft" | …
  finish       text,                   -- "Standard" | "Mid-grade" | "Premium"
  remodel_rooms text[],                -- checkbox selection, only populated for Remodel

  -- Computed estimate range
  estimate_min integer     not null,
  estimate_max integer     not null,

  -- Tracking
  source       text        not null default 'instant-estimate'
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists leads_email_idx      on leads (email);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_scope_idx      on leads (scope);

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table leads enable row level security;

-- Anon users (the widget) can INSERT leads — but never read, update, or delete them.
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'leads' and policyname = 'anon can insert leads'
  ) then
    create policy "anon can insert leads"
      on leads for insert
      to anon
      with check (true);
  end if;
end $$;

-- Authenticated users (your dashboard / service role) can read everything.
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'leads' and policyname = 'authenticated can read leads'
  ) then
    create policy "authenticated can read leads"
      on leads for select
      to authenticated
      using (true);
  end if;
end $$;
