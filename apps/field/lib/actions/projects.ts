"use server";

import { revalidatePath } from "next/cache";

import { createSupabaseServerClient } from "@/lib/supabase-server";

interface CreateProjectInput {
  name: string;
  address?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
}

export async function createProject(input: CreateProjectInput) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  if (!profile) throw new Error("No profile for current user.");

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      organization_id: profile.organization_id,
      name: input.name,
      address: input.address || null,
      client_name: input.clientName || null,
      client_phone: input.clientPhone || null,
      client_email: input.clientEmail || null,
    })
    .select("id")
    .single();

  if (error || !project) throw new Error(error?.message ?? "Failed to create project.");

  // A crew/foreman texting from the client's own number is rare but the
  // client's number itself should immediately route to this project.
  if (input.clientPhone) {
    await supabase.from("contacts").insert({
      organization_id: profile.organization_id,
      project_id: project.id,
      phone: input.clientPhone,
      name: input.clientName || null,
      kind: "client",
    });
  }

  revalidatePath("/dashboard/projects");
  return project.id;
}

export async function addContact(input: { projectId: string; name?: string; phone: string; kind: "crew" | "foreman" | "subcontractor" }) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase.from("profiles").select("organization_id").eq("id", user.id).single();
  if (!profile) throw new Error("No profile for current user.");

  const { error } = await supabase.from("contacts").insert({
    organization_id: profile.organization_id,
    project_id: input.projectId,
    phone: input.phone,
    name: input.name || null,
    kind: input.kind,
  });
  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/projects/${input.projectId}`);
}
