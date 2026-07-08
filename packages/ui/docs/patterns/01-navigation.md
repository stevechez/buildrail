# BuildRail Design System

# Patterns — 01 Navigation

Version: 1.0

Status: Approved

---

# Purpose

The Navigation system defines how users move through BuildRail applications, products, and workflows.

Navigation helps users understand:

- where they are
- where they can go
- what matters most
- how the system is organized

---

# Navigation Philosophy

Navigation is the map of the product.

A strong navigation system creates:

- orientation
- confidence
- predictability

Users should not have to think about how to move through BuildRail.

---

# Core Principle

## Navigation Should Reveal Structure, Not Create Complexity.

The product hierarchy should be obvious.

---

# BuildRail Navigation Model

BuildRail uses a layered navigation system:

```
Platform Navigation

        ↓

Application Navigation

        ↓

Page Navigation

        ↓

Local Actions
```

---

# Layer 1 — Platform Navigation

Purpose:

Move between BuildRail products.

Example:

```
BuildRail

├── SiteVerdict
├── Estimator
├── Field
├── Vault
├── Sites
└── Growth
```

---

# Platform Navigation Rules

Platform navigation should:

- remain consistent across products
- identify the current application
- provide access to switching tools

---

# Layer 2 — Application Navigation

Purpose:

Navigate within a specific product.

Example:

Estimator:

```
Dashboard

Estimates

Customers

Templates

Settings
```

---

# Application Navigation Rules

Application navigation should:

- reflect user workflows
- prioritize frequent tasks
- avoid unnecessary sections

---

# Layer 3 — Page Navigation

Purpose:

Move within a specific workflow.

Examples:

Project:

```
Overview

Documents

Messages

Activity
```

---

# Layer 4 — Local Actions

Purpose:

Complete tasks.

Examples:

```
Create Estimate

Export

Invite User

Archive
```

---

# Navigation Hierarchy

BuildRail uses:

```
Primary

Secondary

Utility
```

---

# Primary Navigation

Contains the most important destinations.

Example:

```
Projects

Estimates

Customers
```

---

# Secondary Navigation

Contains supporting areas.

Example:

```
Reports

Templates

Integrations
```

---

# Utility Navigation

Contains account-level actions.

Example:

```
Profile

Notifications

Help

Settings
```

---

# Navigation Principles

## Principle 1

The most important destinations should be easiest to reach.

---

## Principle 2

Navigation should match user workflows.

---

## Principle 3

Do not expose everything.

Progressive disclosure improves usability.

---

# Navigation Density

BuildRail avoids crowded navigation.

Preferred:

```
5–7 primary items
```

More complex products should use grouping.

---

# Navigation Groups

Related items should be grouped.

Example:

```
Projects

  Active Projects

  Archived Projects


Financial

  Estimates

  Payments
```

---

# Naming Rules

Navigation labels should be:

- clear
- short
- familiar

---

# Good

```
Projects

Customers

Reports
```

---

# Avoid

```
Operational Workspace

Relationship Center

Analytics Hub
```

unless users understand those terms.

---

# Navigation Icons

Icons may support recognition.

Use:

- Lucide icons
- consistent sizing
- meaningful symbols

---

# Icon Rules

Icons should:

- reinforce labels
- not replace important labels

Avoid:

```
Only icons for desktop navigation
```

unless space requires it.

---

# Active State

Users must always know:

"Where am I?"

Active navigation should communicate:

- current location
- application context

---

# Active State Rules

Use:

- subtle background
- text emphasis
- indicator

Avoid:

- excessive animation
- bright distracting colors

---

# Collapsed Navigation

For complex applications:

Navigation may collapse.

Example:

Expanded:

```
Projects

Customers

Estimates
```

Collapsed:

```
[icons]
```

---

# Collapsed Navigation Requirements

Must support:

- tooltips
- accessibility labels
- current location indicator

---

# Mobile Navigation

Mobile navigation prioritizes:

- most common actions
- current workflow

Possible patterns:

```
Bottom Navigation

Drawer

Menu
```

---

# Responsive Rules

Desktop:

```
Persistent navigation
```

Tablet:

```
Collapsible navigation
```

Mobile:

```
Compact navigation
```

---

# Navigation Between BuildRail Products

Product switching should feel unified.

Example:

```
BuildRail

Current:

Estimator

Switch:

Field
Vault
Sites
```

---

# Cross-Product Consistency

Every BuildRail product should share:

- navigation behavior
- terminology
- layout patterns

---

# Navigation State

Navigation should preserve:

- current location
- filters when appropriate
- workflow context

---

# Navigation Anti-Patterns

Avoid:

## Too Many Items

Creates cognitive overload.

---

## Hidden Core Features

Important workflows should be visible.

---

## Changing Navigation Between Products

Creates fragmentation.

---

## Clever Naming

Clarity beats branding.

---

## Deep Nesting

Avoid:

```
Menu

 → Section

   → Subsection

      → Page

        → Feature
```

---

# Accessibility Requirements

Navigation must:

- support keyboard access
- provide current location indicators
- use semantic navigation landmarks
- maintain focus visibility
- support screen readers

---

# Keyboard Behavior

Users should be able to:

- navigate links
- identify current page
- access menus

---

# Implementation Rules

Navigation components should:

- consume design tokens
- support responsive layouts
- support active states
- integrate with routing
- support permissions

---

# Component Relationship

Navigation works with:

```
Sidebar

Topbar

Breadcrumbs

DashboardShell

CommandMenu
```

---

# Future Components

Navigation will define:

```
Sidebar

Topbar

Breadcrumbs

MobileMenu

ProductSwitcher

CommandPalette
```

---

# Final Principle

Navigation is the foundation of trust.

Users should always know:

"Where am I?"

"What can I do?"

"Where do I go next?"

BuildRail navigation should feel calm, predictable, and professional.
