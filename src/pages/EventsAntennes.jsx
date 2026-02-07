import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  MapPin, Camera, CalendarDays, User, Phone, Mail,
  ChevronDown, ChevronRight, Truck, CheckCircle2, Clock,
  AlertTriangle, Building2, Filter, Download, Package
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const ANTENNES = [
  {
    id: "idf",
    name: "IDF Paris",
    responsable: "Julien Moreau",
    phone: "+33 6 98 76 54 32",
    email: "j.moreau@selfizee.com",
    bornesTotal: 186,
    bornesDispo: 142,
    bornesReserved: 32,
    bornesTransit: 12,
    eventsMonth: 8,
    events: [
      { id: "EVT-287", name: "Salon du Mariage Paris", date: "08-10 fév", bornes: 12, status: "ready", shipping: "locale" },
      { id: "EVT-291", name: "Soirée L'Oréal 50 ans", date: "10 fév", bornes: 4, status: "logistics", shipping: "locale" },
      { id: "EVT-294", name: "Mariage Dupont-Martin", date: "14 fév", bornes: 2, status: "design", shipping: "locale" },
      { id: "EVT-285", name: "Soirée Hermès", date: "08 fév", bornes: 3, status: "ready", shipping: "locale" },
      { id: "EVT-280", name: "Salon de la Photo", date: "06-09 fév", bornes: 6, status: "live", shipping: "locale" },
      { id: "EVT-308", name: "Mariage Cohen-Lévy", date: "22 fév", bornes: 2, status: "confirmed", shipping: "locale" },
      { id: "EVT-315", name: "Anniversaire Nike", date: "28 fév", bornes: 5, status: "confirmed", shipping: "locale" },
      { id: "EVT-256", name: "Soirée Chanel N°5", date: "28 jan", bornes: 3, status: "done", shipping: "locale" },
    ],
  },
  {
    id: "bretagne",
    name: "Bretagne",
    responsable: "Yann Le Bras",
    phone: "+33 6 55 44 33 22",
    email: "y.lebras@selfizee.com",
    bornesTotal: 142,
    bornesDispo: 118,
    bornesReserved: 18,
    bornesTransit: 6,
    eventsMonth: 3,
    events: [
      { id: "EVT-330", name: "Festival Inter-Celtic", date: "12-14 fév", bornes: 6, status: "confirmed", shipping: "locale" },
      { id: "EVT-332", name: "Mariage Le Goff", date: "20 fév", bornes: 2, status: "design", shipping: "locale" },
      { id: "EVT-335", name: "Soirée Armor Lux", date: "26 fév", bornes: 3, status: "confirmed", shipping: "locale" },
    ],
  },
  {
    id: "rhone",
    name: "Rhône-Alpes",
    responsable: "Camille Roux",
    phone: "+33 6 22 33 44 55",
    email: "c.roux@selfizee.com",
    bornesTotal: 128,
    bornesDispo: 102,
    bornesReserved: 16,
    bornesTransit: 10,
    eventsMonth: 4,
    events: [
      { id: "EVT-299", name: "Congrès Pharma Lyon", date: "12 fév", bornes: 3, status: "logistics", shipping: "locale" },
      { id: "EVT-312", name: "Salon Auto Lyon", date: "25-27 fév", bornes: 10, status: "confirmed", shipping: "locale" },
      { id: "EVT-340", name: "Mariage Blanc", date: "15 fév", bornes: 1, status: "confirmed", shipping: "locale" },
      { id: "EVT-342", name: "Team Building Michelin", date: "22 fév", bornes: 2, status: "confirmed", shipping: "locale" },
    ],
  },
  {
    id: "paca",
    name: "PACA",
    responsable: "Antoine Rossi",
    phone: "+33 6 77 88 99 00",
    email: "a.rossi@selfizee.com",
    bornesTotal: 104,
    bornesDispo: 86,
    bornesReserved: 14,
    bornesTransit: 4,
    eventsMonth: 3,
    events: [
      { id: "EVT-248", name: "Carnaval Nice", date: "24-26 jan", bornes: 15, status: "done", shipping: "locale" },
      { id: "EVT-320", name: "Mariage Silva", date: "01 mars", bornes: 1, status: "confirmed", shipping: "locale" },
      { id: "EVT-318", name: "Gala Dior Cannes", date: "05 mars", bornes: 8, status: "confirmed", shipping: "locale" },
    ],
  },
  {
    id: "ouest",
    name: "Grand Ouest",
    responsable: "Pierre Morin",
    phone: "+33 6 11 22 33 44",
    email: "p.morin@selfizee.com",
    bornesTotal: 98,
    bornesDispo: 82,
    bornesReserved: 8,
    bornesTransit: 8,
    eventsMonth: 2,
    events: [
      { id: "EVT-298", name: "Festival Nantes Digital", date: "15-17 fév", bornes: 8, status: "confirmed", shipping: "locale" },
      { id: "EVT-345", name: "Anniversaire Decathlon", date: "25 fév", bornes: 4, status: "design", shipping: "UPS" },
    ],
  },
  {
    id: "est",
    name: "Grand Est",
    responsable: "Lucie Muller",
    phone: "+33 6 33 44 55 66",
    email: "l.muller@selfizee.com",
    bornesTotal: 112,
    bornesDispo: 98,
    bornesReserved: 10,
    bornesTransit: 4,
    eventsMonth: 2,
    events: [
      { id: "EVT-350", name: "Foire de Strasbourg", date: "18-20 fév", bornes: 6, status: "confirmed", shipping: "locale" },
      { id: "EVT-352", name: "Mariage Muller-Weber", date: "28 fév", bornes: 2, status: "design", shipping: "locale" },
    ],
  },
  {
    id: "occitanie",
    name: "Occitanie",
    responsable: "Sophie Bernard",
    phone: "+33 6 44 55 66 77",
    email: "s.bernard@selfizee.com",
    bornesTotal: 75,
    bornesDispo: 64,
    bornesReserved: 6,
    bornesTransit: 5,
    eventsMonth: 2,
    events: [
      { id: "EVT-302", name: "Team Building Airbus", date: "18 fév", bornes: 3, status: "design", shipping: "locale" },
      { id: "EVT-355", name: "Congrès Montpellier", date: "24 fév", bornes: 4, status: "confirmed", shipping: "TNT" },
    ],
  },
];

