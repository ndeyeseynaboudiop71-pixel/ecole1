"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings } from "lucide-react";
import { useUser } from "@/lib/auth/user-context";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Administrateur",
  direction: "Direction",
  administration: "Administration",
  scolarite: "Scolarité",
  comptabilite: "Comptabilité",
  formateur: "Formateur",
  etudiant: "Étudiant",
};

export function UserMenu() {
  const { user, fullName, initials, can } = useUser();
  if (!user) return null;

  const roleLabel = ROLE_LABELS[user.roles[0] ?? ""] ?? user.roles[0] ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg border bg-card px-2 py-1.5 transition-colors hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile?.avatar_url ?? undefined} />
            <AvatarFallback className="text-xs font-medium">{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight">{fullName}</p>
            <p className="text-xs text-muted-foreground leading-tight">{roleLabel}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        {can("settings.view") && (
          <DropdownMenuItem asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
