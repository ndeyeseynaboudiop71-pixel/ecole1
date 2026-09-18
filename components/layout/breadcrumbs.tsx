"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/nav-config";

function findLabel(href: string): string | null {
  for (const section of NAV_SECTIONS) {
    for (const item of section.items) {
      if (href === item.href || href.startsWith(item.href + "/")) return item.label;
    }
  }
  return null;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs: { label: string; href: string }[] = [];
  let path = "";

  for (let i = 0; i < segments.length; i++) {
    path += "/" + segments[i];
    if (i === 0 && segments[0] === "dashboard") {
      crumbs.push({ label: "Tableau de bord", href: "/dashboard" });
      continue;
    }
    const label = findLabel(path);
    crumbs.push({
      label: label ?? segments[i].charAt(0).toUpperCase() + segments[i].slice(1),
      href: path,
    });
  }

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="h-3 w-3" />}
          {idx === crumbs.length - 1 ? (
            <span className="font-medium text-foreground">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-foreground">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
