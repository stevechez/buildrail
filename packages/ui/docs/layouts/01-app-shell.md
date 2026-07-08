# BuildRail Design System

# Layouts — 01 App Shell

Version: 1.0

Status: Approved

---

# Purpose

The App Shell defines the permanent structure that surrounds every BuildRail application.

It establishes a consistent framework for navigation, page content, global actions, and system feedback so users always know where they are and how to move through the product.

Every BuildRail application should feel immediately familiar because every application shares the same shell.

---

# App Shell Philosophy

The App Shell should disappear into the background.

Users should focus on their work—not on learning a different interface for each product.

Consistency builds confidence.

---

# Core Principle

## The Application Frame Never Changes. The Workspace Changes.

Navigation remains stable.

Content changes.

---

# App Shell Responsibilities

The App Shell is responsible for:

- global navigation
- application identity
- page layout
- search and command access
- notifications
- account access
- responsive behavior

It is **not** responsible for business logic or page-specific workflows.

---

# Shell Anatomy

```
┌─────────────────────────────────────────────────────┐
│ Topbar                                              │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│ Sidebar      │                                      │
│              │   Workspace                          │
│              │                                      │
│              │                                      │
│              │                                      │
├──────────────┴──────────────────────────────────────┤
│ Global Feedback Layer                               │
└─────────────────────────────────────────────────────┘
```

---

# Shell Components

The App Shell consists of:

```
Topbar

Sidebar

Workspace

Global Feedback Layer
```

---

# Topbar

The Topbar provides global controls.

Examples:

- command search
- notifications
- organization switcher
- account menu

The Topbar should never contain page-specific actions.

---

# Sidebar

The Sidebar provides primary application navigation.

It should remain predictable across all products.

Primary navigation should rarely change location.

---

# Workspace

The Workspace contains:

- page headers
- workflows
- forms
- dashboards
- tables
- detail views

Every page inside the application lives within the Workspace.

---

# Global Feedback Layer

The shell provides a dedicated layer for:

- toasts
- dialogs
- banners
- loading overlays

Feedback should appear consistently regardless of the current page.

---

# Navigation Hierarchy

```
Application

↓

Module

↓

Page

↓

Workspace
```

Users should always understand their current location.

---

# Content Flow

The Workspace follows a predictable structure:

```
Page Header

↓

Primary Content

↓

Supporting Content
```

---

# Width Guidelines

The App Shell should support:

```
Standard Workspace

Wide Workspace

Full Width Workspace
```

Use the smallest layout that comfortably fits the content.

---

# Scrolling Rules

Navigation should remain stable.

Only the Workspace should scroll whenever possible.

Avoid multiple competing scroll regions.

---

# Global Search

The App Shell provides a single entry point for search and command.

Preferred location:

Topbar.

Search should remain accessible from every page.

---

# Notifications

Notifications belong to the shell—not individual pages.

Examples:

- sync complete
- invite accepted
- AI generation finished
- document uploaded

---

# Organization Context

Applications should always indicate the active organization.

Users working across companies should never wonder which workspace they are using.

---

# User Account

Account controls belong in the shell.

Typical actions:

- profile
- preferences
- billing
- sign out

---

# Responsive Behavior

## Desktop

```
Persistent Sidebar

Persistent Topbar

Large Workspace
```

---

## Tablet

```
Collapsible Sidebar

Persistent Topbar

Flexible Workspace
```

---

## Mobile

```
Compact Topbar

Temporary Navigation Drawer

Mobile Workspace
```

---

# Mobile Principles

Prioritize:

- content
- primary actions
- touch accessibility

Avoid desktop layouts scaled down to fit.

---

# Empty Workspace

When a page contains no data, the App Shell remains intact.

Only the Workspace changes.

Navigation should never disappear because content is empty.

---

# Error Handling

Page-level errors should remain inside the Workspace.

The App Shell should continue functioning whenever possible.

Users should still have access to:

- navigation
- search
- account
- help

---

# Loading Behavior

During page transitions:

- preserve navigation
- preserve shell layout
- show loading within the Workspace

Avoid replacing the entire interface with a loading screen.

---

# Accessibility Requirements

The App Shell must:

- provide semantic landmarks
- support keyboard navigation
- maintain logical focus order
- include skip links to main content
- support screen readers

Suggested landmarks:

```
<header>

<nav>

<main>

<footer> (optional)
```

---

# App Shell Anti-Patterns

Avoid:

## Page-Specific Navigation In The Topbar

Global navigation belongs in the shell.

---

## Full Page Reloads

Preserve the shell between page transitions.

---

## Multiple Navigation Systems

Users should have one primary navigation model.

---

## Inconsistent Layouts

Products should feel like members of the same family.

---

## Blocking The Entire Application

Loading and errors should affect the Workspace whenever possible—not the entire shell.

---

# Implementation Rules

The App Shell should:

- consume design tokens
- support all responsive breakpoints
- integrate with Sidebar and Topbar
- expose a Workspace container
- support overlays and global feedback
- preserve navigation state

---

# Component Structure Direction

Future implementation:

```
<AppShell>

  <Topbar />

  <Sidebar />

  <Workspace>

    <PageHeader />

    {children}

  </Workspace>

  <ToastProvider />

  <DialogProvider />

</AppShell>
```

---

# Related Components

Works alongside:

```
Topbar

Sidebar

PageHeader

DashboardShell

CommandMenu

Toast

Dialog

Alert
```

---

# Final Principle

The App Shell is the foundation of every BuildRail application.

Users should never have to relearn how to navigate between products.

Whether they are managing projects, generating estimates, reviewing field activity, or updating customer records, the shell should feel calm, consistent, and dependable.

The interface should fade into the background so the work remains at the center.
