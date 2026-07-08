# BuildRail Design System

# Layouts — 06 Table Layout

Version: 1.0

Status: Approved

---

# Purpose

The Table Layout defines how BuildRail presents structured collections of business data.

Examples include:

- Projects
- Customers
- Estimates
- Documents
- Invoices
- Tasks
- Crew Members
- Equipment
- Leads

Tables should prioritize clarity, speed, and action.

---

# Table Philosophy

Users rarely open a table just to read information.

They open a table to:

- find something
- compare records
- identify issues
- complete work

Tables are operational workspaces.

---

# Core Principle

## Tables Should Help Users Find And Act On Information Quickly.

Every element should improve scanning or support an action.

---

# Relationship To Workspace

The Table Layout is a specialized Workspace Layout.

```
App Shell

↓

Workspace

↓

Table Layout
```

---

# Table Anatomy

```
Table Layout

├── Page Header
│
├── Toolbar
│
├── Active Filters (optional)
│
├── Data Table
│
├── Pagination
│
└── Bulk Actions (optional)
```

---

# Standard Layout

```
──────────────────────────────

Page Header

──────────────────────────────

Toolbar

──────────────────────────────

Filters

──────────────────────────────

Table

──────────────────────────────

Pagination
```

---

# Toolbar

The Toolbar contains global actions.

Examples:

```
Search

Filter

Sort

Export

Create
```

Toolbar actions affect the collection—not individual rows.

---

# Search

Search should be available whenever the dataset is large enough to benefit.

Search should update results without reloading the page.

Support partial matches where practical.

---

# Filters

Filters narrow the dataset.

Examples:

```
Status

Owner

Date

Customer

Project Type
```

Only expose filters users frequently need.

---

# Sort

Sorting should be available on appropriate columns.

Examples:

```
Date

Name

Amount

Status
```

Avoid enabling sort on decorative or computed values.

---

# Column Design

Columns should display the minimum information needed to identify a record.

Example:

Projects

```
Project

Customer

Status

Owner

Updated
```

Avoid columns that duplicate information.

---

# Primary Column

The first column identifies the record.

Examples:

```
Project Name

Estimate Number

Customer Name
```

This column should usually link to the Detail Layout.

---

# Status Columns

Status should use:

- badges
- icons (when appropriate)
- readable text

Never rely on color alone.

---

# Row Actions

Actions belong at the end of each row.

Examples:

```
View

Edit

Duplicate

Archive
```

Avoid cluttering rows with too many buttons.

---

# Bulk Selection

When supported:

Selection checkboxes appear as the first column.

Bulk actions should appear only after rows are selected.

Examples:

```
Delete

Assign

Export

Archive
```

---

# Row Density

BuildRail favors comfortable density.

Rows should be easy to scan without feeling crowded.

Use consistent row heights.

---

# Empty Tables

When no records exist:

Display an Empty State.

Example:

```
No Projects Yet

Create your first project to begin tracking work.

[Create Project]
```

When filters produce no results:

```
No matching records.

Clear filters to see all projects.

[Clear Filters]
```

Differentiate between an empty dataset and an empty search result.

---

# Loading Behavior

Preserve table structure.

Replace rows with skeleton placeholders.

Keep:

- headers
- toolbar
- filters

Avoid layout shifts.

---

# Error Behavior

Errors should preserve context.

Example:

```
Unable to load projects.

[Retry]
```

Do not remove the toolbar or page header.

---

# Pagination

Large datasets should use pagination.

Pagination should clearly communicate:

- current page
- total pages
- total records

Example:

```
1–25 of 142 Projects
```

---

# Selection Rules

Selected rows should remain obvious.

Selections should persist during reasonable interactions such as sorting and filtering when practical.

---

# Inline Editing

Inline editing should be limited to simple values.

Examples:

- status
- owner
- priority

Complex editing belongs in the Detail Layout or Form Layout.

---

# Responsive Behavior

## Desktop

Display full table.

---

## Tablet

Hide lower-priority columns when necessary.

---

## Mobile

Avoid horizontal scrolling whenever possible.

Prefer transforming each row into a stacked record card.

Example:

```
Kitchen Remodel

Customer:
John Smith

Status:
Active

Updated:
Yesterday
```

The mobile experience should prioritize readability over preserving the desktop table.

---

# Accessibility Requirements

Tables must:

- use semantic table elements
- support keyboard navigation
- expose sortable columns
- communicate selection state
- announce pagination updates

Interactive controls inside rows must remain reachable via keyboard.

---

# Table Layout Anti-Patterns

Avoid:

## Too Many Columns

Only display information users actively need.

---

## Icon-Only Actions

Provide accessible labels and tooltips.

---

## Overloaded Toolbars

Keep primary actions focused.

---

## Endless Horizontal Scrolling

Prioritize responsive column management.

---

## Inline Editing Everything

Reserve inline editing for quick, low-risk changes.

---

# Implementation Rules

Table Layouts should:

- consume design tokens
- inherit Workspace Layout
- integrate with Search and Filters
- support pagination
- support bulk actions
- support responsive transformations
- integrate with Empty, Loading, and Error patterns

---

# Component Structure Direction

Future implementation:

```
<TableLayout>

  <PageHeader />

  <TableToolbar />

  <ActiveFilters />

  <DataTable />

  <Pagination />

  <BulkActions />

</TableLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

Table

Search

FilterBar

Badge

Button

DropdownMenu

EmptyState

LoadingState
```

---

# Final Principle

A BuildRail table is not a spreadsheet.

It is a decision-making workspace.

Users should be able to scan information, identify what matters, and take action with confidence.

The best table helps users spend less time searching and more time getting work done.
