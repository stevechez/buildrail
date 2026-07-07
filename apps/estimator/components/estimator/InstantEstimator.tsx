"use client";

import { useRef } from "react";
import {
  Estimator,
  type EstimatorAnswers,
  type EstimateRange,
  type LeadData,
} from "@buildrail/estimator-ui";

import { supabase } from "@/lib/supabase";
import { ESTIMATOR_STEPS } from "./steps.config";

export function InstantEstimator() {
  // Cache lead data so we can include it in the single DB write on completion.
  // onLeadCapture fires first; onComplete fires immediately after with the answers + estimate.
  const pendingLead = useRef<LeadData | null>(null);

  const handleLeadCapture = (data: LeadData) => {
    pendingLead.current = data;
  };

  const handleComplete = async (answers: EstimatorAnswers, estimate: EstimateRange) => {
    const lead = pendingLead.current;
    if (!lead) return; // should never happen if onLeadCapture is configured

    const remodel_rooms = Array.isArray(answers["remodel-scope"])
      ? (answers["remodel-scope"] as string[])
      : null;

    const { error } = await supabase.from("leads").insert({
      // Contact
      name:  lead.name,
      email: lead.email,
      phone: lead.phone || null,

      // Answers
      scope:         (answers.scope  as string) || null,
      size:          (answers.size   as string) || null,
      finish:        (answers.finish as string) || null,
      remodel_rooms,

      // Estimate
      estimate_min: estimate.min,
      estimate_max: estimate.max,
    });

    if (error) {
      // Non-blocking — the user already sees their estimate.
      // TODO: add error monitoring (e.g. Sentry) here.
      console.error("[InstantEstimator] Supabase insert failed:", error.message);
    } else {
      pendingLead.current = null;
    }
  };

  return (
    <Estimator
      steps={ESTIMATOR_STEPS}
      onLeadCapture={handleLeadCapture}
      onComplete={handleComplete}
      title="Get Your Instant Estimate"
      subtitle="Answer 3–4 quick questions and we'll give you a real cost range — no callback needed."
      className="mx-auto"
    />
  );
}
