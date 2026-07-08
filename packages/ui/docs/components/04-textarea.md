# BuildRail Design System

# Components — 04 Textarea

Version: 1.0

Status: Approved

---

# Purpose

The Textarea component provides a consistent way for users to enter multi-line information throughout the BuildRail ecosystem.

Textareas are used for:

- descriptions
- notes
- project scope
- customer communication
- explanations
- AI-assisted content generation

A textarea should make longer writing feel comfortable and structured.

---

# Textarea Philosophy

Textareas are not simply larger inputs.

They represent places where users provide context, explanation, and professional judgment.

The experience should feel:

- spacious
- focused
- forgiving
- intentional

---

# Core Principle

## Give Users Room To Explain.

Long-form fields should encourage useful information.

They should not feel like cramped database fields.

---

# Anatomy

A Textarea follows the Form Field structure:

```
FormField

├── Label
├── Description
├── Textarea
├── Character Guidance
└── Error Message
```

---

# Example

```
Project Scope

Describe the work included in this estimate.

[                                      ]
[                                      ]
[                                      ]

0 / 1000 characters
```

---

# Common Uses

## Project Scope

Used for:

- work descriptions
- customer-facing explanations
- estimate details

---

## Internal Notes

Used for:

- team communication
- project history
- operational context

---

## Customer Messages

Used for:

- emails
- updates
- explanations

---

## AI Instructions

Used for:

- generating content
- refining descriptions
- assisting workflows

---

# Textarea Size Variants

BuildRail supports three standard sizes.

---

# Compact

Used for:

- short notes
- table editing
- small comments

Example:

```
2 rows
```

---

# Default

Standard textarea.

Used for:

- descriptions
- project notes
- communication

Example:

```
4-6 rows
```

---

# Expanded

Used for:

- large content creation
- detailed scope writing

Example:

```
8+ rows
```

---

# Size Rules

Avoid excessive empty space.

The textarea should match the expected amount of content.

---

# Resizing Behavior

Textarea resizing should be controlled.

Preferred:

- vertical resizing when appropriate
- stable layout behavior

Avoid:

- uncontrolled resizing in structured forms

---

# Placeholder Text

Placeholder text should demonstrate expected input.

Example:

```
Example:
Remove existing flooring and install new hardwood throughout main level.
```

---

# Placeholder Rules

Never use placeholders as labels.

Never put critical instructions only in placeholders.

---

# Character Counts

Character counts are useful when limits exist.

Example:

```
342 / 1000 characters
```

---

# Character Count Rules

Display when:

- there is a meaningful limit
- users need awareness

Avoid showing counts unnecessarily.

---

# Textarea States

Every textarea must define:

1. Default
2. Hover
3. Focus
4. Filled
5. Disabled
6. Read-only
7. Error
8. Loading

---

# Default

Communicates:

"This field is ready for input."

---

# Focus

Focus state must be highly visible.

Users should always know where text entry is active.

---

# Filled

Existing text should remain readable.

Avoid reducing contrast.

---

# Disabled

Used when editing is unavailable.

Should communicate:

- unavailable
- intentional restriction

---

# Read-Only

Used for view-only content.

Example:

```
Generated Proposal Summary
```

---

# Error

Errors should explain recovery.

Example:

```
Scope description is required.

Add a brief description of the work included.
```

---

# Loading State

Used for:

- AI generation
- content processing
- saving

Example:

```
Generating scope description...
```

The textarea should remain stable.

---

# AI-Assisted Textareas

BuildRail will likely use AI-assisted writing workflows.

Examples:

- generate project scope
- improve customer messaging
- summarize field notes

AI actions should enhance the user's work.

They should not create uncertainty.

---

# AI Action Placement

Preferred:

```
Project Description

[Textarea]

Improve with AI
```

Avoid:

```
AI Writing Magic
```

---

# AI Content Rules

When AI modifies text:

Users should be able to:

- review changes
- edit output
- accept or reject suggestions

AI should never silently overwrite user content.

---

# Formatting Support

Textareas may support simple formatting when needed.

Examples:

- line breaks
- bullet points

Avoid introducing complex editors unless required.

---

# Markdown

Markdown support should only exist when users understand it.

Do not surprise users with hidden formatting rules.

---

# Mobile Behavior

Textareas must support field usage.

Requirements:

- comfortable touch target
- readable text size
- appropriate mobile keyboard behavior

---

# Accessibility Requirements

Textareas must:

- use semantic textarea elements
- have associated labels
- expose descriptions
- communicate errors
- support keyboard navigation
- maintain visible focus states

---

# Content Accessibility

Long-form writing should support:

- readable line length
- clear instructions
- understandable prompts

---

# Textarea Anti-Patterns

Avoid:

## Giant Empty Boxes

Large fields without purpose feel intimidating.

---

## Tiny Writing Areas

Users cannot comfortably provide context.

---

## Hidden Limits

Users should know constraints before failure.

---

## AI Replacement

AI should assist, not remove user control.

---

## Auto-Rewriting Without Approval

Users own their content.

---

# Implementation Rules

The Textarea component should:

- consume design tokens
- inherit Form Field behavior
- support validation
- support themes
- support character counting
- support AI enhancement patterns
- maintain accessibility requirements

---

# Component API Direction

Future implementation:

```
<Textarea />
```

Example:

```
<Textarea
  label="Project Scope"
  description="Describe the work included."
  maxLength={1000}
/>
```

With states:

```
error="Scope is required"

disabled

readOnly
```

---

# Future Extensions

Related components:

```
RichTextEditor

MarkdownEditor

AIWritingField

CommentBox
```

---

# Final Principle

Textareas are where expertise enters the system.

A great Textarea does not just collect words.

It gives professionals space to explain the work they understand.
