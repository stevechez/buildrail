# BuildRail Design System

# Foundations — 05 Color System

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail color system defines how color communicates meaning throughout the product ecosystem.

Color is not decoration.

Color is information.

Every use of color should help users:

- understand hierarchy
- identify actions
- recognize status
- navigate information
- make decisions faster

The color system exists to create consistency across every BuildRail application.

---

# Core Color Philosophy

BuildRail uses color with restraint.

The majority of the interface should be neutral.

Color should be reserved for moments where it communicates something important.

A successful BuildRail interface should feel:

- calm
- organized
- professional
- focused

Not:

- loud
- playful
- visually overwhelming

---

# Semantic Colors Over Literal Colors

BuildRail uses semantic color tokens.

Components should never reference colors directly.

---

## Avoid

```
blue-600

gray-200

green-500

red-600
```

---

## Prefer

```
action.primary

surface.default

border.default

status.success

status.error
```

---

# Why Semantic Colors Matter

Semantic naming allows the design system to evolve.

Example:

Today:

```
action.primary = contractor blue
```

Tomorrow:

```
action.primary = different brand color
```

The interface does not change because components understand the purpose, not the color.

---

# Color Categories

The BuildRail color system is organized into six categories:

1. Surfaces
2. Text
3. Borders
4. Actions
5. Status
6. Data Visualization

---

# 1. Surface Colors

Surfaces create hierarchy and organization.

They define where content exists.

---

## Surface Levels

### Canvas

The overall application background.

Used for:

- page backgrounds
- application workspace

---

### Surface

Primary content containers.

Used for:

- cards
- panels
- sections

---

### Elevated Surface

Content requiring visual separation.

Used for:

- dropdowns
- popovers
- dialogs

---

### Interactive Surface

Surfaces that respond to user interaction.

Used for:

- hover states
- selected rows
- active navigation

---

# Surface Rules

Surfaces should remain subtle.

Avoid creating excessive visual layers.

If everything has a background, nothing has hierarchy.

---

# 2. Text Colors

Text communicates hierarchy.

BuildRail uses a structured text system.

---

## Primary Text

Used for:

- headings
- important values
- primary content

Purpose:

Maximum readability.

---

## Secondary Text

Used for:

- descriptions
- metadata
- supporting information

Purpose:

Provide context without competing.

---

## Muted Text

Used for:

- timestamps
- placeholders
- helper text

Purpose:

Supporting information.

---

## Disabled Text

Used only when interaction is unavailable.

Disabled content should remain understandable.

---

# Text Rules

Do not use color alone to create hierarchy.

Hierarchy comes from:

1. Typography
2. Spacing
3. Position
4. Color

Color is the final reinforcement.

---

# 3. Border Colors

Borders provide structure.

They should define relationships without creating visual noise.

---

## Border Default

Used for:

- cards
- inputs
- tables
- dividers

---

## Border Strong

Used when additional separation is required.

Examples:

- selected items
- important boundaries

---

## Border Focus

Used for keyboard and active states.

---

# Border Philosophy

Prefer subtle borders over heavy shadows.

A well-designed interface should feel organized without appearing boxed in.

---

# 4. Action Colors

Actions guide users toward meaningful work.

---

# Primary Action

Used for the most important action on a page.

Examples:

- Create Estimate
- Save Project
- Send Proposal

Rules:

Only one primary action should usually exist per context.

---

# Secondary Action

Used for supporting actions.

Examples:

- Export
- Duplicate
- View Details

---

# Destructive Action

Used for irreversible actions.

Examples:

- Delete Project
- Remove User

Destructive actions require clear communication.

---

# Action Color Rules

Never use primary color simply because a screen feels empty.

Primary color indicates importance.

---

# 5. Status Colors

Status colors communicate system meaning.

They are not decorative.

---

# Success

Meaning:

Completed.

Approved.

Healthy.

Examples:

- Payment received
- Estimate accepted
- Task completed

---

# Warning

Meaning:

Attention required.

Examples:

- Missing information
- Approaching deadline
- Pending action

---

# Error

Meaning:

Something failed or requires correction.

Examples:

- Failed payment
- Invalid information
- Unable to save

---

# Information

Meaning:

Helpful context.

Examples:

- Tips
- Updates
- Guidance

---

# Status Rules

Never communicate meaning using color alone.

Example:

Bad:

A red dot with no explanation.

Good:

Red indicator + "Payment Failed"

---

# 6. Data Visualization Colors

Charts and analytics require special handling.

Rules:

- Maintain contrast
- Avoid overly bright colors
- Support color blindness
- Do not rely only on color differences

Data colors should remain secondary to the information itself.

---

# Brand Color Philosophy

BuildRail uses a professional blue-based identity.

The primary brand color should communicate:

- reliability
- competence
- stability
- trust

It should not communicate:

- excitement
- entertainment
- urgency

---

# Color Distribution

A typical interface should approximately follow:

```
85% Neutral

10% Primary Brand

5% Status / Accent
```

This keeps the experience calm.

---

# Dark Mode Principles

Dark mode is not an inverted light mode.

It requires intentional design.

Dark mode should:

- reduce eye strain
- preserve hierarchy
- maintain contrast
- avoid pure black surfaces

Avoid:

```
#000000 background
```

Prefer layered dark surfaces.

---

# Accessibility Requirements

All colors must meet:

- WCAG AA contrast standards
- Clear focus visibility
- Non-color communication where needed

---

# Color Testing Requirements

Before approving colors, verify:

## Text

Readable at all sizes.

## Controls

Clearly interactive.

## Status

Understandable without relying only on color.

## Dark Mode

Maintains hierarchy.

---

# Implementation Rules

When implemented, the color system should:

- use semantic tokens
- support light and dark themes
- integrate with Tailwind
- avoid hardcoded component colors
- be centrally managed

---

# Example Token Structure

Future implementation should follow this pattern:

```
colors:

surface:
  default
  elevated
  muted

text:
  primary
  secondary
  muted

border:
  default
  strong
  focus

action:
  primary
  secondary
  destructive

status:
  success
  warning
  error
  info
```

---

# Final Principle

BuildRail uses color to communicate, not decorate.

The best color system is one users barely notice because everything feels clear, organized, and natural.

Color should guide work.

Never compete with it.
