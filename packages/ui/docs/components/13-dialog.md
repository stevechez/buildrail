# BuildRail Design System

# Components — 13 Dialog

Version: 1.0

Status: Approved

---

# Purpose

The Dialog component provides a focused interaction surface for tasks that require user attention outside the current page context.

Dialogs are used for:

- confirmations
- focused workflows
- short forms
- important decisions
- contextual actions

---

# Dialog Philosophy

Dialogs are interruptions.

Every dialog creates a break in the user's workflow.

They should only appear when the task requires focused attention.

---

# Core Principle

## Do Not Interrupt Users Unless The Decision Matters.

Before creating a dialog, ask:

"Could this happen inline?"

If yes, prefer inline interaction.

---

# Appropriate Dialog Uses

Use Dialog for:

- destructive confirmations
- creating important records
- editing focused information
- multi-step decisions
- critical settings

Examples:

```
Delete Project?

Create Customer

Edit Estimate Details
```

---

# Avoid Dialogs For

Do not use Dialog for:

- simple information
- large workflows
- entire application sections
- frequently repeated actions

Avoid:

```
Open dialog → Complete large process → Close dialog
```

for complex workflows.

Use a dedicated page instead.

---

# Anatomy

A standard Dialog contains:

```
Dialog

├── Overlay
│
├── Content
│   ├── Header
│   │   ├── Title
│   │   └── Description
│   │
│   ├── Body
│   │
│   └── Footer
│       ├── Secondary Action
│       └── Primary Action
```

---

# Example

```
Delete Project

Are you sure you want to delete Kitchen Remodel?

This action cannot be undone.

[Cancel] [Delete]
```

---

# Dialog Types

BuildRail supports:

1. Confirmation Dialog
2. Form Dialog
3. Information Dialog
4. Workflow Dialog

---

# Confirmation Dialog

Used for important decisions.

Examples:

```
Delete Customer?

Archive Project?
```

---

# Confirmation Rules

Confirmation dialogs should explain:

- what will happen
- consequences
- available actions

Avoid generic:

```
Are you sure?
```

---

# Form Dialog

Used for short focused forms.

Examples:

```
Add Team Member

Name

Email

[Cancel] [Invite]
```

---

# Form Dialog Rules

Use only when:

- few fields exist
- context matters
- leaving the page would interrupt workflow

---

# Information Dialog

Used for:

- explanations
- important notices

Example:

```
Billing Update

Your subscription changes next month.
```

---

# Workflow Dialog

Used for:

- short guided processes

Examples:

```
Import Customers

Step 1
Step 2
Step 3
```

---

# Dialog Size

BuildRail supports:

```
sm

md

lg

xl
```

---

# Small Dialog

Used for:

- confirmations
- simple notices

---

# Medium Dialog

Default.

Used for:

- common forms
- editing

---

# Large Dialog

Used for:

- complex content
- previews

---

# Extra Large Dialog

Use rarely.

If content becomes application-sized, use a page.

---

# Dialog Layout

Dialog content should have:

- clear hierarchy
- comfortable spacing
- obvious actions

---

# Header

Contains:

- title
- description
- optional close action

---

# Title Rules

Titles should describe the task.

Good:

```
Delete Estimate
```

Avoid:

```
Confirmation
```

---

# Body

Contains:

- explanation
- form fields
- content

Keep focused.

---

# Footer

Actions should follow hierarchy.

Typical:

```
[Cancel] [Primary Action]
```

---

# Destructive Actions

Destructive dialogs require extra clarity.

Example:

```
Delete Project

This will permanently remove all project data.

[Cancel] [Delete Project]
```

---

# Destructive Rules

Never:

- hide consequences
- make destructive action primary by default
- use vague wording

---

# Dialog Actions

Primary action:

- completes the task

Secondary action:

- cancels or exits

---

# Button Order

Desktop:

```
Cancel        Confirm
```

Mobile:

```
Confirm

Cancel
```

when vertical stacking is required.

---

# Closing Behavior

Dialogs may close through:

- explicit action
- close button
- escape key
- outside click

---

# Important Dialogs

For destructive or unfinished work:

Avoid accidental dismissal.

Example:

Long form entry should warn before losing data.

---

# Loading State

Dialogs should handle processing.

Example:

```
Creating Estimate...

[Creating...]
```

Maintain layout stability.

---

# Error Handling

Errors should appear inside the dialog.

Example:

```
Unable to create project.

Please try again.
```

---

# AI Dialogs

BuildRail may use AI dialogs for:

- suggestions
- generated content
- reviews

AI dialogs should:

- explain what AI is doing
- preserve user control
- allow review before applying changes

---

# Mobile Behavior

Dialogs should:

- fit the screen
- remain scrollable
- maintain accessible controls

On mobile, consider whether a full-screen experience is better.

---

# Accessibility Requirements

Dialogs must:

- trap focus while open
- return focus when closed
- provide accessible names
- support keyboard navigation
- support escape behavior
- work with screen readers

---

# Focus Management

When opened:

Focus moves inside dialog.

When closed:

Focus returns to triggering element.

---

# Dialog Anti-Patterns

Avoid:

## Dialog For Everything

Creates interruption fatigue.

---

## Nested Dialogs

Avoid opening dialogs inside dialogs.

---

## Huge Forms

Use pages for complex workflows.

---

## Missing Context

Users should understand why the dialog appeared.

---

## Hidden Close Actions

Users need an obvious exit.

---

# Implementation Rules

The Dialog component should:

- consume design tokens
- support themes
- manage focus correctly
- support keyboard navigation
- support variants
- integrate with forms

---

# Component API Direction

Future implementation:

```
<Dialog>

  <DialogTrigger />

  <DialogContent>

    <DialogHeader />

    <DialogBody />

    <DialogFooter />

  </DialogContent>

</Dialog>
```

---

# Related Components

Dialog works alongside:

```
Button

FormField

Input

Card

Alert

Toast
```

---

# Final Principle

Dialogs are moments of importance.

A great BuildRail dialog respects the user's attention.

It appears when needed, explains clearly, and gets out of the way when finished.
