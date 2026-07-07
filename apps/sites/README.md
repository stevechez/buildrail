# BuildRail Sites

## Purpose

BuildRail Sites is the contractor website platform.

It enables contractors to create professional, conversion-focused websites without needing traditional web development resources.

## Problem

Many contractors have outdated websites that fail to:

- Generate qualified leads
- Build trust
- Showcase completed work
- Convert visitors into customers

## Core Features

Future capabilities include:

- Contractor website builder
- Industry-specific templates
- Gallery management
- Service pages
- Lead capture
- SEO optimization
- AI-generated content
- Reviews integration

## Role in BuildRail

BuildRail Sites is the digital storefront for contractors.

It connects marketing, lead generation, and customer acquisition.

## Technology

- Next.js
- TypeScript
- Tailwind CSS
- Supabase (`leads` table — see `types/supabase.ts`)

## Current Implementation (as of Sprint 3)

What actually exists in this app today is BuildRail's own top-of-funnel
marketing site for the Sites product — a 48-hour "we build your contractor
website" offer, not yet the self-serve multi-tenant website builder the
product vision above describes. Two lead-capture entry points, both backed
by the shared `leads` table:

- `/estimate` — a quiz-style instant estimate widget (`@buildrail/estimator-ui`)
- `/start` — a direct business-intake form

Both write to Supabase via `@buildrail/database`'s shared client factories
(`lib/supabase.ts`, `lib/supabase-server.ts`), the same pattern every other
BuildRail app uses. See `docs/engineering/stabilization-log.md`'s Sprint 3
entry for what shipped and what's still open (multi-tenant per-customer
sites, billing, deployment, staff lead-review UI).

## Future Direction

BuildRail Sites becomes the foundation for contractor digital presence inside the BuildRail ecosystem.
