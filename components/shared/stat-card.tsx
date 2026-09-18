import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: { value: string; positive?: boolean };
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex items-center justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn("text-xs font-medium", trend.positive ? "text-emerald-600" : "text-destructive")}>
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
