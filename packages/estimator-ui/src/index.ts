// @buildrail/estimator-ui — public API surface
export type {
  StrategyOption,
  StepType,
  StepDependency,
  EstimationStep,
  AnswerValue,
  EstimatorAnswers,
  EstimateRange,
  UseEstimatorStateResult,
} from "./hooks/useEstimatorState";

export { useEstimatorState } from "./hooks/useEstimatorState";

// ─── UI components ────────────────────────────────────────────────────────────
export { Estimator } from "./components/Estimator";
export { StepRenderer } from "./components/StepRenderer";
export { ProgressBar } from "./components/ProgressBar";
export { LeadForm } from "./components/LeadForm";
export { PriceDisplay } from "./components/PriceDisplay";

export type { EstimatorProps } from "./components/Estimator";
export type { StepRendererProps } from "./components/StepRenderer";
export type { ProgressBarProps } from "./components/ProgressBar";
export type { LeadFormProps, LeadData } from "./components/LeadForm";
export type { PriceDisplayProps, PriceDisplaySize } from "./components/PriceDisplay";
