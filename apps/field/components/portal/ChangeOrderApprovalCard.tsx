"use client";

import { useState, useTransition } from "react";

import { decideChangeOrder } from "@/app/portal/[token]/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ChangeOrderStatus } from "@/types/supabase";

const STATUS_VARIANT = {
  draft: "muted",
  pending_approval: "warning",
  approved: "success",
  rejected: "danger",
} as const;

function fmtCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function ChangeOrderApprovalCard({
  token,
  changeOrder,
}: {
  token: string;
  changeOrder: {
    id: string;
    title: string;
    description: string;
    cost_delta_cents: number;
    // Narrowed to non-draft at the query site (app/portal/[token]/page.tsx
    // filters `.in("status", [...])`), but typed as the full union since
    // Postgrest can't encode that runtime filter in its return type.
    status: ChangeOrderStatus;
  };
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [localStatus, setLocalStatus] = useState(changeOrder.status);

  function decide(decision: "approved" | "rejected") {
    setError(null);
    startTransition(async () => {
      try {
        await decideChangeOrder(token, changeOrder.id, decision);
        setLocalStatus(decision);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant={STATUS_VARIANT[localStatus]}>{localStatus.replace("_", " ")}</Badge>
          <p className="text-base font-semibold text-seafoam">{fmtCents(changeOrder.cost_delta_cents)}</p>
        </div>
        <p className="text-sm font-medium text-white">{changeOrder.title}</p>
        {changeOrder.description && <p className="mt-2 text-sm text-[var(--white-dim)]">{changeOrder.description}</p>}

        {localStatus === "pending_approval" && (
          <div className="mt-5 flex gap-2">
            <Button variant="outline" disabled={isPending} onClick={() => decide("rejected")} className="flex-1">
              Decline
            </Button>
            <Button disabled={isPending} onClick={() => decide("approved")} className="flex-1">
              Approve
            </Button>
          </div>
        )}
        {error && <p className="mt-3 text-xs text-[var(--danger)]">{error}</p>}
      </CardContent>
    </Card>
  );
}
