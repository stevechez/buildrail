"use client";

import { useRef, useState, useTransition } from "react";

import { createInvite } from "@/lib/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ROLE_OPTIONS = ["member", "manager", "admin"] as const;

export function InviteForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    const email = String(formData.get("email") ?? "");
    const role = String(formData.get("role") ?? "member");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    startTransition(async () => {
      try {
        await createInvite({ email, role });
        formRef.current?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send invite.");
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-wrap items-end gap-2">
      <div className="flex-1 min-w-[200px]">
        <Input id="invite-email" name="email" type="email" required placeholder="teammate@yourcompany.com" />
      </div>
      <select
        name="role"
        defaultValue="member"
        className="h-11 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-[var(--seafoam)]/50"
      >
        {ROLE_OPTIONS.map((role) => (
          <option key={role} value={role}>
            {role[0].toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Inviting…" : "Invite"}
      </Button>
      {error && <p className="w-full text-sm text-[var(--danger)]">{error}</p>}
    </form>
  );
}
