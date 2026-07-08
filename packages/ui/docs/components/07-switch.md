# BuildRail Design System

# Components — 07 Switch

Version: 1.0

Status: Approved

---

# Purpose

The Switch component allows users to enable or disable a system behavior or setting.

Switches communicate:

- current state
- availability
- immediate configuration changes

A switch represents whether something is currently active.

---

# Switch Philosophy

Switches should make system state obvious.

Users should understand:

- what is enabled
- what is disabled
- what changes when toggled

---

# Core Principle

## A Switch Changes State. It Does Not Represent A Choice.

Good:

```
Email Notifications

[ ON ]
```

The system behavior changes.

---

Bad:

```
☐ Include warranty section
```

This is a choice, not a state.

Use Checkbox.

---

# When To Use Switch

Use Switch for:

- settings
- preferences
- feature activation
- automation controls
- visibility controls

---

# Common BuildRail Uses

## Notifications

Example:

```
Customer Updates

[ ON ]
```

---

## AI Features

Example:

```
AI Estimate Suggestions

[ OFF ]
```

---

## Automation

Example:

```
Automatic Follow-Up Emails

[ ON ]
```

---

## Integrations

Example:

```
Sync with Accounting Software

[ OFF ]
```

---

# When Not To Use Switch

Avoid Switch for:

## Forms Requiring Submission

Bad:

```
Agree to Terms

[ ON ]
```

Use Checkbox.

---

## Multiple Options

Bad:

```
Choose Features

[ ON ]
```

Use Checkbox Group.

---

## Actions

Bad:

```
Delete Project

[ ON ]
```

Use Button.

---

# Anatomy

Switch structure:

```
Switch

├── Control
├── Label
├── Description
└── Status
```

---

# Example

```
Automatic Estimate Follow-Up

Send reminders automatically after proposal delivery.

[ ON ]
```

---

# Switch Behavior

A switch represents a state transition.

Before:

```
OFF
```

After interaction:

```
ON
```

The result should be understandable.

---

# Immediate vs Saved Changes

Switches create an important design decision.

---

# Immediate Change

Use when:

- the action is reversible
- the impact is obvious

Example:

```
Enable notifications
```

The change happens immediately.

---

# Saved Change

Use when:

- the setting affects important workflows
- the impact requires confirmation

Example:

```
Enable automatic billing
```

May require:

- confirmation
- save action
- explanation

---

# Switch States

Every Switch must define:

1. Off
2. On
3. Hover
4. Focus
5. Disabled
6. Loading
7. Error

---

# Off State

Communicates:

"The feature is currently disabled."

---

# On State

Communicates:

"The feature is currently active."

---

# Hover State

Provides subtle interaction feedback.

Avoid:

- excessive animation
- decorative movement

---

# Focus State

Required for accessibility.

Must provide:

- visible focus indicator
- keyboard clarity

---

# Disabled State

Used when the setting cannot currently change.

Example:

```
Advanced Reporting

Available on Pro plan.
```

---

# Loading State

Used when the state change requires processing.

Example:

```
Syncing...

[ ... ]
```

---

# Optimistic Updates

For simple settings, the interface may update immediately.

Example:

User enables:

```
Notifications
```

The switch changes immediately while saving occurs.

If saving fails:

- revert state
- explain the problem

---

# Error Handling

Errors should explain:

- what failed
- what the user can do

Example:

```
Unable to enable sync.

Check your account connection.
```

---

# Labels

Switch labels should describe the enabled behavior.

Good:

```
Automatically send reminders
```

Avoid:

```
Automation
```

---

# Descriptions

Descriptions are helpful when the effect is not obvious.

Example:

```
AI Proposal Suggestions

Generate recommended wording for customer proposals.
```

---

# Switch Placement

Settings pages commonly use:

```
Setting Name

Description

                [Switch]
```

The switch should align consistently.

---

# Grouping Settings

Related switches should be grouped.

Example:

```
Notifications

Customer Emails

[ON]

Internal Alerts

[OFF]
```

---

# Mobile Behavior

Switches must support:

- touch-friendly interaction
- clear state visibility
- readable labels

Avoid tiny toggles.

---

# Accessibility Requirements

Switches must:

- use semantic switch behavior
- communicate current state
- support keyboard interaction
- have accessible labels
- maintain visible focus states

---

# Keyboard Behavior

Users should be able to:

- focus the switch
- toggle state
- understand current status

---

# Switch vs Checkbox Summary

| Component | Question Answered                     |
| --------- | ------------------------------------- |
| Checkbox  | "Do you want this option included?"   |
| Switch    | "Is this behavior currently enabled?" |

---

# Switch Anti-Patterns

Avoid:

## Using Switch As A Fancy Checkbox

Creates confusion.

---

## Hidden Consequences

Explain important changes.

---

## Too Many Switches

Settings pages can become overwhelming.

---

## Unclear State

Users should immediately know ON/OFF.

---

## Automatic Changes Without Feedback

Important changes need confirmation.

---

# Implementation Rules

The Switch component should:

- consume design tokens
- support themes
- support controlled state
- integrate with settings workflows
- provide accessibility semantics
- support loading behavior

---

# Component API Direction

Future implementation:

```
<Switch />
```

Example:

```
<Switch
  label="Enable notifications"
  checked={enabled}
/>
```

States:

```
checked

disabled

loading
```

---

# Related Components

Switch works alongside:

```
Checkbox

RadioGroup

FormField

SettingsPanel

PreferenceCard
```

---

# Final Principle

A switch is a promise:

"The system is now in this state."

BuildRail switches should make that promise clear, immediate, and trustworthy.
