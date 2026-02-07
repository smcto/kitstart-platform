import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  ChevronLeft, ChevronRight, Camera, Filter, Plus,
  ChevronDown, X, Search, ExternalLink, MapPin, Monitor
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const EVENTS_DATA = [
  { id: "EVT-287", name: "Salon du Mariage Paris", dateStart: 8, dateEnd: 10, clientType: "Professionnel", bornes: 12, borneTypes: ["Classik", "Prestige"], animationType: "photobooth", ville: "Paris", client: "Salon Expo SAS", status: "ready", provenance: "transporteur", code: "SM26" },
  { id: "EVT-291", name: "Soirée L'Oréal", dateStart: 10, dateEnd: 10, clientType: "Professionnel", bornes: 4, borneTypes: ["Prestige"], animationType: "photobooth", ville: "Paris", client: "L'Oréal Group", status: "logistics", provenance: "transporteur", code: "LO26" },
  { id: "EVT-294", name: "Mariage Dupont", dateStart: 14, dateEnd: 14, clientType: "Particulier", bornes: 2, borneTypes: ["Spherik"], animationType: "photobooth", ville: "Rennes", client: "Famille Dupont", status: "design", provenance: "antenne", code: "MD26" },
  { id: "EVT-298", name: "Festival Nantes Digital", dateStart: 15, dateEnd: 17, clientType: "Professionnel", bornes: 8, borneTypes: ["Classik"], animationType: "mosaique", ville: "Nantes", client: "Nantes Métropole", status: "confirmed", provenance: "antenne", code: "FN26" },
  { id: "EVT-302", name: "Team Building Airbus", dateStart: 18, dateEnd: 18, clientType: "Professionnel", bornes: 3, borneTypes: ["Classik"], animationType: "jeux", ville: "Toulouse", client: "Airbus SE", status: "design", provenance: "transporteur", code: "AB26" },
  { id: "EVT-305", name: "Gala BMW Munich", dateStart: 20, dateEnd: 20, clientType: "Professionnel", bornes: 6, borneTypes: ["Prestige", "Spherik"], animationType: "photobooth", ville: "Munich", client: "BMW AG", status: "confirmed", provenance: "transporteur", code: "BM26" },
  { id: "EVT-308", name: "Mariage Cohen", dateStart: 22, dateEnd: 22, clientType: "Particulier", bornes: 2, borneTypes: ["Spherik"], animationType: "diaporama", ville: "Lyon", client: "Famille Cohen", status: "confirmed", provenance: "antenne", code: "MC26" },
  { id: "EVT-312", name: "Salon Auto Lyon", dateStart: 25, dateEnd: 27, clientType: "Professionnel", bornes: 10, borneTypes: ["Classik", "Spherik"], animationType: "photobooth", ville: "Lyon", client: "Lyon Auto Events", status: "confirmed", provenance: "transporteur", code: "SA26" },
  { id: "EVT-315", name: "Anniversaire Nike", dateStart: 28, dateEnd: 28, clientType: "Professionnel", bornes: 5, borneTypes: ["Prestige"], animationType: "social", ville: "Paris", client: "Nike France", status: "confirmed", provenance: "antenne", code: "NK26" },
  { id: "EVT-320", name: "Mariage Silva", dateStart: 1, dateEnd: 1, clientType: "Particulier", bornes: 1, borneTypes: ["Classik"], animationType: "photobooth", ville: "Bordeaux", client: "Famille Silva", status: "confirmed", provenance: "antenne", code: "MS26" },
  { id: "EVT-322", name: "Séminaire Total", dateStart: 3, dateEnd: 4, clientType: "Professionnel", bornes: 3, borneTypes: ["Spherik"], animationType: "photobooth", ville: "Paris", client: "TotalEnergies", status: "confirmed", provenance: "transporteur", code: "ST26" },
];

const BORNE_TYPES = ["Classik", "Spherik", "Prestige"];

