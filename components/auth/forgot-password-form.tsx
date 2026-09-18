"use client";

import { useState } from "react";
import { supabase as supabaseClient } from "@/lib/supabase/client";
import { Loader as Loader2, Mail, CircleCheck as CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    setLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-emerald-100 p-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Email envoyé</h1>
            <p className="text-sm text-muted-foreground">
              Un lien de réinitialisation a été envoyé à{" "}
              <span className="font-medium text-foreground">{email}</span>. Vérifiez votre boîte de réception.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Mot de passe oublié</h1>
        <p className="text-sm text-muted-foreground">
          Saisissez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer le lien"
          )}
        </Button>
      </form>

      <Button asChild variant="ghost" className="w-full">
        <Link href="/login">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Link>
      </Button>
    </div>
  );
}
