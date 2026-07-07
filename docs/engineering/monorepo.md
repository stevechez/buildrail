# BuildRail Monorepo Guide

**Document:** Engineering Monorepo Standards
**Location:** `docs/engineering/monorepo.md`
**Status:** Living Document
**Audience:** BuildRail Engineering Team, AI Development Agents, Future Contributors

---

# 1. Purpose

The BuildRail monorepo is the foundation that allows multiple software products to operate as one unified platform.

BuildRail is not a collection of independent applications.

It is an ecosystem:

```
                         BuildRail Platform

                               |
        ------------------------------------------------
        |              |              |                |
     Marketing       Growth        Field            Sites
        |              |              |                |
   Main Website    Lead OS      Field Intel     Contractor Sites

                               |
                          Shared Packages

                               |
        ------------------------------------------------
        |              |              |                |
       UI          Database       AI Tools        Utilities
```

The monorepo provides:

- Shared engineering standards
- Reusable components
- Consistent branding
- Faster product development
- Unified deployment workflows
- Easier maintenance
- AI-assisted development consistency

---

# 2. Monorepo Philosophy

BuildRail follows one primary rule:

> Products may be independent. Engineering standards are not.

Each application should be capable of standing alone, but should benefit from the shared BuildRail foundation.

The goal is:

```
Independent Products
        +
Shared Infrastructure
        =
BuildRail Platform
```

---

# 3. Repository Structure

The current repository follows this structure:

```
buildrail/

├── apps/
│
│   ├── marketing/
│   ├── sites/
│   ├── field/
│   ├── vault/
│   ├── siteverdict/
│   │
│   └── growth-system/
│       ├── lead-os/
│       ├── localproof/
│       ├── ai-receptionist/
│       └── content-engine/
│
├── packages/
│
│   ├── estimator-ui/
│   ├── estimator-embed/
│   ├── ui/
│   ├── database/
│   └── config/
│
├── docs/
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── README.md
```

---

# 4. Application Categories

## 4.1 Marketing Applications

Location:

```
apps/marketing
```

Purpose:

Public-facing BuildRail presence.

Examples:

- Homepage
- Product pages
- Pricing
- Documentation
- SEO pages
- Customer onboarding

Deployment:

```
buildrailhq.com
```

---

## 4.2 Product Applications

Location:

```
apps/*
```

Each product represents a customer-facing BuildRail capability.

Current products:

| Application                   | Purpose                            |
| ----------------------------- | ---------------------------------- |
| sites                         | Contractor website platform        |
| field                         | Contractor field intelligence      |
| vault                         | Document and knowledge management  |
| siteverdict                   | Inspection and compliance platform |
| estimator                     | Estimation tools                   |
| growth-system/lead-os         | Lead capture and management        |
| growth-system/localproof      | Local marketing automation         |
| growth-system/content-engine  | Content generation                 |
| growth-system/ai-receptionist | AI customer response               |

---

# 5. Application Standards

Every application must contain:

```
app-name/

├── app/
├── components/
├── lib/
├── public/
├── styles/
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 6. Application Responsibilities

Applications should contain:

- Pages
- Routes
- Product-specific components
- Product-specific business logic
- Product-specific database interactions

Applications should NOT contain:

- Duplicate UI components
- Duplicate authentication logic
- Duplicate database utilities
- Duplicate configuration

Those belong in packages.

---

# 7. Shared Packages

Packages contain reusable functionality.

Example:

```
packages/

├── ui/
│
├── database/
│
├── auth/
│
├── ai/
│
└── config/
```

---

# Package Rules

A package should exist when:

1. Multiple applications need the same functionality.

Example:

Bad:

```
apps/sites/components/Button.tsx

apps/vault/components/Button.tsx

apps/field/components/Button.tsx
```

Better:

```
packages/ui/Button.tsx
```

---

# 8. Dependency Direction

BuildRail follows a one-way dependency model.

```
                 apps

                  |
                  v

              packages

                  |
                  v

             external libraries
```

Applications may import packages.

Packages should not import applications.

Example:

Allowed:

```
apps/sites
      |
      v
packages/ui
```

Not allowed:

```
packages/ui
      |
      v
apps/sites
```

---

# 9. Package Naming Convention

All internal packages use:

```
@buildrail/package-name
```

Examples:

```
@buildrail/ui

@buildrail/database

@buildrail/auth

@buildrail/ai
```

---

# 10. pnpm Workspace

The workspace is controlled by:

```
pnpm-workspace.yaml
```

Example:

```yaml
packages:
  - apps/*
  - apps/growth-system/*
  - packages/*
```

This allows pnpm to understand the entire ecosystem.

---

# 11. Development Commands

Run from repository root.

---

## Install Dependencies

```bash
pnpm install
```

---

## Run Development

Single application:

```bash
pnpm --filter marketing dev
```

Example:

```bash
pnpm --filter siteverdict dev
```

---

## Build Everything

```bash
pnpm recursive build
```

or:

```bash
pnpm -r build
```

---

## Lint Everything

```bash
pnpm -r lint
```

---

## Type Check Everything

```bash
pnpm -r typecheck
```

---

# 12. Environment Variables

Environment variables belong to applications.

Example:

```
apps/siteverdict/.env.local
```

Contains:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Shared secrets should eventually move into:

```
packages/config
```

or managed deployment environments.

---

# 13. Adding A New Product

New BuildRail products follow this process:

## Step 1

Create application:

```bash
apps/new-product
```

---

## Step 2

Initialize:

```
app/
components/
lib/
package.json
README.md
```

---

## Step 3

Connect shared packages:

Example:

```json
{
	"dependencies": {
		"@buildrail/ui": "workspace:*"
	}
}
```

---

## Step 4

Add documentation:

```
docs/products/new-product.md
```

---

## Step 5

Add deployment configuration.

---

# 14. AI Development Standards

Because BuildRail uses AI-assisted development, every application should include:

```
CLAUDE.md
```

or equivalent AI instructions.

These files should define:

- Product purpose
- Architecture rules
- Coding standards
- Forbidden patterns
- Important files

AI agents should treat BuildRail documentation as the source of truth.

---

# 15. Git Workflow

Branches:

```
main
 |
 ├── feature/*
 ├── fix/*
 └── refactor/*
```

Examples:

```
feature/siteverdict-public-reports

fix/auth-session-timeout

refactor/shared-components
```

---

# 16. Quality Gates

Before merging:

Required:

```
✓ lint passes

✓ typecheck passes

✓ build succeeds

✓ documentation updated
```

Command:

```bash
pnpm verify
```

---

# 17. Long-Term Vision

The BuildRail monorepo should evolve into:

```
                    BuildRail OS


                        Core

        ----------------------------------

        Identity     Billing     AI     Data


                        |

        ----------------------------------

        Products

        Sites
        Field
        Vault
        CRM
        Estimator
        Growth System


                        |

        ----------------------------------

        Customer Businesses

        Contractors
        Remodelers
        Trades
```

---

# Final Principle

The monorepo exists for one reason:

> Build once. Improve once. Deploy everywhere.

Every new BuildRail product should make the ecosystem stronger, not create another isolated project.
