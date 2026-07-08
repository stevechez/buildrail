# BuildRail Design System

# Patterns — 04 Page Header

Version: 1.0

Status: Approved

---

# Purpose

The Page Header pattern defines the top section of a BuildRail application page.

The Page Header provides:

- page identity
- context
- primary actions
- supporting information
- workflow orientation

---

# Page Header Philosophy

The Page Header is the user's first understanding of a screen.

It should immediately communicate:

- Where am I?
- What is this?
- What can I do?

---

# Core Principle

## Every Page Should Establish Context Before Asking For Action.

Users should understand the purpose of a page before interacting with it.

---

# Page Header Anatomy

A standard BuildRail Page Header contains:

```
Page Header

├── Breadcrumbs
│
├── Title
│
├── Description
│
├── Status / Metadata
│
└── Actions
```

---

# Basic Example

```
Projects

Manage active construction projects and customer work.

                         + New Project
```

---

# Detailed Example

```
← Projects

Kitchen Remodel

Customer: John Smith
Status: Active


                         Edit Project
                         Add Estimate
```

---

# Required Elements

Every page should have:

## Title

Required.

---

## Description

Optional but recommended when context is not obvious.

---

## Primary Action

When a primary workflow exists.

---

# Page Title Rules

Titles should be:

- clear
- specific
- recognizable

---

# Good

```
Projects

Customers

Estimate #1042
```

---

# Avoid

```
Management Center

Workspace Overview

Control Panel
```

unless that terminology is truly user-facing.

---

# Description Rules

Descriptions provide context.

Good:

```
Manage active projects and track customer progress.
```

Avoid:

```
Welcome to the project management experience.
```

---

# Breadcrumbs

Breadcrumbs show location within a hierarchy.

Example:

```
Projects
/
Kitchen Remodel
/
Documents
```

---

# Breadcrumb Rules

Use breadcrumbs when:

- hierarchy exists
- users need orientation
- pages are nested

Avoid breadcrumbs for:

- simple top-level pages

---

# Actions

Actions represent what users can do.

Primary actions belong in the Page Header.

Examples:

```
Create Project

New Estimate

Upload Document
```

---

# Action Hierarchy

Use:

```
Primary Action

Secondary Actions

Overflow Actions
```

---

# Example

```
Customers


                 + Add Customer

                 Export

                 More
```

---

# Action Rules

Primary action:

- most important workflow
- visually prominent

Secondary actions:

- useful but less important

Overflow:

- rare actions

---

# Page Header Variants

BuildRail supports:

1. Standard Header
2. Detail Header
3. Dashboard Header
4. Workflow Header

---

# Standard Header

Used for collection pages.

Examples:

```
Projects

Customers

Estimates
```

---

# Detail Header

Used for individual records.

Example:

```
Kitchen Remodel

ABC Construction

Active
```

---

# Dashboard Header

Used for overview pages.

Example:

```
Good morning, Steve

Here is today's activity.
```

---

# Workflow Header

Used for focused processes.

Example:

```
Create Estimate

Step 2 of 4
```

---

# Status Indicators

Headers may include:

- status badges
- metadata
- ownership information

Example:

```
Kitchen Remodel

[Active]

Owner: Sarah
```

---

# Status Rules

Status should provide meaning.

Avoid decorative badges.

---

# Page Header Spacing

The header should create separation between:

```
Navigation

↓

Context

↓

Content
```

---

# Vertical Rhythm

Preferred structure:

```
Breadcrumb

small gap

Title

small gap

Description

medium gap

Content
```

---

# Header Density

BuildRail supports:

## Compact

Used for:

- operational screens
- tables

---

## Default

Standard application use.

---

## Spacious

Used for:

- onboarding
- important workflows

---

# Responsive Behavior

Desktop:

```
Title + Actions same row
```

---

Tablet:

```
Flexible wrapping
```

---

Mobile:

```
Title

Description

Actions
```

---

# Mobile Rules

Actions should:

- remain accessible
- stack naturally
- avoid hidden critical actions

---

# Page Header Accessibility

Must:

- use proper heading hierarchy
- maintain focus order
- provide meaningful labels

---

# Heading Rules

Each page should have:

```
One primary H1
```

Supporting sections use:

```
H2

H3
```

---

# Page Header Anti-Patterns

Avoid:

## Generic Titles

Bad:

```
Dashboard
```

when a specific purpose exists.

---

## Too Many Actions

The header is not a toolbar.

---

## Missing Context

Users should know why they are here.

---

## Decorative Descriptions

Every line should add clarity.

---

## Giant Hero Headers

Professional software favors efficiency.

---

# Implementation Rules

The Page Header should:

- consume design tokens
- support responsive layouts
- support breadcrumbs
- support actions
- support status indicators
- integrate with routing

---

# Component Structure Direction

Future implementation:

```
<PageHeader>

  <Breadcrumbs />

  <PageHeaderContent>

    <Title />

    <Description />

  </PageHeaderContent>


  <PageActions />

</PageHeader>
```

---

# Related Components

Page Header works alongside:

```
Breadcrumbs

Button

Badge

DashboardShell

Sidebar

Topbar
```

---

# Final Principle

The Page Header is the handshake between the user and the workflow.

Before users act, they should understand.

BuildRail pages should always answer:

"Where am I?"

"What is this?"

"What should I do next?"
