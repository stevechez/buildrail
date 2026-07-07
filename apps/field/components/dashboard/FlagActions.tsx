"use client";

import { useTransition } from "react";
import Link from "next/link";

import { updateFlagStatus } from "@/lib/actions/messages";
import { Button } from "@/components/ui/button";

export function FlagActions({
  flagId,
  status,
  isChangeRequest,
}: {
  flagId: string;
  status: "open" | "acknowledged" | "resolved";
  isChangeRequest: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex shrink-0 items-center gap-2">
      {isChangeRequest && (
        <Button asChild size="sm" variant="outline">
          <Link href={`/dashboard/change-orders/new?flagId=${flagId}`}>Create change order</Link>
        </Button>
      )}
      {status === "open" && (
        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => startTransition(() => updateFlagStatus(flagId, "acknowledged"))}
        >
          Acknowledge
        </Button>
      )}
      {status !== "resolved" && (
        <Button
          size="sm"
          disabled={isPending}
          onClick={() => startTransition(() => updateFlagStatus(flagId, "resolved"))}
        >
          Resolve
        </Button>
      )}
    </div>
  );
}
