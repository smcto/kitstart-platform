import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { cn } from "../components/ui/cn";
import {
  Radio, MapPin, Building, Layers, Crown, Star,
  TrendingUp, ArrowUpRight, Activity
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const ANTENNES_BY_REGION = [
  { name: "Bretagne",      count: 32, types: { classik: 18, spherik: 12, prestige: 2 } },
  { name: "IDF",            count: 28, types: { classik: 15, spherik: 11, prestige: 2 } },
  { name: "Rhône-Alpes",   count: 24, types: { classik: 14, spherik: 9,  prestige: 1 } },
  { name: "Grand Ouest",   count: 18, types: { classik: 12, spherik: 6,  prestige: 0 } },
  { name: "PACA",           count: 15, types: { classik: 10, spherik: 4,  prestige: 1 } },
  { name: "Occitanie",     count: 12, types: { classik: 8,  spherik: 3,  prestige: 1 } },
];

const RECENT_CONTACTS = [
  { id: 1, name: "Mairie de Rennes",     type: "Collectivité", antennes: 4, status: "actif" },
  { id: 2, name: "CC Pays de Vannes",    type: "Collectivité", antennes: 3, status: "actif" },
  { id: 3, name: "Salle Olympe, Lyon",   type: "Événement",    antennes: 2, status: "actif" },
  { id: 4, name: "Palais des Congrès",   type: "Lieu",         antennes: 5, status: "actif" },
  { id: 5, name: "Festival Interceltique", type: "Événement",  antennes: 6, status: "en pause" },
];

const TYPE_COLORS = {
  classik:  "bg-blue-100 text-blue-700",
  spherik:  "bg-violet-100 text-violet-700",
  prestige: "bg-amber-100 text-amber-700",
};

/* ── Page ──────────────────────────────────────────── */

export default function AntennesDashboard() {
  return (
    <AppShell currentApp="Antennes Selfizee" activeKey="dashboard">
      <PageHeader
        title="Tableau de bord"
        subtitle="Antennes Selfizee — Vue d'ensemble du réseau"
      />

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KpiCard title="Villes" value="174" icon={MapPin} colorIndex={0} />
        <KpiCard title="Antennes" value="129" icon={Radio} colorIndex={5} />
        <KpiCard title="Classik" value="102" icon={Layers} colorIndex={2} />
        <KpiCard title="Spherik" value="241" icon={Star} colorIndex={3} />
        <KpiCard title="Prestige" value="7" icon={Crown} colorIndex={4} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Map placeholder */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Carte des antennes</span>
            </div>
            <span className="text-[11px] text-[--k-muted]">129 antennes • 174 villes</span>
          </div>
          <div className="relative h-[320px] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            {/* Simulated map dots */}
            <div className="absolute inset-0 p-8">
              {[
                { x: "25%", y: "30%", size: 12 },
                { x: "45%", y: "25%", size: 8 },
                { x: "60%", y: "20%", size: 10 },
                { x: "30%", y: "55%", size: 14 },
                { x: "70%", y: "40%", size: 6 },
                { x: "55%", y: "60%", size: 10 },
                { x: "40%", y: "45%", size: 8 },
                { x: "20%", y: "65%", size: 6 },
                { x: "75%", y: "55%", size: 8 },
                { x: "50%", y: "75%", size: 12 },
                { x: "35%", y: "70%", size: 6 },
                { x: "65%", y: "70%", size: 10 },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[--k-primary]/20 border-2 border-[--k-primary]/40"
                  style={{
                    left: dot.x, top: dot.y,
                    width: dot.size, height: dot.size,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
            <div className="z-10 text-center">
              <MapPin className="mx-auto h-8 w-8 text-[--k-primary]/30 mb-2" />
              <div className="text-[13px] font-medium text-[--k-muted]">Carte interactive</div>
              <div className="text-[11px] text-[--k-muted]/60">Mapbox / Leaflet à intégrer</div>
            </div>
          </div>
        </div>

        {/* Répartition par région */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
          <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[--k-primary]" />
              <span className="text-[13px] font-semibold text-[--k-text]">Par région</span>
            </div>
          </div>
          <div className="divide-y divide-[--k-border]">
            {ANTENNES_BY_REGION.map((r) => (
              <div key={r.name} className="px-4 py-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] font-medium text-[--k-text]">{r.name}</span>
                  <span className="text-[12px] font-semibold tabular-nums text-[--k-text]">{r.count}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {Object.entries(r.types).map(([type, count]) => count > 0 && (
                    <span key={type} className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", TYPE_COLORS[type])}>
                      {count} {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts récents */}
      <div className="mt-4 rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-[--k-primary]" />
            <span className="text-[13px] font-semibold text-[--k-text]">Contacts récents</span>
          </div>
          <button className="text-[11px] font-medium text-[--k-primary] hover:underline">Tous les contacts</button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
              <th className="px-4 py-2 text-left text-xs font-medium">Nom</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Antennes</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_CONTACTS.map((c) => (
              <tr key={c.id} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                <td className="px-4 py-2 font-medium text-[--k-text]">{c.name}</td>
                <td className="px-4 py-2 text-[--k-muted]">{c.type}</td>
                <td className="px-4 py-2 tabular-nums">{c.antennes}</td>
                <td className="px-4 py-2">
                  <span className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                    c.status === "actif" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
