# BuildRail Design System

# Patterns — 13 Estimate Workflow

Version: 1.0

Status: Approved

---

# Purpose

The Estimate Workflow pattern defines how BuildRail supports the creation, review, presentation, and approval of contractor estimates.

The workflow provides consistency across:

- Estimator
- Project Workspace
- Customer communication
- AI assistance

---

# Estimate Philosophy

An estimate is not just a price.

It is a professional representation of:

- scope
- expectations
- value
- trust

---

# Core Principle

## A Great Estimate Creates Clarity Before Work Begins.

The estimate should protect both:

- contractor
- customer

---

# Estimate Lifecycle

BuildRail estimates follow:

```
Draft

↓

Review

↓

Presented

↓

Approved

↓

Converted To Project
```

---

# Estimate Model

```
Estimate

├── Customer

├── Project

├── Scope

├── Line Items

├── Pricing

├── Notes

├── Attachments

├── Approval

└── History
```

---

# Estimate Creation

The creation workflow should guide users.

Primary goals:

- capture scope
- define pricing
- reduce omissions

---

# Creation Steps

Example:

```
1. Customer

2. Project Details

3. Scope

4. Pricing

5. Review

6. Send
```

---

# Step-Based Workflows

Use steps when:

- information builds progressively
- mistakes are costly

Avoid steps for simple edits.

---

# Estimate Header

Every estimate should clearly identify:

```
Kitchen Remodel Estimate

John Smith

$42,500

Draft
```

---

# Estimate Status

Standard statuses:

```
Draft

Review

Sent

Viewed

Approved

Declined

Expired
```

---

# Status Rules

Status should communicate workflow position.

Avoid vague statuses.

---

# Scope Definition

Scope is the foundation of the estimate.

Users should define:

- work included
- materials
- assumptions
- exclusions

---

# Scope Philosophy

Clear scope prevents:

- misunderstandings
- disputes
- scope creep

---

# Line Items

Line items communicate:

- labor
- materials
- services
- quantities
- pricing

---

# Line Item Rules

Line items should be:

- understandable
- editable
- organized

Avoid:

```
Labor Item 1
Material Item 2
```

---

# Estimate Organization

Large estimates should support:

```
Sections

Categories

Phases
```

Example:

```
Kitchen

  Demolition

  Cabinets

  Electrical
```

---

# Pricing

Pricing should be transparent.

Support:

- subtotal
- tax
- fees
- discounts
- final total

---

# Pricing Rules

Financial information must:

- be clear
- avoid ambiguity
- respect permissions

---

# AI Estimate Assistance

AI may assist with:

- scope suggestions
- descriptions
- exclusions
- customer explanations

---

# AI Rules

AI should:

- suggest
- accelerate
- improve clarity

AI should not:

- invent costs
- approve pricing
- make business decisions

---

# AI Example

User:

```
Bathroom remodel, 8x10, remove tub replace shower
```

AI:

```
Suggested Scope:

Remove existing tub assembly...

Install new shower enclosure...

Update plumbing connections...
```

---

# Estimate Review

Before sending, users should review:

```
Scope

Pricing

Customer Information

Terms
```

---

# Estimate Presentation

Customer-facing estimates should feel:

- professional
- clear
- trustworthy

---

# Presentation Rules

Avoid:

- internal notes
- confusing terminology
- excessive technical detail

---

# Estimate Approval

Approval should capture:

- customer decision
- timestamp
- identity

---

# Approved Estimate

After approval:

```
Estimate

↓

Project
```

---

# Conversion Rules

Approved estimates may create:

- project
- tasks
- schedule items

---

# Estimate Activity

Track:

```
Created

Edited

Sent

Viewed

Approved
```

---

# Estimate Actions

Common actions:

```
Edit

Duplicate

Send

Export

Convert To Project
```

---

# Destructive Actions

Require confirmation:

```
Delete Estimate?
```

---

# Estimate Empty States

Example:

```
No Estimates Yet

Create your first estimate to begin pricing work.

[Create Estimate]
```

---

# Estimate Loading States

Preserve:

- estimate identity
- customer context
- workflow position

---

# Estimate Errors

Errors should protect work.

Example:

```
Unable to save estimate.

Your changes have been preserved locally.
```

---

# Responsive Behavior

Desktop:

```
Full estimate editor
```

---

Tablet:

```
Condensed sections
```

---

Mobile:

```
Review and quick edits
```

---

# Mobile Priority

Prioritize:

1. Customer
2. Scope
3. Pricing
4. Approval status

---

# Accessibility Requirements

Estimate workflows must:

- support keyboard navigation
- provide clear labels
- communicate status changes
- support screen readers

---

# Estimate Workflow Anti-Patterns

Avoid:

## Treating Estimates As Simple Documents

They are workflow objects.

---

## Hidden Scope

Scope must be visible.

---

## AI Pricing Decisions

Humans own pricing.

---

## Too Many Steps

Only add steps that reduce errors.

---

## Poor Customer Presentation

The estimate represents the contractor.

---

# Implementation Rules

Estimate workflows should:

- consume design tokens
- integrate with Project Workspace
- support AI assistance
- preserve drafts
- track history
- support permissions

---

# Component Structure Direction

Future implementation:

```
<EstimateWorkflow>

  <EstimateHeader />

  <ScopeEditor />

  <LineItems />

  <PricingSummary />

  <AIHelper />

  <ApprovalPanel />

</EstimateWorkflow>
```

---

# Related Components

Works alongside:

```
ProjectWorkspace

FormField

Table

Card

Dialog

AI Assistant

Timeline
```

---

# Final Principle

The estimate is where expertise becomes trust.

BuildRail should help contractors create estimates that are:

Clear.

Professional.

Profitable.

Easy for customers to approve.
