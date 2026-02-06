import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { cn } from "../components/ui/cn";
import {
  Monitor, TrendingUp, Wrench, XCircle, Building2, MapPin,
  AlertTriangle, Clock, ArrowUpRight, ArrowDownRight
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const PARCS = [
  { name: "IDF — Paris",       bornes: 186, total: 845, color: "bg-indigo-500" },
  { name: "Bretagne",          bornes: 142, total: 845, color: "bg-blue-500" },
  { name: "Rhône-Alpes",       bornes: 128, total: 845, color: "bg-emerald-500" },
  { name: "PACA",              bornes: 104, total: 845, color: "bg-amber-500" },
  { name: "Grand Ouest",       bornes: 98,  total: 845, color: "bg-pink-500" },
  { name: "Grand Est",         bornes: 112, total: 845, color: "bg-violet-500" },
  { name: "Occitanie",         bornes: 75,  total: 845, color: "bg-teal-500" },
];

const RECENT_ALERTS = [
  { id: 1, borne: "S332", location: "Plérin",   msg: "Hors-ligne depuis 2h",       severity: "critical" },
  { id: 2, borne: "S401", location: "Lyon",     msg: "Batterie faible (12%)",       severity: "warning" },
  { id: 3, borne: "S289", location: "Nantes",   msg: "Erreur sync firmware v3.2",   severity: "warning" },
  { id: 4, borne: "S150", location: "Paris 11", msg: "Température élevée (68°C)",   severity: "critical" },
  { id: 5, borne: "S478", location: "Rennes",   msg: "Écran non détecté",           severity: "warning" },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Firmware v3.2.1 déployé", target: "12 bornes IDF",       time: "il y a 15 min" },
  { id: 2, action: "Export CSV terminé",       target: "bornes_export_02.csv", time: "il y a 1h" },
  { id: 3, action: "Borne S401 redémarrée",   target: "Lyon — Centre",         time: "il y a 2h" },
  { id: 4, action: "Ticket #1842 créé",        target: "Problème affichage",    time: "il y a 3h" },
  { id: 5, action: "Maintenance planifiée",    target: "8 bornes Bretagne",     time: "hier" },
];

/* ── Page ──────────────────────────────────────────── */

export default function BornesDashboard() {
  return (
    <AppShell currentApp="Bornes Manager" activeKey="dashboard">
      <PageHeader
        title="Vue d'ensemble"
        subtitle="Dashboard Bornes Manager"
      />

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard title="Bornes totales" value="845" icon={Monitor} colorIndex={0} />
        <KpiCard title="En agence" value="363" icon={MapPin} colorIndex={2} />
        <KpiCard title="En SAV" value="34" icon={Wrench} colorIndex={4} />
        <KpiCard title="Hors service" value="28" icon={XCircle} colorIndex={1} />
      </div>

      {/* Stats row */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStat icon={TrendingUp} label="Croissance" value="+12%" trend="up" />
        <MiniStat icon={Clock} label="Uptime moyen" value="98.4%" trend="up" />
        <MiniStat icon={AlertTriangle} label="Alertes actives" value="7" trend="down" />
        <MiniStat icon={Wrench} label="Maintenances" value="3" />
      </div>

      {/* Main content: Répartition + Alerts + Activity */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Répartition par parc */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Répartition par parc</span>
            </div>
            <span className="text-[11px] text-[--k-muted]">{PARCS.length} parcs</span>
          </div>
          <div className="p-4 space-y-3">
            {PARCS.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-[130px] shrink-0 text-[12px] font-medium text-[--k-text] truncate">{p.name}</div>
                <div className="flex-1 h-2 rounded-full bg-[--k-surface-2] overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", p.color)}
                    style={{ width: `${(p.bornes / p.total) * 100}%` }}
                  />
                </div>
                <div className="w-[44px] text-right text-[12px] font-semibold tabular-nums text-[--k-text]">{p.bornes}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes récentes */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-[13px] font-semibold text-[--k-text]">Alertes récentes</span>
            </div>
            <button className="text-[11px] font-medium text-[--k-primary] hover:underline">Tout voir</button>
          </div>
          <div className="divide-y divide-[--k-border]">
            {RECENT_ALERTS.map((a) => (
              <div key={a.id} className="flex items-start gap-2.5 px-4 py-2.5">
                <span className={cn(
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  a.severity === "critical" ? "bg-red-500" : "bg-amber-400"
                )} />
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium text-[--k-text]">
                    <span className="font-semibold">{a.borne}</span>
                    <span className="text-[--k-muted]"> — {a.location}</span>
                  </div>
                  <div className="text-[11px] text-[--k-muted]">{a.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="mt-4 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
        <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[--k-primary]" />
            <span className="text-[13px] font-semibold text-[--k-text]">Activité récente</span>
          </div>
        </div>
        <div className="divide-y divide-[--k-border]">
          {RECENT_ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-2">
              <div className="min-w-0 flex-1">
                <span className="text-[12px] font-medium text-[--k-text]">{a.action}</span>
                <span className="text-[12px] text-[--k-muted]"> — {a.target}</span>
              </div>
              <span className="text-[11px] text-[--k-muted] shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

/* ── Sub-component ────────────────────────────────── */

function MiniStat({ icon: Icon, label, value, trend }) {
  const trendColor = trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "";
  const trendBg = trend === "up" ? "bg-emerald-50" : trend === "down" ? "bg-red-50" : "bg-[--k-primary-2]";
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] px-4 py-3">
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", trendBg)}>
        <Icon className={cn("h-[18px] w-[18px]", trendColor || "text-[--k-primary]")} />
      </div>
      <div>
        <div className="text-[11px] text-[--k-muted]">{label}</div>
        <div className="flex items-center gap-1">
          <span className="text-[18px] font-bold tabular-nums text-[--k-text]">{value}</span>
          {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />}
          {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />}
        </div>
      </div>
    </div>
  );
}
