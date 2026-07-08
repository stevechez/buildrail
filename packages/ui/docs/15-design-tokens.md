# BuildRail Design System

# 15 — Design Tokens

Version: 1.0

Status: Approved

---

# Purpose

Design tokens are the foundation layer that connects BuildRail design decisions to implementation.

Tokens create a shared language between:

- designers
- engineers
- products
- components
- themes

They represent reusable decisions about:

- color
- typography
- spacing
- radius
- elevation
- motion
- layout

---

# Token Philosophy

BuildRail does not hardcode design decisions inside components.

Components consume tokens.

Tokens define meaning.

---

# Core Principle

## Components Use Tokens. Tokens Define Intent.

A component should know:

"Use the primary action color."

It should not know:

"Use blue-600."

---

# Why Tokens Exist

Without tokens:

```
Button
  blue-600

Card
  gray-200

Input
  gray-300
```

Over time:

- colors drift
- spacing becomes inconsistent
- themes become difficult
- redesigns become expensive

---

With tokens:

```
Button
  action.primary

Card
  border.default

Input
  surface.default
```

The system remains consistent.

---

# Token Categories

BuildRail tokens are organized into:

1. Color
2. Typography
3. Spacing
4. Radius
5. Elevation
6. Motion
7. Layout
8. Breakpoints

---

# Token Naming Philosophy

Tokens describe purpose.

They should not describe appearance.

---

# Avoid

```
blue500

gray100

rounded8

shadowSmall
```

---

# Prefer

```
action.primary

surface.default

radius.md

elevation.subtle
```

---

# Token Architecture

BuildRail uses three token layers.

---

# Layer 1 — Primitive Tokens

Raw design values.

These are the foundational building blocks.

Examples:

```
blue.500

neutral.100

space.4

radius.8
```

Primitive tokens should rarely be used directly by components.

---

# Layer 2 — Semantic Tokens

Meaning-based decisions.

Examples:

```
action.primary

text.primary

surface.default

border.default
```

This is the primary layer used by components.

---

# Layer 3 — Component Tokens

Component-specific decisions.

Examples:

```
button.primary.background

card.padding

input.height
```

Component tokens should only exist when necessary.

---

# Color Tokens

Color tokens define meaning.

Structure:

```
color

├── surface
├── text
├── border
├── action
├── status
└── data
```

---

# Surface Tokens

Examples:

```
surface.canvas

surface.default

surface.elevated

surface.interactive
```

---

# Text Tokens

Examples:

```
text.primary

text.secondary

text.muted

text.disabled
```

---

# Border Tokens

Examples:

```
border.default

border.strong

border.focus
```

---

# Action Tokens

Examples:

```
action.primary

action.secondary

action.destructive
```

---

# Status Tokens

Examples:

```
status.success

status.warning

status.error

status.info
```

---

# Typography Tokens

Typography tokens define text roles.

Structure:

```
typography

├── display
├── heading
├── body
├── label
└── caption
```

---

Example:

```
typography.heading.h1

typography.body.default

typography.label
```

Each token defines:

- font family
- size
- weight
- line height
- letter spacing

---

# Spacing Tokens

Spacing uses the BuildRail 8-point system.

Structure:

```
space.1

space.2

space.3

space.4

space.6

space.8

space.12

space.16
```

---

# Radius Tokens

Structure:

```
radius.none

radius.xs

radius.sm

radius.md

radius.lg

radius.xl

radius.full
```

---

# Elevation Tokens

Structure:

```
elevation.none

elevation.subtle

elevation.raised

elevation.floating

elevation.overlay
```

---

# Motion Tokens

Motion tokens define timing and behavior.

Structure:

```
motion.duration.fast

motion.duration.normal

motion.duration.slow

motion.easing.standard
```

---

# Layout Tokens

Layout tokens define common structures.

Examples:

```
layout.page-padding

layout.content-width

layout.sidebar-width

layout.header-height
```

---

# Breakpoint Tokens

Responsive behavior should use shared breakpoints.

Examples:

```
breakpoint.mobile

breakpoint.tablet

breakpoint.desktop

breakpoint.large
```

---

# Theme Tokens

Themes modify semantic tokens.

Example:

Light:

```
surface.default
=
white
```

Dark:

```
surface.default
=
dark neutral
```

Components do not change.

Only token values change.

---

# Dark Mode Token Rules

Dark mode should not create separate components.

The same semantic tokens must work across themes.

Example:

```
text.primary
```

exists in both:

- light theme
- dark theme

---

# Token Usage Rules

Components should:

- consume semantic tokens
- avoid hardcoded values
- inherit theme behavior
- follow spacing rules

---

# Components Should Not

Define:

```
background-color: blue
```

or:

```
padding: 13px
```

or:

```
border-radius: 11px
```

unless there is a documented exception.

---

# Token Ownership

Design decisions belong in:

```
packages/ui
```

Product applications consume the system.

Example:

```
apps/

├── estimator
├── field
├── vault
└── sites
```

should not redefine:

- colors
- typography
- spacing
- components

---

# Implementation Strategy

The token system should eventually map to:

## CSS Variables

Example:

```
--color-action-primary
```

---

## Tailwind

Example:

```
bg-action-primary
```

---

## TypeScript

Example:

```
tokens.colors.action.primary
```

---

# Token Review Checklist

Before creating a new token:

Ask:

## Is this repeated?

If only used once, it may not need a token.

---

## Does it represent meaning?

Prefer semantic names.

---

## Does it improve consistency?

Tokens should reduce variation.

---

## Will products share this?

Shared decisions belong in the system.

---

# Token Anti-Patterns

Avoid:

## Too Many Tokens

Complexity reduces adoption.

---

## Visual Naming

```
darkBlue
```

instead of:

```
action.primary
```

---

## Product-Specific Tokens

A shared system should not contain one-off product decisions.

---

## Component Leakage

Do not create tokens for every CSS property.

---

# Example Token Structure

Future implementation:

```
tokens/

colors

typography

spacing

radius

elevation

motion

layout

breakpoints
```

---

# Final Principle

Design tokens are the contract between design and engineering.

They allow BuildRail to grow without losing consistency.

A mature product is not built from individual screens.

It is built from shared decisions.
