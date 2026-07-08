# BuildRail Design System

# Foundations — 09 Elevation and Shadows

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail elevation system defines how depth, layering, and focus are communicated through the interface.

Elevation helps users understand:

- what belongs together
- what is interactive
- what requires attention
- what is temporarily above other content

Elevation is not decoration.

It is a communication tool.

---

# Elevation Philosophy

BuildRail uses minimal elevation.

Most application content should exist naturally on the page surface.

Elevation is reserved for elements that need separation.

The goal is not to make interfaces appear three-dimensional.

The goal is to create clear hierarchy.

---

# Core Principle

## Flat By Default. Elevated By Purpose.

If everything is elevated, nothing feels important.

A page filled with floating cards creates visual competition.

BuildRail uses elevation intentionally.

---

# Elevation Model

BuildRail uses five levels of visual depth.

```
Level 0 — Base

Level 1 — Subtle Separation

Level 2 — Content Surface

Level 3 — Floating Elements

Level 4 — Focused Overlays
```

---

# Level 0 — Base Surface

The default application environment.

Used for:

- page backgrounds
- workspace areas
- large content regions

Characteristics:

- no shadow
- minimal borders
- calm visual foundation

Most of the application lives here.

---

# Level 1 — Subtle Separation

Used when content needs slight distinction.

Examples:

- cards
- grouped sections
- panels

Preferred methods:

1. background difference
2. border
3. subtle shadow

Use shadows only when borders or color separation are insufficient.

---

# Level 2 — Content Surface

Used for primary contained information.

Examples:

- dashboard cards
- information panels
- forms

Characteristics:

- clear grouping
- subtle separation
- consistent appearance

Content should feel organized, not floating.

---

# Level 3 — Floating Elements

Used for temporary or interactive elements.

Examples:

- dropdown menus
- popovers
- command menus
- date pickers

These elements need to appear above surrounding content.

---

# Level 4 — Focused Overlays

Used for attention-demanding experiences.

Examples:

- dialogs
- confirmations
- critical workflows

These elements intentionally separate users from the background.

---

# Shadow Philosophy

Shadows should communicate position.

They should answer:

"Is this element above something else?"

They should not answer:

"How do we make this card look premium?"

---

# Shadow Rules

Use shadows for:

- floating elements
- overlays
- temporary surfaces
- important focus areas

Avoid shadows for:

- every card
- every section
- every container

---

# Shadow Scale

Future implementation should define semantic shadow tokens.

Example:

```
shadow.none

shadow.sm

shadow.md

shadow.lg

shadow.xl
```

---

# Shadow Usage

## shadow.none

Default.

Used for:

- base layouts
- flat content

---

## shadow.sm

Subtle separation.

Used for:

- cards
- small surfaces
- minor elevation

---

## shadow.md

Clear floating effect.

Used for:

- menus
- popovers
- dropdowns

---

## shadow.lg

Focused overlays.

Used for:

- dialogs
- important temporary surfaces

---

## shadow.xl

Rare.

Reserved for special cases.

Avoid normal product usage.

---

# Borders vs Shadows

BuildRail prefers borders before shadows.

A border communicates:

"This belongs together."

A shadow communicates:

"This is above something else."

---

# Use Borders When

- grouping information
- separating sections
- defining containers

---

# Use Shadows When

- creating layers
- showing temporary surfaces
- focusing attention

---

# Cards

Cards are common in business software.

BuildRail cards should not all float.

A card exists to group related information.

Preferred hierarchy:

```
Page

→ Section

→ Card

→ Content
```

Not:

```
Floating Card

Floating Card

Floating Card

Floating Card
```

---

# Dialogs and Overlays

Dialogs represent temporary elevation.

They should:

- clearly separate from background
- maintain focus
- provide clear actions

Elevation communicates:

"Your attention is needed here."

---

# Navigation Elevation

Navigation should feel integrated.

Avoid making sidebars appear like floating objects.

Navigation is part of the workspace.

---

# Tables and Data Views

Tables generally remain flat.

Avoid placing tables inside heavily elevated containers.

Professional users need information density, not decorative layers.

---

# Elevation and Motion

Elevation changes may be accompanied by subtle motion.

Examples:

- dropdown appearing
- dialog opening
- menu expanding

Motion should explain the change in hierarchy.

---

# Dark Mode Considerations

Dark interfaces require careful elevation.

Do not rely only on shadows.

Dark mode elevation may use:

- surface changes
- borders
- subtle contrast shifts

A shadow on a dark surface may not communicate depth effectively.

---

# Elevation Anti-Patterns

Avoid:

## Shadow Everywhere

Every component floating.

---

## Giant Drop Shadows

Creates a marketing-style appearance.

---

## Artificial Depth

Making flat content look like physical objects.

---

## Layer Confusion

Too many levels of elevation.

---

# Accessibility Considerations

Elevation must never be the only way to communicate importance.

Important information should also use:

- labels
- hierarchy
- contrast
- position

---

# Implementation Rules

The elevation system should:

- use semantic tokens
- integrate with Tailwind
- support light and dark themes
- avoid component-specific shadows
- remain consistent across products

Components should consume elevation tokens.

Components should not invent custom shadows.

---

# Example Semantic Structure

Future implementation:

```
elevation:

none

subtle

raised

floating

overlay
```

---

# Final Principle

Elevation should guide attention, not decorate the interface.

The best BuildRail interfaces feel grounded.

Important things rise naturally.

Everything else stays calm.
