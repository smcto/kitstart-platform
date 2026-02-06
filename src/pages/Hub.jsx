import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const APPS = [
  { name: "Bornes Manager", desc: "Parc, events, logs, diagnostics", to: "/bornes" },
  { name: "Antennes", desc: "Réseau & supervision", to: "/antennes" },
  { name: "Stocks", desc: "Consommables & alertes", to: "/stocks" },
  { name: "Support", desc: "Tickets & suivi", to: "/support" },
  { name: "Catalog IA", desc: "Génération de contenus / visuels", to: "/catalog" },
];

export default function Hub() {
  return (
    <AppShell currentApp="Konitys Hub" activeKey="dashboard">
      <PageHeader
        title="Konitys Hub"
        subtitle="Accès rapide à vos applications"
        primaryLabel="Ajouter une app"
        secondaryLabel="Gérer les accès"
        onPrimary={() => alert("Ajouter")}
        onSecondary={() => alert("Accès")}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {APPS.map((a) => (
          <Card key={a.name}>
            <CardHeader>
              <CardTitle>{a.name}</CardTitle>
              <CardDescription>{a.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="primary" onClick={() => (window.location.href = a.to)}>
                Ouvrir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
