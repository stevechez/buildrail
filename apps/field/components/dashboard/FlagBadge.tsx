import { AlertTriangle, Package, Clock, ShieldAlert, HelpCircle, Info } from "lucide-react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { FlagType } from "@/types/supabase";

const FLAG_META: Record<FlagType, { label: string; variant: BadgeProps["variant"]; icon: typeof Package }> = {
  material_shortage: { label: "Material shortage", variant: "warning", icon: Package },
  schedule_delay: { label: "Schedule delay", variant: "warning", icon: Clock },
  safety_issue: { label: "Safety issue", variant: "danger", icon: ShieldAlert },
  change_request: { label: "Change request", variant: "ocean", icon: AlertTriangle },
  question: { label: "Question", variant: "seafoam", icon: HelpCircle },
  general_update: { label: "Update", variant: "muted", icon: Info },
};

export function FlagBadge({ type }: { type: FlagType }) {
  const meta = FLAG_META[type];
  const Icon = meta.icon;
  return (
    <Badge variant={meta.variant}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </Badge>
  );
}
