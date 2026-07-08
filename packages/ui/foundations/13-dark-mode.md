# BuildRail Design System

# Foundations — 13 Dark Mode

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail dark mode system defines how the product adapts to dark environments while maintaining clarity, hierarchy, and accessibility.

Dark mode is a complete visual theme.

It is not a simple inversion of the light interface.

---

# Dark Mode Philosophy

Dark mode should provide:

- reduced eye strain
- comfortable extended use
- focused workflows
- visual calm

The experience should feel:

- professional
- refined
- controlled

Not:

- futuristic
- flashy
- dramatic

---

# Core Principle

## Preserve Hierarchy, Not Colors

The goal of dark mode is not to preserve the exact colors of light mode.

The goal is to preserve:

- meaning
- importance
- relationships
- readability

---

# Dark Mode Personality

BuildRail dark mode should feel like:

A professional command center.

A focused workspace.

A calm environment for managing important work.

---

# Avoid Pure Black

Pure black creates harsh contrast.

Avoid:

```
#000000
```

for primary backgrounds.

Instead, use layered dark surfaces.

Benefits:

- reduced eye strain
- improved hierarchy
- more natural depth

---

# Surface System

Dark mode requires multiple surface levels.

Example hierarchy:

```
Application Background

↓

Content Surface

↓

Elevated Surface

↓

Overlay Surface
```

Each level should be distinguishable.

---

# Surface Relationships

Dark mode hierarchy comes from:

1. Surface brightness
2. Border contrast
3. Text hierarchy
4. Limited elevation

Not from heavy shadows.

---

# Background Surface

Used for:

- application workspace
- page backgrounds

Should feel neutral and calm.

---

# Content Surface

Used for:

- cards
- panels
- primary content areas

Should provide enough separation without appearing like floating tiles.

---

# Elevated Surface

Used for:

- menus
- dialogs
- popovers

Should clearly appear above surrounding content.

---

# Text System in Dark Mode

Text hierarchy remains consistent.

---

# Primary Text

Should provide maximum readability.

Used for:

- headings
- important values
- primary content

---

# Secondary Text

Used for:

- descriptions
- supporting information

---

# Muted Text

Used carefully.

Avoid making supporting information too dim.

Readable is more important than visual subtlety.

---

# Border System

Borders in dark mode should be subtle.

Used for:

- separation
- grouping
- focus states

Avoid:

- heavy outlines
- excessive visible borders

---

# Brand Color in Dark Mode

The BuildRail brand color should adapt.

The same brand color may require:

- adjusted brightness
- different contrast levels
- lighter variants

Do not simply reuse light-mode colors.

---

# Action Colors

Actions should remain recognizable.

Primary actions should:

- stand out clearly
- maintain accessibility
- avoid excessive brightness

---

# Status Colors

Status meanings remain consistent.

Success:

Completion and health.

Warning:

Attention required.

Error:

Problem requiring action.

Information:

Helpful context.

---

# Status Color Rules

Status colors should not dominate the interface.

A dashboard full of bright warnings creates unnecessary stress.

Use status colors only where meaning exists.

---

# Forms in Dark Mode

Inputs require careful treatment.

Ensure:

- clear boundaries
- visible focus states
- readable placeholders
- clear disabled states

Avoid:

- low contrast input fields
- invisible borders

---

# Tables in Dark Mode

Tables require strong hierarchy.

Support:

- readable rows
- clear headers
- subtle separators

Avoid:

- excessive grid lines
- glowing highlights
- distracting row colors

---

# Charts and Data Visualization

Dark mode charts require careful contrast.

Rules:

- maintain readability
- avoid overly saturated colors
- preserve meaning
- support color accessibility

Charts should remain professional.

---

# Shadows in Dark Mode

Shadows are less effective on dark backgrounds.

Prefer:

- surface contrast
- subtle borders
- controlled elevation

Use shadows only when needed.

---

# Motion in Dark Mode

Motion behavior remains the same.

Avoid adding:

- glowing effects
- animated highlights
- dramatic transitions

Dark mode is not a different personality.

---

# Theme Consistency

Light and dark modes should feel like the same product.

Users should recognize:

- the same layout
- the same components
- the same hierarchy
- the same interactions

Only the visual environment changes.

---

# User Preference

BuildRail should support:

- light mode
- dark mode
- system preference

The user's preference should be respected.

---

# Accessibility Requirements

Dark mode must maintain:

- WCAG contrast requirements
- visible focus states
- readable text
- understandable status communication

Never sacrifice accessibility for aesthetics.

---

# Dark Mode Anti-Patterns

Avoid:

## Pure Black Everything

Creates harshness.

---

## Neon Accents

Feels like gaming or developer tooling.

---

## Bright Text Everywhere

Creates eye fatigue.

---

## Fake Depth

Using excessive shadows to create layers.

---

## Different Product Personality

Dark mode should still feel like BuildRail.

---

# Implementation Rules

The dark mode system should:

- use semantic color tokens
- support CSS variables
- integrate with Tailwind
- maintain light/dark parity
- support system preferences

Components should consume semantic colors.

Components should not define their own dark mode values.

---

# Example Theme Structure

Future implementation:

```
theme:

light:
  surface
  text
  border
  action
  status

dark:
  surface
  text
  border
  action
  status
```

---

# Final Principle

Dark mode is not about making software darker.

It is about creating a comfortable, focused environment where professionals can do important work.

The interface changes color.

The BuildRail experience remains the same.
