# BuildRail Design System

# Components — 14 Alert

Version: 1.0

Status: Approved

---

# Purpose

The Alert component communicates important information that requires user awareness or action.

Alerts provide:

- context
- warnings
- confirmations
- recovery guidance

Common uses:

- system messages
- workflow warnings
- errors
- important notices

---

# Alert Philosophy

Alerts exist to help users make better decisions.

They should not interrupt unnecessarily.

---

# Core Principle

## An Alert Should Explain What Happened And What To Do Next.

A good alert answers:

1. What happened?
2. Why does it matter?
3. What can the user do?

---

# When To Use Alerts

Use Alerts for:

- important persistent messages
- workflow guidance
- errors requiring attention
- account conditions

Examples:

```
Payment method expired.

Update billing information to continue.
```

---

# When Not To Use Alerts

Avoid Alerts for:

## Minor Feedback

Use:

- Toast

Example:

```
Saved successfully.
```

---

## Status Labels

Use:

- Badge

Example:

```
Active
```

---

## Critical Confirmation

Use:

- Dialog

Example:

```
Delete Project?
```

---

# Alert Types

BuildRail supports:

1. Informational
2. Success
3. Warning
4. Error

---

# Informational Alert

Used for:

- helpful context
- announcements
- guidance

Example:

```
Your trial ends in 7 days.

Review your plan options.
```

---

# Success Alert

Used for:

- completed workflows
- successful configuration

Example:

```
Integration connected successfully.
```

Use sparingly.

Many successful actions do not require persistent alerts.

---

# Warning Alert

Used for:

- potential problems
- actions needed soon

Examples:

```
Estimate has not been sent.

Review before publishing.
```

---

# Error Alert

Used for:

- failures
- blocked workflows

Examples:

```
Unable to sync customers.

Reconnect your accounting account.
```

---

# Alert Anatomy

Standard structure:

```
Alert

├── Icon
├── Content
│   ├── Title
│   └── Description
└── Optional Action
```

---

# Example

```
⚠ Billing Issue

Your payment failed.

Update your payment method.

[Update Billing]
```

---

# Alert Titles

Titles should summarize.

Good:

```
Payment Failed
```

Avoid:

```
Something Went Wrong
```

---

# Alert Descriptions

Descriptions provide:

- explanation
- impact
- next step

---

# Alert Actions

Actions should be:

- relevant
- clear
- limited

Good:

```
[Reconnect Account]
```

Avoid:

```
[Click Here]
```

---

# Alert Placement

Alerts should appear close to relevant context.

Examples:

## Page Level

Account issue:

```
--------------------------------
Billing information required
--------------------------------

Dashboard content
```

---

## Card Level

Project warning:

```
Project Overview

⚠ Missing documents
```

---

## Inline

Form issue:

```
Email address is invalid.
```

---

# Alert Density

BuildRail supports:

## Compact

For:

- tables
- cards
- dense workflows

---

## Default

Standard application use.

---

## Spacious

For:

- onboarding
- important notices

---

# Alert States

Alerts are not interactive by default.

They require:

- visible content
- readable contrast
- optional actions

---

# Dismissible Alerts

Some alerts may be dismissed.

Use only when:

- information is temporary
- dismissal does not hide important problems

---

# Do Not Dismiss

Avoid dismissing:

- payment failures
- security issues
- required setup

---

# Alert Colors

Colors communicate meaning.

Use semantic colors:

```
Info → informational

Success → completed

Warning → attention

Error → problem
```

---

# Color Rules

Never use colors only as decoration.

Text and icons must reinforce meaning.

---

# Icons

Icons improve recognition.

Examples:

```
Info

Check

Warning

Error
```

Use:

- Lucide icons
- consistent sizing

---

# Alert vs Toast

Use Alert:

```
Payment failed.

Fix required.
```

Persistent.

---

Use Toast:

```
Project saved.
```

Temporary.

---

# Alert vs Badge

Use Alert:

```
Your integration needs attention.
```

Use Badge:

```
Disconnected
```

---

# Alert vs Dialog

Use Alert:

```
Backup unavailable.
```

Use Dialog:

```
Delete backup?
```

---

# Mobile Behavior

Alerts should:

- stack content vertically
- maintain readable text
- keep actions accessible

---

# Accessibility Requirements

Alerts must:

- provide meaningful text
- maintain contrast
- support screen readers
- use appropriate announcement behavior

---

# Live Announcements

Dynamic alerts may use:

```
aria-live
```

appropriately.

Avoid announcing every minor update.

---

# Alert Anti-Patterns

Avoid:

## Alert Everywhere

Too many alerts become invisible.

---

## Red For Everything

Reserve error states for real problems.

---

## Vague Messages

Avoid:

```
Error occurred
```

---

## No Recovery Path

Explain what users can do.

---

## Permanent Noise

Remove outdated alerts.

---

# Implementation Rules

The Alert component should:

- consume design tokens
- support semantic variants
- support optional actions
- support dismiss behavior
- support accessibility patterns

---

# Component API Direction

Future implementation:

```
<Alert>

  <AlertTitle>
    Payment Failed
  </AlertTitle>

  <AlertDescription>
    Update payment information.
  </AlertDescription>

</Alert>
```

Variants:

```
info

success

warning

error
```

---

# Related Components

Alert works alongside:

```
Toast

Badge

Dialog

Banner

FormField

EmptyState
```

---

# Final Principle

Alerts are how BuildRail speaks when something matters.

They should be calm, clear, and actionable.

The goal is not to create urgency.

The goal is to create understanding.
