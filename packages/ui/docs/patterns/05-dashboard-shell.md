# BuildRail Design System

# Patterns — 05 Dashboard Shell

Version: 1.0

Status: Approved

---

# Purpose

The Dashboard Shell defines the primary application layout used across BuildRail products.

It provides the structural foundation for:

- application navigation
- workspace content
- global controls
- responsive behavior

The Dashboard Shell creates consistency across the BuildRail ecosystem.

---

# Dashboard Shell Philosophy

The shell should feel invisible.

Users should not notice the framework.

They should feel:

- oriented
- productive
- confident

---

# Core Principle

## The Shell Exists To Support The Work, Not Become The Work.

The interface should disappear behind the user's goals.

---

# Shell Anatomy

The standard BuildRail application shell:

```
Application Shell

├── Sidebar
│
├── Topbar
│
└── Workspace

    ├── Page Header

    ├── Main Content

    └── Supporting Content
```

---

# Visual Structure

```
┌─────────────────────────────────┐
│             Topbar              │
├──────────┬──────────────────────┤
│          │                      │
│ Sidebar  │       Workspace      │
│          │                      │
│          │                      │
└──────────┴──────────────────────┘
```

---

# Shell Responsibilities

The shell handles:

- navigation
- authentication state
- workspace context
- global actions
- responsive layout

The shell does not handle:

- page-specific content
- business logic
- workflow decisions

---

# Workspace Philosophy

The workspace is where work happens.

It should prioritize:

- readability
- focus
- efficient interaction

---

# Content Width

BuildRail uses controlled content width.

Recommended:

```
1200px - 1440px
```

depending on application needs.

---

# Content Rules

Avoid:

- full-width content everywhere
- excessive whitespace
- cramped layouts

The goal:

comfortable professional density.

---

# Page Structure

Standard page layout:

```
Page

├── Page Header

├── Primary Content

└── Supporting Sections
```

---

# Example

```
Projects

Manage active construction projects.

                 + New Project


[Filters]


[Project Table]
```

---

# Page Header Relationship

The Dashboard Shell provides space for:

- title
- description
- actions
- breadcrumbs

The Page Header defines the specific page.

---

# Spacing System

The shell uses design tokens.

Common spacing:

```
Sidebar → Content

Content → Header

Header → Body

Section → Section
```

---

# Layout Rhythm

BuildRail uses consistent vertical rhythm.

Preferred:

```
Small gap

Medium gap

Large section gap
```

Avoid random spacing.

---

# Application Chrome

Chrome includes:

- sidebar
- topbar
- navigation elements

Chrome should remain stable.

---

# Content Scrolling

Preferred:

```
Fixed Chrome

Scrollable Workspace
```

---

# Scrolling Rules

The workspace should own scrolling.

Avoid:

```
Entire browser page scrolling with fixed sections everywhere
```

---

# Dashboard Shell States

The shell supports:

1. Loading
2. Empty
3. Error
4. Authenticated
5. Restricted

---

# Loading State

Maintain shell structure.

Example:

```
Sidebar

Topbar

Skeleton Content
```

Avoid blank screens.

---

# Empty Application State

Used when a product has no data.

Example:

```
No Projects Yet

Create your first project to begin.
```

---

# Error State

Shell remains available.

Example:

```
Unable to load projects.

[Retry]
```

---

# Restricted State

For permission issues.

Example:

```
You do not have access to this workspace.

Contact your administrator.
```

---

# Responsive Behavior

Desktop:

```
Sidebar + Topbar + Workspace
```

---

Tablet:

```
Collapsible Sidebar
```

---

Mobile:

```
Mobile Navigation

Full Workspace
```

---

# Mobile Layout

Mobile prioritizes:

- content
- primary actions
- navigation access

---

# Shell Responsiveness Rules

Do not:

- shrink desktop layouts
- hide important workflows
- create horizontal scrolling

---

# Product Switching

The shell supports BuildRail ecosystem navigation.

Example:

```
Current Product:

Estimator

Switch:

Field

Vault

Sites
```

---

# Workspace Context

The shell should preserve:

- organization
- user identity
- permissions
- product context

---

# Permission Handling

Navigation and actions should respect:

- user role
- organization membership
- subscription level

---

# Shell Accessibility

The Dashboard Shell must:

- provide landmarks
- support keyboard navigation
- maintain focus order
- support screen readers

---

# Keyboard Navigation

Users should move logically:

```
Navigation

↓

Page Header

↓

Content

↓

Actions
```

---

# Performance Principles

The shell should load quickly.

Prioritize:

- persistent navigation
- stable layouts
- minimal unnecessary rendering

---

# Animation Rules

Shell transitions should be subtle.

Allowed:

- sidebar collapse
- menu opening
- route transitions

Avoid:

- dramatic page animations

---

# Dashboard Density

BuildRail supports professional information density.

The goal:

More clarity per screen.

Not:

More information per screen.

---

# Shell Anti-Patterns

Avoid:

## Different Shells Per Product

Creates fragmentation.

---

## Dashboard Widgets Everywhere

Not every page is a dashboard.

---

## Excessive Empty Space

Professional tools require efficiency.

---

## Too Many Global Actions

Keep focus on the workflow.

---

## Rebuilding Navigation In Each App

Use shared primitives.

---

# Implementation Rules

Dashboard Shell should:

- consume design tokens
- compose Sidebar and Topbar
- support responsive layouts
- support authentication state
- support permissions
- support product switching

---

# Component Structure Direction

Future implementation:

```
<DashboardShell>

  <Sidebar />

  <Topbar />

  <Workspace>

    {children}

  </Workspace>

</DashboardShell>
```

---

# Related Components

Dashboard Shell works with:

```
Sidebar

Topbar

PageHeader

Breadcrumbs

CommandMenu

Navigation
```

---

# Final Principle

The Dashboard Shell is the foundation of every BuildRail product.

Users should experience:

One platform.

Many tools.

A consistent way of working.

The shell creates the feeling that BuildRail is not a collection of applications — it is a professional operating system for contractors.
