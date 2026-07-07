# BuildRail AI Engineering Instructions

> You are an AI engineering contributor working inside the BuildRail repository.

BuildRail is a professional SaaS platform for contractors and service businesses.

Your responsibility is to make changes that improve the platform while preserving:

- architecture
- consistency
- reliability
- maintainability
- product quality

Do not treat BuildRail as a collection of independent projects.

BuildRail is one platform with multiple products.

---

# Before Making Changes

Before writing code:

1. Read this file completely.
2. Review relevant documentation in `/docs`.
3. Understand existing patterns.
4. Search the repository before creating new solutions.
5. Prefer improving existing architecture over adding duplication.

The documentation hierarchy:

```
docs/

engineering/
    Technical standards
    Architecture
    Development workflow

platform/
    Shared infrastructure
    Authentication
    Billing
    Organizations
    Services

products/
    Product-specific documentation

ecosystem/
    Product relationships
    Customer lifecycle
    Data flows

design/
    UI standards
    Brand experience
```

---

# BuildRail Mission

BuildRail helps contractors operate more professionally through software and AI.

The platform focuses on:

- lead generation
- customer communication
- estimating
- project management
- field operations
- documentation
- compliance
- business intelligence

Every feature should answer:

> Does this make a contractor more successful?

---

# Engineering Philosophy

Follow these principles:

## 1. Simple Beats Clever

Prefer:

- readable code
- obvious patterns
- maintainable solutions

Avoid:

- unnecessary abstraction
- premature optimization
- complicated frameworks

---

## 2. Build For Scale, But Do Not Overbuild

Create foundations that can grow.

Avoid building enterprise complexity before it is needed.

---

## 3. Shared Problems Need Shared Solutions

If multiple products need the same capability:

Consider:

```
packages/
```

or

```
platform services
```

before creating duplicate implementations.

---

# Technology Standards

BuildRail uses:

| Area            | Technology          |
| --------------- | ------------------- |
| Framework       | Next.js App Router  |
| Language        | TypeScript          |
| Package Manager | pnpm                |
| Styling         | Tailwind CSS        |
| UI Components   | shadcn/ui           |
| Icons           | Lucide              |
| Database        | Supabase PostgreSQL |
| Authentication  | Supabase Auth       |
| Storage         | Supabase Storage    |
| Hosting         | Vercel              |

---

# Repository Structure

```
buildrail/

apps/

    estimator
    field
    sites
    siteverdict
    vault
    marketing
    growth-system/


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

# TypeScript Rules

TypeScript is required.

Avoid:

```typescript
any;
```

unless there is a documented reason.

Prefer:

```typescript
unknown;
```

with proper narrowing.

Example:

```typescript
try {
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}
```

---

# React Rules

Use functional components.

Prefer:

```tsx
export function Component() {}
```

Avoid unnecessary:

- state
- effects
- complexity

Before adding `useEffect`, ask:

> Is this actually synchronizing with something external?

Do not use effects for derived values.

Bad:

```tsx
useEffect(() => {
	setName(first + last);
}, [first, last]);
```

Good:

```tsx
const name = `${first} ${last}`;
```

---

# Next.js Rules

Follow App Router conventions.

Prefer:

```
app/

components/

lib/

types/
```

Server components are the default.

Use client components only when needed:

- browser APIs
- hooks
- interactive state

---

# Database Rules

Supabase is the source of truth.

Never:

- bypass Row Level Security
- expose service keys
- duplicate database state unnecessarily

Database changes require:

- migration
- documentation
- consideration of existing users

---

# Multi-Tenant Rules

BuildRail is designed for organizations.

Always consider:

```
User

↓

Organization

↓

Projects / Data

```

Never assume:

```
User owns everything
```

unless explicitly designed that way.

---

# Authentication

Authentication is handled through Supabase Auth.

Do not create custom authentication systems.

Consider:

- session state
- permissions
- organization membership
- role access

---

# UI Standards

All products should feel like BuildRail.

Follow:

```
docs/design/design-system.md
```

Preferred characteristics:

- clean
- professional
- calm
- trustworthy

Avoid:

- flashy SaaS templates
- excessive animations
- unnecessary complexity

---

# Component Rules

Before creating a component:

Search:

```
components/
packages/
```

for existing solutions.

Prefer:

```
shared component
```

over:

```
duplicate component
```

---

# Validation Requirements

Before considering work complete:

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

All must pass.

---

# Git Standards

Commit messages should describe intent.

Good:

```
add customer audit timeline
```

```
fix organization permissions check
```

Bad:

```
changes
```

```
stuff
```

---

# Documentation Requirements

Update documentation when:

- adding a feature
- changing architecture
- adding infrastructure
- changing workflows

Code without documentation creates future problems.

---

# AI Development Rules

AI assistants are collaborators, not code generators.

Before making changes:

Understand:

```
Problem

↓

Architecture

↓

Implementation

↓

Validation

```

Do not blindly:

- rewrite files
- remove types
- disable lint rules
- bypass errors

---

# When Errors Occur

Fix the root cause.

Do not:

- add `eslint-disable`
- add excessive `any`
- remove TypeScript checks
- weaken security

unless there is a documented reason.

---

# Product Context

Current BuildRail products:

## Sites

Contractor website platform.

## SiteVerdict

AI inspection, compliance, and audit platform.

## Vault

Contractor document intelligence.

## Field

Mobile field operations.

## Estimator

AI estimating tools.

## Growth System

Lead generation and marketing automation.

---

# Decision Framework

When uncertain:

Choose the solution that is:

1. simpler
2. easier to maintain
3. consistent with existing patterns
4. easier for another engineer to understand

---

# Final Instruction

You are not building a demo.

You are contributing to a professional SaaS platform.

Every change should leave BuildRail:

- cleaner
- stronger
- easier to understand

than before.
