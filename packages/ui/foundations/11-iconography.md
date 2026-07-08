# BuildRail Design System

# Foundations — 11 Iconography

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail iconography system defines how icons are selected, sized, styled, and used throughout the product ecosystem.

Icons help users:

- recognize actions
- scan information
- understand navigation
- identify states quickly

Icons are supporting elements.

They should improve understanding without becoming the primary communication method.

---

# Icon Philosophy

BuildRail uses icons with restraint.

Icons exist to:

- clarify
- reinforce
- improve scanning

Icons do not exist to:

- decorate empty space
- replace labels
- make interfaces look more complex

---

# Core Principle

## Familiarity Over Creativity

Professional users value recognition.

A familiar icon creates immediate understanding.

A clever icon creates hesitation.

---

# Icon Library

BuildRail uses:

## Lucide Icons

Lucide provides:

- consistent visual language
- open-source availability
- React support
- accessibility support
- predictable styling

All product interfaces should use Lucide icons unless there is a documented reason not to.

---

# Icon Style

BuildRail icons should maintain:

- consistent stroke width
- simple geometry
- clear shapes
- balanced proportions

Icons should feel:

- precise
- modern
- professional

---

# Icon Personality

BuildRail icons should feel like tools.

Not:

- illustrations
- mascots
- decorative symbols

---

# Icon Sizes

BuildRail uses a limited icon size scale.

Future implementation should define semantic icon tokens.

Example:

```
icon.xs

icon.sm

icon.md

icon.lg

icon.xl
```

---

# Size Guidelines

## Extra Small

Used for:

- compact metadata
- inline indicators

Example:

```
12px
```

---

## Small

Used for:

- table actions
- compact controls

Example:

```
16px
```

---

## Medium

Default application icon size.

Used for:

- buttons
- navigation
- standard actions

Example:

```
20px
```

---

## Large

Used for:

- empty states
- feature areas
- major actions

Example:

```
24px
```

---

## Extra Large

Reserved for special visual moments.

Example:

```
32px+
```

Use sparingly.

---

# Icon and Text Relationships

Icons should align naturally with text.

Consider:

- vertical alignment
- spacing
- visual weight

---

# Icon Spacing

Icons paired with text should use consistent spacing.

Example:

```
[Icon] Create Estimate
```

The gap should come from the spacing system.

Never manually adjust each instance.

---

# Icon-Only Buttons

Icon-only buttons require caution.

They should only be used when:

- the meaning is universally understood
- space is limited
- the action is common

Examples:

Acceptable:

- Search
- Close
- More options
- Settings

Requires caution:

- Archive
- Convert
- Sync
- Duplicate

---

# Icon Accessibility

Icon-only buttons must include:

- accessible labels
- tooltips when appropriate
- keyboard support

Example:

Visual:

```
[Trash Icon]
```

Accessible label:

```
Delete project
```

---

# Navigation Icons

Navigation icons support recognition.

They should not be required to understand navigation.

Example:

Good:

```
📁 Projects
```

Not:

```
📁
```

with no label.

---

# Action Icons

Actions should pair icons with clear language when possible.

Preferred:

```
+ Create Estimate
```

Avoid relying only on:

```
+
```

---

# Status Icons

Icons can reinforce status.

Examples:

Success:

- check
- check circle

Warning:

- alert
- triangle alert

Error:

- x circle

Information:

- info

---

# Do Not Use Color Alone

Icons should not communicate meaning only through color.

Bad:

A red icon with no explanation.

Good:

Red icon + "Payment failed"

---

# Icon Color Rules

Icons follow semantic color rules.

Default:

Neutral.

Interactive:

Action color.

Status:

Status colors.

Disabled:

Disabled text color.

---

# Decorative Icons

Decorative icons should be rare.

Use illustrations instead when visual storytelling is needed.

Do not fill interfaces with meaningless symbols.

---

# Empty States

Empty states may use larger icons.

Purpose:

- explain context
- create recognition
- guide action

They should remain simple.

---

# Data Tables

Tables should use icons carefully.

Avoid:

- excessive icon columns
- replacing text with unclear symbols
- visual clutter

---

# Icon Consistency Rules

The same concept should always use the same icon.

Examples:

Project:

Always use the project icon.

Settings:

Always use settings.

Delete:

Always use the destructive delete pattern.

Do not create variations across products.

---

# Icon Anti-Patterns

Avoid:

## Emoji As UI Icons

Emojis have inconsistent rendering and tone.

---

## Mixed Icon Libraries

Do not combine:

- Lucide
- Heroicons
- Material Icons

without approval.

---

## Decorative Icon Noise

Icons should earn their place.

---

## Ambiguous Icons

If users need to guess, add text.

---

# Responsive Icon Usage

On smaller screens:

Icons may help conserve space.

However:

Critical actions should retain labels whenever possible.

---

# Implementation Rules

The icon system should:

- use Lucide as the standard library
- provide centralized icon usage guidelines
- support consistent sizing
- integrate with accessibility requirements
- avoid custom icon creation without review

---

# Example Semantic Structure

Future implementation:

```
icons:

size:
  xs
  sm
  md
  lg
  xl

usage:

navigation

action

status

metadata
```

---

# Final Principle

Icons should make BuildRail easier to understand.

The best icon is not the most beautiful icon.

It is the icon users immediately recognize.
