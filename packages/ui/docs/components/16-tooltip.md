# BuildRail Design System

# Components — 16 Tooltip

Version: 1.0

Status: Approved

---

# Purpose

The Tooltip component provides brief contextual information about an element when additional explanation is helpful.

Tooltips assist users by explaining:

- unfamiliar actions
- icons
- controls
- terminology

Common uses:

- icon buttons
- advanced settings
- abbreviated information
- secondary guidance

---

# Tooltip Philosophy

Tooltips are supplemental.

They should enhance understanding, not hide essential information.

---

# Core Principle

## If Information Is Important, It Belongs In The Interface.

Do not hide critical instructions inside tooltips.

---

# When To Use Tooltips

Use Tooltips for:

- icon-only buttons
- unfamiliar symbols
- additional context
- technical terminology

Examples:

```
[?]

Tooltip:
View project activity history
```

---

# Common BuildRail Uses

## Icon Actions

Example:

```
[⋮]

Tooltip:
More actions
```

---

## AI Features

Example:

```
[AI icon]

Tooltip:
Generate suggested estimate wording
```

---

## Table Actions

Example:

```
[Export icon]

Tooltip:
Export customer list
```

---

# When Not To Use Tooltips

Avoid Tooltips for:

## Primary Instructions

Bad:

```
[Button]

Tooltip:
Click here to create project
```

The button should say:

```
Create Project
```

---

## Important Information

Bad:

```
Tooltip:
Your payment failed
```

Use:

- Alert

---

## Mobile-Only Help

Hover does not exist on touch devices.

Use:

- inline guidance
- help sections

---

# Tooltip Anatomy

Structure:

```
Tooltip

└── Content
```

Simple by design.

---

# Tooltip Content Rules

Tooltips should be:

- short
- specific
- helpful

---

# Good

```
Archive project
```

---

# Avoid

```
Click this button to archive the current project that you are viewing
```

---

# Length Guidelines

Preferred:

```
1 short sentence
```

Avoid:

- paragraphs
- multiple instructions

---

# Tooltip Placement

BuildRail supports:

```
top

bottom

left

right
```

---

# Default Placement

Preferred:

```
top
```

when space allows.

---

# Placement Rules

Tooltips should:

- avoid covering important content
- remain close to the target
- adapt to available space

---

# Trigger Behavior

Tooltips may appear on:

- hover
- keyboard focus

They should not require:

- clicking
- complex interaction

---

# Timing

Tooltips should not appear instantly.

Recommended:

```
300–500ms delay
```

This prevents accidental popups.

---

# Dismissal

Tooltips disappear when:

- pointer leaves element
- focus changes
- escape is pressed when appropriate

---

# Icon-Only Buttons

Every icon-only button must have:

- tooltip
- accessible label

Example:

```
[trash icon]

Tooltip:
Delete project
```

---

# Tooltip vs Label

Use visible labels when:

- action is important
- space allows

Example:

Good:

```
Create Project
```

Better than:

```
[+]

Tooltip:
Create project
```

---

# Tooltip vs Help Text

Use Tooltip:

```
Additional explanation
```

Use Help Text:

```
Required instruction
```

Example:

```
Password must contain 8 characters.
```

belongs under the field.

---

# Tooltip vs Popover

Tooltip:

```
Brief explanation
```

Popover:

```
More detailed content
```

---

# Tooltip vs Dialog

Tooltip:

```
What does this icon mean?
```

Dialog:

```
Confirm this important action.
```

---

# Mobile Behavior

Hover does not exist on mobile.

Therefore:

- do not hide critical information in tooltips
- provide visible alternatives when needed

---

# Accessibility Requirements

Tooltips must:

- support keyboard users
- provide accessible descriptions
- not contain essential information only
- work with screen readers

---

# Keyboard Behavior

Users should receive tooltip content when focusing relevant elements.

---

# Tooltip Anti-Patterns

Avoid:

## Tooltip Everywhere

Interfaces become noisy.

---

## Long Explanations

Use proper content areas.

---

## Hidden Primary Actions

Labels are better.

---

## Hover-Only Information

Keyboard and touch users need access too.

---

## Explaining Obvious Icons

Do not add unnecessary help.

---

# Implementation Rules

The Tooltip component should:

- consume design tokens
- support positioning
- support accessibility
- support keyboard interaction
- integrate with icon buttons

---

# Component API Direction

Future implementation:

```
<Tooltip>

  <TooltipTrigger>
    Button
  </TooltipTrigger>

  <TooltipContent>
    Archive project
  </TooltipContent>

</Tooltip>
```

---

# Related Components

Tooltip works alongside:

```
Button

IconButton

Popover

HelpText

Dialog

CommandMenu
```

---

# Final Principle

Tooltips are quiet helpers.

They should answer small questions at the right moment.

BuildRail interfaces should be understandable without them — and better with them.
