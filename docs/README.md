---
title: BuildRail Documentation
description: The operating manual for the BuildRail platform, products, engineering standards, and ecosystem.
category: Documentation
status: Active
owner: BuildRail
last_updated: 2026-07-07
---

# BuildRail Documentation

> **The operating manual for building, maintaining, and scaling the BuildRail platform.**

BuildRail is an AI-powered software ecosystem built for contractors and service businesses.

This documentation defines:

- How BuildRail is built
- How products work together
- Engineering standards
- Platform architecture
- Product direction
- Design principles
- AI development practices

The goal is simple:

> BuildRail should feel like one professional software company, not a collection of disconnected applications.

---

# Documentation Philosophy

Documentation is treated as part of the product.

Good documentation:

- reduces onboarding time
- preserves decisions
- prevents architectural drift
- improves AI-assisted development
- allows the company to scale

Every major technical or product decision should eventually have a documented home.

---

# Documentation Map

```
docs/

├── engineering/
│
│   Software development standards,
│   architecture, workflows,
│   and technical principles
│
├── platform/
│
│   Shared services powering
│   all BuildRail products
│
├── products/
│
│   Individual product documentation
│
├── ecosystem/
│
│   How products connect,
│   customer lifecycle,
│   and business strategy
│
└── design/

    User experience,
    visual language,
    and interface standards

```

---

# Engineering

The engineering documentation defines how BuildRail is built.

## Core Documents

| Document                                                    | Purpose                                    |
| ----------------------------------------------------------- | ------------------------------------------ |
| [Engineering Handbook](engineering/handbook.md)             | BuildRail engineering constitution         |
| [Engineering Principles](engineering/principles.md)         | Development philosophy and decision-making |
| [Architecture](engineering/architecture.md)                 | System architecture and diagrams           |
| [Monorepo](engineering/monorepo.md)                         | Workspace structure and conventions        |
| [Development Workflow](engineering/development-workflow.md) | Daily developer and AI workflow            |
| [Coding Standards](engineering/coding-standards.md)         | TypeScript, React, Next.js standards       |
| [AI Development](engineering/ai-development.md)             | AI-assisted engineering workflow           |
| [Testing Standards](engineering/testing-standards.md)       | Testing strategy                           |
| [Security](engineering/security.md)                         | Security practices                         |
| [Database Standards](engineering/database-standards.md)     | Supabase schemas and patterns              |
| [Deployment](engineering/deployment.md)                     | Vercel, environments, releases             |

---

# Platform

Platform documentation covers shared infrastructure.

These systems support every BuildRail product.

## Core Documents

| Document                                             | Purpose                           |
| ---------------------------------------------------- | --------------------------------- |
| [Authentication](platform/authentication.md)         | User identity and authentication  |
| [Billing](platform/billing.md)                       | Subscription and payments         |
| [Organizations](platform/organizations.md)           | Multi-tenant organization model   |
| [Shared Services](platform/shared-services.md)       | Common platform capabilities      |
| [Roles & Permissions](platform/roles-permissions.md) | Authorization model               |
| [Notifications](platform/notifications.md)           | Communication systems             |
| [File Storage](platform/file-storage.md)             | Documents, photos, evidence files |
| [Audit Logging](platform/audit-logging.md)           | Activity history and compliance   |
| [Feature Flags](platform/feature-flags.md)           | Modules and subscription gating   |
| [API Standards](platform/api-standards.md)           | Internal APIs and communication   |

---

# Products

Product documentation explains individual BuildRail applications.

Each product document should define:

- purpose
- target customer
- workflows
- architecture
- data model
- roadmap

---

## Contractor Platform

| Product                                | Purpose                                      |
| -------------------------------------- | -------------------------------------------- |
| [Sites](products/sites.md)             | Contractor website platform                  |
| [SiteVerdict](products/siteverdict.md) | AI inspection and compliance platform        |
| [Vault](products/vault.md)             | Contractor document and project intelligence |
| [Field](products/field.md)             | Mobile field operations                      |
| [Estimator](products/estimator.md)     | AI-powered estimating                        |

---

## Growth System

| Product                                      | Purpose                        |
| -------------------------------------------- | ------------------------------ |
| [Growth System](products/growth-system.md)   | Contractor growth platform     |
| [Local Lead OS](products/local-lead-os.md)   | Lead management and conversion |
| [Content Engine](products/content-engine.md) | Marketing content automation   |

---

# Ecosystem

The ecosystem documentation explains how BuildRail products work together.

## Documents

| Document                                              | Purpose                    |
| ----------------------------------------------------- | -------------------------- |
| [Customer Lifecycle](ecosystem/customer-lifecycle.md) | Customer journey           |
| [Product Map](ecosystem/product-map.md)               | Product ecosystem overview |
| [Data Flow](ecosystem/data-flow.md)                   | Information movement       |
| [AI Strategy](ecosystem/ai-strategy.md)               | AI roadmap and principles  |

---

# Design

The design documentation ensures every BuildRail product feels unified.

## Documents

| Document                                 | Purpose                          |
| ---------------------------------------- | -------------------------------- |
| [Design System](design/design-system.md) | Visual language and UX standards |

---

# Technology Stack

BuildRail is built using modern web technologies.

## Core Stack

| Layer           | Technology          |
| --------------- | ------------------- |
| Framework       | Next.js             |
| Language        | TypeScript          |
| Package Manager | pnpm                |
| Styling         | Tailwind CSS        |
| Components      | shadcn/ui           |
| Icons           | Lucide              |
| Database        | Supabase PostgreSQL |
| Authentication  | Supabase Auth       |
| Storage         | Supabase Storage    |
| Hosting         | Vercel              |

---

# Repository Structure

High-level repository layout:

```
buildrail/

├── apps/

│   ├── estimator
│   ├── field
│   ├── sites
│   ├── siteverdict
│   ├── vault
│   └── growth-system

│
├── packages/

│   ├── estimator-ui
│   └── estimator-embed

│
├── docs/

│   └── company knowledge base

│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json

```

---

# AI Development

AI assistants are considered part of the BuildRail engineering team.

Before making changes, AI agents should:

1. Read this documentation
2. Understand architecture
3. Follow coding standards
4. Preserve existing patterns
5. Update documentation when necessary

Recommended workflow:

```
Understand

↓

Plan

↓

Implement

↓

Validate

↓

Document

```

---

# Contribution Guidelines

Before submitting changes:

## Code

- TypeScript must pass
- lint must pass
- build must pass

## Architecture

- Follow existing patterns
- Avoid unnecessary duplication
- Prefer shared solutions

## Documentation

Update documentation when:

- adding features
- changing architecture
- introducing services
- changing workflows

---

# BuildRail Engineering Principle

Everything we build should answer:

> Does this make BuildRail more useful, more reliable, or easier to scale?

If not, reconsider the decision.

---

# Future Documentation

Additional documents will be added as BuildRail grows:

```
docs/

├── operations/
├── customer-success/
├── sales/
├── analytics/
├── compliance/
└── product-management/

```

---

# Final Note

BuildRail is not a collection of applications.

It is a platform.

The purpose of this documentation is to preserve the decisions, principles, and standards that allow the platform to grow without losing its identity.
