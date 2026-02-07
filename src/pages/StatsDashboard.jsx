import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  BarChart3, TrendingUp, PieChart, Activity, Calendar,
  ArrowUpRight, ArrowDownRight, Monitor, Radio, Package
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const OVERVIEW = [
  { label: "Bornes actives", value: "817", change: "+4.2%", up: true, icon: Monitor, color: "from-indigo-500 to-blue-600" },
  { label: "Antennes réseau", value: "129", change: "+8.1%", up: true, icon: Radio, color: "from-sky-400 to-blue-500" },
  { label: "Produits en stock", value: "8 814", change: "-2.3%", up: false, icon: Package, color: "from-emerald-400 to-teal-500" },
  { label: "CA mensuel", value: "48.2k €", change: "+12.4%", up: true, icon: TrendingUp, color: "from-amber-400 to-orange-500" },
];

/* Bar chart: monthly revenue */
const MONTHLY = [
  { month: "Août", value: 32 },
  { month: "Sep", value: 41 },
  { month: "Oct", value: 38 },
  { month: "Nov", value: 44 },
  { month: "Déc", value: 36 },
  { month: "Jan", value: 42 },
  { month: "Fév", value: 48 },
];
const BAR_MAX = Math.max(...MONTHLY.map(m => m.value));

/* Line chart: weekly activity (CSS simulation) */
const WEEKLY_ACTIVITY = [
  { day: "Lun", bornes: 78, antennes: 42, stock: 35 },
  { day: "Mar", bornes: 85, antennes: 45, stock: 42 },
  { day: "Mer", bornes: 92, antennes: 38, stock: 50 },
  { day: "Jeu", bornes: 88, antennes: 52, stock: 45 },
  { day: "Ven", bornes: 95, antennes: 48, stock: 38 },
  { day: "Sam", bornes: 60, antennes: 30, stock: 20 },
  { day: "Dim", bornes: 45, antennes: 22, stock: 15 },
];
const ACTIVITY_MAX = 100;

/* Donut chart: parc distribution */
const DONUT = [
  { label: "Location", value: 360, pct: 55, color: "bg-indigo-500", text: "text-indigo-600" },
  { label: "Loc. financières", value: 262, pct: 30, color: "bg-sky-500", text: "text-sky-600" },
  { label: "Longues durées", value: 14, pct: 8, color: "bg-emerald-500", text: "text-emerald-600" },
  { label: "Autres", value: 42, pct: 7, color: "bg-amber-500", text: "text-amber-600" },
];

/* Horizontal bars: top regions */
const REGIONS = [
  { name: "Bretagne", value: 186, max: 186, color: "bg-indigo-400" },
  { name: "IDF — Paris", value: 152, max: 186, color: "bg-blue-400" },
  { name: "Rhône-Alpes", value: 128, max: 186, color: "bg-emerald-400" },
  { name: "PACA", value: 104, max: 186, color: "bg-amber-400" },
  { name: "Grand Ouest", value: 98, max: 186, color: "bg-rose-400" },
  { name: "Grand Est", value: 89, max: 186, color: "bg-violet-400" },
];

/* Sparkline data: mini trends */
const SPARKLINES = [
  { label: "Uptime", value: "99.4%", data: [95, 97, 98, 96, 99, 98, 99], color: "text-emerald-500", bg: "bg-emerald-400" },
  { label: "Incidents", value: "7", data: [12, 8, 15, 10, 9, 11, 7], color: "text-amber-500", bg: "bg-amber-400" },
  { label: "Satisfaction", value: "4.7/5", data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.5, 4.7], color: "text-blue-500", bg: "bg-blue-400" },
  { label: "Temps réponse", value: "1.2s", data: [1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2], color: "text-indigo-500", bg: "bg-indigo-400" },
];

/* ── Page ──────────────────────────────────────────── */

