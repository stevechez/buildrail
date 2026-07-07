"use client";

import { useTransition } from "react";

import { switchOrganization } from "@/lib/actions/switch-organization";

interface OrgOption {
  organization_id: string;
  organization_name: string;
}

export function OrgSwitcher({ organizations, currentOrganizationId }: { organizations: OrgOption[]; currentOrganizationId: string }) {
  const [isPending, startTransition] = useTransition();

  if (organizations.length <= 1) return null;

  return (
    <select
      defaultValue={currentOrganizationId}
      disabled={isPending}
      onChange={(e) => startTransition(() => switchOrganization(e.target.value))}
      className="h-9 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none focus:border-[var(--seafoam)]/50"
    >
      {organizations.map((org) => (
        <option key={org.organization_id} value={org.organization_id}>
          {org.organization_name}
        </option>
      ))}
    </select>
  );
}
