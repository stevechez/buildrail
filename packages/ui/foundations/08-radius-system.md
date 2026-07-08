# BuildRail Design System

# Foundations — 08 Radius System

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail radius system defines how rounded corners are used throughout the product ecosystem.

Radius affects the emotional character of an interface.

It influences whether software feels:

- professional
- friendly
- playful
- technical
- premium

BuildRail uses radius to create clarity and refinement without introducing unnecessary softness.

---

# Radius Philosophy

BuildRail uses restrained rounding.

Rounded corners should communicate:

- grouping
- approachability
- hierarchy
- polish

They should not exist purely as decoration.

Every rounded edge should have a purpose.

---

# Core Principle

## Soft Enough To Feel Modern. Precise Enough To Feel Professional.

BuildRail is business software.

The interface should feel trustworthy and structured.

We avoid extreme rounding that makes professional tools feel like consumer applications.

---

# Radius Scale

BuildRail uses a limited radius scale.

Avoid arbitrary values.

The foundation values are:

```
none

xs

sm

md

lg

xl

full
```

---

# Radius Tokens

Future implementation should expose semantic tokens.

Example:

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

# Token Values

The exact values are implementation details, but the intended scale is:

```
none
0px

xs
2px

sm
4px

md
8px

lg
12px

xl
16px

full
9999px
```

---

# Usage Guidelines

## radius.none

Used when:

- sharp alignment is required
- visual separation is unnecessary
- dense data presentation benefits from structure

Examples:

- full-width layouts
- some table structures

---

## radius.xs

Used for subtle rounding.

Examples:

- small controls
- compact elements
- badges

---

## radius.sm

Default small component rounding.

Examples:

- inputs
- small buttons
- compact controls

---

## radius.md

Primary BuildRail component radius.

Examples:

- buttons
- cards
- dropdowns
- standard controls

This should be the most commonly used radius.

---

## radius.lg

Used for larger surfaces.

Examples:

- panels
- dialogs
- larger cards

---

## radius.xl

Reserved for special large containers.

Examples:

- marketing sections
- onboarding panels
- major feature areas

Use sparingly.

---

## radius.full

Used only for pill-shaped elements.

Examples:

- status badges
- tags
- avatars
- compact indicators

---

# Component Radius Rules

## Buttons

Default:

```
radius.md
```

Buttons should feel clickable and approachable without appearing playful.

---

## Inputs

Default:

```
radius.md
```

Inputs should feel familiar and stable.

---

## Cards

Default:

```
radius.lg
```

Cards represent meaningful groups of information.

---

## Dialogs

Default:

```
radius.lg
```

Dialogs should feel like focused surfaces.

---

## Badges

Default:

```
radius.full
```

Badges communicate compact status.

---

## Avatars

Default:

```
radius.full
```

---

# Radius and Hierarchy

Radius can help communicate levels of importance.

Example:

Application surface:

```
radius.none
```

Content cards:

```
radius.lg
```

Interactive controls:

```
radius.md
```

Status indicators:

```
radius.full
```

The difference creates visual structure.

---

# Avoid Excessive Rounding

BuildRail avoids the common SaaS pattern of rounding everything heavily.

Avoid:

```
24px cards everywhere

pill-shaped buttons

large floating containers

overly soft interfaces
```

Excessive rounding makes enterprise software feel less serious.

---

# Avoid Inconsistent Radius

Do not create:

```
Card A = 10px

Card B = 14px

Card C = 18px
```

without a system reason.

Consistency creates trust.

---

# Radius and Brand Personality

Radius should reinforce the BuildRail character:

Experienced.

Calm.

Professional.

Precise.

---

# Marketing vs Application Usage

Marketing experiences may use slightly larger radius values to create visual interest.

Application interfaces should remain restrained.

The product is a tool.

The marketing site tells the story.

They share a brand but have different purposes.

---

# Accessibility Considerations

Radius must never interfere with usability.

Ensure:

- sufficient contrast remains visible
- focus states are clear
- controls remain identifiable
- touch targets remain appropriate

Rounded corners should never replace clear interaction states.

---

# Implementation Rules

The radius system should:

- use semantic tokens
- integrate with Tailwind
- avoid arbitrary values
- be shared across all applications
- support future theme changes

Components should consume radius tokens.

Components should not define custom radius values.

---

# Example Semantic Structure

Future implementation:

```
radius:

none

xs

sm

md

lg

xl

full
```

---

# Final Principle

Radius is a finishing detail that communicates product character.

BuildRail should feel refined, not playful.

The right amount of rounding creates warmth while preserving professionalism.

Precision first.

Polish second.
