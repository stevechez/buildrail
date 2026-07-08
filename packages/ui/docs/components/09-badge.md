# BuildRail Design System

# Components — 09 Badge

Version: 1.0

Status: Approved

---

# Purpose

The Badge component provides a compact visual indicator for communicating status, category, metadata, or classification.

Badges help users quickly understand information without interrupting workflow.

Common uses:

- status
- category
- priority
- role
- state
- classification

---

# Badge Philosophy

Badges are information signals.

They should answer:

"What does this item represent right now?"

They should not exist only for visual decoration.

---

# Core Principle

## Every Badge Must Communicate Meaning.

Good:

```
Active

Paid

Needs Review

Approved
```

Bad:

```
New!

Featured

Important
```

without clear meaning.

---

# Badge Categories

BuildRail badges are divided into:

1. Status badges
2. Category badges
3. Role badges
4. Count badges
5. AI/system badges

---

# Status Badges

Used to communicate workflow state.

Examples:

```
Draft

Active

Completed

Archived

Failed
```

---

# Common BuildRail Statuses

## Projects

```
Planning

Active

On Hold

Complete
```

---

## Estimates

```
Draft

Sent

Viewed

Approved

Expired
```

---

## Payments

```
Pending

Paid

Overdue
```

---

# Category Badges

Used for classification.

Examples:

```
Residential

Commercial

Roofing

HVAC
```

Category badges should not imply urgency.

---

# Role Badges

Used to identify permissions or responsibility.

Examples:

```
Admin

Owner

Estimator

Crew Lead
```

---

# Count Badges

Used for numeric indicators.

Examples:

```
Messages  3
Notifications  5
```

Count badges should represent meaningful attention.

---

# AI/System Badges

Used carefully.

Examples:

```
AI Generated

Processing

Suggested
```

AI badges should communicate system origin or status.

They should not create unnecessary hype.

---

# Badge Variants

BuildRail supports:

1. Neutral
2. Informational
3. Success
4. Warning
5. Error
6. Accent

---

# Neutral Badge

Used for:

- metadata
- categories
- labels

Example:

```
Residential
```

---

# Informational Badge

Used for:

- helpful system information

Example:

```
Review Needed
```

---

# Success Badge

Used for:

- completed states
- successful outcomes

Examples:

```
Approved

Paid
```

---

# Warning Badge

Used for:

- attention required

Examples:

```
Expiring Soon

Needs Review
```

---

# Error Badge

Used for:

- failures
- problems

Examples:

```
Failed

Overdue
```

---

# Accent Badge

Used sparingly.

Examples:

```
Pro Plan

Featured Workflow
```

---

# Color Rules

Badge colors must communicate meaning.

Do not assign colors only for visual variety.

---

# Good

```
Green = successful state

Amber = attention

Red = problem
```

---

# Avoid

```
Every project gets a different color.
```

This creates visual noise.

---

# Badge Size

BuildRail supports:

```
sm

md
```

---

# Small Badge

Used for:

- tables
- compact metadata
- dense interfaces

---

# Medium Badge

Default.

Used for:

- cards
- headers
- workflow states

---

# Badge Shape

Badges use:

- rounded compact containers
- consistent radius token
- readable padding

Avoid:

- excessive pill styling everywhere

---

# Badge Placement

Badges should appear close to the information they describe.

Examples:

```
Project Name

Active
```

---

Table example:

```
Project        Status

Kitchen Reno   Active
```

---

# Badge Content Rules

Keep labels:

- short
- understandable
- consistent

---

# Good

```
Approved
```

---

# Avoid

```
This project has been approved by management
```

---

# Badge With Icons

Icons may be used when they improve recognition.

Examples:

```
✓ Approved

! Warning
```

---

# Icon Rules

Icons should:

- reinforce meaning
- remain optional
- use Lucide icons

Do not add icons only for decoration.

---

# Badge States

Badges are generally non-interactive.

They do not require:

- hover
- focus
- active states

unless they are clickable.

---

# Interactive Badges

If a badge is clickable:

Example:

```
[Active]
```

that is actually a filter or control.

Use:

- Button
- Filter chip
- Toggle

instead.

---

# Badge Accessibility

Badges must:

- maintain readable contrast
- not rely only on color
- provide text meaning

Example:

Bad:

```
(red dot)
```

Good:

```
Overdue
```

---

# Mobile Behavior

Badges should:

- remain readable
- avoid wrapping awkwardly
- not overcrowd headers

---

# Badge Anti-Patterns

Avoid:

## Badge Explosion

Too many badges create noise.

---

## Decorative Badges

Every badge should provide information.

---

## Color Without Meaning

Users should not have to memorize colors.

---

## Long Text

Badges are not paragraphs.

---

## Fake Buttons

Clickable badges need proper controls.

---

# Implementation Rules

The Badge component should:

- consume color tokens
- consume typography tokens
- consume radius tokens
- support themes
- maintain accessibility contrast
- provide semantic variants

---

# Component API Direction

Future implementation:

```
<Badge>
  Active
</Badge>
```

Variants:

```
variant="success"

variant="warning"

variant="error"

variant="neutral"
```

Sizes:

```
size="sm"

size="md"
```

---

# Related Components

Badge works alongside:

```
Card

Table

Avatar

StatusIndicator

Toast

Timeline
```

---

# Final Principle

Badges are the vocabulary of the product.

They allow users to scan complex systems quickly.

BuildRail badges should create clarity, not decoration.
