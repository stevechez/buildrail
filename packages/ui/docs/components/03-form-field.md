# BuildRail Design System

# Components — 03 Form Field

Version: 1.0

Status: Approved

---

# Purpose

The Form Field component defines the complete structure surrounding user inputs.

A Form Field provides:

- context
- instructions
- validation
- accessibility relationships
- consistent spacing

The Form Field is the foundation for all BuildRail data entry experiences.

---

# Form Field Philosophy

A field is not just a control.

A field is a conversation between the system and the user.

The system should communicate:

- what information is needed
- why it is needed
- whether it is valid
- how to correct problems

---

# Core Principle

## A User Should Never Wonder What A Field Means.

Every field should answer:

1. What should I enter?
2. Why am I entering this?
3. What happens next?

---

# Anatomy

A complete Form Field contains:

```
FormField

├── Label
├── Description (optional)
├── Control
├── Helper Text (optional)
└── Error Message (optional)
```

---

# Example

```
Project Address

Where the work will be performed.

[________________________]

Used for estimates and customer documents.

Address is required.
```

---

# Field Structure

The standard order is:

```
Label

↓

Description

↓

Input Control

↓

Supporting Text

↓

Error
```

This creates predictable scanning.

---

# Label

Labels identify the purpose of the field.

Requirements:

- always visible
- concise
- specific
- written in plain language

---

# Good

```
Customer Name

Project Start Date

Crew Lead
```

---

# Avoid

```
Input

Information

Value
```

---

# Required Indicators

Required fields should communicate expectation.

Preferred:

```
Project Name *
```

or:

```
Project Name

Required
```

The system should use one consistent pattern.

---

# Optional Fields

Optional fields may be marked when useful.

Example:

```
Secondary Phone (optional)
```

Avoid marking every optional field if most fields are required.

---

# Description Text

Description provides additional context.

Used when:

- the field needs explanation
- users may not know the purpose
- requirements need clarification

Example:

```
Estimate Notes

Add information visible to the customer.
```

---

# Helper Text

Helper text provides guidance before an error occurs.

Examples:

```
Maximum 500 characters.

Used on customer proposals.
```

Helper text should reduce mistakes.

---

# Error Message

Errors communicate recovery.

A good error message explains:

1. What happened
2. How to fix it

---

# Good

```
Project address is required.

Enter the job location before continuing.
```

---

# Bad

```
Error.
```

---

# Error Placement

Errors should appear directly associated with the field.

Avoid:

- distant page errors only
- unclear error locations

---

# Validation Philosophy

Validation should help users succeed.

Avoid:

- unnecessary interruption
- aggressive warnings
- validation before context exists

---

# Field States

Every Form Field supports:

1. Default
2. Focus
3. Filled
4. Disabled
5. Read-only
6. Error
7. Success

---

# Default

The field is available.

---

# Focus

The user is actively editing.

The system should provide:

- clear focus indicator
- strong association between label and control

---

# Filled

Existing information remains easy to read.

---

# Disabled

The field cannot currently be edited.

The reason should be clear when possible.

Example:

```
Company ID

Locked after creation.
```

---

# Read-Only

The user can view information but cannot modify it.

Read-only should not look broken.

---

# Error

The field requires attention.

Error presentation should include:

- visual indication
- explanation
- correction path

---

# Success

Success states should be rare.

Use only when meaningful.

Examples:

- verification complete
- connection successful

Avoid decorating every field with success indicators.

---

# Field Spacing

Fields follow the BuildRail spacing system.

Consistent spacing creates rhythm.

Example:

```
Label

small gap

Control

small gap

Helper text

larger gap

Next field
```

---

# Field Groups

Related fields should be grouped.

Example:

```
Customer Information

Name

Email

Phone
```

---

# Section Relationships

Large forms should use sections.

Example:

```
Project Details

Customer Details

Pricing Information

Schedule
```

---

# Form Layout Rules

Prefer:

- one clear column for complex workflows
- two columns only when relationships are obvious

---

# Avoid

Large dense grids of unrelated fields.

Example:

```
Name | Phone | Date | Amount | Status | Type
```

unless the relationship is clear.

---

# Inline Fields

Inline fields are appropriate for related information.

Example:

```
First Name     Last Name
```

Avoid:

```
Project Name     Start Date
```

if they represent unrelated concepts.

---

# Accessibility Requirements

Form Fields must:

- associate labels with controls
- connect descriptions correctly
- connect errors correctly
- support keyboard navigation
- communicate required state
- work with screen readers

---

# Semantic Relationships

The implementation should support:

```
label → input

description → input

error → input
```

using proper accessibility attributes.

Example concepts:

```
htmlFor

aria-describedby

aria-invalid
```

---

# Mobile Behavior

Form Fields should adapt for field environments.

Requirements:

- readable labels
- comfortable touch targets
- clear error placement
- minimal horizontal scrolling

---

# AI-Assisted Fields

AI assistance may appear inside forms.

Examples:

- Generate scope description
- Suggest pricing notes
- Improve proposal wording

AI actions should be secondary.

The user remains in control.

---

# Example

```
Project Description

[____________________]

✨ Improve with AI
```

AI should assist.

It should not replace understanding.

---

# Form Field Anti-Patterns

Avoid:

## Missing Labels

Users should not guess.

---

## Placeholder As Label

Creates accessibility problems.

---

## Generic Errors

Users need recovery information.

---

## Inconsistent Spacing

Creates cognitive load.

---

## Too Much Helper Text

Only provide useful guidance.

---

# Implementation Rules

The Form Field component should:

- wrap input components
- manage label relationships
- provide validation messaging
- consume spacing tokens
- support themes
- support accessibility requirements

---

# Component API Direction

Future implementation:

```
<FormField>

  <Label>
    Project Name
  </Label>

  <Input />

  <Description>
    Used on customer proposals.
  </Description>

  <Error>
    Project name is required.
  </Error>

</FormField>
```

---

# Related Components

Form Field supports:

```
Input

Textarea

Select

Checkbox

Radio

Switch

DatePicker

Combobox
```

---

# Final Principle

Forms are where users and software communicate.

A great Form Field does not simply collect information.

It guides the user toward completing meaningful work successfully.
