# BuildRail AI Agent Instructions

> Universal engineering instructions for AI coding agents operating in the BuildRail repository.

---

# Purpose

You are an AI engineering contributor working inside the BuildRail codebase.

Your goal is to make changes that improve the platform while preserving:

- architecture
- maintainability
- consistency
- security
- product quality

BuildRail is a production SaaS platform.

Do not treat this repository as a prototype or collection of unrelated applications.

---

# First Step: Understand Before Editing

Before making any code changes:

1. Read this file.
2. Read `/CLAUDE.md` if working with Claude.
3. Review relevant documentation in `/docs`.
4. Search the existing codebase.
5. Identify existing patterns.

Do not immediately create new files or duplicate existing functionality.

---

# Source of Truth

The repository contains several layers of truth:

```
Code
 |
Documentation
 |
Product Requirements
 |
Architecture Decisions
```

When making changes:

- preserve existing architecture
- update documentation when needed
- avoid undocumented decisions

---

# Repository Overview

BuildRail is a monorepo.

Structure:

```
buildrail/

apps/

    estimator
    field
    sites
    siteverdict
    vault
    marketing
    growth-system


packages/

    shared libraries
    reusable components


docs/

    engineering
    platform
    products
    ecosystem
    design
```

---

# Technology Stack

## Application

- Next.js App Router
- React
- TypeScript

## Styling

- Tailwind CSS
- shadcn/ui
- Lucide icons

## Backend

- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage

## Infrastructure

- Vercel
- pnpm workspaces

---

# Coding Principles

## Prefer Existing Patterns

Before creating:

- components
- hooks
- utilities
- database functions

search first.

Prefer:

```
reuse existing solution
```

over:

```
create another solution
```

---

## Keep Changes Focused

Do not:

- rewrite unrelated code
- refactor entire systems without approval
- change architecture unnecessarily

Prefer small, reviewable changes.

---

## Production Quality Only

Do not introduce:

- temporary hacks
- disabled lint rules
- ignored TypeScript errors
- placeholder implementations

unless explicitly requested.

---

# TypeScript Standards

TypeScript strictness exists to protect the platform.

Avoid:

```typescript
any;
```

Prefer:

```typescript
unknown;
```

with validation.

Example:

```typescript
catch(error: unknown){

 if(error instanceof Error){
    console.log(error.message)
 }

}
```

---

# React Standards

Prefer:

- functional components
- hooks only when necessary
- derived values instead of state
- server components by default

Avoid unnecessary:

- useEffect
- state synchronization
- client components

Before adding:

```tsx
'use client';
```

ask:

> Does this component actually require browser behavior?

---

# Next.js Standards

Follow App Router conventions.

Prefer:

```
app/
components/
lib/
types/
```

Server components are the default.

Client components are reserved for:

- user interaction
- browser APIs
- client-only libraries

---

# Database Standards

Supabase is the database authority.

Rules:

- all schema changes require migrations
- preserve existing data
- respect Row Level Security
- never expose service credentials

Consider:

```
User

↓

Organization

↓

Resources
```

for all new features.

---

# Security Standards

Never:

- commit secrets
- expose private keys
- bypass authentication
- bypass authorization checks

Environment variables belong in:

```
.env.local
```

and deployment environment settings.

---

# Multi-Tenant Standards

BuildRail supports organizations.

New data models should consider:

```
organization_id
```

when appropriate.

Never assume a single-user system.

---

# UI Standards

All interfaces must follow:

```
docs/design/design-system.md
```

BuildRail UI should feel:

- professional
- calm
- trustworthy
- consistent

Avoid:

- unnecessary animations
- inconsistent styling
- dashboard clutter

---

# Shared Code Standards

Shared functionality belongs in:

```
packages/
```

when appropriate.

Examples:

- UI components
- utilities
- types
- shared services

Do not copy/paste shared logic between applications.

---

# Testing Requirements

Before completing work:

Run:

```bash
pnpm lint
```

```bash
pnpm typecheck
```

```bash
pnpm build
```

or:

```bash
pnpm verify
```

A feature is not complete until validation passes.

---

# Debugging Rules

When fixing errors:

Find the cause.

Do not:

- suppress warnings
- weaken types
- remove checks
- bypass architecture

unless there is a clear documented reason.

---

# Documentation Rules

Documentation must evolve with the platform.

Update documentation when:

- adding features
- changing architecture
- creating services
- changing workflows

Relevant locations:

```
docs/

engineering/
platform/
products/
ecosystem/
design/
```

---

# AI Collaboration Workflow

Follow this process:

```
Understand

↓

Plan

↓

Implement

↓

Test

↓

Document

```

Before editing large files:

- summarize intended changes
- identify risks
- confirm affected areas

---

# Product Context

BuildRail products:

| Product       | Purpose                          |
| ------------- | -------------------------------- |
| Sites         | Contractor websites              |
| SiteVerdict   | AI inspection and compliance     |
| Vault         | Contractor document intelligence |
| Field         | Field operations                 |
| Estimator     | Estimating platform              |
| Growth System | Leads and marketing automation   |

---

# Engineering Decision Rule

When multiple approaches exist, prefer:

1. simpler solution
2. existing pattern
3. maintainable design
4. scalable architecture
5. documented approach

---

# Final Principle

Every AI-generated change should leave the repository:

- easier to understand
- easier to maintain
- more consistent
- more valuable

BuildRail is not a demo.

BuildRail is a professional software platform.
