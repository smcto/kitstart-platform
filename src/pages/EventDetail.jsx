import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  CalendarDays, Camera, MapPin, User, Phone, Mail, Building2,
  Clock, CheckCircle2, Circle, AlertTriangle, Truck, Package,
  Edit, Copy, Download, Printer, ArrowLeft, ChevronRight,
  Palette, FileText, Send, MessageSquare, ExternalLink,
  AtSign, Paperclip, Smile, MoreHorizontal, Heart, ThumbsUp,
  Reply, Pin, Settings, Link2, Hash, ChevronDown, Users,
  Briefcase, UserCircle, Eye
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const EVENT = {
  id: "EVT-2026-0287",
  name: "Salon du Mariage Paris",
  type: "Salon",
  clientType: "Pro",
  status: "ready",
  configCode: "SM87",
  configUrl: "https://config.selfizee.com/events/SM87",
  dateStart: "2026-02-08",
  dateEnd: "2026-02-10",
  dateAnimation: "2026-02-09",
  period: "week-end",
  location: "Paris Expo — Porte de Versailles",
  address: "1 Place de la Porte de Versailles, 75015 Paris",
  ville: "Paris",
  antenne: "IDF Paris",
  provenance: "Antenne locale",
  createdAt: "2025-12-15",
  notes: "Stand B42 — Hall 3. Accès montage vendredi 7 fév à partir de 14h. Parking exposants badge n°1842.",
  objectifs: ["Animation", "Collecte data", "Engagement réseaux sociaux"],
  tags: ["Client important", "Récurrent"],
};

const CLIENT = {
  id: 12034,
  company: "Salon Expo SAS",
  contact: "Marie Laurent",
  role: "Directrice événementiel",
  email: "m.laurent@salonexpo.fr",
  phone: "+33 6 12 34 56 78",
  address: "45 rue de la Convention, 75015 Paris",
  groupe: "Entreprise",
};

const TEAM = {
  commercial: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500", role: "Commercial" },
  chef: { name: "Thomas Lefebvre", initials: "TL", color: "bg-emerald-500", role: "Chef de projet" },
  tech: { name: "Lucas Faure", initials: "LF", color: "bg-amber-500", role: "Technicien terrain" },
};

const ANIMATIONS = [
  { type: "Photobooth", options: ["Photo", "GIF", "Boomerang"], perso: ["Impression d'un photocall", "Magnets personnalisés"], partage: ["Envoi de mail", "Galerie en ligne"] },
  { type: "Mosaïque photo", options: ["Mosaïque live"], perso: [], partage: ["Mur de photos"] },
];

const DISPOSITIFS = [
  { borneType: "Spherik", qty: 3, notes: "" },
  { borneType: "Prestige", qty: 2, notes: "Avec impression magnets" },
];

const BRIEFING = {
  marque: "Selfizee x Salon du Mariage",
  template: "Template Mariage Premium",
  logo: "logo_salon_mariage_2026.png",
  couleurs: ["#D4A574", "#FFFFFF", "#2D2D2D"],
  texteAccueil: "Bienvenue au Salon du Mariage 2026 ! Prenez la pose !",
  textePartage: "Retrouvez votre photo sur salon-mariage.selfizee.com",
  backdrop: "Mur floral blanc & doré (fournisseur: Déco & Fleurs)",
  props: "Kit mariage premium (voiles, couronnes, pancartes)",
};

