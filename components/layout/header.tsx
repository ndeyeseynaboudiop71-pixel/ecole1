"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UserMenu } from "@/components/layout/user-menu";
import { MobileMenuButton } from "@/components/layout/sidebar";

export function Header({ onMobileMenuClick }: { onMobileMenuClick: () => void }) {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onMobileMenuClick} />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}
