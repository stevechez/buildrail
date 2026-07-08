# BuildRail Design System

# Components — 15 Toast

Version: 1.0

Status: Approved

---

# Purpose

The Toast component provides brief, temporary feedback after a user action or system event.

Toasts communicate:

- completion
- confirmation
- failure
- progress updates

Common uses:

- saved changes
- completed actions
- background processes
- lightweight errors

---

# Toast Philosophy

Toasts respect workflow momentum.

They acknowledge what happened without forcing the user to stop.

---

# Core Principle

## A Toast Confirms. It Does Not Explain.

If users need detailed explanation or action, use:

- Alert
- Dialog
- Inline messaging

---

# When To Use Toasts

Use Toasts for:

- successful actions
- completed operations
- temporary notices
- recoverable errors

Examples:

```
Project created successfully.

Estimate saved.

Customer invited.
```

---

# When Not To Use Toasts

Avoid Toasts for:

## Important Problems

Bad:

```
Payment failed.
```

Use:

- Alert

---

## Required Decisions

Bad:

```
Continue deleting?
```

Use:

- Dialog

---

## Complex Instructions

Bad:

```
Your account setup requires several steps...
```

Use:

- Page section
- Alert

---

# Toast Types

BuildRail supports:

1. Success
2. Error
3. Warning
4. Informational

---

# Success Toast

Used after completed actions.

Examples:

```
Estimate saved.

Customer added.
```

---

# Error Toast

Used when an action fails but the user can continue.

Examples:

```
Unable to upload document.

Try again.
```

---

# Warning Toast

Used for temporary attention.

Example:

```
Connection unstable.
```

Use sparingly.

---

# Informational Toast

Used for system updates.

Example:

```
Report generation started.
```

---

# Toast Anatomy

Structure:

```
Toast

├── Icon
├── Message
├── Optional Action
└── Dismiss Control
```

---

# Example

```
✓ Estimate saved

[Undo]
```

---

# Toast Content Rules

Toast messages should be:

- short
- specific
- action-oriented

---

# Good

```
Project archived.
```

---

# Avoid

```
The project you selected has successfully been archived by the system.
```

---

# Action Buttons

Toasts may include one action.

Examples:

```
Document deleted.

[Undo]
```

---

# Avoid Multiple Actions

Bad:

```
[View] [Edit] [Share] [Delete]
```

A toast is not a toolbar.

---

# Duration

Toasts should remain visible long enough to read.

General guidance:

Short message:

```
3–5 seconds
```

Longer message:

```
5–8 seconds
```

---

# Important Actions

Actions requiring attention should not disappear automatically.

Use:

- Alert
- Dialog

instead.

---

# Position

BuildRail standard:

```
Bottom-right
```

Desktop.

---

# Mobile Position

Mobile:

```
Bottom area
```

above system controls and navigation.

---

# Toast Stacking

Multiple Toasts should stack predictably.

Rules:

- newest appears first
- limit visible count
- avoid overwhelming users

---

# Toast Queue

If many events occur:

Prefer:

```
5 files uploaded
```

instead of:

```
File 1 uploaded

File 2 uploaded

File 3 uploaded
```

---

# Loading Toasts

Avoid using Toasts for long-running processes.

Bad:

```
Generating report...
```

for 5 minutes.

Use:

- Progress indicator
- Activity panel
- Background status

---

# Undo Actions

Undo is appropriate when:

- action is reversible
- recovery is simple

Examples:

```
Estimate deleted.

[Undo]
```

---

# Toast vs Alert

Toast:

```
Saved successfully.
```

Temporary.

---

Alert:

```
Your payment method expired.
```

Persistent.

---

# Toast vs Badge

Toast:

```
Sync completed.
```

Momentary feedback.

---

Badge:

```
Synced
```

Current state.

---

# Toast vs Dialog

Toast:

```
Customer created.
```

Dialog:

```
Delete customer?
```

---

# Accessibility Requirements

Toasts must:

- be announced appropriately
- not interrupt unnecessarily
- remain readable
- provide sufficient contrast
- support keyboard-accessible actions

---

# Screen Reader Behavior

Toasts should use appropriate:

```
aria-live
```

behavior.

---

# Priority Rules

Use announcement priority carefully.

Examples:

Informational:

```
polite
```

Critical errors:

```
assertive
```

Use sparingly.

---

# Toast Anti-Patterns

Avoid:

## Toast Spam

Too many messages reduce usefulness.

---

## Important Information In Toasts

Users may miss disappearing messages.

---

## Long Paragraphs

Toasts are not documents.

---

## Success For Everything

Not every click needs celebration.

---

## No Recovery

Failed actions should explain next steps.

---

# Implementation Rules

The Toast component should:

- consume design tokens
- support semantic variants
- support actions
- manage timing
- support accessibility announcements
- integrate with application state

---

# Component API Direction

Future implementation:

```
<Toast>

  <ToastTitle>
    Saved
  </ToastTitle>

  <ToastAction>
    Undo
  </ToastAction>

</Toast>
```

Variants:

```
success

error

warning

info
```

---

# Related Components

Toast works alongside:

```
Alert

Dialog

Button

Progress

ActivityFeed
```

---

# Final Principle

Toasts are moments of reassurance.

They tell users:

"Your action happened."

Then they get out of the way.

BuildRail feedback should feel confident, calm, and professional.
