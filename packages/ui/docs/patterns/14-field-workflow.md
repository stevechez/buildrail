# BuildRail Design System

# Patterns — 14 Field Workflow

Version: 1.0

Status: Approved

---

# Purpose

The Field Workflow pattern defines how BuildRail supports construction teams working outside the office.

The Field experience supports:

- jobsite activity
- crew coordination
- documentation
- issue tracking
- customer communication
- progress updates

---

# Field Philosophy

Field users are working while:

- moving
- standing
- inspecting
- communicating
- solving problems

The interface must respect that environment.

---

# Core Principle

## Field Workflows Must Optimize For Speed, Clarity, And Capture.

The jobsite is not the office.

---

# Field Workflow Model

```
Project

↓

Assignment

↓

Daily Activity

↓

Documentation

↓

Issues

↓

Updates
```

---

# Field Experience Principles

Field interfaces should be:

## Fast

Important actions should require minimal steps.

---

## Clear

Users should immediately understand what needs attention.

---

## Durable

The experience should work in imperfect conditions.

---

## Practical

Avoid unnecessary complexity.

---

# Field Navigation

Field users should have quick access to:

```
My Jobs

Today's Tasks

Capture

Messages

Notifications
```

---

# Field Home Screen

The default field view should answer:

```
What do I need to do today?
```

---

# Example

```
Today's Work

Kitchen Remodel

3 Tasks

1 Inspection

2 Notes Needed
```

---

# Project Field View

The field project view focuses on execution.

Example:

```
Kitchen Remodel

Today

Tasks

Photos

Notes

Issues
```

---

# Field Actions

Primary actions should be immediately available.

Examples:

```
Add Photo

Add Note

Report Issue

Complete Task
```

---

# Action Priority

Field actions should favor:

1. Capture
2. Update
3. Communicate

---

# Photo Capture

Photos are a primary field workflow.

Support:

- quick capture
- upload
- annotation
- categorization

---

# Photo Rules

Photos should connect to:

- project
- task
- issue
- date
- user

---

# Photo Workflow

```
Capture

↓

Review

↓

Add Context

↓

Save
```

---

# Field Notes

Notes capture real-world information.

Examples:

- measurements
- observations
- customer requests
- changes

---

# Note Rules

Notes should support:

- text
- voice input (future)
- photos
- timestamps

---

# Daily Logs

Daily logs document progress.

Example:

```
Today's Progress

Completed framing inspection.

Installed cabinets.

Waiting on electrical.
```

---

# Daily Log Philosophy

Logs create:

- accountability
- history
- communication

---

# Task Completion

Tasks should be simple.

Example:

```
Install vanity

[Complete]
```

---

# Task Rules

Completion should:

- record who completed it
- record when
- update project history

---

# Issue Tracking

Issues represent problems requiring attention.

Examples:

- material delays
- customer changes
- damaged materials
- inspection problems

---

# Issue Model

```
Issue

├── Description

├── Photos

├── Priority

├── Owner

├── Status

└── Resolution
```

---

# Issue Status

Standard statuses:

```
Open

Assigned

In Progress

Resolved
```

---

# Field Communication

Communication should stay connected to work.

Examples:

```
Customer Update

Crew Note

Internal Message
```

---

# Customer Visibility

Clearly distinguish:

```
Customer Visible

Internal Only
```

---

# Offline Support

Field applications should consider:

- weak connectivity
- delayed syncing
- offline capture

---

# Offline States

Communicate:

```
Saved Locally

Sync Pending

Synced
```

---

# Sync Conflicts

When conflicts occur:

Explain:

```
Two updates were made.

Choose which version to keep.
```

---

# AI Field Assistance

AI may assist with:

- daily summaries
- customer updates
- issue descriptions
- progress reports

---

# AI Example

Field note:

```
Installed cabinets, found wall issue.
```

AI:

```
Daily Summary:

Cabinet installation progressed.
Additional wall repair may be required.
```

---

# Field AI Rules

AI should:

- reduce documentation effort
- preserve accuracy
- require review

---

# Mobile Design Rules

Field interfaces require:

## Large Touch Targets

Minimum:

```
44px
```

---

## Reduced Typing

Prefer:

- selections
- quick actions
- voice input

---

## Strong Contrast

Outdoor environments require clarity.

---

# Responsive Behavior

Field is primarily:

```
Mobile First
```

Desktop views may exist for management.

---

# Loading Behavior

Field loading should:

- preserve work
- communicate sync state
- avoid losing captured data

---

# Error Handling

Field errors should support recovery.

Example:

```
Upload failed.

Photo saved locally and will retry.
```

---

# Accessibility Requirements

Field workflows must:

- support touch accessibility
- support keyboard where available
- provide labels
- avoid color-only communication

---

# Field Workflow Anti-Patterns

Avoid:

## Office Replicated On Mobile

Field users need a different experience.

---

## Long Forms

Reduce required typing.

---

## Hidden Actions

Important actions should be obvious.

---

## Data Loss

Never discard field input.

---

## Constant Connectivity Assumptions

Expect imperfect networks.

---

# Implementation Rules

Field workflows should:

- consume design tokens
- prioritize mobile
- support offline states
- integrate with Project Workspace
- support AI assistance
- maintain activity history

---

# Component Structure Direction

Future implementation:

```
<FieldWorkspace>

  <TodayView />

  <TaskList />

  <PhotoCapture />

  <IssueTracker />

  <DailyLog />

</FieldWorkspace>
```

---

# Related Components

Works alongside:

```
ProjectWorkspace

Card

Timeline

Camera Upload

Toast

AI Assistant

Mobile Navigation
```

---

# Final Principle

BuildRail should work where contractors actually work.

The office manages the business.

The field creates the value.

Both experiences must feel like one connected system.
