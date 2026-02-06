import React, { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { FilterBar } from "../components/FilterBar";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";

/* ── Mock data ────────────────────────────────────── */

const PRODUITS = [
  { id: "PRD-001", name: "Câble USB-C 2m",          categorie: "Câbles",      stock: 1240, seuil: 200,  prix: "4,50 €",  site: "Rennes" },
  { id: "PRD-002", name: "Écran tactile 10\"",        categorie: "Écrans",      stock: 342,  seuil: 100,  prix: "89,00 €", site: "Paris" },
  { id: "PRD-003", name: "Batterie Li-ion 5000mAh",  categorie: "Batteries",   stock: 890,  seuil: 200,  prix: "12,30 €", site: "Lyon" },
  { id: "PRD-004", name: "Carte mère v4.1",          categorie: "Composants",  stock: 215,  seuil: 50,   prix: "45,00 €", site: "Rennes" },
  { id: "PRD-005", name: "Module WiFi 6E",           categorie: "Composants",  stock: 678,  seuil: 150,  prix: "18,90 €", site: "Paris" },
  { id: "PRD-006", name: "Support mural acier",      categorie: "Accessoires", stock: 456,  seuil: 100,  prix: "22,50 €", site: "Rennes" },
  { id: "PRD-007", name: "Boîtier aluminium XL",     categorie: "Boîtiers",    stock: 89,   seuil: 30,   prix: "65,00 €", site: "Lyon" },
  { id: "PRD-008", name: "Alimentation 12V 5A",      categorie: "Alimentation", stock: 534, seuil: 100,  prix: "15,80 €", site: "Paris" },
  { id: "PRD-009", name: "Câble Ethernet Cat6 3m",   categorie: "Câbles",      stock: 2100, seuil: 300,  prix: "3,20 €",  site: "Rennes" },
  { id: "PRD-010", name: "Ventilateur 40mm",         categorie: "Composants",  stock: 320,  seuil: 80,   prix: "6,90 €",  site: "Lyon" },
  { id: "PRD-011", name: "Écran LED 15\"",            categorie: "Écrans",      stock: 156,  seuil: 40,   prix: "125,00 €", site: "Paris" },
  { id: "PRD-012", name: "Connecteur RJ45 (x100)",   categorie: "Câbles",      stock: 45,   seuil: 20,   prix: "8,50 €",  site: "Rennes" },
];

function stockLevel(stock, seuil) {
  const ratio = stock / seuil;
  if (ratio <= 0.5) return "critique";
  if (ratio <= 1) return "bas";
  return "ok";
}

const LEVEL_COLORS = {
  ok:       "bg-emerald-50 text-emerald-600",
  bas:      "bg-amber-50 text-amber-600",
  critique: "bg-red-50 text-red-600",
};

/* ── Page ──────────────────────────────────────────── */

export default function StockList() {
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return PRODUITS;
    return PRODUITS.filter(
      (r) => r.name.toLowerCase().includes(s) || r.categorie.toLowerCase().includes(s) || r.id.toLowerCase().includes(s)
    );
  }, [search]);

  return (
    <AppShell currentApp="Stock Manager" activeKey="produits">
      <PageHeader
        title="Produits"
        subtitle="Catalogue des produits"
        primaryLabel="+ Nouveau produit"
        secondaryLabel="Importer"
      />

      <div className="mb-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard title="Produits" value="121" colorIndex={0} />
        <KpiCard title="Stock total" value="8 814" colorIndex={2} />
        <KpiCard title="Catégories" value="8" colorIndex={3} />
        <KpiCard title="Alertes stock" value="12" colorIndex={1} />
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        right={
          <div className="flex items-center gap-1.5">
            <Badge>Catégorie ▾</Badge>
            <Badge>Site ▾</Badge>
            <Badge>Niveau ▾</Badge>
          </div>
        }
      />

      <div className="rounded-xl border border-[--k-border] bg-white overflow-hidden">
        <div className="flex items-baseline justify-between gap-3 border-b border-[--k-border] px-4 py-2.5">
          <div className="text-[13px] font-semibold">Produits</div>
          <div className="text-xs text-[--k-muted]">{rows.length} éléments</div>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
                <th className="px-4 py-2 text-left text-xs font-medium">Réf.</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Produit</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Catégorie</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Seuil</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Niveau</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Prix unit.</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Site</th>
                <th className="px-4 py-2 text-right text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const level = stockLevel(r.stock, r.seuil);
                return (
                  <tr key={r.id} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                    <td className="px-4 py-1.5 text-[--k-muted] tabular-nums">{r.id}</td>
                    <td className="px-4 py-1.5 font-medium text-[--k-text]">{r.name}</td>
                    <td className="px-4 py-1.5 text-[--k-muted]">{r.categorie}</td>
                    <td className="px-4 py-1.5 font-semibold tabular-nums">{r.stock.toLocaleString("fr-FR")}</td>
                    <td className="px-4 py-1.5 text-[--k-muted] tabular-nums">{r.seuil}</td>
                    <td className="px-4 py-1.5">
                      <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", LEVEL_COLORS[level])}>
                        {level}
                      </span>
                    </td>
                    <td className="px-4 py-1.5 tabular-nums">{r.prix}</td>
                    <td className="px-4 py-1.5 text-[--k-muted]">{r.site}</td>
                    <td className="px-4 py-1.5 text-right">
                      <Button variant="ghost" size="sm">...</Button>
                    </td>
                  </tr>
                );
              })}
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
