"use client";

import { useEffect, useState } from "react";

import {
  useEstimatorState,
  type EstimationStep,
  type EstimatorAnswers,
  type EstimateRange,
  type AnswerValue,
} from "../hooks/useEstimatorState";
import { LeadForm, type LeadData } from "./LeadForm";
import { ProgressBar } from "./ProgressBar";
import { StepRenderer } from "./StepRenderer";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function canProceed(step: EstimationStep | null, value: AnswerValue | undefined): boolean {
  if (!step) return false;
  if (step.type === "radio") return typeof value === "string" && value.length > 0;
  if (step.type === "checkbox") return Array.isArray(value) && value.length > 0;
  if (step.type === "number") {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) && n > 0;
  }
  return false;
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface EstimatorProps {
  steps: EstimationStep[];
  /**
   * When provided, a lead capture form is shown between the last estimation
   * step and the reveal screen. Receives the submitted contact details.
   */
  onLeadCapture?: (data: LeadData) => void;
  /** Make phone number required on the lead form. Default: false */
  requirePhone?: boolean;
  /**
   * Fires once the full flow is complete — after lead capture (if enabled)
   * or immediately after the last step if no lead gate is configured.
   */
  onComplete?: (answers: EstimatorAnswers, estimate: EstimateRange) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Estimator({
  steps,
  onLeadCapture,
  requirePhone = false,
  onComplete,
  title = "Get Your Instant Estimate",
  subtitle = "Answer a few quick questions to see your project cost range.",
  className = "",
}: EstimatorProps) {
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    answers,
    isCompleted,
    progress,
    canGoBack,
    estimate,
    setAnswer,
    goNext,
    goBack,
    reset,
  } = useEstimatorState(steps);

  // Whether the user has submitted the lead form (only relevant when onLeadCapture is set)
  const [leadCaptured, setLeadCaptured] = useState(false);

  // The three mutually exclusive screen states
  const showSteps = !isCompleted;
  const showLeadGate = isCompleted && !!onLeadCapture && !leadCaptured;
  const showReveal = isCompleted && (!onLeadCapture || leadCaptured);

  // Clear lead state whenever the flow is reset
  useEffect(() => {
    if (!isCompleted) setLeadCaptured(false);
  }, [isCompleted]);

  // Fire onComplete once the full flow is done
  useEffect(() => {
    if (showReveal) {
      onComplete?.(answers, estimate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReveal]);

  const handleLeadSubmit = (data: LeadData) => {
    onLeadCapture?.(data);
    setLeadCaptured(true);
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const currentValue = currentStep ? answers[currentStep.id] : undefined;
  const proceed = canProceed(currentStep, currentValue);
  const isLastStep = currentStepIndex === totalSteps - 1;

  const btnGhost = [
    "inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5",
    "text-sm font-medium",
    "border border-slate-200 dark:border-slate-700",
    "text-slate-600 dark:text-slate-300",
    "hover:border-amber-400/50 hover:text-slate-900 dark:hover:text-white",
    "transition-all duration-150 ease-in-out",
  ].join(" ");

  const btnPrimary = [
    "inline-flex items-center gap-1.5 rounded-xl px-6 py-2.5",
    "text-sm font-semibold transition-all duration-150 ease-in-out",
    proceed
      ? "bg-amber-400 text-slate-900 hover:bg-amber-500 hover:-translate-y-px active:translate-y-0 shadow-sm hover:shadow-md"
      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed",
  ].join(" ");

  // ── Card ───────────────────────────────────────────────────────────────────
  return (
    <div
      className={[
        "w-full max-w-lg rounded-2xl border p-8",
        "bg-white dark:bg-slate-900",
        "border-slate-200 dark:border-slate-800",
        "shadow-xl dark:shadow-2xl",
        className,
      ].join(" ")}
    >
      {/* ── Reveal ──────────────────────────────────────────────────────── */}
      {showReveal && (
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <IconCheck />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Your Estimate Range
          </h2>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Based on your answers — here's what this project is likely to cost.
          </p>

          <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-50 dark:bg-amber-400/[0.07] px-6 py-7">
            <p className="text-4xl font-bold tracking-tight text-amber-600 dark:text-amber-300 sm:text-5xl">
              {formatCurrency(estimate.min)}
              <span className="mx-2 font-light opacity-50">–</span>
              {formatCurrency(estimate.max)}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Estimated project cost range
            </p>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-400 dark:text-slate-500">
            Preliminary estimate. Final pricing varies by site conditions, materials, and local labor rates.
          </p>

          <button type="button" onClick={reset} className={[btnGhost, "mt-6"].join(" ")}>
            <IconRefresh />
            Start Over
          </button>
        </div>
      )}

      {/* ── Lead capture gate ────────────────────────────────────────────── */}
      {showLeadGate && (
        <LeadForm
          onSubmit={handleLeadSubmit}
          onBack={goBack}
          requirePhone={requirePhone}
        />
      )}

      {/* ── Estimation steps ─────────────────────────────────────────────── */}
      {showSteps && (
        <>
          {currentStepIndex === 0 && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
            </div>
          )}

          <ProgressBar
            progress={progress}
            currentStep={currentStepIndex + 1}
            totalSteps={totalSteps}
          />

          {(estimate.min > 0 || estimate.max > 0) && (
            <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Running estimate
              </span>
              <span className="text-sm font-bold tabular-nums text-amber-600 dark:text-amber-400">
                {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
              </span>
            </div>
          )}

          {currentStep && (
            <div>
              <h2 className="text-xl font-semibold leading-snug text-slate-900 dark:text-white">
                {currentStep.question}
              </h2>
              <StepRenderer
                step={currentStep}
                value={currentValue}
                onChange={(val) => setAnswer(currentStep.id, val)}
              />
            </div>
          )}

          <div className={["mt-8 flex items-center", canGoBack ? "justify-between" : "justify-end"].join(" ")}>
            {canGoBack && (
              <button type="button" onClick={goBack} className={btnGhost}>
                <IconArrowLeft />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={proceed ? goNext : undefined}
              disabled={!proceed}
              aria-disabled={!proceed}
              className={btnPrimary}
            >
              {isLastStep && onLeadCapture ? "Continue" : isLastStep ? "See My Estimate" : "Next"}
              <IconArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
