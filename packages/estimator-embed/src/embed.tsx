/**
 * BuildRail Instant Estimator — embeddable script
 *
 * Drop-in snippet (no credentials needed):
 *
 *   <div id="buildrail-estimator"></div>
 *   <script src="https://recover.buildrailhq.com/estimator.js"></script>
 *   <script>
 *     BuildRailEstimator.init({ target: '#buildrail-estimator', source: 'my-site' });
 *   </script>
 */

import "./embed.css";

import { useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Estimator,
  type EstimationStep,
  type EstimatorAnswers,
  type EstimateRange,
  type LeadData,
} from "@buildrail/estimator-ui";

import { DEFAULT_STEPS } from "./steps.config";

// ─── Public API ───────────────────────────────────────────────────────────────

const DEFAULT_API_URL = "https://recover.buildrailhq.com/api/leads";

export interface BuildRailEstimatorOptions {
  /** CSS selector string or DOM element to mount the widget into. */
  target: string | Element;

  /**
   * Slug written to the `source` column so you can tell which site sent the lead.
   * @example "acme-roofing-site"
   */
  source?: string;

  /**
   * Override the lead-capture endpoint.
   * Defaults to https://recover.buildrailhq.com/api/leads
   * — leave this out unless you're self-hosting.
   */
  apiUrl?: string;

  /** Override the default estimation steps. */
  steps?: EstimationStep[];

  /** Card heading. @default "Get Your Free Project Estimate" */
  title?: string;

  /** Card sub-heading. */
  subtitle?: string;

  /** Make the phone field required in the lead form. @default false */
  requirePhone?: boolean;
}

export interface BuildRailEstimatorInstance {
  unmount: () => void;
}

// ─── Inner component ─────────────────────────────────────────────────────────

function EmbedEstimator({ options }: { options: BuildRailEstimatorOptions }) {
  const leadRef = useRef<LeadData | null>(null);
  const apiUrl = options.apiUrl ?? DEFAULT_API_URL;

  const handleLeadCapture = (data: LeadData) => {
    leadRef.current = data;
  };

  const handleComplete = async (
    answers: EstimatorAnswers,
    estimate: EstimateRange
  ) => {
    const lead = leadRef.current;
    if (!lead) return;

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          scope: (answers.scope as string) || null,
          size: (answers.size as string) || null,
          finish: (answers.finish as string) || null,
          remodel_rooms: Array.isArray(answers["remodel-scope"])
            ? answers["remodel-scope"]
            : null,
          estimate_min: estimate.min,
          estimate_max: estimate.max,
          source: options.source ?? "embed",
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: res.statusText }));
        console.error("[BuildRailEstimator] lead save failed:", error);
      }
    } catch (err) {
      console.error("[BuildRailEstimator] network error:", err);
    }
  };

  return (
    <Estimator
      steps={options.steps ?? DEFAULT_STEPS}
      title={options.title ?? "Get Your Free Project Estimate"}
      subtitle={
        options.subtitle ??
        "Answer 3–4 quick questions and see a realistic cost range in seconds."
      }
      requirePhone={options.requirePhone}
      onLeadCapture={handleLeadCapture}
      onComplete={handleComplete}
    />
  );
}

// ─── init() ───────────────────────────────────────────────────────────────────

function init(options: BuildRailEstimatorOptions): BuildRailEstimatorInstance {
  const el =
    typeof options.target === "string"
      ? document.querySelector(options.target)
      : options.target;

  if (!el) {
    console.error(`[BuildRailEstimator] target not found: ${options.target}`);
    return { unmount: () => {} };
  }

  const root = createRoot(el as HTMLElement);
  root.render(<EmbedEstimator options={options} />);

  return { unmount: () => root.unmount() };
}

// ─── Expose global ────────────────────────────────────────────────────────────

if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).BuildRailEstimator = { init };
}
