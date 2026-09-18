import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function ScolaritePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scolarité" description="Gestion des inscriptions et du suivi" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités de scolarité seront disponibles prochainement." />
    </div>
  );
}
