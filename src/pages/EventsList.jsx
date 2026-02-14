import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  Search, Plus, Download, MapPin, Monitor,
  Truck, Building2, MoreHorizontal, Edit, Eye, Copy, Trash2, FileText,
  ChevronDown, ChevronRight, X,
  CheckCircle2, Circle, Clock, AlertTriangle
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const TEAM_MEMBERS = {
  BL: { name: "Bertrand L.", initials: "BL", color: "bg-indigo-500", role: "Commercial", photo: "https://i.pravatar.cc/150?u=bertrand" },
  LL: { name: "Lucie L.", initials: "LL", color: "bg-pink-500", role: "Commerciale", photo: "https://i.pravatar.cc/150?u=lucie" },
  BG: { name: "Benjamin G.", initials: "BG", color: "bg-emerald-500", role: "Chef de projet", photo: "https://i.pravatar.cc/150?u=benjamin" },
  ER: { name: "Elen R.", initials: "ER", color: "bg-fuchsia-500", role: "Cheffe de projet", photo: "https://i.pravatar.cc/150?u=elen" },
  PT: { name: "Pauline T.", initials: "PT", color: "bg-amber-500", role: "Cheffe de projet", photo: "https://i.pravatar.cc/150?u=pauline" },
  SM: { name: "Seb M.", initials: "SM", color: "bg-sky-500", role: "Chef de projet", photo: "https://i.pravatar.cc/150?u=seb" },
};

