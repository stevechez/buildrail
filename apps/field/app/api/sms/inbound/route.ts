import { NextResponse, type NextRequest } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { verifyTwilioSignature } from "@/lib/sms/twilio";
import { parseMessage, isAiConfigured } from "@/lib/ai/parse-message";

/**
 * Twilio inbound SMS webhook. Configure this URL on the org's Twilio number
 * as "A message comes in" → HTTP POST.
 *
 * Flow (the whole point of Module 1):
 *   1. Verify the request really came from Twilio.
 *   2. Resolve which organization/project/contact this number belongs to.
 *   3. Persist the raw message (always — even if AI structuring fails).
 *   4. Ask Claude to extract actionable flags from the message body.
 *   5. Write those flags so they show up on the dashboard feed.
 *
 * Step 3 and step 4 are deliberately separate: a flaky AI call should never
 * cause a crew's message to be lost.
 */
export async function POST(req: NextRequest) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const rawBody = await req.text();
  const params = Object.fromEntries(new URLSearchParams(rawBody));

  if (authToken) {
    const signature = req.headers.get("x-twilio-signature");
    const url = req.nextUrl.toString();
    const valid = verifyTwilioSignature({ signature, url, body: params, authToken });
    if (!valid) {
      return new NextResponse("Invalid signature", { status: 403 });
    }
  }

  const from = params.From;
  const to = params.To;
  const body = params.Body ?? "";

  if (!from || !to) {
    return new NextResponse("Missing From/To", { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // 1. Resolve organization by the Twilio number that was texted.
  const { data: org } = await admin
    .from("organizations")
    .select("id")
    .eq("sms_number", to)
    .maybeSingle();

  if (!org) {
    console.error(`No organization configured for Twilio number ${to}`);
    return new NextResponse("", { status: 200 }); // 200 so Twilio doesn't retry forever
  }

  // 2. Resolve contact + project by phone number, if we've seen this number before.
  const { data: contact } = await admin
    .from("contacts")
    .select("id, project_id")
    .eq("organization_id", org.id)
    .eq("phone", from)
    .maybeSingle();

  // 3. Persist the raw message immediately.
  const { data: message, error: insertError } = await admin
    .from("messages")
    .insert({
      organization_id: org.id,
      project_id: contact?.project_id ?? null,
      contact_id: contact?.id ?? null,
      direction: "inbound",
      channel: "sms",
      from_number: from,
      to_number: to,
      body,
      raw_payload: params,
      ai_status: "pending",
    })
    .select("id, project_id")
    .single();

  if (insertError || !message) {
    console.error("Failed to persist inbound message", insertError);
    return new NextResponse("Storage error", { status: 500 });
  }

  // 4 & 5. Structure the message and write flags. Failure here degrades
  // gracefully — the raw message is already saved and visible in the
  // dashboard's message log (app/dashboard/messages/page.tsx lists messages,
  // not just flags) even if AI structuring never runs. If no ANTHROPIC_API_KEY
  // is configured yet, skip cleanly rather than erroring on every message —
  // office staff can still add flags manually from the dashboard.
  if (!isAiConfigured()) {
    await admin.from("messages").update({ ai_status: "skipped" }).eq("id", message.id);
  } else {
    try {
      const { flags } = await parseMessage(body);

      if (flags.length > 0) {
        await admin.from("message_flags").insert(
          flags.map((flag) => ({
            organization_id: org.id,
            message_id: message.id,
            project_id: message.project_id,
            flag_type: flag.flag_type,
            summary: flag.summary,
            details: flag.details,
            confidence: flag.confidence,
          }))
        );
      }

      await admin.from("messages").update({ ai_status: "processed" }).eq("id", message.id);
    } catch (err) {
      console.error("AI structuring failed", err);
      await admin
        .from("messages")
        .update({ ai_status: "failed", ai_error: err instanceof Error ? err.message : String(err) })
        .eq("id", message.id);
    }
  }

  // Empty TwiML response — no auto-reply. A dedicated "confirm receipt" reply
  // can be layered on later if pilot users want it.
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
    status: 200,
    headers: { "content-type": "text/xml" },
  });
}
