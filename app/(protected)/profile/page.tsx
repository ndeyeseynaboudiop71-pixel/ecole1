import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { createServerClient } from "@/lib/supabase/server";
import { ProfileClient } from "@/components/profile/profile-client";
import type { ProfileData } from "@/components/profile/profile-client";

interface UserRoleRow {
  role_id: string;
  roles: { id: string; code: string; name: string };
}

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const supabase = await createServerClient();
  const { data: userRolesData } = await supabase
    .from("user_roles")
    .select("role_id, roles!inner(id, code, name)")
    .eq("user_id", user.id);

  const userRoles = (userRolesData as unknown as UserRoleRow[] | null) ?? [];
  const roles = userRoles.map((ur) => ur.roles.name);

  const profileData: ProfileData = {
    id: user.id,
    email: user.email,
    firstName: user.profile?.first_name ?? "",
    lastName: user.profile?.last_name ?? "",
    phone: user.profile?.phone ?? "",
    avatarUrl: user.profile?.avatar_url ?? null,
    createdAt: user.profile?.created_at ?? "",
    institutionName: user.institution?.name ?? null,
    roles,
  };

  return <ProfileClient user={profileData} />;
}
