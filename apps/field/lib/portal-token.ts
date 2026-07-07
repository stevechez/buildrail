import "server-only";
import crypto from "node:crypto";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";

/**
 * Gets (or creates, if none valid) the client portal token for a project and
 * returns the full shareable URL. Reused across change orders so a client
 * only ever gets one link per project, not a new one per change order.
 */
export async function getOrCreatePortalUrl(params: {
  organizationId: string;
  projectId: string;
}): Promise<string> {
  const admin = createSupabaseAdminClient();

  const { data: existing } = await admin
    .from("portal_tokens")
    .select("token, expires_at, revoked_at")
    .eq("project_id", params.projectId)
    .is("revoked_at", null)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const token = existing?.token ?? crypto.randomBytes(24).toString("base64url");

  if (!existing) {
    const { error } = await admin.from("portal_tokens").insert({
      organization_id: params.organizationId,
      project_id: params.projectId,
      token,
    });
    if (error) throw new Error(`Failed to create portal token: ${error.message}`);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${appUrl}/portal/${token}`;
}

export interface PortalContext {
  organizationId: string;
  projectId: string;
  projectName: string;
  organizationName: string;
}

/** Validates a portal token and returns the project it grants access to, or null. */
export async function resolvePortalToken(token: string): Promise<PortalContext | null> {
  const admin = createSupabaseAdminClient();

  const { data } = await admin
    .from("portal_tokens")
    .select("organization_id, project_id, expires_at, revoked_at, projects(name), organizations(name)")
    .eq("token", token)
    .maybeSingle();

  if (!data) return null;
  if (data.revoked_at) return null;
  if (new Date(data.expires_at) < new Date()) return null;

  const project = Array.isArray(data.projects) ? data.projects[0] : data.projects;
  const org = Array.isArray(data.organizations) ? data.organizations[0] : data.organizations;

  return {
    organizationId: data.organization_id,
    projectId: data.project_id,
    projectName: (project as { name: string } | null)?.name ?? "Your project",
    organizationName: (org as { name: string } | null)?.name ?? "Your contractor",
  };
}