const ANIMATION_TYPES = [
  { id: "photobooth", label: "Photobooth" },
  { id: "diaporama", label: "Diaporama" },
  { id: "mosaique", label: "Mosaïque" },
  { id: "jeux", label: "Jeux" },
  { id: "social", label: "Social Wall" },
];

const CLIENT_TYPE_COLORS = {
  Professionnel: { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-blue-500" },
  Particulier: { bg: "bg-pink-100", text: "text-pink-700", bar: "bg-pink-500" },
};

const STATUS_MAP = {
  confirmed: { label: "Confirmé", dot: "bg-blue-500" },
  design: { label: "Créa", dot: "bg-violet-500" },
  logistics: { label: "Logistique", dot: "bg-amber-500" },
  ready: { label: "Prêt", dot: "bg-emerald-500" },
  live: { label: "En cours", dot: "bg-rose-500" },
};

const DAYS_IN_MONTH = 28;
const FIRST_DAY_OFFSET = 6;
const TODAY = 7;
const ALL_VILLES = [...new Set(EVENTS_DATA.map(e => e.ville))].sort();

/* ── Page ──────────────────────────────────────────── */

export default function EventsPlanning() {
  const [view, setView] = useState("month");
  const [weekStart, setWeekStart] = useState(3); // Monday of the week containing TODAY
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [borneFilters, setBorneFilters] = useState([]);
  const [animFilter, setAnimFilter] = useState("all");
  const [villeFilter, setVilleFilter] = useState("all");
  const [villeSearch, setVilleSearch] = useState("");
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const [provenanceFilter, setProvenanceFilter] = useState("all");
  const [popup, setPopup] = useState(null);
  const villeRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (villeRef.current && !villeRef.current.contains(e.target)) setVilleDropdownOpen(false);
      if (popupRef.current && !popupRef.current.contains(e.target)) setPopup(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredEvents = EVENTS_DATA.filter(e =>
    (clientTypeFilter === "all" || e.clientType === clientTypeFilter) &&
    (borneFilters.length === 0 || e.borneTypes.some(b => borneFilters.includes(b))) &&
    (animFilter === "all" || e.animationType === animFilter) &&
    (villeFilter === "all" || e.ville === villeFilter) &&
    (provenanceFilter === "all" || e.provenance === provenanceFilter)
  );

  const hasActiveFilters = clientTypeFilter !== "all" || borneFilters.length > 0 || animFilter !== "all" || villeFilter !== "all" || provenanceFilter !== "all";
  const clearFilters = () => { setClientTypeFilter("all"); setBorneFilters([]); setAnimFilter("all"); setVilleFilter("all"); setProvenanceFilter("all"); };

  const toggleBorneFilter = (t) => setBorneFilters(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  // ── Calendar grid (month)
  const weeks = [];
  let currentWeek = [];
  for (let i = 0; i < FIRST_DAY_OFFSET; i++) currentWeek.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
  }
  if (currentWeek.length > 0) { while (currentWeek.length < 7) currentWeek.push(null); weeks.push(currentWeek); }

  // ── Week view days
  const weekDays = [];
  for (let d = weekStart; d < weekStart + 7 && d <= DAYS_IN_MONTH; d++) {
    if (d >= 1) weekDays.push(d);
  }
  while (weekDays.length < 7) weekDays.push(null);

  function getEventsForDay(day) {
    if (!day) return [];
    return filteredEvents.filter(e => day >= e.dateStart && day <= e.dateEnd);
  }

  const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  function handleEventClick(evt, e) {
    e.preventDefault();
    setPopup(evt);
  }

  // ── Event chip (shared between views)
  function EventChip({ evt, day }) {
    const tc = CLIENT_TYPE_COLORS[evt.clientType] || CLIENT_TYPE_COLORS.Professionnel;
    const isStart = day === evt.dateStart;
    const isEnd = day === evt.dateEnd;
    return (
      <button
        onClick={(e) => handleEventClick(evt, e)}
        className={cn(
          "block w-full text-left text-[10px] font-medium leading-tight py-0.5 px-1.5 truncate transition hover:brightness-95",
          tc.bg, tc.text,
          isStart && isEnd && "rounded-md",
          isStart && !isEnd && "rounded-l-md",
          !isStart && isEnd && "rounded-r-md",
        )}
        title={`${evt.name} — ${evt.bornes} bornes`}
      >
        {isStart ? evt.name : ""}
        {isStart && <span className="ml-1 opacity-60">({evt.bornes}b)</span>}
      </button>
    );
  }

  return (
    <AppShell currentApp="Events Manager" activeKey="planning">
      <PageHeader
        title="Calendrier des événements"
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
        {/* Period nav */}
        <div className="flex items-center gap-1 rounded-lg border border-[--k-border] bg-white">
          <button
            onClick={() => view === "week" ? setWeekStart(Math.max(1, weekStart - 7)) : null}
            className="flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-[--k-surface-2] text-[--k-muted] transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 text-[13px] font-semibold text-[--k-text]">
            {view === "week" ? `${weekStart}–${Math.min(weekStart + 6, DAYS_IN_MONTH)} fév. 2026` : "Février 2026"}
          </span>
          <button
            onClick={() => view === "week" ? setWeekStart(Math.min(DAYS_IN_MONTH - 6, weekStart + 7)) : null}
            className="flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-[--k-surface-2] text-[--k-muted] transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => { if (view === "week") setWeekStart(Math.max(1, TODAY - ((TODAY - 1 + FIRST_DAY_OFFSET) % 7))); }}
          className="h-8 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition"
        >
          Aujourd'hui
        </button>

        <div className="flex-1" />

        {/* Filters */}
        <Filter className="h-3.5 w-3.5 text-[--k-muted]" />

        <select
          value={clientTypeFilter}
          onChange={e => setClientTypeFilter(e.target.value)}
          className={cn("h-8 rounded-lg border border-[--k-border] bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", clientTypeFilter !== "all" && "border-[--k-primary] text-[--k-primary]")}
        >
          <option value="all">Client : Tous</option>
          <option value="Professionnel">Pro</option>
          <option value="Particulier">Particulier</option>
        </select>

        {/* Borne multi-select dropdown */}
        <div className="relative group">
          <button
            className={cn(
              "flex items-center gap-1.5 h-8 rounded-lg border px-2 text-[12px] font-medium transition",
              borneFilters.length > 0 ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border] text-[--k-text]"
            )}
          >
            {borneFilters.length === 0 ? "Borne : Toutes" : borneFilters.join(", ")}
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="hidden group-hover:block absolute z-20 mt-0.5 w-44 rounded-lg border border-[--k-border] bg-white shadow-lg py-1">
            {BORNE_TYPES.map(t => (
              <label key={t} className="flex items-center gap-2 px-3 py-1.5 text-[12px] hover:bg-[--k-surface-2] cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={borneFilters.includes(t)}
                  onChange={() => toggleBorneFilter(t)}
                  className="rounded border-[--k-border] h-3.5 w-3.5"
                />
                {t}
              </label>
            ))}
          </div>
        </div>

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
              villeFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border] text-[--k-text]"
            )}
          >
            {villeFilter === "all" ? "Ville : Toutes" : villeFilter}
            <ChevronDown className="h-3 w-3" />
          </button>
          {villeDropdownOpen && (
            <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-[--k-border] bg-white shadow-lg">
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
                <button onClick={() => { setVilleFilter("all"); setVilleDropdownOpen(false); setVilleSearch(""); }} className={cn("w-full text-left px-3 py-1.5 text-[12px] hover:bg-[--k-surface-2] transition", villeFilter === "all" && "font-semibold text-[--k-primary]")}>Toutes les villes</button>
                {ALL_VILLES.filter(v => !villeSearch || v.toLowerCase().includes(villeSearch.toLowerCase())).map(v => (
                  <button key={v} onClick={() => { setVilleFilter(v); setVilleDropdownOpen(false); setVilleSearch(""); }} className={cn("w-full text-left px-3 py-1.5 text-[12px] hover:bg-[--k-surface-2] transition", villeFilter === v && "font-semibold text-[--k-primary]")}>{v}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <select
          value={provenanceFilter}
          onChange={e => setProvenanceFilter(e.target.value)}
          className={cn("h-8 rounded-lg border border-[--k-border] bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", provenanceFilter !== "all" && "border-[--k-primary] text-[--k-primary]")}
        >
          <option value="all">Provenance : Toutes</option>
          <option value="antenne">Antenne locale</option>
          <option value="transporteur">Transporteur</option>
        </select>

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

      {/* ── Month view ──────────────────────────── */}
      {view === "month" && (
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30">
            {dayNames.map(d => (
              <div key={d} className="px-2 py-2.5 text-center text-[11px] font-semibold text-[--k-muted]">{d}</div>
            ))}
          </div>
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 border-b border-[--k-border] last:border-0">
              {week.map((day, di) => {
                const dayEvents = getEventsForDay(day);
                const isToday = day === TODAY;
                return (
                  <div key={di} className={cn(
                    "min-h-[100px] border-r border-[--k-border] last:border-r-0 p-1.5 transition",
                    day === null && "bg-slate-50/50",
                    isToday && "bg-rose-50/30",
                    day && !isToday && "hover:bg-[--k-surface-2]/20"
                  )}>
                    {day !== null && (
                      <>
                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold mb-1", isToday ? "bg-rose-500 text-white" : "text-[--k-text]")}>{day}</div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 3).map(evt => <EventChip key={evt.id} evt={evt} day={day} />)}
                          {dayEvents.length > 3 && <div className="text-[9px] text-[--k-muted] pl-1.5">+{dayEvents.length - 3} autre(s)</div>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── Week view ───────────────────────────── */}
      {view === "week" && (
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30">
            {weekDays.map((d, i) => (
              <div key={i} className="px-2 py-2.5 text-center text-[11px] font-semibold text-[--k-muted]">
                {dayNames[i]} {d || ""}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {weekDays.map((day, di) => {
              const dayEvents = getEventsForDay(day);
              const isToday = day === TODAY;
              return (
                <div key={di} className={cn(
                  "min-h-[300px] border-r border-[--k-border] last:border-r-0 p-2 transition",
                  day === null && "bg-slate-50/50",
                  isToday && "bg-rose-50/30",
                )}>
                  {day !== null && (
                    <>
                      <div className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold mb-2", isToday ? "bg-rose-500 text-white" : "text-[--k-text]")}>{day}</div>
                      <div className="space-y-1.5">
                        {dayEvents.map(evt => {
                          const tc = CLIENT_TYPE_COLORS[evt.clientType] || CLIENT_TYPE_COLORS.Professionnel;
                          const isStart = day === evt.dateStart;
                          return (
                            <button
                              key={evt.id}
                              onClick={(e) => handleEventClick(evt, e)}
                              className={cn("w-full text-left rounded-lg p-2 transition hover:brightness-95", tc.bg)}
                            >
                              <div className={cn("text-[11px] font-semibold truncate", tc.text)}>{evt.name}</div>
                              {isStart && (
                                <>
                                  <div className="text-[10px] text-[--k-muted] mt-0.5">{evt.client}</div>
                                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[--k-muted]">
                                    <span className="flex items-center gap-0.5"><Camera className="h-3 w-3" />{evt.bornes}</span>
                                    <span>{evt.borneTypes.join(", ")}</span>
                                  </div>
                                </>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px]">
        <span className="font-semibold text-[--k-muted]">Légende :</span>
        {Object.entries(CLIENT_TYPE_COLORS).map(([type, colors]) => (
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
            const tc = CLIENT_TYPE_COLORS[evt.clientType] || CLIENT_TYPE_COLORS.Professionnel;
            const st = STATUS_MAP[evt.status] || { label: evt.status, dot: "bg-slate-300" };
            return (
              <button key={evt.id} onClick={(e) => handleEventClick(evt, e)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition w-full text-left">
                <span className={cn("h-2 w-2 rounded-full shrink-0", st.dot)} />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-[--k-text] truncate">{evt.name}</div>
                  <div className="text-[11px] text-[--k-muted]">{evt.client}</div>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0", tc.bg, tc.text)}>{evt.clientType === "Professionnel" ? "Pro" : "Part."}</span>
                <span className="text-[12px] font-semibold text-[--k-text] shrink-0 w-16 text-right">
                  {evt.dateStart === evt.dateEnd ? `${evt.dateStart} fév` : `${evt.dateStart}–${evt.dateEnd} fév`}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-[--k-muted] shrink-0">
                  <Camera className="h-3 w-3" /> {evt.bornes}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Event Popup ─────────────────────────── */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div ref={popupRef} className="bg-white rounded-2xl border border-[--k-border] shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
            <div className={cn("px-5 py-4 border-b border-[--k-border]", CLIENT_TYPE_COLORS[popup.clientType]?.bg || "bg-blue-50")}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-semibold text-[--k-muted] uppercase tracking-wide">{popup.id} · {popup.code}</div>
                  <h3 className="text-[16px] font-bold text-[--k-text] mt-0.5">{popup.name}</h3>
                </div>
                <button onClick={() => setPopup(null)} className="text-[--k-muted] hover:text-[--k-text] transition">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="px-5 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <span className="text-[11px] text-[--k-muted]">Client</span>
                  <div className="font-medium text-[--k-text]">{popup.client}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Type client</span>
                  <div className="font-medium text-[--k-text]">{popup.clientType}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Date</span>
                  <div className="font-medium text-[--k-text]">
                    {popup.dateStart === popup.dateEnd ? `${popup.dateStart} fév 2026` : `${popup.dateStart}–${popup.dateEnd} fév 2026`}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Ville</span>
                  <div className="font-medium text-[--k-text] flex items-center gap-1"><MapPin className="h-3 w-3" />{popup.ville}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Bornes</span>
                  <div className="font-medium text-[--k-text] flex items-center gap-1"><Monitor className="h-3 w-3" />{popup.bornes} — {popup.borneTypes.join(", ")}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Animation</span>
                  <div className="font-medium text-[--k-text]">{ANIMATION_TYPES.find(a => a.id === popup.animationType)?.label || popup.animationType}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Provenance</span>
                  <div className="font-medium text-[--k-text]">{popup.provenance === "antenne" ? "Antenne locale" : "Transporteur"}</div>
                </div>
                <div>
                  <span className="text-[11px] text-[--k-muted]">Statut</span>
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full", STATUS_MAP[popup.status]?.dot || "bg-slate-300")} />
                    <span className="font-medium text-[--k-text]">{STATUS_MAP[popup.status]?.label || popup.status}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-[--k-surface-2] px-3 py-2 text-[12px] text-[--k-muted]">
                Code configuration : <span className="font-bold text-[--k-text]">{popup.code}</span>
                <a href={`https://config.selfizee.com/event/${popup.code}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-[--k-primary] hover:underline inline-flex items-center gap-0.5">
                  Ouvrir <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            {/* Footer */}
            <div className="px-5 py-3 border-t border-[--k-border] flex justify-end gap-2">
              <button onClick={() => setPopup(null)} className="h-9 rounded-lg border border-[--k-border] px-4 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                Fermer
              </button>
              <a href={`/events/${popup.id}`} className="h-9 rounded-lg bg-[--k-primary] px-4 text-[12px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Voir la fiche <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
