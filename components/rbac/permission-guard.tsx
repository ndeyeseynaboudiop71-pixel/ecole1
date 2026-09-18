"use client";

import { useUser } from "@/lib/auth/user-context";
import type { Permission } from "@/lib/rbac/permissions";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PermissionGuard({
  permission,
  children,
  fallback,
}: {
  permission: Permission | Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { can, canAny } = useUser();
  const allowed = Array.isArray(permission) ? canAny(permission) : can(permission);

  if (!allowed) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center">
        <div className="rounded-full bg-muted p-3">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">Accès refusé</p>
          <p className="text-sm text-muted-foreground">
            Vous n'avez pas la permission d'accéder à cette section.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
