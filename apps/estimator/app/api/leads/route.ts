import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// ─── CORS ─────────────────────────────────────────────────────────────────────
// The embed runs on third-party domains so we must allow cross-origin requests.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Preflight
export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ─── Supabase client (server-side, credentials never leave this function) ─────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient<Database>(url, key);
}

// ─── POST /api/leads ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: CORS }
    );
  }

  // Basic validation — name and email are the only hard requirements
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "name is required (min 2 chars)" },
      { status: 422, headers: CORS }
    );
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "valid email is required" },
      { status: 422, headers: CORS }
    );
  }

  // Insert
  try {
    const supabase = getSupabase();

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: typeof body.phone === "string" ? body.phone || null : null,
      scope: typeof body.scope === "string" ? body.scope || null : null,
      size: typeof body.size === "string" ? body.size || null : null,
      finish: typeof body.finish === "string" ? body.finish || null : null,
      remodel_rooms: Array.isArray(body.remodel_rooms)
        ? (body.remodel_rooms as string[])
        : null,
      estimate_min:
        typeof body.estimate_min === "number" ? body.estimate_min : 0,
      estimate_max:
        typeof body.estimate_max === "number" ? body.estimate_max : 0,
      source:
        typeof body.source === "string" && body.source
          ? body.source
          : "embed",
    });

    if (error) {
      console.error("[POST /api/leads] Supabase error:", error.message);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500, headers: CORS }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201, headers: CORS });
  } catch (err) {
    console.error("[POST /api/leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: CORS }
    );
  }
}
