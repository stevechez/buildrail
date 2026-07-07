"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createChangeOrder } from "@/lib/actions/change-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  name: string;
}

export function NewChangeOrderForm({
  projects,
  defaultProjectId,
  defaultTitle,
  sourceFlagId,
}: {
  projects: Project[];
  defaultProjectId?: string;
  defaultTitle?: string;
  sourceFlagId?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const projectId = String(formData.get("projectId") ?? "");
    const title = String(formData.get("title") ?? "");
    const description = String(formData.get("description") ?? "");
    const cost = Number(formData.get("cost") ?? 0);

    if (!projectId || !title) {
      setError("Project and title are required.");
      return;
    }

    startTransition(async () => {
      try {
        const id = await createChangeOrder({
          projectId,
          title,
          description,
          costDeltaCents: Math.round(cost * 100),
          sourceFlagId,
        });
        router.push(`/dashboard/change-orders/${id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create change order.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="projectId">Project</Label>
        <select
          id="projectId"
          name="projectId"
          required
          defaultValue={defaultProjectId ?? ""}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all duration-150 ease-in-out focus:border-[var(--seafoam)]/50 focus:ring-2 focus:ring-[var(--seafoam)]/20"
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required defaultValue={defaultTitle} placeholder="Add 2 boxes of trim tile" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Scope, reasoning, anything the client should see." />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cost">Cost delta (USD)</Label>
        <Input id="cost" name="cost" type="number" step="0.01" placeholder="450.00" />
      </div>

      {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating…" : "Create draft"}
      </Button>
    </form>
  );
}
