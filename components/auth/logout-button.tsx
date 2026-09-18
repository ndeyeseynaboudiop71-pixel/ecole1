"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { supabase as supabaseClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await supabaseClient.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={loading}
      className="text-destructive focus:text-destructive"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Déconnexion
    </DropdownMenuItem>
  );
}
