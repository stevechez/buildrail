# BuildRail Design System

# Layouts — 05 Form Layout

Version: 1.0

Status: Approved

---

# Purpose

The Form Layout defines how BuildRail presents workflows for creating and editing business data.

Examples include:

- Create Project
- Edit Customer
- New Estimate
- Add Employee
- Upload Document
- Organization Settings

Every form should feel familiar, regardless of the product.

---

# Form Philosophy

Forms exist to help users complete work.

The interface should guide users toward success by:

- reducing mistakes
- providing context
- minimizing cognitive load
- preserving progress

---

# Core Principle

## Forms Should Feel Like Guided Workflows, Not Database Screens.

Ask only for information that helps users accomplish their goal.

---

# Relationship To Workspace

The Form Layout is a specialized Workspace Layout.

```
App Shell

↓

Workspace

↓

Form Layout
```

---

# Form Anatomy

```
Form Layout

├── Page Header
│
├── Form Introduction (optional)
│
├── Form Sections
│
├── Supporting Context (optional)
│
└── Action Bar
```

---

# Standard Layout

```
────────────────────────────

Page Header

────────────────────────────

Introduction

────────────────────────────

Section 1

────────────────────────────

Section 2

────────────────────────────

Section 3

────────────────────────────

Action Bar
```

---

# Page Header

The header should answer:

- What am I creating?
- What am I editing?

Examples:

```
Create Project

Edit Estimate

Add Customer
```

---

# Form Introduction

Use only when additional context is helpful.

Example:

```
Projects organize estimates, documents,
field activity, and customer communication.
```

Avoid unnecessary instructional text.

---

# Form Sections

Group related fields together.

Good:

```
Customer Information

Project Details

Scheduling

Financial Information
```

Avoid one long list of unrelated inputs.

---

# Section Rules

Each section should:

- have a clear title
- contain related fields
- be visually separated
- follow a logical order

---

# Field Order

Present fields in the order users naturally think.

Example:

```
Customer

↓

Project

↓

Scope

↓

Pricing

↓

Review
```

Avoid ordering fields based on database structure.

---

# Required Fields

Only require information necessary to complete the workflow.

Mark required fields consistently.

Example:

```
Project Name *

Customer *
```

Avoid excessive required fields.

---

# Optional Fields

Optional fields should be clearly identified through placement or helper text.

Avoid labeling every field as "(Optional)."

---

# Field Width

Choose widths based on expected input.

Examples:

Small

```
ZIP Code

Tax Rate
```

Medium

```
Phone

Email
```

Large

```
Project Name

Company Name
```

Full Width

```
Description

Scope

Notes
```

---

# Validation

Validation should occur as early as practical without interrupting users.

Preferred:

- inline validation
- clear messaging
- immediate recovery

Avoid waiting until form submission to reveal all errors.

---

# Error Messages

Errors should explain:

- what happened
- why
- how to fix it

Good:

```
Email address must include @.
```

Avoid:

```
Invalid Input
```

---

# Helper Text

Use helper text to clarify expectations.

Example:

```
Visible to customers on proposals.
```

Helper text should support—not replace—good labels.

---

# Progressive Disclosure

Hide advanced options until needed.

Example:

```
Advanced Pricing

▼
```

Avoid overwhelming users with rarely used settings.

---

# Action Bar

The Action Bar appears at the end of the form.

Primary Action:

```
Save

Create

Continue
```

Secondary Actions:

```
Cancel

Discard

Save Draft
```

The primary action should always appear first visually.

---

# Sticky Action Bar

Long forms may use a sticky action bar.

This ensures users never lose access to Save.

---

# Draft Support

Long workflows should support saving drafts.

Examples:

- estimates
- projects
- proposals

Users should never lose significant work.

---

# AI Assistance

AI may assist with:

- descriptions
- summaries
- scope suggestions
- customer communication

AI suggestions should always be:

- reviewable
- editable
- optional

---

# Loading Behavior

During save:

- disable duplicate submissions
- preserve entered values
- communicate progress

Preferred:

```
Saving Project…
```

Avoid generic loading indicators.

---

# Success Feedback

After successful completion:

- confirm success
- explain what happened
- guide users to the next step

Example:

```
Project created successfully.

[Open Project]
```

---

# Unsaved Changes

Warn users before leaving when changes have not been saved.

Example:

```
Leave without saving?

Your changes will be lost.
```

---

# Responsive Behavior

## Desktop

Use grouped sections with comfortable spacing.

---

## Tablet

Reduce horizontal layouts.

Stack fields when necessary.

---

## Mobile

Use a single-column layout.

Prioritize:

- readability
- touch accessibility
- simple navigation

---

# Accessibility Requirements

Forms must:

- associate labels with inputs
- expose validation errors
- support keyboard navigation
- maintain logical focus order
- announce success and error messages

Required fields must be communicated programmatically—not only visually.

---

# Form Layout Anti-Patterns

Avoid:

## Long Unstructured Forms

Group information into meaningful sections.

---

## Database Terminology

Use language familiar to contractors.

---

## Hidden Validation

Show issues as early as practical.

---

## Multiple Primary Buttons

Users should always know the main action.

---

## Lost Progress

Never discard entered information unexpectedly.

---

# Implementation Rules

Form Layouts should:

- consume design tokens
- inherit Workspace Layout
- support inline validation
- support draft saving
- integrate AI assistance where appropriate
- remain responsive

---

# Component Structure Direction

Future implementation:

```
<FormLayout>

  <PageHeader />

  <FormIntroduction />

  <FormSection>

    <FormField />

    <FormField />

  </FormSection>

  <FormSection>

    {children}

  </FormSection>

  <ActionBar />

</FormLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

FormField

Input

Textarea

Select

Checkbox

RadioGroup

Switch

Button

Alert

Toast
```

---

# Final Principle

A great form reduces uncertainty.

Users should always know:

- what information is needed
- why it matters
- how to complete the task
- what happens next

Every BuildRail form should feel calm, predictable, and designed to help professionals move their work forward.
