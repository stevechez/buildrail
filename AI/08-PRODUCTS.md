# 08-PRODUCTS.md | Deep Dive Product Matrix

## 1. Core Platform: BuildRail Dashboard
- **Purpose:** The centralized operational hub for the contractor. It acts as the command center where leads from the Estimator are managed, SiteVerdict project maps are curated, and client communication happens.
- **Target Customer:** Modern residential and commercial contractors, builders, and high-end remodelers who value efficiency and design polish.
- **Key Features:**
  - Multi-tenant client pipelines and lead scoring.
  - Global project configuration (branding, accent colors, custom subdomains).
  - Stripe billing and subscription management integrations.
  - Centralized task assignment and timeline management.

---

## 2. Lead Capture: The Instant Estimator
- **Purpose:** A high-conversion lead generation tool embedded directly onto a contractor’s website. It qualifies leads automatically by providing a rough, range-based estimate while collecting critical project metadata.
- **Target Customer:** High-intent project leads (homeowners) browsing a contractor's site, looking for immediate pricing clarity without waiting days for a callback.
- **Key Features:**
  - Dynamic step-by-step calculation form matching the "Coastal Modern" aesthetic.
  - Smart lead capture triggers (requires email/phone to view the final estimate range).
  - Webhook or server-action pipeline to pipe leads instantly into the main BuildRail Dashboard.

---

## 3. Trust Engine: SiteVerdict
- **Purpose:** An interactive proof engine that aggregates and presents a contractor’s track record through localized data, before/after visual showcases, and verified client testimonials.
- **Target Customer:** Contractors looking to display high-trust proof on their marketing sites to win competitive local bids.
- **Key Features:**
  - Interactive regional maps showing pins of completed local jobs.
  - Sleek, premium before-and-after image slider components with zero layout shifts.
  - Aggregated client reviews with a layout mimicking top-tier developer landing pages (Linear/Stripe layout clarity).

---

## 4. Asset Engine: BuildRail Vault
- **Purpose:** A premium, hyper-secure digital vault for individual projects where contractors can store, organize, and share heavy files directly with clients.
- **Target Customer:** Active homeowners and commercial project managers demanding organized transparency during a build.
- **Key Features:**
  - Direct integration with Supabase Storage buckets secured by strict multi-tenant Row-Level Security policies.
  - Document categorization (Blueprints, Permits, Change Orders, Progress Photos).
  - Simple, client-accessible portal requiring zero complex onboarding to access files.

---

## 5. Field Communication: BuildRail Field (`buildrail-field/`)
- **Purpose:** Field crews keep texting the way they already do; BuildRail Field turns those raw SMS messages into structured, actionable dashboard items via AI, and closes the loop with change-order approval and a client-facing portal — no app install for crew or client.
- **Target Customer:** Small-to-mid trade contractors (5–15 people) whose office is currently reconstructing job-site status from a group text thread.
- **Key Features:**
  - **AI message routing** — every inbound SMS is parsed by Claude into zero or more flags (material shortage, schedule delay, safety issue, change request, question, general update) and surfaced on the office dashboard. Raw messages are always persisted even if AI structuring fails.
  - **Change-order approval** — turn a `change_request` flag (or a manual entry) into a change order, text the client a magic-link, track approve/reject with a full event timeline.
  - **Client SMS portal** — a texted link (`/portal/<token>`) shows project status and pending approvals. No account, no password; access control is a server-validated token, not Supabase auth.
  - **Self-serve signup** — first person from a company signs in via magic link, creates their org, becomes its admin. Admins invite teammates by email from `/dashboard/team`; invited users join the inviter's org instead of accidentally creating their own.
- **Validation context:** built after running the concept through a market-validation pass (demand signal moderate — the SMS-for-crews pain point is well documented, but AI-structuring-as-standalone-purchase-driver is unproven; competition is high — Buildertrend/Projul already bundle this exact three-module shape). The genuine wedge is "zero learning curve for the field crew," not the full platform. If a pilot shows contractors will only value this as a checkbox feature inside a platform they already own, the AI-parsing engine may be worth licensing into those platforms rather than competing head-on. See `12-DECISIONS.md` for the build log.
- **Stack notes:** same multi-tenant Next.js/Supabase pattern as the rest of the ecosystem (`organization_id` + RLS on every table), plus Twilio (inbound webhook + outbound SMS) and the Anthropic API for message structuring.
