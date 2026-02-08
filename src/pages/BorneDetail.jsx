import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  Monitor, ArrowLeft, Edit3, MapPin, Send,
  Calendar, Package, Wrench, AlertTriangle, Clock,
  ChevronRight, ArrowRightLeft, Wifi, WifiOff,
  Thermometer, Battery, HardDrive, Activity,
  ExternalLink, Phone, Mail, Building2, User,
  Briefcase, UserCircle, MessageSquare, AtSign,
  Paperclip, Smile, MoreHorizontal, Pin, Reply,
  Hash, FileText, CalendarDays
} from "lucide-react";
import { Button } from "../components/ui/Button";

/* ── Mock data for borne S381 ─────────────────────── */

const BORNE = {
  id: "S381",
  serial: "D254801",
  gamme: "Spherik",
  modele: "Modele 26",
  sortieAtelier: "25/11/2025",
  etat: "En service",
  statut: "ONLINE",
  firmware: "v3.2.1",
  parc: "Location",
  client: { id: 12034, name: "Mairie de Rennes" },
  antenne: "Antenne #116",
  adresse: "12 rue de la Liberté, 35000 Rennes",
  coutFabrication: 745,
  uptime: "99.2%",
  temperature: "42°C",
  batterie: "87%",
  stockage: "24.1 / 64 Go",
  derniereSync: "il y a 3 min",
  configCode: "R381",
  configUrl: "https://config.selfizee.com/bornes/R381",
};

const TEAM = {
  commercial: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500", role: "Commercial", email: "seb@selfizee.com", phone: "+33 6 12 34 56 78" },
  chef: { name: "Julie Martin", initials: "JM", color: "bg-pink-500", role: "Cheffe de projet", email: "julie@selfizee.com", phone: "+33 6 98 76 54 32" },
  tech: { name: "Lucas Dubois", initials: "LD", color: "bg-amber-500", role: "Technicien", email: "lucas@selfizee.com", phone: "+33 6 55 44 33 22" },
};

const CURRENT_EVENT = {
  id: "EVT-2026-0287",
  name: "Salon du Mariage Paris",
  date: "08-10 fév 2026",
  status: "ready",
  configCode: "SM87",
};

const EQUIPEMENTS = [
  { nom: "Écran tactile 10\"", serial: "SCR-88421", etat: "OK" },
  { nom: "Module WiFi 6E", serial: "WF6-11203", etat: "OK" },
  { nom: "Batterie Li-ion 5000mAh", serial: "BAT-44520", etat: "Usure 13%" },
  { nom: "Imprimante thermique", serial: "PRT-92103", etat: "OK" },
];

const HISTORIQUE = [
  { date: "06/02/2026", type: "sync", label: "Synchronisation firmware v3.2.1" },
  { date: "04/02/2026", type: "event", label: "Redémarrage automatique (mise à jour)" },
  { date: "28/01/2026", type: "mouvement", label: "Transfert : Entrepôt Rennes → Mairie de Rennes" },
  { date: "15/01/2026", type: "maintenance", label: "Remplacement batterie (BAT-44520)" },
  { date: "20/12/2025", type: "mouvement", label: "Transfert : Atelier → Entrepôt Rennes" },
  { date: "25/11/2025", type: "creation", label: "Création de la borne — Sortie atelier" },
  { date: "10/11/2025", type: "maintenance", label: "Assemblage et tests qualité" },
];

const MOUVEMENTS = [
  { periode: "25/11/2025 → 20/12/2025", lieu: "Atelier Selfizee", duree: "25 jours", type: "Fabrication" },
  { periode: "20/12/2025 → 28/01/2026", lieu: "Entrepôt Rennes", duree: "39 jours", type: "Stockage" },
  { periode: "28/01/2026 → Aujourd'hui", lieu: "Mairie de Rennes", duree: "9 jours", type: "Location" },
];

