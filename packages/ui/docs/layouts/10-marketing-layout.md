# BuildRail Design System

# Layouts — 10 Marketing Layout

Version: 1.0

Status: Approved

---

# Purpose

The Marketing Layout defines the structure for all public-facing BuildRail experiences.

Examples include:

- Product Landing Pages
- Marketing Website
- Pricing
- Features
- Documentation
- Blog
- Resource Center
- Waitlists
- Product Launches

The Marketing Layout should communicate the same professionalism and trust as the product itself.

---

# Marketing Philosophy

The marketing experience is the first interaction many users have with BuildRail.

It should feel like an extension of the application—not a separate brand.

Professional software deserves professional marketing.

---

# Core Principle

## Clarity Builds Trust.

Marketing pages should help visitors understand:

- what BuildRail does
- who it serves
- why it is valuable
- what to do next

Avoid distracting users with unnecessary visual effects.

---

# Relationship To The Design System

The Marketing Layout shares:

- typography
- colors
- spacing
- components
- iconography
- accessibility standards

with every authenticated BuildRail application.

The only difference is the content—not the design language.

---

# Marketing Anatomy

```
Marketing Layout

├── Site Header
│
├── Hero Section
│
├── Feature Sections
│
├── Social Proof
│
├── Call To Action
│
└── Site Footer
```

---

# Standard Page Structure

```
────────────────────────

Header

────────────────────────

Hero

────────────────────────

Features

────────────────────────

Benefits

────────────────────────

Testimonials

────────────────────────

Pricing (optional)

────────────────────────

FAQ (optional)

────────────────────────

CTA

────────────────────────

Footer
```

---

# Site Header

The header should remain lightweight.

Typical items:

```
Logo

Products

Pricing

Documentation

Sign In

Get Started
```

Avoid overwhelming visitors with navigation.

---

# Hero Section

The Hero should answer three questions immediately:

1. What is this?
2. Who is it for?
3. Why should I care?

Every hero should contain:

- headline
- supporting copy
- primary CTA
- optional secondary CTA
- optional product image

---

# Headlines

Headlines should communicate value.

Good:

```
Run Your Contracting Business With Confidence.
```

Avoid vague slogans.

Example:

```
The Future Of Construction.
```

---

# Supporting Copy

Supporting copy should explain outcomes rather than features.

Focus on benefits users can understand quickly.

---

# Calls To Action

Each page should have one primary action.

Examples:

```
Start Free

Book A Demo

View Pricing

Create Your First Project
```

Avoid competing primary CTAs.

---

# Feature Sections

Feature sections should explain how BuildRail solves problems.

Structure:

```
Headline

Description

Illustration

Benefits
```

Avoid listing every feature.

Group features into meaningful themes.

---

# Product Screenshots

Screenshots should:

- reflect the actual product
- remain current
- demonstrate real workflows

Avoid decorative mockups that misrepresent functionality.

---

# Social Proof

Examples:

- customer testimonials
- case studies
- usage metrics
- partner logos

Social proof should reinforce credibility without overwhelming the page.

---

# Pricing

Pricing pages should emphasize clarity.

Each tier should clearly communicate:

- intended audience
- included features
- limitations
- upgrade path

Avoid hidden pricing.

---

# FAQ

Frequently asked questions should address:

- onboarding
- billing
- security
- support
- product fit

Keep answers concise and practical.

---

# Footer

The footer provides supporting navigation.

Examples:

```
Products

Documentation

Pricing

Privacy

Terms

Support

Contact
```

Avoid duplicating the entire header navigation.

---

# Content Hierarchy

Present information in this order:

1. Problem
2. Solution
3. Benefits
4. Proof
5. Call to Action

Every section should move the visitor closer to understanding the product.

---

# Visual Style

Marketing pages should use:

- generous whitespace
- restrained color
- clear typography
- authentic imagery
- minimal illustration

Avoid:

- excessive gradients
- glassmorphism
- autoplay animations
- decorative motion
- visual clutter

---

# Motion

Motion should:

- support orientation
- reinforce hierarchy
- improve perceived performance

Avoid motion that distracts from reading.

---

# Responsive Behavior

## Desktop

Use comfortable reading widths and balanced layouts.

---

## Tablet

Reduce horizontal complexity.

---

## Mobile

Stack sections vertically.

Prioritize:

1. Headline
2. Value proposition
3. Primary CTA
4. Supporting content

Navigation should collapse into a mobile menu.

---

# Accessibility Requirements

Marketing pages must:

- maintain semantic headings
- provide sufficient color contrast
- support keyboard navigation
- include descriptive alt text
- avoid text embedded in images

Primary CTAs must remain accessible to assistive technologies.

---

# Marketing Layout Anti-Patterns

Avoid:

## Feature Overload

Explain outcomes before features.

---

## Multiple Competing CTAs

Every page should have one clear primary action.

---

## Stock SaaS Aesthetics

BuildRail values clarity over trendiness.

---

## Inconsistent Branding

Marketing and product should feel like one cohesive experience.

---

## Hidden Pricing

Be transparent whenever possible.

---

# Implementation Rules

Marketing Layouts should:

- consume design tokens
- share UI components with applications
- support responsive layouts
- prioritize performance
- integrate analytics without affecting usability

---

# Component Structure Direction

Future implementation:

```
<MarketingLayout>

  <SiteHeader />

  <HeroSection />

  <FeatureSection />

  <SocialProof />

  <PricingSection />

  <FAQSection />

  <CallToAction />

  <SiteFooter />

</MarketingLayout>
```

---

# Related Components

Works alongside:

```
Button

Card

Badge

Alert

Accordion

Navigation

Footer

Typography

Design Tokens
```

---

# Final Principle

The marketing experience is the beginning of the BuildRail journey.

Visitors should immediately recognize the same qualities they will experience inside the product:

Professional.

Calm.

Competent.

Consistent.

BuildRail should earn trust before a user creates an account—and reinforce that trust every time they return.
