# BuildRail Design System

# Foundations — 10 Motion

Version: 1.0

Status: Approved

---

# Purpose

The BuildRail motion system defines how movement is used throughout the product ecosystem.

Motion helps users understand:

- what changed
- what appeared
- what disappeared
- what requires attention
- what is happening in the system

Motion is a communication tool.

It is not decoration.

---

# Motion Philosophy

BuildRail uses intentional, restrained motion.

The interface should feel:

- responsive
- confident
- smooth
- predictable

It should never feel:

- playful
- distracting
- theatrical
- slow

---

# Core Principle

## Motion Should Explain, Not Entertain

Every animation should answer:

> Does this help the user understand what happened?

If the answer is no, remove it.

---

# Motion Personality

BuildRail motion should feel like:

- a well-designed tool
- a precise instrument
- a professional workspace

Not:

- a marketing demo
- a game interface
- a consumer app

---

# The Purpose of Motion

Motion serves four primary purposes:

1. Feedback
2. Transition
3. Hierarchy
4. Progress

---

# 1. Feedback Motion

Used to communicate user actions.

Examples:

- button press
- saving state
- successful completion
- selection changes

Purpose:

Confirm that the system understood the user's action.

---

## Example

User clicks:

```
Save Estimate
```

The system responds:

```
Saving...

Saved
```

The transition communicates confidence.

---

# 2. Transition Motion

Used when content changes location or visibility.

Examples:

- menus opening
- panels expanding
- dialogs appearing

Purpose:

Help users understand relationships.

---

# 3. Hierarchy Motion

Used to communicate layers.

Examples:

- dropdown appearing above content
- modal entering focus
- contextual menus opening

Purpose:

Reinforce interface structure.

---

# 4. Progress Motion

Used to communicate ongoing work.

Examples:

- loading states
- uploads
- AI processing
- background tasks

Purpose:

Reduce uncertainty.

---

# Motion Timing

BuildRail uses short, purposeful durations.

Future implementation should define semantic timing tokens.

Example:

```
motion.instant

motion.fast

motion.normal

motion.slow
```

---

# Timing Guidelines

## Instant

Purpose:

Immediate feedback.

Examples:

- hover states
- focus states

Approximate:

```
100ms
```

---

## Fast

Purpose:

Small interface changes.

Examples:

- button interactions
- toggles
- menu opening

Approximate:

```
150ms
```

---

## Normal

Purpose:

Standard transitions.

Examples:

- panels
- dialogs
- content changes

Approximate:

```
200ms
```

---

## Slow

Purpose:

Rare meaningful transitions.

Examples:

- large layout changes
- onboarding moments

Approximate:

```
300ms
```

---

# Motion Speed Rules

Avoid:

- slow animations
- waiting for transitions
- dramatic reveals

The product should feel fast.

---

# Easing Philosophy

Motion should feel natural.

BuildRail prefers:

- smooth acceleration
- smooth deceleration
- predictable movement

Avoid:

- bouncing
- elastic effects
- exaggerated movement

---

# Hover States

Hover communicates interactivity.

Use subtle changes:

- color shift
- border change
- slight elevation change

Avoid:

- large movement
- scaling effects
- distracting animations

---

# Button Motion

Buttons should feel responsive.

Recommended:

- subtle color transition
- pressed feedback
- disabled clarity

Avoid:

- bouncing buttons
- glowing effects
- animated gradients

---

# Loading States

Loading communicates system activity.

Preferred:

- skeleton states
- progress indicators
- subtle spinners

---

# Skeleton Philosophy

Skeletons should:

- show structure
- reduce perceived waiting
- maintain layout stability

Avoid:

- overly animated placeholders
- distracting shimmer effects

---

# AI Motion

AI features require special restraint.

AI should feel like an assistant working in the background.

Avoid:

- magical effects
- glowing AI buttons
- animated robots
- unnecessary chat animations

---

# Good AI Feedback

```
Analyzing estimate...

Preparing recommendations...

Review complete.
```

---

# Poor AI Feedback

```
✨ AI Magic Happening ✨
```

---

# Page Transitions

Application navigation should feel immediate.

Avoid full-page cinematic transitions.

Professional users value speed.

---

# Dialog Motion

Dialogs should communicate focus.

Recommended:

- subtle appearance
- slight opacity change
- clear elevation

Avoid:

- dramatic entrances
- bouncing modals

---

# Data Updates

When information changes:

Use motion only when it improves understanding.

Examples:

Good:

A new row appears in a table.

Good:

A status changes from Pending → Complete.

Avoid:

Animating every data update.

---

# Accessibility and Motion

BuildRail respects user motion preferences.

The system must support:

```
prefers-reduced-motion
```

Users who reduce motion should receive:

- minimal transitions
- no unnecessary animations
- equivalent functionality

---

# Motion Anti-Patterns

Avoid:

## Decorative Animation

Animation with no purpose.

---

## Constant Movement

Dashboards should not feel alive for the sake of being alive.

---

## Excessive Microinteractions

Not every click needs animation.

---

## Slow Interfaces

Animation should never make software feel slower.

---

## Attention Competition

Important work should always remain the focus.

---

# Motion Implementation Rules

The motion system should:

- use semantic tokens
- support reduced motion
- integrate with CSS/Tailwind
- remain consistent across applications
- avoid component-specific animations

Components should consume motion tokens.

Components should not invent custom animations.

---

# Example Semantic Structure

Future implementation:

```
motion:

duration:
  instant
  fast
  normal
  slow

easing:
  standard
  entrance
  exit
```

---

# Final Principle

The best BuildRail motion is barely noticed.

Users should feel:

"The software responds instantly."

Not:

"The software has animations."

Motion should create confidence.

Never distraction.
