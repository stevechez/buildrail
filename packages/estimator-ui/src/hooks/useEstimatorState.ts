"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * A single selectable cost driver within a step. `baseCost` is the flat
 * cost contribution if this option is selected; `costMultiplier` scales
 * that contribution to produce the high end of the estimate range.
 */
export interface StrategyOption {
  label: string;
  baseCost: number;
  costMultiplier: number;
}

export type StepType = "radio" | "checkbox" | "number";

/**
 * Basic conditional branching: a step is only shown if the answer
 * recorded for `stepId` matches (or, for checkbox answers, includes)
 * `value`.
 */
export interface StepDependency {
  stepId: string;
  value: string;
}

export interface EstimationStep {
  id: string;
  question: string;
  type: StepType;
  options: StrategyOption[];
  dependsOn?: StepDependency;
}

export type AnswerValue = string | number | string[];

export type EstimatorAnswers = Record<string, AnswerValue>;

export interface EstimateRange {
  min: number;
  max: number;
}

export interface UseEstimatorStateResult {
  /** All steps whose `dependsOn` condition (if any) is currently satisfied. */
  visibleSteps: EstimationStep[];
  /** The step currently being shown, or null once the flow is complete. */
  currentStep: EstimationStep | null;
  currentStepIndex: number;
  totalSteps: number;
  answers: EstimatorAnswers;
  isCompleted: boolean;
  /** 0-1 fraction of visible steps completed, for progress bars. */
  progress: number;
  canGoBack: boolean;
  estimate: EstimateRange;
  setAnswer: (stepId: string, value: AnswerValue) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
}

function dependencyIsSatisfied(
  step: EstimationStep,
  answers: EstimatorAnswers
): boolean {
  if (!step.dependsOn) return true;

  const { stepId, value } = step.dependsOn;
  const recorded = answers[stepId];

  if (recorded === undefined) return false;
  if (Array.isArray(recorded)) return recorded.includes(value);
  return String(recorded) === value;
}

function getVisibleSteps(
  steps: EstimationStep[],
  answers: EstimatorAnswers
): EstimationStep[] {
  return steps.filter((step) => dependencyIsSatisfied(step, answers));
}

/**
 * Computes a deterministic [min, max] estimate by walking every answered,
 * currently-visible step and summing each matched option's `baseCost`
 * (floor) and `baseCost * costMultiplier` (ceiling). For `number` steps,
 * the first option is treated as a per-unit rate and the answer as the
 * quantity.
 */
function calculateEstimate(
  steps: EstimationStep[],
  answers: EstimatorAnswers
): EstimateRange {
  let min = 0;
  let max = 0;

  for (const step of steps) {
    const answer = answers[step.id];
    if (answer === undefined || answer === null || answer === "") continue;

    if (step.type === "radio") {
      const option = step.options.find((opt) => opt.label === answer);
      if (option) {
        min += option.baseCost;
        max += option.baseCost * option.costMultiplier;
      }
    } else if (step.type === "checkbox") {
      const selected = Array.isArray(answer) ? answer : [answer];
      for (const label of selected) {
        const option = step.options.find((opt) => opt.label === label);
        if (option) {
          min += option.baseCost;
          max += option.baseCost * option.costMultiplier;
        }
      }
    } else if (step.type === "number") {
      const quantity = typeof answer === "number" ? answer : Number(answer);
      const rate = step.options[0];
      if (rate && Number.isFinite(quantity) && quantity > 0) {
        min += rate.baseCost * quantity;
        max += rate.baseCost * rate.costMultiplier * quantity;
      }
    }
  }

  return {
    min: Math.round(min),
    max: Math.round(Math.max(max, min)),
  };
}

export function useEstimatorState(
  steps: EstimationStep[]
): UseEstimatorStateResult {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<EstimatorAnswers>({});

  const visibleSteps = useMemo(
    () => getVisibleSteps(steps, answers),
    [steps, answers]
  );

  // Clamp in case branching removed steps and pushed the index out of range.
  const safeIndex = Math.min(currentStepIndex, visibleSteps.length);
  const isCompleted = visibleSteps.length > 0 && safeIndex >= visibleSteps.length;
  const currentStep = isCompleted ? null : visibleSteps[safeIndex] ?? null;

  const progress =
    visibleSteps.length === 0 ? 0 : Math.min(safeIndex / visibleSteps.length, 1);

  const setAnswer = useCallback((stepId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, visibleSteps.length));
  }, [visibleSteps.length]);

  const goBack = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setCurrentStepIndex(0);
  }, []);

  const estimate = useMemo(
    () => calculateEstimate(visibleSteps, answers),
    [visibleSteps, answers]
  );

  return {
    visibleSteps,
    currentStep,
    currentStepIndex: safeIndex,
    totalSteps: visibleSteps.length,
    answers,
    isCompleted,
    progress,
    canGoBack: safeIndex > 0,
    estimate,
    setAnswer,
    goNext,
    goBack,
    reset,
  };
}