const BORNES_ASSIGNED = [
  { id: "S102", model: "Selfizee Pro 360", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S103", model: "Selfizee Pro 360", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S108", model: "Selfizee Pro 360", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S115", model: "Selfizee Mirror XL", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S118", model: "Selfizee Mirror XL", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S204", model: "Selfizee Pro 360", location: "Entrepôt central", status: "transit", shipping: "UPS — 1Z999AA10123456784" },
  { id: "S205", model: "Selfizee Pro 360", location: "Entrepôt central", status: "transit", shipping: "UPS — 1Z999AA10123456785" },
  { id: "S210", model: "Selfizee Ring Light", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S211", model: "Selfizee Ring Light", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
  { id: "S340", model: "Selfizee Ring Light", location: "Antenne Bretagne", status: "transit", shipping: "TNT — GE123456789FR" },
  { id: "S341", model: "Selfizee Pro 360", location: "Antenne Bretagne", status: "transit", shipping: "TNT — GE123456790FR" },
  { id: "S500", model: "Selfizee Mirror XL", location: "Antenne IDF", status: "ready", shipping: "Antenne locale" },
];

const CHECKLIST = [
  { key: "briefing", label: "Briefing client complété", done: true },
  { key: "design", label: "Création graphique validée", done: true },
  { key: "bornes", label: "Bornes affectées", done: true },
  { key: "logistics", label: "Logistique confirmée", done: true },
  { key: "test", label: "Test impression OK", done: true },
  { key: "shipping", label: "Expéditions envoyées", done: false },
  { key: "installation", label: "Installation sur site", done: false },
  { key: "event", label: "Événement réalisé", done: false },
  { key: "retour", label: "Retour bornes", done: false },
];

const COMMENTS = [
  {
    id: 1, user: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500" },
    date: "07/02/2026 09:42", text: "Briefing client finalisé avec Marie. Elle veut un rendu très élégant, couleurs dorées. RAS côté logistique, les bornes sont prêtes.",
    reactions: [{ emoji: "👍", count: 2 }], pinned: true,
  },
  {
    id: 2, user: { name: "Thomas Lefebvre", initials: "TL", color: "bg-emerald-500" },
    date: "06/02/2026 16:15", text: "Les 5 bornes antenne IDF sont testées et prêtes. @Lucas peux-tu confirmer les expéditions UPS/TNT pour demain ?",
    reactions: [], pinned: false,
  },
  {
    id: 3, user: { name: "Lucas Faure", initials: "LF", color: "bg-amber-500" },
    date: "06/02/2026 17:30", text: "Confirmé ! UPS et TNT partent demain matin. Tracking envoyé au client. Les 3 bornes Bretagne seront livrées vendredi avant 14h.",
    reactions: [{ emoji: "✅", count: 1 }], pinned: false,
  },
  {
    id: 4, user: { name: "Léa Martin", initials: "LM", color: "bg-pink-500" },
    date: "05/02/2026 14:20", text: "Maquettes validées par le client ! Le template est prêt côté config. J'ai uploadé le logo et configuré les couleurs.",
    reactions: [{ emoji: "🎉", count: 3 }, { emoji: "👍", count: 1 }], pinned: false,
  },
  {
    id: 5, user: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500" },
    date: "01/02/2026 10:00", text: "12 bornes affectées : 8 Antenne IDF + 4 expéditions (2 UPS entrepôt + 2 TNT Bretagne). Planning logistique validé.",
    reactions: [], pinned: false,
  },
  {
    id: 6, user: { name: "Marie Laurent", initials: "ML", color: "bg-violet-500", external: true },
    date: "22/01/2026 11:45", text: "Maquettes approuvées, c'est parfait ! On a hâte d'y être. Merci pour votre réactivité.",
    reactions: [{ emoji: "❤️", count: 2 }], pinned: false,
  },
];

const ACTIVITY_LOG = [
  { date: "07/02/2026 09:42", action: "Commentaire ajouté", user: "Seb Mahé", type: "comment" },
  { date: "07/02/2026 09:15", action: "Test impression validé", user: "Lucas Faure", type: "check" },
  { date: "06/02/2026 17:30", action: "Commentaire ajouté", user: "Lucas Faure", type: "comment" },
  { date: "05/02/2026 14:20", action: "Création graphique validée ✓", user: "Léa Martin", type: "check" },
  { date: "01/02/2026 10:00", action: "12 bornes affectées", user: "Seb Mahé", type: "logistics" },
  { date: "22/01/2026 11:45", action: "Maquettes envoyées au client", user: "Léa Martin", type: "design" },
  { date: "10/01/2026 09:30", action: "Briefing client complété", user: "Thomas Lefebvre", type: "briefing" },
  { date: "15/12/2025 14:00", action: "Événement créé", user: "Seb Mahé", type: "create" },
];

const STATUS_MAP = {
  draft: { label: "Brouillon", color: "bg-slate-100 text-slate-500", dot: "bg-slate-400" },
  confirmed: { label: "Confirmé", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  design: { label: "Création graphique", color: "bg-violet-50 text-violet-600", dot: "bg-violet-500" },
  logistics: { label: "Logistique", color: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  live: { label: "En cours", color: "bg-rose-50 text-rose-500", dot: "bg-rose-500" },
  done: { label: "Terminé", color: "bg-slate-100 text-slate-500", dot: "bg-slate-400" },
};

const BORNE_STATUS = {
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600" },
  transit: { label: "En transit", color: "bg-amber-50 text-amber-600" },
  onsite: { label: "Sur site", color: "bg-blue-50 text-blue-600" },
};

const PHASES = [
  { key: "briefing", label: "Briefing", checks: ["briefing"] },
  { key: "crea", label: "Créa", checks: ["design"] },
  { key: "config", label: "Config", checks: ["test"] },
  { key: "logistique", label: "Logistique", checks: ["bornes", "logistics", "shipping"] },
  { key: "event", label: "Événement", checks: ["installation", "event"] },
  { key: "cloture", label: "Clôture", checks: ["retour"] },
];

/* ── Page ──────────────────────────────────────────── */

export default function EventDetail() {
  const st = STATUS_MAP[EVENT.status];
  const doneCount = CHECKLIST.filter(c => c.done).length;
  const progress = Math.round((doneCount / CHECKLIST.length) * 100);
  const [activeTab, setActiveTab] = useState("updates");
  const [newComment, setNewComment] = useState("");
  const commentRef = useRef(null);

  const TABS = [
    { key: "updates", label: "Mises à jour", icon: MessageSquare, count: COMMENTS.length },
    { key: "info", label: "Infos", icon: FileText },
    { key: "crea", label: "Créa", icon: Palette },
    { key: "config", label: "Config", icon: Settings },
    { key: "logistique", label: "Logistique", icon: Truck },
    { key: "activity", label: "Activité", icon: Clock },
  ];

  return (
    <AppShell currentApp="Events Manager" activeKey="events-list">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
        <a href="/events/list" className="hover:text-[--k-primary] transition flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Événements
        </a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[--k-text] font-medium">{EVENT.id}</span>
      </div>

      {/* ── Header card ── */}
      <div className="mb-5 rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
        {/* Top colored stripe */}
        <div className="h-1.5 bg-gradient-to-r from-rose-500 to-pink-400" />

        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Title row */}
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[20px] font-bold text-[--k-text] truncate">{EVENT.name}</h1>
                <span className={cn("shrink-0 rounded-md px-2.5 py-1 text-[11px] font-bold", st.color)}>{st.label}</span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-[--k-muted]">
                <span className="font-mono text-[11px] text-[--k-muted]/70">{EVENT.id}</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{new Date(EVENT.dateStart).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} → {new Date(EVENT.dateEnd).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{EVENT.location}</span>
                <span className="flex items-center gap-1"><Camera className="h-3 w-3" />{BORNES_ASSIGNED.length} bornes</span>
                <span className="flex items-center gap-1"><Truck className="h-3 w-3" />{EVENT.provenance}{EVENT.provenance === "Antenne locale" && EVENT.antenne ? ` — ${EVENT.antenne}` : ""}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", EVENT.clientType === "Pro" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-500")}>{EVENT.clientType}</span>
              </div>

              {/* Config code */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5">
                  <Hash className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-mono text-[13px] font-bold text-slate-700 tracking-wider">{EVENT.configCode}</span>
                  <span className="text-[10px] text-slate-400">Code config</span>
                </div>
                <a
                  href={EVENT.configUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-rose-50 border border-rose-200 px-3 py-1.5 text-[12px] font-medium text-rose-600 hover:bg-rose-100 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ouvrir la config
                </a>
              </div>
            </div>

            {/* Right: team avatars + actions */}
            <div className="flex flex-col items-end gap-3">
              {/* Team avatars Monday-style */}
              <div className="flex items-center gap-3">
                {Object.entries(TEAM).map(([key, member]) => (
                  <div key={key} className="group relative flex flex-col items-center">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white shadow-sm", member.color)}>
                      {member.initials}
                    </div>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -bottom-10 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] text-white shadow-lg">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-white/60 ml-1">• {member.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <a href="/events/create" className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition shadow-sm">
                  <Edit className="h-3.5 w-3.5" /> Modifier
                </a>
                <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition shadow-sm">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Objectifs & Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {EVENT.objectifs.map(o => (
              <span key={o} className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-semibold text-amber-700">{o}</span>
            ))}
            {EVENT.tags.map(t => (
              <span key={t} className="rounded-md bg-slate-100 border border-slate-200/60 px-2 py-0.5 text-[10px] font-semibold text-slate-600">{t}</span>
            ))}
          </div>

          {/* Phase status indicators */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {PHASES.map(phase => {
              const allDone = phase.checks.every(ck => CHECKLIST.find(c => c.key === ck)?.done);
              const someDone = phase.checks.some(ck => CHECKLIST.find(c => c.key === ck)?.done);
              return (
                <div
                  key={phase.key}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold border transition",
                    allDone
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : someDone
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                  )}
                >
                  {allDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : someDone ? (
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-slate-300" />
                  )}
                  {phase.label}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 tabular-nums whitespace-nowrap">{progress}%</span>
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
                active ? "text-rose-500" : "text-[--k-muted] hover:text-[--k-text]",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count != null && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", active ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500")}>
                  {tab.count}
                </span>
              )}
              {active && <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-rose-500" />}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div className="grid gap-5 lg:grid-cols-3">

        {/* Left column 2/3 */}
        <div className="lg:col-span-2 space-y-5">

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
                        ref={commentRef}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Écrire une mise à jour..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-3 text-[13px] outline-none placeholder:text-[--k-muted]/60 focus:border-rose-300 focus:bg-white transition"
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
                        <button className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-4 py-1.5 text-[12px] font-semibold text-white hover:bg-rose-600 transition shadow-sm">
                          <Send className="h-3.5 w-3.5" /> Publier
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments list */}
              <div className="space-y-3">
                {COMMENTS.map(c => (
                  <div key={c.id} className={cn("rounded-2xl border bg-white shadow-sm overflow-hidden", c.pinned ? "border-rose-200" : "border-[--k-border]")}>
                    {c.pinned && (
                      <div className="flex items-center gap-1.5 bg-rose-50 px-4 py-1.5 text-[11px] font-medium text-rose-500">
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
                            {c.user.external && (
                              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[9px] font-bold text-orange-500 uppercase">Client</span>
                            )}
                            <span className="text-[11px] text-[--k-muted]">{c.date}</span>
                          </div>
                          <p className="text-[13px] text-[--k-text]/80 leading-relaxed whitespace-pre-wrap">{c.text}</p>
                          {/* Reactions & actions */}
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

          {/* ── INFO TAB ── */}
          {activeTab === "info" && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <Card title="Client" icon={Building2} accent="blue">
                  <InfoRow label="Société" value={
                    <a href={`/clients/${CLIENT.id}`} className="text-[--k-primary] hover:underline font-medium flex items-center gap-1">
                      {CLIENT.company} <ExternalLink className="h-3 w-3" />
                    </a>
                  } />
                  <InfoRow label="Groupe" value={CLIENT.groupe} />
                  <InfoRow label="Contact" value={CLIENT.contact} />
                  <InfoRow label="Fonction" value={CLIENT.role} />
                  <InfoRow label="Email" value={<a href={`mailto:${CLIENT.email}`} className="text-[--k-primary] hover:underline">{CLIENT.email}</a>} />
                  <InfoRow label="Téléphone" value={CLIENT.phone} />
                </Card>

                <Card title="Détails événement" icon={CalendarDays} accent="rose">
                  <InfoRow label="Type" value={
                    <span className="rounded-md bg-pink-50 px-2 py-0.5 text-[11px] font-semibold text-pink-500">{EVENT.type}</span>
                  } />
                  <InfoRow label="Période" value={EVENT.period} />
                  <InfoRow label="Animation" value={new Date(EVENT.dateAnimation).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} />
                  <InfoRow label="Ville" value={EVENT.ville} />
                  <InfoRow label="Adresse" value={EVENT.address} />
                  <InfoRow label="Antenne" value={EVENT.antenne} />
                  <InfoRow label="Provenance" value={EVENT.provenance} />
                </Card>
              </div>

              {/* Notes internes */}
              {EVENT.notes && (
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
                  <div className="text-[11px] font-semibold text-blue-600 mb-1.5 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Notes internes
                  </div>
                  <div className="text-[12px] text-[--k-text] leading-relaxed">{EVENT.notes}</div>
                </div>
              )}
            </>
          )}

          {/* ── CRÉA TAB ── */}
          {activeTab === "crea" && (
            <>
              {/* Phase status */}
              <PhaseStatus checks={["briefing", "design"]} checklist={CHECKLIST} />

              {/* Briefing créatif */}
              <Card title="Briefing créatif" icon={Palette} accent="pink">
                <InfoRow label="Marque" value={BRIEFING.marque} />
                <InfoRow label="Template" value={BRIEFING.template} />
                <InfoRow label="Logo" value={BRIEFING.logo} />
                <div className="flex items-center gap-2 py-1.5 border-b border-[--k-border]">
                  <span className="w-24 shrink-0 text-[11px] text-[--k-muted]">Couleurs</span>
                  <div className="flex gap-1.5">
                    {BRIEFING.couleurs.map(c => (
                      <span key={c} className="h-5 w-5 rounded-md border border-[--k-border] shadow-sm" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>
                <InfoRow label="Texte accueil" value={BRIEFING.texteAccueil} />
                <InfoRow label="Texte partage" value={BRIEFING.textePartage} />
                <InfoRow label="Backdrop" value={BRIEFING.backdrop} />
                <InfoRow label="Props" value={BRIEFING.props} />
              </Card>

              {/* Animations */}
              <Card title="Animations commandées" icon={Camera} accent="violet">
                {ANIMATIONS.map((a, i) => (
                  <div key={i} className={cn("py-2", i > 0 && "border-t border-[--k-border]")}>
                    <div className="text-[12px] font-semibold text-[--k-text] mb-1">{a.type}</div>
                    <div className="flex flex-wrap gap-1">
                      {a.options.map(o => <span key={o} className="rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">{o}</span>)}
                      {a.perso.map(o => <span key={o} className="rounded-md bg-pink-50 px-2 py-0.5 text-[10px] font-medium text-pink-600">{o}</span>)}
                      {a.partage.map(o => <span key={o} className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">{o}</span>)}
                    </div>
                  </div>
                ))}
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <ActionPill icon={Send} label="Envoyer les maquettes au client" />
                <ActionPill icon={Eye} label="Voir le rendu de la config" />
                <ActionPill icon={Edit} label="Modifier le briefing" />
              </div>
            </>
          )}

          {/* ── CONFIG TAB ── */}
          {activeTab === "config" && (
            <>
              <PhaseStatus checks={["test"]} checklist={CHECKLIST} />

              {/* Configuration */}
              <Card title="Configuration borne" icon={Settings} accent="rose">
                <InfoRow label="Code config" value={
                  <span className="font-mono font-bold text-rose-600 tracking-wider">{EVENT.configCode}</span>
                } />
                <InfoRow label="Template" value={BRIEFING.template} />
                <InfoRow label="Texte accueil" value={BRIEFING.texteAccueil} />
                <InfoRow label="Texte partage" value={BRIEFING.textePartage} />
                <div className="flex items-center gap-2 py-1.5 border-b border-[--k-border]">
                  <span className="w-24 shrink-0 text-[11px] text-[--k-muted]">Couleurs</span>
                  <div className="flex gap-1.5">
                    {BRIEFING.couleurs.map(c => (
                      <span key={c} className="h-5 w-5 rounded-md border border-[--k-border] shadow-sm" style={{ backgroundColor: c }} title={c} />
                    ))}
                  </div>
                </div>
                <InfoRow label="Logo" value={BRIEFING.logo} />
              </Card>

              {/* Animations configurées */}
              <Card title="Animations configurées" icon={Camera} accent="violet">
                {ANIMATIONS.map((a, i) => (
                  <div key={i} className={cn("py-2", i > 0 && "border-t border-[--k-border]")}>
                    <div className="text-[12px] font-semibold text-[--k-text] mb-1">{a.type}</div>
                    <div className="flex flex-wrap gap-1">
                      {[...a.options, ...a.perso, ...a.partage].map(o => (
                        <span key={o} className="rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">{o}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <a
                  href={EVENT.configUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-4 py-2 text-[12px] font-semibold text-white hover:bg-rose-600 transition shadow-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Ouvrir l'app de config
                </a>
                <ActionPill icon={Copy} label="Copier le code config" />
                <ActionPill icon={Send} label="Envoyer la config au technicien" />
              </div>
            </>
          )}

          {/* ── LOGISTIQUE TAB ── */}
          {activeTab === "logistique" && (
            <>
              <PhaseStatus checks={["bornes", "logistics", "shipping"]} checklist={CHECKLIST} />

              {/* Dispositifs commandés */}
              <Card title="Dispositifs commandés" icon={Package} accent="emerald">
                {DISPOSITIFS.map((d, i) => (
                  <div key={i} className={cn("flex items-center justify-between py-2", i > 0 && "border-t border-[--k-border]")}>
                    <div>
                      <span className="text-[12px] font-semibold text-[--k-text]">{d.borneType}</span>
                      {d.notes && <span className="ml-2 text-[11px] text-[--k-muted]">({d.notes})</span>}
                    </div>
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">×{d.qty}</span>
                  </div>
                ))}
              </Card>

              {/* Bornes assignées */}
              <Card title={`Bornes assignées (${BORNES_ASSIGNED.length})`} icon={Camera} accent="rose">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b-2 border-[--k-border]">
                        <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">ID</th>
                        <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">Modèle</th>
                        <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">Provenance</th>
                        <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">Expédition</th>
                        <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BORNES_ASSIGNED.map(b => {
                        const bs = BORNE_STATUS[b.status];
                        return (
                          <tr key={b.id} className="border-b border-[--k-border] last:border-0 hover:bg-rose-50/30 transition">
                            <td className="px-3 py-2.5">
                              <a href={`/bornes/${b.id}`} className="font-mono font-semibold text-[--k-primary] hover:underline">{b.id}</a>
                            </td>
                            <td className="px-3 py-2.5 text-[--k-text]">{b.model}</td>
                            <td className="px-3 py-2.5 text-[--k-muted]">{b.location}</td>
                            <td className="px-3 py-2.5">
                              {b.shipping.startsWith("UPS") || b.shipping.startsWith("TNT") ? (
                                <span className="flex items-center gap-1 text-amber-600">
                                  <Truck className="h-3 w-3" />
                                  <span className="text-[11px] font-mono">{b.shipping}</span>
                                </span>
                              ) : (
                                <span className="text-[--k-muted]">{b.shipping}</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              <span className={cn("inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold", bs.color)}>{bs.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex gap-4 text-[11px] text-[--k-muted]">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />{BORNES_ASSIGNED.filter(b => b.status === "ready").length} prêtes</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" />{BORNES_ASSIGNED.filter(b => b.status === "transit").length} en transit</span>
                </div>
              </Card>

              {/* Infos logistique */}
              <Card title="Informations logistique" icon={Truck} accent="amber">
                <InfoRow label="Provenance" value={EVENT.provenance} />
                <InfoRow label="Antenne" value={EVENT.antenne} />
                <InfoRow label="Lieu" value={EVENT.location} />
                <InfoRow label="Adresse" value={EVENT.address} />
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <ActionPill icon={FileText} label="Générer bon de livraison" />
                <ActionPill icon={Printer} label="Imprimer les étiquettes" />
                <ActionPill icon={Mail} label="Envoyer tracking au client" />
              </div>
            </>
          )}

          {/* ── ACTIVITY TAB ── */}
          {activeTab === "activity" && (
            <Card title="Journal d'activité" icon={Clock} accent="slate">
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[--k-border]" />
                {ACTIVITY_LOG.map((a, i) => (
                  <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                    <span className={cn(
                      "absolute -left-6 top-0.5 h-[18px] w-[18px] rounded-full border-2 border-white flex items-center justify-center shrink-0",
                      a.type === "create" ? "bg-slate-400" :
                      a.type === "comment" ? "bg-blue-500" :
                      a.type === "check" ? "bg-emerald-500" :
                      a.type === "logistics" ? "bg-amber-500" :
                      a.type === "design" ? "bg-violet-500" :
                      a.type === "briefing" ? "bg-cyan-500" :
                      "bg-slate-300"
                    )}>
                      {a.type === "check" && <CheckCircle2 className="h-2.5 w-2.5 text-white" />}
                      {a.type === "comment" && <MessageSquare className="h-2.5 w-2.5 text-white" />}
                    </span>
                    <div>
                      <div className="text-[12px] font-medium text-[--k-text]">{a.action}</div>
                      <div className="text-[11px] text-[--k-muted]">{a.user} — {a.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-5">

          {/* Checklist */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[--k-text]">Avancement</span>
              <span className="text-[11px] font-bold text-emerald-600 tabular-nums">{progress}%</span>
            </div>
            <div className="p-4 space-y-1">
              {CHECKLIST.map(c => (
                <div key={c.key} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] transition", c.done ? "text-[--k-muted]" : "text-[--k-text]")}>
                  {c.done
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    : <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                  }
                  <span className={cn(c.done && "line-through")}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Config shortcut */}
          <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-rose-500" />
              <span className="text-[13px] font-semibold text-rose-700">Configuration</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[18px] font-black text-rose-600 tracking-[0.15em]">{EVENT.configCode}</span>
            </div>
            <a
              href={EVENT.configUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-500 px-4 py-2 text-[12px] font-semibold text-white hover:bg-rose-600 transition shadow-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Ouvrir l'app de config
            </a>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[--k-border] px-4 py-3">
              <span className="text-[13px] font-semibold text-[--k-text]">Actions rapides</span>
            </div>
            <div className="p-2 space-y-0.5">
              <ActionBtn icon={Mail} label="Envoyer recap au client" />
              <ActionBtn icon={FileText} label="Générer bon de livraison" />
              <ActionBtn icon={Download} label="Exporter fiche PDF" />
              <ActionBtn icon={Copy} label="Dupliquer l'événement" />
              <ActionBtn icon={Printer} label="Imprimer la fiche" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function Card({ title, icon: Icon, children, accent = "rose" }) {
  const accentColors = {
    rose: "border-l-rose-400",
    blue: "border-l-blue-400",
    violet: "border-l-violet-400",
    emerald: "border-l-emerald-400",
    amber: "border-l-amber-400",
    pink: "border-l-pink-400",
    slate: "border-l-slate-400",
  };
  const iconColors = {
    rose: "text-rose-400",
    blue: "text-blue-400",
    violet: "text-violet-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    pink: "text-pink-400",
    slate: "text-slate-400",
  };
  return (
    <div className={cn("rounded-2xl border border-[--k-border] border-l-[3px] bg-white shadow-sm", accentColors[accent])}>
      <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-3">
        {Icon && <Icon className={cn("h-4 w-4", iconColors[accent])} />}
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-[--k-border] last:border-0 text-[12px]">
      <span className="w-24 shrink-0 text-[--k-muted]">{label}</span>
      <span className="text-[--k-text] font-medium">{value}</span>
    </div>
  );
}

function ActionBtn({ icon: Icon, label }) {
  return (
    <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
      <Icon className="h-3.5 w-3.5 text-[--k-muted]" />
      {label}
    </button>
  );
}

function ActionPill({ icon: Icon, label }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition shadow-sm">
      <Icon className="h-3.5 w-3.5 text-[--k-muted]" />
      {label}
    </button>
  );
}

function PhaseStatus({ checks, checklist }) {
  const items = checks.map(ck => checklist.find(c => c.key === ck)).filter(Boolean);
  const allDone = items.every(c => c.done);
  const someDone = items.some(c => c.done);
  return (
    <div className={cn(
      "rounded-xl border p-4 flex items-center gap-3",
      allDone ? "bg-emerald-50/60 border-emerald-200" : someDone ? "bg-amber-50/60 border-amber-200" : "bg-slate-50 border-slate-200"
    )}>
      {allDone ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
      ) : someDone ? (
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
      ) : (
        <Circle className="h-5 w-5 text-slate-300 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className={cn("text-[13px] font-semibold", allDone ? "text-emerald-700" : someDone ? "text-amber-700" : "text-slate-500")}>
          {allDone ? "Toutes les étapes sont validées" : someDone ? "En cours — certaines étapes restent à valider" : "Aucune étape validée"}
        </div>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {items.map(c => (
            <span key={c.key} className={cn("flex items-center gap-1 text-[11px] font-medium", c.done ? "text-emerald-600" : "text-slate-400")}>
              {c.done ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