export default function StatsDashboard() {
  const [period, setPeriod] = useState("7j");

  return (
    <AppShell currentApp="Konitys Hub" activeKey="stats" hubMode>
      <div className="mx-auto max-w-[1100px] px-6 pt-6 pb-16">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[--k-text]">Statistiques</h1>
            <p className="text-sm text-[--k-muted] mt-0.5">Vue d'ensemble des performances</p>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-[--k-border] bg-white p-0.5">
            {["24h", "7j", "30j", "90j"].map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={cn(
                "rounded-lg px-3 py-1.5 text-[12px] font-medium transition",
                period === p ? "bg-[--k-primary] text-white shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
              )}>{p}</button>
            ))}
          </div>
        </div>

        {/* ── KPI row ── */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {OVERVIEW.map(o => {
            const Icon = o.icon;
            return (
              <div key={o.label} className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 shadow-md shadow-black/[0.08]", o.color)}>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/[0.08]" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wide">{o.label}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div className="text-[26px] font-extrabold text-white leading-none">{o.value}</div>
                  <div className="mt-1 flex items-center gap-1 text-[12px] text-white/70">
                    {o.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    <span className="font-medium">{o.change}</span>
                    <span className="text-white/50">vs mois dernier</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Sparklines row ── */}
        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SPARKLINES.map(s => (
            <div key={s.label} className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[--k-muted]">{s.label}</span>
                <span className={cn("text-[16px] font-bold tabular-nums", s.color)}>{s.value}</span>
              </div>
              {/* Mini sparkline bars */}
              <div className="flex items-end gap-1 h-6">
                {s.data.map((v, i) => {
                  const max = Math.max(...s.data);
                  return (
                    <div key={i} className={cn("flex-1 rounded-sm transition-all", s.bg, i === s.data.length - 1 ? "opacity-100" : "opacity-40")}
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts grid ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Bar chart: CA mensuel */}
          <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-indigo-50/50 to-blue-50/30 px-4 py-2.5 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Chiffre d'affaires mensuel</span>
              </div>
              <span className="text-[11px] text-[--k-muted]">en milliers €</span>
            </div>
            <div className="p-4">
              <div className="flex items-end gap-3 h-[180px]">
                {MONTHLY.map((m, i) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[11px] font-semibold tabular-nums text-[--k-text]">{m.value}k</span>
                    <div className="w-full relative flex-1 flex items-end">
                      <div
                        className={cn(
                          "w-full rounded-t-lg transition-all duration-500",
                          i === MONTHLY.length - 1 ? "bg-gradient-to-t from-indigo-500 to-blue-400 shadow-md shadow-indigo-500/20" : "bg-gradient-to-t from-blue-200 to-blue-100"
                        )}
                        style={{ height: `${(m.value / BAR_MAX) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-[--k-muted]">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Donut chart: répartition parc */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-violet-50/50 to-indigo-50/30 px-4 py-2.5 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Répartition parc</span>
              </div>
            </div>
            <div className="p-4 flex flex-col items-center">
              {/* CSS donut */}
              <div className="relative h-[140px] w-[140px] mb-4">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    const colors = ["#6366f1", "#38bdf8", "#34d399", "#f59e0b"];
                    return DONUT.map((d, i) => {
                      const dash = d.pct;
                      const el = (
                        <circle key={i} cx="18" cy="18" r="15.5" fill="none"
                          stroke={colors[i]} strokeWidth="5"
                          strokeDasharray={`${dash} ${100 - dash}`}
                          strokeDashoffset={`${-offset}`}
                          className="transition-all duration-700"
                        />
                      );
                      offset += dash;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-extrabold text-[--k-text]">678</span>
                  <span className="text-[10px] text-[--k-muted]">total bornes</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                {DONUT.map(d => (
                  <div key={d.label} className="flex items-center gap-2.5">
                    <span className={cn("h-3 w-3 rounded-sm shrink-0", d.color)} />
                    <span className="flex-1 text-[12px] text-[--k-text]">{d.label}</span>
                    <span className="text-[12px] font-semibold tabular-nums text-[--k-text]">{d.value}</span>
                    <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums", d.text, d.color.replace("bg-", "bg-").replace("-500", "-50"))}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Second row ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Stacked area / multi-bar: activité par app */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-sky-50/50 to-blue-50/30 px-4 py-2.5 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Activité hebdo par app</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-medium">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-400" />Bornes</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sky-400" />Antennes</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Stock</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-end gap-2 h-[160px]">
                {WEEKLY_ACTIVITY.map(d => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex-1 flex items-end gap-0.5">
                      <div className="flex-1 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-t-md" style={{ height: `${(d.bornes / ACTIVITY_MAX) * 100}%` }} />
                      <div className="flex-1 bg-gradient-to-t from-sky-400 to-sky-300 rounded-t-md" style={{ height: `${(d.antennes / ACTIVITY_MAX) * 100}%` }} />
                      <div className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-md" style={{ height: `${(d.stock / ACTIVITY_MAX) * 100}%` }} />
                    </div>
                    <span className="text-[10px] font-medium text-[--k-muted]">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Horizontal bars: régions */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-emerald-50/40 to-teal-50/20 px-4 py-2.5 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Top régions</span>
              </div>
              <span className="text-[11px] text-[--k-muted]">par nombre de bornes</span>
            </div>
            <div className="p-4 space-y-3">
              {REGIONS.map((r, i) => (
                <div key={r.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white bg-[--k-primary]/80">{i + 1}</span>
                      <span className="text-[12px] font-medium text-[--k-text]">{r.name}</span>
                    </div>
                    <span className="text-[12px] font-bold tabular-nums text-[--k-text]">{r.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-blue-50 overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-700", r.color)} style={{ width: `${(r.value / r.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
