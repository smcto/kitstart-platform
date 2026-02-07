import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  ChevronLeft, ChevronRight, CalendarDays, Camera, Filter, Plus,
  ChevronDown, X, Search
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const EVENTS_DATA = [
  { id: "EVT-287", name: "Salon du Mariage Paris", dateStart: 8, dateEnd: 10, type: "Salon", bornes: 12, borneType: "Classik", animationType: "photobooth", ville: "Paris", client: "Salon Expo SAS", status: "ready" },
  { id: "EVT-291", name: "Soirée L'Oréal", dateStart: 10, dateEnd: 10, type: "Corporate", bornes: 4, borneType: "Prestige", animationType: "photobooth", ville: "Paris", client: "L'Oréal Group", status: "logistics" },
  { id: "EVT-294", name: "Mariage Dupont", dateStart: 14, dateEnd: 14, type: "Mariage", bornes: 2, borneType: "Spherik", animationType: "photobooth", ville: "Rennes", client: "Famille Dupont", status: "design" },
  { id: "EVT-298", name: "Festival Nantes Digital", dateStart: 15, dateEnd: 17, type: "Festival", bornes: 8, borneType: "Classik", animationType: "mosaique", ville: "Nantes", client: "Nantes Métropole", status: "confirmed" },
  { id: "EVT-302", name: "Team Building Airbus", dateStart: 18, dateEnd: 18, type: "Corporate", bornes: 3, borneType: "Classik", animationType: "jeux", ville: "Toulouse", client: "Airbus SE", status: "design" },
  { id: "EVT-305", name: "Gala BMW Munich", dateStart: 20, dateEnd: 20, type: "Corporate", bornes: 6, borneType: "Prestige", animationType: "photobooth", ville: "Munich", client: "BMW AG", status: "confirmed" },
  { id: "EVT-308", name: "Mariage Cohen", dateStart: 22, dateEnd: 22, type: "Mariage", bornes: 2, borneType: "Spherik", animationType: "diaporama", ville: "Lyon", client: "Famille Cohen", status: "confirmed" },
  { id: "EVT-312", name: "Salon Auto Lyon", dateStart: 25, dateEnd: 27, type: "Salon", bornes: 10, borneType: "Classik", animationType: "photobooth", ville: "Lyon", client: "Lyon Auto Events", status: "confirmed" },
  { id: "EVT-315", name: "Anniversaire Nike", dateStart: 28, dateEnd: 28, type: "Corporate", bornes: 5, borneType: "Prestige", animationType: "social", ville: "Paris", client: "Nike France", status: "confirmed" },
  { id: "EVT-320", name: "Mariage Silva", dateStart: 1, dateEnd: 1, type: "Mariage", bornes: 1, borneType: "Classik", animationType: "photobooth", ville: "Bordeaux", client: "Famille Silva", status: "confirmed" },
  { id: "EVT-322", name: "Séminaire Total", dateStart: 3, dateEnd: 4, type: "Corporate", bornes: 3, borneType: "Spherik", animationType: "photobooth", ville: "Paris", client: "TotalEnergies", status: "confirmed" },
];

const BORNE_TYPES = ["Classik", "Spherik", "Prestige"];

const ANIMATION_TYPES = [
  { id: "photobooth", label: "Photobooth" },
  { id: "diaporama", label: "Diaporama" },
  { id: "mosaique", label: "Mosaïque" },
  { id: "jeux", label: "Jeux" },
  { id: "social", label: "Social Wall" },
];

const TYPE_COLORS = {
  Salon: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200", bar: "bg-indigo-500" },
  Corporate: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", bar: "bg-blue-500" },
  Mariage: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200", bar: "bg-pink-500" },
  Festival: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", bar: "bg-orange-500" },
};

const STATUS_DOT = {
  confirmed: "bg-blue-500",
  design: "bg-violet-500",
  logistics: "bg-amber-500",
  ready: "bg-emerald-500",
  live: "bg-rose-500",
};

const DAYS_IN_MONTH = 28; // Feb 2026
const FIRST_DAY_OFFSET = 6; // Feb 2026 starts on Sunday → offset 6 for Monday-start grid
const TODAY = 7;

/* ── Page ──────────────────────────────────────────── */

const ALL_VILLES = [...new Set(EVENTS_DATA.map(e => e.ville))].sort();

