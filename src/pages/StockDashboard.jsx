import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { cn } from "../components/ui/cn";
import {
  Package, ShoppingCart, AlertTriangle, TrendingUp,
  Truck, Building2, ArrowUpRight, ArrowDownRight, Clock
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const COMMANDES_EN_COURS = [
  { id: "CMD-2026-041", fournisseur: "Distri Pro",     produits: 3, total: "2 340 €",  statut: "expédiée",   date: "04/02/2026" },
  { id: "CMD-2026-040", fournisseur: "Tech Supply",    produits: 5, total: "8 120 €",  statut: "confirmée",  date: "03/02/2026" },
  { id: "CMD-2026-039", fournisseur: "Euro Composants", produits: 2, total: "1 450 €", statut: "en attente", date: "01/02/2026" },
  { id: "CMD-2026-038", fournisseur: "Parts & Co",     produits: 7, total: "4 890 €",  statut: "expédiée",   date: "30/01/2026" },
];

const ALERTES_STOCK = [
  { id: 1, produit: "Câble USB-C 2m",        stock: 8,   seuil: 20, site: "Entrepôt Rennes" },
  { id: 2, produit: "Écran tactile 10\"",     stock: 3,   seuil: 10, site: "Entrepôt Paris" },
  { id: 3, produit: "Batterie Li-ion 5000mAh", stock: 12, seuil: 25, site: "Entrepôt Lyon" },
  { id: 4, produit: "Carte mère v4.1",       stock: 5,   seuil: 15, site: "Entrepôt Rennes" },
  { id: 5, produit: "Boîtier aluminium XL",  stock: 2,   seuil: 8,  site: "Entrepôt Paris" },
];

const TOP_PRODUITS = [
  { name: "Câble USB-C 2m",         stock: 1240, mouvement: "+320",  tendance: "up" },
  { name: "Écran tactile 10\"",      stock: 342,  mouvement: "-45",   tendance: "down" },
  { name: "Batterie Li-ion 5000mAh", stock: 890,  mouvement: "+120",  tendance: "up" },
  { name: "Carte mère v4.1",        stock: 215,  mouvement: "-30",   tendance: "down" },
  { name: "Module WiFi 6E",         stock: 678,  mouvement: "+85",   tendance: "up" },
  { name: "Support mural acier",    stock: 456,  mouvement: "+60",   tendance: "up" },
];

const STATUT_COLORS = {
  "expédiée":   "bg-blue-50 text-blue-600",
  "confirmée":  "bg-emerald-50 text-emerald-600",
  "en attente": "bg-amber-50 text-amber-600",
};

const FOURNISSEURS = [
  { name: "Distri Pro",       produits: 34, commandes: 12, fiabilite: 98 },
  { name: "Tech Supply",      produits: 28, commandes: 8,  fiabilite: 95 },
  { name: "Euro Composants",  produits: 45, commandes: 15, fiabilite: 92 },
  { name: "Parts & Co",       produits: 19, commandes: 6,  fiabilite: 97 },
];

/* ── Page ──────────────────────────────────────────── */

export default function StockDashboard() {
  return (
    <AppShell currentApp="Stock Manager" activeKey="dashboard">
      <PageHeader
        title="Tableau de bord"
        subtitle="Stock Manager — Vue d'ensemble"
      />

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard title="Produits" value="121" colorIndex={0} />
        <KpiCard title="Stock total" value="8 814" colorIndex={2} />
        <KpiCard title="Unités possibles" value="4 435" colorIndex={3} />
        <KpiCard title="Valeur stock" value="101 935 €" colorIndex={5} />
        <KpiCard title="Alertes" value="12" colorIndex={1} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Commandes en cours */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Commandes en cours</span>
            </div>
            <button className="text-[11px] font-medium text-[--k-primary] hover:underline">Toutes les commandes</button>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
                <th className="px-4 py-2 text-left text-xs font-medium">Réf.</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Fournisseur</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Produits</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Total</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Statut</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {COMMANDES_EN_COURS.map((c) => (
                <tr key={c.id} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                  <td className="px-4 py-2 font-medium tabular-nums text-[--k-primary]">{c.id}</td>
                  <td className="px-4 py-2 text-[--k-text]">{c.fournisseur}</td>
                  <td className="px-4 py-2 tabular-nums">{c.produits}</td>
                  <td className="px-4 py-2 font-medium tabular-nums">{c.total}</td>
                  <td className="px-4 py-2">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", STATUT_COLORS[c.statut])}>
                      {c.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-[--k-muted] tabular-nums">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alertes stock */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-[13px] font-semibold text-[--k-text]">Alertes stock</span>
            </div>
            <span className="text-[11px] font-medium text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">{ALERTES_STOCK.length}</span>
          </div>
          <div className="divide-y divide-[--k-border]">
            {ALERTES_STOCK.map((a) => (
              <div key={a.id} className="px-4 py-2.5">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] font-medium text-[--k-text] truncate">{a.produit}</span>
                  <span className="text-[12px] font-semibold tabular-nums text-red-600">{a.stock}/{a.seuil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[--k-muted]">{a.site}</span>
                  <div className="h-1.5 w-16 rounded-full bg-[--k-surface-2] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-400"
                      style={{ width: `${(a.stock / a.seuil) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Top produits + Fournisseurs */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* Top produits */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Top produits</span>
            </div>
            <span className="text-[11px] text-[--k-muted]">Par volume de stock</span>
          </div>
          <div className="divide-y divide-[--k-border]">
            {TOP_PRODUITS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 px-4 py-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[--k-surface-2] text-[11px] font-semibold text-[--k-muted]">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium text-[--k-text] truncate">{p.name}</div>
                </div>
                <span className="text-[12px] font-semibold tabular-nums text-[--k-text]">{p.stock}</span>
                <span className={cn(
                  "flex items-center gap-0.5 text-[11px] font-medium tabular-nums",
                  p.tendance === "up" ? "text-emerald-600" : "text-red-500"
                )}>
                  {p.tendance === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {p.mouvement}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fournisseurs */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Fournisseurs</span>
            </div>
            <button className="text-[11px] font-medium text-[--k-primary] hover:underline">Tous</button>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
                <th className="px-4 py-2 text-left text-xs font-medium">Nom</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Produits</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Cmd.</th>
                <th className="px-4 py-2 text-left text-xs font-medium">Fiabilité</th>
              </tr>
            </thead>
            <tbody>
              {FOURNISSEURS.map((f) => (
                <tr key={f.name} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                  <td className="px-4 py-2 font-medium text-[--k-text]">{f.name}</td>
                  <td className="px-4 py-2 tabular-nums">{f.produits}</td>
                  <td className="px-4 py-2 tabular-nums">{f.commandes}</td>
                  <td className="px-4 py-2">
                    <span className={cn(
                      "text-[11px] font-semibold tabular-nums",
                      f.fiabilite >= 95 ? "text-emerald-600" : "text-amber-600"
                    )}>
                      {f.fiabilite}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
