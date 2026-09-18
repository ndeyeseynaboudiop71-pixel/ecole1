import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Suspense fallback={<div className="text-sm text-muted-foreground">Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
