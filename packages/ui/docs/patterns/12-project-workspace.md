# BuildRail Design System

# Patterns — 12 Project Workspace

Version: 1.0

Status: Approved

---

# Purpose

The Project Workspace pattern defines how BuildRail organizes all information, activity, and workflows around a single construction project.

The Project Workspace creates a unified operating view for:

- customer relationships
- estimates
- documents
- communication
- field activity
- payments
- AI assistance

---

# Project Workspace Philosophy

A project is the center of the contractor workflow.

Every important piece of information should connect back to the project.

---

# Core Principle

## The Project Is The Source Of Truth For The Work.

Users should not have to search across disconnected systems.

---

# Project Workspace Model

```
Project

├── Overview

├── Customer

├── Scope

├── Estimates

├── Schedule

├── Documents

├── Communication

├── Field Activity

├── Payments

└── History
```

---

# Project Header

Every project begins with a consistent identity area.

Example:

```
Kitchen Remodel

John Smith

123 Main Street

[Active]

```

---

# Project Header Information

May include:

- project name
- customer
- location
- status
- owner
- dates
- value

---

# Project Status

Projects use clear lifecycle states.

Example:

```
Lead

Planning

Estimating

Approved

Active

Completed

Archived
```

---

# Status Rules

Status should communicate workflow.

Avoid decorative statuses.

---

# Project Overview

The overview provides immediate understanding.

Users should see:

- current state
- next actions
- important information

---

# Overview Components

Common sections:

```
Project Summary

Upcoming Tasks

Recent Activity

Financial Snapshot

AI Suggestions
```

---

# Project Navigation

Projects may use secondary navigation.

Example:

```
Overview

Estimate

Documents

Messages

Schedule

Activity
```

---

# Project Tabs

Tabs should represent meaningful workflows.

Avoid creating tabs for every database table.

---

# Project Activity Timeline

Activity provides historical context.

Examples:

```
Estimate approved

Document uploaded

Customer message sent

Field note added
```

---

# Timeline Rules

Activity should:

- show important events
- provide timestamps
- identify users

---

# Project Documents

Documents belong to the project.

Examples:

- contracts
- photos
- plans
- invoices
- permits

---

# Document Rules

Documents should show:

- type
- owner
- date
- status

---

# Project Communication

Communication should remain connected.

Examples:

- customer messages
- internal notes
- updates

---

# Communication Rules

Differentiate:

```
Customer Visible

Internal Only
```

---

# Project Financial View

Financial information should be connected.

Examples:

- estimate amount
- approved value
- payments
- outstanding balance

---

# Financial Rules

Sensitive information should respect permissions.

---

# Field Integration

Field workflows connect directly to projects.

Examples:

```
Project

↓

Crew Assignment

↓

Daily Notes

↓

Photos

↓

Issues
```

---

# AI Integration

AI should understand project context.

Examples:

```
Summarize project history

Draft customer update

Identify missing information

Create scope suggestions
```

---

# Project Actions

Common project actions:

```
Edit Project

Add Estimate

Upload Document

Send Update

Archive Project
```

---

# Action Priority

Primary actions:

- create
- update
- progress workflow

Secondary actions:

- export
- archive
- settings

---

# Project Search

Projects should be discoverable by:

- customer
- address
- project name
- estimate number

---

# Project Empty States

New project:

```
No activity yet.

Start by creating an estimate or adding project details.
```

---

# Project Loading States

Maintain:

- project identity
- navigation
- structure

---

# Project Errors

Preserve:

- user input
- context
- recovery path

---

# Responsive Behavior

Desktop:

```
Full workspace layout
```

---

Tablet:

```
Condensed sections
```

---

Mobile:

```
Priority information first
```

---

# Mobile Project Priority

Show:

1. Project identity
2. Status
3. Primary actions
4. Recent activity

---

# Accessibility Requirements

Project Workspace must:

- use clear headings
- support keyboard navigation
- maintain logical reading order
- provide status information

---

# Project Workspace Anti-Patterns

Avoid:

## Fragmented Data

Information should connect.

---

## Too Many Tabs

Do not recreate a database schema.

---

## Hidden Status

Users should understand progress.

---

## Overloaded Dashboard

Prioritize action.

---

## Duplicate Records

One project should represent one job.

---

# Implementation Rules

Project Workspace should:

- consume design tokens
- use shared layout patterns
- support permissions
- integrate with AI
- support activity history
- support mobile workflows

---

# Component Structure Direction

Future implementation:

```
<ProjectWorkspace>

  <ProjectHeader />

  <ProjectNavigation />

  <ProjectOverview />

  <ProjectActivity />

  <ProjectActions />

</ProjectWorkspace>
```

---

# Related Components

Works alongside:

```
DashboardShell

PageHeader

Tabs

Timeline

Card

Table

AI Assistant
```

---

# Final Principle

The Project Workspace is the heart of BuildRail.

A contractor should open a project and immediately understand:

What is happening.

What has happened.

What needs to happen next.

BuildRail turns the project from a folder of information into a living workspace.
