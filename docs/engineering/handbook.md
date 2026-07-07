---
title: Engineering Handbook
description: The engineering constitution for the BuildRail platform.
owner: Engineering
status: Active
version: 1.0.0
last_updated: 2026-07-07
---

# BuildRail Engineering Handbook

> **Build software contractors can trust.**

The Engineering Handbook defines how software is designed, built, reviewed, deployed, and maintained across the BuildRail ecosystem.

It is the primary reference for engineering standards and serves as the foundation for every application, package, and service within the platform.

While technologies may evolve over time, the principles documented here should remain stable.

---

# Purpose

The purpose of this handbook is to create consistency.

Consistency produces software that is easier to understand, easier to maintain, and easier to improve.

This handbook exists so that every engineer approaches problems with the same philosophy, regardless of which BuildRail module they are working on.

---

# Mission

Our mission is simple.

> Help contractors spend less time managing software and more time building exceptional projects.

Every engineering decision should support that mission.

---

# Engineering Philosophy

Engineering at BuildRail values craftsmanship over speed.

We believe software should be:

- Reliable
- Predictable
- Maintainable
- Accessible
- Secure
- Easy to understand

We optimize for the long-term health of the platform rather than short-term convenience.

---

# Core Values

## Simplicity

Complexity is expensive.

Simple systems are easier to test, maintain, and improve.

Whenever possible:

- Remove code instead of adding it.
- Prefer clear solutions over clever ones.
- Avoid unnecessary abstraction.

---

## Consistency

Users should never wonder how something works.

Developers should never wonder where something belongs.

Consistency applies equally to:

- Architecture
- UI
- APIs
- Naming
- Documentation
- Testing

---

## Reliability

BuildRail is business software.

Contractors depend on the platform to run their businesses.

Features should prioritize correctness over novelty.

Reliability is always more valuable than clever engineering.

---

## Ownership

Every feature has an owner.

Every module has an owner.

Every line of code should have someone responsible for maintaining it.

Leave the codebase better than you found it.

---

## Incremental Improvement

Large rewrites are rare.

Continuous improvement is preferred over dramatic change.

Every pull request should improve the platform, even if only slightly.

---

# Engineering Principles

Every engineering decision should support these principles.

| Principle               | Description                                     |
| ----------------------- | ----------------------------------------------- |
| Readability First       | Code is read more often than written.           |
| Maintainability         | Optimize for long-term ownership.               |
| Shared Before Duplicate | Reuse intentionally through packages.           |
| Modular Design          | Modules should remain independently deployable. |
| Small Changes           | Prefer incremental improvements.                |
| Documentation           | Significant decisions should be documented.     |

---

# Product Philosophy

BuildRail is not a collection of unrelated products.

It is a connected ecosystem.

Each module solves a distinct business problem while contributing to a unified contractor operating system.

Examples include:

- Marketing attracts customers.
- Sites converts visitors.
- Estimator wins projects.
- Field manages execution.
- Vault preserves documentation.
- SiteVerdict improves quality.
- Growth System helps contractors scale.

Every module should be valuable on its own.

Every module should become more valuable when connected.

---

# Engineering Standards

The BuildRail platform follows common standards across every application.

| Area            | Standard           |
| --------------- | ------------------ |
| Language        | TypeScript         |
| Framework       | Next.js App Router |
| Package Manager | pnpm               |
| UI              | shadcn/ui          |
| Styling         | Tailwind CSS       |
| Icons           | Lucide             |
| Database        | Supabase           |
| Deployment      | Vercel             |

Technology choices may evolve, but consistency across the ecosystem is essential.

---

# Monorepo Philosophy

BuildRail uses a single monorepo.

The repository contains:

- Applications
- Shared packages
- Documentation
- Configuration

Shared functionality belongs in packages.

Application-specific functionality belongs within the application.

The monorepo should reduce duplication without creating unnecessary coupling.

---

# Code Quality

Code quality is everyone's responsibility.

Before code is merged it should:

- Build successfully.
- Pass linting.
- Pass type checking.
- Follow documented conventions.
- Be understandable without additional explanation.

Passing automated checks does not guarantee good code.

Readable code is the ultimate goal.

---

# Pull Requests

Pull requests should be focused.

A pull request should solve one problem.

Avoid mixing:

- Refactoring
- New features
- Styling changes
- Dependency upgrades

Smaller pull requests are easier to review and easier to trust.

---

# Documentation

Documentation is part of the feature.

Every significant change should answer:

- Why was this decision made?
- What changed?
- Where is it documented?

Documentation should evolve alongside the software.

---

# Design Philosophy

Engineering and design are not separate disciplines.

Interfaces should feel:

- Calm
- Professional
- Predictable
- Fast
- Accessible

We prefer whitespace over decoration.

Typography over excessive graphics.

Hierarchy over visual noise.

The interface should feel intentional.

---

# Performance

Performance is a feature.

We optimize for:

- Fast page loads
- Fast interactions
- Minimal JavaScript
- Efficient rendering
- Responsive interfaces

Measure before optimizing.

Avoid premature optimization.

---

# Security

Security is built into every feature.

Never assume:

- User input is valid.
- Requests are trusted.
- Permissions are correct.

Validate everything.

Protect customer data.

Follow the principle of least privilege.

---

# Accessibility

Accessibility is not optional.

Every interface should support:

- Keyboard navigation
- Screen readers
- Color contrast
- Focus visibility
- Semantic HTML

Accessibility improves software for every user.

---

# Decision Making

When multiple solutions exist, evaluate them using the following priorities.

1. Simplicity
2. Maintainability
3. Reliability
4. User experience
5. Performance
6. Developer convenience

Developer convenience should never come at the expense of the customer experience.

---

# Architecture Decision Records

Significant technical decisions should be recorded as Architecture Decision Records (ADR).

Examples include:

- Adopting the monorepo
- Choosing Supabase
- Introducing shared packages
- Authentication strategy
- Design system evolution

Document the reasoning—not just the outcome.

---

# Engineering Culture

Great software is built through collaboration.

We encourage:

- Constructive code reviews
- Thoughtful documentation
- Continuous learning
- Respectful disagreement
- Knowledge sharing

The goal is not to write clever code.

The goal is to build software that lasts.

---

# Definition of Done

A feature is complete when:

- Functionality works as intended.
- Edge cases have been considered.
- TypeScript passes.
- Linting passes.
- Build succeeds.
- Documentation is updated.
- Code has been reviewed.
- User experience has been validated.

Shipping code is not the finish line.

Shipping reliable software is.

---

# Future Improvements

Future versions of this handbook will include:

- Testing strategy
- Observability
- Monitoring
- Logging standards
- Error handling
- AI engineering guidelines
- Performance budgets
- Release management

---

# Related Documents

- `../README.md`
- `principles.md`
- `architecture.md`
- `coding-standards.md`
- `monorepo.md`
- `git-workflow.md`

---

> **BuildRail Engineering Principle**

> **Build systems that are easy to understand, easy to maintain, and trusted by the contractors who rely on them every day.**
