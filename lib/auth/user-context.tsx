"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { Permission } from "@/lib/rbac/permissions";
import { hasPermission, hasAnyPermission, hasAllPermissions } from "@/lib/rbac/guard";

export interface ClientUser {
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
  roles: string[];
  permissions: Permission[];
  isSuperAdmin: boolean;
}

interface UserContextValue {
  user: ClientUser | null;
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
  canAll: (permissions: Permission[]) => boolean;
  hasRole: (role: string) => boolean;
  fullName: string;
  initials: string;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: ClientUser | null;
  children: React.ReactNode;
}) {
  const can = useCallback(
    (permission: Permission) => {
      if (!user) return false;
      if (user.isSuperAdmin) return true;
      return hasPermission(user.permissions, permission);
    },
    [user]
  );

  const canAny = useCallback(
    (permissions: Permission[]) => {
      if (!user) return false;
      if (user.isSuperAdmin) return true;
      return hasAnyPermission(user.permissions, permissions);
    },
    [user]
  );

  const canAll = useCallback(
    (permissions: Permission[]) => {
      if (!user) return false;
      if (user.isSuperAdmin) return true;
      return hasAllPermissions(user.permissions, permissions);
    },
    [user]
  );

  const hasRole = useCallback(
    (role: string) => user?.roles.includes(role) ?? false,
    [user]
  );

  const fullName = useMemo(() => {
    if (!user?.profile) return user?.email ?? "";
    const first = user.profile.first_name?.trim();
    const last = user.profile.last_name?.trim();
    if (first && last) return `${first} ${last}`;
    return first || last || user.email;
  }, [user]);

  const initials = useMemo(() => {
    if (!user?.profile) return user?.email?.[0]?.toUpperCase() ?? "?";
    const f = user.profile.first_name?.[0] ?? "";
    const l = user.profile.last_name?.[0] ?? "";
    if (f || l) return `${f}${l}`.toUpperCase();
    return user.email?.[0]?.toUpperCase() ?? "?";
  }, [user]);

  return (
    <UserContext.Provider value={{ user, can, canAny, canAll, hasRole, fullName, initials }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
