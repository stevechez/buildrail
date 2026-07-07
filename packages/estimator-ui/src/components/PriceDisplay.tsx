"use client";

import type { EstimateRange, EstimatorAnswers } from "../hooks/useEstimatorState";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PriceDisplaySize = "sm" | "md" | "lg";

export interface PriceDisplayProps {
  estimate: EstimateRange;
  /**
   * When provided, renders a labelled breakdown list of the answers
   * that contributed to the estimate (step label → selected value).
   */
  breakdown?: Record<string, string | string[]>;
  /**
   * Override the answers object directly if you have it from useEstimatorState.
   * Each key is a step ID; supply `breakdownLabels` to humanise the keys.
   */
  answers?: EstimatorAnswers;
  /** Human-readable labels keyed by step ID, used when `answers` is provided. */
  breakdownLabels?: Record<string, string>;
  /** Visual size of the price figures. Default: "md" */
  size?: PriceDisplaySize;
  /** Custom disclaimer shown beneath the range. Pass null to suppress. */
  disclaimer?: string | null;
  /** Extra classes merged onto the root element */
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const PRICE_SIZE: Record<PriceDisplaySize, string> = {
  sm: "text-2xl sm:text-3xl",
  md: "text-4xl sm:text-5xl",
  lg: "text-5xl sm:text-6xl",
};

const DEFAULT_DISCLAIMER =
  "Preliminary estimate only. Final pricing varies by site conditions, material selection, and local labor rates.";

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── PriceDisplay ─────────────────────────────────────────────────────────────

export function PriceDisplay({
  estimate,
  breakdown,
  answers,
  breakdownLabels,
  size = "md",
  disclaimer = DEFAULT_DISCLAIMER,
  className = "",
}: PriceDisplayProps) {
  // Build breakdown rows from whichever source was provided
  const rows: Array<{ label: string; value: string }> = [];

  if (breakdown) {
    for (const [label, value] of Object.entries(breakdown)) {
      rows.push({
        label,
        value: Array.isArray(value) ? value.join(", ") : value,
      });
    }
  } else if (answers && breakdownLabels) {
    for (const [stepId, label] of Object.entries(breakdownLabels)) {
      const val = answers[stepId];
      if (val === undefined || val === null || val === "") continue;
      rows.push({
        label,
        value: Array.isArray(val) ? val.join(", ") : String(val),
      });
    }
  }

  return (
    <div className={["w-full", className].join(" ")}>
      {/* ── Range box ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-amber-400/30 bg-amber-50 dark:bg-amber-400/[0.07] px-6 py-7 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Estimated project cost range
        </p>
        <p
          className={[
            "font-bold tracking-tight text-amber-600 dark:text-amber-300",
            PRICE_SIZE[size],
          ].join(" ")}
        >
          {formatCurrency(estimate.min)}
          <span className="mx-2 font-light opacity-50">–</span>
          {formatCurrency(estimate.max)}
        </p>

        {/* Midpoint callout */}
        <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
          Midpoint:{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {formatCurrency(Math.round((estimate.min + estimate.max) / 2))}
          </span>
        </p>
      </div>

      {/* ── Breakdown ──────────────────────────────────────────────────── */}
      {rows.length > 0 && (
        <ul className="mt-5 space-y-2">
          {rows.map(({ label, value }) => (
            <li
              key={label}
              className="flex items-start gap-2.5 text-sm"
            >
              <CheckIcon />
              <span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {label}:
                </span>{" "}
                <span className="text-slate-500 dark:text-slate-400">{value}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* ── Disclaimer ─────────────────────────────────────────────────── */}
      {disclaimer !== null && (
        <p className="mt-5 text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">
          {disclaimer}
        </p>
      )}
    </div>
  );
}
