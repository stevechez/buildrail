"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";

import { createManualFlag } from "@/lib/actions/messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FlagType } from "@/types/supabase";

const FLAG_OPTIONS: { value: FlagType; label: string }[] = [
  { value: "material_shortage", label: "Material shortage" },
  { value: "schedule_delay", label: "Schedule delay" },
  { value: "safety_issue", label: "Safety issue" },
  { value: "change_request", label: "Change request" },
  { value: "question", label: "Question" },
  { value: "general_update", label: "Update" },
];

/** Inline "flag this message by hand" control — the fallback for when AI
 * structuring isn't configured yet (see /AI/12-DECISIONS.md, AI is optional). */
export function ManualFlagForm({ messageId, projectId }: { messageId: string; projectId: string | null }) {
  const [open, setOpen] = useState(false);
  const [flagType, setFlagType] = useState<FlagType>("general_update");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <Plus className="h-3.5 w-3.5" />
        Flag this
      </Button>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await createManualFlag({ messageId, projectId, flagType, summary });
        setOpen(false);
        setSummary("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create flag.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex gap-2">
        <select
          value={flagType}
          onChange={(e) => setFlagType(e.target.value as FlagType)}
          className="h-9 rounded-lg border border-white/10 bg-white/[0.03] px-2 text-xs text-white outline-none focus:border-[var(--seafoam)]/50"
        >
          {FLAG_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="What should the office know?"
          className="h-9 flex-1 text-xs"
          autoFocus
        />
      </div>
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Adding…" : "Add flag"}
        </Button>
      </div>
    </form>
  );
}
