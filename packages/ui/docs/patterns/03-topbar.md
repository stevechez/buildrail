# BuildRail Design System

# Patterns — 03 Topbar

Version: 1.0

Status: Approved

---

# Purpose

The Topbar pattern defines the horizontal application header used across BuildRail products.

The Topbar provides:

- application context
- global actions
- search access
- notifications
- user controls

---

# Topbar Philosophy

The Topbar provides orientation and access.

It should help users understand:

- which product they are using
- what workspace they are in
- what actions are available
- where to find help

---

# Core Principle

## The Topbar Should Provide Control Without Creating Noise.

The workspace remains the focus.

---

# Topbar Anatomy

A standard BuildRail Topbar contains:

```
Topbar

├── Context Area
│   ├── Product
│   └── Page Title
│
├── Page Actions
│
└── Utility Area
    ├── Search
    ├── Notifications
    ├── Help
    └── User Menu
```

---

# Example

```
Estimator

Projects


                         Search   🔔   Help   Steve ▼
```

---

# Context Area

The context area answers:

"Where am I?"

Contains:

- product identity
- current section
- optional breadcrumb

---

# Context Rules

The user should immediately understand:

- current product
- current location
- current workflow

---

# Product Identity

BuildRail products should feel connected.

Example:

```
BuildRail

Estimator
```

or:

```
BuildRail Estimator
```

---

# Page Title

The page title should describe the current task.

Good:

```
Projects
```

Avoid:

```
Workspace Dashboard Experience
```

---

# Page Actions

Actions related to the current page may appear in the Topbar.

Examples:

```
Projects

                     + New Project
```

---

# Action Priority

Primary actions should be visible.

Example:

```
Create Estimate
```

Secondary actions should move elsewhere.

Example:

```
Export

Settings

Archive
```

---

# Utility Area

Global controls belong on the right side.

Common items:

```
Search

Notifications

Help

User Menu
```

---

# Search

Search is a major BuildRail capability.

Future search may include:

- projects
- customers
- estimates
- documents
- commands

---

# Search Rules

Search should:

- be easy to access
- support keyboard shortcuts
- provide clear results

---

# Command Search

BuildRail may support:

```
⌘ K
```

command access.

Examples:

```
Create Project

Find Customer

Open Estimate
```

---

# Notifications

Notifications communicate:

- assigned work
- approvals
- updates
- system events

---

# Notification Rules

Notifications should:

- prioritize importance
- avoid excessive alerts
- provide clear destinations

---

# Notification Badge

Badges may indicate unread items.

Example:

```
🔔 3
```

---

# Help Access

Help should be available globally.

Examples:

```
Documentation

Support

Contact
```

---

# User Menu

The user menu provides:

- identity
- account actions
- preferences

Example:

```
Steve Maciaszek

Profile

Settings

Sign Out
```

---

# Topbar Height

BuildRail uses consistent application chrome.

Recommended:

```
56px - 64px
```

---

# Topbar Spacing

Elements should have:

- comfortable spacing
- clear grouping
- predictable alignment

Avoid crowding.

---

# Sticky Behavior

Topbars should usually remain visible.

Benefits:

- persistent actions
- orientation
- quick access

---

# Topbar States

Supports:

1. Default
2. Scrolled
3. Loading
4. Mobile

---

# Scrolled State

Should remain subtle.

Avoid dramatic visual changes.

---

# Loading State

Preserve layout.

Use:

- skeleton text
- disabled actions

Avoid:

- jumping elements

---

# Mobile Topbar

Mobile prioritizes:

```
Menu

Title

Primary Action
```

Optional:

```
Search

Notifications
```

---

# Mobile Rules

Avoid:

- squeezing desktop controls
- hiding critical actions

Use:

- simplified layout
- menus

---

# Topbar + Sidebar Relationship

Together:

```
┌──────────────────────────────┐
│             Topbar            │
├───────────┬──────────────────┤
│           │                  │
│ Sidebar   │   Workspace      │
│           │                  │
└───────────┴──────────────────┘
```

---

# Topbar Accessibility

Must:

- support keyboard navigation
- maintain focus visibility
- provide labels for icons
- support screen readers

---

# Icon-Only Controls

Every icon-only action requires:

- accessible label
- tooltip where appropriate

---

# Topbar Anti-Patterns

Avoid:

## Too Many Buttons

The Topbar is not an action bar.

---

## Marketing Content

Avoid banners and promotions.

---

## Duplicate Navigation

Do not repeat sidebar items.

---

## Hidden Context

Users should always know location.

---

## Notification Overload

Do not make everything urgent.

---

# Implementation Rules

Topbar should:

- consume design tokens
- integrate with routing
- support responsive layouts
- support user state
- support permissions
- support product context

---

# Component Structure Direction

Future implementation:

```
<AppTopbar>

  <ProductContext />

  <PageActions />

  <GlobalSearch />

  <NotificationMenu />

  <UserMenu />

</AppTopbar>
```

---

# Related Components

Topbar works alongside:

```
Sidebar

DashboardShell

Breadcrumbs

CommandMenu

PageHeader
```

---

# Final Principle

The Topbar is BuildRail's command surface.

It should make important actions available while keeping attention on the work.

A great Topbar feels calm:

"I know where I am. I know what I can do."
