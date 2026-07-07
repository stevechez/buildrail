export type ExamplePack = {
  industry: string;
  location: string;
  jobType: string;
  sourceNote: string;
  googlePost: string;
  facebookPost: string;
  instagramCaption: string;
  reelScript: string;
  faq: {
    question: string;
    answer: string;
  };
  headlines: string[];
};

export const examplePacks: ExamplePack[] = [
  {
    industry: "Garage Door Repair",
    location: "Aptos, CA",
    jobType: "Broken spring replacement",
    sourceNote:
      "Customer called because their garage door was stuck halfway open before work. We replaced the broken spring, balanced the door, tested the opener, and completed the repair the same day.",
    googlePost:
      "Same-day garage door spring replacement completed in Aptos. The homeowner’s door was stuck halfway open, which can quickly become a security issue and a major schedule problem. We replaced the broken spring, balanced the door, tested the opener, and had everything moving smoothly again before the day was over.",
    facebookPost:
      "A stuck garage door can throw off the whole morning. This Aptos homeowner called because their door was stuck halfway open before work. We replaced the broken spring, balanced the door, tested the opener, and got everything working smoothly again the same day.",
    instagramCaption:
      "Same-day garage door spring replacement in Aptos. The door was stuck halfway open, the spring had failed, and the homeowner needed it fixed fast. We replaced the spring, balanced the door, tested the opener, and got it moving smoothly again.",
    reelScript:
      "Hook: Garage door stuck halfway open? That is more than an inconvenience. Scene 1: Show the stuck door. Scene 2: Show the broken spring. Scene 3: Show the repaired door moving smoothly. Voiceover: This Aptos homeowner needed same-day help. We replaced the spring, balanced the door, and tested the opener before wrapping up.",
    faq: {
      question: "Can a broken garage door spring be replaced the same day?",
      answer:
        "In many cases, yes. If the correct spring is available and there is no major damage to the door or opener, a broken spring can often be replaced the same day.",
    },
    headlines: [
      "Garage Door Stuck Halfway Open in Aptos",
      "Same-Day Garage Door Spring Replacement",
      "From Stuck Door to Smooth Operation",
    ],
  },
  {
    industry: "Bathroom Remodeling",
    location: "Santa Cruz, CA",
    jobType: "Coastal bathroom upgrade",
    sourceNote:
      "Small bathroom remodel with new tile, updated vanity, brighter lighting, and a cleaner coastal look. The client wanted the room to feel calmer, brighter, and easier to maintain.",
    googlePost:
      "Bathroom remodel completed in Santa Cruz with a brighter coastal feel. This small space was updated with new tile, improved lighting, a clean vanity, and finishes that make the room feel calmer and easier to maintain.",
    facebookPost:
      "Small bathrooms can still feel open, calm, and polished. This Santa Cruz bathroom remodel focused on brighter surfaces, cleaner lines, improved lighting, and practical finishes that make everyday use easier.",
    instagramCaption:
      "A small Santa Cruz bathroom with a calmer coastal feel. New tile, better lighting, clean finishes, and a layout that makes the room feel brighter and more usable.",
    reelScript:
      "Hook: Small bathroom, big difference. Scene 1: Before shot of the older bathroom. Scene 2: Tile and vanity details. Scene 3: Finished reveal. Voiceover: This Santa Cruz remodel was all about making a small bathroom feel brighter, calmer, and easier to use every day.",
    faq: {
      question: "Can a small bathroom still feel spacious after a remodel?",
      answer:
        "Yes. Better lighting, lighter surfaces, clean lines, smart storage, and properly scaled fixtures can make a small bathroom feel much more open and comfortable.",
    },
    headlines: [
      "Small Bathroom, Big Coastal Upgrade",
      "Santa Cruz Bathroom Remodel with a Cleaner Feel",
      "A Brighter Bathroom Built for Everyday Use",
    ],
  },
  {
    industry: "Painting Contractor",
    location: "Capitola, CA",
    jobType: "Exterior repaint",
    sourceNote:
      "Exterior repaint on a coastal home. The old paint was faded from sun and salt air. We prepped the surface, repaired small problem areas, primed where needed, and applied a clean updated color.",
    googlePost:
      "Exterior repaint completed in Capitola. Coastal homes take a beating from sun, moisture, and salt air, so proper prep matters. This project included surface prep, small repairs, primer where needed, and a clean updated finish.",
    facebookPost:
      "Fresh paint does more than change the color. For this Capitola home, the old exterior was faded from coastal weather. After prep, repairs, primer, and a new finish, the home looks cleaner and better protected.",
    instagramCaption:
      "Coastal exterior repaint in Capitola. Faded paint, weathered surfaces, and a home ready for a cleaner look. Prep, repair, prime, paint, and protect.",
    reelScript:
      "Hook: Coastal weather is hard on exterior paint. Scene 1: Show faded paint. Scene 2: Show prep and repair. Scene 3: Show finished exterior. Voiceover: This Capitola home needed more than a color refresh. We prepped the surface, handled problem areas, and applied a clean protective finish.",
    faq: {
      question: "Why does exterior paint fade faster near the coast?",
      answer:
        "Sun, moisture, salt air, and wind exposure can wear down exterior paint faster in coastal areas. Good prep and quality materials help the finish last longer.",
    },
    headlines: [
      "Capitola Exterior Repaint Built for Coastal Weather",
      "Fresh Paint, Better Protection",
      "A Cleaner Exterior Finish for a Coastal Home",
    ],
  },
  {
    industry: "Plumbing",
    location: "Scotts Valley, CA",
    jobType: "Water heater replacement",
    sourceNote:
      "Homeowner had inconsistent hot water and an aging water heater. We removed the old unit, installed a new efficient model, checked connections, tested temperature, and cleaned up the area.",
    googlePost:
      "Water heater replacement completed in Scotts Valley. The homeowner was dealing with inconsistent hot water and an aging unit. We removed the old water heater, installed a new efficient model, checked the connections, tested the temperature, and left the area clean.",
    facebookPost:
      "Inconsistent hot water is usually a sign that something needs attention. This Scotts Valley homeowner had an aging water heater that was no longer keeping up. We replaced it, tested everything, and got reliable hot water restored.",
    instagramCaption:
      "Reliable hot water restored in Scotts Valley. Old unit out, new efficient water heater in, connections checked, temperature tested, and the space cleaned up.",
    reelScript:
      "Hook: Hot water going cold too fast? Scene 1: Show old water heater. Scene 2: Show replacement in progress. Scene 3: Show new unit installed. Voiceover: This Scotts Valley homeowner was dealing with inconsistent hot water. We replaced the aging unit and tested the system before finishing the job.",
    faq: {
      question: "How do I know when my water heater needs to be replaced?",
      answer:
        "Warning signs can include inconsistent hot water, unusual noises, leaks, rust-colored water, or an older unit that struggles to keep up with normal household use.",
    },
    headlines: [
      "Water Heater Replacement in Scotts Valley",
      "Reliable Hot Water Restored",
      "Old Water Heater Out, New System In",
    ],
  },
  {
    industry: "Roofing",
    location: "Santa Cruz County",
    jobType: "Leak repair",
    sourceNote:
      "Homeowner noticed a ceiling stain after heavy rain. We inspected the roof, found a problem area near flashing, repaired the leak source, and recommended monitoring during the next storm.",
    googlePost:
      "Roof leak repair completed in Santa Cruz County after a homeowner noticed a ceiling stain from recent rain. We inspected the roof, found the problem area near flashing, repaired the leak source, and recommended monitoring during the next storm.",
    facebookPost:
      "A ceiling stain after heavy rain is not something to ignore. This Santa Cruz County homeowner called after noticing water marks inside. We inspected the roof, found the issue near flashing, and repaired the leak source.",
    instagramCaption:
      "Roof leak repair after heavy rain in Santa Cruz County. Ceiling stain inside, flashing issue outside, leak source repaired, and the homeowner now knows what to watch during the next storm.",
    reelScript:
      "Hook: A ceiling stain usually starts somewhere on the roof. Scene 1: Show the interior stain. Scene 2: Show roof inspection. Scene 3: Show flashing repair area. Voiceover: After heavy rain, this homeowner noticed a ceiling stain. We traced the issue to a problem near flashing and repaired the leak source.",
    faq: {
      question: "Should I call a roofer if I see a small ceiling stain?",
      answer:
        "Yes. Even a small stain can point to an active leak. It is better to inspect the roof early before moisture causes more damage inside the home.",
    },
    headlines: [
      "Roof Leak Repair After Heavy Rain",
      "Ceiling Stain? Check the Roof",
      "Santa Cruz County Leak Source Repaired",
    ],
  },
  {
    industry: "Real Estate",
    location: "Soquel, CA",
    jobType: "Buyer education post",
    sourceNote:
      "First-time buyer wanted to understand what happens after an offer is accepted. Explain inspections, disclosures, appraisal, loan steps, timelines, and why communication matters.",
    googlePost:
      "Buying a home in Soquel or nearby Santa Cruz County? After an offer is accepted, the next steps usually include inspections, disclosures, appraisal, loan milestones, timelines, and ongoing communication between the buyer, agent, lender, and escrow team.",
    facebookPost:
      "Getting an offer accepted is exciting, but it is not the finish line. For first-time buyers, the next phase can include inspections, disclosures, appraisal, loan steps, escrow timelines, and a lot of important decisions. Good communication makes the process much less stressful.",
    instagramCaption:
      "Offer accepted? Now the real process begins. Inspections, disclosures, appraisal, loan milestones, escrow deadlines, and decisions that need clear guidance along the way.",
    reelScript:
      "Hook: Your offer got accepted. Now what? Scene 1: Buyer celebrating. Scene 2: Inspection checklist. Scene 3: Keys and paperwork. Voiceover: After an accepted offer, buyers move into inspections, disclosures, appraisal, loan steps, and escrow deadlines. This is where clear guidance matters most.",
    faq: {
      question: "What happens after a home offer is accepted?",
      answer:
        "The process usually moves into escrow, inspections, disclosures, appraisal, loan milestones, and closing preparation. The exact timeline depends on the contract and local market conditions.",
    },
    headlines: [
      "Offer Accepted? Here Is What Happens Next",
      "First-Time Buyer Guide After Acceptance",
      "The Steps Between Offer and Closing",
    ],
  },
];
