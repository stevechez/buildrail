"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const name = String(formData.get("name") ?? "");
    if (!name) {
      setError("Project name is required.");
      return;
    }

    startTransition(async () => {
      try {
        await createProject({
          name,
          address: String(formData.get("address") ?? ""),
          clientName: String(formData.get("clientName") ?? ""),
          clientPhone: String(formData.get("clientPhone") ?? ""),
          clientEmail: String(formData.get("clientEmail") ?? ""),
        });
        router.push("/dashboard/projects");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create project.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" required placeholder="Harborview Kitchen Remodel" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" placeholder="123 Harbor Way, Newport, RI" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="clientName">Client name</Label>
          <Input id="clientName" name="clientName" placeholder="Jane Homeowner" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="clientPhone">Client phone</Label>
          <Input id="clientPhone" name="clientPhone" type="tel" placeholder="+1 555 010 1234" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="clientEmail">Client email</Label>
        <Input id="clientEmail" name="clientEmail" type="email" placeholder="jane@email.com" />
      </div>

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating…" : "Create project"}
      </Button>
    </form>
  );
}
