import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import {
  Truck, Package, MapPin, Clock, CheckCircle2, AlertTriangle,
  Search, Filter, Camera, CalendarDays, ArrowRight, ChevronRight,
  RotateCcw, Building2, Plane, ExternalLink
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const SHIPMENTS = [
  {
    id: "SHP-2026-0142",
    event: { id: "EVT-287", name: "Salon du Mariage Paris" },
    bornes: ["S204", "S205"],
    bornesCount: 2,
    from: "Entrepôt central — Rennes",
    to: "Paris Expo — Porte de Versailles",
    carrier: "UPS",
    service: "Express",
    tracking: "1Z999AA10123456784",
    status: "transit",
    dateExpedition: "2026-02-05",
    dateLivraison: "2026-02-07",
    dateEstimee: "2026-02-07",
    weight: "48 kg",
    colis: 2,
  },
  {
    id: "SHP-2026-0143",
    event: { id: "EVT-287", name: "Salon du Mariage Paris" },
    bornes: ["S340", "S341"],
    bornesCount: 2,
    from: "Antenne Bretagne — Rennes",
    to: "Paris Expo — Porte de Versailles",
    carrier: "TNT",
    service: "Express",
    tracking: "GE123456789FR",
    status: "transit",
    dateExpedition: "2026-02-05",
    dateLivraison: "2026-02-07",
    dateEstimee: "2026-02-07",
    weight: "52 kg",
    colis: 2,
  },
  {
    id: "SHP-2026-0144",
    event: { id: "EVT-291", name: "Soirée L'Oréal 50 ans" },
    bornes: ["S108", "S115", "S118", "S210"],
    bornesCount: 4,
    from: "Antenne IDF — Paris",
    to: "Pavillon Cambon, Paris",
    carrier: "Antenne",
    service: "Locale",
    tracking: null,
    status: "preparing",
    dateExpedition: null,
    dateLivraison: "2026-02-09",
    dateEstimee: "2026-02-09",
    weight: "—",
    colis: 4,
  },
  {
    id: "SHP-2026-0138",
    event: { id: "EVT-280", name: "Salon de la Photo" },
    bornes: ["S102", "S103", "S500", "S211", "S400", "S401"],
    bornesCount: 6,
    from: "Antenne IDF — Paris",
    to: "Paris Expo — Porte de Versailles",
    carrier: "Antenne",
    service: "Locale",
    tracking: null,
    status: "delivered",
    dateExpedition: "2026-02-05",
    dateLivraison: "2026-02-05",
    dateEstimee: "2026-02-05",
    weight: "—",
    colis: 6,
  },
  {
    id: "SHP-2026-0145",
    event: { id: "EVT-299", name: "Congrès Pharma Lyon" },
    bornes: ["S220", "S221", "S222"],
    bornesCount: 3,
    from: "Antenne Rhône-Alpes — Lyon",
    to: "Centre des Congrès, Lyon",
    carrier: "Antenne",
    service: "Locale",
    tracking: null,
    status: "preparing",
    dateExpedition: null,
    dateLivraison: "2026-02-11",
    dateEstimee: "2026-02-11",
    weight: "—",
    colis: 3,
  },
  {
    id: "SHP-2026-0146",
    event: { id: "EVT-298", name: "Festival Nantes Digital" },
    bornes: ["S310", "S311", "S312", "S313", "S314", "S315", "S316", "S317"],
    bornesCount: 8,
    from: "Antenne Grand Ouest — Nantes",
    to: "Parc des Expo, Nantes",
    carrier: "Antenne",
    service: "Locale",
    tracking: null,
    status: "preparing",
    dateExpedition: null,
    dateLivraison: "2026-02-14",
    dateEstimee: "2026-02-14",
    weight: "—",
    colis: 8,
  },
  {
    id: "SHP-2026-0147",
    event: { id: "EVT-305", name: "Gala BMW Munich" },
    bornes: ["S600", "S601", "S602", "S603", "S604", "S605"],
    bornesCount: 6,
    from: "Entrepôt central — Rennes",
    to: "BMW Welt, Munich, Allemagne",
    carrier: "DHL",
    service: "Express International",
    tracking: "JD014600003204823861",
    status: "preparing",
    dateExpedition: null,
    dateLivraison: "2026-02-18",
    dateEstimee: "2026-02-18",
    weight: "156 kg",
    colis: 6,
  },
  {
    id: "SHP-2026-0130",
    event: { id: "EVT-256", name: "Soirée Chanel N°5" },
    bornes: ["S108", "S109", "S110"],
    bornesCount: 3,
    from: "Grand Palais, Paris",
    to: "Antenne IDF — Paris",
    carrier: "Antenne",
    service: "Locale (retour)",
    tracking: null,
    status: "returned",
    dateExpedition: "2026-01-29",
    dateLivraison: "2026-01-29",
    dateEstimee: "2026-01-29",
    weight: "—",
    colis: 3,
  },
  {
    id: "SHP-2026-0128",
    event: { id: "EVT-248", name: "Carnaval Nice" },
    bornes: Array.from({ length: 15 }, (_, i) => `S${700 + i}`),
    bornesCount: 15,
    from: "Promenade des Anglais, Nice",
    to: "Antenne PACA — Marseille",
    carrier: "TNT",
    service: "Standard (retour)",
    tracking: "GE123456800FR",
    status: "return_transit",
    dateExpedition: "2026-01-27",
    dateLivraison: null,
    dateEstimee: "2026-02-08",
    weight: "380 kg",
    colis: 15,
  },
];

const STATUS_MAP = {
  preparing: { label: "À préparer", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500", icon: Package },
  transit: { label: "En transit", color: "bg-amber-50 text-amber-600", dot: "bg-amber-500", icon: Truck },
  delivered: { label: "Livré", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500", icon: CheckCircle2 },
  returned: { label: "Retourné", color: "bg-slate-100 text-slate-500", dot: "bg-slate-400", icon: RotateCcw },
  return_transit: { label: "Retour en cours", color: "bg-orange-50 text-orange-600", dot: "bg-orange-500", icon: RotateCcw },
  late: { label: "En retard", color: "bg-red-50 text-red-600", dot: "bg-red-500", icon: AlertTriangle },
};

const CARRIER_COLORS = {
  UPS: "bg-amber-100 text-amber-700",
  TNT: "bg-orange-100 text-orange-700",
  DHL: "bg-yellow-100 text-yellow-700",
  Chronopost: "bg-blue-100 text-blue-700",
  Antenne: "bg-emerald-100 text-emerald-700",
};

const FILTER_TABS = [
  { key: "all", label: "Tous" },
  { key: "preparing", label: "À préparer" },
  { key: "transit", label: "En transit" },
  { key: "delivered", label: "Livrés" },
  { key: "returns", label: "Retours" },
];

/* ── Page ──────────────────────────────────────────── */

export default function EventsLogistics() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = SHIPMENTS.filter(s => {
    if (search) {
      const q = search.toLowerCase();
      if (!s.event.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q) && !(s.tracking || "").toLowerCase().includes(q)) return false;
    }
    if (tab === "preparing") return s.status === "preparing";
    if (tab === "transit") return s.status === "transit";
    if (tab === "delivered") return s.status === "delivered";
    if (tab === "returns") return ["returned", "return_transit"].includes(s.status);
    return true;
  });

  const counts = {
    preparing: SHIPMENTS.filter(s => s.status === "preparing").length,
    transit: SHIPMENTS.filter(s => s.status === "transit").length,
    delivered: SHIPMENTS.filter(s => s.status === "delivered").length,
    returns: SHIPMENTS.filter(s => ["returned", "return_transit"].includes(s.status)).length,
  };

  return (
    <AppShell currentApp="Events Manager" activeKey="logistics">
      <PageHeader
        title="Logistique & Expéditions"
        subtitle={`${SHIPMENTS.length} expéditions`}
      />

      {/* KPI row */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <LogKpi icon={Package} label="À préparer" value={counts.preparing} color="text-blue-500" bg="bg-blue-50" />
        <LogKpi icon={Truck} label="En transit" value={counts.transit} color="text-amber-500" bg="bg-amber-50" />
        <LogKpi icon={CheckCircle2} label="Livrés" value={counts.delivered} color="text-emerald-500" bg="bg-emerald-50" />
        <LogKpi icon={RotateCcw} label="Retours" value={counts.returns} color="text-orange-500" bg="bg-orange-50" />
        <LogKpi icon={Camera} label="Bornes en mouvement" value={SHIPMENTS.reduce((s, x) => s + x.bornesCount, 0)} color="text-rose-500" bg="bg-rose-50" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[--k-border] px-4 py-2.5">
          <div className="flex gap-1 rounded-lg bg-[--k-surface-2] p-0.5">
            {FILTER_TABS.map(t => (
              <button
                key={t.key}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[12px] font-medium transition",
                  tab === t.key ? "bg-white text-[--k-text] shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
                )}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                {t.key !== "all" && counts[t.key] > 0 && (
                  <span className="ml-1 text-[10px] font-bold text-[--k-primary]">{counts[t.key]}</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[--k-muted]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="h-8 w-48 rounded-lg border border-[--k-border] bg-[--k-surface-2]/50 pl-8 pr-3 text-[12px] outline-none focus:border-[--k-primary] focus:ring-1 focus:ring-[--k-primary]/20 transition"
            />
          </div>
        </div>

        {/* Shipments */}
        <div className="divide-y divide-[--k-border]">
          {filtered.map(shipment => {
            const st = STATUS_MAP[shipment.status];
            const cc = CARRIER_COLORS[shipment.carrier] || "bg-slate-100 text-slate-600";
            const StIcon = st.icon;
            return (
              <div key={shipment.id} className="px-4 py-3 hover:bg-[--k-surface-2]/20 transition">
                <div className="flex flex-wrap items-start gap-3">
                  {/* Status icon */}
                  <span className={cn("mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl shrink-0", st.color)}>
                    <StIcon className="h-4 w-4" />
                  </span>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-mono text-[--k-muted]">{shipment.id}</span>
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", st.color)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", st.dot)} />
                        {st.label}
                      </span>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", cc)}>{shipment.carrier} {shipment.service}</span>
                    </div>

                    <a href={`/events/${shipment.event.id}`} className="text-[13px] font-semibold text-[--k-text] hover:text-[--k-primary] transition">
                      {shipment.event.name}
                    </a>

                    {/* Route */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[--k-muted]">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {shipment.from}</span>
                      <ArrowRight className="h-3 w-3 text-[--k-muted]/40" />
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-rose-400" /> {shipment.to}</span>
                    </div>

                    {/* Tracking */}
                    {shipment.tracking && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="text-[11px] text-[--k-muted]">Tracking:</span>
                        <span className="text-[11px] font-mono font-medium text-[--k-primary]">{shipment.tracking}</span>
                        <ExternalLink className="h-3 w-3 text-[--k-primary]/50" />
                      </div>
                    )}
                  </div>

                  {/* Right stats */}
                  <div className="flex gap-4 shrink-0 text-right">
                    <div>
                      <div className="flex items-center justify-end gap-1 text-[13px] font-bold text-[--k-text]">
                        <Camera className="h-3.5 w-3.5 text-[--k-muted]" />
                        {shipment.bornesCount}
                      </div>
                      <div className="text-[10px] text-[--k-muted]">{shipment.colis} colis</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-[--k-text]">{shipment.weight}</div>
                      <div className="text-[10px] text-[--k-muted]">Poids</div>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-[--k-text]">
                        {shipment.dateLivraison
                          ? new Date(shipment.dateLivraison).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
                          : shipment.dateEstimee
                            ? new Date(shipment.dateEstimee).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })
                            : "—"
                        }
                      </div>
                      <div className="text-[10px] text-[--k-muted]">{shipment.dateLivraison ? "Livré" : "Estimée"}</div>
                    </div>
                  </div>
                </div>

                {/* Bornes list */}
                <div className="mt-2 ml-11 flex flex-wrap gap-1">
                  {shipment.bornes.slice(0, 8).map(b => (
                    <span key={b} className="rounded-md bg-[--k-surface-2] px-1.5 py-0.5 text-[10px] font-mono font-medium text-[--k-muted]">{b}</span>
                  ))}
                  {shipment.bornes.length > 8 && (
                    <span className="rounded-md bg-[--k-surface-2] px-1.5 py-0.5 text-[10px] font-medium text-[--k-muted]">+{shipment.bornes.length - 8}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2.5 text-[12px] text-[--k-muted]">
          <span>{filtered.length} expédition(s)</span>
          <span>{filtered.reduce((s, x) => s + x.bornesCount, 0)} bornes concernées</span>
        </div>
      </div>
    </AppShell>
  );
}

function LogKpi({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="rounded-xl border border-[--k-border] bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", bg, color)}>
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[20px] font-bold text-[--k-text] leading-tight">{value}</div>
          <div className="text-[11px] text-[--k-muted]">{label}</div>
        </div>
      </div>
    </div>
  );
}
