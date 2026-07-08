# BuildRail Design System

# Components — 08 Radio Group

Version: 1.0

Status: Approved

---

# Purpose

The Radio Group component allows users to select exactly one option from a set of mutually exclusive choices.

Radio Groups communicate:

- alternatives
- decisions
- preferred options
- configuration choices

---

# Radio Group Philosophy

Radio Groups make comparison easy.

Users should be able to see:

- available choices
- current selection
- differences between options

---

# Core Principle

## Use Radio Groups When All Choices Should Be Visible.

A user should be able to compare options without opening a menu.

---

# When To Use Radio Group

Use Radio Group when:

- only one option can be selected
- choices are limited
- comparison matters

Recommended:

```
2–5 options
```

---

# Common BuildRail Uses

## Estimate Type

Example:

```
Estimate Format

○ Detailed Breakdown

○ Customer Summary

○ Internal Estimate
```

---

## Project Type

Example:

```
Project Type

○ Residential

○ Commercial

○ Maintenance
```

---

## Workflow Selection

Example:

```
Approval Process

○ Manual Review

○ Automatic Approval
```

---

# When Not To Use Radio Group

Avoid Radio Group when:

## Many Options Exist

Example:

```
Select Customer
```

Use:

- Select
- Combobox

---

## Multiple Choices Are Allowed

Example:

```
Include Features
```

Use:

- Checkbox Group

---

## Immediate Settings

Example:

```
Enable Sync
```

Use:

- Switch

---

# Anatomy

Radio Group structure:

```
RadioGroup

├── Label
├── Description
├── Radio Options
└── Error Message
```

---

# Example

```
Proposal Format

Choose how proposals should appear.

○ Professional Summary

○ Detailed Estimate

○ Internal Version
```

---

# Option Anatomy

Each option contains:

```
Radio Control

+

Label

+

Optional Description
```

---

# Option Labels

Labels should describe the choice clearly.

Good:

```
Monthly Billing
```

Avoid:

```
Option A
```

---

# Option Descriptions

Descriptions help when choices need explanation.

Example:

```
○ Detailed Estimate

Includes labor, materials, and line items.
```

---

# Radio Group States

Every Radio Group must define:

1. Default
2. Selected
3. Hover
4. Focus
5. Disabled
6. Error

---

# Default State

Options are available but no selection may exist.

---

# Selected State

The chosen option must be obvious.

---

# Hover State

Provides subtle feedback.

Avoid:

- excessive animation
- distracting movement

---

# Focus State

Required for accessibility.

Focus must clearly identify the active option.

---

# Disabled State

Used when options are unavailable.

Examples:

```
○ Advanced Reporting

Available on Enterprise plan.
```

---

# Error State

Used when selection is required.

Example:

```
Choose an estimate format before continuing.
```

---

# Orientation

Radio Groups support:

## Vertical

Default.

Best for:

- forms
- settings
- workflows

Example:

```
○ Option One

○ Option Two

○ Option Three
```

---

## Horizontal

Use only when options are short.

Example:

```
○ Monthly   ○ Annual
```

---

# Spacing

Options should have enough separation.

Avoid:

```
○ A ○ B ○ C ○ D ○ E
```

when choices require reading.

---

# Card-Based Radio Options

Some decisions benefit from larger selection cards.

Example:

```
┌────────────────┐
│ ○ Starter      │
│ Basic features │
└────────────────┘


┌────────────────┐
│ ○ Professional │
│ Full workflow  │
└────────────────┘
```

---

# Card Radio Rules

Use when:

- choices are meaningful
- descriptions are important
- comparison matters

Avoid decorative selection cards everywhere.

---

# Radio Group vs Select

Use Radio Group:

```
○ Residential

○ Commercial

○ Maintenance
```

when comparison matters.

Use Select:

```
[ Residential ▼ ]
```

when space matters.

---

# Radio Group vs Checkbox

Radio:

```
Choose one:
○ PDF
○ Word
○ Excel
```

Checkbox:

```
Choose any:
☐ Photos
☐ Documents
☐ Drawings
```

---

# Mobile Behavior

Radio Groups should:

- remain easy to tap
- provide enough spacing
- stack vertically when needed

Avoid tiny horizontal groups.

---

# Accessibility Requirements

Radio Groups must:

- use semantic radio controls
- have group labels
- support keyboard navigation
- communicate selected state
- maintain visible focus

---

# Keyboard Behavior

Users should be able to:

- move through options
- select an option
- understand current selection

---

# Radio Group Anti-Patterns

Avoid:

## Too Many Options

Use Select or Combobox.

---

## Hidden Differences

If choices differ significantly, explain them.

---

## Unclear Defaults

Do not preselect important choices without purpose.

---

## Horizontal Overcrowding

Creates scanning difficulty.

---

## Radio Buttons For Binary Choices

Use:

- Switch
- Checkbox

---

# Implementation Rules

The Radio Group component should:

- consume design tokens
- support themes
- integrate with Form Field
- support controlled state
- provide accessibility semantics
- support card variants when needed

---

# Component API Direction

Future implementation:

```
<RadioGroup>

  <RadioOption value="summary">
    Summary
  </RadioOption>

  <RadioOption value="detailed">
    Detailed
  </RadioOption>

</RadioGroup>
```

Example:

```
<RadioGroup
  label="Estimate Format"
  value="detailed"
/>
```

---

# Related Components

Radio Group works alongside:

```
Checkbox

Switch

Select

Combobox

SegmentedControl
```

---

# Final Principle

Radio Groups help users make confident choices.

A great Radio Group says:

"Here are the available paths."

"Choose the one that best matches your goal."

BuildRail decisions should feel clear, deliberate, and easy.
