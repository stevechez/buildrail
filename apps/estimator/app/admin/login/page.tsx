"use client";

import { useActionState } from "react";
import { sendMagicLink } from "./actions";

const INITIAL = { error: null, sent: false };

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [state, action, pending] = useActionState(sendMagicLink, INITIAL);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--navy)] px-4">
      <div className="w-full max-w-sm">
        {/* Logo / wordmark */}
        <div className="mb-8 text-center">
          <span className="text-xl font-bold text-[var(--white)]">BuildRail</span>
          <span className="ml-1 text-xl font-bold text-[var(--amber)]">Admin</span>
          <p className="mt-2 text-sm text-[var(--slate)]">
            Enter your email to receive a magic sign-in link.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-[var(--navy-light)] p-8">
          {state.sent ? (
            /* ── Success state ──────────────────────────────── */
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--success)]/15">
                <svg className="h-6 w-6 text-[var(--success)]" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[var(--white)]">Check your email</h2>
              <p className="mt-2 text-sm text-[var(--slate)]">
                We sent a sign-in link. It expires in 10 minutes.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 text-xs text-[var(--slate)] underline-offset-2 hover:text-[var(--white)] hover:underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            /* ── Login form ─────────────────────────────────── */
            <form action={action} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--white-dim)]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className={[
                    "w-full rounded-xl border bg-white/[0.04] px-4 py-3",
                    "text-sm text-[var(--white)] placeholder:text-[var(--slate)]",
                    "transition-all duration-150",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--amber)]/50 focus:border-[var(--amber)]/60",
                    state.error
                      ? "border-[var(--danger)]/60"
                      : "border-white/[0.08] hover:border-white/[0.14]",
                  ].join(" ")}
                />
                {state.error && (
                  <p className="text-xs text-[var(--danger)]">{state.error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className={[
                  "w-full rounded-xl py-3 text-sm font-semibold",
                  "transition-all duration-150",
                  pending
                    ? "bg-[var(--amber)]/60 text-[var(--navy)] cursor-not-allowed"
                    : "bg-[var(--amber)] text-[var(--navy)] hover:bg-[var(--amber-light)] hover:-translate-y-px shadow-sm hover:shadow-md",
                ].join(" ")}
              >
                {pending ? "Sending…" : "Send magic link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
