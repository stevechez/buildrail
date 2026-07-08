# BuildRail Design System

# Components — 01 Button

Version: 1.0

Status: Approved

---

# Purpose

The Button component provides a consistent way for users to trigger actions throughout the BuildRail ecosystem.

Buttons communicate:

- available actions
- importance
- system state
- user intent

Buttons should help users understand:

"What will happen when I click this?"

---

# Button Philosophy

Buttons are action signals.

They should be:

- clear
- predictable
- easy to recognize
- appropriately prioritized

A button should never compete for attention.

---

# Core Principle

## Every Button Should Have a Clear Purpose

Good:

```
Create Estimate
Save Project
Send Proposal
```

Avoid:

```
Continue
Click Here
Proceed
```

when the result is unclear.

---

# Button Hierarchy

BuildRail uses a limited button hierarchy.

The available variants are:

1. Primary
2. Secondary
3. Outline
4. Ghost
5. Destructive
6. Link

---

# Primary Button

## Purpose

The primary action in a context.

Used for:

- creating records
- saving changes
- completing workflows

Examples:

```
Create Project

Save Estimate

Generate Proposal
```

---

## Usage Rules

A page should generally have:

- one primary action

Avoid multiple competing primary buttons.

---

# Secondary Button

## Purpose

Important supporting actions.

Examples:

```
Export

Duplicate

View Details
```

Secondary buttons support the primary workflow.

---

# Outline Button

## Purpose

Lower emphasis actions requiring clear boundaries.

Examples:

```
Cancel

Filter

Adjust Settings
```

---

# Ghost Button

## Purpose

Minimal actions.

Examples:

```
More Options

Dismiss

Navigate
```

Used carefully.

Ghost buttons should not hide important actions.

---

# Destructive Button

## Purpose

Irreversible or dangerous actions.

Examples:

```
Delete Project

Remove Member
```

---

## Rules

Destructive actions require:

- clear wording
- confirmation when necessary
- appropriate emphasis

Never make destructive actions accidentally easy to trigger.

---

# Link Button

## Purpose

Navigation-style actions.

Examples:

```
View Details

Learn More
```

Should behave like links.

---

# Button Sizes

BuildRail uses three standard sizes.

---

# Small

Used for:

- compact tables
- dense interfaces
- secondary actions

Example:

```
32px height
```

---

# Medium

Default button size.

Used for:

- forms
- dashboards
- standard workflows

Example:

```
40px height
```

---

# Large

Used for:

- onboarding
- marketing moments
- primary entry points

Example:

```
48px height
```

---

# Size Rules

Do not create custom button heights.

Consistency matters more than fitting every situation.

---

# Button Content

Buttons should use:

- clear verbs
- concise language
- predictable wording

---

# Good

```
Create Estimate

Save Changes

Invite Team Member

Export Report
```

---

# Avoid

```
Let's Get Started

Submit Information

Process Request
```

---

# Button Icons

Icons may reinforce meaning.

Examples:

```
+ Create Project

Download Export

Send Proposal →
```

---

# Icon Rules

Icons should:

- support understanding
- use Lucide icons
- follow icon sizing rules

Icons should not:

- replace important labels
- create ambiguity

---

# Icon Placement

Default:

Action icon before text.

Example:

```
[+] Create Project
```

Directional icons may appear after text.

Example:

```
Continue →
```

---

# Button States

Every button must define:

1. Default
2. Hover
3. Active
4. Focus
5. Disabled
6. Loading

---

# Default State

The normal interactive state.

Should clearly communicate:

"This can be clicked."

---

# Hover State

Provides confirmation of interactivity.

May adjust:

- background
- border
- elevation

Should remain subtle.

---

# Active State

Communicates pressing.

Should feel immediate.

Avoid:

- dramatic movement
- scaling effects

---

# Focus State

Required for accessibility.

Focus must be:

- visible
- consistent
- keyboard-friendly

---

# Disabled State

Communicates unavailable action.

Rules:

- reduce emphasis
- maintain readability
- do not remove completely

Disabled buttons should not create confusion.

---

# Loading State

Loading buttons communicate system activity.

Example:

Before:

```
Generate Estimate
```

During:

```
Generating...
```

---

# Loading Rules

When loading:

- prevent duplicate actions
- maintain button size
- preserve layout stability

Avoid:

- replacing the entire button
- large animations

---

# Button Placement

Buttons should follow user workflow.

Common patterns:

---

## Form Actions

Primary:

```
Save
```

Secondary:

```
Cancel
```

---

## Destructive Actions

Separate from normal workflow.

Example:

```
Edit

Delete
```

---

## Page Header Actions

Primary action near page context.

Example:

```
Projects                 + Create Project
```

---

# Button Grouping

Related actions may be grouped.

Example:

```
[Save] [Cancel]
```

Avoid excessive action clusters.

---

# Mobile Behavior

On smaller screens:

Buttons should remain:

- readable
- touch friendly
- easy to activate

---

# Mobile Rules

Prefer:

- full-width primary actions when appropriate
- stacked actions when space is limited

Avoid:

- tiny icon-only buttons
- crowded action rows

---

# Accessibility Requirements

Buttons must:

- use semantic button elements
- support keyboard interaction
- provide visible focus states
- have accessible names
- communicate loading state

---

# Button Anti-Patterns

Avoid:

## Too Many Primary Buttons

Creates unclear priorities.

---

## Ambiguous Labels

Users should know the result.

---

## Excessive Rounded Styling

Buttons should feel professional.

---

## Decorative Buttons

Every button exists for an action.

---

## Hidden Important Actions

Important workflows should not rely only on subtle buttons.

---

# Implementation Rules

The Button component should:

- consume design tokens
- use semantic colors
- use typography tokens
- use spacing tokens
- use radius tokens
- support themes
- support accessibility requirements

---

# Component API Direction

Future implementation should support:

```
<Button>
  Create Project
</Button>
```

Variants:

```
variant="primary"

variant="secondary"

variant="destructive"
```

Sizes:

```
size="sm"

size="md"

size="lg"
```

States:

```
disabled

loading
```

---

# Final Principle

Buttons are promises.

A button tells the user:

"If you choose this action, this is what will happen."

BuildRail buttons should make those promises clear, reliable, and easy to trust.
