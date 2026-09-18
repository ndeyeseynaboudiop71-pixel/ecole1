"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/auth/user-context";
import { NAV_SECTIONS } from "@/lib/nav-config";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { canAny } = useUser();

  return (
    <nav className="space-y-6">
      {NAV_SECTIONS.map((section, sIdx) => {
        const visibleItems = section.items.filter((item) =>
          !item.permissions ? true : canAny(item.permissions)
        );
        if (visibleItems.length === 0) return null;

        return (
          <div key={sIdx} className="space-y-1">
            {section.label && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section.label}
              </p>
            )}
            {visibleItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileOpenChange,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      <aside
        className={cn(
          "hidden border-r bg-card lg:flex lg:flex-col transition-all duration-200",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold tracking-tight">Gestion Scolaire</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="mx-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onToggleCollapse}>
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <NavList />
        </ScrollArea>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold tracking-tight">Gestion Scolaire</span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] px-2 py-4">
            <NavList onNavigate={() => onMobileOpenChange(false)} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClick}>
      <Menu className="h-5 w-5" />
    </Button>
  );
}
