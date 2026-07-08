# BuildRail Design System

# Components — 06 Checkbox

Version: 1.0

Status: Approved

---

# Purpose

The Checkbox component allows users to select one or more independent options.

Checkboxes communicate:

- inclusion
- selection
- agreement
- preferences

They are used when multiple choices may be selected at the same time.

---

# Checkbox Philosophy

Checkboxes should make choices clear.

They should help users understand:

- what is selected
- what will happen
- what choices remain available

---

# Core Principle

## Use Checkboxes For Choices. Use Switches For States.

A checkbox answers:

"Do you want to include this option?"

A switch answers:

"Is this feature currently enabled?"

---

# When To Use Checkbox

Use Checkbox for:

- multiple selections
- optional features
- agreements
- filters
- grouped choices

---

# Common BuildRail Uses

## Estimate Options

Example:

```
☑ Include materials

☐ Include labor breakdown

☐ Include warranty section
```

---

## Project Settings

Example:

```
☑ Send customer notifications

☐ Allow external access
```

---

## Permissions

Example:

```
☑ View projects

☑ Edit estimates

☐ Manage billing
```

---

# When Not To Use Checkbox

Avoid Checkbox for:

## Single On/Off Settings

Use Switch.

Example:

```
Enable notifications
```

---

## Single Choice Options

Use Radio Group.

Example:

```
Payment method:
○ Credit Card
○ Check
○ Cash
```

---

## Large Collections

Use:

- multi-select
- filtering
- dedicated selection workflows

---

# Anatomy

Checkbox structure:

```
Checkbox

├── Control
├── Label
├── Description
└── Error (optional)
```

---

# Example

```
☐ Include customer notes

Add notes section to proposal documents.
```

---

# Label Rules

Checkbox labels should describe the choice.

Good:

```
Send email notifications
```

Avoid:

```
Email
```

---

# Description Text

Descriptions are useful when the choice needs context.

Example:

```
☐ Include pricing breakdown

Show itemized costs to customers.
```

---

# Checkbox Sizes

BuildRail supports:

```
sm

md

lg
```

---

# Default Size

Medium is the standard.

Used for:

- forms
- settings
- workflows

---

# Small Size

Used for:

- dense tables
- filters

---

# Large Size

Used for:

- onboarding
- prominent selections

---

# Checkbox States

Every Checkbox must define:

1. Unchecked
2. Checked
3. Indeterminate
4. Hover
5. Focus
6. Disabled
7. Error

---

# Unchecked State

Communicates:

"The option is available but not selected."

---

# Checked State

Communicates:

"The option is selected."

---

# Indeterminate State

Used for grouped selections.

Example:

```
☑ Project Documents

    ☑ Contracts

    ☐ Photos
```

The parent is partially selected.

---

# Hover State

Provides subtle interaction feedback.

Avoid:

- excessive animation
- dramatic color changes

---

# Focus State

Required for keyboard accessibility.

Focus must be:

- visible
- consistent
- easy to identify

---

# Disabled State

Used when selection is unavailable.

Example:

```
☑ Customer Portal

Available after subscription upgrade.
```

---

# Error State

Used when selection is required.

Example:

```
☐ Accept terms and conditions

You must accept before continuing.
```

---

# Checkbox Group

Multiple related checkboxes should be grouped.

Example:

```
Project Features

☐ Customer Portal

☐ Photo Gallery

☐ Automated Reports
```

---

# Group Rules

Groups should have:

- clear heading
- logical organization
- consistent spacing

---

# Spacing

Checkboxes should have enough separation.

Avoid dense lists where selections become difficult to scan.

---

# Checkbox vs Switch

Use Checkbox:

```
☐ Include warranty information
```

The user is choosing an item.

---

Use Switch:

```
Notifications

[ ON ]
```

The user is changing system behavior.

---

# Checkbox vs Multi-Select

Use Checkbox Group:

Small known set.

Example:

```
Project features
```

Use Multi-Select:

Large searchable set.

Example:

```
Select materials
```

---

# Mobile Behavior

Checkboxes should support:

- comfortable touch targets
- readable labels
- clear selected states

Avoid tiny checkbox controls.

---

# Accessibility Requirements

Checkboxes must:

- use semantic checkbox controls
- have associated labels
- support keyboard interaction
- expose checked state
- expose indeterminate state when used
- maintain focus visibility

---

# Keyboard Behavior

Users should be able to:

- navigate to checkbox
- toggle selection
- move through groups

---

# Checkbox Anti-Patterns

Avoid:

## Checkbox As Toggle

Use Switch.

---

## Unclear Labels

Users should know what they are selecting.

---

## Too Many Choices Without Structure

Group or redesign.

---

## Hidden Consequences

Explain important effects.

---

## Tiny Click Targets

The entire label should generally be selectable.

---

# Implementation Rules

The Checkbox component should:

- consume design tokens
- support themes
- inherit accessibility patterns
- work with Form Field
- support controlled state
- support grouped selections

---

# Component API Direction

Future implementation:

```
<Checkbox />

<Checkbox
  label="Include warranty"
/>
```

With states:

```
checked

disabled

indeterminate
```

---

# Related Components

Checkbox works alongside:

```
CheckboxGroup

Switch

RadioGroup

FormField

MultiSelect
```

---

# Final Principle

Checkboxes represent user choices.

A great Checkbox experience makes decisions simple:

"I understand this option."

"I know whether it is selected."

"I know what will happen next."
