---
title: BuildRail
description: The operating system for modern contractors.
owner: BuildRail
status: Active
version: 1.0.0
last_updated: 2026-07-07
---

---

# BuildRail

> **The operating system for modern contractors.**

BuildRail is a modular software platform designed specifically for residential and commercial contractors. Instead of forcing businesses to assemble dozens of disconnected tools, BuildRail provides an integrated ecosystem for marketing, estimating, field operations, customer communication, documentation, and business growth.

Each module solves a specific problem. Together, they become the operating system that powers a modern construction company.

---

## Vision

Construction businesses deserve software built for how they actually work.

BuildRail exists to eliminate fragmented workflows by providing a unified platform where contractors can:

- Generate and manage leads
- Build high-converting websites
- Create professional estimates
- Manage projects in the field
- Store documentation securely
- Leverage AI to automate repetitive work
- Grow their business through integrated marketing tools

Our goal is simple:

> Help contractors spend less time managing software and more time building great projects.

---

# Platform Philosophy

BuildRail is designed around a small number of principles that influence every engineering and product decision.

## Modular

Every module is independently deployable and independently valuable.

Modules can evolve on their own while sharing a common design language, authentication system, and engineering standards.

---

## Connected

Although modules operate independently, they are designed to work better together.

A contractor may begin with a website and later adopt estimating, field management, AI tools, or marketing automation without migrating to a different platform.

---

## Practical

We prioritize reliability, clarity, and usability over unnecessary complexity.

The software should feel approachable for contractors while remaining powerful enough to support growing businesses.

---

## Consistent

Every screen should feel like it belongs to the same product family.

Typography, spacing, interactions, accessibility, and component behavior are shared across the entire ecosystem.

---

# Ecosystem Overview

```text
BuildRail
│
├── Marketing
│
├── Sites
│
├── Estimator
│
├── Field
│
├── Vault
│
├── SiteVerdict
│
└── Growth System
    ├── Lead OS
    ├── LocalProof
    ├── AI Receptionist
    └── Content Engine
```

---

# Repository Structure

```text
buildrail/

apps/
packages/
docs/

README.md
package.json
pnpm-workspace.yaml
```

## Applications

| Module        | Purpose                                            |
| ------------- | -------------------------------------------------- |
| Marketing     | Public website, documentation, pricing, onboarding |
| Sites         | Contractor website platform                        |
| Estimator     | Interactive estimating tools                       |
| Field         | Field operations and project management            |
| Vault         | Secure document management                         |
| SiteVerdict   | AI-powered construction inspections                |
| Growth System | Marketing and lead generation tools                |

---

## Shared Packages

Shared packages contain reusable functionality consumed by multiple applications.

Examples include:

- UI components
- Estimator libraries
- Shared TypeScript types
- Utility functions
- API clients
- Design tokens

---

# Technology Stack

| Area            | Standard             |
| --------------- | -------------------- |
| Language        | TypeScript           |
| Framework       | Next.js (App Router) |
| Runtime         | Node.js 22+          |
| Package Manager | pnpm Workspaces      |
| Styling         | Tailwind CSS         |
| UI Components   | shadcn/ui            |
| Icons           | Lucide               |
| Database        | Supabase             |
| Authentication  | Supabase Auth        |
| Deployment      | Vercel               |
| Source Control  | GitHub               |

---

# Engineering Principles

The BuildRail codebase follows several core engineering principles.

- Favor readability over cleverness.
- Keep modules independent.
- Share code intentionally through packages.
- Prefer composition over duplication.
- Optimize for maintainability.
- Build accessible interfaces by default.
- Ship incrementally.
- Document architectural decisions.

Additional standards are documented in the Engineering Handbook.

---

# Documentation

Project documentation is organized under the `/docs` directory.

```text
docs/

engineering/
design/
product/
api/
operations/
```

The documentation serves as the single source of truth for engineering standards, architecture, product strategy, and operational processes.

---

# Development

Install dependencies.

```bash
pnpm install
```

Start a development server for an application.

```bash
cd apps/marketing

pnpm dev
```

Run workspace validation.

```bash
pnpm verify
```

---

# Roadmap

The BuildRail platform continues to evolve across four major areas.

- Foundation
- Platform
- Products
- Growth

See the Product documentation for current priorities and upcoming initiatives.

---

# Contributing

All contributions should follow the BuildRail Engineering Handbook.

Before submitting changes:

- Ensure the project builds successfully.
- Resolve linting and type-checking issues.
- Follow the coding standards.
- Document significant architectural decisions.
- Update documentation when behavior changes.

---

# License

Copyright © 2026 BuildRail.

All rights reserved.
