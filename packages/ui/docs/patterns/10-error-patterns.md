# BuildRail Design System

# Patterns — 10 Error Patterns

Version: 1.0

Status: Approved

---

# Purpose

The Error Patterns system defines how BuildRail communicates failures, problems, and recovery paths.

Error experiences should help users:

- understand what happened
- understand impact
- recover quickly
- continue working

---

# Error Philosophy

Errors are part of the workflow.

A professional application does not hide errors.

It explains them.

---

# Core Principle

## Every Error Should Provide A Path Forward.

Never leave users at a dead end.

---

# Error Anatomy

A standard BuildRail error contains:

```
Error State

├── What happened
│
├── Why it matters
│
├── Recovery action
│
└── Support path (when needed)
```

---

# Example

```
Unable to load projects

We could not retrieve your projects right now.

[Try Again]
```

---

# Error Types

BuildRail supports:

1. Validation Errors
2. Inline Errors
3. Form Errors
4. Action Errors
5. Page Errors
6. System Errors
7. Permission Errors
8. Network Errors

---

# 1. Validation Errors

Used when user input is invalid.

Examples:

- missing required fields
- invalid values
- incorrect formatting

---

# Example

```
Email address is required.
```

---

# Validation Rules

Errors should:

- appear close to the problem
- explain correction
- avoid technical language

---

# Good

```
Enter a valid phone number.
```

---

# Avoid

```
Invalid parameter.
```

---

# 2. Inline Errors

Used for specific fields or controls.

Example:

```
Project Name

[____________]

Project name is required.
```

---

# Inline Error Rules

Place errors:

- near the affected element
- after the user attempts action

Avoid showing errors too early.

---

# 3. Form Errors

Used when multiple fields or submission failures occur.

Example:

```
We could not save this estimate.

Review the highlighted fields.
```

---

# Form Error Rules

Provide:

- summary message
- field-level guidance

---

# 4. Action Errors

Used when a user action fails.

Examples:

- save failure
- upload failure
- export failure

---

# Example

User clicks:

```
Generate Estimate
```

Result:

```
Unable to generate estimate.

Please try again.

[Retry]
```

---

# 5. Page Errors

Used when an entire page cannot load.

Example:

```
Unable to load project details.

[Retry]
```

---

# Page Error Rules

Maintain:

- navigation
- application context
- recovery options

Do not show a blank screen.

---

# 6. System Errors

Used for unexpected failures.

Examples:

- service outage
- backend failure
- unknown exception

---

# System Error Copy

Avoid exposing technical details.

Bad:

```
500 Internal Server Error
```

Better:

```
Something went wrong while loading this page.

Please try again.
```

---

# 7. Permission Errors

Used when access is restricted.

Examples:

- missing role
- unavailable feature
- organization restriction

---

# Example

```
You do not have access to this project.

Contact your administrator.
```

---

# Permission Rules

Explain:

- what happened
- who can help
- possible next action

---

# 8. Network Errors

Important for Field workflows.

Examples:

- poor connection
- offline mode
- sync failures

---

# Example

```
Connection lost.

Your changes will sync when you reconnect.
```

---

# Error Severity Levels

BuildRail uses:

```
Informational

Warning

Error

Critical
```

---

# Informational

Used for:

- minor notices
- recoverable states

Example:

```
Changes saved locally.
```

---

# Warning

Used when attention is needed.

Example:

```
This estimate has not been sent.
```

---

# Error

Used when an action failed.

Example:

```
Unable to save project.
```

---

# Critical

Used for major system issues.

Example:

```
Service temporarily unavailable.
```

---

# Error Placement

Errors should appear where they matter.

Examples:

Field issue:

```
Near field input
```

Page failure:

```
Main content area
```

Global issue:

```
Alert/banner
```

---

# Error Copywriting

BuildRail errors should be:

- clear
- calm
- actionable

---

# Formula

Use:

```
Problem

+

Next step
```

---

# Good

```
Upload failed.

Check your connection and try again.
```

---

# Avoid

```
Error occurred.
```

---

# Technical Language

Avoid exposing:

- stack traces
- database errors
- API codes

unless users are developers.

---

# Recovery Actions

Common recovery actions:

```
Retry

Go Back

Refresh

Contact Support

Return Home
```

---

# Retry Rules

Retry should be used when:

- failure may be temporary

Examples:

- network failure
- server timeout

---

# Do Not Retry

Avoid retrying:

- invalid input
- permission failures

---

# Toast Errors

Use for:

- temporary action failures

Example:

```
Unable to save changes.
```

---

# Alert Errors

Use for:

- important persistent issues

Example:

```
Your subscription has expired.
```

---

# Modal Errors

Use sparingly.

Only for:

- blocking problems
- required decisions

---

# Error States and Data

Never destroy user work.

When possible:

- preserve input
- save drafts
- allow recovery

---

# AI Error Patterns

AI failures require special handling.

Avoid:

```
AI failed.
```

Better:

```
We could not generate suggestions.

Try again or adjust your project details.
```

---

# AI Safety Rules

AI errors should:

- preserve user control
- explain limitations
- never silently replace work

---

# Offline and Field Errors

Field users may experience:

- weak connectivity
- sync conflicts
- delayed updates

The interface should communicate:

```
Saved locally

Syncing

Synced
```

---

# Accessibility Requirements

Errors must:

- be announced when necessary
- use semantic roles
- not rely only on color
- provide clear focus behavior

---

# Error Anti-Patterns

Avoid:

## Blaming Users

Bad:

```
You entered incorrect information.
```

Better:

```
This information needs correction.
```

---

## Generic Messages

Bad:

```
Something happened.
```

---

## No Recovery

Bad:

```
Failed.
```

---

## Technical Details

Do not expose system internals.

---

## Interrupting Work

Avoid unnecessary blocking dialogs.

---

# Implementation Rules

Error patterns should:

- consume design tokens
- support severity levels
- support recovery actions
- integrate with forms and workflows
- maintain accessibility

---

# Component Structure Direction

Future implementation:

```
<ErrorState />

<ErrorAlert />

<FieldError />

<FormError />

<RetryAction />
```

---

# Related Components

Works alongside:

```
Alert

Toast

Dialog

FormField

EmptyState

LoadingState
```

---

# Final Principle

Errors are moments where trust is tested.

BuildRail should respond like a professional teammate:

Explain the problem.

Protect the user's work.

Provide the next step.
