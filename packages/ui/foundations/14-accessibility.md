# BuildRail Design System

# Foundations — 14 Accessibility

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail accessibility system defines the standards required to ensure every product experience is usable, understandable, and inclusive.

Accessibility is a fundamental part of product quality.

It influences:

- design decisions
- component behavior
- content structure
- interaction patterns
- engineering implementation

---

# Accessibility Philosophy

BuildRail is professional software used by people doing important work.

The product should be usable regardless of:

- device
- ability
- environment
- input method
- temporary limitation

Accessibility improves the experience for every user.

---

# Core Principle

## Clear For Everyone Is Better Than Clever For Some

BuildRail prioritizes:

- clarity
- predictability
- consistency
- usability

Complexity should never be introduced at the expense of understanding.

---

# Accessibility Standard

BuildRail targets:

## WCAG 2.2 Level AA

All products and components should meet or exceed these guidelines.

---

# Accessibility Areas

The system focuses on:

1. Visual accessibility
2. Keyboard accessibility
3. Screen reader support
4. Interaction accessibility
5. Motion accessibility
6. Content accessibility

---

# 1. Visual Accessibility

Visual information must remain understandable.

---

# Color Contrast

All text and interactive elements must maintain sufficient contrast.

Requirements:

- normal text meets WCAG AA contrast
- large text meets WCAG AA contrast
- interactive states remain visible

---

# Color Independence

Color should never be the only way information is communicated.

Bad:

```
Red = failed
Green = complete
```

Good:

```
❌ Payment Failed

✓ Payment Complete
```

Color reinforces meaning.

It does not create meaning.

---

# Focus Visibility

Every interactive element must have a visible focus state.

Users navigating with keyboards need to know:

"Where am I?"

Focus states should be:

- clear
- consistent
- visible in light and dark modes

---

# Typography Accessibility

Typography must support readability.

Requirements:

- readable font sizes
- sufficient line height
- clear hierarchy
- scalable text

Avoid:

- tiny critical information
- excessive condensed text
- low contrast labels

---

# 2. Keyboard Accessibility

Every important workflow must be possible without a mouse.

---

# Keyboard Requirements

Users must be able to:

- navigate controls
- open menus
- submit forms
- close dialogs
- move through content

---

# Keyboard Focus Order

Focus should follow visual order.

Avoid:

- unexpected jumps
- hidden controls appearing first
- confusing navigation paths

---

# Keyboard Shortcuts

Shortcuts may improve efficiency.

However:

- they must not replace standard interactions
- they should be discoverable
- they should not conflict with browser behavior

---

# 3. Screen Reader Support

BuildRail components must communicate structure and meaning.

---

# Semantic HTML

Prefer native HTML elements.

Use:

```
button
nav
main
header
form
table
```

before custom solutions.

---

# Labels

All inputs require clear labels.

Bad:

```
[________]
```

Good:

```
Project Name

[________]
```

---

# Forms

Forms should provide:

- clear labels
- helpful instructions
- understandable errors
- successful completion feedback

---

# Error Messages

Errors should explain:

1. What happened
2. Why it happened
3. How to fix it

Good:

```
Project name is required.

Enter a name before saving.
```

Avoid:

```
Invalid input.
```

---

# 4. Interaction Accessibility

Interactions should be predictable.

---

# Buttons

Buttons should:

- perform actions
- have clear labels
- communicate states

Good:

```
Save Estimate
```

Avoid:

```
Click Here
```

---

# Links

Links should describe destinations.

Good:

```
View Project Details
```

Avoid:

```
More
```

---

# Loading States

Loading states should communicate progress.

Avoid:

- silent waiting
- unclear delays

Good:

```
Generating estimate...
```

---

# Disabled States

Disabled elements should:

- look unavailable
- remain understandable
- explain why when necessary

Avoid:

- invisible disabled controls

---

# 5. Motion Accessibility

BuildRail respects user motion preferences.

---

# Reduced Motion

The system must support:

```
prefers-reduced-motion
```

Users requesting reduced motion should receive:

- fewer animations
- instant transitions where appropriate
- no unnecessary movement

---

# Motion Rules

Never use motion to communicate information that cannot also be understood without motion.

---

# 6. Content Accessibility

Words are part of accessibility.

---

# Writing Principles

BuildRail communication should be:

- clear
- concise
- specific
- respectful

---

# Avoid

- unnecessary jargon
- vague instructions
- technical language users do not need

---

# Use

Specific actions.

Examples:

Good:

```
Create Project
```

Avoid:

```
Initialize Workflow
```

---

# Data Accessibility

Business software often contains complex information.

Tables, charts, and dashboards should remain understandable.

---

# Tables

Requirements:

- meaningful headers
- clear relationships
- proper semantic structure

---

# Charts

Charts should provide:

- supporting labels
- summaries
- accessible alternatives when necessary

Never require visual interpretation alone.

---

# Component Accessibility Requirements

Every shared component must define:

- keyboard behavior
- focus behavior
- screen reader behavior
- loading behavior
- error behavior
- disabled behavior

---

# Accessibility Checklist

Before releasing a component:

## Visual

□ Contrast verified

□ States are visible

□ Text is readable

---

## Keyboard

□ Can be operated without a mouse

□ Focus order is logical

□ Focus state is visible

---

## Screen Reader

□ Labels are available

□ Semantic structure exists

□ Dynamic changes are announced when needed

---

## Interaction

□ Errors are understandable

□ Loading states are clear

□ Disabled states make sense

---

# Accessibility Anti-Patterns

Avoid:

## Color-Only Communication

Meaning must not depend only on color.

---

## Icon-Only Actions Without Labels

Icons require accessible names.

---

## Custom Controls Without Reason

Native HTML is usually better.

---

## Invisible Focus States

Keyboard users need orientation.

---

## Overly Complex Interactions

Complexity creates barriers.

---

# Implementation Rules

The accessibility system should:

- be part of every component review
- integrate with testing workflows
- use semantic HTML
- support assistive technologies
- maintain accessibility across themes

Accessibility is not a separate feature.

It is part of the system.

---

# Final Principle

Accessible software is thoughtful software.

BuildRail should feel like a product built by people who care about the details.

Clear.

Respectful.

Professional.

Available to everyone.
