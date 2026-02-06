import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/Button";
import { ArrowRight } from "lucide-react";

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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {APPS.map((a) => (
          <a
            key={a.name}
            href={a.to}
            className="group flex items-center justify-between gap-3 rounded-xl border border-[--k-border] bg-white px-4 py-3 transition hover:border-[--k-primary-border] hover:bg-[--k-primary-2]/30"
          >
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[--k-text]">{a.name}</div>
              <div className="text-xs text-[--k-muted] truncate">{a.desc}</div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-[--k-muted] transition group-hover:text-[--k-primary] group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
    </AppShell>
  );
}
