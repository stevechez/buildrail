# 04-DESIGN-SYSTEM.md | Visual DNA & Interface Standards

## 1. The Design Philosophy
BuildRail products do not look like traditional, cluttered B2B contractor software. We build with premium, consumer-grade aesthetics. 
- **Core Aesthetic:** "Coastal Modern" meets high-end developer tool. Minimalist, clean, and incredibly precise.
- **Inspirations:** Apple product pages (polish/typography), Linear (spacing/dark mode execution), Stripe (clarity/interactive crispness).

## 2. Visual Rules
- **Theme:** Dark mode first. Deep, rich grays and slates rather than pure stark black (`#000000`), allowing for subtle depth layering.
- **Accents:** Coastal modern touches. Soft seafoam glass effects, muted ocean blues, or subtle weathered-wood-toned borders where appropriate for branding.
- **Surfaces:** Heavy use of subtle gradients, glassmorphism (`backdrop-blur`), and razor-thin borders (`border-white/5` or `border-slate-800`).
- **Spacing:** Rigid layout grids. Generous breathing room but tight component spacing (Linear-style density).

## 3. Typography & Micro-Interactions
- **Typography:** Clean, premium sans-serif headers with high, accessible contrast. Sharp font-weight hierarchies.
- **Interactions:** Ultra-fast transitions (`duration-150 ease-in-out`). Hover states should feel alive—subtle scale updates, border color shifts, or crisp glow effects.
