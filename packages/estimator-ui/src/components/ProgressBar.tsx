"use client";

export interface ProgressBarProps {
  /** 0–1 fraction of steps completed */
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <div className="mb-8 select-none">
      {/* Step label + percentage */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-medium tabular-nums text-slate-400">{pct}%</span>
      </div>

      {/* Track */}
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        {/* Fill — hardware-accelerated via will-change, smooth 300ms ease */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-amber-400 transition-[width] duration-300 ease-in-out will-change-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots beneath the bar */}
      {totalSteps > 1 && (
        <div className="mt-3 flex items-center justify-between px-px">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const n = i + 1;
            const done = n < currentStep;
            const active = n === currentStep;
            return (
              <div
                key={n}
                className={[
                  "h-1.5 w-1.5 rounded-full transition-all duration-300 ease-in-out",
                  done
                    ? "bg-amber-400"
                    : active
                    ? "bg-amber-400 scale-[1.4] shadow-[0_0_0_3px_rgba(251,191,36,0.25)]"
                    : "bg-slate-300 dark:bg-slate-700",
                ].join(" ")}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
