# BuildRail Design System

# Layouts — 03 Dashboard Layout

Version: 1.0

Status: Approved

---

# Purpose

The Dashboard Layout defines how BuildRail presents operational information at a glance.

Dashboards should help users understand:

- what is happening
- what needs attention
- what changed
- what action should be taken next

A dashboard is a decision-making surface, not a reporting page.

---

# Dashboard Philosophy

Professional users should understand the health of their business within seconds.

The dashboard should reduce the time between opening the application and taking meaningful action.

---

# Core Principle

## Every Dashboard Should Lead To Action.

Information without action creates clutter.

Every section should help users decide what to do next.

---

# Relationship To Workspace

The Dashboard Layout is a specialized Workspace Layout.

```
App Shell

↓

Workspace

↓

Dashboard
```

It inherits all Workspace rules while adding dashboard-specific organization.

---

# Dashboard Anatomy

```
Dashboard

├── Page Header
│
├── Summary Metrics
│
├── Priority Actions
│
├── Operational Content
│
├── Recent Activity
│
└── Supporting Insights
```

---

# Standard Dashboard

```
Page Header

────────────────────────

Summary Cards

────────────────────────

Primary Work Area

────────────────────────

Activity

────────────────────────
```

---

# Dashboard Goals

A BuildRail dashboard should answer:

```
What requires my attention?

What changed today?

What should I do next?

Am I on track?
```

---

# Information Hierarchy

Display information in this order:

1. Immediate actions
2. Current status
3. Active work
4. Historical information
5. Analytics

History should never appear before actionable information.

---

# Summary Metrics

Summary metrics provide quick orientation.

Examples:

```
Active Projects

Pending Estimates

Invoices Due

Tasks Due Today
```

---

# Metric Rules

Metrics should be:

- meaningful
- current
- actionable

Avoid vanity metrics.

---

# Good

```
4 Estimates Awaiting Approval
```

---

# Avoid

```
12,492 Lifetime Clicks
```

unless relevant to the product.

---

# Priority Actions

The dashboard should encourage action.

Examples:

```
Create Estimate

Review New Leads

Upload Documents

Approve Proposal
```

---

# Action Rules

Limit primary actions.

Focus on the workflows users perform most often.

---

# Operational Content

This is the heart of the dashboard.

Examples:

- active projects
- today's schedule
- customer follow-ups
- unpaid invoices
- field updates

Operational content should always outweigh reporting.

---

# Activity Feed

The activity feed communicates recent events.

Examples:

```
Estimate approved

Project updated

Document uploaded

Crew completed inspection
```

---

# Activity Rules

Display meaningful events.

Avoid showing low-value system activity.

---

# Supporting Insights

Insights provide additional awareness.

Examples:

```
Revenue this month

Project completion trends

Upcoming renewals

Warranty reminders
```

Supporting insights should not dominate the page.

---

# Dashboard Cards

Use Cards to group related information.

Each card should answer one question.

Examples:

```
Projects Requiring Attention

Upcoming Inspections

Recent Customer Messages
```

Avoid oversized cards with unrelated content.

---

# Section Priority

Arrange sections from highest to lowest urgency.

```
Urgent

↓

Important

↓

Informational
```

---

# Personalization

Dashboards may adapt to user roles.

Examples:

Office Manager:

```
Billing

Projects

Scheduling
```

Estimator:

```
Draft Estimates

Pending Reviews

Customer Requests
```

Field Technician:

```
Today's Jobs

Assigned Tasks

Safety Notices
```

---

# Empty Dashboard

New users should see guidance rather than blank cards.

Example:

```
Welcome to BuildRail

Create your first project to begin managing work.

[Create Project]
```

---

# Loading Behavior

Maintain dashboard structure.

Replace content with:

- skeleton cards
- loading rows
- placeholder charts

Avoid shifting layouts.

---

# Error Behavior

If one dashboard section fails:

- keep other sections available
- isolate the error
- provide a retry action

Never fail the entire dashboard because one widget cannot load.

---

# Responsive Behavior

## Desktop

Multi-column layout.

---

## Tablet

Reduce to two columns where appropriate.

---

## Mobile

Single-column layout.

Priority order:

1. Summary
2. Actions
3. Active Work
4. Activity
5. Insights

---

# Accessibility Requirements

Dashboards must:

- maintain logical heading hierarchy
- support keyboard navigation
- expose meaningful labels
- not rely solely on charts or color

---

# Dashboard Anti-Patterns

Avoid:

## Widget Overload

Every widget should earn its place.

---

## Decorative Charts

Visualizations must support decisions.

---

## Hidden Actions

Users should immediately know what to do next.

---

## Equal Visual Weight

Urgent items should receive more emphasis than informational content.

---

## Static Dashboards

Dashboards should reflect current work, not just historical reporting.

---

# Implementation Rules

Dashboard layouts should:

- consume design tokens
- inherit Workspace Layout
- support responsive grids
- support role-based customization
- integrate with Empty, Loading, and Error patterns

---

# Component Structure Direction

Future implementation:

```
<DashboardLayout>

  <PageHeader />

  <DashboardMetrics />

  <DashboardActions />

  <DashboardGrid>

    <DashboardCard />

    <DashboardCard />

    <ActivityFeed />

  </DashboardGrid>

</DashboardLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

Card

Table

EmptyState

LoadingState

ActivityTimeline

AI Assistant
```

---

# Final Principle

A dashboard is not a collection of statistics.

It is the operational starting point for the workday.

When a contractor opens BuildRail, the dashboard should immediately answer:

- What needs my attention?
- What should I do next?
- Is my business on track?

The best dashboard reduces thinking and accelerates action.
