import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title = "Aucune donnée disponible",
  description,
  icon: Icon = Inbox,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-12 text-center", className)}>
      <div className="rounded-full bg-muted p-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
