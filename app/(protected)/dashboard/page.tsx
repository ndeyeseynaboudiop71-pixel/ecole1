import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth/session";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import type { DashboardStats } from "@/components/dashboard/dashboard-client";

interface TeacherRow {
  id: string;
  profile_id: string | null;
  institution_id: string;
  teacher_number: string;
  specialization: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface StudentRow {
  id: string;
  profile_id: string | null;
  institution_id: string;
  applicant_id: string | null;
  student_number: string;
  admission_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PaymentPlanRow {
  total_amount: number;
}

interface PaymentRow {
  amount: number;
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const supabase = await createServerClient();
  const role = user.roles[0] ?? "etudiant";
  const institutionId = user.profile?.institution_id ?? null;
  const stats: DashboardStats = {};

  if (user.isSuperAdmin || ["direction", "administration", "scolarite"].includes(role)) {
    const studentsQ = supabase.from("students").select("id", { count: "exact", head: true });
    if (!user.isSuperAdmin && institutionId) studentsQ.eq("institution_id", institutionId);
    const { count: sc } = await studentsQ;
    stats.students = sc ?? 0;

    const coursesQ = supabase.from("courses").select("id", { count: "exact", head: true });
    if (!user.isSuperAdmin && institutionId) coursesQ.eq("institution_id", institutionId);
    const { count: cc } = await coursesQ;
    stats.courses = cc ?? 0;

    const classesQ = supabase.from("classes").select("id", { count: "exact", head: true });
    if (!user.isSuperAdmin && institutionId) classesQ.eq("institution_id", institutionId);
    const { count: clc } = await classesQ;
    stats.classes = clc ?? 0;

    const applicantsQ = supabase.from("applicants").select("id", { count: "exact", head: true });
    if (!user.isSuperAdmin && institutionId) applicantsQ.eq("institution_id", institutionId);
    const { count: ac } = await applicantsQ;
    stats.applicants = ac ?? 0;
  }

  if (user.isSuperAdmin || role === "comptabilite") {
    const plansQ = supabase.from("payment_plans").select("total_amount");
    if (!user.isSuperAdmin && institutionId) plansQ.eq("institution_id", institutionId);
    const { data: plansData } = await plansQ;
    const plans = (plansData as unknown as PaymentPlanRow[] | null) ?? [];
    stats.totalBilled = plans.reduce((s, p) => s + (p.total_amount ?? 0), 0);

    const { data: paymentsData } = await supabase
      .from("payments")
      .select("amount")
      .eq("status", "completed");
    const payments = (paymentsData as unknown as PaymentRow[] | null) ?? [];
    stats.totalCollected = payments.reduce((s, p) => s + (p.amount ?? 0), 0);
    stats.totalRemaining = (stats.totalBilled ?? 0) - (stats.totalCollected ?? 0);
  }

  if (role === "formateur") {
    const { data: teacherData } = await supabase
      .from("teachers")
      .select("*")
      .eq("profile_id", user.id)
      .single();
    const teacher = (teacherData as unknown as TeacherRow | null) ?? null;

    if (teacher) {
      const { count: sc } = await supabase
        .from("schedules")
        .select("id", { count: "exact", head: true })
        .eq("teacher_id", teacher.id);
      stats.mySchedules = sc ?? 0;

      const { count: ac } = await supabase
        .from("assessments")
        .select("id", { count: "exact", head: true })
        .eq("teacher_id", teacher.id)
        .eq("status", "draft");
      stats.pendingAssessments = ac ?? 0;
    }
  }

  if (role === "etudiant") {
    const { data: studentData } = await supabase
      .from("students")
      .select("*")
      .eq("profile_id", user.id)
      .single();
    const student = (studentData as unknown as StudentRow | null) ?? null;

    if (student) {
      stats.studentStatus = student.status;
      const { count: ec } = await supabase
        .from("enrollments")
        .select("id", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("status", "active");
      stats.enrollments = ec ?? 0;

      const { count: abc } = await supabase
        .from("attendance")
        .select("id", { count: "exact", head: true })
        .eq("student_id", student.id)
        .eq("status", "absent");
      stats.absences = abc ?? 0;

      const { data: ppData } = await supabase
        .from("payment_plans")
        .select("total_amount")
        .eq("student_id", student.id);
      const pp = (ppData as unknown as PaymentPlanRow[] | null) ?? [];
      stats.totalBilled = pp.reduce((s, p) => s + (p.total_amount ?? 0), 0);
    }
  }

  return <DashboardClient role={role} stats={stats} />;
}
