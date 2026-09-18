import type { Permission } from "@/lib/rbac/permissions";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  FileText,
  CalendarDays,
  ClipboardCheck,
  Wallet,
  Settings,
  ScrollText,
  School,
  BookOpen,
  Award,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  permissions?: Permission[];
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Administration",
    items: [
      { label: "Établissements", href: "/admin/institutions", icon: School, permissions: ["institutions.view"] },
      { label: "Utilisateurs", href: "/admin/users", icon: Users, permissions: ["users.view"] },
      { label: "Paramètres", href: "/admin/settings", icon: Settings, permissions: ["settings.view"] },
      { label: "Journal d'audit", href: "/admin/audit", icon: ScrollText, permissions: ["audit.view"] },
    ],
  },
  {
    label: "Scolarité",
    items: [
      { label: "Candidats", href: "/scolarite/applicants", icon: UserCheck, permissions: ["applicants.view"] },
      { label: "Étudiants", href: "/scolarite/students", icon: GraduationCap, permissions: ["students.view"] },
      { label: "Formateurs", href: "/scolarite/teachers", icon: Users, permissions: ["teachers.view"] },
      { label: "Formations", href: "/scolarite/programs", icon: BookOpen, permissions: ["programs.view"] },
      { label: "Cours", href: "/scolarite/courses", icon: BookOpen, permissions: ["courses.view"] },
      { label: "Classes", href: "/scolarite/classes", icon: School, permissions: ["classes.view"] },
      { label: "Inscriptions", href: "/scolarite/enrollments", icon: FileText, permissions: ["enrollments.view"] },
      { label: "Emploi du temps", href: "/scolarite/schedules", icon: CalendarDays, permissions: ["schedules.view"] },
      { label: "Présences", href: "/scolarite/attendance", icon: ClipboardCheck, permissions: ["attendance.view"] },
      { label: "Évaluations", href: "/scolarite/assessments", icon: ClipboardCheck, permissions: ["assessments.view"] },
      { label: "Notes", href: "/scolarite/grades", icon: Award, permissions: ["grades.view"] },
      { label: "Documents", href: "/scolarite/documents", icon: FileText, permissions: ["documents.view"] },
      { label: "Certificats", href: "/scolarite/certificates", icon: Award, permissions: ["certificates.view"] },
    ],
  },
  {
    label: "Comptabilité",
    items: [
      { label: "Paiements", href: "/comptabilite/payments", icon: Wallet, permissions: ["payments.view"] },
      { label: "Remboursements", href: "/comptabilite/refunds", icon: Wallet, permissions: ["refunds.view"] },
      { label: "Dépenses", href: "/comptabilite/expenses", icon: Wallet, permissions: ["expenses.view"] },
    ],
  },
  {
    label: "Espaces",
    items: [
      { label: "Espace Formateur", href: "/formateur", icon: GraduationCap, permissions: ["attendance.view"] },
      { label: "Espace Étudiant", href: "/etudiant", icon: GraduationCap, permissions: ["students.view"] },
    ],
  },
];
