import type { EstimationStep } from "@buildrail/estimator-ui";

export const ESTIMATOR_STEPS: EstimationStep[] = [
  {
    id: "scope",
    question: "What type of project are you planning?",
    type: "radio",
    options: [
      { label: "Remodel",   baseCost: 35_000,  costMultiplier: 1.5  },
      { label: "Addition",  baseCost: 65_000,  costMultiplier: 1.45 },
      { label: "New Build", baseCost: 140_000, costMultiplier: 1.55 },
    ],
  },
  {
    id: "size",
    question: "Approximate square footage of the project?",
    type: "radio",
    options: [
      { label: "Under 1,000 sq ft",   baseCost: 10_000,  costMultiplier: 1.6  },
      { label: "1,000 – 2,500 sq ft", baseCost: 35_000,  costMultiplier: 1.55 },
      { label: "2,500 – 5,000 sq ft", baseCost: 75_000,  costMultiplier: 1.5  },
      { label: "5,000+ sq ft",        baseCost: 150_000, costMultiplier: 1.45 },
    ],
  },
  {
    id: "finish",
    question: "What finish level are you targeting?",
    type: "radio",
    options: [
      { label: "Standard",  baseCost: 5_000,  costMultiplier: 1.2  },
      { label: "Mid-grade", baseCost: 18_000, costMultiplier: 1.35 },
      { label: "Premium",   baseCost: 40_000, costMultiplier: 1.5  },
    ],
  },
  {
    id: "remodel-scope",
    question: "Which spaces are being renovated?",
    type: "checkbox",
    dependsOn: { stepId: "scope", value: "Remodel" },
    options: [
      { label: "Kitchen",      baseCost: 22_000, costMultiplier: 1.8  },
      { label: "Bathroom",     baseCost: 12_000, costMultiplier: 1.75 },
      { label: "Living areas", baseCost: 8_000,  costMultiplier: 1.5  },
      { label: "Bedrooms",     baseCost: 6_000,  costMultiplier: 1.4  },
    ],
  },
];
