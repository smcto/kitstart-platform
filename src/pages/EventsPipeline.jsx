import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  Camera, CalendarDays, MapPin, Filter, Search, Plus, GripVertical, Users
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const STAGES = [
  { key: "confirmed", label: "Confirmé", color: "bg-blue-500", headerBg: "bg-blue-50", headerBorder: "border-blue-200", headerText: "text-blue-600" },
  { key: "briefing", label: "Briefing client", color: "bg-cyan-500", headerBg: "bg-cyan-50", headerBorder: "border-cyan-200", headerText: "text-cyan-600" },
  { key: "design", label: "Création graphique", color: "bg-violet-500", headerBg: "bg-violet-50", headerBorder: "border-violet-200", headerText: "text-violet-600" },
  { key: "logistics", label: "Logistique", color: "bg-amber-500", headerBg: "bg-amber-50", headerBorder: "border-amber-200", headerText: "text-amber-600" },
  { key: "ready", label: "Prêt", color: "bg-emerald-500", headerBg: "bg-emerald-50", headerBorder: "border-emerald-200", headerText: "text-emerald-600" },
  { key: "live", label: "En cours", color: "bg-rose-500", headerBg: "bg-rose-50", headerBorder: "border-rose-200", headerText: "text-rose-500" },
];

const ALL_EVENTS = [
  // Confirmés
  { id: "EVT-308", name: "Mariage Cohen-Lévy", client: "Famille Cohen", date: "22 fév", bornes: 2, type: "Mariage", antenne: "IDF Paris", stage: "confirmed" },
  { id: "EVT-312", name: "Salon Auto Lyon", client: "Lyon Auto Events", date: "25-27 fév", bornes: 10, type: "Salon", antenne: "Rhône-Alpes", stage: "confirmed" },
  { id: "EVT-315", name: "Anniversaire Nike", client: "Nike France", date: "28 fév", bornes: 5, type: "Corporate", antenne: "IDF Paris", stage: "confirmed" },
  { id: "EVT-318", name: "Gala Dior Cannes", client: "Dior", date: "05 mars", bornes: 8, type: "Gala", antenne: "PACA", stage: "confirmed" },
  { id: "EVT-320", name: "Mariage Silva", client: "Famille Silva", date: "01 mars", bornes: 1, type: "Mariage", antenne: "PACA", stage: "confirmed" },
  // Briefing
  { id: "EVT-298", name: "Festival Nantes Digital", client: "Nantes Métropole", date: "15-17 fév", bornes: 8, type: "Festival", antenne: "Grand Ouest", stage: "briefing" },
  { id: "EVT-305", name: "Gala BMW Munich", client: "BMW AG", date: "20 fév", bornes: 6, type: "Corporate", antenne: "International", stage: "briefing" },
  // Design
  { id: "EVT-294", name: "Mariage Dupont-Martin", client: "Famille Dupont", date: "14 fév", bornes: 2, type: "Mariage", antenne: "IDF Paris", stage: "design" },
  { id: "EVT-302", name: "Team Building Airbus", client: "Airbus SE", date: "18 fév", bornes: 3, type: "Corporate", antenne: "Occitanie", stage: "design" },
  // Logistique
  { id: "EVT-291", name: "Soirée L'Oréal 50 ans", client: "L'Oréal Group", date: "10 fév", bornes: 4, type: "Corporate", antenne: "IDF Paris", stage: "logistics" },
  { id: "EVT-299", name: "Congrès Pharma Lyon", client: "Sanofi", date: "12 fév", bornes: 3, type: "Corporate", antenne: "Rhône-Alpes", stage: "logistics" },
  // Prêt
  { id: "EVT-287", name: "Salon du Mariage Paris", client: "Salon Expo SAS", date: "08-10 fév", bornes: 12, type: "Salon", antenne: "IDF Paris", stage: "ready" },
  { id: "EVT-285", name: "Soirée Hermès", client: "Hermès International", date: "08 fév", bornes: 3, type: "Corporate", antenne: "IDF Paris", stage: "ready" },
  // En cours
  { id: "EVT-280", name: "Salon de la Photo", client: "Photo Expo", date: "06-09 fév", bornes: 6, type: "Salon", antenne: "IDF Paris", stage: "live" },
];

