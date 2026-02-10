import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  Search, Filter, Plus, Download, MapPin, Monitor,
  Truck, Building2, MoreHorizontal, Edit, Eye, Copy, Trash2, FileText,
  ChevronDown, X
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

const EVENTS = [
  { id: "EVT-287", name: "Salon du Mariage Paris", client: "Salon Expo SAS", dateLabel: "8–10 fév", heureDebut: "10:00", heureFin: "19:00", bornes: 12, borneNums: ["C381", "C382", "C412", "C415", "C420", "C421", "P455", "P460", "P501", "P502", "P510", "P511"], ville: "Paris", code: "SM26", clientType: "Pro", status: "ready", provenances: ["antenne", "transporteur"], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "BL", chefsProjets: ["BG", "ER"] },
  { id: "EVT-291", name: "Soirée L'Oréal 50 ans", client: "L'Oréal Group", dateLabel: "10 fév", heureDebut: "19:30", heureFin: "23:30", bornes: 4, borneNums: ["P455", "P460"], ville: "Paris", code: "LO26", clientType: "Pro", status: "logistics", provenances: ["transporteur"], commercial: "BL", chefsProjets: ["ER"] },
  { id: "EVT-294", name: "Mariage Dupont-Martin", client: "Famille Dupont", dateLabel: "14 fév", heureDebut: "15:00", heureFin: "02:00", bornes: 2, borneNums: [], ville: "Rennes", code: "MD26", clientType: "Part.", status: "design", provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-298", name: "Festival Nantes Digital", client: "Nantes Métropole", dateLabel: "15–17 fév", heureDebut: "09:00", heureFin: "18:00", bornes: 8, borneNums: ["C220", "C221", "C222", "C223"], ville: "Nantes", code: "FN26", clientType: "Pro", status: "confirmed", provenances: ["antenne"], antenne: { name: "Camille Moreau", initials: "CM", color: "bg-cyan-500" }, commercial: "BL", chefsProjets: ["BG"] },
  { id: "EVT-302", name: "Team Building Airbus", client: "Airbus SE", dateLabel: "18 fév", heureDebut: "09:00", heureFin: "17:00", bornes: 3, borneNums: [], ville: "Toulouse", code: "AB26", clientType: "Pro", status: "design", provenances: ["transporteur"], commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-305", name: "Gala BMW Munich", client: "BMW AG", dateLabel: "20 fév", heureDebut: "20:00", heureFin: "01:00", bornes: 6, borneNums: ["P455", "P460", "S501", "S502", "S510", "S511"], ville: "Munich", code: "BM26", clientType: "Pro", status: "confirmed", provenances: ["transporteur"], commercial: "BL", chefsProjets: ["BG", "PT"] },
  { id: "EVT-308", name: "Mariage Cohen-Lévy", client: "Famille Cohen", dateLabel: "22 fév", heureDebut: "16:00", heureFin: "03:00", bornes: 2, borneNums: ["S330", "S331"], ville: "Lyon", code: "MC26", clientType: "Part.", status: "confirmed", provenances: ["antenne"], antenne: { name: "Sophie Renard", initials: "SR", color: "bg-rose-500" }, commercial: "LL", chefsProjets: ["SM"] },
  { id: "EVT-312", name: "Salon Auto Lyon", client: "Lyon Auto Events", dateLabel: "25–27 fév", heureDebut: "10:00", heureFin: "19:00", bornes: 10, borneNums: ["S330", "S331", "S332", "S333", "C381", "C382", "C412", "C415", "C420", "C421"], ville: "Lyon", code: "SA26", clientType: "Pro", status: "confirmed", provenances: ["antenne", "transporteur"], antenne: { name: "Sophie Renard", initials: "SR", color: "bg-rose-500" }, commercial: "BL", chefsProjets: ["ER", "SM"] },
  { id: "EVT-315", name: "Anniversaire Nike", client: "Nike France", dateLabel: "28 fév", heureDebut: "18:00", heureFin: "23:00", bornes: 5, borneNums: ["P455", "P460", "P501"], ville: "Paris", code: "NK26", clientType: "Pro", status: "confirmed", provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "BL", chefsProjets: ["PT"] },
  { id: "EVT-320", name: "Mariage Silva", client: "Famille Silva", dateLabel: "1 mars", heureDebut: "14:00", heureFin: "01:00", bornes: 1, borneNums: ["C120"], ville: "Bordeaux", code: "MS26", clientType: "Part.", status: "confirmed", provenances: ["antenne"], antenne: { name: "Lucas Petit", initials: "LP", color: "bg-orange-500" }, commercial: "LL", chefsProjets: ["PT"] },
  { id: "EVT-322", name: "Séminaire Total", client: "TotalEnergies", dateLabel: "3–4 mars", heureDebut: "08:30", heureFin: "17:30", bornes: 3, borneNums: ["S510", "S511", "S512"], ville: "Paris", code: "ST26", clientType: "Pro", status: "confirmed", provenances: ["transporteur"], commercial: "BL", chefsProjets: ["BG"] },
  { id: "EVT-256", name: "Soirée Chanel N°5", client: "Chanel SAS", dateLabel: "28 jan", heureDebut: "20:00", heureFin: "00:00", bornes: 3, borneNums: ["P455", "P460", "P501"], ville: "Paris", code: "CH26", clientType: "Pro", status: "done", provenances: ["antenne"], antenne: { name: "Yann Le Goff", initials: "YG", color: "bg-teal-500" }, commercial: "BL", chefsProjets: ["ER"] },
  { id: "EVT-248", name: "Carnaval Nice", client: "Ville de Nice", dateLabel: "24–26 jan", heureDebut: "10:00", heureFin: "22:00", bornes: 15, borneNums: ["C100", "C101", "C102", "C103", "C104", "C105", "C106", "C107", "C108", "C109", "C110", "C111", "C112", "S200", "S201"], ville: "Nice", code: "CN26", clientType: "Pro", status: "done", provenances: ["antenne", "transporteur"], antenne: { name: "Marc Rossi", initials: "MR", color: "bg-violet-500" }, commercial: "BL", chefsProjets: ["BG", "PT"] },
];

const STATUS_MAP = {
  confirmed: { label: "Confirmé", dot: "bg-blue-500" },
  design: { label: "Créa", dot: "bg-violet-500" },
  logistics: { label: "Logistique", dot: "bg-amber-500" },
  ready: { label: "Prêt", dot: "bg-emerald-500" },
  live: { label: "En cours", dot: "bg-rose-500" },
  done: { label: "Terminé", dot: "bg-slate-300" },
};

const STATUS_TABS = [
  { key: "all", label: "Tous" },
  { key: "active", label: "En production" },
  { key: "done", label: "Terminés" },
];

const ALL_VILLES = [...new Set(EVENTS.map(e => e.ville))].sort();

/* ── Page ──────────────────────────────────────────── */

export default function EventsList() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState(null);
  const [villeFilter, setVilleFilter] = useState("all");
  const [provenanceFilter, setProvenanceFilter] = useState("all");
  const [personneFilter, setPersonneFilter] = useState("all");
  const [villeDropdownOpen, setVilleDropdownOpen] = useState(false);
  const [villeSearch, setVilleSearch] = useState("");
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

  const filtered = EVENTS.filter(e => {
    if (search) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.client.toLowerCase().includes(q) && !e.id.toLowerCase().includes(q) && !e.code.toLowerCase().includes(q)) return false;
    }
    if (tab === "active") return e.status !== "done";
    if (tab === "done") return e.status === "done";
    return true;
  }).filter(e =>
    (villeFilter === "all" || e.ville === villeFilter) &&
    (provenanceFilter === "all" || (e.provenances || []).includes(provenanceFilter)) &&
    (personneFilter === "all" || e.commercial === personneFilter || (e.chefsProjets || []).includes(personneFilter))
  );

  const hasFilters = villeFilter !== "all" || provenanceFilter !== "all" || personneFilter !== "all";
  const clearFilters = () => { setVilleFilter("all"); setProvenanceFilter("all"); setPersonneFilter("all"); };

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
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[--k-border] px-4 py-2.5">
          {/* Tabs */}
          <div className="flex gap-1 rounded-lg bg-[--k-surface-2] p-0.5">
            {STATUS_TABS.map(t => (
              <button
                key={t.key}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[12px] font-medium transition",
                  tab === t.key ? "bg-white text-[--k-text] shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
                )}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--k-muted]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="h-8 w-48 rounded-lg border border-[--k-border] bg-[--k-surface-2]/50 pl-8 pr-3 text-[12px] outline-none focus:border-[--k-primary] focus:ring-1 focus:ring-[--k-primary]/20 transition"
            />
          </div>
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] px-2.5 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[--k-border] px-4 py-2">
          <Filter className="h-3.5 w-3.5 text-[--k-muted]" />

          {/* Ville */}
          <div ref={villeRef} className="relative">
            <button
              onClick={() => setVilleDropdownOpen(v => !v)}
              className={cn(
                "flex items-center gap-1.5 h-7 w-[130px] rounded-lg border bg-white px-2 text-[11px] font-medium transition",
                villeFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border] text-[--k-text]"
              )}
            >
              <span className="truncate">{villeFilter === "all" ? "Ville : Toutes" : villeFilter}</span>
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
            className={cn("h-7 w-[155px] rounded-lg border bg-white px-2 text-[11px] font-medium text-[--k-text] outline-none transition", provenanceFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
          >
            <option value="all">Provenance : Toutes</option>
            <option value="antenne">Antenne locale</option>
            <option value="transporteur">Transporteur</option>
          </select>

          <select
            value={personneFilter}
            onChange={e => setPersonneFilter(e.target.value)}
            className={cn("h-7 w-[145px] rounded-lg border bg-white px-2 text-[11px] font-medium text-[--k-text] outline-none transition", personneFilter !== "all" ? "border-[--k-primary] text-[--k-primary]" : "border-[--k-border]")}
          >
            <option value="all">Personne : Toutes</option>
            {Object.entries(TEAM_MEMBERS).map(([k, m]) => <option key={k} value={k}>{m.name}</option>)}
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-[11px] text-[--k-muted] hover:text-[--k-danger] transition">
              <X className="h-3 w-3" /> Effacer
            </button>
          )}
        </div>

        {/* Event rows */}
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-[13px] text-[--k-muted]">Aucun événement ne correspond aux filtres.</div>
        ) : (
          <div className="divide-y divide-[--k-border]">
            {filtered.map(evt => {
              const st = STATUS_MAP[evt.status] || { label: evt.status, dot: "bg-slate-300" };
              return (
                <div key={evt.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition w-full text-left cursor-pointer" onClick={() => window.location.href = `/events/${evt.id}`}>
                  {/* Date + heures */}
                  <div className="shrink-0 w-[80px]">
                    <div className="text-[12px] font-semibold text-[--k-text]">{evt.dateLabel}</div>
                    <div className="text-[10px] text-[--k-muted]">{evt.heureDebut} – {evt.heureFin}</div>
                  </div>
                  <span className={cn("h-2 w-2 rounded-full shrink-0", st.dot)} />
                  {/* Nom / Client */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-[--k-text] truncate">{evt.name}</div>
                    <div className="text-[11px] text-[--k-muted] truncate">{evt.client}</div>
                  </div>
                  {/* Code */}
                  <span className="text-[11px] font-mono text-[--k-muted] shrink-0 w-10">{evt.code}</span>
                  {/* Ville */}
                  <span className="shrink-0 flex items-center gap-1 text-[11px] text-[--k-muted] w-[80px]">
                    <MapPin className="h-3 w-3 shrink-0" />{evt.ville}
                  </span>
                  {/* Commercial */}
                  <div className="shrink-0 w-[34px] flex items-center justify-center">
                    {evt.commercial && TEAM_MEMBERS[evt.commercial] && (
                      <div className="relative group/com">
                        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-white shadow-sm", TEAM_MEMBERS[evt.commercial].color)}>
                          {TEAM_MEMBERS[evt.commercial].initials}
                        </span>
                        <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover/com:opacity-100 transition-opacity">
                          <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg">
                            <span className="font-medium">{TEAM_MEMBERS[evt.commercial].name}</span>
                            <span className="text-white/50 ml-1">• Commercial</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Chef(s) de projet */}
                  <div className="shrink-0 w-[52px] flex items-center -space-x-1.5">
                    {(evt.chefsProjets || []).map(cp => TEAM_MEMBERS[cp] && (
                      <div key={cp} className="relative group/cp">
                        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white ring-2 ring-white shadow-sm", TEAM_MEMBERS[cp].color)}>
                          {TEAM_MEMBERS[cp].initials}
                        </span>
                        <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover/cp:opacity-100 transition-opacity">
                          <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[10px] text-white shadow-lg">
                            <span className="font-medium">{TEAM_MEMBERS[cp].name}</span>
                            <span className="text-white/50 ml-1">• {TEAM_MEMBERS[cp].role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Bornes */}
                  <div className="shrink-0 w-[170px] flex items-center gap-1.5">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-slate-100 shrink-0">
                      <Monitor className="h-3.5 w-3.5 text-slate-500" />
                    </div>
                    {evt.borneNums && evt.borneNums.length > 0 ? (
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-[--k-text] leading-tight">{evt.borneNums.length}/{evt.bornes} affectée{evt.borneNums.length > 1 ? "s" : ""}</div>
                        <div className="text-[10px] font-mono text-[--k-muted] truncate leading-tight" title={evt.borneNums.join(", ")}>
                          {evt.borneNums.length <= 4 ? evt.borneNums.join(", ") : `${evt.borneNums.slice(0, 3).join(", ")} +${evt.borneNums.length - 3}`}
                        </div>
                      </div>
                    ) : (
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold text-amber-600 leading-tight">0/{evt.bornes} affectée{evt.bornes > 1 ? "s" : ""}</div>
                        <div className="text-[10px] italic text-[--k-muted]/60 leading-tight">Non affecté</div>
                      </div>
                    )}
                  </div>
                  {/* Provenance */}
                  <div className="shrink-0 w-[150px] flex items-center gap-1.5 flex-wrap">
                    {(evt.provenances || []).includes("antenne") && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5" title={evt.antenne ? evt.antenne.name : "Antenne"}>
                        <Building2 className="h-3 w-3 text-emerald-600" />
                        <span className="text-[10px] font-medium text-emerald-700 truncate max-w-[70px]">{evt.antenne ? evt.antenne.name.split(" ")[0] : "Antenne"}</span>
                      </span>
                    )}
                    {(evt.provenances || []).includes("transporteur") && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200/60 px-1.5 py-0.5">
                        <Truck className="h-3 w-3 text-amber-600" />
                        <span className="text-[10px] font-medium text-amber-700">Expéd.</span>
                      </span>
                    )}
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 w-[42px] text-center", evt.clientType === "Pro" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700")}>{evt.clientType}</span>
                  {/* Lien fiche */}
                  <a href={`/events/${evt.id}`} onClick={e => e.stopPropagation()} className="shrink-0 flex items-center gap-1 text-[11px] text-[--k-primary] hover:underline font-medium">
                    <Eye className="h-3 w-3" /> Fiche
                  </a>
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
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2.5 text-[12px] text-[--k-muted]">
          <span>{filtered.length} événement{filtered.length > 1 ? "s" : ""}</span>
          <span>{filtered.reduce((s, e) => s + e.bornes, 0)} bornes</span>
        </div>
      </div>
    </AppShell>
  );
}
