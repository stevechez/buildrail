# BuildRail Design System

# Components — 11 Avatar

Version: 1.0

Status: Approved

---

# Purpose

The Avatar component represents a person, team, company, or identity within the BuildRail ecosystem.

Avatars help users quickly understand:

- who created something
- who owns something
- who is responsible
- who is participating

Common uses:

- user profiles
- team members
- project ownership
- activity feeds
- comments
- assignments

---

# Avatar Philosophy

Avatars create human connection inside professional software.

They should feel:

- recognizable
- trustworthy
- consistent

They should not become decorative profile images.

---

# Core Principle

## Identity Should Be Clear Before It Is Decorative.

The purpose of an Avatar is recognition.

---

# Avatar Types

BuildRail supports:

1. User Avatar
2. Company Avatar
3. Initial Avatar
4. Group Avatar
5. AI/System Avatar

---

# User Avatar

Used for:

- employees
- contractors
- customers
- collaborators

Example:

```
[Photo]

Steve
```

---

# Company Avatar

Used for:

- organizations
- contractor companies
- partner accounts

Example:

```
[Logo]

ABC Construction
```

---

# Initial Avatar

Used when no image exists.

Example:

```
SM
```

Initials provide identity fallback.

---

# Initial Rules

Initials should:

- use first and last name when available
- remain consistent
- avoid excessive text

Examples:

```
John Smith

JS
```

---

# Group Avatar

Used for collections.

Examples:

```
[JS] [MK] [AR] +5
```

Common uses:

- project teams
- assigned crews
- collaborators

---

# AI/System Avatar

Used for system-generated actions.

Examples:

```
AI

BuildRail Assistant
```

AI identities should be clearly labeled.

---

# Avatar Sizes

BuildRail supports:

```
xs

sm

md

lg

xl
```

---

# Extra Small

Used for:

- dense tables
- metadata rows

Example:

```
20px
```

---

# Small

Used for:

- comments
- activity feeds

Example:

```
32px
```

---

# Medium

Default.

Used for:

- user lists
- assignments

Example:

```
40px
```

---

# Large

Used for:

- profiles
- account pages

Example:

```
64px
```

---

# Extra Large

Used for:

- onboarding
- profile headers

Example:

```
96px+
```

---

# Avatar Shapes

BuildRail uses:

## Circle

Default for people.

Example:

```
User photo
```

---

## Rounded Square

Used for:

- companies
- organizations
- applications

Example:

```
Company logo
```

---

# Avatar With Name

Avatars are often paired with identity text.

Example:

```
[Photo] Sarah Miller

Estimator
```

---

# Identity Hierarchy

When displaying users:

Preferred order:

```
Name

Role

Organization
```

Example:

```
Sarah Miller

Project Manager

ABC Construction
```

---

# Avatar + Badge

Used for status.

Example:

```
[Photo]

Sarah Miller

Online
```

---

# Avatar Status Indicators

Status indicators may show:

- online
- available
- inactive

Use sparingly.

Avoid constant presence indicators everywhere.

---

# Image Requirements

Avatar images should:

- maintain aspect ratio
- crop consistently
- remain recognizable

---

# Image Failure

If an image fails:

Fallback to:

1. initials
2. generated placeholder
3. default identity icon

Never show broken images.

---

# Privacy Considerations

Do not expose unnecessary personal information.

Avatars should support:

- permissions
- visibility rules
- organization boundaries

---

# Avatar Lists

For multiple users:

Use:

- consistent sizing
- predictable overlap
- clear counts

Example:

```
[JS][MK][AR] +7
```

---

# Mobile Behavior

Avatars should:

- remain recognizable
- avoid crowding layouts
- pair well with responsive text

---

# Accessibility Requirements

Avatars must:

- provide accessible names
- include alt text when meaningful
- avoid relying only on images

---

# Alt Text Rules

Informational image:

```
alt="Sarah Miller"
```

Decorative image:

```
alt=""
```

---

# Avatar Anti-Patterns

Avoid:

## Oversized Avatars Everywhere

They consume valuable space.

---

## Decorative Faces

Every avatar should have purpose.

---

## Missing Identity Labels

Images alone may not be enough.

---

## Tiny Unrecognizable Photos

Use appropriate sizing.

---

## Color-Coded People

Do not assign meaning based only on avatar colors.

---

# Implementation Rules

The Avatar component should:

- consume size tokens
- support image fallback
- support initials
- support accessibility
- support themes
- work with user identity systems

---

# Component API Direction

Future implementation:

```
<Avatar />

<Avatar
  src="/profile.jpg"
  alt="Sarah Miller"
/>
```

Fallback:

```
<AvatarFallback>
  SM
</AvatarFallback>
```

---

# Related Components

Avatar works alongside:

```
Badge

Card

Table

Comment

ActivityFeed

UserMenu
```

---

# Final Principle

Avatars represent the people behind the work.

BuildRail is professional software used by real teams doing real projects.

Identity should feel trustworthy, consistent, and human.
