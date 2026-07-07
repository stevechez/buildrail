"use client";

import { useState, useTransition } from "react";

import { sendChangeOrderForApproval, recordOfficeDecision } from "@/lib/actions/change-orders";
import { Button } from "@/components/ui/button";

export function ChangeOrderDetailActions({
  changeOrderId,
  status,
}: {
  changeOrderId: string;
  status: "draft" | "pending_approval" | "approved" | "rejected";
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function run(fn: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        {status === "draft" && (
          <Button disabled={isPending} onClick={() => run(() => sendChangeOrderForApproval(changeOrderId))}>
            {isPending ? "Sending…" : "Send to client"}
          </Button>
        )}
        {status === "pending_approval" && (
          <>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => run(() => recordOfficeDecision(changeOrderId, "rejected"))}
            >
              Mark rejected
            </Button>
            <Button disabled={isPending} onClick={() => run(() => recordOfficeDecision(changeOrderId, "approved"))}>
              Mark approved
            </Button>
          </>
        )}
      </div>
      {error && <p className="max-w-xs text-right text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}