const DERNIERS_EVENTS = [
  { date: "06/02 14:23", type: "info", label: "Photo prise (selfie #12,841)" },
  { date: "06/02 14:18", type: "info", label: "Impression ticket réussie" },
  { date: "06/02 13:02", type: "info", label: "Sync données → cloud OK" },
  { date: "06/02 09:15", type: "warning", label: "Température élevée (48°C) — retour à la normale" },
  { date: "05/02 22:00", type: "info", label: "Mise en veille automatique" },
  { date: "05/02 18:45", type: "info", label: "Photo prise (selfie #12,840)" },
  { date: "05/02 17:30", type: "info", label: "Impression ticket réussie" },
  { date: "04/02 23:10", type: "success", label: "Firmware v3.2.1 installé avec succès" },
];

const COMMENTS = [
  {
    id: 1, user: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500" },
    date: "05/02/2026 14:30", text: "RAS, borne fonctionnelle après remplacement batterie. Client satisfait.",
    reactions: [{ emoji: "👍", count: 1 }], pinned: false,
  },
  {
    id: 2, user: { name: "Lucas Dubois", initials: "LD", color: "bg-amber-500" },
    date: "15/01/2026 16:00", text: "Batterie remplacée suite alerte usure >80%. Ancien modèle BAT-33012 retourné en recyclage. Test impression OK.",
    reactions: [{ emoji: "✅", count: 1 }], pinned: true,
  },
  {
    id: 3, user: { name: "Julie Martin", initials: "JM", color: "bg-pink-500" },
    date: "28/12/2025 09:15", text: "Borne prête pour livraison Mairie de Rennes. Contrat signé pour 6 mois renouvelable. Contact client : Jean-Marc Leroy.",
    reactions: [], pinned: false,
  },
];

const TYPE_ICON = {
  sync: Wifi,
  event: Activity,
  mouvement: ArrowRightLeft,
  maintenance: Wrench,
  creation: Package,
};

const EVENT_COLORS = {
  info: "text-blue-500",
  warning: "text-amber-500",
  success: "text-emerald-500",
};

/* ── Page ──────────────────────────────────────────── */

