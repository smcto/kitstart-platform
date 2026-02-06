import React, { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { FilterBar } from "../components/FilterBar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";

/* ── Mock data ────────────────────────────────────── */

const ANTENNES_DATA = [
  { id: "ANT-001", name: "Rennes Centre",      ville: "Rennes",    type: "classik",  status: "active",  dernierEvent: "il y a 2h" },
  { id: "ANT-002", name: "Vannes Gare",        ville: "Vannes",    type: "spherik",  status: "active",  dernierEvent: "il y a 5h" },
  { id: "ANT-003", name: "Lyon Bellecour",      ville: "Lyon",      type: "classik",  status: "active",  dernierEvent: "il y a 1h" },
  { id: "ANT-004", name: "Paris Opéra",         ville: "Paris",     type: "prestige", status: "active",  dernierEvent: "il y a 30 min" },
  { id: "ANT-005", name: "Nantes Commerce",     ville: "Nantes",    type: "spherik",  status: "maintenance", dernierEvent: "hier" },
  { id: "ANT-006", name: "Brest Liberté",       ville: "Brest",     type: "classik",  status: "active",  dernierEvent: "il y a 3h" },
  { id: "ANT-007", name: "Lorient Port",        ville: "Lorient",   type: "classik",  status: "active",  dernierEvent: "il y a 4h" },
  { id: "ANT-008", name: "Marseille Vieux-Port", ville: "Marseille", type: "spherik",  status: "inactive", dernierEvent: "il y a 3j" },
  { id: "ANT-009", name: "Toulouse Capitole",   ville: "Toulouse",  type: "classik",  status: "active",  dernierEvent: "il y a 2h" },
  { id: "ANT-010", name: "Bordeaux St-Catherine", ville: "Bordeaux", type: "prestige", status: "active", dernierEvent: "il y a 6h" },
  { id: "ANT-011", name: "Strasbourg Place",    ville: "Strasbourg", type: "spherik", status: "active",  dernierEvent: "il y a 1h" },
  { id: "ANT-012", name: "Nice Promenade",      ville: "Nice",      type: "classik",  status: "active",  dernierEvent: "il y a 45 min" },
];

const TYPE_COLORS = {
  classik:  "bg-blue-50 text-blue-600",
  spherik:  "bg-violet-50 text-violet-600",
  prestige: "bg-amber-50 text-amber-600",
};

const STATUS_COLORS = {
  active:      "bg-emerald-50 text-emerald-600",
  maintenance: "bg-amber-50 text-amber-600",
  inactive:    "bg-red-50 text-red-600",
};

/* ── Page ──────────────────────────────────────────── */

export default function AntennesList() {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return ANTENNES_DATA;
    return ANTENNES_DATA.filter(
      (r) => r.name.toLowerCase().includes(s) || r.ville.toLowerCase().includes(s) || r.id.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <AppShell currentApp="Antennes Selfizee" activeKey="antennes">
      <PageHeader
        title="Antennes"
        subtitle="Liste et gestion du réseau"
        primaryLabel="+ Nouvelle antenne"
        secondaryLabel="Exporter"
      />

      <div className="mb-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard title="Total antennes" value="129" colorIndex={0} />
        <KpiCard title="Actives" value="118" colorIndex={2} />
        <KpiCard title="En maintenance" value="4" colorIndex={4} />
        <KpiCard title="Inactives" value="7" colorIndex={1} />
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        right={
          <div className="flex items-center gap-1.5">
            <Badge>Type ▾</Badge>
            <Badge>Statut ▾</Badge>
            <Badge>Ville ▾</Badge>
          </div>
        }
      />

      <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
        <div className="flex items-baseline justify-between gap-3 border-b border-[--k-border] px-4 py-2.5">
          <div className="text-[13px] font-semibold">Antennes</div>
          <div className="text-xs text-[--k-muted]">{rows.length} éléments</div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
                <th className="px-4 py-2 text-left text-xs font-medium">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Nom</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Ville</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Statut</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Dernier événement</th>
                <th className="px-4 py-2 text-right text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                  <td className="px-4 py-1.5 text-[--k-muted] tabular-nums">{r.id}</td>
                  <td className="px-4 py-1.5 font-medium text-[--k-text]">{r.name}</td>
                  <td className="px-4 py-1.5">{r.ville}</td>
                  <td className="px-4 py-1.5">
                    <span className={cn("rounded px-1.5 py-0.5 text-[11px] font-medium", TYPE_COLORS[r.type])}>
                      {r.type}
                    </span>
                  </td>
                  <td className="px-4 py-1.5">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", STATUS_COLORS[r.status])}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-1.5 text-[--k-muted]">{r.dernierEvent}</td>
                  <td className="px-4 py-1.5 text-right">
                    <Button variant="ghost" size="sm">...</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2 text-xs text-[--k-muted]">
          <span>{rows.length} résultat{rows.length > 1 ? "s" : ""}</span>
        </div>
      </div>
    </AppShell>
  );
}
