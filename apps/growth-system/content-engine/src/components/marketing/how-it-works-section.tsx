import { CalendarDays, ClipboardEdit, Sparkles } from "lucide-react";

const steps = [
  {
    icon: ClipboardEdit,
    title: "Describe the real work",
    description:
      "Add a job note, review, FAQ, service story, or before-and-after description.",
  },
  {
    icon: Sparkles,
    title: "Generate a content pack",
    description:
      "LocalProof creates platform-specific posts using your business, location, tone, services, and CTA.",
  },
  {
    icon: CalendarDays,
    title: "Post with consistency",
    description:
      "Save posts, copy them, organize your week, and build a repeatable local content habit.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Built around the way local businesses actually work.
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            No blank content calendar. No staring at a prompt box. Start with
            the job, review, question, or service note you already have.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border bg-background p-6 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-5" />
                  </div>

                  <div className="text-5xl font-bold text-muted">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
