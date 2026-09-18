import { Loader as Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingState({
  message = "Chargement...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
