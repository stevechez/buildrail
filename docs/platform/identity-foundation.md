# BuildRail Identity Foundation

## Purpose

The Identity Foundation is the first platform capability to be stabilized after the BuildRail monorepo foundation.

Its purpose is to establish the shared identity model that every BuildRail product will use.

This includes:

- user authentication
- organizations
- memberships
- roles
- permissions
- tenant isolation
- protected product access

Every future BuildRail product will depend on this foundation.

---

# Product Vision

BuildRail is not a collection of independent applications.

A contractor does not buy:

- SiteVerdict
- Estimator
- Vault
- Field

as unrelated tools.

A contractor creates a company account and gains access to a connected operating system.

Example:

```
BuildRail Account

Acme Roofing LLC

    Owner
       |
       +── SiteVerdict
       |
       +── Estimator
       |
       +── Vault
       |
       +── Field
```

---

# Gold Standard User Workflow

## Contractor Signup

A new contractor arrives at BuildRail.

Flow:

```
Visitor

   ↓

Create Account

   ↓

Verify Email

   ↓

Create Company Profile

   ↓

Organization Created

   ↓

User Assigned Owner Role

   ↓

Dashboard Loads

   ↓

Available Products Displayed
```

---

# Example

## Company

```
Organization

Name:
Smith Roofing LLC

Slug:
smith-roofing

Created:
2026-07-08
```

---

## User

```
User

Name:
John Smith

Email:
john@smithroofing.com
```

---

## Membership

```
Organization Member

User:
John Smith

Organization:
Smith Roofing LLC

Role:
Owner
```

---

# Data Ownership Model

All customer-owned data belongs to an organization.

Correct:

```
Organization

    |
    +── Projects
    |
    +── Estimates
    |
    +── Audits
    |
    +── Files
    |
    +── Leads
```

Incorrect:

```
User

    |
    +── Projects
```

Users belong to companies.

Companies own business data.

---

# Core Database Model

## organizations

Purpose:

Represents a contractor company.

Fields:

```
id
name
slug
created_at
updated_at
```

---

## profiles

Purpose:

Application user profile.

Fields:

```
id
email
full_name
avatar_url
created_at
```

---

## organization_members

Purpose:

Connects users to companies.

Fields:

```
id

organization_id

user_id

role

created_at
```

---

# Initial Roles

## Owner

Full company control.

Can:

- manage billing
- invite users
- manage permissions
- access all products

---

## Admin

Operational administrator.

Can:

- manage users
- manage settings
- access products

---

## Manager

Business operations role.

Can:

- manage projects
- view reports
- manage assigned workflows

---

## Member

Standard employee.

Can:

- perform assigned tasks
- access allowed products

---

## Viewer

Read-only access.

---

# Security Requirements

The identity foundation must enforce:

## Tenant Isolation

A user from one organization must never access another organization's data.

Every customer table must include:

```
organization_id
```

Example:

```
projects

id
organization_id
customer_name
status
```

---

# Supabase Requirements

Use:

- Supabase Auth
- PostgreSQL
- Row Level Security

Authentication answers:

"Who is this user?"

Organization membership answers:

"What company do they belong to?"

Roles answer:

"What are they allowed to do?"

---

# Application Integration

Future applications should not invent authentication.

They consume the platform identity layer.

Example:

SiteVerdict:

```
User logs in

        ↓

Identity verified

        ↓

Organization loaded

        ↓

User permissions checked

        ↓

Audit created
```

---

# Completion Criteria

Identity Foundation is complete when:

## Authentication

✅ User signup
✅ User login
✅ Session management

Deliberately **auth-method agnostic**, not "password reset" specifically.
BuildRail Auth (Supabase Auth under the hood) supports magic-link today
(`apps/app`'s login) and is structured so password, Google, Microsoft, etc.
can be added later without reworking the identity/organization model —
`@buildrail/auth`'s helpers (`requireCurrentProfile`, `requireUser`, ...)
never assume how the session was established, only that one exists.
Password reset (`requestPasswordReset`/`updatePassword` in
`@buildrail/auth`) is available for any product that adopts password auth,
but isn't required of the platform.

## One Primary Service

✅ A single hub app (`apps/app`) owns signup, login, organization creation,
and invite acceptance. Every other product (Field, Estimator, SiteVerdict,
Vault) redirects here instead of maintaining its own auth pages — see
`apps/field`'s `middleware.ts` and `lib/hub.ts` for the reference
integration.

✅ Shared session across products via `NEXT_PUBLIC_COOKIE_DOMAIN`
(`@buildrail/database`'s `resolveCookieDomain`) — a session started at the
hub is already valid on every product subdomain in production. Local dev
without a shared domain still works per-app (see stabilization-log.md for
the caveat).

## Organizations

✅ Create company
✅ Switch organization
✅ Invite members

## Permissions

✅ Role model implemented
✅ Protected routes
✅ Protected server actions

## Security

✅ RLS policies enabled
✅ Tenant isolation verified

## Developer Experience

✅ Shared authentication utilities
✅ Documentation complete
✅ New products can integrate without custom auth

---

# Engineering Principle

BuildRail applications should never ask:

"How do I authenticate this user?"

They should ask:

"What can this authenticated user do inside this organization?"
