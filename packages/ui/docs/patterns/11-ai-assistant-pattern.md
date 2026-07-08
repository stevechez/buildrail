# BuildRail Design System

# Patterns — 11 AI Assistant Pattern

Version: 1.0

Status: Approved

---

# Purpose

The AI Assistant pattern defines how artificial intelligence capabilities appear and behave throughout BuildRail products.

The goal is to create a consistent AI experience that feels:

- professional
- trustworthy
- useful
- controlled

---

# AI Philosophy

BuildRail AI is not a replacement for expertise.

It is a productivity partner.

AI should help professionals:

- think faster
- prepare faster
- communicate better
- reduce repetitive work

---

# Core Principle

## AI Should Assist The Workflow, Not Interrupt The Workflow.

AI belongs where work happens.

---

# AI Interaction Model

BuildRail AI follows:

```
Context

↓

Suggestion

↓

Review

↓

User Decision

↓

Action
```

---

# AI Should Not

AI should not:

- silently change data
- make irreversible decisions
- hide reasoning
- replace professional judgment

---

# AI Should

AI should:

- explain suggestions
- provide options
- save time
- maintain user control

---

# AI Entry Points

BuildRail AI may appear as:

1. Inline Assistant
2. AI Action Button
3. Command Actions
4. Side Panel Assistant
5. Generated Content Review

---

# 1. Inline Assistant

Used inside existing workflows.

Examples:

Estimate:

```
Scope Description

[Generate with AI]
```

---

Field:

```
Job Notes

[Summarize Notes]
```

---

# Inline AI Rules

AI actions should be:

- close to relevant content
- clearly labeled
- optional

---

# 2. AI Action Button

Used for focused generation.

Examples:

```
Generate Estimate Summary

Improve Description

Create Follow-Up Email
```

---

# AI Button Rules

AI actions should explain the outcome.

Avoid:

```
AI Magic
```

Prefer:

```
Generate Project Summary
```

---

# 3. Command AI

AI actions may be available through command.

Examples:

```
⌘ K

Summarize this project

Create customer update

Draft estimate notes
```

---

# 4. AI Side Panel

Used for broader assistance.

Example:

```
--------------------------------

BuildRail Assistant

How can I help?

[Ask about this project]

--------------------------------
```

---

# AI Context

AI should understand the current workspace.

Possible context:

- current project
- customer
- estimate
- documents
- activity history

---

# Context Rules

Always make context visible.

Example:

```
AI Assistant

Working with:

Kitchen Remodel Project
```

---

# AI Suggestions

Suggestions should be:

- editable
- reviewable
- optional

---

# Suggestion Pattern

Example:

```
Suggested Scope Description

"Remove existing tile..."

[Use Suggestion]

[Edit]

[Dismiss]
```

---

# Generated Content

AI-generated content is not final.

Users should review before applying.

---

# Review Pattern

Use:

```
Generate

↓

Preview

↓

Edit

↓

Apply
```

---

# AI Loading States

AI requires specific loading communication.

Avoid:

```
Thinking...
```

---

# Preferred:

```
Analyzing project details...

Preparing estimate suggestions...

Reviewing documents...
```

---

# AI Confidence

Where appropriate, communicate uncertainty.

Example:

```
Suggested based on available project information.
```

---

# AI Errors

AI failures should be understandable.

Avoid:

```
AI Error
```

Better:

```
We could not generate suggestions.

Try adding more project details.
```

---

# AI Permissions

AI access may depend on:

- organization settings
- subscription
- user role

---

# AI Data Transparency

Users should understand:

- what information is used
- what will be generated
- what will change

---

# AI Safety Rules

AI should never:

- send messages without approval
- change financial information without confirmation
- delete records
- make business decisions independently

---

# AI Confirmation

Require confirmation for:

- external communication
- financial actions
- destructive changes

Example:

```
Send customer update?

[Cancel]

[Send]
```

---

# AI Visual Language

AI should have a recognizable but restrained identity.

Use:

- subtle indicators
- consistent iconography
- calm presentation

---

# AI Icon Rules

Preferred:

```
Lucide Sparkles

Lucide Wand

Lucide Brain
```

Use carefully.

---

# Avoid

Do not:

- overuse sparkles everywhere
- make AI look magical
- create distracting effects

---

# AI and Brand Personality

BuildRail AI should feel:

Professional:

```
"Here is a suggested estimate summary."
```

Not:

```
"Wow! AI created something amazing!"
```

---

# AI History

For important AI interactions, preserve:

- generated content
- timestamps
- user decisions

---

# AI Undo

Whenever possible:

- allow rollback
- preserve originals

---

# Mobile AI Behavior

Mobile AI should:

- remain accessible
- avoid blocking workflow
- support voice/text input where appropriate

---

# Accessibility Requirements

AI experiences must:

- support keyboard navigation
- provide readable output
- announce status changes
- not rely only on animation

---

# AI Anti-Patterns

Avoid:

## Chatbot Everywhere

AI should not replace normal UI.

---

## AI For Simple Actions

Do not add AI where a button is enough.

---

## Hidden Automation

Users should know when AI is involved.

---

## Uneditable Output

Users own the final result.

---

## Overpromising

AI should be useful, not magical.

---

# Implementation Rules

AI components should:

- consume design tokens
- follow loading patterns
- support review workflows
- maintain user control
- integrate with existing components

---

# Component Structure Direction

Future implementation:

```
<AIAction />

<AIAssistantPanel />

<AIGenerationCard />

<AISuggestion />

<AIReview />
```

---

# Related Components

Works alongside:

```
CommandMenu

Button

Card

Dialog

LoadingState

Toast
```

---

# Final Principle

BuildRail AI should feel like a highly capable teammate.

It prepares.

It suggests.

It accelerates.

The professional remains in control.
