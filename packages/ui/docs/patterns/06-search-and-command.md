# BuildRail Design System

# Patterns — 06 Search and Command

Version: 1.0

Status: Approved

---

# Purpose

The Search and Command pattern defines how users discover information, navigate the platform, and perform actions quickly across BuildRail.

It combines:

- global search
- command palette
- quick actions
- intelligent navigation

---

# Philosophy

Search answers:

"What am I looking for?"

Command answers:

"What do I want to do?"

BuildRail combines both into a unified access layer.

---

# Core Principle

## Users Should Be Able To Express Intent, Not Memorize Navigation Paths.

The system should adapt to how users think.

---

# Search vs Command

These are related but different.

---

# Search

Used to find existing information.

Examples:

```
Find customer

Open project

Locate estimate

Search documents
```

---

# Command

Used to perform actions.

Examples:

```
Create project

Invite team member

Generate estimate

Open settings
```

---

# Unified Experience

BuildRail may combine both:

Example:

```
⌘ K

Search customers, projects, or actions...
```

---

# Command Center Philosophy

The command center acts as a universal entry point.

It should feel like:

- fast
- predictable
- powerful

---

# Trigger

Preferred shortcut:

```
⌘ K

Ctrl K
```

---

# Trigger Availability

Command access should be available throughout the application.

---

# Search Scope

Global search may include:

```
Projects

Customers

Estimates

Documents

Payments

Team Members
```

---

# Search Results

Results should be grouped.

Example:

```
Customers

John Smith


Projects

Kitchen Remodel


Actions

Create Estimate
```

---

# Result Hierarchy

Prioritize:

1. Exact matches
2. Recent items
3. Frequently accessed items
4. Related results

---

# Search Experience

Search should provide:

- immediate feedback
- keyboard navigation
- clear categories
- useful empty states

---

# Search Input

Search fields should:

- clearly indicate scope
- support shortcuts
- preserve user context

---

# Search Placeholder Examples

Good:

```
Search projects, customers, or actions...
```

Avoid:

```
Search...
```

when the scope is broad.

---

# Command Actions

Commands should represent meaningful workflows.

Examples:

```
Create Project

Create Estimate

Add Customer

Invite User

Open Reports
```

---

# Command Naming

Commands should use verbs.

Good:

```
Create Project
Export Estimate
Invite Team Member
```

Avoid:

```
Project Creation
Estimate Export Tool
```

---

# Command Categories

Commands may be grouped.

Example:

```
Actions

Create Project

Create Estimate


Navigation

Go to Customers

Go to Reports


Settings

Open Billing
```

---

# Keyboard Navigation

Command systems should support:

```
↑ ↓

Enter

Escape
```

---

# Keyboard Rules

Users should be able to:

- open command menu
- navigate results
- execute actions
- dismiss

without a mouse.

---

# Recent Actions

The command system may surface:

- recent pages
- recent searches
- recent actions

Example:

```
Recent

Kitchen Remodel

Estimate #1042
```

---

# Favorites

Future support may include:

- pinned actions
- favorite locations

---

# Permissions

Commands must respect permissions.

Example:

User without billing access:

```
Billing Settings
```

should not appear.

---

# AI Integration

BuildRail may extend commands with AI.

Examples:

```
Create estimate from notes

Summarize project history

Find overdue payments
```

---

# AI Command Rules

AI commands should:

- explain capabilities
- preserve user control
- show generated results before applying changes

---

# Search Empty States

When nothing is found:

Example:

```
No results found.

Try another search term.
```

---

# Search Errors

Example:

```
Search unavailable.

Try again.
```

---

# Mobile Behavior

Mobile search should be:

- easily accessible
- full-screen when necessary
- touch friendly

---

# Responsive Behavior

Desktop:

```
Global command shortcut
```

Tablet:

```
Search control
```

Mobile:

```
Dedicated search experience
```

---

# Accessibility Requirements

Search and command systems must:

- support keyboard navigation
- provide screen reader labels
- announce results appropriately
- maintain focus management

---

# Focus Behavior

When opened:

```
Focus → Search Input
```

When closed:

```
Focus → Previous Element
```

---

# Command Anti-Patterns

Avoid:

## Command Overload

Do not expose every possible action.

---

## Hidden Features Only Accessible Through Search

Important workflows need visible paths.

---

## Poor Results

A command menu is only useful if results are relevant.

---

## Ignoring Permissions

Never show unavailable actions.

---

## AI Without Context

AI commands must understand user intent.

---

# Implementation Rules

Search and Command should:

- consume design tokens
- support keyboard interaction
- integrate with routing
- respect permissions
- support global application context
- support future AI capabilities

---

# Component Structure Direction

Future implementation:

```
<CommandMenu>

  <CommandInput />

  <CommandGroups>

    <CommandItem />

  </CommandGroups>

</CommandMenu>
```

---

# Related Components

Works alongside:

```
Topbar

Sidebar

Navigation

Dialog

AI Assistant

Search Input
```

---

# Final Principle

The best interface is sometimes the one users do not have to navigate.

BuildRail should let professionals move by intention:

"I need this."

"I want to do that."

"Take me there."

The command layer turns BuildRail from a collection of tools into an operating system.
