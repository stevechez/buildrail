"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

/** Surfaces ?error=... from /auth/callback (e.g. a failed magic-link code
 * exchange) — split out so useSearchParams() doesn't force the whole page
 * dynamic without an explicit Suspense boundary. */
function CallbackError() {
  const params = useSearchParams();
  const error = params.get("error");
  if (!error) return null;
  return (
    <p className="mb-4 rounded-lg border border-[var(--danger)]/25 bg-[var(--danger)]/10 px-3 py-2 text-xs text-[var(--danger)]">
      {error === "missing_code" ? "That sign-in link looks incomplete — request a new one." : error}
    </p>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-[Space_Grotesk] text-xl">
            Build<span className="text-seafoam">Rail</span> Field
          </CardTitle>
          <CardDescription>Sign in with your work email — no password needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={null}>
            <CallbackError />
          </Suspense>
          {status === "sent" ? (
            <p className="text-sm text-[var(--white-dim)]">
              Check <span className="text-seafoam">{email}</span> for a sign-in link.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
              <Button type="submit" disabled={status === "sending"} className="w-full">
                {status === "sending" ? "Sending link…" : "Send sign-in link"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}
