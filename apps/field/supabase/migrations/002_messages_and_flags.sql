-- ─── BuildRail Field: Module 1 — AI message routing ─────────────────────────
-- messages (raw inbound/outbound SMS) + message_flags (AI-structured output).

create table if not exists messages (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  project_id       uuid        references projects (id) on delete set null,
  contact_id       uuid        references contacts (id) on delete set null,
  created_at       timestamptz not null default now(),

  direction        text        not null check (direction in ('inbound', 'outbound')),
  channel          text        not null default 'sms' check (channel in ('sms', 'mms')),
  from_number      text        not null,
  to_number        text        not null,
  body             text        not null,

  -- Full Twilio webhook payload, kept for audits / re-processing.
  raw_payload      jsonb,

  -- AI structuring lifecycle for this message.
  ai_status        text        not null default 'pending' check (ai_status in ('pending', 'processed', 'skipped', 'failed')),
  ai_error         text
);

create index if not exists messages_org_idx      on messages (organization_id);
create index if not exists messages_project_idx  on messages (project_id);
create index if not exists messages_created_idx  on messages (created_at desc);
create index if not exists messages_from_idx     on messages (from_number);

alter table messages enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'messages' and policyname = 'members manage own org messages'
  ) then
    create policy "members manage own org messages"
      on messages for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;

-- Inbound SMS is written by the Twilio webhook route handler using the
-- service role key (bypasses RLS entirely — see lib/supabase-admin.ts).
-- No anon policy is needed or granted here.

-- ─── message_flags ───────────────────────────────────────────────────────────
-- One row per structured item the AI extracted from a message: a material
-- shortage, a schedule delay, a safety issue, a change request, etc.
create table if not exists message_flags (
  id               uuid        primary key default gen_random_uuid(),
  organization_id  uuid        not null references organizations (id) on delete cascade,
  message_id       uuid        not null references messages (id) on delete cascade,
  project_id       uuid        references projects (id) on delete set null,
  created_at       timestamptz not null default now(),

  flag_type        text        not null check (flag_type in (
                      'material_shortage', 'schedule_delay', 'safety_issue',
                      'change_request', 'question', 'general_update'
                    )),
  summary          text        not null,
  details          jsonb       not null default '{}'::jsonb,
  confidence       numeric(3,2),

  status           text        not null default 'open' check (status in ('open', 'acknowledged', 'resolved')),
  resolved_at      timestamptz,
  resolved_by      uuid        references profiles (id)
);

create index if not exists message_flags_org_idx    on message_flags (organization_id);
create index if not exists message_flags_status_idx on message_flags (status);
create index if not exists message_flags_type_idx   on message_flags (flag_type);

alter table message_flags enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'message_flags' and policyname = 'members manage own org flags'
  ) then
    create policy "members manage own org flags"
      on message_flags for all
      to authenticated
      using (organization_id = current_org_id())
      with check (organization_id = current_org_id());
  end if;
end $$;
