-- ─── Add contacted_at to leads ───────────────────────────────────────────────
-- Tracks when an admin first reached out to this lead.
-- NULL = not yet contacted; non-NULL = contacted (value is the timestamp).

alter table leads
  add column if not exists contacted_at timestamptz default null;

-- Allow authenticated users (admins) to update leads — needed for the toggle.
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'leads' and policyname = 'authenticated can update leads'
  ) then
    create policy "authenticated can update leads"
      on leads for update
      to authenticated
      using (true)
      with check (true);
  end if;
end $$;
