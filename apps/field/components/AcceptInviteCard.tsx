"use client";

import { useState, useTransition } from "react";

import { acceptInvite } from "@/lib/actions/auth-setup";
import { Button } from "@/components/ui/button";

export function AcceptInviteCard({ inviteId, organizationName }: { inviteId: string; organizationName: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAccept() {
    setError(null);
    startTransition(async () => {
      try {
        await acceptInvite(inviteId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to accept invite.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[var(--white-dim)]">
        You&apos;ve been invited to join <span className="text-seafoam">{organizationName}</span> on BuildRail
        Field.
      </p>
      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
      <Button onClick={handleAccept} disabled={isPending} className="w-full">
        {isPending ? "Joining…" : `Join ${organizationName}`}
      </Button>
    </div>
  );
}
