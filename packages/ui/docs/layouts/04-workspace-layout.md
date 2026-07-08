# BuildRail Design System

# Layouts — 04 Detail Layout

Version: 1.0

Status: Approved

---

# Purpose

The Detail Layout defines how BuildRail presents and manages a single business entity.

Examples include:

- Project
- Customer
- Estimate
- Document
- Invoice
- Employee
- Equipment

Every Detail Layout should provide a consistent experience regardless of the entity being viewed.

---

# Detail Layout Philosophy

Users should never wonder:

- What am I looking at?
- What is its current status?
- What can I do next?

A detail page should immediately establish identity, context, and available actions.

---

# Core Principle

## One Entity. One Workspace.

Everything on the page should relate directly to the selected entity.

Avoid mixing unrelated workflows.

---

# Relationship To Workspace

The Detail Layout is a specialized Workspace Layout.

```
App Shell

↓

Workspace

↓

Detail Layout
```

---

# Detail Layout Anatomy

```
Detail Layout

├── Page Header
│
├── Summary Panel
│
├── Primary Content
│
├── Related Information
│
└── Activity Timeline
```

---

# Standard Layout

```
──────────────────────────────

Page Header

──────────────────────────────

Summary

──────────────────────────────

Primary Content

──────────────────────────────

Related Information

──────────────────────────────

Activity Timeline
```

---

# Page Header

The header establishes identity.

Examples:

```
Kitchen Remodel

Active

John Smith
```

The Page Header should include:

- title
- status
- primary actions
- breadcrumbs (when applicable)

---

# Summary Panel

The Summary Panel presents the most important facts.

Examples:

Project

```
Customer

Budget

Start Date

Status
```

Estimate

```
Customer

Amount

Expiration

Approval Status
```

Customer

```
Phone

Email

Active Projects

Last Contact
```

---

# Summary Rules

Keep summaries concise.

Highlight only information users reference frequently.

---

# Primary Content

The primary content supports the page's main workflow.

Examples:

Project

```
Tasks

Schedule

Documents
```

Estimate

```
Scope

Line Items

Pricing
```

Customer

```
Projects

Communication

Notes
```

---

# Related Information

Supporting information provides additional context.

Examples:

- AI recommendations
- recent files
- linked records
- payment history
- warranties

Supporting content should remain secondary.

---

# Activity Timeline

Every major entity should include an activity history when appropriate.

Examples:

```
Estimate Created

Customer Approved

Invoice Sent

Photo Uploaded
```

Timeline events should answer:

"What happened?"

"When?"

"Who did it?"

---

# Secondary Navigation

Large entities may support tabs.

Example:

```
Overview

Documents

Activity

Payments

Settings
```

Tabs should represent workflows—not database tables.

---

# Action Placement

Primary actions belong in the Page Header.

Examples:

```
Edit

Send

Approve

Upload

Complete
```

Secondary actions may appear within sections.

---

# Information Hierarchy

Display information in this order:

1. Identity
2. Status
3. Primary workflow
4. Supporting information
5. History

---

# Layout Width

Most Detail Layouts should use:

```
Standard

or

Wide
```

Reserve Full Width for data-heavy experiences.

---

# Split Layout

When additional context is helpful:

```
Primary Content

|

Supporting Panel
```

Examples:

Estimate

|

AI Suggestions

Project

|

Activity Timeline

Customer

|

Upcoming Tasks

---

# Empty Sections

If one section has no data:

Display an Empty State inside that section.

Do not remove the section entirely.

---

# Loading Behavior

Maintain page structure.

Replace sections with skeletons.

Users should immediately recognize the page.

---

# Error Behavior

Errors should remain localized.

Example:

Documents failed to load.

The Project page remains usable.

---

# Responsive Behavior

## Desktop

Summary and supporting panels may appear side by side.

---

## Tablet

Supporting panels move below primary content.

---

## Mobile

Stack sections vertically.

Priority:

1. Header
2. Summary
3. Primary Content
4. Related Information
5. Timeline

---

# Accessibility Requirements

Detail Layouts must:

- provide one H1
- use semantic sections
- maintain logical reading order
- support keyboard navigation
- expose status information to assistive technologies

---

# Detail Layout Anti-Patterns

Avoid:

## Dashboard Creep

A detail page is about one entity—not overall business metrics.

---

## Excessive Tabs

Only create tabs that represent meaningful workflows.

---

## Duplicate Information

Display each piece of information once.

Reference it elsewhere if needed.

---

## Buried Actions

Important actions should remain visible.

---

## Endless Scrolling

Group content into logical sections.

---

# Implementation Rules

Detail Layouts should:

- consume design tokens
- inherit Workspace Layout
- integrate with Page Header
- support optional tabs
- support optional side panels
- support activity history
- remain responsive

---

# Component Structure Direction

Future implementation:

```
<DetailLayout>

  <PageHeader />

  <SummaryPanel />

  <DetailContent>

    {children}

  </DetailContent>

  <RelatedPanel />

  <ActivityTimeline />

</DetailLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

Card

Tabs

Timeline

AI Assistant

EmptyState

LoadingState
```

---

# Final Principle

A Detail Layout should tell the complete story of one business object.

When users open a Project, Customer, Estimate, or Document, they should immediately understand:

- What is it?
- What is its current state?
- What work remains?
- What has happened?
- What can I do next?

The page should provide clarity before complexity and keep the user's attention focused on the work.
