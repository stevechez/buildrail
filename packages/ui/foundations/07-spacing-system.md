# BuildRail Design System

# Foundations — 07 Spacing System

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail spacing system defines how distance and layout rhythm are created throughout the product ecosystem.

Spacing is not empty space.

Spacing creates:

- hierarchy
- grouping
- readability
- focus
- visual balance

A consistent spacing system allows every BuildRail application to feel like part of one platform.

---

# Spacing Philosophy

BuildRail uses spacing intentionally.

Space should communicate relationships.

Related items should be closer.

Unrelated items should have more separation.

The goal is not maximum whitespace.

The goal is meaningful whitespace.

---

# Core Principle

## Consistent Rhythm Creates Professional Interfaces

Users should feel that every screen has been carefully organized.

Spacing should never feel random.

Every distance should come from the BuildRail spacing scale.

---

# The BuildRail Grid

BuildRail uses an 8-point spacing system.

The foundation unit is:

```
8px
```

Most spacing values should be multiples of 8.

A smaller 4px increment is allowed when needed for precision.

---

# Base Units

The system uses:

```
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
96px
```

---

# Spacing Tokens

Future implementation should expose semantic tokens.

Example:

```
space.1

space.2

space.3

space.4

space.6

space.8

space.10

space.12

space.16

space.20

space.24
```

---

# Token Usage

Spacing tokens should describe size relationships, not individual situations.

Avoid creating:

```
cardPadding

buttonGap

tableSpacing
```

Prefer:

```
space.4

space.6

space.8
```

Components determine how tokens are used.

---

# Spacing Hierarchy

Spacing communicates structure.

BuildRail uses five levels of spacing.

---

# Level 1 — Internal Spacing

Small distances within components.

Examples:

- icon to text
- label to input
- button padding

Typical values:

```
4px
8px
12px
```

---

# Level 2 — Component Spacing

Space inside larger components.

Examples:

- card padding
- table cells
- form groups

Typical values:

```
16px
24px
```

---

# Level 3 — Section Spacing

Space between related groups.

Examples:

- dashboard sections
- form sections
- page areas

Typical values:

```
32px
40px
48px
```

---

# Level 4 — Layout Spacing

Large structural separation.

Examples:

- page header to content
- major dashboard regions

Typical values:

```
48px
64px
80px
```

---

# Level 5 — Page Spacing

Overall application framing.

Examples:

- page margins
- workspace padding

Typical values:

```
64px+
```

---

# Application Layout Spacing

All BuildRail applications should share consistent page structure.

A typical layout:

```
Application Header

↓

Page Title

↓

Primary Content

↓

Supporting Sections
```

Spacing should reinforce this hierarchy.

---

# Page Padding

Pages should have predictable horizontal and vertical padding.

Avoid:

- content touching edges
- inconsistent application margins
- unique page spacing

---

# Card Spacing

Cards should feel organized, not cramped.

Cards typically use:

- consistent internal padding
- clear separation between sections
- predictable header/content/action spacing

Avoid:

- cards with different padding everywhere
- excessive empty space
- nested cards

---

# Form Spacing

Forms require careful rhythm.

Relationship priority:

```
Label

↓

Input

↓

Helper Text

↓

Next Field
```

Spacing should make the form easy to scan.

---

# Table Spacing

Tables require higher information density.

Spacing should support:

- scanning
- comparison
- quick reading

Avoid:

- oversized rows
- excessive whitespace
- cramped information

Professional users often need to review large datasets quickly.

---

# Dashboard Spacing

Dashboards balance overview and density.

A dashboard should:

- provide quick scanning
- separate important information
- avoid overwhelming users

Use spacing to create groups.

Do not rely only on cards.

---

# Responsive Spacing

Spacing should adapt across devices.

Desktop:

More generous spacing.

Tablet:

Moderate reduction.

Mobile:

Prioritize usability and touch interaction.

---

# Mobile Rules

Mobile layouts should not simply compress desktop spacing.

Adjust:

- page padding
- card spacing
- section separation
- touch targets

Maintain clarity over density.

---

# Spacing and Visual Hierarchy

When information hierarchy is unclear:

First adjust spacing.

Before changing:

- colors
- font sizes
- borders

Ask:

"Is this simply a spacing problem?"

Often the answer is yes.

---

# Spacing Anti-Patterns

Avoid:

## Random Values

Example:

```
13px
27px
37px
```

Without a strong reason.

---

## Equal Spacing Everywhere

Not everything has the same relationship.

Important relationships need more space.

---

## Excessive Padding

More space does not always mean better design.

---

## Cramped Interfaces

Professional does not mean dense and uncomfortable.

---

# Implementation Rules

The spacing system should:

- be token based
- integrate with Tailwind
- avoid arbitrary values
- support responsive behavior
- be shared across all applications

Components should consume spacing tokens.

Components should not invent spacing rules.

---

# Example Semantic Structure

Future implementation:

```
spacing:

1

2

3

4

6

8

10

12

16

20

24
```

Mapped internally to:

```
4px

8px

12px

16px

24px

32px

40px

48px

64px

80px

96px
```

---

# Final Principle

Spacing is the invisible structure of BuildRail.

When spacing is correct:

- interfaces feel calm
- information becomes easier to understand
- workflows feel natural

Great spacing does not call attention to itself.

It simply makes everything feel right.
