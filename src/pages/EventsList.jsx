import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  CalendarDays, Camera, Search, Filter, Plus, ChevronDown,
  MapPin, Download, MoreHorizontal, Eye, Edit, Copy, Trash2
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const EVENTS = [
  { id: "EVT-2026-0287", name: "Salon du Mariage Paris", client: "Salon Expo SAS", dateStart: "2026-02-08", dateEnd: "2026-02-10", bornes: 12, type: "Salon", location: "Paris Expo — Porte de Versailles", status: "ready", antenne: "IDF Paris", contact: "Marie Laurent" },
  { id: "EVT-2026-0291", name: "Soirée L'Oréal 50 ans", client: "L'Oréal Group", dateStart: "2026-02-10", dateEnd: "2026-02-10", bornes: 4, type: "Corporate", location: "Pavillon Cambon, Paris", status: "logistics", antenne: "IDF Paris", contact: "Thomas Duval" },
  { id: "EVT-2026-0294", name: "Mariage Dupont-Martin", client: "Famille Dupont", dateStart: "2026-02-14", dateEnd: "2026-02-14", bornes: 2, type: "Mariage", location: "Château de Versailles", status: "design", antenne: "IDF Paris", contact: "Julie Dupont" },
  { id: "EVT-2026-0298", name: "Festival Nantes Digital", client: "Nantes Métropole", dateStart: "2026-02-15", dateEnd: "2026-02-17", bornes: 8, type: "Festival", location: "Parc des Expo, Nantes", status: "confirmed", antenne: "Grand Ouest", contact: "Pierre Morin" },
  { id: "EVT-2026-0302", name: "Team Building Airbus", client: "Airbus SE", dateStart: "2026-02-18", dateEnd: "2026-02-18", bornes: 3, type: "Corporate", location: "Blagnac, Toulouse", status: "design", antenne: "Occitanie", contact: "Sophie Bernard" },
  { id: "EVT-2026-0305", name: "Gala BMW Munich", client: "BMW AG", dateStart: "2026-02-20", dateEnd: "2026-02-20", bornes: 6, type: "Corporate", location: "BMW Welt, Munich", status: "confirmed", antenne: "International", contact: "Hans Weber" },
  { id: "EVT-2026-0308", name: "Mariage Cohen-Lévy", client: "Famille Cohen", dateStart: "2026-02-22", dateEnd: "2026-02-22", bornes: 2, type: "Mariage", location: "Domaine de Primard", status: "confirmed", antenne: "IDF Paris", contact: "Rachel Cohen" },
  { id: "EVT-2026-0312", name: "Salon Auto Lyon", client: "Lyon Auto Events", dateStart: "2026-02-25", dateEnd: "2026-02-27", bornes: 10, type: "Salon", location: "Eurexpo Lyon", status: "confirmed", antenne: "Rhône-Alpes", contact: "Marc Petit" },
  { id: "EVT-2026-0315", name: "Anniversaire Nike", client: "Nike France", dateStart: "2026-02-28", dateEnd: "2026-02-28", bornes: 5, type: "Corporate", location: "Nike Campus, Paris", status: "confirmed", antenne: "IDF Paris", contact: "Léa Martin" },
  { id: "EVT-2026-0256", name: "Soirée Chanel N°5", client: "Chanel SAS", dateStart: "2026-01-28", dateEnd: "2026-01-28", bornes: 3, type: "Corporate", location: "Grand Palais, Paris", status: "done", antenne: "IDF Paris", contact: "Emma Blanc" },
  { id: "EVT-2026-0248", name: "Carnaval Nice", client: "Ville de Nice", dateStart: "2026-01-24", dateEnd: "2026-01-26", bornes: 15, type: "Festival", location: "Promenade des Anglais", status: "done", antenne: "PACA", contact: "Antoine Rossi" },
  { id: "EVT-2026-0241", name: "Mariage Petit-Grand", client: "Famille Petit", dateStart: "2026-01-18", dateEnd: "2026-01-18", bornes: 1, type: "Mariage", location: "Moulin de Vernègues", status: "done", antenne: "PACA", contact: "Claire Petit" },
];

