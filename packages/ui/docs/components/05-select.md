# BuildRail Design System

# Components — 05 Select

Version: 1.0

Status: Approved

---

# Purpose

The Select component provides a consistent way for users to choose one option from a predefined list.

Select is used when the available choices are:

- known
- limited
- mutually exclusive
- easy to scan

---

# Select Philosophy

A Select should simplify decisions.

It should not force users to search through unnecessary complexity.

---

# Core Principle

## Use Select For Choices. Use Search For Collections.

A dropdown is not a replacement for a search experience.

---

# When To Use Select

Use Select when:

- there are fewer than approximately 10–20 options
- users recognize the available choices
- only one choice can be selected

Examples:

```
Project Status

Draft

Active

Completed
```

---

# When Not To Use Select

Avoid Select when:

- there are hundreds of options
- users need to search
- users need additional information
- selection requires explanation

Use:

- Combobox
- Search
- Dedicated picker

instead.

---

# Common BuildRail Uses

## Project Status

Example:

```
Planning

Active

Complete
```

---

## Contractor Type

Example:

```
Roofing

Electrical

Plumbing

General Contractor
```

---

## Priority

Example:

```
Low

Medium

High
```

---

## Assignment

If the list is small:

```
Crew Lead
```

If the list is large:

Use:

```
User Combobox
```

---

# Anatomy

Select follows the Form Field pattern:

```
FormField

├── Label
├── Description
├── Select Trigger
├── Options List
└── Error Message
```

---

# Example

```
Project Status

Choose current project status.

[ Active              ▼ ]
```

---

# Select States

Every Select must define:

1. Default
2. Hover
3. Focus
4. Open
5. Selected
6. Disabled
7. Error
8. Loading

---

# Default State

Communicates:

"This field is available."

---

# Hover State

Provides subtle interaction feedback.

Avoid:

- dramatic changes
- excessive movement

---

# Focus State

Must provide:

- visible focus indicator
- keyboard clarity

---

# Open State

The options list should clearly connect to the trigger.

Users should understand:

"This list belongs to this field."

---

# Selected State

The current value should be obvious.

---

# Disabled State

Used when selection is unavailable.

Example:

```
Project Template

Locked after approval
```

---

# Error State

Errors should explain recovery.

Example:

```
Project type is required.

Choose a project type.
```

---

# Loading State

Used when options are being retrieved.

Example:

```
Loading customers...
```

Avoid empty dropdowns with no explanation.

---

# Option Design

Options should be:

- concise
- predictable
- easy to scan

---

# Good

```
Draft

Scheduled

In Progress

Completed
```

---

# Avoid

```
The project has not yet started

The project is currently underway
```

unless additional explanation is required.

---

# Option Ordering

Use logical ordering.

Possible strategies:

## Workflow Order

Example:

```
Draft

Review

Approved

Completed
```

---

## Alphabetical Order

When no workflow exists.

---

## Most Common First

When frequency matters.

---

# Grouped Options

Use groups when helpful.

Example:

```
Residential

  Remodel

  New Construction


Commercial

  Office

  Retail
```

---

# Empty States

If no options exist:

Never show:

```
(no options)
```

Provide context.

Example:

```
No customers found.

Create a customer first.
```

---

# Search Within Select

Search should not be added automatically.

Use when:

- many options exist
- users know what they are looking for

At that point, use Combobox.

---

# Select vs Combobox

## Select

Best for:

```
Project Status
```

Small known list.

---

## Combobox

Best for:

```
Customer

Assign Team Member

Select Material
```

Large searchable collections.

---

# Multi-Select

Multi-select should be used carefully.

Use only when:

- multiple choices are equally important
- users understand selection behavior

Avoid creating complex tag interfaces unnecessarily.

---

# Mobile Behavior

Native mobile selection patterns may be preferred.

Consider:

- larger touch targets
- easier scrolling
- device-native pickers when appropriate

---

# Accessibility Requirements

Select must:

- use semantic selection patterns
- support keyboard navigation
- expose labels
- announce selected values
- maintain focus visibility

---

# Keyboard Behavior

Users should be able to:

- open options
- navigate choices
- select values
- escape menus

---

# Select Anti-Patterns

Avoid:

## Dropdown For Everything

Not every choice needs a dropdown.

---

## Huge Option Lists

Use search.

---

## Unclear Options

Users should understand choices.

---

## Hidden Default Values

Do not select options silently when the choice matters.

---

## Too Many Dropdowns

Complex workflows may need better design.

---

# Implementation Rules

The Select component should:

- consume design tokens
- inherit Form Field behavior
- support themes
- support accessibility requirements
- work with controlled form state
- integrate with validation libraries

---

# Component API Direction

Future implementation:

```
<Select>
  <SelectOption>
    Active
  </SelectOption>
</Select>
```

Example:

```
<Select
  label="Project Status"
  value="active"
/>
```

---

# Related Components

Select works alongside:

```
Combobox

Autocomplete

MultiSelect

DatePicker

RadioGroup

CheckboxGroup
```

---

# Final Principle

A Select should make a decision easier.

It should never make users hunt through a list.

Good selection design respects the user's time, attention, and workflow.
