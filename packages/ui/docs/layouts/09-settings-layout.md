# BuildRail Design System

# Layouts — 09 Settings Layout

Version: 1.0

Status: Approved

---

# Purpose

The Settings Layout defines how BuildRail organizes application, organization, and user configuration.

Every settings experience should feel familiar regardless of the product.

Examples include:

- User Profile
- Organization Settings
- Team Members
- Billing
- Notifications
- API Keys
- Security
- Integrations
- Preferences

---

# Settings Philosophy

Settings should support configuration without interrupting productivity.

Users should always understand:

- what they are changing
- why it matters
- who it affects
- whether the change can be reversed

Settings are not part of the primary workflow.

They should feel calm, organized, and dependable.

---

# Core Principle

## Configuration Should Be Predictable And Safe.

Users should never feel uncertain about the impact of changing a setting.

---

# Relationship To Workspace

The Settings Layout is a specialized Workspace Layout.

```
App Shell

↓

Workspace

↓

Settings Layout
```

---

# Settings Anatomy

```
Settings Layout

├── Page Header
│
├── Settings Navigation
│
├── Settings Content
│
├── Section Actions
│
└── Save Bar (optional)
```

---

# Standard Layout

```
────────────────────────────────────

Page Header

────────────────────────────────────

Sidebar Navigation

│

│   Settings Content

│

────────────────────────────────────
```

---

# Settings Navigation

Settings should be grouped into logical categories.

Example:

```
Profile

Organization

Team

Notifications

Security

Billing

API

Integrations

Advanced
```

Navigation should remain stable across products whenever possible.

---

# Section Organization

Each page should focus on one topic.

Good:

```
Notification Preferences
```

Poor:

```
Notifications
Billing
Profile
Security
```

Avoid mixing unrelated configuration.

---

# Section Structure

Each section should include:

- title
- optional description
- configuration controls
- optional save action

Example:

```
Email Notifications

Choose which notifications you would like to receive.
```

---

# Descriptions

Provide context for settings that are not immediately obvious.

Keep descriptions concise.

Explain purpose—not implementation.

---

# Save Behavior

Use one of two patterns:

## Immediate Save

Changes apply automatically.

Provide confirmation.

Example:

```
Notification preferences updated.
```

---

## Explicit Save

Changes remain pending until the user selects:

```
Save Changes
```

Use this approach for:

- organization settings
- security
- billing
- complex forms

Avoid mixing save behaviors on the same page.

---

# Destructive Settings

Require confirmation before destructive actions.

Examples:

```
Delete Organization

Archive Workspace

Remove Integration
```

Use clear confirmation dialogs.

Explain the consequences.

---

# Permissions

Only display settings users have permission to manage.

Avoid showing disabled controls for inaccessible features unless they clearly communicate why access is restricted.

---

# Organization Context

Clearly identify the active organization.

Example:

```
Settings

Acme Construction
```

This is especially important for users who belong to multiple organizations.

---

# Team Management

Team settings should support:

- invitations
- roles
- permissions
- removal

Always distinguish between:

```
Owner

Administrator

Manager

Member
```

---

# Billing

Billing pages should prioritize clarity.

Display:

- current plan
- renewal date
- payment method
- invoices

Primary billing actions should be easy to locate.

---

# Security

Security settings should emphasize trust.

Examples:

- passwordless sign-in
- MFA
- active sessions
- recovery methods

Never expose sensitive information unnecessarily.

---

# API & Integrations

Developer-oriented settings should remain isolated from general configuration.

Examples:

```
API Keys

Webhooks

Integrations
```

Treat credentials as sensitive information.

---

# Search

Large settings areas may provide search.

Users should be able to quickly locate:

- notification preferences
- billing
- security
- integrations

---

# Empty States

If a configurable resource does not exist:

Example:

```
No API Keys

Create your first API key to begin integrating BuildRail.

[Create API Key]
```

---

# Loading Behavior

Preserve page structure.

Load only the settings content.

Navigation should remain available.

---

# Error Behavior

Errors should remain localized.

Example:

```
Unable to update notification preferences.

[Retry]
```

Avoid blocking unrelated settings.

---

# Responsive Behavior

## Desktop

Sidebar navigation with content panel.

---

## Tablet

Sidebar may collapse into a menu.

---

## Mobile

Navigation becomes a list or drawer.

Each settings page should remain focused on a single topic.

---

# Accessibility Requirements

Settings pages must:

- maintain heading hierarchy
- expose labels and descriptions
- support keyboard navigation
- communicate validation and save status
- provide sufficient contrast

---

# Settings Layout Anti-Patterns

Avoid:

## Giant Settings Pages

Break configuration into logical sections.

---

## Hidden Save Behavior

Users should always know when changes are applied.

---

## Unclear Consequences

Explain destructive actions before they occur.

---

## Inconsistent Navigation

Settings should be organized consistently across products.

---

## Mixing Operational Workflows

Settings are for configuration—not day-to-day work.

---

# Implementation Rules

Settings Layouts should:

- consume design tokens
- inherit Workspace Layout
- support role-based permissions
- support immediate or explicit save patterns
- support responsive navigation
- integrate confirmation dialogs where appropriate

---

# Component Structure Direction

Future implementation:

```
<SettingsLayout>

  <PageHeader />

  <SettingsNavigation />

  <SettingsContent>

    {children}

  </SettingsContent>

  <SaveBar />

</SettingsLayout>
```

---

# Related Components

Works alongside:

```
Workspace

PageHeader

FormLayout

FormField

Dialog

Alert

Toast

Tabs

Sidebar
```

---

# Final Principle

Settings should inspire confidence.

Users should feel comfortable configuring their account, organization, and applications without worrying about unintended consequences.

Every BuildRail settings page should be organized, predictable, and transparent, allowing professionals to configure their software with the same confidence they bring to managing their business.
