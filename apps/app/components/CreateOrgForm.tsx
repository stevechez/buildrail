"use client";

import { useState, useTransition } from "react";

import { createOrganization } from "@/lib/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateOrgForm({ defaultFullName }: { defaultFullName?: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    const organizationName = String(formData.get("organizationName") ?? "");
    const fullName = String(formData.get("fullName") ?? "");

    if (!organizationName.trim()) {
      setError("Organization name is required.");
      return;
    }

    startTransition(async () => {
      try {
        await createOrganization({ organizationName, fullName });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create organization.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="organizationName">Company name</Label>
        <Input id="organizationName" name="organizationName" required placeholder="Acme Contracting" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Your name</Label>
        <Input id="fullName" name="fullName" defaultValue={defaultFullName} placeholder="Jane Smith" />
      </div>
      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating…" : "Create workspace"}
      </Button>
    </form>
  );
}