const STATUS_MAP = {
  confirmed: { label: "Confirmé", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  design: { label: "Création", color: "bg-violet-50 text-violet-600", dot: "bg-violet-500" },
  logistics: { label: "Logistique", color: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  live: { label: "En cours", color: "bg-rose-50 text-rose-500", dot: "bg-rose-500" },
  done: { label: "Terminé", color: "bg-slate-100 text-slate-500", dot: "bg-slate-300" },
};

/* ── Page ──────────────────────────────────────────── */

export default function EventsAntennes() {
  const [expanded, setExpanded] = useState(new Set(["idf"]));

  const toggleExpand = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const totalBornes = ANTENNES.reduce((s, a) => s + a.bornesTotal, 0);
  const totalDispo = ANTENNES.reduce((s, a) => s + a.bornesDispo, 0);
  const totalEvents = ANTENNES.reduce((s, a) => s + a.eventsMonth, 0);

  return (
    <AppShell currentApp="Events Manager" activeKey="antennes">
      <PageHeader
        title="Recap antennes"
        subtitle={`${ANTENNES.length} antennes — ${totalBornes} bornes`}
        actions={
          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
            <Download className="h-3.5 w-3.5" /> Exporter recap
          </button>
        }
      />

      {/* Global stats */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Building2} label="Antennes actives" value={ANTENNES.length} color="text-blue-500" bg="bg-blue-50" />
        <StatCard icon={Camera} label="Bornes totales" value={totalBornes} color="text-indigo-500" bg="bg-indigo-50" />
        <StatCard icon={CheckCircle2} label="Bornes disponibles" value={totalDispo} sub={`${Math.round((totalDispo/totalBornes)*100)}%`} color="text-emerald-500" bg="bg-emerald-50" />
        <StatCard icon={CalendarDays} label="Événements ce mois" value={totalEvents} color="text-rose-500" bg="bg-rose-50" />
      </div>

      {/* Antennes list */}
      <div className="space-y-3">
        {ANTENNES.map(antenne => {
          const isExpanded = expanded.has(antenne.id);
          const utilisation = Math.round(((antenne.bornesTotal - antenne.bornesDispo) / antenne.bornesTotal) * 100);

          return (
            <div key={antenne.id} className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              {/* Header */}
              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[--k-surface-2]/30 transition"
                onClick={() => toggleExpand(antenne.id)}
              >
                <span className={cn("transition-transform", isExpanded && "rotate-90")}>
                  <ChevronRight className="h-4 w-4 text-[--k-muted]" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 text-white">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-[14px] font-semibold text-[--k-text]">{antenne.name}</div>
                  <div className="text-[11px] text-[--k-muted]">{antenne.responsable} — {antenne.eventsMonth} événements ce mois</div>
                </div>
                {/* Mini stats */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-[--k-text]">{antenne.bornesTotal}</div>
                    <div className="text-[10px] text-[--k-muted]">Bornes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-emerald-600">{antenne.bornesDispo}</div>
                    <div className="text-[10px] text-[--k-muted]">Dispo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-rose-500">{antenne.bornesReserved}</div>
                    <div className="text-[10px] text-[--k-muted]">Réservées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-bold text-amber-500">{antenne.bornesTransit}</div>
                    <div className="text-[10px] text-[--k-muted]">Transit</div>
                  </div>
                  {/* Utilisation bar */}
                  <div className="w-20">
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="text-[--k-muted]">Util.</span>
                      <span className="font-semibold text-[--k-text]">{utilisation}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[--k-surface-2] overflow-hidden">
                      <div
                        className={cn("h-full rounded-full", utilisation > 70 ? "bg-rose-500" : utilisation > 40 ? "bg-amber-500" : "bg-emerald-500")}
                        style={{ width: `${utilisation}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-right shrink-0">
                  <div className="text-[13px] font-bold text-[--k-text]">{antenne.eventsMonth}</div>
                  <div className="text-[10px] text-[--k-muted]">Événements</div>
                </span>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-[--k-border]">
                  {/* Contact info */}
                  <div className="flex flex-wrap gap-4 bg-[--k-surface-2]/20 px-4 py-2.5 text-[12px] border-b border-[--k-border]">
                    <span className="flex items-center gap-1.5 text-[--k-muted]">
                      <User className="h-3.5 w-3.5" /> {antenne.responsable}
                    </span>
                    <span className="flex items-center gap-1.5 text-[--k-muted]">
                      <Phone className="h-3.5 w-3.5" /> {antenne.phone}
                    </span>
                    <span className="flex items-center gap-1.5 text-[--k-muted]">
                      <Mail className="h-3.5 w-3.5" /> {antenne.email}
                    </span>
                  </div>

                  {/* Events table */}
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-[--k-border] bg-rose-50/20">
                        <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Événement</th>
                        <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Date</th>
                        <th className="px-4 py-2 text-center font-semibold text-[--k-muted]">Bornes</th>
                        <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Expédition</th>
                        <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {antenne.events.map(evt => {
                        const st = STATUS_MAP[evt.status];
                        return (
                          <tr key={evt.id} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2]/20 transition">
                            <td className="px-4 py-2">
                              <a href={`/events/${evt.id}`} className="font-medium text-[--k-text] hover:text-[--k-primary] transition">{evt.name}</a>
                              <div className="text-[10px] text-[--k-muted] font-mono">{evt.id}</div>
                            </td>
                            <td className="px-4 py-2 text-[--k-muted] whitespace-nowrap">{evt.date}</td>
                            <td className="px-4 py-2 text-center">
                              <span className="inline-flex items-center gap-1 font-semibold text-[--k-text]">
                                <Camera className="h-3 w-3 text-[--k-muted]" />{evt.bornes}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {evt.shipping === "locale" ? (
                                <span className="text-emerald-600 flex items-center gap-1"><Building2 className="h-3 w-3" /> Locale</span>
                              ) : (
                                <span className="text-amber-600 flex items-center gap-1"><Truck className="h-3 w-3" /> {evt.shipping}</span>
                              )}
                            </td>
                            <td className="px-4 py-2">
                              <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", st.color)}>
                                <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                                {st.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Footer summary */}
                  <div className="flex items-center justify-between bg-[--k-surface-2]/20 px-4 py-2 text-[11px] text-[--k-muted] border-t border-[--k-border]">
                    <span>{antenne.events.length} événement(s) — {antenne.events.reduce((s, e) => s + e.bornes, 0)} bornes engagées</span>
                    <button className="font-medium text-[--k-primary] hover:underline">Envoyer recap →</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div className="rounded-xl border border-[--k-border] bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", bg, color)}>
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[18px] font-bold text-[--k-text] leading-tight">
            {value}
            {sub && <span className="ml-1 text-[11px] font-medium text-emerald-600">({sub})</span>}
          </div>
          <div className="text-[11px] text-[--k-muted]">{label}</div>
        </div>
      </div>
    </div>
  );
}
