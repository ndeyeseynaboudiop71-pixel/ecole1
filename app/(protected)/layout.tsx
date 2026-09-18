import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { UserProvider } from "@/lib/auth/user-context";
import { AppShell } from "@/components/layout/app-shell";
import type { ClientUser } from "@/lib/auth/user-context";
import type { Permission } from "@/lib/rbac/permissions";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) redirect("/login");

  const clientUser: ClientUser = {
    id: sessionUser.id,
    email: sessionUser.email,
    profile: sessionUser.profile,
    institution: sessionUser.institution,
    roles: sessionUser.roles,
    permissions: sessionUser.permissions as Permission[],
    isSuperAdmin: sessionUser.isSuperAdmin,
  };

  return (
    <UserProvider user={clientUser}>
      <AppShell>{children}</AppShell>
    </UserProvider>
  );
}
