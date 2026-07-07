"use client";

import type { EstimationStep, StrategyOption, AnswerValue } from "../hooks/useEstimatorState";

// ─── Shared style helpers ─────────────────────────────────────────────────────

const optionBase = [
  "w-full rounded-xl border p-4 text-left",
  "transition-all duration-150 ease-in-out",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
].join(" ");

const optionSelected =
  "border-amber-400 bg-amber-50 dark:bg-amber-400/[0.08] dark:border-amber-400/80";

const optionDefault = [
  "border-slate-200 dark:border-slate-700",
  "bg-white dark:bg-slate-800/50",
  "hover:border-amber-300 dark:hover:border-amber-400/40",
  "hover:bg-slate-50 dark:hover:bg-slate-800",
].join(" ");

// ─── Radio ────────────────────────────────────────────────────────────────────

function RadioOption({
  option,
  selected,
  onSelect,
}: {
  option: StrategyOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={[optionBase, selected ? optionSelected : optionDefault].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Radio ring */}
        <div
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
            "transition-all duration-150",
            selected
              ? "border-amber-400 bg-amber-400"
              : "border-slate-300 dark:border-slate-600",
          ].join(" ")}
        >
          {selected && (
            <div className="h-2 w-2 rounded-full bg-white dark:bg-slate-900" />
          )}
        </div>
        <span
          className={[
            "text-sm font-semibold",
            selected
              ? "text-slate-900 dark:text-white"
              : "text-slate-700 dark:text-slate-300",
          ].join(" ")}
        >
          {option.label}
        </span>
      </div>
    </button>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function CheckboxOption({
  option,
  checked,
  onToggle,
}: {
  option: StrategyOption;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={[optionBase, checked ? optionSelected : optionDefault].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox square */}
        <div
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2",
            "transition-all duration-150",
            checked
              ? "border-amber-400 bg-amber-400"
              : "border-slate-300 dark:border-slate-600",
          ].join(" ")}
        >
          {checked && (
            /* Inline SVG checkmark — zero icon-lib dependency */
            <svg
              className="h-3 w-3 text-white dark:text-slate-900"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span
          className={[
            "text-sm font-semibold",
            checked
              ? "text-slate-900 dark:text-white"
              : "text-slate-700 dark:text-slate-300",
          ].join(" ")}
        >
          {option.label}
        </span>
      </div>
    </button>
  );
}

// ─── Number ───────────────────────────────────────────────────────────────────

function NumberInput({
  step,
  value,
  onChange,
}: {
  step: EstimationStep;
  value: number | string | undefined;
  onChange: (val: number) => void;
}) {
  const unitHint = step.options[0]?.label ?? "";

  return (
    <div className="mt-2">
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="0"
          className={[
            "w-full rounded-xl border px-4 py-3 pr-16",
            "bg-white dark:bg-slate-800",
            "border-slate-200 dark:border-slate-700",
            "text-base font-medium text-slate-900 dark:text-white",
            "placeholder:text-slate-400",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400",
            // Strip browser arrows
            "[appearance:textfield]",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[&::-webkit-inner-spin-button]:appearance-none",
          ].join(" ")}
        />
        {unitHint && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
            {unitHint}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface StepRendererProps {
  step: EstimationStep;
  /** The current answer for this step, if any */
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
}

export function StepRenderer({ step, value, onChange }: StepRendererProps) {
  if (step.type === "radio") {
    const selected = typeof value === "string" ? value : undefined;
    return (
      <div className="mt-6 grid gap-2" role="radiogroup" aria-label={step.question}>
        {step.options.map((opt) => (
          <RadioOption
            key={opt.label}
            option={opt}
            selected={selected === opt.label}
            onSelect={() => onChange(opt.label)}
          />
        ))}
      </div>
    );
  }

  if (step.type === "checkbox") {
    const checked: string[] = Array.isArray(value) ? value : [];
    const toggle = (label: string) => {
      const next = checked.includes(label)
        ? checked.filter((v) => v !== label)
        : [...checked, label];
      onChange(next);
    };
    return (
      <div className="mt-6 grid gap-2" role="group" aria-label={step.question}>
        {step.options.map((opt) => (
          <CheckboxOption
            key={opt.label}
            option={opt}
            checked={checked.includes(opt.label)}
            onToggle={() => toggle(opt.label)}
          />
        ))}
      </div>
    );
  }

  // number
  return (
    <NumberInput
      step={step}
      value={value as number | string | undefined}
      onChange={(n) => onChange(n)}
    />
  );
}
