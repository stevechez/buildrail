"use client";

import { useOptimistic, useTransition } from "react";
import { toggleContacted } from "@/app/admin/leads/[id]/actions";

interface ContactToggleProps {
  leadId: string;
  contactedAt: string | null;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export function ContactToggle({ leadId, contactedAt }: ContactToggleProps) {
  const [isPending, startTransition] = useTransition();

  // Optimistic state: boolean contacted flag
  const [optimisticContacted, setOptimisticContacted] = useOptimistic(
    contactedAt !== null
  );

  const handleToggle = () => {
    const next = !optimisticContacted;
    startTransition(async () => {
      setOptimisticContacted(next);
      await toggleContacted(leadId, next);
    });
  };

  return (
    <div className="flex items-center gap-4">
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        disabled={isPending}
        aria-pressed={optimisticContacted}
        className={[
          "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
          "transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed",
          optimisticContacted
            ? "bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/30 hover:bg-[var(--success)]/25"
            : "bg-white/[0.04] text-[var(--slate)] border border-white/[0.08] hover:border-white/20 hover:text-[var(--white)]",
        ].join(" ")}
      >
        {/* Icon */}
        {optimisticContacted ? (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
        {optimisticContacted ? "Contacted" : "Mark as contacted"}
      </button>

      {/* Timestamp */}
      {optimisticContacted && contactedAt && (
        <span className="text-xs text-[var(--slate)]">
          {fmtDate(contactedAt)}
        </span>
      )}
    </div>
  );
}
