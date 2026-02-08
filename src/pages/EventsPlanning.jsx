import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  ChevronLeft, ChevronRight, Camera, Filter, Plus,
  ChevronDown, X, Search, ExternalLink, MapPin, Monitor
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const TEAM_MEMBERS = {
  BL: { name: "Bertrand L.", initials: "BL", color: "bg-indigo-500", role: "Commercial" },
  LL: { name: "Lucie L.", initials: "LL", color: "bg-pink-500", role: "Commerciale" },
  BG: { name: "Benjamin G.", initials: "BG", color: "bg-emerald-500", role: "Chef de projet" },
  ER: { name: "Elen R.", initials: "ER", color: "bg-fuchsia-500", role: "Cheffe de projet" },
  PT: { name: "Pauline T.", initials: "PT", color: "bg-amber-500", role: "Cheffe de projet" },
  SM: { name: "Seb M.", initials: "SM", color: "bg-sky-500", role: "Chef de projet" },
};

const EVENTS_DATA = [
  { id: "EVT-287", name: "Salon du Mariage Paris", dateStart: 8, dateEnd: 10, clientType: "Professionnel", bornes: 12, borneTypes: ["Classik", "Prestige"], animationType: "photobooth", ville: "Paris", client: "Salon Expo SAS", status: "ready", provenance: "transporteur", code: "SM26", borneNums: ["C381", "C382", "C412", "C415", "C420", "C421", "P455", "P460", "P501", "P502", "P510", "P511"], commercial: "BL", chefsProjets: ["BG", "ER"] },
  { id: "EVT-291", name: "Soirée L'Oréal", dateStart: 10, dateEnd: 10, clientType: "Professionnel", bornes: 4, borneTypes: ["Prestige"], animationType: "photobooth", ville: "Paris", client: "L'Oréal Group", status: "logistics", provenance: "transporteur", code: "LO26", borneNums: ["P455", "P460"], commercial: "BL", chefsProjets: ["ER"] },
  { id: "EVT-294", name: "Mariage Dupont", dateStart: 14, dateEnd: 14, clientType: "Particulier", bornes: 2, borneTypes: ["Spherik"], animationType: "photobooth", ville: "Rennes", client: "Famille Dupont", status: "design", provenance: "antenne", code: "MD26", borneNums: [], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-298", name: "Festival Nantes Digital", dateStart: 15, dateEnd: 17, clientType: "Professionnel", bornes: 8, borneTypes: ["Classik"], animationType: "mosaique", ville: "Nantes", client: "Nantes Métropole", status: "confirmed", provenance: "antenne", code: "FN26", borneNums: ["C220", "C221", "C222", "C223"], antenne: { name: "Camille Moreau", initials: "CM", color: "bg-cyan-500" }, commercial: "BL", chefsProjets: ["BG"] },
  { id: "EVT-302", name: "Team Building Airbus", dateStart: 18, dateEnd: 18, clientType: "Professionnel", bornes: 3, borneTypes: ["Classik"], animationType: "jeux", ville: "Toulouse", client: "Airbus SE", status: "design", provenance: "transporteur", code: "AB26", borneNums: [], commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-305", name: "Gala BMW Munich", dateStart: 20, dateEnd: 20, clientType: "Professionnel", bornes: 6, borneTypes: ["Prestige", "Spherik"], animationType: "photobooth", ville: "Munich", client: "BMW AG", status: "confirmed", provenance: "transporteur", code: "BM26", borneNums: ["P455", "P460", "S501", "S502", "S510", "S511"], commercial: "BL", chefsProjets: ["BG", "PT"] },
  { id: "EVT-308", name: "Mariage Cohen", dateStart: 22, dateEnd: 22, clientType: "Particulier", bornes: 2, borneTypes: ["Spherik"], animationType: "diaporama", ville: "Lyon", client: "Famille Cohen", status: "confirmed", provenance: "antenne", code: "MC26", borneNums: ["S330", "S331"], antenne: { name: "Sophie Renard", initials: "SR", color: "bg-rose-500" }, commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-312", name: "Salon Auto Lyon", dateStart: 25, dateEnd: 27, clientType: "Professionnel", bornes: 10, borneTypes: ["Classik", "Spherik"], animationType: "photobooth", ville: "Lyon", client: "Lyon Auto Events", status: "confirmed", provenance: "transporteur", code: "SA26", borneNums: ["S330", "S331", "S332", "S333", "C381", "C382", "C412", "C415", "C420", "C421"], commercial: "BL", chefsProjets: ["ER", "SM"] },
  { id: "EVT-315", name: "Anniversaire Nike", dateStart: 28, dateEnd: 28, clientType: "Professionnel", bornes: 5, borneTypes: ["Prestige"], animationType: "social", ville: "Paris", client: "Nike France", status: "confirmed", provenance: "antenne", code: "NK26", borneNums: ["P455", "P460", "P501"], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "BL", chefsProjets: ["PT"] },
  { id: "EVT-320", name: "Mariage Silva", dateStart: 1, dateEnd: 1, clientType: "Particulier", bornes: 1, borneTypes: ["Classik"], animationType: "photobooth", ville: "Bordeaux", client: "Famille Silva", status: "confirmed", provenance: "antenne", code: "MS26", borneNums: ["C120"], antenne: { name: "Lucas Petit", initials: "LP", color: "bg-orange-500" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-322", name: "Séminaire Total", dateStart: 3, dateEnd: 4, clientType: "Professionnel", bornes: 3, borneTypes: ["Spherik"], animationType: "photobooth", ville: "Paris", client: "TotalEnergies", status: "confirmed", provenance: "transporteur", code: "ST26", borneNums: ["S510", "S511", "S512"], commercial: "BL", chefsProjets: ["BG"] },
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

const MONTHS = [
  { name: "Décembre 2025", short: "déc. 2025", days: 31, offset: 0 },   // idx 0
  { name: "Janvier 2026", short: "jan. 2026", days: 31, offset: 3 },     // idx 1
  { name: "Février 2026", short: "fév. 2026", days: 28, offset: 6 },     // idx 2 ← current
  { name: "Mars 2026", short: "mars 2026", days: 31, offset: 6 },        // idx 3
  { name: "Avril 2026", short: "avr. 2026", days: 30, offset: 2 },       // idx 4
  { name: "Mai 2026", short: "mai 2026", days: 31, offset: 4 },          // idx 5
  { name: "Juin 2026", short: "juin 2026", days: 30, offset: 0 },        // idx 6
];
const CURRENT_MONTH_IDX = 2; // Février 2026
const TODAY = 7;
const ALL_VILLES = [...new Set(EVENTS_DATA.map(e => e.ville))].sort();

/* ── Page ──────────────────────────────────────────── */

export default function EventsPlanning() {
  const [view, setView] = useState("month");
  const [monthIdx, setMonthIdx] = useState(CURRENT_MONTH_IDX);
  const [weekStart, setWeekStart] = useState(3); // Monday of the week containing TODAY
  const [clientTypeFilter, setClientTypeFilter] = useState("all");
  const [borneFilters, setBorneFilters] = useState([]);
  const [animFilter, setAnimFilter] = useState("all");
  const [villeFilter, setVilleFilter] = useState("all");
  const [villeSearch, setVilleSearch] = useState("");
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const [provenanceFilter, setProvenanceFilter] = useState("all");
  const [personneFilter, setPersonneFilter] = useState("all");
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
    (provenanceFilter === "all" || e.provenance === provenanceFilter) &&
    (personneFilter === "all" || e.commercial === personneFilter || (e.chefsProjets || []).includes(personneFilter))
  );

  const hasActiveFilters = clientTypeFilter !== "all" || borneFilters.length > 0 || animFilter !== "all" || villeFilter !== "all" || provenanceFilter !== "all" || personneFilter !== "all";
  const clearFilters = () => { setClientTypeFilter("all"); setBorneFilters([]); setAnimFilter("all"); setVilleFilter("all"); setProvenanceFilter("all"); setPersonneFilter("all"); };

  const toggleBorneFilter = (t) => setBorneFilters(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const month = MONTHS[monthIdx];
  const isCurrentMonth = monthIdx === CURRENT_MONTH_IDX;

  // ── Calendar grid (month)
  const weeks = [];
  let currentWeek = [];
  for (let i = 0; i < month.offset; i++) currentWeek.push(null);
  for (let d = 1; d <= month.days; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
  }
  if (currentWeek.length > 0) { while (currentWeek.length < 7) currentWeek.push(null); weeks.push(currentWeek); }

  // ── Week view days
  const weekDays = [];
  for (let d = weekStart; d < weekStart + 7 && d <= month.days; d++) {
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
        actions={
          <a href="/events/create" className="flex h-8 items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 text-white text-[12px] font-medium hover:brightness-110 transition shadow-sm">
            <Plus className="h-4 w-4" />
            Nouvel événement
          </a>
        }
      />

      {/* Toolbar — Line 1: period nav + view toggle (with Aujourd'hui) */}
      <div className="mb-2 flex items-center gap-2">
        {/* Period nav */}
        <div className="flex items-center gap-1 rounded-lg border border-[--k-border] bg-white">
          <button
            onClick={() => {
              if (view === "week") setWeekStart(Math.max(1, weekStart - 7));
              else setMonthIdx(Math.max(0, monthIdx - 1));
            }}
            className={cn("flex h-8 w-8 items-center justify-center rounded-l-lg hover:bg-[--k-surface-2] text-[--k-muted] transition", view === "month" && monthIdx === 0 && "opacity-30 pointer-events-none")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 text-[13px] font-semibold text-[--k-text] min-w-[140px] text-center">
            {view === "week" ? `${weekStart}–${Math.min(weekStart + 6, month.days)} ${month.short}` : month.name}
          </span>
          <button
            onClick={() => {
              if (view === "week") setWeekStart(Math.min(month.days - 6, weekStart + 7));
              else setMonthIdx(Math.min(MONTHS.length - 1, monthIdx + 1));
            }}
            className={cn("flex h-8 w-8 items-center justify-center rounded-r-lg hover:bg-[--k-surface-2] text-[--k-muted] transition", view === "month" && monthIdx === MONTHS.length - 1 && "opacity-30 pointer-events-none")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1" />

        {/* View toggle: Mois / Semaine / Aujourd'hui */}
        <div className="flex gap-1 rounded-lg border border-[--k-border] bg-white p-0.5">
          {[{ key: "month", label: "Mois" }, { key: "week", label: "Semaine" }].map(v => (
            <button
              key={v.key}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[11px] font-medium transition",
                view === v.key ? "bg-[--k-primary] text-white shadow-sm" : "text-[--k-muted] hover:text-[--k-text] hover:bg-[--k-surface-2]"
              )}
              onClick={() => setView(v.key)}
            >
              {v.label}
            </button>
          ))}
          <button
            onClick={() => { setMonthIdx(CURRENT_MONTH_IDX); setView("week"); setWeekStart(Math.max(1, TODAY - ((TODAY - 1 + MONTHS[CURRENT_MONTH_IDX].offset) % 7))); }}
            className="rounded-md px-2.5 py-1.5 text-[11px] font-medium text-[--k-muted] hover:text-[--k-text] hover:bg-[--k-surface-2] transition"
          >
            Aujourd'hui
          </button>
        </div>
      </div>

      {/* Toolbar — Line 2: filters (right-aligned) */}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <Filter className="h-3.5 w-3.5 text-[--k-muted]" />

        <select
          value={clientTypeFilter}
          onChange={e => setClientTypeFilter(e.target.value)}
          className={cn("h-8 rounded-lg border bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", clientTypeFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
        >
          <option value="all">Client : Tous</option>
          <option value="Professionnel">Pro</option>
          <option value="Particulier">Particulier</option>
        </select>

        {/* Borne multi-select dropdown */}
        <div className="relative group">
          <button
            className={cn(
              "flex items-center gap-1.5 h-8 rounded-lg border bg-white px-2 text-[12px] font-medium transition",
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
          className={cn("h-8 rounded-lg border bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", animFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
        >
          <option value="all">Animation : Toutes</option>
          {ANIMATION_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>

        {/* Ville - searchable dropdown */}
        <div ref={villeRef} className="relative">
          <button
            onClick={() => setVilleDropdownOpen(v => !v)}
            className={cn(
              "flex items-center gap-1.5 h-8 rounded-lg border bg-white px-2 text-[12px] font-medium transition",
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
          className={cn("h-8 rounded-lg border bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", provenanceFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
        >
          <option value="all">Provenance : Toutes</option>
          <option value="antenne">Antenne locale</option>
          <option value="transporteur">Transporteur</option>
        </select>

        <select
          value={personneFilter}
          onChange={e => setPersonneFilter(e.target.value)}
          className={cn("h-8 rounded-lg border bg-white px-2 text-[12px] font-medium text-[--k-text] outline-none transition", personneFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
        >
          <option value="all">Personne : Toutes</option>
          {Object.entries(TEAM_MEMBERS).map(([k, m]) => <option key={k} value={k}>{m.name}</option>)}
        </select>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-[12px] text-[--k-muted] hover:text-[--k-danger] transition">
            <X className="h-3 w-3" /> Effacer
          </button>
        )}
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
                const isToday = isCurrentMonth && day === TODAY;
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
              const isToday = isCurrentMonth && day === TODAY;
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

      {/* Event list — dynamic based on view & filters */}
      {(() => {
        const visibleEvents = isCurrentMonth
          ? (view === "week"
            ? filteredEvents.filter(e => {
                const weekEnd = Math.min(weekStart + 6, month.days);
                return e.dateEnd >= weekStart && e.dateStart <= weekEnd;
              })
            : filteredEvents)
          : [];
        const listLabel = view === "week"
          ? `Événements de la semaine (${visibleEvents.length})`
          : `Événements — ${month.name} (${visibleEvents.length})`;
        return (
          <div className="mt-5 rounded-2xl border border-[--k-border] bg-white shadow-sm">
            <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
              <span className="text-[13px] font-semibold text-[--k-text]">{listLabel}</span>
            </div>
            {visibleEvents.length === 0 ? (
              <div className="px-4 py-8 text-center text-[13px] text-[--k-muted]">Aucun événement ne correspond aux filtres sélectionnés.</div>
            ) : (
              <div className="divide-y divide-[--k-border]">
                {visibleEvents.map(evt => {
                  const tc = CLIENT_TYPE_COLORS[evt.clientType] || CLIENT_TYPE_COLORS.Professionnel;
                  const st = STATUS_MAP[evt.status] || { label: evt.status, dot: "bg-slate-300" };
                  return (
                    <button key={evt.id} onClick={(e) => handleEventClick(evt, e)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition w-full text-left">
                      <span className={cn("h-2 w-2 rounded-full shrink-0", st.dot)} />
                      <span className="text-[11px] font-mono text-[--k-muted] shrink-0 w-10">{evt.code}</span>
                      <div className="min-w-0 w-[220px] shrink-0">
                        <div className="text-[12px] font-medium text-[--k-text] truncate">{evt.name}</div>
                        <div className="text-[11px] text-[--k-muted] truncate">{evt.client}</div>
                      </div>
                      {/* Ville */}
                      <span className="shrink-0 flex items-center gap-1 text-[11px] text-[--k-muted] w-[90px]">
                        <MapPin className="h-3 w-3 shrink-0" />{evt.ville}
                      </span>
                      {/* Borne nums */}
                      <div className="shrink-0 flex items-center gap-1.5 w-[150px]">
                        {evt.borneNums && evt.borneNums.length > 0 ? (
                          <>
                            <Monitor className="h-3.5 w-3.5 text-[--k-text]/50 shrink-0" />
                            <span className="text-[11px] font-mono font-medium text-[--k-text] truncate" title={evt.borneNums.join(", ")}>
                              {evt.borneNums.length <= 3 ? evt.borneNums.join(", ") : `${evt.borneNums.slice(0, 2).join(", ")} +${evt.borneNums.length - 2}`}
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] italic text-[--k-muted]/50">Non affecté</span>
                        )}
                      </div>
                      {/* Team avatars: commercial + chefs de projet */}
                      <div className="shrink-0 w-[72px] flex items-center -space-x-1.5">
                        {evt.commercial && TEAM_MEMBERS[evt.commercial] && (
                          <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-white", TEAM_MEMBERS[evt.commercial].color)} title={`Commercial : ${TEAM_MEMBERS[evt.commercial].name}`}>
                            {TEAM_MEMBERS[evt.commercial].initials}
                          </span>
                        )}
                        {(evt.chefsProjets || []).map(cp => TEAM_MEMBERS[cp] && (
                          <span key={cp} className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-white", TEAM_MEMBERS[cp].color)} title={`${TEAM_MEMBERS[cp].role} : ${TEAM_MEMBERS[cp].name}`}>
                            {TEAM_MEMBERS[cp].initials}
                          </span>
                        ))}
                      </div>
                      {/* Provenance */}
                      <div className="shrink-0 w-[120px] flex items-center gap-1.5">
                        {evt.provenance === "antenne" && evt.antenne ? (
                          <>
                            <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[7px] font-bold text-white shrink-0", evt.antenne.color)}>
                              {evt.antenne.initials}
                            </span>
                            <span className="text-[11px] text-[--k-text] truncate">{evt.antenne.name}</span>
                          </>
                        ) : evt.provenance === "antenne" ? (
                          <span className="text-[11px] text-[--k-muted]">Antenne</span>
                        ) : (
                          <span className="text-[11px] text-[--k-muted]">Transporteur</span>
                        )}
                      </div>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 w-[42px] text-center", tc.bg, tc.text)}>{evt.clientType === "Professionnel" ? "Pro" : "Part."}</span>
                      <span className="text-[12px] font-semibold text-[--k-text] shrink-0 w-[70px] text-right">
                        {evt.dateStart === evt.dateEnd ? `${evt.dateStart} fév` : `${evt.dateStart}–${evt.dateEnd} fév`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

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
              {/* Team */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[11px] text-[--k-muted] shrink-0">Équipe</span>
                <div className="flex items-center -space-x-1.5">
                  {popup.commercial && TEAM_MEMBERS[popup.commercial] && (
                    <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white", TEAM_MEMBERS[popup.commercial].color)} title={`Commercial : ${TEAM_MEMBERS[popup.commercial].name}`}>
                      {TEAM_MEMBERS[popup.commercial].initials}
                    </span>
                  )}
                  {(popup.chefsProjets || []).map(cp => TEAM_MEMBERS[cp] && (
                    <span key={cp} className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white", TEAM_MEMBERS[cp].color)} title={`${TEAM_MEMBERS[cp].role} : ${TEAM_MEMBERS[cp].name}`}>
                      {TEAM_MEMBERS[cp].initials}
                    </span>
                  ))}
                  {popup.antenne && (
                    <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white", popup.antenne.color)} title={`Antenne : ${popup.antenne.name}`}>
                      {popup.antenne.initials}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-[11px] text-[--k-muted]">
                  {popup.commercial && TEAM_MEMBERS[popup.commercial] && <span>{TEAM_MEMBERS[popup.commercial].name} <span className="opacity-60">(Commercial)</span></span>}
                  {(popup.chefsProjets || []).map(cp => TEAM_MEMBERS[cp] && <span key={cp}>{TEAM_MEMBERS[cp].name} <span className="opacity-60">({TEAM_MEMBERS[cp].role})</span></span>)}
                  {popup.antenne && <span>{popup.antenne.name} <span className="opacity-60">(Antenne)</span></span>}
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