const STATUS_MAP = {
  confirmed: { label: "Confirmé", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  design: { label: "Création", color: "bg-violet-50 text-violet-600", dot: "bg-violet-500" },
  logistics: { label: "Logistique", color: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  live: { label: "En cours", color: "bg-rose-50 text-rose-500", dot: "bg-rose-500" },
  done: { label: "Terminé", color: "bg-slate-100 text-slate-500", dot: "bg-slate-300" },
};

const TYPE_COLORS = {
  Salon: "bg-indigo-50 text-indigo-600",
  Corporate: "bg-blue-50 text-blue-600",
  Mariage: "bg-pink-50 text-pink-500",
  Festival: "bg-orange-50 text-orange-600",
};

const STATUS_TABS = [
  { key: "all", label: "Tous" },
  { key: "active", label: "En production" },
  { key: "done", label: "Terminés" },
];

function formatDate(d) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

/* ── Page ──────────────────────────────────────────── */

export default function EventsList() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const filtered = EVENTS.filter(e => {
    if (search) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.client.toLowerCase().includes(q) && !e.id.toLowerCase().includes(q)) return false;
    }
    if (tab === "active") return e.status !== "done";
    if (tab === "done") return e.status === "done";
    return true;
  });

  return (
    <AppShell currentApp="Events Manager" activeKey="events-list">
      <PageHeader
        title="Événements"
        subtitle={`${EVENTS.length} événements`}
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
            <Filter className="h-3.5 w-3.5" /> Filtres
          </button>
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] px-2.5 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[--k-border] bg-rose-50/20">
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Événement</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Client</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Dates</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Lieu</th>
                <th className="px-4 py-2.5 text-center font-semibold text-[--k-muted]">Bornes</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Type</th>
                <th className="px-4 py-2.5 text-left font-semibold text-[--k-muted]">Statut</th>

                <th className="px-4 py-2.5 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(evt => {
                const st = STATUS_MAP[evt.status];
                const tc = TYPE_COLORS[evt.type] || "bg-slate-50 text-slate-600";
                return (
                  <tr key={evt.id} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2]/30 transition group">
                    <td className="px-4 py-2.5">
                      <a href={`/events/${evt.id}`} className="font-medium text-[--k-text] hover:text-[--k-primary] transition">{evt.name}</a>
                      <div className="text-[11px] text-[--k-muted]">{evt.id}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-[--k-text]">{evt.client}</div>
                      <div className="text-[11px] text-[--k-muted]">{evt.contact}</div>
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <div className="font-medium">{formatDate(evt.dateStart)}</div>
                      {evt.dateStart !== evt.dateEnd && <div className="text-[11px] text-[--k-muted]">→ {formatDate(evt.dateEnd)}</div>}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1 text-[--k-muted]">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate max-w-[160px]">{evt.location}</span>
                      </div>
                      <div className="text-[11px] text-[--k-muted]">{evt.antenne}</div>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <Camera className="h-3 w-3 text-[--k-muted]" />
                        {evt.bornes}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold", tc)}>{evt.type}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold", st.color)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                        {st.label}
                      </span>
                    </td>

                    <td className="px-4 py-2.5 relative">
                      <button
                        className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[--k-surface-2] transition text-[--k-muted]"
                        onClick={() => setMenuOpen(menuOpen === evt.id ? null : evt.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {menuOpen === evt.id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(null)} />
                          <div className="absolute right-4 z-40 mt-1 w-[160px] rounded-xl border border-[--k-border] bg-white shadow-lg py-1">
                            <a href={`/events/${evt.id}`} className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[--k-text] hover:bg-[--k-surface-2]">
                              <Eye className="h-3.5 w-3.5" /> Voir détail
                            </a>
                            <a href={`/events/${evt.id}/edit`} className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[--k-text] hover:bg-[--k-surface-2]">
                              <Edit className="h-3.5 w-3.5" /> Modifier
                            </a>
                            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-[--k-text] hover:bg-[--k-surface-2]">
                              <Copy className="h-3.5 w-3.5" /> Dupliquer
                            </button>
                            <div className="mx-2 my-1 border-t border-[--k-border]" />
                            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-[12px] text-[--k-danger] hover:bg-red-50">
                              <Trash2 className="h-3.5 w-3.5" /> Supprimer
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2.5 text-[12px] text-[--k-muted]">
          <span>{filtered.length} événement{filtered.length > 1 ? "s" : ""}</span>
          <span>{filtered.reduce((s, e) => s + e.bornes, 0)} bornes</span>
        </div>
      </div>
    </AppShell>
  );
}
