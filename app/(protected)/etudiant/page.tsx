import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function EtudiantPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Espace Étudiant" description="Vos informations et suivi" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités étudiant seront disponibles prochainement." />
    </div>
  );
}
