# BuildRail Design System

# Components — 12 Table

Version: 1.0

Status: Approved

---

# Purpose

The Table component provides a consistent way to display structured information across BuildRail applications.

Tables help users:

- scan information
- compare records
- identify patterns
- take action
- manage workflows

Common uses:

- projects
- estimates
- customers
- payments
- documents
- team members
- activity history

---

# Table Philosophy

Tables are decision-making interfaces.

They should help users answer:

- What is happening?
- What needs attention?
- What action should I take?

---

# Core Principle

## A Table Should Optimize For Understanding, Not Data Density.

More information is not always better.

Clarity beats volume.

---

# When To Use Tables

Use tables for:

- comparable records
- structured data
- repeated items
- operational workflows

Examples:

```
Projects

Customers

Estimates

Invoices
```

---

# When Not To Use Tables

Avoid tables for:

- content-heavy records
- visual comparisons
- onboarding
- dashboards

Use:

- Cards
- Lists
- Detail views

instead.

---

# Table Anatomy

A standard table contains:

```
Table

├── Header
│
├── Rows
│   ├── Cells
│   └── Actions
│
└── Footer / Pagination
```

---

# Example

```
Projects

Name          Status       Owner

Kitchen Reno  Active       Sarah

Office Build  Review       Mike
```

---

# Table Structure

Tables should clearly separate:

- labels
- values
- actions

---

# Header

Headers provide context.

Requirements:

- concise labels
- predictable alignment
- readable contrast

---

# Header Rules

Avoid:

```
Information

Details

Data
```

Prefer:

```
Customer

Status

Created
```

---

# Column Alignment

Use alignment intentionally.

---

# Text Columns

Left aligned.

Example:

```
Project Name
```

---

# Numeric Columns

Right aligned.

Example:

```
Amount
```

---

# Status Columns

Centered or left aligned.

Example:

```
Status Badge
```

---

# Actions Column

Usually:

Right aligned.

Example:

```
...
```

---

# Row Design

Rows should support scanning.

They should have:

- consistent height
- readable spacing
- clear boundaries

---

# Row Density

BuildRail supports:

## Comfortable

Default.

Used for:

- primary workflows
- general business use

---

## Compact

Used for:

- power users
- dense operational views

---

## Spacious

Used for:

- onboarding
- simple lists

---

# Table States

Every table must define:

1. Default
2. Hover
3. Selected
4. Loading
5. Empty
6. Error

---

# Default State

Normal viewing state.

---

# Hover State

Provides row context.

Useful when:

- rows are clickable
- actions appear on hover

Avoid distracting effects.

---

# Selected State

Used for:

- bulk actions
- comparison
- workflow selection

Selection must be obvious.

---

# Loading State

Use predictable loading behavior.

Preferred:

- skeleton rows
- preserved layout

Avoid:

- empty blank tables

---

# Empty State

An empty table should explain:

1. Why it is empty
2. What the user can do next

Example:

```
No Projects Yet

Create your first project to get started.

[Create Project]
```

---

# Error State

Errors should provide:

- explanation
- recovery action

Example:

```
Unable to load projects.

[Retry]
```

---

# Row Actions

Actions should follow hierarchy.

Common patterns:

```
View

Edit

Archive
```

---

# Action Placement

Options:

## Dedicated Action Column

Good for:

- important actions

Example:

```
Project     Status       Actions
```

---

## Overflow Menu

Good for:

- secondary actions

Example:

```
...
```

---

# Avoid

Too many visible buttons.

Bad:

```
View Edit Delete Export Duplicate Share
```

---

# Sorting

Tables may support sorting.

Sort behavior should be:

- predictable
- visible
- consistent

---

# Sorting Indicators

Users should understand:

- current sort
- direction

Example:

```
Name ↑
```

---

# Filtering

Filtering should be separate from the table.

Common pattern:

```
Search

Filters

Table
```

---

# Search Rules

Search should:

- explain what is searched
- provide feedback
- update predictably

---

# Pagination

Use pagination when:

- datasets are large
- performance matters

Provide:

- current position
- total count when possible

---

# Infinite Scroll

Use carefully.

Business applications often benefit from predictable navigation.

---

# Bulk Selection

Used for:

- multiple actions
- workflow management

Example:

```
☑ Project A

☑ Project B

Archive Selected
```

---

# Bulk Action Rules

Bulk actions should:

- appear only when needed
- explain impact
- avoid destructive mistakes

---

# Responsive Tables

Tables require intentional mobile behavior.

Options:

## Horizontal Scroll

Good for complex business data.

---

## Column Reduction

Hide less important columns.

---

## Card Transformation

Use when row relationships are more important than columns.

---

# Mobile Rule

Do not simply shrink desktop tables.

---

# Accessibility Requirements

Tables must:

- use semantic table elements
- provide meaningful headers
- support keyboard navigation
- communicate sorting state
- support screen readers

---

# Data Accessibility

Avoid:

- color-only status indicators
- unclear abbreviations
- hidden meanings

---

# Table Anti-Patterns

Avoid:

## Spreadsheet Recreation

Software tables should support workflows.

---

## Too Many Columns

More columns reduce comprehension.

---

## Tiny Text

Dense does not mean unreadable.

---

## Hidden Actions

Important actions should be discoverable.

---

## No Empty State

Empty data needs guidance.

---

# Implementation Rules

The Table component should:

- consume design tokens
- support themes
- support sorting
- support filtering patterns
- support selection
- support loading states
- support accessibility requirements

---

# Component API Direction

Future implementation:

```
<Table>

  <TableHeader />

  <TableBody />

  <TableRow />

  <TableCell />

</Table>
```

---

# Future Extensions

Related components:

```
DataTable

Pagination

FilterBar

SearchInput

BulkActions

ColumnManager
```

---

# Final Principle

Tables are where professionals manage their work.

A great BuildRail table should make hundreds of records feel understandable.

The goal is not maximum density.

The goal is confident decisions.
