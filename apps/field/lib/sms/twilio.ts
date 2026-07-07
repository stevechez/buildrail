import "server-only";
import crypto from "node:crypto";

/**
 * Verifies a Twilio webhook request signature (X-Twilio-Signature) per
 * https://www.twilio.com/docs/usage/security#validating-requests.
 *
 * `url` must be the exact, full URL Twilio called — including protocol and
 * query string — as configured in the Twilio console, since the signature
 * is computed over the URL + sorted POST params.
 */
export function verifyTwilioSignature(params: {
  signature: string | null;
  url: string;
  body: Record<string, string>;
  authToken: string;
}): boolean {
  const { signature, url, body, authToken } = params;
  if (!signature) return false;

  const data =
    url +
    Object.keys(body)
      .sort()
      .map((key) => key + body[key])
      .join("");

  const expected = crypto.createHmac("sha1", authToken).update(Buffer.from(data, "utf-8")).digest("base64");

  // Constant-time comparison.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Sends an outbound SMS via the Twilio REST API. Used to text clients their
 * portal link (Module 3) and to notify crews their message was received.
 */
export async function sendSms(params: { to: string; body: string }): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_SMS_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error("Missing TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_SMS_NUMBER in .env.local.");
  }

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
    },
    body: new URLSearchParams({ To: params.to, From: from, Body: params.body }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio send error ${res.status}: ${text}`);
  }
}