export default function EventsPlanning() {
  const [view, setView] = useState("month");
  const [typeFilter, setTypeFilter] = useState("all");
  const [borneFilter, setBorneFilter] = useState("all");
  const [animFilter, setAnimFilter] = useState("all");
  const [villeFilter, setVilleFilter] = useState("all");
  const [villeSearch, setVilleSearch] = useState("");
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const villeRef = useRef(null);

  // Close ville dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (villeRef.current && !villeRef.current.contains(e.target)) setVilleDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredEvents = EVENTS_DATA.filter(e =>
    (typeFilter === "all" || e.type === typeFilter) &&
    (borneFilter === "all" || e.borneType === borneFilter) &&
    (animFilter === "all" || e.animationType === animFilter) &&
    (villeFilter === "all" || e.ville === villeFilter)
  );

  const hasActiveFilters = typeFilter !== "all" || borneFilter !== "all" || animFilter !== "all" || villeFilter !== "all";
  const clearFilters = () => { setTypeFilter("all"); setBorneFilter("all"); setAnimFilter("all"); setVilleFilter("all"); };

  // Build calendar grid
  const weeks = [];
  let currentWeek = [];
  for (let i = 0; i < FIRST_DAY_OFFSET; i++) currentWeek.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  function getEventsForDay(day) {
    if (!day) return [];
    return filteredEvents.filter(e => day >= e.dateStart && day <= e.dateEnd);
  }

  return (
    <AppShell currentApp="Events Manager" activeKey="planning">
      <PageHeader
        title="Planning"
        subtitle="Février 2026"
        actions={
          <a href="/events/create" className="flex h-8 items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 text-white text-[12px] font-medium hover:brightness-110 transition shadow-sm">
            <Plus className="h-4 w-4" />
            Nouvel événement
          </a>
        }
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* Month nav */}
        <div className="flex items-center gap-1 rounded-lg border border-[--k-border] bg-white">
          <button className="flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-[--k-surface-2] text-[--k-muted] transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 text-[13px] font-semibold text-[--k-text]">Février 2026</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-[--k-surface-2] text-[--k-muted] transition">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button className="h-8 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">Aujourd'hui</button>

        <div className="flex-1" />

        {/* Filters */}
        <Filter className="h-3.5 w-3.5 text-[--k-muted]" />

        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className={cn("h-8 rounded-lg border border-[--k-border] bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", typeFilter !== "all" && "border-[--k-primary] text-[--k-primary]")}
        >
          <option value="all">Type : Tous</option>
          {["Corporate", "Mariage", "Salon", "Festival"].map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={borneFilter}
          onChange={e => setBorneFilter(e.target.value)}
          className={cn("h-8 rounded-lg border border-[--k-border] bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", borneFilter !== "all" && "border-[--k-primary] text-[--k-primary]")}
        >
          <option value="all">Borne : Toutes</option>
          {BORNE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={animFilter}
          onChange={e => setAnimFilter(e.target.value)}
          className={cn("h-8 rounded-lg border border-[--k-border] bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", animFilter !== "all" && "border-[--k-primary] text-[--k-primary]")}
        >
          <option value="all">Animation : Toutes</option>
          {ANIMATION_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>

        {/* Ville - searchable dropdown */}
        <div ref={villeRef} className="relative">
          <button
            onClick={() => setVilleDropdownOpen(v => !v)}
            className={cn(
              "flex items-center gap-1.5 h-8 rounded-lg border px-2 text-[12px] font-medium transition",
              villeFilter !== "all"
                ? "border-[--k-primary] text-[--k-primary]"
                : "border-[--k-border] text-[--k-text]"
            )}
          >
            {villeFilter === "all" ? "Ville : Toutes" : villeFilter}
            <ChevronDown className="h-3 w-3" />
          </button>
          {villeDropdownOpen && (
            <div className="absolute z-20 mt-1 w-48 rounded-lg border border-[--k-border] bg-white shadow-lg">
              <div className="p-2 border-b border-[--k-border]">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[--k-surface-2] rounded text-[12px] text-[--k-muted]">
                  <Search className="h-3 w-3" />
                  <input
                    value={villeSearch}
                    onChange={e => setVilleSearch(e.target.value)}
                    placeholder="Filtrer..."
                    className="bg-transparent border-none outline-none flex-1 text-[--k-text] text-[12px]"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-auto py-1">
                <button
                  onClick={() => { setVilleFilter("all"); setVilleDropdownOpen(false); setVilleSearch(""); }}
                  className={cn("w-full text-left px-3 py-1.5 text-[12px] hover:bg-[--k-surface-2] transition", villeFilter === "all" && "font-semibold text-[--k-primary]")}
                >
                  Toutes les villes
                </button>
                {ALL_VILLES.filter(v => !villeSearch || v.toLowerCase().includes(villeSearch.toLowerCase())).map(v => (
                  <button
                    key={v}
                    onClick={() => { setVilleFilter(v); setVilleDropdownOpen(false); setVilleSearch(""); }}
                    className={cn("w-full text-left px-3 py-1.5 text-[12px] hover:bg-[--k-surface-2] transition", villeFilter === v && "font-semibold text-[--k-primary]")}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-[12px] text-[--k-muted] hover:text-[--k-danger] transition">
            <X className="h-3 w-3" /> Effacer
          </button>
        )}

        {/* View toggle */}
        <div className="flex gap-1 rounded-lg bg-[--k-surface-2] p-0.5">
          {[{ key: "month", label: "Mois" }, { key: "week", label: "Semaine" }].map(v => (
            <button
              key={v.key}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[11px] font-medium transition",
                view === v.key ? "bg-white text-[--k-text] shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
              )}
              onClick={() => setView(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30">
          {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map(d => (
            <div key={d} className="px-2 py-2.5 text-center text-[11px] font-semibold text-[--k-muted]">{d}</div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-[--k-border] last:border-0">
            {week.map((day, di) => {
              const dayEvents = getEventsForDay(day);
              const isToday = day === TODAY;
              return (
                <div
                  key={di}
                  className={cn(
                    "min-h-[100px] border-r border-[--k-border] last:border-r-0 p-1.5 transition",
                    day === null && "bg-slate-50/50",
                    isToday && "bg-rose-50/30",
                    day && !isToday && "hover:bg-[--k-surface-2]/20"
                  )}
                >
                  {day !== null && (
                    <>
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold mb-1",
                        isToday ? "bg-rose-500 text-white" : "text-[--k-text]"
                      )}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 3).map(evt => {
                          const tc = TYPE_COLORS[evt.type] || TYPE_COLORS.Corporate;
                          const isStart = day === evt.dateStart;
                          const isEnd = day === evt.dateEnd;
                          return (
                            <a
                              key={evt.id}
                              href={`/events/${evt.id}`}
                              className={cn(
                                "block text-[10px] font-medium leading-tight py-0.5 px-1.5 truncate transition hover:brightness-95",
                                tc.bg, tc.text,
                                isStart && isEnd && "rounded-md",
                                isStart && !isEnd && "rounded-l-md",
                                !isStart && isEnd && "rounded-r-md",
                                !isStart && !isEnd && ""
                              )}
                              title={`${evt.name} — ${evt.bornes} bornes`}
                            >
                              {isStart ? evt.name : ""}
                              {isStart && <span className="ml-1 opacity-60">({evt.bornes}b)</span>}
                            </a>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-[9px] text-[--k-muted] pl-1.5">+{dayEvents.length - 3} autre(s)</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px]">
        <span className="font-semibold text-[--k-muted]">Légende :</span>
        {Object.entries(TYPE_COLORS).map(([type, colors]) => (
          <span key={type} className="flex items-center gap-1.5">
            <span className={cn("h-2.5 w-2.5 rounded-sm", colors.bar)} />
            <span className="text-[--k-muted]">{type}</span>
          </span>
        ))}
      </div>

      {/* Side list of events this month */}
      <div className="mt-5 rounded-2xl border border-[--k-border] bg-white shadow-sm">
        <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
          <span className="text-[13px] font-semibold text-[--k-text]">Événements du mois ({filteredEvents.length})</span>
        </div>
        <div className="divide-y divide-[--k-border]">
          {filteredEvents.map(evt => {
            const tc = TYPE_COLORS[evt.type] || TYPE_COLORS.Corporate;
            const sd = STATUS_DOT[evt.status] || "bg-slate-300";
            return (
              <a key={evt.id} href={`/events/${evt.id}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition">
                <span className={cn("h-2 w-2 rounded-full shrink-0", sd)} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[--k-text] truncate">{evt.name}</div>
                  <div className="text-[11px] text-[--k-muted]">{evt.client}</div>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0", tc.bg, tc.text)}>{evt.type}</span>
                <span className="text-[12px] font-semibold text-[--k-text] shrink-0 w-16 text-right">
                  {evt.dateStart === evt.dateEnd ? `${evt.dateStart} fév` : `${evt.dateStart}–${evt.dateEnd} fév`}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-[--k-muted] shrink-0">
                  <Camera className="h-3 w-3" /> {evt.bornes}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
