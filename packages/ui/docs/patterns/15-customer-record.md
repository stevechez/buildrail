# BuildRail Design System

# Patterns — 15 Customer Record

Version: 1.0

Status: Approved

---

# Purpose

The Customer Record pattern defines how BuildRail organizes customer information, history, communication, and relationships.

The Customer Record connects:

- people
- projects
- estimates
- communication
- documents
- business history

---

# Customer Philosophy

A customer is not a database entry.

A customer represents a relationship.

Every interaction contributes to trust.

---

# Core Principle

## The Customer Record Should Tell The Complete Story.

Users should understand the relationship without searching across disconnected systems.

---

# Customer Record Model

```
Customer

├── Identity

├── Contact Information

├── Projects

├── Estimates

├── Communication

├── Documents

├── Payments

└── Activity History
```

---

# Customer Header

Every customer record begins with identity.

Example:

```
John Smith

Residential Customer

3 Projects

Last Contact: Yesterday
```

---

# Customer Header Information

May include:

- customer name
- company (if applicable)
- contact details
- location
- customer type
- relationship status

---

# Customer Status

Standard statuses:

```
Lead

Prospect

Active

Past Customer

Archived
```

---

# Status Philosophy

Status represents relationship stage.

Avoid using status as a replacement for workflow.

---

# Customer Overview

The overview provides immediate context.

Users should see:

```
Customer Summary

Active Projects

Recent Activity

Next Actions
```

---

# Customer Information

Customer details may include:

- phone
- email
- address
- preferences
- notes

---

# Information Rules

Customer information should be:

- accurate
- accessible
- permission-aware

---

# Customer Projects

Projects are connected to customers.

Example:

```
Projects

Kitchen Remodel

Bathroom Renovation

Deck Replacement
```

---

# Project Relationship

The customer record should answer:

```
What work have we done together?
```

---

# Customer Estimates

Estimates show business history.

Example:

```
Estimates

Approved

Pending

Declined
```

---

# Customer Communication

Communication should remain connected.

Examples:

- messages
- updates
- notes
- follow-ups

---

# Communication Visibility

Clearly separate:

```
Customer Visible

Internal Notes
```

---

# Customer Timeline

Timeline provides relationship history.

Example:

```
Jan 12

Estimate approved


Feb 04

Project started


Mar 10

Completion photos uploaded
```

---

# Timeline Rules

Show meaningful events.

Avoid recording every minor system action.

---

# Customer Documents

Documents may include:

- contracts
- warranties
- invoices
- photos
- correspondence

---

# Document Rules

Documents should show:

- type
- date
- relationship
- access level

---

# Customer Follow-Up

The customer record should support future opportunities.

Examples:

```
Follow up in 6 months

Request review

Schedule maintenance
```

---

# AI Customer Assistance

AI may assist with:

- communication drafts
- relationship summaries
- follow-up suggestions

---

# AI Example

Input:

```
Summarize customer history
```

Output:

```
John completed two renovation projects.
Most recent project completed March 2026.
Warranty follow-up recommended.
```

---

# AI Rules

AI should:

- summarize
- suggest
- organize

AI should not:

- send communication without approval
- make relationship decisions

---

# Customer Actions

Common actions:

```
Edit Customer

Create Project

Create Estimate

Send Message

Add Note
```

---

# Action Priority

Primary:

```
Create Work
```

Secondary:

```
Update Information

Export

Archive
```

---

# Customer Search

Customers should be discoverable by:

- name
- phone
- email
- address
- project history

---

# Customer Empty States

Example:

```
No Projects Yet

Create a project to begin tracking work.

[Create Project]
```

---

# Customer Loading States

Preserve:

- identity
- context
- navigation

---

# Customer Errors

Protect customer history.

Example:

```
Unable to load customer information.

[Retry]
```

---

# Responsive Behavior

Desktop:

```
Full customer workspace
```

---

Tablet:

```
Condensed sections
```

---

Mobile:

```
Customer summary first
```

---

# Mobile Priority

Show:

1. Customer identity
2. Contact actions
3. Active projects
4. Recent activity

---

# Accessibility Requirements

Customer Records must:

- use clear headings
- support keyboard navigation
- communicate relationships
- maintain logical reading order

---

# Customer Record Anti-Patterns

Avoid:

## Treating Customers As Contacts Only

Relationships matter.

---

## Duplicate Customers

Maintain one source of truth.

---

## Missing History

Past work builds trust.

---

## Hidden Communication

Important interactions should be visible.

---

## Excessive Data Collection

Only collect useful information.

---

# Implementation Rules

Customer Records should:

- consume design tokens
- integrate with Project Workspace
- support permissions
- support AI assistance
- maintain activity history
- connect business workflows

---

# Component Structure Direction

Future implementation:

```
<CustomerRecord>

  <CustomerHeader />

  <CustomerOverview />

  <ProjectList />

  <ActivityTimeline />

  <CommunicationPanel />

</CustomerRecord>
```

---

# Related Components

Works alongside:

```
ProjectWorkspace

PageHeader

Timeline

Card

Table

AI Assistant

Search
```

---

# Final Principle

The customer record represents more than information.

It represents the history of a business relationship.

BuildRail should help contractors remember, serve, and grow those relationships.