const EVENTS = [
  { id: "EVT-287", name: "Salon du Mariage Paris", client: "Salon Expo SAS", date: "2026-02-08", dateLabel: "8–10 fév", heureDebut: "10:00", heureFin: "19:00", bornes: 12, borneNums: ["C381", "C382", "C412", "C415", "C420", "C421", "P455", "P460", "P501", "P502", "P510", "P511"], ville: "Paris", code: "SM26", clientType: "Pro", status: "ready", priority: "haute", progress: { briefing: true, crea: true, config: true, logistique: true, event: false, cloture: false }, provenances: ["antenne", "transporteur"], antenne: { name: "Yann Le Goff", initials: "YG", photo: "https://i.pravatar.cc/150?u=yann" }, commercial: "BL", chefsProjets: ["BG", "ER"] },
  { id: "EVT-291", name: "Soirée L'Oréal 50 ans", client: "L'Oréal Group", date: "2026-02-10", dateLabel: "10 fév", heureDebut: "19:30", heureFin: "23:30", bornes: 4, borneNums: ["P455", "P460"], ville: "Paris", code: "LO26", clientType: "Pro", status: "logistics", priority: "haute", progress: { briefing: true, crea: true, config: false, logistique: false, event: false, cloture: false }, provenances: ["transporteur"], commercial: "BL", chefsProjets: ["ER"] },
  { id: "EVT-294", name: "Mariage Dupont-Martin", client: "Famille Dupont", date: "2026-02-14", dateLabel: "14 fév", heureDebut: "15:00", heureFin: "02:00", bornes: 2, borneNums: [], ville: "Rennes", code: "MD26", clientType: "Part.", status: "design", priority: "moyenne", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", photo: "https://i.pravatar.cc/150?u=yann" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-298", name: "Festival Nantes Digital", client: "Nantes Métropole", date: "2026-02-15", dateLabel: "15–17 fév", heureDebut: "09:00", heureFin: "18:00", bornes: 8, borneNums: ["C220", "C221", "C222", "C223"], ville: "Nantes", code: "FN26", clientType: "Pro", status: "confirmed", priority: "moyenne", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], antenne: { name: "Camille Moreau", initials: "CM", photo: "https://i.pravatar.cc/150?u=camille-moreau" }, commercial: "BL", chefsProjets: ["BG"] },
  { id: "EVT-302", name: "Team Building Airbus", client: "Airbus SE", date: "2026-02-18", dateLabel: "18 fév", heureDebut: "09:00", heureFin: "17:00", bornes: 3, borneNums: [], ville: "Toulouse", code: "AB26", clientType: "Pro", status: "design", priority: "faible", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-305", name: "Gala BMW Munich", client: "BMW AG", date: "2026-02-20", dateLabel: "20 fév", heureDebut: "20:00", heureFin: "01:00", bornes: 6, borneNums: ["P455", "P460", "S501", "S502", "S510", "S511"], ville: "Munich", code: "BM26", clientType: "Pro", status: "confirmed", priority: "haute", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["transporteur"], commercial: "BL", chefsProjets: ["BG", "PT"] },
  { id: "EVT-308", name: "Mariage Cohen-Lévy", client: "Famille Cohen", date: "2026-02-22", dateLabel: "22 fév", heureDebut: "16:00", heureFin: "03:00", bornes: 2, borneNums: ["S330", "S331"], ville: "Lyon", code: "MC26", clientType: "Part.", status: "confirmed", priority: "faible", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], antenne: { name: "Sophie Renard", initials: "SR", photo: "https://i.pravatar.cc/150?u=sophie" }, commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-312", name: "Salon Auto Lyon", client: "Lyon Auto Events", date: "2026-02-25", dateLabel: "25–27 fév", heureDebut: "10:00", heureFin: "19:00", bornes: 10, borneNums: ["S330", "S331", "S332", "S333", "C381", "C382", "C412", "C415", "C420", "C421"], ville: "Lyon", code: "SA26", clientType: "Pro", status: "confirmed", priority: "haute", progress: { briefing: true, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne", "transporteur"], antenne: { name: "Sophie Renard", initials: "SR", photo: "https://i.pravatar.cc/150?u=sophie" }, commercial: "BL", chefsProjets: ["ER", "SM"] },
  { id: "EVT-315", name: "Anniversaire Nike", client: "Nike France", date: "2026-02-28", dateLabel: "28 fév", heureDebut: "18:00", heureFin: "23:00", bornes: 5, borneNums: ["P455", "P460", "P501"], ville: "Paris", code: "NK26", clientType: "Pro", status: "confirmed", priority: "moyenne", progress: { briefing: false, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", photo: "https://i.pravatar.cc/150?u=yann" }, commercial: "BL", chefsProjets: ["PT"] },
  { id: "EVT-320", name: "Mariage Silva", client: "Famille Silva", date: "2026-03-01", dateLabel: "1 mars", heureDebut: "14:00", heureFin: "01:00", bornes: 1, borneNums: ["C120"], ville: "Bordeaux", code: "MS26", clientType: "Part.", status: "confirmed", priority: "faible", progress: { briefing: false, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["antenne"], antenne: { name: "Lucas Petit", initials: "LP", photo: "https://i.pravatar.cc/150?u=lucas-petit" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-322", name: "Séminaire Total", client: "TotalEnergies", date: "2026-03-03", dateLabel: "3–4 mars", heureDebut: "08:30", heureFin: "17:30", bornes: 3, borneNums: ["S510", "S511", "S512"], ville: "Paris", code: "ST26", clientType: "Pro", status: "confirmed", priority: "moyenne", progress: { briefing: false, crea: false, config: false, logistique: false, event: false, cloture: false }, provenances: ["transporteur"], commercial: "BL", chefsProjets: ["BG"] },
  { id: "EVT-256", name: "Soirée Chanel N°5", client: "Chanel SAS", date: "2026-01-28", dateLabel: "28 jan", heureDebut: "20:00", heureFin: "00:00", bornes: 3, borneNums: ["P455", "P460", "P501"], ville: "Paris", code: "CH26", clientType: "Pro", status: "done", priority: "haute", progress: { briefing: true, crea: true, config: true, logistique: true, event: true, cloture: true }, provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", photo: "https://i.pravatar.cc/150?u=yann" }, commercial: "BL", chefsProjets: ["ER"] },
  { id: "EVT-248", name: "Carnaval Nice", client: "Ville de Nice", date: "2026-01-24", dateLabel: "24–26 jan", heureDebut: "10:00", heureFin: "22:00", bornes: 15, borneNums: ["C100", "C101", "C102", "C103", "C104", "C105", "C106", "C107", "C108", "C109", "C110", "C111", "C112", "S200", "S201"], ville: "Nice", code: "CN26", clientType: "Pro", status: "done", priority: "haute", progress: { briefing: true, crea: true, config: true, logistique: true, event: true, cloture: true }, provenances: ["antenne", "transporteur"], antenne: { name: "Marc Rossi", initials: "MR", photo: "https://i.pravatar.cc/150?u=marc" }, commercial: "BL", chefsProjets: ["BG", "PT"] },
];

const STATUS_MAP = {
  confirmed: { label: "Confirmé", dot: "bg-blue-500", bg: "bg-blue-50 text-blue-700 border-blue-200" },
  design: { label: "Créa", dot: "bg-violet-500", bg: "bg-violet-50 text-violet-700 border-violet-200" },
  logistics: { label: "Logistique", dot: "bg-amber-500", bg: "bg-amber-50 text-amber-700 border-amber-200" },
  ready: { label: "Prêt", dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  live: { label: "En cours", dot: "bg-rose-500", bg: "bg-rose-50 text-rose-700 border-rose-200" },
  done: { label: "Terminé", dot: "bg-slate-300", bg: "bg-slate-100 text-slate-500 border-slate-200" },
};

const PROGRESS_PHASES = [
  { key: "briefing", label: "Brief", color: "bg-cyan-500" },
  { key: "crea", label: "Créa", color: "bg-violet-500" },
  { key: "config", label: "Config", color: "bg-rose-500" },
  { key: "logistique", label: "Logi", color: "bg-amber-500" },
  { key: "event", label: "Event", color: "bg-emerald-500" },
  { key: "cloture", label: "Clôt.", color: "bg-blue-500" },
];

const STATUS_TABS = [
  { key: "all", label: "Tous" },
  { key: "active", label: "En cours" },
  { key: "done", label: "Terminés" },
];

const PERIOD_OPTIONS = [
  { key: "all", label: "Toute période" },
  { key: "today", label: "Aujourd'hui" },
  { key: "week", label: "Cette semaine" },
  { key: "month", label: "Ce mois" },
  { key: "custom", label: "Personnalisé" },
];


const ALL_VILLES = [...new Set(EVENTS.map(e => e.ville))].sort();

// Month names for grouping
const MONTH_NAMES_FR = { 0: "Janvier", 1: "Février", 2: "Mars", 3: "Avril", 4: "Mai", 5: "Juin", 6: "Juillet", 7: "Août", 8: "Septembre", 9: "Octobre", 10: "Novembre", 11: "Décembre" };

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
}
function getMonthLabel(dateStr) {
  const d = new Date(dateStr);
  return `${MONTH_NAMES_FR[d.getMonth()]} ${d.getFullYear()}`;
}

const BORNE_TYPES = ["Classik", "Spherik", "Prestige", "Autre"];
function getBorneTypes(borneNums) {
  const types = new Set();
  (borneNums || []).forEach(b => {
    if (b.startsWith("C")) types.add("Classik");
    else if (b.startsWith("S")) types.add("Spherik");
    else if (b.startsWith("P")) types.add("Prestige");
    else types.add("Autre");
  });
  return [...types];
}

function getProgressPct(progress) {
  if (!progress) return 0;
  const total = PROGRESS_PHASES.length;
  const done = PROGRESS_PHASES.filter(p => progress[p.key]).length;
  return Math.round((done / total) * 100);
}

/* ── Page ──────────────────────────────────────────── */

export default function EventsList() {
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "active" | "done"
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState(null);
  const [villeFilter, setVilleFilter] = useState("all");
  const [provenanceFilter, setProvenanceFilter] = useState("all");
  const [personneFilter, setPersonneFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("month");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");
  const [stepFilter, setStepFilter] = useState([]); // array of incomplete step keys: "briefing", "crea", "config", "logistique"
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const [villeSearch, setVilleSearch] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState("all"); // "all" | "Pro" | "Part."
  const [borneTypeFilter, setBorneTypeFilter] = useState([]); // array of "Classik" | "Spherik" | "Prestige" | "Autre"
  const actionMenuRef = useRef(null);
  const villeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) setActionMenu(null);
      if (villeRef.current && !villeRef.current.contains(e.target)) setVilleDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Period helpers
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);
  const weekStart = new Date(today); weekStart.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 6);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const filtered = EVENTS.filter(e => {
    if (search) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.client.toLowerCase().includes(q) && !e.id.toLowerCase().includes(q) && !e.code.toLowerCase().includes(q)) return false;
    }
    if (statusFilter === "active") { if (e.status === "done") return false; }
    if (statusFilter === "done") { if (e.status !== "done") return false; }
    return true;
  }).filter(e => {
    // Period filter
    if (periodFilter === "today") return e.date === todayStr;
    if (periodFilter === "week") return e.date >= weekStart.toISOString().slice(0, 10) && e.date <= weekEnd.toISOString().slice(0, 10);
    if (periodFilter === "month") return e.date >= monthStart.toISOString().slice(0, 10) && e.date <= monthEnd.toISOString().slice(0, 10);
    if (periodFilter === "custom") {
      if (customDateFrom && e.date < customDateFrom) return false;
      if (customDateTo && e.date > customDateTo) return false;
    }
    return true;
  }).filter(e =>
    (villeFilter === "all" || e.ville === villeFilter) &&
    (provenanceFilter === "all" || (e.provenances || []).includes(provenanceFilter)) &&
    (personneFilter === "all" || e.commercial === personneFilter || (e.chefsProjets || []).includes(personneFilter)) &&
    (stepFilter.length === 0 || stepFilter.some(sk => !e.progress?.[sk])) &&
    (clientTypeFilter === "all" || e.clientType === clientTypeFilter) &&
    (borneTypeFilter.length === 0 || borneTypeFilter.some(bt => getBorneTypes(e.borneNums).includes(bt)))
  );

  const toggleStepFilter = (key) => setStepFilter(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  const toggleBorneTypeFilter = (bt) => setBorneTypeFilter(prev => prev.includes(bt) ? prev.filter(b => b !== bt) : [...prev, bt]);

  const hasFilters = villeFilter !== "all" || provenanceFilter !== "all" || personneFilter !== "all" || periodFilter !== "month" || statusFilter !== "all" || stepFilter.length > 0 || clientTypeFilter !== "all" || borneTypeFilter.length > 0;
  const clearFilters = () => { setVilleFilter("all"); setProvenanceFilter("all"); setPersonneFilter("all"); setPeriodFilter("month"); setStatusFilter("all"); setStepFilter([]); setClientTypeFilter("all"); setBorneTypeFilter([]); setCustomDateFrom(""); setCustomDateTo(""); };

  // Group by month for table view
  const grouped = {};
  [...filtered].sort((a, b) => a.date.localeCompare(b.date)).forEach(evt => {
    const mk = getMonthKey(evt.date);
    if (!grouped[mk]) grouped[mk] = { label: getMonthLabel(evt.date), events: [] };
    grouped[mk].events.push(evt);
  });

  // Month colors for section bars
  const monthColors = ["border-l-blue-500", "border-l-emerald-500", "border-l-amber-500", "border-l-rose-500", "border-l-violet-500"];

  return (
    <AppShell currentApp="Events Manager" activeKey="events-list">
      <PageHeader
        title="Événements"
        subtitle={`${filtered.length} événement${filtered.length > 1 ? "s" : ""} sur ${EVENTS.length}`}
        actions={
          <a href="/events/create" className="flex h-8 items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 text-white text-[12px] font-medium hover:brightness-110 transition shadow-sm">
            <Plus className="h-4 w-4" />
            Nouvel événement
          </a>
        }
      />

      <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
        {/* Toolbar: search + export */}
        <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--k-muted]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un événement..."
              className="h-8 w-full max-w-xs rounded-lg border border-[--k-border] bg-[--k-surface-2]/50 pl-8 pr-3 text-[12px] outline-none focus:border-[--k-primary] focus:ring-1 focus:ring-[--k-primary]/20 transition"
            />
          </div>
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] px-2.5 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        {/* Single filter row */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[--k-border] px-4 py-2">
          {/* Status: Tous / En cours / Terminés */}
          <div className="flex items-center gap-0.5 rounded-lg bg-[--k-surface-2] p-0.5 border-r border-[--k-border] pr-3 mr-1">
            {STATUS_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setStatusFilter(t.key)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-medium transition",
                  statusFilter === t.key ? "bg-white text-[--k-text] shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Period pills */}
          <div className="flex items-center gap-0.5 border-r border-[--k-border] pr-3 mr-1">
            {PERIOD_OPTIONS.filter(p => p.key !== "custom").map(p => (
              <button
                key={p.key}
                onClick={() => setPeriodFilter(p.key)}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-medium transition",
                  periodFilter === p.key
                    ? "bg-[--k-primary] text-white shadow-sm"
                    : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
                )}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => setPeriodFilter("custom")}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-medium transition",
                periodFilter === "custom"
                  ? "bg-[--k-primary] text-white shadow-sm"
                  : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
              )}
            >
              Personnalisé
            </button>
            {periodFilter === "custom" && (
              <>
                <input type="date" value={customDateFrom} onChange={e => setCustomDateFrom(e.target.value)} className="ml-1 h-6 rounded-md border border-[--k-border] bg-white px-1.5 text-[10px] font-medium outline-none focus:border-[--k-primary] transition" />
                <span className="text-[10px] text-[--k-muted]">→</span>
                <input type="date" value={customDateTo} onChange={e => setCustomDateTo(e.target.value)} className="h-6 rounded-md border border-[--k-border] bg-white px-1.5 text-[10px] font-medium outline-none focus:border-[--k-primary] transition" />
              </>
            )}
          </div>

          {/* Step incomplete filter */}
          <div className="flex items-center gap-0.5 border-r border-[--k-border] pr-3 mr-1">
            <span className="text-[10px] text-[--k-muted] font-medium mr-0.5 shrink-0">Étapes :</span>
            {[
              { key: "briefing", label: "Brief", lightBg: "bg-cyan-50 text-cyan-600 ring-cyan-200" },
              { key: "crea", label: "Créa", lightBg: "bg-violet-50 text-violet-600 ring-violet-200" },
              { key: "config", label: "Config", lightBg: "bg-rose-50 text-rose-600 ring-rose-200" },
              { key: "logistique", label: "Logi", lightBg: "bg-amber-50 text-amber-600 ring-amber-200" },
            ].map(step => (
              <button
                key={step.key}
                onClick={() => toggleStepFilter(step.key)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-bold transition-all",
                  stepFilter.includes(step.key)
                    ? `${step.lightBg} ring-1`
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                )}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Pro / Part */}
          <div className="flex items-center gap-0.5 rounded-lg border border-[--k-border] bg-white p-0.5">
            {[
              { key: "all", label: "Tous" },
              { key: "Pro", label: "Pro" },
              { key: "Part.", label: "Part." },
            ].map(ct => (
              <button
                key={ct.key}
                onClick={() => setClientTypeFilter(ct.key)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-bold transition-all",
                  clientTypeFilter === ct.key
                    ? ct.key === "Pro" ? "bg-blue-50 text-blue-600" : ct.key === "Part." ? "bg-pink-50 text-pink-600" : "bg-slate-100 text-slate-600"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {ct.label}
              </button>
            ))}
          </div>

          {/* Borne type */}
          <div className="flex items-center gap-0.5">
            {BORNE_TYPES.map(bt => (
              <button
                key={bt}
                onClick={() => toggleBorneTypeFilter(bt)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-bold transition-all",
                  borneTypeFilter.includes(bt)
                    ? "bg-slate-700 text-white ring-1 ring-slate-600"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                )}
              >
                {bt}
              </button>
            ))}
          </div>

          {/* Ville */}
          <div ref={villeRef} className="relative">
            <button
              onClick={() => setVilleDropdownOpen(v => !v)}
              className={cn(
                "flex items-center gap-1.5 h-7 w-[120px] rounded-lg border bg-white px-2 text-[11px] font-medium transition",
                villeFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border] text-[--k-text]"
              )}
            >
              <span className="truncate">{villeFilter === "all" ? "Ville" : villeFilter}</span>
              <ChevronDown className="h-3 w-3 shrink-0 ml-auto" />
            </button>
            {villeDropdownOpen && (
              <div className="absolute left-0 z-20 mt-1 w-48 rounded-lg border border-[--k-border] bg-white shadow-lg">
                <div className="p-2 border-b border-[--k-border]">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-[--k-surface-2] rounded text-[11px] text-[--k-muted]">
                    <Search className="h-3 w-3" />
                    <input value={villeSearch} onChange={e => setVilleSearch(e.target.value)} placeholder="Filtrer..." className="bg-transparent border-none outline-none flex-1 text-[--k-text] text-[11px]" autoFocus />
                  </div>
                </div>
                <div className="max-h-48 overflow-auto py-1">
                  <button onClick={() => { setVilleFilter("all"); setVilleDropdownOpen(false); setVilleSearch(""); }} className={cn("w-full text-left px-3 py-1.5 text-[11px] hover:bg-[--k-surface-2] transition", villeFilter === "all" && "font-semibold text-[--k-primary]")}>Toutes les villes</button>
                  {ALL_VILLES.filter(v => !villeSearch || v.toLowerCase().includes(villeSearch.toLowerCase())).map(v => (
                    <button key={v} onClick={() => { setVilleFilter(v); setVilleDropdownOpen(false); setVilleSearch(""); }} className={cn("w-full text-left px-3 py-1.5 text-[11px] hover:bg-[--k-surface-2] transition", villeFilter === v && "font-semibold text-[--k-primary]")}>{v}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <select
            value={provenanceFilter}
            onChange={e => setProvenanceFilter(e.target.value)}
            className={cn("h-7 w-[130px] rounded-lg border bg-white px-2 text-[11px] font-medium text-[--k-text] outline-none transition", provenanceFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
          >
            <option value="all">Provenance</option>
            <option value="antenne">Antenne</option>
            <option value="transporteur">Transporteur</option>
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-[11px] text-[--k-muted] hover:text-[--k-danger] transition">
              <X className="h-3 w-3" /> Effacer
            </button>
          )}
        </div>

        {/* Filters row 2: Person avatar pills — collapsible */}
        <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-2">
          <button
            onClick={() => setShowTeamFilter(v => !v)}
            className={cn(
              "shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all",
              personneFilter !== "all"
                ? "bg-[--k-primary-2] text-[--k-primary]"
                : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
            )}
          >
            {/* Stacked mini-avatars when collapsed */}
            {!showTeamFilter && (
              <div className="flex items-center -space-x-1.5 mr-0.5">
                {Object.entries(TEAM_MEMBERS).slice(0, 4).map(([k, m]) => (
                  <img key={k} src={m.photo} alt={m.name} className="h-4 w-4 rounded-full object-cover ring-1 ring-white" />
                ))}
              </div>
            )}
            <span>Équipe{personneFilter !== "all" ? ` : ${TEAM_MEMBERS[personneFilter]?.name}` : ""}</span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", showTeamFilter && "rotate-180")} />
          </button>

          {/* Expanded team pills */}
          {showTeamFilter && (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setPersonneFilter("all")}
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition",
                  personneFilter === "all"
                    ? "bg-[--k-primary-2] text-[--k-primary] ring-1 ring-[--k-primary]/30"
                    : "text-[--k-muted] hover:bg-[--k-surface-2]"
                )}
              >
                Tous
              </button>
              {Object.entries(TEAM_MEMBERS).map(([k, m]) => {
                const count = EVENTS.filter(e => e.commercial === k || (e.chefsProjets || []).includes(k)).length;
                return (
                  <button
                    key={k}
                    onClick={() => setPersonneFilter(personneFilter === k ? "all" : k)}
                    className={cn(
                      "shrink-0 flex items-center gap-1.5 rounded-full pl-1 pr-2.5 py-0.5 text-[11px] font-medium transition border",
                      personneFilter === k
                        ? "bg-[--k-primary-2] border-[--k-primary]/30 text-[--k-primary]"
                        : "border-transparent hover:bg-[--k-surface-2] text-[--k-text]"
                    )}
                  >
                    <img src={m.photo} alt={m.name} className="h-5 w-5 rounded-full object-cover ring-1 ring-white" />
                    <span>{m.name}</span>
                    <span className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                      personneFilter === k ? "bg-[--k-primary]/10 text-[--k-primary]" : "bg-slate-100 text-slate-400"
                    )}>{count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active person chip — visible when collapsed and filtered */}
          {!showTeamFilter && personneFilter !== "all" && TEAM_MEMBERS[personneFilter] && (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 rounded-full bg-[--k-primary-2] pl-1 pr-2 py-0.5 text-[11px] font-medium text-[--k-primary]">
                <img src={TEAM_MEMBERS[personneFilter].photo} alt={TEAM_MEMBERS[personneFilter].name} className="h-4 w-4 rounded-full object-cover" />
                {TEAM_MEMBERS[personneFilter].name}
              </div>
              <button onClick={() => setPersonneFilter("all")} className="text-[--k-muted] hover:text-[--k-danger] transition">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* ── TABLE ── */}
        <>
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-[13px] text-[--k-muted]">Aucun événement ne correspond aux filtres.</div>
            ) : (
              <div>
                {Object.entries(grouped).map(([mk, group], gi) => (
                  <div key={mk}>
                    {/* Month group header */}
                    <div className={cn("flex items-center gap-3 px-4 py-2 bg-slate-50/80 border-b border-[--k-border] border-l-4", monthColors[gi % monthColors.length])}>
                      <span className="text-[13px] font-bold text-[--k-text]">{group.label}</span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[--k-muted] border border-[--k-border]">{group.events.length}</span>
                    </div>
                    <div className="divide-y divide-[--k-border]">
                      {group.events.map(evt => {
                        const st = STATUS_MAP[evt.status] || { label: evt.status, dot: "bg-slate-300" };
                        return (
                          <div key={evt.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition w-full text-left cursor-pointer" onClick={() => window.location.href = `/events/${evt.id}`}>
                            {/* Date + heures */}
                            <div className="shrink-0 w-[80px]">
                              <div className="text-[12px] font-semibold text-[--k-text]">{evt.dateLabel}</div>
                              <div className="text-[10px] text-[--k-muted]">{evt.heureDebut} – {evt.heureFin}</div>
                            </div>
                            {/* Nom / Client */}
                            <div className="flex-1 min-w-0">
                              <div className="text-[12px] font-medium text-[--k-text] truncate">{evt.name}</div>
                              <div className="text-[11px] text-[--k-muted] truncate">{evt.client}</div>
                            </div>
                            {/* 4 étapes: Brief / Créa / Config / Logi */}
                            <div className="shrink-0 flex items-center gap-0.5">
                              {[
                                { key: "briefing", label: "Brief", color: "text-cyan-500", bg: "bg-cyan-50" },
                                { key: "crea", label: "Créa", color: "text-violet-500", bg: "bg-violet-50" },
                                { key: "config", label: "Config", color: "text-rose-500", bg: "bg-rose-50" },
                                { key: "logistique", label: "Logi", color: "text-amber-500", bg: "bg-amber-50" },
                              ].map(step => {
                                const done = evt.progress?.[step.key];
                                return (
                                  <div key={step.key} title={step.label} className={cn("flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-bold transition-colors", done ? `${step.bg} ${step.color}` : "bg-slate-50 text-slate-300")}>
                                    {done ? <CheckCircle2 className="h-2.5 w-2.5" /> : <Circle className="h-2.5 w-2.5" />}
                                    <span className="hidden lg:inline">{step.label}</span>
                                  </div>
                                );
                              })}
                            </div>
                            {/* Provenance */}
                            <div className="shrink-0 w-[70px] flex items-center gap-1">
                              {(evt.provenances || []).includes("antenne") && (
                                <span className="flex items-center gap-0.5 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-500" title={evt.antenne ? `Antenne · ${evt.antenne.name}` : "Antenne"}>
                                  <Building2 className="h-2.5 w-2.5" />
                                  <span className="hidden xl:inline">Ant.</span>
                                </span>
                              )}
                              {(evt.provenances || []).includes("transporteur") && (
                                <span className="flex items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-500" title="Transporteur">
                                  <Truck className="h-2.5 w-2.5" />
                                  <span className="hidden xl:inline">Exp.</span>
                                </span>
                              )}
                            </div>
                            {/* Code */}
                            <span className="text-[11px] font-mono text-[--k-muted] shrink-0 w-10">{evt.code}</span>
                            {/* Ville */}
                            <span className="shrink-0 flex items-center gap-1 text-[11px] text-[--k-muted] w-[70px]">
                              <MapPin className="h-3 w-3 shrink-0" />{evt.ville}
                            </span>
                            {/* Team avatars inline */}
                            <div className="shrink-0 w-[70px] flex items-center -space-x-1.5">
                              {evt.commercial && TEAM_MEMBERS[evt.commercial] && (
                                <div className="relative group/com">
                                  <img src={TEAM_MEMBERS[evt.commercial].photo} alt={TEAM_MEMBERS[evt.commercial].name} className="h-6 w-6 rounded-full ring-2 ring-white shadow-sm object-cover" />
                                  <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover/com:opacity-100 transition-opacity">
                                    <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg">
                                      <span className="font-medium">{TEAM_MEMBERS[evt.commercial].name}</span>
                                      <span className="text-white/50 ml-1">· Commercial</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {(evt.chefsProjets || []).map(cp => TEAM_MEMBERS[cp] && (
                                <div key={cp} className="relative group/cp">
                                  <img src={TEAM_MEMBERS[cp].photo} alt={TEAM_MEMBERS[cp].name} className="h-6 w-6 rounded-full ring-2 ring-white shadow-sm object-cover" />
                                  <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover/cp:opacity-100 transition-opacity">
                                    <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg">
                                      <span className="font-medium">{TEAM_MEMBERS[cp].name}</span>
                                      <span className="text-white/50 ml-1">· {TEAM_MEMBERS[cp].role}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Bornes — type breakdown */}
                            <div className="shrink-0 flex items-center gap-1">
                              <span className="text-[11px] font-bold text-[--k-text] tabular-nums">{evt.bornes}</span>
                              {(() => {
                                const counts = {};
                                (evt.borneNums || []).forEach(b => {
                                  const t = b.startsWith("C") ? "C" : b.startsWith("S") ? "S" : b.startsWith("P") ? "P" : "?";
                                  counts[t] = (counts[t] || 0) + 1;
                                });
                                const labels = { C: "Classik", S: "Spherik", P: "Prestige" };
                                const colors = { C: "bg-slate-100 text-slate-500", S: "bg-sky-50 text-sky-600", P: "bg-amber-50 text-amber-600" };
                                return Object.entries(counts).map(([t, n]) => (
                                  <span key={t} className={cn("rounded px-1.5 py-0.5 text-[9px] font-bold", colors[t] || "bg-slate-50 text-slate-400")}>
                                    {n}{labels[t] ? ` ${labels[t].slice(0, 3)}` : ""}
                                  </span>
                                ));
                              })()}
                            </div>
                            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 w-[42px] text-center", evt.clientType === "Pro" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700")}>{evt.clientType}</span>
                            {/* Menu actions */}
                            <div className="shrink-0 relative" ref={actionMenu === evt.id ? actionMenuRef : undefined}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setActionMenu(actionMenu === evt.id ? null : evt.id); }}
                                className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                              {actionMenu === evt.id && (
                                <div className="absolute right-0 z-30 mt-1 w-48 rounded-lg border border-[--k-border] bg-white shadow-lg py-1">
                                  <a href={`/events/${evt.id}`} className="flex items-center gap-2 px-3 py-2 text-[12px] text-[--k-text] hover:bg-[--k-surface-2] transition">
                                    <Eye className="h-3.5 w-3.5 text-[--k-muted]" /> Voir la fiche
                                  </a>
                                  <a href="/events/create" className="flex items-center gap-2 px-3 py-2 text-[12px] text-[--k-text] hover:bg-[--k-surface-2] transition">
                                    <Edit className="h-3.5 w-3.5 text-[--k-muted]" /> Modifier
                                  </a>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[--k-text] hover:bg-[--k-surface-2] transition text-left">
                                    <Copy className="h-3.5 w-3.5 text-[--k-muted]" /> Dupliquer
                                  </button>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[--k-text] hover:bg-[--k-surface-2] transition text-left">
                                    <FileText className="h-3.5 w-3.5 text-[--k-muted]" /> Exporter PDF
                                  </button>
                                  <div className="border-t border-[--k-border] my-1" />
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-500 hover:bg-red-50 transition text-left">
                                    <Trash2 className="h-3.5 w-3.5" /> Supprimer
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>


        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2.5 text-[12px] text-[--k-muted]">
          <span>{filtered.length} événement{filtered.length > 1 ? "s" : ""}</span>
          <span>{filtered.reduce((s, e) => s + e.bornes, 0)} bornes</span>
        </div>
      </div>
    </AppShell>
  );
}
