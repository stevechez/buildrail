# 11-TODO.md | Master Backlog

## 🟢 High Priority (Next Up)

- [ ] Provision a real Supabase project for BuildRail Field, run `supabase/migrations/*.sql`, and run `pnpm gen-types` to replace the hand-written `types/supabase.ts`.
- [ ] Buy/configure a Twilio number, set `organizations.sms_number`, and point its inbound webhook at `/api/sms/inbound`. Org creation is self-serve now (`/no-access`), but `sms_number` still has to be set by hand afterward — a "Settings" page to edit it from the dashboard is a reasonable next add.
- [ ] Run the concierge-MVP pilot (5–10 real trade businesses) before investing further in BuildRail Field — the AI-structuring wedge is unproven as a standalone purchase driver per `08-PRODUCTS.md` §5. Watch retained *behavior* (crews still texting the number after week 2), not just sentiment.
- [ ] Bump `instant-estimate`'s `@supabase/ssr` pin to `^0.12` and re-run `pnpm typecheck` — same version-skew bug documented in `12-DECISIONS.md` (2026-07-02) likely affects it too.

## 🟡 Medium Priority (Growth & Polish)

- [ ] Audit `lib/portal-token.ts` and the invite lookup in `app/no-access/page.tsx` for the same embedded-join fragility fixed in `lib/current-profile.ts` (2026-07-02) — both do `.select("*, projects(name), organizations(name)")`-style embeds that could silently fail the same way.
- [ ] _Task D_

## 🔵 Low Priority (Icebox / Future Ideas)

- [ ] _Task E: Long-term expansion concepts or nice-to-have UI adjustments._
