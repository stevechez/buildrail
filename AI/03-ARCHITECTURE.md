# 03-ARCHITECTURE.md | Tech Stack & Data Flow Architecture

## 1. The Core Stack
- **Framework:** Next.js (App Router, utilizing React Server Components by default).
- **Database / Auth / Storage:** Supabase (PostgreSQL with strict Row-Level Security).
- **Hosting / Compute:** Vercel for the Next.js application; Supabase Edge Functions for isolated, heavy, or long-running backend logic.
- **Package Manager:** pnpm

## 2. Multi-Tenant Architecture & Security
BuildRail is a multi-tenant platform. Data isolation must be maintained flawlessly at the database level.
- **Row-Level Security (RLS):** Every single table (except public global configuration tables) MUST have RLS enabled.
- **Tenant Isolation:** Tables must contain an `organization_id` or `tenant_id` column. 
- **Query Constraints:** When writing raw SQL migrations or Supabase client queries, policies must validate that the authenticated user (`auth.uid()`) belongs to the target organization. Never write a query that risks bleeding data across contractor accounts.

## 3. Data Flow & State Management
