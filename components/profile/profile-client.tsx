"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase as supabaseClient } from "@/lib/supabase/client";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader as Loader2, Save } from "lucide-react";

export interface ProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string | null;
  createdAt: string;
  institutionName: string | null;
  roles: string[];
}

export function ProfileClient({ user }: { user: ProfileData }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
  const createdDate = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleSave() {
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabaseClient
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName, phone })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      setError("Erreur lors de la mise à jour du profil.");
      return;
    }

    setMessage("Profil mis à jour avec succès.");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Mon profil" description="Vos informations personnelles" />

      {message && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Identité</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl ?? undefined} />
              <AvatarFallback className="text-2xl font-semibold">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-lg font-semibold">{firstName} {lastName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {user.roles.map((role) => (
                <Badge key={role} variant="secondary">{role}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Non renseigné" />
            </div>
            <div className="space-y-2">
              <Label>Établissement</Label>
              <Input value={user.institutionName ?? "Non assigné"} disabled />
            </div>
            <div className="space-y-2">
              <Label>Membre depuis</Label>
              <p className="text-sm text-muted-foreground">{createdDate}</p>
            </div>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
