import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = { title: "Mot de passe oublié" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <ForgotPasswordForm />
    </div>
  );
}
