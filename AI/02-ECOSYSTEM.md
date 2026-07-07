# 02-ECOSYSTEM.md | The BuildRail Suite Architecture

## 1. Executive Summary
BuildRail is not a singular application; it is an integrated, multi-tenant ecosystem designed to streamline client acquisition, job estimation, project presentation, and secure asset management for modern construction contractors. 

Every product within this ecosystem shares a unified authentication layer, database instance, and design philosophy.

## 2. Product Matrix & Relationships

- **BuildRail App** — the core dashboard; the hub every other product feeds into.
- **Instant Estimator** — captures leads on a contractor's marketing site, pipes them into the dashboard.
- **SiteVerdict** — trust/proof engine for marketing sites.
- **BuildRail Vault** — secure file storage per project.
- **BuildRail Field** (`buildrail-field/`) — turns field-crew SMS into structured dashboard items, change orders, and a client SMS portal. Currently ships as its own Next.js app/org model (own `organizations`/`profiles` tables) rather than sharing the core dashboard's auth — see `12-DECISIONS.md` for why, and the follow-up needed to unify it.
