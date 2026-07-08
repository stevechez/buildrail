# BuildRail Design System

# Foundations — 12 Responsive Design

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail responsive design system defines how experiences adapt across screen sizes and devices.

Responsive design is not simply making a desktop interface smaller.

It is designing the right experience for each environment.

BuildRail users work across:

- desktop computers
- laptops
- tablets
- mobile devices

Each environment has different needs.

---

# Responsive Philosophy

BuildRail prioritizes:

1. Task completion
2. Information clarity
3. Accessibility
4. Performance
5. Visual consistency

The experience may change between devices, but the product identity remains the same.

---

# Core Principle

## Adapt the Experience. Do Not Shrink the Interface.

Desktop, tablet, and mobile should feel intentionally designed.

A mobile interface should not feel like a compressed desktop application.

---

# User Context Matters

Responsive decisions should consider:

## Office Environment

Typical needs:

- detailed information
- multiple workflows
- complex management tasks

Preferred experience:

- full navigation
- larger data views
- advanced controls

---

## Jobsite Environment

Typical needs:

- quick access
- simple actions
- immediate information

Preferred experience:

- fewer distractions
- larger touch targets
- simplified workflows

---

## Customer-Facing Environment

Typical needs:

- presentation
- communication
- professionalism

Preferred experience:

- clear visuals
- readable information
- focused actions

---

# Breakpoint Philosophy

BuildRail uses predictable breakpoints.

Future implementation should align with standard Tailwind breakpoints.

Primary categories:

```
Mobile

Tablet

Desktop

Large Desktop
```

---

# Responsive Priorities

When space becomes limited:

Reduce complexity before reducing usability.

Priority order:

1. Preserve primary actions
2. Preserve critical information
3. Remove secondary information
4. Collapse advanced features
5. Simplify navigation

---

# Layout Behavior

## Desktop

Desktop experiences may include:

- full navigation
- multiple columns
- detailed tables
- advanced controls

---

## Tablet

Tablet experiences should maintain professional workflows.

Adapt:

- navigation
- spacing
- columns
- actions

Do not simply create a smaller desktop layout.

---

## Mobile

Mobile experiences prioritize:

- speed
- scanning
- quick actions
- essential information

---

# Navigation Behavior

Navigation should adapt based on available space.

---

## Desktop

Preferred:

Persistent sidebar navigation.

Benefits:

- quick access
- strong orientation
- efficient workflows

---

## Tablet

Possible:

- collapsible sidebar
- reduced navigation width

---

## Mobile

Preferred:

Compact navigation patterns.

Examples:

- menu drawer
- bottom navigation where appropriate
- simplified hierarchy

---

# Page Layout Rules

Every page should maintain:

## Clear Context

Users should know where they are.

---

## Primary Action

Users should know what they can do next.

---

## Content Priority

Important information should remain accessible.

---

# Forms on Responsive Devices

Forms should adapt carefully.

---

## Desktop Forms

May use:

- multiple columns
- grouped sections
- side-by-side fields

---

## Mobile Forms

Prefer:

- single column layouts
- larger controls
- reduced scrolling complexity

---

# Tables and Data

Tables are challenging on smaller screens.

BuildRail should not blindly shrink tables.

Options:

## Option 1 — Horizontal Scrolling

Used when users need complete data.

---

## Option 2 — Responsive Cards

Used when scanning is more important than comparison.

---

## Option 3 — Prioritized Columns

Hide secondary information.

---

# Data Priority Rule

When reducing information:

Keep:

- identity
- status
- primary action
- critical metrics

Hide:

- secondary metadata
- optional details

---

# Touch Targets

Mobile interactions require appropriate sizing.

Interactive elements should support:

- comfortable tapping
- spacing between actions
- accessibility requirements

Avoid:

- tiny controls
- crowded actions
- precision clicking

---

# Responsive Cards

Cards should adapt.

Desktop:

```
Multiple columns
```

Mobile:

```
Stacked layout
```

Avoid:

- compressed cards
- unreadable content

---

# Responsive Density

Density should adapt by context.

Desktop:

Higher information density.

Mobile:

Higher action clarity.

The goal is not identical density.

The goal is efficient work.

---

# Responsive Typography

Typography should remain readable.

Adjust:

- scale
- spacing
- hierarchy

Avoid:

- tiny text to fit more information
- excessive line wrapping

---

# Responsive Motion

Motion should remain subtle.

Mobile devices may have:

- slower connections
- different performance limits

Avoid heavy animations.

---

# Responsive Performance

Mobile users may experience:

- slower networks
- limited resources

Prioritize:

- fast loading
- efficient rendering
- reduced unnecessary content

---

# Accessibility Requirements

Responsive design must maintain:

- keyboard support where applicable
- readable text
- touch accessibility
- sufficient contrast
- focus visibility

---

# Responsive Anti-Patterns

Avoid:

## Desktop Shrinking

Simply reducing dimensions.

---

## Hidden Critical Features

Removing important functionality on mobile.

---

## Tiny Controls

Making interfaces technically responsive but difficult to use.

---

## Different Products

Creating completely different experiences by device.

---

# Implementation Rules

The responsive system should:

- use shared breakpoints
- integrate with Tailwind
- prioritize content hierarchy
- support touch interactions
- maintain consistent patterns across products

---

# Example Responsive Strategy

Desktop:

```
Sidebar

Header

Dashboard Grid

Detailed Tables
```

Tablet:

```
Collapsible Sidebar

Simplified Grid

Adaptive Tables
```

Mobile:

```
Compact Navigation

Stacked Content

Priority Actions
```

---

# Final Principle

BuildRail follows users wherever work happens.

The interface should feel natural whether someone is managing a business from an office, reviewing a project on a tablet, or making a quick update from a phone.

The device changes.

The confidence does not.
