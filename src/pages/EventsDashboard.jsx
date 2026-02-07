import React from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { KpiCard } from "../components/KpiCard";
import { cn } from "../components/ui/cn";
import {
  CalendarDays, TrendingUp, Camera, Euro, MapPin, Clock,
  ArrowUpRight, ArrowDownRight, Users, Truck, CheckCircle2,
  AlertTriangle, Star, ChevronRight
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const PIPELINE_STAGES = [
  { key: "prospect", label: "Prospect", count: 18, color: "bg-slate-400" },
  { key: "confirmed", label: "Confirmé", count: 24, color: "bg-blue-500" },
  { key: "design", label: "Création graphique", count: 12, color: "bg-violet-500" },
  { key: "logistics", label: "Logistique", count: 8, color: "bg-amber-500" },
  { key: "ready", label: "Prêt", count: 6, color: "bg-emerald-500" },
  { key: "live", label: "En cours", count: 3, color: "bg-rose-500" },
  { key: "done", label: "Terminé", count: 142, color: "bg-slate-300" },
  { key: "invoiced", label: "Facturé", count: 134, color: "bg-green-600" },
];

const UPCOMING_EVENTS = [
  { id: "EVT-2026-0287", name: "Salon du Mariage Paris", client: "Salon Expo SAS", date: "08 fév", endDate: "10 fév", bornes: 12, type: "Salon", location: "Paris Expo — Porte de Versailles", status: "ready", antenne: "IDF Paris" },
  { id: "EVT-2026-0291", name: "Soirée L'Oréal 50 ans", client: "L'Oréal Group", date: "10 fév", endDate: "10 fév", bornes: 4, type: "Corporate", location: "Pavillon Cambon, Paris", status: "logistics", antenne: "IDF Paris" },
  { id: "EVT-2026-0294", name: "Mariage Dupont-Martin", client: "Famille Dupont", date: "14 fév", endDate: "14 fév", bornes: 2, type: "Mariage", location: "Château de Versailles", status: "design", antenne: "IDF Paris" },
  { id: "EVT-2026-0298", name: "Festival Nantes Digital", client: "Nantes Métropole", date: "15 fév", endDate: "17 fév", bornes: 8, type: "Festival", location: "Parc des Expositions, Nantes", status: "confirmed", antenne: "Grand Ouest" },
  { id: "EVT-2026-0302", name: "Team Building Airbus", client: "Airbus SE", date: "18 fév", endDate: "18 fév", bornes: 3, type: "Corporate", location: "Blagnac, Toulouse", status: "design", antenne: "Occitanie" },
  { id: "EVT-2026-0305", name: "Gala BMW Munich", client: "BMW AG", date: "20 fév", endDate: "20 fév", bornes: 6, type: "Corporate", location: "BMW Welt, Munich", status: "confirmed", antenne: "International" },
];

const RECENT_ACTIVITY = [
  { action: "Création graphique validée", target: "EVT-0287 — Salon du Mariage", time: "il y a 20 min", tag: "Design", tagColor: "bg-violet-50 text-violet-600" },
  { action: "Bornes expédiées via UPS", target: "EVT-0291 — L'Oréal (4 bornes)", time: "il y a 1h", tag: "Logistique", tagColor: "bg-amber-50 text-amber-600" },
  { action: "Briefing client complété", target: "EVT-0294 — Mariage Dupont", time: "il y a 2h", tag: "Briefing", tagColor: "bg-blue-50 text-blue-600" },
  { action: "Devis accepté", target: "EVT-0305 — Gala BMW Munich", time: "il y a 3h", tag: "Commercial", tagColor: "bg-emerald-50 text-emerald-600" },
  { action: "Nouvelle réservation", target: "EVT-0308 — Mariage Cohen (Lyon)", time: "il y a 5h", tag: "Prospect", tagColor: "bg-rose-50 text-rose-500" },
];

const TOP_CLIENTS = [
  { name: "L'Oréal Group", events: 12, ca: "84 200 €", trend: "+23%" },
  { name: "Salon Expo SAS", events: 8, ca: "62 500 €", trend: "+15%" },
  { name: "Airbus SE", events: 6, ca: "41 800 €", trend: "+8%" },
  { name: "BMW AG", events: 4, ca: "38 600 €", trend: "new" },
  { name: "Nantes Métropole", events: 3, ca: "22 100 €", trend: "+5%" },
];

const CALENDAR_DAYS = (() => {
  const days = [];
  const startDay = 1; // Feb 2026 starts on Sunday
  const daysInMonth = 28;
  // Fill blanks for alignment (Feb 2026 starts on Sun = 6 blanks for Mon-start)
  for (let i = 0; i < 6; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
})();

const EVENT_DAYS = new Set([2, 3, 8, 9, 10, 14, 15, 16, 17, 18, 20, 22, 25, 26, 27, 28]);
const TODAY = 7;

const STATUS_MAP = {
  prospect: { label: "Prospect", color: "bg-slate-100 text-slate-600" },
  confirmed: { label: "Confirmé", color: "bg-blue-50 text-blue-600" },
  design: { label: "Création", color: "bg-violet-50 text-violet-600" },
  logistics: { label: "Logistique", color: "bg-amber-50 text-amber-600" },
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600" },
  live: { label: "En cours", color: "bg-rose-50 text-rose-500" },
  done: { label: "Terminé", color: "bg-slate-100 text-slate-500" },
  invoiced: { label: "Facturé", color: "bg-green-50 text-green-600" },
};

const TYPE_COLORS = {
  Salon: "bg-indigo-50 text-indigo-600",
  Corporate: "bg-blue-50 text-blue-600",
  Mariage: "bg-pink-50 text-pink-500",
  Festival: "bg-orange-50 text-orange-600",
};

/* ── Page ──────────────────────────────────────────── */

export default function EventsDashboard() {
  return (
    <AppShell currentApp="Events Manager" activeKey="dashboard">
      <PageHeader
        title="Tableau de bord"
        subtitle="Events Manager — Février 2026"
      />

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard title="Événements ce mois" value="47" icon={CalendarDays} colorIndex={3} />
        <KpiCard title="CA prévisionnel" value="186k€" icon={Euro} colorIndex={0} />
        <KpiCard title="Bornes réservées" value="124" icon={Camera} colorIndex={2} />
        <KpiCard title="Satisfaction client" value="4.8/5" icon={Star} colorIndex={4} />
      </div>

      {/* Pipeline + Calendar row */}
      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {/* Pipeline Summary */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Pipeline des événements</span>
            <a href="/events/pipeline" className="text-[12px] font-medium text-[--k-primary] hover:underline flex items-center gap-1">
              Voir pipeline <ChevronRight className="h-3 w-3" />
            </a>
          </div>
          <div className="p-4">
            {/* Pipeline bar */}
            <div className="mb-4 flex h-5 w-full overflow-hidden rounded-full">
              {PIPELINE_STAGES.filter(s => s.key !== "done" && s.key !== "invoiced").map(s => (
                <div
                  key={s.key}
                  className={cn("h-full transition-all", s.color)}
                  style={{ width: `${(s.count / 71) * 100}%` }}
                  title={`${s.label}: ${s.count}`}
                />
              ))}
            </div>
            {/* Stage counts */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {PIPELINE_STAGES.filter(s => s.key !== "done" && s.key !== "invoiced").map(s => (
                <div key={s.key} className="text-center">
                  <div className="text-[18px] font-bold text-[--k-text]">{s.count}</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className={cn("h-2 w-2 rounded-full", s.color)} />
                    <span className="text-[10px] text-[--k-muted] leading-tight">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Completed stats */}
            <div className="mt-4 flex gap-4 border-t border-[--k-border] pt-3">
              <div className="flex items-center gap-2 text-[12px] text-[--k-muted]">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span><strong className="text-[--k-text]">142</strong> terminés ce trimestre</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[--k-muted]">
                <Euro className="h-3.5 w-3.5 text-green-600" />
                <span><strong className="text-[--k-text]">134</strong> facturés (892k€)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Février 2026</span>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-semibold text-[--k-muted] mb-1">
              {["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"].map(d => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {CALENDAR_DAYS.map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex h-8 items-center justify-center rounded-lg text-[11px] font-medium transition",
                    d === null && "invisible",
                    d === TODAY && "bg-rose-500 text-white font-bold",
                    d !== TODAY && EVENT_DAYS.has(d) && "bg-rose-50 text-rose-600 font-semibold",
                    d !== TODAY && !EVENT_DAYS.has(d) && "text-[--k-muted] hover:bg-[--k-surface-2]"
                  )}
                >
                  {d}
                  {EVENT_DAYS.has(d) && d !== TODAY && (
                    <span className="absolute mt-5 h-1 w-1 rounded-full bg-rose-400" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-[--k-border] pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[--k-muted]">{EVENT_DAYS.size} jours avec événements</span>
                <a href="/events/planning" className="font-medium text-[--k-primary] hover:underline">Planning →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events + Activity */}
      <div className="mb-5 grid gap-3 lg:grid-cols-3">
        {/* Upcoming */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Prochains événements</span>
            <a href="/events/list" className="text-[12px] font-medium text-[--k-primary] hover:underline flex items-center gap-1">
              Tous <ChevronRight className="h-3 w-3" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[--k-border] bg-rose-50/20">
                  <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Événement</th>
                  <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Date</th>
                  <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Bornes</th>
                  <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Type</th>
                  <th className="px-4 py-2 text-left font-semibold text-[--k-muted]">Statut</th>
                </tr>
              </thead>
              <tbody>
                {UPCOMING_EVENTS.map((evt) => {
                  const st = STATUS_MAP[evt.status];
                  const tc = TYPE_COLORS[evt.type] || "bg-slate-50 text-slate-600";
                  return (
                    <tr key={evt.id} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2]/40 transition">
                      <td className="px-4 py-2.5">
                        <a href={`/events/${evt.id}`} className="font-medium text-[--k-text] hover:text-[--k-primary]">{evt.name}</a>
                        <div className="text-[11px] text-[--k-muted]">{evt.client} — {evt.antenne}</div>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="font-medium">{evt.date}</div>
                        {evt.date !== evt.endDate && <div className="text-[11px] text-[--k-muted]">→ {evt.endDate}</div>}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1">
                          <Camera className="h-3 w-3 text-[--k-muted]" />
                          <span className="font-semibold">{evt.bornes}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold", tc)}>{evt.type}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold", st.color)}>{st.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Activité récente</span>
          </div>
          <div className="divide-y divide-[--k-border]">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3 px-4 py-3 hover:bg-[--k-surface-2]/30 transition">
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium text-[--k-text]">{a.action}</div>
                  <div className="text-[11px] text-[--k-muted] truncate">{a.target}</div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", a.tagColor)}>{a.tag}</span>
                  <span className="text-[10px] text-[--k-muted]/60 whitespace-nowrap">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clients + Quick Stats */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Top clients */}
        <div className="lg:col-span-2 rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Top clients 2026</span>
          </div>
          <div className="divide-y divide-[--k-border]">
            {TOP_CLIENTS.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2]/30 transition">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 text-[10px] font-bold text-white">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[--k-text] truncate">{c.name}</div>
                  <div className="text-[11px] text-[--k-muted]">{c.events} événements</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-semibold text-[--k-text]">{c.ca}</div>
                  <div className={cn("text-[11px] font-medium", c.trend === "new" ? "text-blue-500" : "text-emerald-600")}>{c.trend === "new" ? "Nouveau" : c.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick logistics stats */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
          <div className="border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
            <span className="text-[13px] font-semibold text-[--k-text]">Logistique en cours</span>
          </div>
          <div className="p-4 space-y-3">
            <LogStat icon={Truck} label="Expéditions en transit" value="6" sub="UPS: 4 / TNT: 2" color="text-amber-500" />
            <LogStat icon={MapPin} label="Bornes en antenne" value="312" sub="Prêtes pour affectation" color="text-blue-500" />
            <LogStat icon={Camera} label="Bornes réservées" value="124" sub="Sur 850 total (14.6%)" color="text-rose-500" />
            <LogStat icon={AlertTriangle} label="Retours en attente" value="3" sub="Délai moyen: 2.4j" color="text-orange-500" />
          </div>
          <div className="border-t border-[--k-border] px-4 py-2.5 text-center">
            <a href="/events/logistics" className="text-[12px] font-medium text-[--k-primary] hover:underline">Voir la logistique →</a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function LogStat({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50", color)}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-[--k-muted]">{label}</div>
        <div className="text-[11px] text-[--k-muted]/60">{sub}</div>
      </div>
      <div className="text-[18px] font-bold text-[--k-text]">{value}</div>
    </div>
  );
}