export default function BorneDetail() {
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const TABS = [
    { key: "overview", label: "Vue d'ensemble", icon: Monitor },
    { key: "updates", label: "Mises à jour", icon: MessageSquare, count: COMMENTS.length },
    { key: "history", label: "Historique", icon: Clock },
  ];

  return (
    <AppShell currentApp="Bornes Manager" activeKey="devices">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
        <a href="/bornes" className="hover:text-[--k-text] transition">Dashboard</a>
        <ChevronRight className="h-3 w-3" />
        <a href="/bornes/list" className="hover:text-[--k-text] transition">Bornes</a>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-[--k-text]">{BORNE.id}</span>
      </div>

      {/* ── Header ── */}
      <div className="mb-5 rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-400" />

        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <a href="/bornes/list" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[--k-border] bg-white shadow-sm hover:bg-[--k-surface-2] transition mt-0.5">
                <ArrowLeft className="h-4 w-4 text-[--k-muted]" />
              </a>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 mt-0.5">
                <Monitor className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-[20px] font-bold text-[--k-text]">BORNE {BORNE.id}</h1>
                  <span className={cn(
                    "rounded-md px-2.5 py-1 text-[11px] font-bold",
                    BORNE.statut === "ONLINE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  )}>
                    {BORNE.statut}
                  </span>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">{BORNE.parc}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[--k-muted]">
                  <span>{BORNE.gamme} — {BORNE.modele}</span>
                  <span className="font-mono text-[11px]">S/N {BORNE.serial}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{BORNE.adresse}</span>
                </div>
                {/* Client link */}
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={`/clients/${BORNE.client.id}`}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-[12px] font-medium text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    {BORNE.client.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {CURRENT_EVENT && (
                    <a
                      href={`/events/${CURRENT_EVENT.id}`}
                      className="flex items-center gap-1.5 rounded-lg bg-rose-50 border border-rose-200 px-3 py-1.5 text-[12px] font-medium text-rose-600 hover:bg-rose-100 transition"
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                      {CURRENT_EVENT.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right side: team avatars + actions */}
            <div className="flex flex-col items-end gap-3">
              {/* Team avatars — Monday.com style overlapping */}
              <div className="flex items-center">
                {Object.entries(TEAM).map(([key, member], i) => (
                  <div key={key} className="group relative" style={{ marginLeft: i > 0 ? "-8px" : 0, zIndex: Object.keys(TEAM).length - i }}>
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white shadow-sm cursor-pointer hover:scale-110 transition-transform", member.color)}>
                      {member.initials}
                    </div>
                    <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] text-white shadow-lg">
                        <div className="font-medium">{member.name}</div>
                        <div className="text-white/60">{member.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-slate-300 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition">
                  <span className="text-[14px] font-bold">+</span>
                </button>
              </div>
              <div className="flex gap-2">
                <a href={`/bornes/${BORNE.id}/edit`}>
                  <Button type="button" variant="primary">
                    <Edit3 className="h-4 w-4 mr-1.5" />
                    Modifier
                  </Button>
                </a>
                <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition shadow-sm">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs bar ── Monday-style */}
      <div className="mb-5 flex items-center gap-1 border-b border-[--k-border]">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium transition",
                active ? "text-indigo-600" : "text-[--k-muted] hover:text-[--k-text]",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count != null && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", active ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500")}>
                  {tab.count}
                </span>
              )}
              {active && <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-indigo-500" />}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Left column: 2/3 */}
        <div className="lg:col-span-2 space-y-5">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              {/* Informations générales */}
              <Section title="Informations générales" icon={Monitor} accent="indigo">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <InfoRow label="Gamme" value={BORNE.gamme} highlight />
                  <InfoRow label="Modèle" value={BORNE.modele} />
                  <InfoRow label="Numéro de série" value={BORNE.serial} mono />
                  <InfoRow label="Sortie atelier" value={BORNE.sortieAtelier} />
                  <InfoRow label="État général" value={BORNE.etat} />
                  <InfoRow label="Firmware" value={BORNE.firmware} mono />
                </div>
              </Section>

              {/* Équipements */}
              <Section title="Équipements" icon={Package} accent="emerald">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b-2 border-[--k-border] text-[--k-muted]">
                      <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide">Composant</th>
                      <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide">N° série</th>
                      <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide">État</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EQUIPEMENTS.map(eq => (
                      <tr key={eq.serial} className="border-b border-[--k-border]/50 hover:bg-indigo-50/20 transition">
                        <td className="py-2.5 font-medium text-[--k-text]">{eq.nom}</td>
                        <td className="py-2.5 font-mono text-[12px] text-[--k-muted]">{eq.serial}</td>
                        <td className="py-2.5">
                          <span className={cn(
                            "rounded-md px-2 py-0.5 text-[11px] font-bold",
                            eq.etat === "OK" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {eq.etat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>

              {/* Coût de fabrication */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-4 text-white shadow-sm shadow-emerald-500/20">
                <div className="text-[13px] font-medium text-white/80">Coût total de fabrication</div>
                <div className="text-2xl font-bold">{BORNE.coutFabrication} €</div>
              </div>

              {/* Historique mouvements */}
              <Section title="Historique des mouvements" icon={ArrowRightLeft} accent="amber">
                <div className="space-y-0">
                  {MOUVEMENTS.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[--k-border]/50 last:border-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[--k-surface-2]">
                        <MapPin className="h-4 w-4 text-[--k-muted]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-[--k-text]">{m.lieu}</div>
                        <div className="text-[11px] text-[--k-muted]">{m.periode}</div>
                      </div>
                      <span className="rounded-md bg-[--k-surface-2] px-2 py-0.5 text-[11px] font-medium text-[--k-muted]">{m.type}</span>
                      <span className="text-[12px] tabular-nums text-[--k-muted]">{m.duree}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* ── UPDATES TAB ── */}
          {activeTab === "updates" && (
            <>
              {/* Comment composer */}
              <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white ring-2 ring-white">
                      SM
                    </div>
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Écrire une mise à jour..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-3 text-[13px] outline-none placeholder:text-[--k-muted]/60 focus:border-indigo-300 focus:bg-white transition"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition">
                            <AtSign className="h-3.5 w-3.5" />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition">
                            <Paperclip className="h-3.5 w-3.5" />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition">
                            <Smile className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-indigo-600 transition shadow-sm">
                          <Send className="h-3.5 w-3.5" /> Publier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-3">
                {COMMENTS.map(c => (
                  <div key={c.id} className={cn("rounded-2xl border bg-white shadow-sm overflow-hidden", c.pinned ? "border-indigo-200" : "border-[--k-border]")}>
                    {c.pinned && (
                      <div className="flex items-center gap-1.5 bg-indigo-50 px-4 py-1.5 text-[11px] font-medium text-indigo-500">
                        <Pin className="h-3 w-3" /> Épinglé
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white", c.user.color)}>
                          {c.user.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-semibold text-[--k-text]">{c.user.name}</span>
                            <span className="text-[11px] text-[--k-muted]">{c.date}</span>
                          </div>
                          <p className="text-[13px] text-[--k-text]/80 leading-relaxed whitespace-pre-wrap">{c.text}</p>
                          <div className="mt-2.5 flex items-center gap-2">
                            {c.reactions.map((r, i) => (
                              <button key={i} className="flex items-center gap-1 rounded-full border border-[--k-border] bg-slate-50 px-2 py-0.5 text-[11px] hover:bg-slate-100 transition">
                                <span>{r.emoji}</span>
                                <span className="font-medium text-[--k-muted]">{r.count}</span>
                              </button>
                            ))}
                            <button className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-[--k-muted] hover:bg-slate-50 transition">
                              <Smile className="h-3 w-3" />
                            </button>
                            <span className="flex-1" />
                            <button className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] text-[--k-muted] hover:bg-slate-50 hover:text-[--k-text] transition">
                              <Reply className="h-3 w-3" /> Répondre
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <>
              <Section title="Historique complet" icon={Clock} accent="slate">
                <div className="relative pl-6">
                  <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[--k-border]" />
                  {HISTORIQUE.map((h, i) => {
                    const Icon = TYPE_ICON[h.type] || Activity;
                    return (
                      <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                        <div className="absolute -left-6 top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white border-2 border-[--k-border]">
                          <Icon className="h-2.5 w-2.5 text-[--k-muted]" />
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-[--k-text]">{h.label}</div>
                          <div className="text-[11px] text-[--k-muted]">{h.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              <Section title="Derniers événements système" icon={Activity} accent="blue">
                <div className="space-y-0">
                  {DERNIERS_EVENTS.map((e, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5 border-b border-[--k-border]/30 last:border-0">
                      <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", EVENT_COLORS[e.type]?.replace("text-", "bg-") || "bg-blue-500")} />
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] text-[--k-text] leading-snug">{e.label}</div>
                        <div className="text-[10px] text-[--k-muted]">{e.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}
        </div>

        {/* Right column: 1/3 */}
        <div className="space-y-5">

          {/* Équipe projet — Monday-style */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3">
              <span className="text-[13px] font-semibold text-[--k-text]">Équipe projet</span>
            </div>
            <div className="p-4 space-y-3">
              {Object.entries(TEAM).map(([key, member]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm", member.color)}>
                    {member.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold text-[--k-text]">{member.name}</div>
                    <div className="text-[10px] text-[--k-muted]">{member.role}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a href={`mailto:${member.email}`} className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-primary] transition">
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    <a href={`tel:${member.phone}`} className="flex h-7 w-7 items-center justify-center rounded-md text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-primary] transition">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[--k-border] px-4 py-2.5">
              <div className="text-[10px] text-[--k-muted]">
                Créé par <span className="font-medium text-[--k-text]">{TEAM.commercial.name}</span> le {BORNE.sortieAtelier}
              </div>
            </div>
          </div>

          {/* Client */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3">
              <span className="text-[13px] font-semibold text-[--k-text]">Client</span>
            </div>
            <div className="p-4">
              <a
                href={`/clients/${BORNE.client.id}`}
                className="flex items-center gap-3 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 hover:bg-blue-100 transition group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-blue-700">{BORNE.client.name}</div>
                  <div className="text-[11px] text-blue-500">Voir la fiche client</div>
                </div>
                <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition" />
              </a>
            </div>
          </div>

          {/* Événement en cours */}
          {CURRENT_EVENT && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3">
                <span className="text-[13px] font-semibold text-[--k-text]">Événement en cours</span>
              </div>
              <div className="p-4">
                <a
                  href={`/events/${CURRENT_EVENT.id}`}
                  className="flex items-center gap-3 rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 hover:bg-rose-100 transition group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-rose-700">{CURRENT_EVENT.name}</div>
                    <div className="text-[11px] text-rose-500">{CURRENT_EVENT.date} — #{CURRENT_EVENT.configCode}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition" />
                </a>
              </div>
            </div>
          )}

          {/* Parc & Localisation */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3">
              <span className="text-[13px] font-semibold text-[--k-text]">Localisation</span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <InfoRow label="Parc actuel" value={BORNE.parc} highlight />
              <InfoRow label="Antenne" value={BORNE.antenne} highlight />
              <InfoRow label="Adresse" value={BORNE.adresse} />
              <div className="mt-2 h-[120px] rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-[--k-primary]/30" />
              </div>
            </div>
          </div>

          {/* Santé technique */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3">
              <span className="text-[13px] font-semibold text-[--k-text]">Santé technique</span>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <HealthRow icon={Wifi} label="Uptime" value={BORNE.uptime} good />
              <HealthRow icon={Thermometer} label="Température" value={BORNE.temperature} />
              <HealthRow icon={Battery} label="Batterie" value={BORNE.batterie} good />
              <HealthRow icon={HardDrive} label="Stockage" value={BORNE.stockage} />
              <HealthRow icon={Clock} label="Dernière sync" value={BORNE.derniereSync} good />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function Section({ title, icon: Icon, children, accent = "indigo" }) {
  const accentColors = {
    indigo: "border-l-indigo-400",
    emerald: "border-l-emerald-400",
    amber: "border-l-amber-400",
    blue: "border-l-blue-400",
    slate: "border-l-slate-400",
  };
  const iconColors = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    blue: "text-blue-400",
    slate: "text-slate-400",
  };
  return (
    <div className={cn("rounded-2xl border border-[--k-border] border-l-[3px] bg-white shadow-sm shadow-black/[0.03]", accentColors[accent])}>
      <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-3">
        {Icon && <Icon className={cn("h-4 w-4", iconColors[accent])} />}
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, highlight, mono }) {
  return (
    <div className="flex items-baseline justify-between py-1.5 border-b border-[--k-border]/30 last:border-0">
      <span className="text-[12px] text-[--k-muted]">{label}</span>
      <span className={cn(
        "text-[13px] font-medium",
        highlight ? "text-[--k-primary]" : "text-[--k-text]",
        mono && "font-mono text-[12px]"
      )}>
        {value}
      </span>
    </div>
  );
}

function HealthRow({ icon: Icon, label, value, good }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-[--k-muted] shrink-0" />
      <span className="flex-1 text-[12px] text-[--k-muted]">{label}</span>
      <span className={cn(
        "text-[12px] font-semibold tabular-nums",
        good ? "text-emerald-600" : "text-[--k-text]"
      )}>
        {value}
      </span>
    </div>
  );
}
