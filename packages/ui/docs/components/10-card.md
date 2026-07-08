# BuildRail Design System

# Components — 10 Card

Version: 1.0

Status: Approved

---

# Purpose

The Card component provides a structured container for grouping related information, actions, and content.

Cards help users:

- scan information
- understand relationships
- navigate workflows
- prioritize actions

Common uses:

- summaries
- previews
- dashboards
- lists
- workflows
- content sections

---

# Card Philosophy

Cards are organizational tools.

They create hierarchy by grouping related information.

They should not exist simply because a design needs boxes.

---

# Core Principle

## Use Cards To Group Meaningful Information.

A card should answer:

"What belongs together?"

---

# When To Use Cards

Use Cards for:

- independent information units
- summaries
- previews
- grouped actions
- dashboard modules

Examples:

```
Project Summary

Customer Information

Estimate Overview

Recent Activity
```

---

# When Not To Use Cards

Avoid cards for:

- every section of a page
- simple text blocks
- unnecessary decoration

Bad:

```
Card
  Card
    Card
      Text
```

Excessive cards create visual fragmentation.

---

# Card Anatomy

A standard Card contains:

```
Card

├── Header
│   ├── Title
│   ├── Description
│   └── Actions
│
├── Content
│
└── Footer
```

---

# Example

```
Project Overview

Kitchen Remodel

Status: Active

Customer:
John Smith

[View Project]
```

---

# Card Variants

BuildRail supports:

1. Default Card
2. Interactive Card
3. Metric Card
4. Feature Card
5. Empty Card

---

# Default Card

Used for:

- grouped information
- summaries
- content sections

Example:

```
Customer Details
```

---

# Interactive Card

Used when the entire card represents navigation.

Examples:

```
Project Card

Click → Open Project
```

---

# Interactive Card Rules

Interactive cards must:

- have clear affordance
- support keyboard interaction
- not hide important actions

Avoid making every card clickable.

---

# Metric Card

Used for dashboards.

Examples:

```
Active Projects

24
```

or:

```
Outstanding Payments

$42,500
```

---

# Metric Card Rules

Metrics should include:

- clear label
- meaningful value
- optional trend/context

Avoid vanity metrics.

---

# Feature Card

Used for:

- onboarding
- product capabilities
- workflow choices

Example:

```
AI Estimate Assistant

Generate proposals faster.
```

---

# Empty Card

Used when content does not exist yet.

Example:

```
No Estimates Yet

Create your first estimate.
```

---

# Card Structure Rules

Cards should maintain:

- clear hierarchy
- consistent padding
- predictable spacing

---

# Card Header

Header contains:

- title
- optional description
- optional actions

Example:

```
Recent Projects             View All
```

---

# Card Content

Content area contains the primary information.

Avoid:

- too much density
- unrelated information

---

# Card Footer

Footer contains:

- secondary actions
- metadata
- supporting information

Example:

```
Updated 5 minutes ago
```

---

# Card Actions

Actions should follow hierarchy.

Example:

```
Project Summary

[Open Project]
```

Avoid:

```
[Edit] [Delete] [Export] [Share] [Duplicate]
```

inside every card.

---

# Card Spacing

Cards use design tokens.

Internal spacing should be consistent.

Common structure:

```
Header

space

Content

space

Footer
```

---

# Card Elevation

Cards should use subtle elevation.

Default:

- border
- minimal shadow

Avoid:

- floating everywhere
- heavy shadows

---

# Card Radius

Cards use the shared radius system.

Consistency matters across products.

---

# Card Density

BuildRail supports:

## Comfortable

Default.

Used for:

- dashboards
- summaries

---

## Compact

Used for:

- tables
- dense workflows

---

## Spacious

Used for:

- onboarding
- marketing surfaces

---

# Card Lists

Multiple cards should create rhythm.

Example:

```
Project Card

Project Card

Project Card
```

---

# Card Grid Rules

Use grids when items are comparable.

Good:

```
Projects

[Card] [Card] [Card]
```

Avoid:

```
Random cards everywhere
```

---

# Mobile Behavior

Cards should:

- stack naturally
- maintain readable spacing
- avoid horizontal overflow

---

# Accessibility Requirements

Cards must:

- maintain heading hierarchy
- support keyboard interaction when clickable
- provide clear labels
- avoid relying on color alone

---

# Interactive Card Accessibility

Clickable cards require:

- keyboard support
- focus state
- semantic interaction behavior

Do not create:

```
<div onClick="">
```

without accessibility support.

---

# Card Anti-Patterns

Avoid:

## Card Everything

Not every section needs a container.

---

## Excessive Borders

Creates visual noise.

---

## Too Much Information

Cards should summarize.

---

## Hidden Actions

Important actions should remain visible.

---

## Nested Cards

Creates confusing hierarchy.

---

# Implementation Rules

The Card component should:

- consume design tokens
- support themes
- support variants
- support interactive states
- maintain accessibility requirements

---

# Component API Direction

Future implementation:

```
<Card>

  <CardHeader />

  <CardContent />

  <CardFooter />

</Card>
```

---

Variants:

```
variant="default"

variant="interactive"

variant="metric"
```

---

# Related Components

Card works alongside:

```
Badge

Avatar

Table

Dialog

DashboardShell

EmptyState
```

---

# Final Principle

Cards organize complexity.

A great Card helps users understand a piece of work quickly.

BuildRail cards should create calm, structured views of professional workflows — never visual clutter.
