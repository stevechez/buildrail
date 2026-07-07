"use client";

import { useRef } from "react";
import { Estimator, type LeadData, type EstimatorAnswers, type EstimateRange } from "@buildrail/estimator-ui";
import { supabase } from "@/lib/supabase";
import { ESTIMATOR_STEPS } from "./steps.config";

export function SitesEstimator() {
  const leadRef = useRef<LeadData | null>(null);

  const handleLeadCapture = (data: LeadData) => {
    leadRef.current = data;
  };

  const handleComplete = async (
    answers: EstimatorAnswers,
    estimate: EstimateRange
  ) => {
    const lead = leadRef.current;
    if (!lead || !supabase) return;

    const remodelRooms = Array.isArray(answers["remodel-scope"])
      ? (answers["remodel-scope"] as string[])
      : null;

    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      scope: (answers.scope as string) || null,
      size: (answers.size as string) || null,
      finish: (answers.finish as string) || null,
      remodel_rooms: remodelRooms,
      estimate_min: estimate.min,
      estimate_max: estimate.max,
      source: "buildrail-sites",
    });

    if (error) {
      console.error("[SitesEstimator] lead insert failed:", error.message);
    }
  };

  return (
    <Estimator
      steps={ESTIMATOR_STEPS}
      title="Get Your Free Project Estimate"
      subtitle="Answer 3–4 quick questions and see a realistic cost range in seconds."
      onLeadCapture={handleLeadCapture}
      onComplete={handleComplete}
    />
  );
}
