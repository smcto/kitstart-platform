import React, { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { FilterBar } from "../components/FilterBar";
import { DataTable } from "../components/DataTable";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export default function BornesList() {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const all = Array.from({ length: 12 }).map((_, i) => ({
      name: `S${330 + i}`,
      id: String(1000 + i),
      location: ["Plérin", "Lyon", "Nantes", "Paris"][i % 4],
      status: ["ONLINE", "WARNING", "OFFLINE"][i % 3],
      sync: ["3 min", "2h", "—"][i % 3],
    }));
    const s = search.trim().toLowerCase();
    if (!s) return all;
    return all.filter(r => r.name.toLowerCase().includes(s) || r.location.toLowerCase().includes(s));
  }, [search]);

  return (
    <AppShell currentApp="Bornes Manager" activeKey="devices">
      <PageHeader
        title="Bornes"
        subtitle="Gestion du parc • filtres et actions standard"
        primaryLabel="+ Nouvelle borne"
        secondaryLabel="Exporter"
        onPrimary={() => alert("Créer")}
        onSecondary={() => alert("Exporter")}
      />

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Bornes" subtitle="Derniers 7 jours" value="650" />
        <KpiCard title="En alerte" subtitle="Derniers 7 jours" value="12" />
        <KpiCard title="Événements (7j)" subtitle="Derniers 7 jours" value="184" />
        <KpiCard title="Téléchargements" subtitle="Derniers 7 jours" value="2 410" />
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        right={
          <div className="flex items-center gap-2">
            <Badge>Statut ▾</Badge>
            <Badge>Antenne ▾</Badge>
            <Button variant="secondary">Importer</Button>
          </div>
        }
      />

      <DataTable
        title="Bornes"
        subtitle="Table standard : actions à droite"
        rows={rows}
      />
    </AppShell>
  );
}
