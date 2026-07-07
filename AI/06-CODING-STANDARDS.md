# 06-CODING-STANDARDS.md | Engineering Handbook

## 1. The Power-Stack
- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui (Radix Primitives)
- **Database & Auth:** Supabase
- **State/Data Fetching:** Server Components first, client-side React hooks only when interaction or local state requires it.

## 2. Code Conventions
- **Language:** Strict TypeScript. No `any`. Define interfaces and types explicitly.
- **Exports:** Prefer named exports over default exports for cleaner refactoring and IDE auto-imports.
- **Composition:** Keep components modular and highly reusable. If a UI pattern repeats, extract it. Do not duplicate layout code.
- **Inline Styles:** Strictly forbidden. Use Tailwind utility classes exclusively.

## 3. Architecture Preferences
- **Data Fetching:** Fetch data directly in Server Components where possible to minimize client-side spinners.
- **Database Mutations:** Use Server Actions or structured Supabase Edge Functions. Maintain clean separation of concerns between presentation and data mutations.
