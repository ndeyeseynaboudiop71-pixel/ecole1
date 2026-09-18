import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function DirectionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Direction" description="Vue d'ensemble de l'établissement" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités de direction seront disponibles prochainement." />
    </div>
  );
}
