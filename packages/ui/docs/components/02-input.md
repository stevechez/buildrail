# BuildRail Design System

# Components — 02 Input

Version: 1.0

Status: Approved

---

# Purpose

The Input component provides a consistent method for collecting user information across BuildRail applications.

Inputs are the foundation of:

- forms
- workflows
- settings
- search
- filtering
- data entry

A well-designed input reduces errors and helps users complete tasks confidently.

---

# Input Philosophy

Inputs should feel:

- clear
- predictable
- easy to understand
- professional

They should never feel like:

- technical fields
- database forms
- administrative obstacles

---

# Core Principle

## Ask For Information Clearly. Validate Respectfully.

The system should guide users toward success.

Errors should help users recover.

---

# Input Anatomy

A standard BuildRail input contains:

```
Label

↓

Input Control

↓

Helper Text / Description

↓

Error Message
```

---

# Example

```
Project Name

[________________]

Used for customer-facing proposals.

Project name is required.
```

---

# Label Rules

Labels are required for all meaningful inputs.

Labels should:

- describe the requested information
- use plain language
- remain visible

---

# Good

```
Customer Name

Project Address

Estimate Number
```

---

# Avoid

```
Enter Value

Field Name

Information
```

---

# Placeholder Text

Placeholder text is not a replacement for labels.

---

# Good

```
Project Name

[Smith Residence Remodel]
```

---

# Bad

```
[Enter project name]
```

without a label.

---

# Placeholder Rules

Placeholders should provide examples.

They should not contain required instructions.

---

# Input Variants

BuildRail supports:

1. Default Input
2. Search Input
3. Password Input
4. Number Input
5. Currency Input
6. Date Input

---

# Default Input

Used for:

- names
- descriptions
- identifiers
- general information

---

# Search Input

Used for:

- finding records
- filtering lists

Search inputs should:

- provide clear intent
- support keyboard interaction
- return predictable results

Example:

```
Search projects...
```

---

# Password Input

Used only where required.

Requirements:

- visibility toggle when helpful
- clear validation
- secure handling

---

# Number Input

Used for:

- quantities
- measurements
- counts

Rules:

- support appropriate formatting
- avoid confusing validation

---

# Currency Input

Used for:

- estimates
- invoices
- financial values

Should support:

- currency formatting
- clear units
- decimal handling

Example:

```
$12,500.00
```

---

# Date Input

Used for:

- schedules
- deadlines
- project dates

Should:

- use familiar formatting
- avoid ambiguous dates

---

# Input Sizes

BuildRail uses three sizes.

---

# Small

Used for:

- dense tables
- compact filters

Example:

```
32px height
```

---

# Medium

Default input size.

Used for:

- forms
- standard workflows

Example:

```
40px height
```

---

# Large

Used for:

- onboarding
- prominent workflows

Example:

```
48px height
```

---

# Input States

Every input must define:

1. Default
2. Hover
3. Focus
4. Filled
5. Disabled
6. Read-only
7. Error
8. Success

---

# Default State

Communicates:

"This field is available."

---

# Hover State

Provides subtle confirmation.

Avoid:

- dramatic borders
- color changes

---

# Focus State

Critical for accessibility.

Focus should provide:

- visible outline
- clear active state
- keyboard indication

---

# Filled State

A filled input should remain readable.

Do not reduce contrast after entry.

---

# Disabled State

Used when interaction is unavailable.

Should communicate:

- unavailable
- not editable

---

# Read-Only State

Used when information can be viewed but not changed.

Should look different from disabled.

---

# Error State

Errors should be clear and helpful.

Example:

```
Project Name

[________________]

Project name is required.
```

---

# Success State

Use sparingly.

Good examples:

- verification complete
- successful validation

Do not add green states everywhere.

---

# Validation Philosophy

Validation should happen at the right time.

Avoid:

- immediate criticism while typing
- unnecessary interruptions

Prefer:

- helpful guidance
- validation after meaningful interaction

---

# Error Messages

Errors should answer:

1. What is wrong?
2. Why does it matter?
3. How can it be fixed?

---

# Good

```
Email address is invalid.

Enter a valid email address.
```

---

# Bad

```
Invalid input.
```

---

# Required Fields

Required fields should be clear.

Options:

- required indicators
- form explanations

Avoid:

- forcing users to guess

---

# Helper Text

Helper text provides context.

Examples:

```
Used on customer proposals.
```

```
Maximum file size is 10MB.
```

---

# Form Layout

Inputs should follow a consistent rhythm.

Example:

```
Label

Input

Helper text

Spacing

Next field
```

---

# Field Grouping

Related fields should be grouped.

Example:

```
Customer Information

Name

Email

Phone
```

---

# Do Not

Create:

- long unstructured forms
- unnecessary fields
- unclear grouping

---

# AI-Assisted Inputs

BuildRail may include AI-assisted workflows.

AI inputs should remain clear.

Avoid:

- magical prompt boxes everywhere
- unclear AI behavior

---

# Good

```
Describe the project scope

[________________________]

Generate Estimate
```

---

# Bad

```
Ask AI Anything
```

without context.

---

# Mobile Behavior

Inputs must support field use.

Requirements:

- comfortable touch targets
- readable text
- proper keyboard types
- clear focus behavior

---

# Accessibility Requirements

Inputs must:

- use semantic input elements
- have associated labels
- communicate errors
- support keyboard navigation
- support screen readers
- maintain visible focus states

---

# Input Anti-Patterns

Avoid:

## Placeholder-Only Labels

Creates accessibility issues.

---

## Hidden Errors

Users need recovery guidance.

---

## Excessive Validation

Creates frustration.

---

## Tiny Input Controls

Difficult in field environments.

---

## Inconsistent Field Styles

Creates cognitive load.

---

# Implementation Rules

The Input component should:

- consume design tokens
- support all themes
- integrate with forms
- support validation libraries
- expose accessible states
- maintain consistent sizing

---

# Component API Direction

Future implementation:

```
<Input />

<Input
  label="Project Name"
/>

<Input
  error="Project name is required"
/>

<Input
  helperText="Used for proposals"
/>
```

---

# Future Extensions

Related components:

```
FormField

Textarea

Select

Combobox

DatePicker

CurrencyInput
```

---

# Final Principle

Inputs are conversations between the user and the system.

A good input says:

"We understand what you need."

"We will help you complete this correctly."

BuildRail forms should feel like guided professional workflows, not paperwork.
