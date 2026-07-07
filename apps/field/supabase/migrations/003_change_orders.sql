-- ─── BuildRail Field: Module 2 — change-order approval flow ─────────────────

create table if not exists change_orders (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  project_id       uuid        not null references projects (id) on delete cascade,
  source_flag_id   uuid        references message_flags (id) on delete set null,
  created_by       uuid        references profiles (id),
  created_at       timestamptz not null default now(),

  title            text        not null,
  description      text        not null default '',
  cost_delta_cents integer     not null default 0,

  status           text        not null default 'draft' check (status in (
                      'draft', 'pending_approval', 'approved', 'rejected'
                    )),
  sent_at          timestamptz,
  decided_at       timestamptz
);

create index if not exists change_orders_org_idx     on change_orders (organization_id);
create index if not exists change_orders_project_idx on change_orders (project_id);
create index if not exists change_orders_status_idx  on change_orders (status);

alter table change_orders enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'change_orders' and policyname = 'members manage own org change orders'
  ) then
    create policy "members manage own org change orders"
      on change_orders for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;

-- ─── change_order_events ────────────────────────────────────────────────────
-- Append-only audit trail: created / sent / approved / rejected / comment.
-- `actor` is free text ("office: Steve" or "client: Jane Homeowner") since
-- client-side approvals happen outside Supabase auth (see portal_tokens).
create table if not exists change_order_events (
  id               uuid        primary key default gen_random_uuid(),
  change_order_id  uuid        not null references change_orders (id) on delete cascade,
  organization_id  uuid        not null references organizations (id) on delete cascade,
  created_at       timestamptz not null default now(),

  event_type       text        not null check (event_type in ('created', 'sent', 'approved', 'rejected', 'comment')),
  actor            text        not null,
  note             text
);

create index if not exists change_order_events_co_idx on change_order_events (change_order_id);

alter table change_order_events enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'change_order_events' and policyname = 'members read own org change order events'
  ) then
    create policy "members read own org change order events"
      on change_order_events for select
      to authenticated
      using (organization_id = current_org_id());
  end if;
end $$;

-- Events are otherwise written by trusted server code (service role) —
-- both from the office dashboard's server actions and from the client
-- portal's approve/reject actions, so no authenticated insert policy exists.
