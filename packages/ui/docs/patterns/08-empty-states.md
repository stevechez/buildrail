# BuildRail Design System

# Patterns — 08 Empty States

Version: 1.0

Status: Approved

---

# Purpose

The Empty State pattern defines how BuildRail communicates when content, data, or activity does not yet exist.

Empty states guide users through moments where there is nothing to display.

Common situations:

- first-time use
- no search results
- no records
- completed workflows
- unavailable content

---

# Empty State Philosophy

Empty states are not blank spaces.

They are guidance moments.

A user seeing an empty state should understand:

- why it is empty
- what they can do next
- how to get value from the feature

---

# Core Principle

## Never Leave Users At A Dead End.

Every empty state should provide direction.

---

# Empty State Anatomy

A standard BuildRail Empty State contains:

```
Empty State

├── Illustration / Icon (optional)
│
├── Title
│
├── Description
│
└── Action
```

---

# Example

```
No Projects Yet

Create your first project to start managing work.

[Create Project]
```

---

# Empty State Types

BuildRail supports:

1. First Use
2. No Results
3. Completed
4. No Access
5. Error Recovery

---

# First Use Empty State

Used when a user has not created anything yet.

Examples:

```
No Customers Yet

Add your first customer to begin tracking relationships.

[Add Customer]
```

---

# First Use Philosophy

First-use empty states should teach.

They should answer:

- What is this?
- Why does it matter?
- What should I do?

---

# No Results Empty State

Used when filtering or searching returns nothing.

Example:

```
No Projects Found

Try changing your search or filters.

[Clear Filters]
```

---

# No Results Rules

Do not suggest creation when users are simply searching.

Bad:

```
No customers found.

Create Customer
```

when the user expected search results.

---

# Completed Empty State

Used when a workflow has nothing remaining.

Example:

```
All Caught Up

No pending approvals.
```

---

# No Access Empty State

Used when content exists but the user cannot access it.

Example:

```
You do not have access to this project.

Contact your administrator.
```

---

# Error Recovery Empty State

Used when content cannot load.

Example:

```
Unable to load projects.

Please try again.

[Retry]
```

---

# Empty State Actions

Actions should be:

- clear
- relevant
- achievable

---

# Primary Action

Usually one main action.

Examples:

```
Create Project

Upload Document

Add Customer
```

---

# Secondary Actions

Optional.

Examples:

```
Learn More

Import Data
```

---

# Action Rules

Avoid multiple competing actions.

Bad:

```
Create

Import

Watch Tutorial

Read Docs

Contact Support
```

---

# Empty State Copywriting

BuildRail copy should be:

- helpful
- concise
- professional

---

# Good

```
No Estimates Yet

Create an estimate to start building proposals faster.
```

---

# Avoid

```
Oops! Looks like you haven't done anything here yet!
```

---

# Tone Guidelines

Empty states should feel:

- calm
- encouraging
- practical

Avoid:

- childish language
- excessive enthusiasm
- blame

---

# Icons and Illustrations

Visuals are optional.

Use when they improve understanding.

---

# Icon Rules

Prefer:

- Lucide icons
- simple illustrations
- meaningful symbols

Avoid:

- decorative artwork without purpose

---

# Empty State Placement

Empty states should appear where the content would normally exist.

Examples:

Table:

```
Filters

No Projects Yet

Create Project
```

---

Card Area:

```
Project Overview

No activity yet
```

---

# Table Empty States

Tables require special handling.

Example:

```
No Customers Yet

Add your first customer.

[Add Customer]
```

Do not show:

```
Empty table
```

---

# Dashboard Empty States

Dashboards should explain what data will appear.

Example:

```
Your Project Activity

Activity will appear here as work progresses.
```

---

# Search Empty States

Search should distinguish:

No query:

```
Search projects, customers, and estimates.
```

No results:

```
No matches found.
```

---

# Onboarding Empty States

New users need more guidance.

Example:

```
Welcome to Estimator

Create your first estimate in minutes.

[Create Estimate]
```

---

# Mobile Behavior

Empty states should:

- remain centered
- use readable spacing
- keep actions accessible

---

# Accessibility Requirements

Empty states must:

- use proper heading hierarchy
- provide meaningful descriptions
- support keyboard navigation
- not rely only on illustrations

---

# Empty State Anti-Patterns

Avoid:

## Blank Screens

Users need guidance.

---

## Generic Messages

Bad:

```
Nothing here.
```

---

## Too Much Marketing

The product should help, not sell.

---

## Too Many Actions

Focus on the next step.

---

## Decorative Illustrations

Visuals should have purpose.

---

# Implementation Rules

Empty states should:

- consume design tokens
- support variants
- support actions
- work inside tables, cards, and pages
- maintain accessibility

---

# Component Structure Direction

Future implementation:

```
<EmptyState>

  <EmptyStateIcon />

  <EmptyStateTitle />

  <EmptyStateDescription />

  <EmptyStateAction />

</EmptyState>
```

---

# Related Components

Works alongside:

```
Card

Table

Alert

Button

DashboardShell

LoadingState
```

---

# Final Principle

Empty states are the beginning of a workflow, not the end of one.

BuildRail should use empty moments to teach, guide, and move users forward.
