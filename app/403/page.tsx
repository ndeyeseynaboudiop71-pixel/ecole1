import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6">
        <ShieldX className="h-12 w-12 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Accès refusé</h1>
        <p className="max-w-md text-muted-foreground">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Si vous pensez qu'il s'agit d'une erreur, contactez votre administrateur.
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
