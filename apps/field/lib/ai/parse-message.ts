import "server-only";
import type { FlagType, Json } from "@/types/supabase";

export interface ParsedFlag {
  flag_type: FlagType;
  summary: string;
  // Json, not Record<string, unknown> — this gets written straight into
  // message_flags.details (jsonb), and the generated Database type types
  // that column as Json.
  details: Json;
  confidence: number;
}

export interface ParseMessageResult {
  flags: ParsedFlag[];
}

const SYSTEM_PROMPT = `You read raw text messages sent by construction crews and foremen to the office. Your job is to extract structured, actionable items — not to summarize the whole message.

Only extract a flag when the message contains something the office genuinely needs to act on or track. Casual chatter, confirmations ("ok", "on my way", "thanks"), or messages with no actionable content should produce zero flags.

Each flag must be one of these types:
- material_shortage: crew is missing/short on materials or tools needed to keep working.
- schedule_delay: work is behind, blocked, or a timeline is slipping.
- safety_issue: any safety hazard, incident, or near-miss.
- change_request: crew or client is asking for scope beyond the current plan (this is a change-order candidate).
- question: crew needs a decision or answer from the office to proceed.
- general_update: a notable status update worth logging that doesn't fit the above (e.g. inspection passed, milestone hit).

A single message may contain more than one flag. Respond with ONLY a JSON object matching this shape, no prose, no markdown fences:

{
  "flags": [
    {
      "flag_type": "material_shortage",
      "summary": "Short 2 boxes of trim tile, can't finish the bathroom floor",
      "details": { "items": ["trim tile"], "quantity": "2 boxes" },
      "confidence": 0.9
    }
  ]
}

If nothing is actionable, respond with {"flags": []}.`;

/** True once ANTHROPIC_API_KEY is set. Lets callers skip AI structuring
 * cleanly (ai_status: "skipped") instead of throwing on every message. */
export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/**
 * Structures a raw inbound SMS body into zero or more actionable flags using
 * Claude. Called from app/api/sms/inbound/route.ts right after the raw
 * message is persisted. Callers should check isAiConfigured() first — this
 * throws if ANTHROPIC_API_KEY is missing, since it's meant for the
 * already-configured path.
 *
 * Uses a direct fetch to the Messages API rather than the Anthropic SDK to
 * avoid an extra dependency for a single call site — swap in @anthropic-ai/sdk
 * if this grows more call sites.
 */
export async function parseMessage(body: string): Promise<ParseMessageResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY — set it in .env.local.");
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: body }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  if (!textBlock?.text) {
    throw new Error("Anthropic response had no text content block.");
  }

  let parsed: ParseMessageResult;
  try {
    parsed = JSON.parse(textBlock.text);
  } catch {
    throw new Error(`Failed to parse AI response as JSON: ${textBlock.text}`);
  }

  if (!Array.isArray(parsed.flags)) {
    throw new Error("AI response missing a `flags` array.");
  }

  return parsed;
}
