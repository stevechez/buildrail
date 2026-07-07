---
title: Repository Conventions
description: Standards for organizing, naming, and maintaining the BuildRail monorepo.
category: Engineering
status: Active
owner: BuildRail Engineering
last_updated: 2026-07-07
---

# BuildRail Repository Conventions

> **A clean repository is a product advantage. Organization enables speed.**

BuildRail is maintained as a modular monorepo.

The repository structure reflects the company structure:

- shared platform capabilities
- individual products
- reusable packages
- documentation
- infrastructure

The goal is to allow BuildRail to grow without creating unnecessary complexity.

---

# 1. Repository Philosophy

BuildRail follows three principles:

## 1. Ownership is clear

Every file should have an obvious home.

Ask:

> "Which product or platform capability owns this?"

---

## 2. Shared code is intentional

Code becomes shared only when:

- multiple products need it
- the abstraction is stable
- ownership is clear

Avoid premature extraction.

---

## 3. Products remain independent

A product should be able to evolve without breaking unrelated products.

---

# 2. High-Level Structure

The repository follows:

```
buildrail/

├── apps/
│
├── packages/
│
├── docs/
│
├── tooling/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

---

# 3. Applications

Location:

```
apps/
```

Applications are customer-facing products or major internal systems.

Example:

```
apps/

├── marketing/
├── sites/
├── siteverdict/
├── estimator/
├── field/
├── vault/
└── growth-system/
```

---

## Application Rules

Each application should contain:

```
app-name/

├── app/
├── components/
├── lib/
├── hooks/
├── types/
├── public/
├── package.json
└── README.md
```

---

# 4. Product Boundaries

Products should not directly import from another product.

Avoid:

```
siteverdict
    |
    imports
    |
estimator
```

Prefer:

```
siteverdict

      ↓

shared package

      ↓

estimator
```

---

# 5. Packages

Location:

```
packages/
```

Packages contain reusable capabilities.

Examples:

```
packages/

├── ui/
├── database/
├── auth/
├── config/
├── types/
└── utilities/
```

---

# Package Criteria

A package should exist when:

| Question               | Requirement |
| ---------------------- | ----------- |
| Used by multiple apps? | Yes         |
| Stable API?            | Yes         |
| Clear ownership?       | Yes         |
| Independent purpose?   | Yes         |

---

# 6. Naming Conventions

## Applications

Use:

```
lowercase-with-hyphens
```

Examples:

```
siteverdict
local-lead-os
growth-system
```

---

## Components

Use:

```
PascalCase
```

Examples:

```
AuditReport.tsx

CustomerCard.tsx

BillingPortal.tsx
```

---

## Hooks

Use:

```
camelCase with use prefix
```

Examples:

```
useAudit.ts

useOrganization.ts

useBilling.ts
```

---

## Utilities

Use:

```
camelCase
```

Examples:

```
formatCurrency.ts

validateEmail.ts
```

---

# 7. File Organization

Prefer feature organization.

Example:

```
components/

├── audit/
│
│   ├── AuditHeader.tsx
│   ├── FindingCard.tsx
│   └── AuditSummary.tsx
│
└── shared/
    └── EmptyState.tsx
```

Avoid:

```
components/

├── Button1.tsx
├── Card2.tsx
├── Thing.tsx
```

---

# 8. Import Rules

Preferred order:

```typescript
// React
import { useState } from 'react';

// External
import { toast } from 'sonner';

// Internal packages
import { Button } from '@buildrail/ui';

// Local
import { AuditCard } from './AuditCard';
```

---

# 9. Environment Files

Environment files follow:

```
.env.local
.env.development
.env.production
```

Rules:

Never commit:

```
.env.local
```

Never place secrets:

```
inside source code
```

---

# 10. Environment Location in Monorepo

BuildRail uses application-level environments.

Example:

```
apps/siteverdict/.env.local
apps/estimator/.env.local
```

Root environment variables should only exist when shared across all applications.

Example:

```
DATABASE_URL
```

---

# 11. Documentation Location

Documentation lives in:

```
docs/
```

Structure:

```
docs/

├── engineering/
├── platform/
├── products/
├── ecosystem/
└── README.md
```

---

# 12. Database Files

Database-related assets belong together.

Example:

```
supabase/

├── migrations/
├── functions/
└── seed/
```

Never hide database logic inside random application folders.

---

# 13. Component Ownership

Before creating a component ask:

## Is it product-specific?

Place:

```
apps/product/components/
```

---

## Is it reusable?

Place:

```
packages/ui/
```

---

# 14. Avoid Repository Pollution

Do not commit:

```
node_modules/

.next/

dist/

coverage/

.env files

temporary files
```

---

# 15. Adding a New Product

A new BuildRail product requires:

```
apps/new-product/

docs/products/new-product.md

database changes (if needed)

navigation updates

deployment configuration
```

---

# 16. Removing a Product

Removing a product requires:

Checklist:

☐ Remove application

☐ Remove dependencies

☐ Remove deployment

☐ Remove documentation

☐ Remove database objects

☐ Update product map

---

# 17. Monorepo Commands

Common commands:

Install:

```bash
pnpm install
```

Development:

```bash
pnpm dev
```

Lint:

```bash
pnpm lint
```

Typecheck:

```bash
pnpm typecheck
```

Build:

```bash
pnpm build
```

Full verification:

```bash
pnpm verify
```

---

# 18. Pull Request Standards

Every meaningful change should include:

## Description

What changed?

---

## Reason

Why was it needed?

---

## Testing

How was it verified?

---

## Documentation

Were docs updated?

---

# 19. AI Repository Rules

AI assistants must:

- inspect existing structure first
- avoid creating duplicate patterns
- follow existing naming
- update documentation when architecture changes
- avoid moving files without reason

---

# 20. Repository Health Check

Periodically review:

```
Are products isolated?

Are packages justified?

Are imports clean?

Are docs current?

Are unused dependencies removed?
```

---

# Final Principle

The BuildRail repository is not just storage for code.

It is the operating system for the company.

A clean repository allows:

- faster development
- safer AI collaboration
- easier onboarding
- sustainable growth

**Organize today for the company you intend to become.**
