import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function FormateurPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Espace Formateur" description="Vos classes et cours" />
      <EmptyState title="Module en préparation" description="Les fonctionnalités formateur seront disponibles prochainement." />
    </div>
  );
}
