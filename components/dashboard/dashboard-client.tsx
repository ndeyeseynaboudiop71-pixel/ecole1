"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { GraduationCap, BookOpen, School, UserCheck, Wallet, CalendarDays, ClipboardCheck, TrendingUp, CircleAlert as AlertCircle } from "lucide-react";

export interface DashboardStats {
  students?: number;
  courses?: number;
  classes?: number;
  applicants?: number;
  totalBilled?: number;
  totalCollected?: number;
  totalRemaining?: number;
  mySchedules?: number;
  pendingAssessments?: number;
  enrollments?: number;
  absences?: number;
  studentStatus?: string;
}

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Administrateur",
  direction: "Direction",
  administration: "Administration",
  scolarite: "Scolarité",
  comptabilite: "Comptabilité",
  formateur: "Formateur",
  etudiant: "Étudiant",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currencyDisplay: "code",
  }).format(amount);
}

export function DashboardClient({
  role,
  stats,
}: {
  role: string;
  stats: DashboardStats;
}) {
  const roleLabel = ROLE_LABELS[role] ?? role;

  return (
    <div className="space-y-6">
      <PageHeader title="Tableau de bord" description={`Bienvenue — Espace ${roleLabel}`} />

      {(role === "super_admin" || role === "direction" || role === "administration" || role === "scolarite") && (
        <DirectionDashboard stats={stats} />
      )}

      {role === "comptabilite" && <ComptabiliteDashboard stats={stats} />}

      {role === "formateur" && <FormateurDashboard stats={stats} />}

      {role === "etudiant" && <EtudiantDashboard stats={stats} />}
    </div>
  );
}

function DirectionDashboard({ stats }: { stats: DashboardStats }) {
  const hasData = stats.students !== undefined || stats.courses !== undefined;
  if (!hasData) {
    return (
      <EmptyState
        title="Aucune donnée disponible"
        description="Les données apparaîtront une fois les premiers enregistrements créés."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Étudiants" value={stats.students ?? 0} icon={GraduationCap} />
      <StatCard label="Candidats" value={stats.applicants ?? 0} icon={UserCheck} />
      <StatCard label="Formations actives" value={stats.courses ?? 0} icon={BookOpen} />
      <StatCard label="Classes" value={stats.classes ?? 0} icon={School} />
    </div>
  );
}

function ComptabiliteDashboard({ stats }: { stats: DashboardStats }) {
  if (stats.totalBilled === undefined) {
    return (
      <EmptyState
        title="Aucune donnée financière disponible"
        description="Les données apparaîtront une fois les premiers plans de paiement créés."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Total facturé" value={formatCurrency(stats.totalBilled ?? 0)} icon={Wallet} />
      <StatCard
        label="Total encaissé"
        value={formatCurrency(stats.totalCollected ?? 0)}
        icon={TrendingUp}
        trend={{ value: "Encaissement", positive: true }}
      />
      <StatCard
        label="Reste à payer"
        value={formatCurrency(stats.totalRemaining ?? 0)}
        icon={AlertCircle}
        trend={{ value: "En attente", positive: false }}
      />
    </div>
  );
}

function FormateurDashboard({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Mes créneaux" value={stats.mySchedules ?? 0} icon={CalendarDays} />
      <StatCard label="Évaluations à corriger" value={stats.pendingAssessments ?? 0} icon={ClipboardCheck} />
      <StatCard label="Classes" value="—" icon={School} />
    </div>
  );
}

function EtudiantDashboard({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Mes inscriptions" value={stats.enrollments ?? 0} icon={BookOpen} />
      <StatCard label="Mes absences" value={stats.absences ?? 0} icon={ClipboardCheck} />
      <StatCard label="Ma situation" value={stats.studentStatus ?? "—"} icon={GraduationCap} />
      <StatCard label="Total facturé" value={formatCurrency(stats.totalBilled ?? 0)} icon={Wallet} />
    </div>
  );
}
