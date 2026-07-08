# BuildRail Design System

# Layouts — 02 Workspace Layout

Version: 1.0

Status: Approved

---

# Purpose

The Workspace Layout defines the primary content area inside every BuildRail application.

While the App Shell provides consistent navigation and global controls, the Workspace is where users perform their work.

Every screen in every BuildRail product should be built using the Workspace Layout.

---

# Workspace Philosophy

The workspace is where professionals spend nearly all of their time.

It should feel:

- calm
- focused
- spacious
- predictable

The interface should reduce distractions and keep attention on the task at hand.

---

# Core Principle

## Every Workspace Should Guide Users Toward Completing Work.

A workspace is not a canvas.

It is a structured environment for getting work done.

---

# Relationship To The App Shell

The Workspace exists inside the App Shell.

```
App Shell

├── Topbar

├── Sidebar

└── Workspace
```

The shell provides navigation.

The workspace provides productivity.

---

# Workspace Anatomy

```
Workspace

├── Page Header

├── Context Area (optional)

├── Primary Content

├── Secondary Content (optional)

└── Page Footer (optional)
```

---

# Standard Layout

```
────────────────────────────

Page Header

────────────────────────────

Primary Content

────────────────────────────
```

This layout should be used whenever possible.

---

# Extended Layout

```
────────────────────────────

Page Header

────────────────────────────

Context Cards

────────────────────────────

Primary Content

────────────────────────────

Supporting Panels

────────────────────────────
```

---

# Primary Content

Primary content contains the user's main task.

Examples:

- project management
- estimate editing
- customer records
- field activity
- reports

Only one primary workflow should exist on a page.

---

# Supporting Content

Supporting content provides context.

Examples:

- activity timeline
- AI suggestions
- metrics
- related documents
- customer summary

Supporting content should never compete with the primary workflow.

---

# Context Area

The Context Area displays important information before users begin working.

Examples:

```
Status

Assigned User

Project Value

Customer

Upcoming Tasks
```

---

# Page Width

Workspace supports three widths.

---

## Standard

Ideal for:

- forms
- detail pages
- settings

Approximately:

```
720–960px
```

---

## Wide

Ideal for:

- dashboards
- project workspaces
- AI review

Approximately:

```
1200–1440px
```

---

## Full Width

Reserved for:

- large tables
- scheduling
- analytics
- kanban boards

Use only when additional horizontal space improves usability.

---

# Content Density

BuildRail favors moderate density.

Users should be able to scan information without feeling overwhelmed.

Avoid unnecessarily compact interfaces.

---

# Vertical Rhythm

Pages should follow a consistent spacing pattern.

```
Page Header

↓

32px

↓

Primary Sections

↓

24px

↓

Related Sections

↓

24px
```

Use spacing tokens rather than fixed values.

---

# Section Organization

Organize work into meaningful sections.

Good:

```
Project Information

Financial Summary

Documents

Activity
```

Avoid long, uninterrupted pages.

---

# Section Titles

Every major section should include:

- clear title
- optional description
- optional actions

---

# Progressive Disclosure

Show what users need now.

Hide advanced functionality until it becomes relevant.

Avoid overwhelming first-time users.

---

# Workspace Variants

BuildRail supports:

## Standard Workspace

Single workflow.

---

## Split Workspace

Primary content with a supporting side panel.

Example:

```
Estimate Editor

|

AI Assistant
```

---

## Full Workspace

Single immersive experience.

Examples:

- reports
- scheduling
- analytics

---

# Responsive Behavior

## Desktop

Maximum flexibility.

---

## Tablet

Supporting panels may move below the main content.

---

## Mobile

Stack sections vertically.

Preserve workflow order.

Avoid side-by-side layouts.

---

# Empty Workspace

When content is unavailable:

Keep:

- Page Header
- navigation
- context

Replace only the primary content with an Empty State.

---

# Loading Behavior

Maintain page structure.

Replace content with:

- skeletons
- placeholders
- progress indicators

Avoid layout shifts.

---

# Error Behavior

Errors belong inside the workspace.

Navigation and application frame should remain functional.

---

# Accessibility Requirements

Workspace layouts must:

- use semantic landmarks
- maintain heading hierarchy
- preserve logical tab order
- support screen readers

Each page should contain:

- one H1
- logical H2 sections
- accessible labels

---

# Workspace Anti-Patterns

Avoid:

## Multiple Primary Tasks

One page should support one dominant workflow.

---

## Full-Width Forms

Reading becomes difficult.

---

## Excessive Panels

Supporting information should remain secondary.

---

## Inconsistent Spacing

Use design tokens.

Do not invent page-specific spacing.

---

## Decorative Containers

Containers should improve organization—not decoration.

---

# Implementation Rules

Workspace layouts should:

- consume design tokens
- support responsive breakpoints
- integrate with Page Header
- support optional side panels
- preserve consistent spacing
- support all BuildRail products

---

# Component Structure Direction

Future implementation:

```
<Workspace>

  <PageHeader />

  <WorkspaceContext />

  <WorkspaceContent>

    {children}

  </WorkspaceContent>

  <WorkspaceSidebar />

</Workspace>
```

---

# Related Components

Works alongside:

```
AppShell

PageHeader

Card

Table

Form

AI Assistant

EmptyState
```

---

# Final Principle

The Workspace is where professionals spend their day.

It should feel organized, predictable, and free from unnecessary complexity.

Every BuildRail workspace should answer one question:

**"What work am I here to accomplish?"**
