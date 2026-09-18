"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldX, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isForbidden = error.message === "FORBIDDEN";
  const isUnauthorized = error.message === "UNAUTHORIZED";

  if (isUnauthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Session expiree</h1>
          <p className="max-w-md text-muted-foreground">
            Votre session n'est plus valide. Vous allez etre redirige vers la page de connexion.
          </p>
        </div>
        <Button asChild>
          <Link href="/login">Se reconnecter</Link>
        </Button>
      </div>
    );
  }

  if (isForbidden) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-6">
          <ShieldX className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Acces refuse</h1>
          <p className="max-w-md text-muted-foreground">
            Vous n'avez pas les permissions necessaires pour acceder a cette page.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Une erreur est survenue</h1>
        <p className="max-w-md text-muted-foreground">{error.message}</p>
      </div>
      <Button onClick={reset} variant="outline">
        Reessayer
      </Button>
    </div>
  );
}
