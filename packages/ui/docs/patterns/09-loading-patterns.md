# BuildRail Design System

# Patterns — 09 Loading Patterns

Version: 1.0

Status: Approved

---

# Purpose

The Loading Patterns system defines how BuildRail communicates progress while content, data, or actions are being processed.

Loading states create confidence by showing users:

- the system received their request
- work is happening
- completion is expected

---

# Loading Philosophy

A loading state is a communication moment.

Users should never ask:

"Did anything happen?"

---

# Core Principle

## Preserve Context While Work Is Happening.

Do not replace the interface with uncertainty.

---

# Loading State Types

BuildRail supports:

1. Skeleton Loading
2. Inline Loading
3. Button Loading
4. Progress Loading
5. Background Loading
6. Optimistic Updates

---

# 1. Skeleton Loading

Used when content structure is known but data is unavailable.

Common uses:

- dashboards
- tables
- cards
- project pages

---

# Skeleton Philosophy

Skeletons communicate:

"The page is arriving."

They should preserve layout.

---

# Example

Before:

```
Project Card

Kitchen Remodel

$42,000

Active
```

Loading:

```
████████

████

████
```

---

# Skeleton Rules

Skeletons should:

- match final layout
- avoid excessive animation
- maintain spacing

---

# Avoid

Bad:

```
Entire screen flashing endlessly
```

---

# 2. Inline Loading

Used for small content updates.

Examples:

- refreshing data
- loading dropdown options
- checking availability

---

# Example

```
Customers

Loading customers...
```

---

# 3. Button Loading

Used when a user initiates an action.

Examples:

- saving
- submitting
- generating

---

# Button Rules

A loading button should:

- remain in place
- communicate progress
- prevent duplicate actions

---

# Example

Before:

```
Create Estimate
```

After:

```
Creating Estimate...
```

---

# Avoid

Bad:

```
Button disappears
```

The user loses context.

---

# 4. Progress Loading

Used for longer operations.

Examples:

- file uploads
- AI generation
- report creation

---

# Progress Requirements

Show:

- current status
- estimated progress when possible
- next expectation

---

# Example

```
Generating Estimate

Analyzing project details...

Step 2 of 4
```

---

# AI Loading States

AI features require special handling.

Avoid:

```
Loading...
```

---

# Better:

```
Reviewing project information...

Generating estimate suggestions...

Preparing recommendations...
```

---

# AI Transparency Rules

Users should understand:

- what is happening
- why it takes time
- when it is complete

---

# 5. Background Loading

Used when work continues without blocking the user.

Examples:

- syncing
- indexing
- notifications

---

# Background Indicators

Use subtle indicators.

Example:

```
Syncing...
```

---

# Avoid

Large blocking screens for background work.

---

# 6. Optimistic Updates

Used when the result is predictable.

Examples:

- marking complete
- toggling settings
- updating status

---

# Optimistic Update Rules

The UI may update immediately while confirmation happens.

If failure occurs:

- restore state
- explain clearly

---

# Loading Duration Guidelines

## Very Fast

Under:

```
300ms
```

No loading indicator usually needed.

---

## Short

```
300ms - 2 seconds
```

Use:

- button state
- inline indicator

---

## Medium

```
2 - 10 seconds
```

Use:

- progress
- status messages

---

## Long

Over:

```
10 seconds
```

Use:

- detailed progress
- ability to continue when possible

---

# Loading Copywriting

Loading text should explain progress.

---

# Good

```
Preparing estimate...

Uploading documents...

Syncing field updates...
```

---

# Avoid

```
Please wait...

Loading...

Processing...
```

without context.

---

# Loading Animation

BuildRail uses restrained motion.

Allowed:

- subtle shimmer
- small spinner
- progress movement

Avoid:

- bouncing
- dramatic transitions
- distracting effects

---

# Loading and Layout Stability

Loading should not cause:

- jumping layouts
- moving buttons
- shifting content

---

# Responsive Behavior

Loading states must work across:

Desktop:

```
Full skeleton layout
```

Mobile:

```
Simplified skeleton layout
```

---

# Accessibility Requirements

Loading states must:

- communicate status changes
- support screen readers
- avoid trapping focus unnecessarily

---

# ARIA Guidance

Dynamic loading areas should communicate:

```
Loading state changed
```

when appropriate.

---

# Loading Anti-Patterns

Avoid:

## Blank Screens

Users need confirmation.

---

## Infinite Spinners

Without progress information.

---

## Fake Progress

Do not show misleading percentages.

---

## Blocking Everything

Allow users to continue when possible.

---

## Unclear AI Processing

Explain what the system is doing.

---

# Implementation Rules

Loading patterns should:

- consume design tokens
- support component variants
- preserve layout
- support accessibility
- work across products

---

# Component Structure Direction

Future implementation:

```
<Skeleton />

<LoadingSpinner />

<LoadingButton />

<ProgressIndicator />

<LoadingState />
```

---

# Related Components

Works alongside:

```
Button

Toast

Alert

EmptyState

DashboardShell

AI Assistant
```

---

# Final Principle

Loading states are moments of trust.

A professional application does not simply make users wait.

It communicates:

"We received your request."

"We are working."

"We will let you know when it is ready."
