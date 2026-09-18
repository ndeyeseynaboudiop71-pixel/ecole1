import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function ComptabilitePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Comptabilité" description="Gestion financière" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités de comptabilité seront disponibles prochainement." />
    </div>
  );
}
