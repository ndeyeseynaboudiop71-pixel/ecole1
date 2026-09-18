import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Administration" description="Gestion de l'établissement" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités d'administration seront disponibles prochainement." />
    </div>
  );
}
