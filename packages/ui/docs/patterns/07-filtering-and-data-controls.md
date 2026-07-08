# BuildRail Design System

# Patterns — 07 Filtering and Data Controls

Version: 1.0

Status: Approved

---

# Purpose

The Filtering and Data Controls pattern defines how users interact with large datasets throughout BuildRail applications.

This pattern provides consistent approaches for:

- searching
- filtering
- sorting
- grouping
- saving views
- managing records

---

# Philosophy

Professional users do not want more data.

They want faster answers.

Data controls should help users move from:

"Here is everything."

to:

"Here is what matters right now."

---

# Core Principle

## Controls Should Reveal Meaning, Not Add Complexity.

Every filter should help answer a real workflow question.

---

# Common Use Cases

Filtering and data controls support:

- projects
- leads
- customers
- estimates
- documents
- payments
- field activity

---

# Data Control Anatomy

A standard data view may contain:

```
Data View

├── Search

├── Filters

├── Sort

├── View Controls

├── Bulk Actions

└── Results
```

---

# Example

```
Projects


Search projects...


Status ▼

Owner ▼

Date Range ▼


24 Projects
```

---

# Search

Search provides direct lookup.

Use when users know:

- name
- identifier
- keyword

Examples:

```
Kitchen Remodel

John Smith

Estimate #1042
```

---

# Search Rules

Search should:

- be fast
- provide relevant results
- preserve context

---

# Filters

Filters narrow results based on attributes.

Examples:

```
Status

Owner

Date

Location

Customer
```

---

# Filter Philosophy

Filters should represent meaningful decisions.

Good:

```
Active Projects
```

Avoid:

```
Filter Option A
```

---

# Filter Categories

Common BuildRail filters:

## Status

Example:

```
Active

Completed

Archived
```

---

## Ownership

Example:

```
Assigned To

Created By
```

---

## Time

Example:

```
This Week

This Month

Custom Range
```

---

## Business Attributes

Example:

```
Project Type

Customer

Location
```

---

# Filter Placement

Preferred:

```
Search

Primary Filters

More Filters
```

---

# Filter Priority

Most important filters should be visible.

Secondary filters belong in:

```
More Filters
```

---

# Filter Chips

Active filters should be visible.

Example:

```
Status: Active ×

Owner: Steve ×
```

---

# Removing Filters

Users should easily:

- remove individual filters
- clear all filters

---

# Clear Controls

Provide:

```
Clear Filters
```

when multiple filters exist.

---

# Saved Views

Saved views allow users to preserve workflows.

Examples:

```
My Active Projects

Unpaid Estimates

New Leads This Week
```

---

# Saved View Philosophy

Saved views turn repeated filtering into workflows.

---

# Saved View Rules

Users should be able to:

- create views
- rename views
- update views
- delete views

---

# Default Views

Products may provide useful defaults.

Examples:

```
All Projects

My Projects

Needs Attention
```

---

# Sorting

Sorting changes result order.

Common examples:

```
Newest

Oldest

Amount

Priority
```

---

# Sorting Rules

Sorting should:

- show current state
- preserve user expectations
- work consistently

---

# Multiple Sorts

Avoid complex sorting unless required.

Simple beats powerful.

---

# View Controls

Some data can be represented differently.

Examples:

```
Table View

Board View

Calendar View
```

---

# View Switching Rules

Views should answer different needs.

Example:

Table:

```
Detailed management
```

Board:

```
Workflow status
```

---

# Density Controls

Professional users may need density options.

BuildRail supports:

```
Comfortable

Compact
```

---

# Bulk Actions

Bulk actions allow efficient management.

Examples:

```
Archive Selected

Assign Selected

Export Selected
```

---

# Bulk Action Rules

Actions should:

- appear after selection
- communicate impact
- support undo where possible

---

# Destructive Bulk Actions

Require caution.

Example:

```
Archive 24 Projects?
```

---

# Filter States

Every data view should support:

1. Default
2. Filtered
3. No Results
4. Loading
5. Error

---

# No Results State

Example:

```
No projects match your filters.

Adjust filters or clear search.
```

---

# Loading State

Preserve structure.

Use:

- skeleton rows
- loading indicators

Avoid:

- blank screens

---

# Error State

Example:

```
Unable to load projects.

[Retry]
```

---

# URL State

Where appropriate, filters should persist.

Benefits:

- shareable views
- browser navigation
- workflow continuity

---

# Responsive Behavior

Desktop:

```
Full filter bar
```

---

Tablet:

```
Condensed controls
```

---

Mobile:

```
Filter drawer
```

---

# Mobile Filtering

Mobile should prioritize:

- search
- common filters
- clear actions

---

# Accessibility Requirements

Data controls must:

- support keyboard use
- provide labels
- maintain focus states
- communicate selected filters
- support screen readers

---

# Control Labels

Avoid:

```
Filter
```

when possible.

Prefer:

```
Filter by status
```

---

# Data Control Anti-Patterns

Avoid:

## Filter Explosion

Too many filters overwhelm users.

---

## Hidden Active Filters

Users should know why results changed.

---

## Complex Query Builders

Only use when necessary.

---

## Resetting User Context

Do not unexpectedly clear filters.

---

## Desktop-Only Controls

Important workflows need mobile support.

---

# Implementation Rules

Filtering systems should:

- consume design tokens
- integrate with tables
- support URL state
- support permissions
- support saved views
- maintain accessibility

---

# Component Structure Direction

Future implementation:

```
<DataToolbar>

  <SearchInput />

  <FilterMenu />

  <SortControl />

  <ViewSwitcher />

</DataToolbar>
```

---

# Related Components

Works alongside:

```
Table

Card

Search

CommandMenu

Pagination

EmptyState
```

---

# Final Principle

Data controls transform information into action.

BuildRail should not make users manage data.

It should help them manage work.
