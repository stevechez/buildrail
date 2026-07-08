# BuildRail Design System

# Foundations — 06 Typography

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail typography system defines how written information is structured, prioritized, and communicated across every product experience.

Typography is not decoration.

Typography creates hierarchy.

It helps users understand:

- what matters
- what is actionable
- what requires attention
- what is supporting information

A strong typography system allows complex business information to remain clear and approachable.

---

# Typography Philosophy

BuildRail typography should feel:

- Professional
- Confident
- Calm
- Modern
- Highly readable

The interface should never feel:

- playful
- experimental
- flashy
- editorial
- overly corporate

Typography should support the work.

It should never become the work.

---

# Font System

BuildRail uses two primary typefaces.

---

# Product Typeface

## Manrope

Used throughout the application experience.

Manrope communicates:

- clarity
- precision
- modern professionalism
- approachability

Used for:

- dashboards
- navigation
- forms
- tables
- buttons
- settings
- application content

Manrope is the default BuildRail interface voice.

---

# Brand Typeface

## DM Serif Display

Used selectively for brand expression.

Used for:

- marketing pages
- landing pages
- major campaign moments
- editorial-style content

DM Serif Display communicates:

- craftsmanship
- confidence
- maturity
- distinction

---

# Usage Rule

DM Serif Display should create emotional impact.

Manrope should accomplish work.

Never use DM Serif Display for dense application interfaces.

---

# Typography Hierarchy

Typography communicates importance through:

1. Size
2. Weight
3. Spacing
4. Color
5. Position

Do not rely on font size alone.

---

# Type Scale

BuildRail uses a controlled type scale.

No arbitrary font sizes.

---

## Display

Large brand moments.

Used for:

- marketing heroes
- major announcements

Examples:

```
48px+
```

---

## Heading 1

Primary page titles.

Examples:

- Projects
- Estimates
- Customers

Purpose:

Establish page context.

---

## Heading 2

Major section titles.

Examples:

- Project Details
- Payment History

Purpose:

Organize content.

---

## Heading 3

Subsection titles.

Examples:

- Customer Information
- Team Members

Purpose:

Create grouping.

---

## Body Large

Important supporting text.

Examples:

- onboarding messages
- explanations

---

## Body Default

The primary reading size.

Used for:

- descriptions
- content
- general information

---

## Body Small

Supporting information.

Used for:

- metadata
- timestamps
- helper text

---

## Label

Used for:

- form labels
- navigation items
- table headers

---

## Caption

Used for:

- secondary metadata
- small supporting details

---

# Font Weights

BuildRail uses limited font weights.

Too many weights create visual noise.

---

## Regular — 400

Used for:

- body text
- descriptions
- supporting content

---

## Medium — 500

Used for:

- labels
- navigation
- subtle emphasis

---

## Semibold — 600

Used for:

- buttons
- headings
- important values

---

## Bold — 700

Used sparingly.

Used for:

- major emphasis
- important numbers
- marketing headlines

---

# Weight Rules

Avoid using bold simply to make content stand out.

First consider:

- spacing
- hierarchy
- placement
- structure

---

# Line Height

Readable text requires appropriate spacing.

---

## Headings

Tighter line height.

Purpose:

Create visual grouping.

---

## Body Text

Generous line height.

Purpose:

Improve readability.

---

## Dense Information

Tables and dashboards may use tighter spacing.

Purpose:

Support scanning.

---

# Text Alignment

Default:

Left aligned.

---

## Center Alignment

Use only for:

- marketing heroes
- empty states
- confirmation screens

---

## Right Alignment

Use for:

- numerical data
- financial values

---

# Application Typography Rules

## Page Titles

Every application page should have a clear title.

Example:

```
Projects

Manage active construction projects.
```

---

## Section Titles

Sections should clearly identify groups of information.

Example:

```
Customer Information
```

---

## Labels

Labels should describe the information being requested.

Good:

```
Project Name
```

Bad:

```
Input Field 1
```

---

## Helper Text

Helper text should explain.

Good:

```
Used for customer-facing proposals.
```

Bad:

```
Optional
```

---

# Dashboard Typography

Dashboards prioritize scanning.

Important information should be visible quickly.

Use:

- clear metric values
- concise labels
- supporting context

Avoid:

- oversized numbers everywhere
- excessive hierarchy
- competing headlines

---

# Data Typography

Business applications contain significant amounts of data.

Typography should support:

- scanning
- comparison
- grouping

---

## Tables

Use:

- readable row text
- clear column headers
- consistent alignment

---

## Numbers

Numerical data should be easy to compare.

Examples:

- revenue
- estimates
- percentages
- dates

Use consistent formatting.

---

# Button Typography

Buttons should communicate action.

Rules:

- use medium or semibold weight
- use clear verbs
- avoid unnecessary words

Good:

```
Create Estimate
Save Project
Send Invoice
```

Avoid:

```
Continue To The Next Step
```

---

# Typography and Accessibility

Typography must support accessibility.

Requirements:

- readable font sizes
- sufficient contrast
- appropriate line height
- no information communicated through size alone
- scalable text

---

# Responsive Typography

Typography should adapt across devices.

Mobile experiences should prioritize:

- readability
- touch interaction
- reduced visual density

Avoid simply shrinking desktop typography.

---

# Typography Anti-Patterns

Avoid:

## Too Many Sizes

Creates confusion.

---

## Excessive Bold

Makes everything feel equally important.

---

## Tiny Supporting Text

Makes information inaccessible.

---

## Decorative Typography

Reduces professionalism.

---

## All Caps Everywhere

Creates unnecessary visual aggression.

---

# Implementation Rules

The typography system should:

- define semantic text roles
- integrate with Tailwind
- use CSS variables/tokens
- support responsive scaling
- support dark mode
- maintain accessibility standards

Components should consume typography tokens rather than defining their own styles.

---

# Example Semantic Structure

Future implementation should follow this model:

```
typography:

display

heading:
  h1
  h2
  h3

body:
  large
  default
  small

label

caption
```

---

# Final Principle

Typography is the structure behind clarity.

BuildRail should never use text to impress users.

It should use typography to help users understand, decide, and act.

Clear information creates confident users.
