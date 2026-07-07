"use client";

import { useTransition } from "react";

import { revokeInvite } from "@/lib/actions/team";
import { Button } from "@/components/ui/button";

export function RevokeInviteButton({ inviteId }: { inviteId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={isPending}
      onClick={() => startTransition(() => revokeInvite(inviteId))}
    >
      {isPending ? "Revoking…" : "Revoke"}
    </Button>
  );
}
