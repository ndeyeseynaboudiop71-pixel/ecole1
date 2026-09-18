import { createServerClient } from "@/lib/supabase/server";
import type { Permission, Role } from "@/lib/rbac/permissions";

export interface SessionUser {
  id: string;
  email: string;
  profile: {
    id: string;
    institution_id: string | null;
    first_name: string;
    last_name: string;
    phone: string | null;
    avatar_url: string | null;
    is_active: boolean;
    created_at: string;
  } | null;
  institution: {
    id: string;
    name: string;
    code: string;
    logo_url: string | null;
  } | null;
  roles: Role[];
  permissions: Permission[];
  isSuperAdmin: boolean;
}

const VALID_ROLES: Role[] = [
  "super_admin",
  "direction",
  "administration",
  "scolarite",
  "comptabilite",
  "formateur",
  "etudiant",
];

interface ProfileRow {
  id: string;
  institution_id: string | null;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface InstitutionRow {
  id: string;
  name: string;
  code: string;
  logo_url: string | null;
}

interface UserRoleRow {
  role_id: string;
  roles: { id: string; code: string; name: string };
}

interface RolePermissionRow {
  permissions: { code: string };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const userId = session.user.id;
  const email = session.user.email ?? "";

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const profile = (profileData as unknown as ProfileRow | null) ?? null;

  let institution: SessionUser["institution"] = null;
  if (profile?.institution_id) {
    const { data: instData } = await supabase
      .from("institutions")
      .select("id, name, code, logo_url")
      .eq("id", profile.institution_id)
      .single();
    const inst = (instData as unknown as InstitutionRow | null) ?? null;
    if (inst) institution = inst;
  }

  const { data: userRolesData } = await supabase
    .from("user_roles")
    .select("role_id, roles!inner(id, code, name)")
    .eq("user_id", userId);

  const userRoles = (userRolesData as unknown as UserRoleRow[] | null) ?? [];

  const roles: Role[] = userRoles
    .map((ur) => ur.roles.code as Role)
    .filter((c) => VALID_ROLES.includes(c));

  const isSuperAdmin = roles.includes("super_admin");

  let permissions: Permission[] = [];
  if (!isSuperAdmin && roles.length > 0) {
    const { data: rolePermsData } = await supabase
      .from("role_permissions")
      .select("permissions!inner(code)")
      .in(
        "role_id",
        userRoles.map((ur) => ur.role_id)
      );

    const rolePerms = (rolePermsData as unknown as RolePermissionRow[] | null) ?? [];

    const seen = new Set<string>();
    for (const rp of rolePerms) {
      const code = rp.permissions.code;
      if (!seen.has(code)) {
        seen.add(code);
        permissions.push(code as Permission);
      }
    }
  }

  return {
    id: userId,
    email,
    profile,
    institution,
    roles,
    permissions,
    isSuperAdmin,
  };
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requirePermission(
  permission: Permission
): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.isSuperAdmin || user.permissions.includes(permission)) return user;
  throw new Error("FORBIDDEN");
}