const TYPE_COLORS = {
  Salon: "bg-indigo-50 text-indigo-600",
  Corporate: "bg-blue-50 text-blue-600",
  Mariage: "bg-pink-50 text-pink-500",
  Festival: "bg-orange-50 text-orange-600",
  Gala: "bg-violet-50 text-violet-600",
};

/* ── Page ──────────────────────────────────────────── */

export default function EventsPipeline() {
  const [search, setSearch] = useState("");

  const filteredEvents = search
    ? ALL_EVENTS.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.client.toLowerCase().includes(search.toLowerCase()))
    : ALL_EVENTS;

  return (
    <AppShell currentApp="Events Manager" activeKey="pipeline">
      <PageHeader
        title="Pipeline de production"
        subtitle="Vue par état d'avancement"
        actions={
          <a href="/events/create" className="flex h-8 items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 text-white text-[12px] font-medium hover:brightness-110 transition shadow-sm">
            <Plus className="h-4 w-4" />
            Nouvel événement
          </a>
        }
      />

      {/* Stats bar */}
      <div className="mb-4 flex flex-wrap gap-2">
        {STAGES.map(s => {
          const count = filteredEvents.filter(e => e.stage === s.key).length;
          return (
            <div key={s.key} className={cn("flex items-center gap-2 rounded-xl border px-3 py-1.5", s.headerBg, s.headerBorder)}>
              <span className={cn("h-2.5 w-2.5 rounded-full", s.color)} />
              <span className={cn("text-[12px] font-semibold", s.headerText)}>{count}</span>
              <span className="text-[11px] text-[--k-muted]">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--k-muted]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un événement..."
            className="h-8 w-full rounded-lg border border-[--k-border] bg-white pl-8 pr-3 text-[12px] outline-none focus:border-[--k-primary] focus:ring-1 focus:ring-[--k-primary]/20 transition"
          />
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: "calc(100vh - 260px)" }}>
        {STAGES.map(stage => {
          const stageEvents = filteredEvents.filter(e => e.stage === stage.key);
          const totalBornes = stageEvents.reduce((s, e) => s + e.bornes, 0);

          return (
            <div key={stage.key} className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-[--k-border] bg-[--k-surface-2]/30">
              {/* Column header */}
              <div className={cn("flex items-center gap-2 rounded-t-2xl border-b px-3 py-2.5", stage.headerBg, stage.headerBorder)}>
                <span className={cn("h-2.5 w-2.5 rounded-full", stage.color)} />
                <span className={cn("text-[12px] font-bold flex-1", stage.headerText)}>{stage.label}</span>
                <span className={cn("flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white", stage.color)}>
                  {stageEvents.length}
                </span>
              </div>

              {/* Stats */}
              <div className="flex gap-3 px-3 py-2 border-b border-[--k-border]/50 text-[10px] text-[--k-muted]">
                <span className="flex items-center gap-1"><Camera className="h-3 w-3" /> {totalBornes} bornes</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {stageEvents.length} événements</span>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-2 overflow-y-auto p-2">
                {stageEvents.map(evt => {
                  const tc = TYPE_COLORS[evt.type] || "bg-slate-50 text-slate-600";
                  return (
                    <a
                      key={evt.id}
                      href={`/events/${evt.id}`}
                      className="block rounded-xl border border-[--k-border] bg-white p-3 shadow-sm hover:shadow-md hover:border-[--k-primary]/30 transition group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", tc)}>{evt.type}</span>
                        <span className="opacity-0 group-hover:opacity-40 text-[--k-muted]">
                          <GripVertical className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <div className="text-[12px] font-semibold text-[--k-text] mb-0.5 leading-tight">{evt.name}</div>
                      <div className="text-[11px] text-[--k-muted] mb-2">{evt.client}</div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[--k-muted]">
                        <span className="flex items-center gap-0.5"><CalendarDays className="h-3 w-3" /> {evt.date}</span>
                        <span className="flex items-center gap-0.5"><Camera className="h-3 w-3" /> {evt.bornes}b</span>
                        <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {evt.antenne}</span>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-[10px] text-[--k-muted] font-mono">{evt.id}</span>
                      </div>
                    </a>
                  );
                })}

                {stageEvents.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-[12px] text-[--k-muted]/50">
                    Aucun événement
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
