# BuildRail Design System

# Patterns — 02 Sidebar

Version: 1.0

Status: Approved

---

# Purpose

The Sidebar pattern defines the primary navigation workspace used throughout BuildRail applications.

The Sidebar provides:

- application navigation
- workspace context
- product switching
- account access
- workflow orientation

---

# Sidebar Philosophy

The sidebar is the foundation of the application shell.

It should help users understand:

- where they are
- what tools are available
- how work is organized

---

# Core Principle

## The Sidebar Should Support Work, Not Compete With It.

The content area is the workspace.

The sidebar is the map.

---

# Sidebar Anatomy

A standard BuildRail Sidebar contains:

```
Sidebar

├── Brand / Product Area
│
├── Workspace Switcher
│
├── Primary Navigation
│
├── Secondary Navigation
│
├── Utility Navigation
│
└── User Menu
```

---

# Example Structure

```
BuildRail

ABC Construction ▼


Projects

Estimates

Customers

Field

Vault


Reports

Settings


Steve Maciaszek
```

---

# Sidebar Sections

Sidebar navigation is organized into clear regions.

---

# Brand Area

Contains:

- BuildRail identity
- current product
- optional product switcher

Example:

```
BuildRail

Estimator
```

---

# Workspace Switcher

Used when users belong to multiple organizations.

Example:

```
ABC Construction ▼
```

---

# Workspace Rules

The workspace switcher should:

- always show current organization
- make switching easy
- preserve context

---

# Primary Navigation

Contains daily workflows.

Example:

```
Projects

Estimates

Customers

Schedule
```

---

# Secondary Navigation

Contains less frequent tools.

Example:

```
Reports

Templates

Integrations
```

---

# Utility Navigation

Contains:

```
Help

Settings

Account
```

---

# User Menu

Usually located at bottom.

Contains:

```
Profile

Preferences

Sign Out
```

---

# Sidebar Width

BuildRail supports:

## Expanded

Default:

```
240px - 280px
```

Purpose:

- readable labels
- comfortable navigation

---

## Collapsed

Purpose:

- maximize workspace
- support power users

Contains:

- icons
- tooltips
- active state

---

# Sidebar Behavior

Sidebar should:

- remain predictable
- preserve location
- avoid unnecessary animation

---

# Active Navigation State

The active item should clearly communicate:

"You are here."

Use:

- subtle background
- text emphasis
- icon emphasis

Avoid:

- aggressive colors
- excessive motion

---

# Navigation Groups

Large applications should group related sections.

Example:

```
WORK MANAGEMENT

Projects

Schedule

Tasks


BUSINESS

Customers

Payments

Reports
```

---

# Group Rules

Groups should:

- improve scanning
- reduce cognitive load
- avoid excessive categories

---

# Sidebar Icons

Icons support recognition.

Requirements:

- Lucide icons
- consistent sizing
- meaningful mapping

---

# Icon Rules

Good:

```
Projects → Folder icon
Customers → Users icon
Settings → Gear icon
```

---

Avoid:

```
Every item has a random icon
```

---

# Sidebar Badges

Badges may appear for:

- notifications
- pending actions
- counts

Example:

```
Messages   3
```

---

# Badge Rules

Use sparingly.

Avoid:

```
Projects 24

Customers 183

Reports 12
```

unless action is required.

---

# Product Switching

BuildRail is a platform.

The sidebar should support movement between products.

Example:

```
BuildRail

Products:

✓ Estimator

  Field

  Vault

  Sites
```

---

# Product Switcher Rules

Switching products should:

- feel consistent
- preserve identity
- maintain workspace context

---

# Permissions

Sidebar visibility may change based on:

- role
- subscription
- permissions

---

# Permission Rules

Do not show unavailable features as broken links.

Options:

1. Hide unavailable features

or

2. Show locked state with explanation

---

# Sidebar States

The Sidebar supports:

1. Expanded
2. Collapsed
3. Mobile Drawer
4. Loading
5. Empty

---

# Loading State

Avoid blank navigation.

Use:

- skeleton items
- preserved structure

---

# Empty State

Rare.

Example:

```
No available tools.

Contact administrator.
```

---

# Mobile Sidebar

Mobile uses:

```
Drawer Navigation
```

---

# Mobile Rules

Mobile sidebar should:

- overlay content
- close after selection
- maintain focus
- support gestures appropriately

---

# Sidebar Responsiveness

Desktop:

```
Persistent Sidebar
```

Tablet:

```
Collapsible Sidebar
```

Mobile:

```
Drawer
```

---

# Sidebar Accessibility

Sidebar must:

- use semantic navigation
- support keyboard navigation
- expose current location
- maintain focus management
- support screen readers

---

# Keyboard Behavior

Users should be able to:

- navigate links
- open menus
- collapse/expand navigation

---

# Sidebar Anti-Patterns

Avoid:

## Too Many Items

The sidebar is not a sitemap.

---

## Deep Nesting

Avoid multiple menu levels.

---

## Hidden Primary Actions

Important workflows should be visible.

---

## Constant Animation

Professional software should feel stable.

---

## Changing Sidebar Between Apps

Creates fragmentation.

---

# Implementation Rules

Sidebar should:

- consume design tokens
- support responsive layouts
- integrate with routing
- support permissions
- support collapsed mode
- support product switching

---

# Component Structure Direction

Future implementation:

```
<AppSidebar>

  <SidebarHeader />

  <WorkspaceSwitcher />

  <SidebarNavigation />

  <SidebarFooter />

</AppSidebar>
```

---

# Related Components

Sidebar works alongside:

```
Topbar

DashboardShell

Breadcrumbs

CommandMenu

ProductSwitcher
```

---

# Final Principle

The Sidebar is BuildRail's compass.

A great sidebar lets users move confidently through complex professional workflows.

It should disappear into the background while always helping users know where they are.
