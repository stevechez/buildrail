# BuildRail Design System

# Layouts — 07 Mobile Layout

Version: 1.0

Status: Approved

---

# Purpose

The Mobile Layout defines how BuildRail applications adapt to phones and small tablets.

Rather than shrinking desktop interfaces, the Mobile Layout prioritizes speed, readability, touch interaction, and field productivity.

Every BuildRail product must remain fully usable on mobile devices.

---

# Mobile Philosophy

Construction work happens in the field.

Users may be:

- walking
- standing
- wearing gloves
- outdoors in bright sunlight
- using one hand
- interrupted frequently
- working with unreliable connectivity

The interface must respect these realities.

---

# Core Principle

## Mobile Should Prioritize Completing Work, Not Recreating Desktop.

Simplify.

Focus.

Reduce friction.

---

# Relationship To Workspace

The Mobile Layout is an adaptation of the Workspace Layout.

```
App Shell

↓

Workspace

↓

Mobile Layout
```

Every Workspace should define an intentional mobile experience.

---

# Mobile Goals

Every mobile screen should answer:

- What is my next task?
- What information do I need now?
- What action can I complete quickly?

---

# Mobile Anatomy

```
Mobile Layout

├── Top Bar
│
├── Page Header
│
├── Primary Content
│
├── Sticky Primary Action (optional)
│
└── Bottom Navigation (optional)
```

---

# Standard Mobile Layout

```
────────────────────────

Top Bar

────────────────────────

Page Header

────────────────────────

Primary Content

────────────────────────

Sticky Action

────────────────────────
```

---

# Navigation

Navigation should remain simple.

Preferred patterns:

- bottom navigation
- navigation drawer
- contextual back navigation

Avoid deeply nested navigation.

---

# Touch Targets

Interactive elements should be easy to tap.

Minimum target size:

```
44 × 44 px
```

Larger targets are encouraged for high-frequency actions.

---

# Primary Actions

Primary actions should remain visible.

Examples:

```
Save

Complete Task

Capture Photo

Add Note
```

Long workflows may use a sticky action bar.

---

# Content Priority

Display information in this order:

1. Identity
2. Status
3. Primary task
4. Supporting information
5. Historical information

Users should not scroll through analytics to reach today's work.

---

# Cards Instead Of Tables

Large tables should transform into stacked cards.

Desktop:

```
Project | Customer | Status | Updated
```

Mobile:

```
Kitchen Remodel

Customer
John Smith

Status
Active

Updated
Yesterday
```

---

# Forms

Mobile forms should:

- use a single column
- minimize typing
- support appropriate keyboards
- group related fields

Avoid side-by-side inputs.

---

# Field Workflows

Field workflows receive priority.

Examples:

- capture photo
- complete task
- add note
- report issue
- send update

These actions should be reachable within one or two taps.

---

# Camera Integration

Photo capture is a primary workflow.

Support:

- camera launch
- image preview
- annotation
- upload status

Captured photos should never be lost if connectivity changes.

---

# Offline Behavior

Mobile applications should tolerate weak or missing connections.

Communicate sync state clearly.

Examples:

```
Saved Locally

Syncing…

Synced

Retry Required
```

Users should understand whether their work is safely stored.

---

# Progressive Disclosure

Hide advanced settings until needed.

Present the minimum information required to complete the current task.

---

# Notifications

Notifications should be brief and non-blocking.

Prefer:

- toast
- banner
- badge

Avoid modal interruptions unless confirmation is required.

---

# Loading Behavior

Preserve page structure.

Display:

- skeletons
- progress indicators
- upload status

Avoid blank screens.

---

# Error Behavior

Protect user input.

Example:

```
Unable to upload photo.

Your photo has been saved locally and will upload automatically when you're back online.

[Retry Now]
```

Provide recovery whenever possible.

---

# Performance

Mobile interfaces should feel responsive.

Guidelines:

- lazy load secondary content
- avoid unnecessary animations
- minimize network requests
- prioritize visible content

---

# Visual Density

Favor comfortable spacing.

Avoid dense desktop layouts scaled to small screens.

Whitespace improves touch accuracy and readability.

---

# Accessibility Requirements

Mobile layouts must:

- support screen readers
- support dynamic text sizes
- maintain sufficient color contrast
- expose touch targets programmatically
- avoid gesture-only interactions

All actions should remain available without relying on swipe gestures.

---

# Mobile Layout Anti-Patterns

Avoid:

## Desktop Shrunk To Fit

Redesign for mobile rather than scaling desktop layouts.

---

## Tiny Touch Targets

Controls must be easy to tap under real-world conditions.

---

## Hidden Primary Actions

Important actions should remain obvious.

---

## Horizontal Scrolling

Design for vertical flow.

---

## Long Forms

Break complex workflows into logical sections or steps.

---

## Connectivity Assumptions

Never assume reliable network access on a job site.

---

# Implementation Rules

Mobile Layouts should:

- consume design tokens
- inherit Workspace Layout
- prioritize field workflows
- support offline states
- support camera integration
- use responsive components
- preserve user progress

---

# Component Structure Direction

Future implementation:

```
<MobileLayout>

  <MobileTopBar />

  <PageHeader />

  <MobileContent>

    {children}

  </MobileContent>

  <StickyActionBar />

  <BottomNavigation />

</MobileLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

Card

FormLayout

FieldWorkflow

Toast

EmptyState

LoadingState

BottomNavigation
```

---

# Final Principle

Mobile is not a reduced version of BuildRail.

For many contractors, it is BuildRail.

Every mobile experience should help users complete meaningful work quickly, confidently, and reliably—whether they are in the office, in a truck, or standing on a job site.
