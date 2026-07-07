# 07-WORKFLOWS.md | AI Operational Blueprints & Quality Gates

## 1. Protocol for Feature Development

When assigned to build a new feature or sub-component, you must follow this exact sequence:

1. **Context Discovery:** Search the existing codebase first (`/components`, `/hooks`, `/app`) before writing new code. Check if a shadcn primitive or structural layout element can be repurposed.
2. **Dependency Check:** Do not install new npm packages arbitrarily. If a feature requires state management, date parsing, or animations, check `package.json` to see what is already available.
3. **Draft & Isolate:** Build using modular, cleanly typed TypeScript components. Ensure UI layout patterns do not duplicate logic found elsewhere in the ecosystem.
4. **Self-Audit:** Review the code against `04-DESIGN-SYSTEM.md` and `06-CODING-STANDARDS.md` before finalizing.
5. **Sync Docs:** If this feature alters an app's core capabilities or paths, update `08-PRODUCTS.md`.

---

## 2. Protocol for Bug Resolution

When troubleshooting an issue, do not blindly guess fixes or overwrite large swathes of functional code. Follow this debugging hierarchy:

1. **Isolate the Failure:** Determine if the issue lives in the UI presentation layer (Client Component), the data mutation layer (Server Action), or the database access layer (Supabase RLS/Edge Function).
2. **Trace the Types:** Ensure data structures passing between the database and the frontend match strict TypeScript interface contracts.
3. **Fix and Validate:** Apply the narrowest possible fix to solve the issue without breaking adjacent features or introducing regressions.
4. **Log Key Decisions:** If a bug reveals a critical flaw in architecture or stack behavior, log the resolution in `12-DECISIONS.md`.

---

## 3. The UI/UX Quality Gate (The Polish Pass)

Before rendering any frontend components or layouts completely finished, pass the UI through this mandatory evaluation matrix.

| Evaluation Metric     | Target Standard                                                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Visual Hierarchy**  | Headers are clean, sharp, and high-contrast. Layout reads easily from top-to-bottom.                                     |
| **Spacing & Density** | Linear-style precise density. Balanced breathing room without bloated gaps.                                              |
| **The Surface Rule**  | No flat, unpolished boxes. Use rich grays, thin borders (`border-white/5`), and subtle `backdrop-blur` gradients.        |
| **Motion & State**    | All interactive elements must have instantaneous hover and active transition states (`duration-150`).                    |
| **Responsiveness**    | Mobile-first execution. Component layouts must scale down smoothly for phone and tablet screens without broken elements. |
