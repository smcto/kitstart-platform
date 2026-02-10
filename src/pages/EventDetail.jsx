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
  Briefcase, UserCircle, Eye, Plus, X, Upload, Globe, Receipt,
  CreditCard, ChevronUp, TrendingUp, Star, BarChart3
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
  siret: "812 345 678 00012",
  tva: "FR 12 812345678",
  address: "45 rue de la Convention, 75015 Paris",
  website: "www.salonexpo.fr",
  groupe: "Entreprise",
};

const CLIENT_CONTACTS = [
  { id: 1, name: "Marie Laurent", role: "Directrice événementiel", email: "m.laurent@salonexpo.fr", phone: "+33 6 12 34 56 78", type: "projet", photo: "https://i.pravatar.cc/150?u=marie-laurent" },
  { id: 2, name: "Julien Moreau", role: "Chef de projet événementiel", email: "j.moreau@salonexpo.fr", phone: "+33 6 98 76 54 32", type: "projet", photo: "https://i.pravatar.cc/150?u=julien-moreau" },
  { id: 3, name: "Sophie Durand", role: "Responsable comptabilité", email: "compta@salonexpo.fr", phone: "+33 1 45 67 89 00", type: "facturation", photo: "https://i.pravatar.cc/150?u=sophie-durand" },
];

const CLIENT_STATS = {
  clientDepuis: "Mars 2023",
  nbEvents: 14,
  nbEventsAnnee: 4,
  caTotalHT: 52400,
  dernierEvent: "Janvier 2026",
  tauxConversion: 82,
  satisfaction: 4.8,
  tauxRecurrence: 71,
};

const CLIENT_EVENTS_HISTORY = [
  { id: "EVT-2026-0287", name: "Salon du Mariage Paris", date: "08/02/2026", status: "ready", current: true },
  { id: "EVT-2026-0134", name: "Congrès RH Lyon", date: "15/01/2026", status: "done", current: false },
  { id: "EVT-2025-0892", name: "Salon Franchise Expo", date: "22/11/2025", status: "done", current: false },
];

const DEVIS = [
  { id: "DEV-2025-0412", date: "2025-12-18", montant: 8500, status: "accepted", label: "Prestation photobooth — Salon du Mariage 2026", lignes: [
    { desc: "Location 3x Spherik + 2x Prestige (3 jours)", qty: 1, pu: 5200 },
    { desc: "Impression magnets personnalisés (500 ex.)", qty: 1, pu: 800 },
    { desc: "Mosaïque photo live — Grand format", qty: 1, pu: 1200 },
    { desc: "Galerie en ligne + envoi mail (illimité)", qty: 1, pu: 600 },
    { desc: "Installation & désinstallation sur site", qty: 1, pu: 700 },
  ]},
  { id: "DEV-2025-0398", date: "2025-12-10", montant: 6200, status: "declined", label: "Prestation photobooth — Version sans mosaïque", lignes: [
    { desc: "Location 3x Spherik + 2x Prestige (3 jours)", qty: 1, pu: 5200 },
    { desc: "Galerie en ligne + envoi mail (illimité)", qty: 1, pu: 600 },
    { desc: "Installation & désinstallation sur site", qty: 1, pu: 400 },
  ]},
];

const DEVIS_STATUS = {
  accepted: { label: "Accepté", color: "bg-emerald-50 text-emerald-600" },
  declined: { label: "Refusé", color: "bg-red-50 text-red-500" },
  pending: { label: "En attente", color: "bg-amber-50 text-amber-600" },
  draft: { label: "Brouillon", color: "bg-slate-100 text-slate-500" },
};

const TEAM = {
  commercial: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500", role: "Commercial", photo: "https://i.pravatar.cc/150?u=seb" },
  chef: { name: "Thomas Lefebvre", initials: "TL", color: "bg-emerald-500", role: "Chef de projet", photo: "https://i.pravatar.cc/150?u=thomas" },
  tech: { name: "Lucas Faure", initials: "LF", color: "bg-amber-500", role: "Technicien terrain", photo: "https://i.pravatar.cc/150?u=lucas-faure" },
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
    id: 1, user: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500", photo: "https://i.pravatar.cc/150?u=seb" },
    date: "07/02/2026 09:42", text: "Briefing client finalisé avec Marie. Elle veut un rendu très élégant, couleurs dorées. RAS côté logistique, les bornes sont prêtes.",
    reactions: [{ emoji: "👍", count: 2 }], pinned: true,
  },
  {
    id: 2, user: { name: "Thomas Lefebvre", initials: "TL", color: "bg-emerald-500", photo: "https://i.pravatar.cc/150?u=thomas" },
    date: "06/02/2026 16:15", text: "Les 5 bornes antenne IDF sont testées et prêtes. @Lucas peux-tu confirmer les expéditions UPS/TNT pour demain ?",
    reactions: [], pinned: false,
  },
  {
    id: 3, user: { name: "Lucas Faure", initials: "LF", color: "bg-amber-500", photo: "https://i.pravatar.cc/150?u=lucas-faure" },
    date: "06/02/2026 17:30", text: "Confirmé ! UPS et TNT partent demain matin. Tracking envoyé au client. Les 3 bornes Bretagne seront livrées vendredi avant 14h.",
    reactions: [{ emoji: "✅", count: 1 }], pinned: false,
  },
  {
    id: 4, user: { name: "Léa Martin", initials: "LM", color: "bg-pink-500", photo: "https://i.pravatar.cc/150?u=lea" },
    date: "05/02/2026 14:20", text: "Maquettes validées par le client ! Le template est prêt côté config. J'ai uploadé le logo et configuré les couleurs.",
    reactions: [{ emoji: "🎉", count: 3 }, { emoji: "👍", count: 1 }], pinned: false,
  },
  {
    id: 5, user: { name: "Seb Mahé", initials: "SM", color: "bg-indigo-500", photo: "https://i.pravatar.cc/150?u=seb" },
    date: "01/02/2026 10:00", text: "12 bornes affectées : 8 Antenne IDF + 4 expéditions (2 UPS entrepôt + 2 TNT Bretagne). Planning logistique validé.",
    reactions: [], pinned: false,
  },
  {
    id: 6, user: { name: "Marie Laurent", initials: "ML", color: "bg-violet-500", photo: "https://i.pravatar.cc/150?u=marie-laurent", external: true },
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

const TYPES_INSTALLATION = ["Envoi transporteur", "Pick-up", "Livraison & installation", "Livraison seulement", "Installation seulement"];
const TYPES_RETOUR = ["Retour transporteur", "Retour Pick-up", "Désinstallation & retour", "Retour seulement", "Désinstallation seulement"];

export default function EventDetail() {
  const st = STATUS_MAP[EVENT.status];
  const doneCount = CHECKLIST.filter(c => c.done).length;
  const progress = Math.round((doneCount / CHECKLIST.length) * 100);
  const [activeTab, setActiveTab] = useState("updates");
  const [editing, setEditing] = useState(null); // null or tab key like "crea", "config", "logistique", "client"
  const [showDevis, setShowDevis] = useState(null); // null or devis object
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // comment id
  const [replyText, setReplyText] = useState("");
  const [addingContact, setAddingContact] = useState(false);
  const [newContactType, setNewContactType] = useState("projet");
  const commentRef = useRef(null);

  // Créa form state
  const [creaRealisee, setCreaRealisee] = useState("nous");
  const [supportsACreer, setSupportsACreer] = useState("oui");
  const [supportsAImprimer, setSupportsAImprimer] = useState("oui");
  const [infosComplementairesCrea, setInfosComplementairesCrea] = useState("");

  // Config form state
  const [configNotes, setConfigNotes] = useState("");

  // Logistique form state
  const [typeInstallation, setTypeInstallation] = useState("Livraison & installation");
  const [jourAller, setJourAller] = useState("2026-02-07");
  const [heureAllerMode, setHeureAllerMode] = useState("precise");
  const [heureAller, setHeureAller] = useState("14:00");
  const [heureAllerDebut, setHeureAllerDebut] = useState("");
  const [heureAllerFin, setHeureAllerFin] = useState("");
  const [typeRetour, setTypeRetour] = useState("Désinstallation & retour");
  const [jourRetour, setJourRetour] = useState("2026-02-10");
  const [heureRetourMode, setHeureRetourMode] = useState("tranche");
  const [heureRetour, setHeureRetour] = useState("");
  const [heureRetourDebut, setHeureRetourDebut] = useState("17:00");
  const [heureRetourFin, setHeureRetourFin] = useState("19:00");
  const [commentaireAllerInterne, setCommentaireAllerInterne] = useState("");
  const [commentaireRetourInterne, setCommentaireRetourInterne] = useState("");

  const TABS = [
    { key: "updates", label: "Mises à jour", icon: MessageSquare, count: COMMENTS.length },
    { key: "client", label: "Client", icon: Building2 },
    { key: "evenement", label: "Événement", icon: CalendarDays },
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
        {/* Top subtle stripe */}
        <div className="h-1 bg-gradient-to-r from-slate-200 to-slate-100" />

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
                  className="flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ouvrir la config
                </a>
              </div>
            </div>

            {/* Right: team avatars + actions */}
            <div className="flex flex-col items-end gap-3">
              {/* Team avatars */}
              <div className="flex items-center gap-3">
                {Object.entries(TEAM).map(([key, member]) => (
                  <div key={key} className="group relative flex flex-col items-center">
                    <img src={member.photo} alt={member.name} className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm object-cover" />
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
              <span key={o} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{o}</span>
            ))}
            {EVENT.tags.map(t => (
              <span key={t} className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{t}</span>
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
                      ? "bg-slate-50 border-slate-200 text-slate-600"
                      : someDone
                        ? "bg-slate-50 border-slate-200 text-slate-500"
                        : "bg-white border-slate-200 text-slate-300"
                  )}
                >
                  {allDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : someDone ? (
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-slate-200" />
                  )}
                  {phase.label}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-slate-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums whitespace-nowrap">{progress}%</span>
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
                "relative flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold transition",
                active ? "text-[--k-primary]" : "text-[--k-muted] hover:text-[--k-text]",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count != null && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", active ? "bg-[--k-primary-2] text-[--k-primary]" : "bg-slate-100 text-slate-400")}>
                  {tab.count}
                </span>
              )}
              {active && <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[--k-primary]" />}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div className={cn("grid gap-5", activeTab !== "activity" && "lg:grid-cols-3")}>

        {/* Left column 2/3 (full width on activity tab) */}
        <div className={cn("space-y-5", activeTab !== "activity" && "lg:col-span-2")}>

          {/* ── UPDATES TAB ── */}
          {activeTab === "updates" && (
            <>
              {/* Comment composer */}
              <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-3">
                    <img src="https://i.pravatar.cc/150?u=seb" alt="Seb Mahé" className="h-9 w-9 shrink-0 rounded-full ring-2 ring-white object-cover" />
                    <div className="flex-1 min-w-0">
                      <textarea
                        ref={commentRef}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Écrire une mise à jour..."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-3 text-[13px] outline-none placeholder:text-[--k-muted]/60 focus:border-slate-400 focus:bg-white transition"
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
                        <button className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-4 py-1.5 text-[12px] font-semibold text-white hover:brightness-110 transition shadow-sm">
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
                  <div key={c.id} className={cn("rounded-2xl border bg-white shadow-sm overflow-hidden", c.pinned ? "border-slate-300" : "border-[--k-border]")}>
                    {c.pinned && (
                      <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-1.5 text-[11px] font-medium text-slate-500">
                        <Pin className="h-3 w-3" /> Épinglé
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex gap-3">
                        <img src={c.user.photo} alt={c.user.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
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
                            <button
                              onClick={() => { setReplyingTo(replyingTo === c.id ? null : c.id); setReplyText(""); }}
                              className={cn(
                                "flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] transition",
                                replyingTo === c.id
                                  ? "bg-[--k-primary-2] text-[--k-primary] font-medium"
                                  : "text-[--k-muted] hover:bg-slate-50 hover:text-[--k-text]"
                              )}
                            >
                              <Reply className="h-3 w-3" /> Répondre
                            </button>
                          </div>

                          {/* Reply composer */}
                          {replyingTo === c.id && (
                            <div className="mt-3 flex gap-2.5 rounded-xl border border-[--k-border] bg-[--k-surface-2]/20 p-3">
                              <img src="https://i.pravatar.cc/150?u=seb" alt="Seb Mahé" className="h-7 w-7 shrink-0 rounded-full object-cover mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-[--k-muted] mb-1.5">
                                  En réponse à <span className="font-semibold text-[--k-text]">{c.user.name}</span>
                                </div>
                                <textarea
                                  value={replyText}
                                  onChange={e => setReplyText(e.target.value)}
                                  placeholder={`Répondre à ${c.user.name.split(" ")[0]}...`}
                                  rows={2}
                                  autoFocus
                                  className="w-full resize-none rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[12px] outline-none placeholder:text-[--k-muted]/60 focus:border-slate-400 transition"
                                />
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <button className="flex h-6 w-6 items-center justify-center rounded text-[--k-muted] hover:bg-white hover:text-[--k-text] transition">
                                      <AtSign className="h-3 w-3" />
                                    </button>
                                    <button className="flex h-6 w-6 items-center justify-center rounded text-[--k-muted] hover:bg-white hover:text-[--k-text] transition">
                                      <Paperclip className="h-3 w-3" />
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      onClick={() => setReplyingTo(null)}
                                      className="rounded-md px-2.5 py-1 text-[11px] font-medium text-[--k-muted] hover:bg-white transition"
                                    >
                                      Annuler
                                    </button>
                                    <button
                                      onClick={() => { setReplyingTo(null); setReplyText(""); }}
                                      disabled={!replyText.trim()}
                                      className={cn(
                                        "flex items-center gap-1 rounded-md px-3 py-1 text-[11px] font-semibold transition shadow-sm",
                                        replyText.trim()
                                          ? "bg-[--k-primary] text-white hover:brightness-110"
                                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                      )}
                                    >
                                      <Send className="h-3 w-3" /> Répondre
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── CLIENT TAB ── */}
          {activeTab === "client" && (
            <>
              {/* ── Client identity ── */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm overflow-hidden">
                <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <h2 className="text-[15px] font-bold text-[--k-text]">Coordonnées</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {editing !== "client" ? (
                      <button onClick={() => setEditing("client")} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-3 py-1.5 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                        <Edit className="h-3.5 w-3.5 text-[--k-muted]" /> Compléter
                      </button>
                    ) : (
                      <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 py-1.5 text-[12px] font-medium text-white hover:brightness-110 transition shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Valider
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  {editing === "client" ? (
                    <div className="space-y-4">
                      <Field label="Société"><input type="text" defaultValue={CLIENT.company} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      <Field label="SIRET"><input type="text" defaultValue={CLIENT.siret} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      <Field label="N° TVA"><input type="text" defaultValue={CLIENT.tva} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      <Field label="Adresse"><input type="text" defaultValue={CLIENT.address} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      <Field label="Site web"><input type="text" defaultValue={CLIENT.website} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      <Field label="Groupe"><input type="text" defaultValue={CLIENT.groupe} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      <InfoRow label="Société" value={<span className="font-semibold text-[--k-text]">{CLIENT.company}</span>} />
                      <InfoRow label="SIRET" value={<span className="font-mono text-[11px]">{CLIENT.siret}</span>} />
                      <InfoRow label="N° TVA" value={<span className="font-mono text-[11px]">{CLIENT.tva}</span>} />
                      <InfoRow label="Adresse" value={CLIENT.address} />
                      <InfoRow label="Site web" value={<a href={`https://${CLIENT.website}`} target="_blank" rel="noopener noreferrer" className="text-[--k-primary] hover:underline flex items-center gap-1">{CLIENT.website} <ExternalLink className="h-3 w-3" /></a>} />
                      <InfoRow label="Groupe" value={<span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{CLIENT.groupe}</span>} />
                    </div>
                  )}
                  <div className="mt-4 pt-3 border-t border-[--k-border]">
                    <a href={`/clients/${CLIENT.id}`} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[--k-primary] hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" /> Voir la fiche client complète
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Contacts ── */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm overflow-hidden">
                <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <h2 className="text-[15px] font-bold text-[--k-text]">Contacts</h2>
                  </div>
                  {!addingContact ? (
                    <button onClick={() => setAddingContact(true)} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-3 py-1.5 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                      <Plus className="h-3.5 w-3.5 text-[--k-muted]" /> Ajouter
                    </button>
                  ) : (
                    <button onClick={() => setAddingContact(false)} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-3 py-1.5 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
                      <X className="h-3.5 w-3.5" /> Annuler
                    </button>
                  )}
                </div>
                <div className="p-5 space-y-5">

                  {/* Add contact form */}
                  {addingContact && (
                    <div className="rounded-xl border-2 border-dashed border-[--k-primary]/30 bg-[--k-primary-2]/10 p-4 space-y-4">
                      <div className="text-[13px] font-semibold text-[--k-text]">Nouveau contact</div>
                      <div className="flex items-center gap-4">
                        {[{ v: "projet", l: "Contact projet", icon: Briefcase }, { v: "facturation", l: "Contact facturation", icon: CreditCard }].map(t => (
                          <label key={t.v} className="flex items-center gap-2 text-[12px] text-[--k-text] cursor-pointer">
                            <input type="radio" name="newContactType" checked={newContactType === t.v} onChange={() => setNewContactType(t.v)} className="accent-[--k-primary]" />
                            <t.icon className="h-3 w-3 text-[--k-muted]" /> {t.l}
                          </label>
                        ))}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Nom complet"><input type="text" placeholder="Prénom Nom" className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                        <Field label="Fonction"><input type="text" placeholder="Ex: Chef de projet" className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                        <Field label="Email"><input type="email" placeholder="email@exemple.fr" className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                        <Field label="Téléphone"><input type="tel" placeholder="+33 6 00 00 00 00" className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button onClick={() => setAddingContact(false)} className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] transition">
                          Annuler
                        </button>
                        <button onClick={() => setAddingContact(false)} className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-4 py-1.5 text-[12px] font-semibold text-white hover:brightness-110 transition shadow-sm">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Enregistrer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contacts projet */}
                  <div>
                    <div className="text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                      <Briefcase className="h-3 w-3" /> Contact{CLIENT_CONTACTS.filter(c => c.type === "projet").length > 1 ? "s" : ""} projet
                    </div>
                    <div className="space-y-3">
                      {CLIENT_CONTACTS.filter(c => c.type === "projet").map(contact => (
                        <div key={contact.id} className="flex items-start gap-3 rounded-xl border border-[--k-border] bg-[--k-surface-2]/20 p-3">
                          <img src={contact.photo} alt={contact.name} className="h-9 w-9 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-[--k-text]">{contact.name}</div>
                            <div className="text-[11px] text-[--k-muted] mb-1.5">{contact.role}</div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-[11px] text-[--k-primary] hover:underline">
                                <Mail className="h-3 w-3" /> {contact.email}
                              </a>
                              <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-[11px] text-[--k-primary] hover:underline">
                                <Phone className="h-3 w-3" /> {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts facturation */}
                  <div>
                    <div className="text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                      <CreditCard className="h-3 w-3" /> Contact{CLIENT_CONTACTS.filter(c => c.type === "facturation").length > 1 ? "s" : ""} facturation
                    </div>
                    <div className="space-y-3">
                      {CLIENT_CONTACTS.filter(c => c.type === "facturation").map(contact => (
                        <div key={contact.id} className="flex items-start gap-3 rounded-xl border border-[--k-border] bg-[--k-surface-2]/20 p-3">
                          <img src={contact.photo} alt={contact.name} className="h-9 w-9 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-[--k-text]">{contact.name}</div>
                            <div className="text-[11px] text-[--k-muted] mb-1.5">{contact.role}</div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-[11px] text-[--k-primary] hover:underline">
                                <Mail className="h-3 w-3" /> {contact.email}
                              </a>
                              <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-[11px] text-[--k-primary] hover:underline">
                                <Phone className="h-3 w-3" /> {contact.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── ÉVÉNEMENT TAB ── */}
          {activeTab === "evenement" && (
            <>
              {/* Détails événement */}
              <Card title="Détails événement" icon={CalendarDays}>
                <InfoRow label="Type" value={
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{EVENT.type}</span>
                } />
                <InfoRow label="Période" value={EVENT.period} />
                <InfoRow label="Animation" value={new Date(EVENT.dateAnimation).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} />
                <InfoRow label="Ville" value={EVENT.ville} />
                <InfoRow label="Antenne" value={EVENT.antenne} />
                <InfoRow label="Provenance" value={EVENT.provenance} />
                <InfoRow label="Créé le" value={new Date(EVENT.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} />
                {EVENT.notes && (
                  <div className="mt-2 pt-2 border-t border-[--k-border]">
                    <div className="text-[11px] font-semibold text-[--k-muted] mb-1 flex items-center gap-1">
                      <FileText className="h-3 w-3" /> Notes internes
                    </div>
                    <div className="text-[12px] text-[--k-text] leading-relaxed">{EVENT.notes}</div>
                  </div>
                )}
              </Card>

              {/* Localisation / Map */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm overflow-hidden">
                <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <h2 className="text-[15px] font-bold text-[--k-text]">Localisation</h2>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-medium text-[--k-primary] hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> Ouvrir dans Maps
                  </a>
                </div>
                <div className="p-3">
                  <div className="rounded-xl overflow-hidden border border-[--k-border]">
                    <iframe
                      title="Localisation événement"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      loading="lazy"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=2.2795,48.8285,2.2935,48.8365&layer=mapnik&marker=48.8325,2.2865`}
                    />
                  </div>
                  <div className="mt-2.5 px-1 flex items-start gap-2 text-[12px]">
                    <MapPin className="h-3.5 w-3.5 text-[--k-muted] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-[--k-text]">{EVENT.location}</div>
                      <div className="text-[--k-muted]">{EVENT.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Devis associés */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm overflow-hidden">
                <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-slate-400" />
                    <h2 className="text-[15px] font-bold text-[--k-text]">Devis associés</h2>
                    <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{DEVIS.length}</span>
                  </div>
                </div>
                <div className="divide-y divide-[--k-border]">
                  {DEVIS.map(devis => {
                    const ds = DEVIS_STATUS[devis.status];
                    return (
                      <div key={devis.id} className="px-5 py-4 hover:bg-slate-50/50 transition">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[12px] font-bold text-[--k-text]">{devis.id}</span>
                              <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", ds.color)}>{ds.label}</span>
                            </div>
                            <div className="text-[12px] text-[--k-text]/80 mb-1">{devis.label}</div>
                            <div className="text-[11px] text-[--k-muted]">
                              {new Date(devis.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              <span className="mx-2">·</span>
                              {devis.lignes.length} ligne{devis.lignes.length > 1 ? "s" : ""}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[16px] font-bold text-[--k-text] tabular-nums">{devis.montant.toLocaleString("fr-FR")} €</span>
                            <button
                              onClick={() => setShowDevis(devis)}
                              className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-3 py-1.5 text-[11px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition"
                            >
                              <Eye className="h-3.5 w-3.5 text-[--k-muted]" /> Voir
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Devis PDF popup/modal */}
              {showDevis && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowDevis(null)}>
                  <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-2xl border border-[--k-border] overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between border-b border-[--k-border] px-6 py-4">
                      <div>
                        <div className="text-[15px] font-bold text-[--k-text]">{showDevis.id}</div>
                        <div className="text-[12px] text-[--k-muted]">{showDevis.label}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[--k-border] bg-white px-3 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                          <Download className="h-3.5 w-3.5" /> PDF
                        </button>
                        <button onClick={() => setShowDevis(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-[--k-muted] hover:bg-slate-100 transition">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="px-6 py-5">
                      <div className="flex justify-between mb-5">
                        <div>
                          <div className="text-[11px] text-[--k-muted] uppercase tracking-wide mb-0.5">Client</div>
                          <div className="text-[13px] font-semibold text-[--k-text]">{CLIENT.company}</div>
                          <div className="text-[11px] text-[--k-muted]">{CLIENT.address}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-[--k-muted] uppercase tracking-wide mb-0.5">Date</div>
                          <div className="text-[13px] font-medium text-[--k-text]">
                            {new Date(showDevis.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                          <div className="mt-1">
                            <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", DEVIS_STATUS[showDevis.status].color)}>{DEVIS_STATUS[showDevis.status].label}</span>
                          </div>
                        </div>
                      </div>
                      <table className="w-full text-[12px] mb-4">
                        <thead>
                          <tr className="border-b-2 border-[--k-border]">
                            <th className="py-2 text-left text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">Description</th>
                            <th className="py-2 text-right text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide w-16">Qté</th>
                            <th className="py-2 text-right text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide w-24">Prix HT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {showDevis.lignes.map((l, i) => (
                            <tr key={i} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2]/40 transition">
                              <td className="py-2.5 text-[--k-text]">{l.desc}</td>
                              <td className="py-2.5 text-right text-[--k-muted] tabular-nums">{l.qty}</td>
                              <td className="py-2.5 text-right font-medium text-[--k-text] tabular-nums">{l.pu.toLocaleString("fr-FR")} €</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex justify-end border-t-2 border-[--k-border] pt-3">
                        <div className="text-right">
                          <div className="text-[11px] text-[--k-muted] mb-0.5">Total HT</div>
                          <div className="text-[18px] font-bold text-[--k-text] tabular-nums">{showDevis.montant.toLocaleString("fr-FR")} €</div>
                          <div className="text-[11px] text-[--k-muted]">TVA 20% : {(showDevis.montant * 0.2).toLocaleString("fr-FR")} € · TTC : {(showDevis.montant * 1.2).toLocaleString("fr-FR")} €</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── CRÉA TAB ── */}
          {activeTab === "crea" && (
            <>
              <PhaseStatus checks={["briefing", "design"]} checklist={CHECKLIST} />

              {/* Créa / Supports graphiques */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                  <h2 className="text-[15px] font-bold text-[--k-text]">Créa / Supports graphiques</h2>
                  {editing !== "crea" ? (
                    <button onClick={() => setEditing("crea")} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-3 py-1.5 text-[12px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                      <Edit className="h-3.5 w-3.5 text-[--k-muted]" /> Modifier
                    </button>
                  ) : (
                    <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-3 py-1.5 text-[12px] font-medium text-white hover:brightness-110 transition shadow-sm">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Valider
                    </button>
                  )}
                </div>
                <div className="p-5">
                  {editing === "crea" ? (
                    <div className="space-y-5">
                      <div>
                        <p className="text-[13px] font-semibold text-[--k-text] mb-2">La création graphique est réalisée :</p>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                            <input type="radio" name="creaRealisee" checked={creaRealisee === "nous"} onChange={() => setCreaRealisee("nous")} className="accent-[--k-primary]" />
                            Par nos soins
                          </label>
                          <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                            <input type="radio" name="creaRealisee" checked={creaRealisee === "client"} onChange={() => setCreaRealisee("client")} className="accent-[--k-primary]" />
                            Par le client
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[--k-text] mb-2">Y-a-t-il des supports à créer ?</p>
                        <div className="flex items-center gap-6">
                          {["non", "oui"].map(v => (
                            <label key={v} className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                              <input type="radio" name="supportsACreer" checked={supportsACreer === v} onChange={() => setSupportsACreer(v)} className="accent-[--k-primary]" />
                              {v === "oui" ? "Oui" : "Non"}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[--k-text] mb-2">Y-a-t-il des supports à imprimer ?</p>
                        <div className="flex items-center gap-6">
                          {["non", "oui"].map(v => (
                            <label key={v} className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                              <input type="radio" name="supportsAImprimer" checked={supportsAImprimer === v} onChange={() => setSupportsAImprimer(v)} className="accent-[--k-primary]" />
                              {v === "oui" ? "Oui" : "Non"}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-semibold text-[--k-muted] mb-1.5">Informations complémentaires</label>
                        <textarea value={infosComplementairesCrea} onChange={e => setInfosComplementairesCrea(e.target.value)} placeholder="Informations complémentaires..." rows={3} className="w-full rounded-lg border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-2.5 text-[13px] outline-none focus:border-slate-400 focus:bg-white transition" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      <InfoRow label="Créa réalisée par" value={creaRealisee === "nous" ? "Nos soins" : "Le client"} />
                      <InfoRow label="Supports à créer" value={supportsACreer === "oui" ? "Oui" : "Non"} />
                      <InfoRow label="Supports à imprimer" value={supportsAImprimer === "oui" ? "Oui" : "Non"} />
                      {infosComplementairesCrea && <InfoRow label="Complément" value={infosComplementairesCrea} />}
                    </div>
                  )}
                </div>
              </div>

              {/* Pièce(s) jointe(s) */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="border-b border-[--k-border] px-5 py-3">
                  <h2 className="text-[15px] font-bold text-[--k-text]">Pièce(s) jointe(s)</h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[--k-border] bg-[--k-surface-2]/20 py-8 hover:border-[--k-primary] hover:bg-[--k-primary-2]/10 transition cursor-pointer">
                    <Upload className="h-6 w-6 text-[--k-muted]" />
                    <p className="text-[13px] text-[--k-muted]">Glisser-déposer ou <span className="text-[--k-primary] font-medium">parcourir</span></p>
                    <p className="text-[10px] text-[--k-muted]/60">PDF, JPG, PNG — Max 10 Mo</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <ActionPill icon={Send} label="Envoyer les maquettes au client" />
                <ActionPill icon={Eye} label="Voir le rendu" />
              </div>
            </>
          )}

          {/* ── CONFIG TAB ── */}
          {activeTab === "config" && (
            <>
              <PhaseStatus checks={["test"]} checklist={CHECKLIST} />

              {/* Code config + lien */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Code configuration</div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[22px] font-black text-[--k-text] tracking-[0.15em]">{EVENT.configCode}</span>
                      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white transition"><Copy className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <a href={EVENT.configUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-4 py-2.5 text-[12px] font-semibold text-white hover:brightness-110 transition shadow-sm">
                    <ExternalLink className="h-3.5 w-3.5" /> Ouvrir l'app de config
                  </a>
                </div>
              </div>

              {/* Briefing & config details */}
              <Card title="Détails configuration" icon={Settings} accent="rose">
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
                        <span key={o} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{o}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>

              {/* Notes config */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="border-b border-[--k-border] px-5 py-3">
                  <h2 className="text-[15px] font-bold text-[--k-text]">Notes de configuration</h2>
                </div>
                <div className="p-5">
                  <textarea value={configNotes} onChange={e => setConfigNotes(e.target.value)} placeholder="Notes sur la configuration, points d'attention techniques..." rows={3} className="w-full rounded-lg border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-2.5 text-[13px] outline-none focus:border-slate-400 focus:bg-white transition" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <ActionPill icon={Send} label="Envoyer la config au technicien" />
              </div>
            </>
          )}

          {/* ── LOGISTIQUE TAB ── */}
          {activeTab === "logistique" && (
            <>
              <PhaseStatus checks={["bornes", "logistics", "shipping"]} checklist={CHECKLIST} />

              {/* Date reminder */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3 px-5 py-3">
                <CalendarDays className="h-4 w-4 text-slate-500 shrink-0" />
                <p className="text-[13px] font-semibold text-[--k-text]">
                  Événement : {new Date(EVENT.dateStart).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} — {EVENT.location}
                </p>
              </div>

              {/* Logistique aller / retour */}
              <div className="grid gap-5 lg:grid-cols-2">
                {/* Aller */}
                <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                  <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                    <h2 className="text-[15px] font-bold text-[--k-text]">Logistique aller</h2>
                    {editing !== "logistique" ? (
                      <button onClick={() => setEditing("logistique")} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-2.5 py-1 text-[11px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                        <Edit className="h-3 w-3 text-[--k-muted]" /> Modifier
                      </button>
                    ) : (
                      <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-2.5 py-1 text-[11px] font-medium text-white hover:brightness-110 transition shadow-sm">
                        <CheckCircle2 className="h-3 w-3" /> Valider
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    {editing === "logistique" ? (
                      <div className="space-y-4">
                        <Field label="Type d'installation / envoi" required>
                          <select value={typeInstallation} onChange={e => setTypeInstallation(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition">
                            <option value="">Séléctionner</option>
                            {TYPES_INSTALLATION.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                        {(typeInstallation === "Pick-up" || typeInstallation === "Livraison & installation" || typeInstallation === "Livraison seulement") && (
                          <>
                            <Field label="Jour de retrait / livraison">
                              <input type="date" value={jourAller} onChange={e => setJourAller(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" />
                            </Field>
                            <div className="flex items-center gap-3">
                              {[{ v: "aDefinir", l: "À définir" }, { v: "precise", l: "Heure précise" }, { v: "tranche", l: "Tranche horaire" }].map(o => (
                                <label key={o.v} className="flex items-center gap-1.5 text-[12px] text-[--k-text] cursor-pointer">
                                  <input type="radio" name="heureAllerMode" checked={heureAllerMode === o.v} onChange={() => setHeureAllerMode(o.v)} className="accent-[--k-primary]" />
                                  {o.l}
                                </label>
                              ))}
                            </div>
                            {heureAllerMode === "precise" && (
                              <Field label="Heure">
                                <input type="time" value={heureAller} onChange={e => setHeureAller(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" />
                              </Field>
                            )}
                            {heureAllerMode === "tranche" && (
                              <div className="grid gap-3 grid-cols-2">
                                <Field label="Début"><input type="time" value={heureAllerDebut} onChange={e => setHeureAllerDebut(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                                <Field label="Fin"><input type="time" value={heureAllerFin} onChange={e => setHeureAllerFin(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                              </div>
                            )}
                          </>
                        )}
                        <div>
                          <label className="block text-[12px] font-semibold text-[--k-muted] mb-1.5">Commentaire interne</label>
                          <textarea value={commentaireAllerInterne} onChange={e => setCommentaireAllerInterne(e.target.value)} placeholder="Commentaire interne..." rows={2} className="w-full rounded-lg border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-2 text-[13px] outline-none focus:border-slate-400 focus:bg-white transition" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        <InfoRow label="Type" value={typeInstallation || "—"} />
                        <InfoRow label="Jour" value={jourAller ? new Date(jourAller).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "—"} />
                        <InfoRow label="Heure" value={heureAllerMode === "precise" ? heureAller : heureAllerMode === "tranche" ? `${heureAllerDebut} – ${heureAllerFin}` : "À définir"} />
                        {commentaireAllerInterne && <InfoRow label="Note" value={commentaireAllerInterne} />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Retour */}
                <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                  <div className="border-b border-[--k-border] px-5 py-3 flex items-center justify-between">
                    <h2 className="text-[15px] font-bold text-[--k-text]">Logistique retour</h2>
                    {editing !== "logistique" ? (
                      <button onClick={() => setEditing("logistique")} className="flex items-center gap-1.5 rounded-lg border border-[--k-border] px-2.5 py-1 text-[11px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
                        <Edit className="h-3 w-3 text-[--k-muted]" /> Modifier
                      </button>
                    ) : (
                      <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-lg bg-[--k-primary] px-2.5 py-1 text-[11px] font-medium text-white hover:brightness-110 transition shadow-sm">
                        <CheckCircle2 className="h-3 w-3" /> Valider
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    {editing === "logistique" ? (
                      <div className="space-y-4">
                        <Field label="Type de désinstallation / retour" required>
                          <select value={typeRetour} onChange={e => setTypeRetour(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition">
                            <option value="">Séléctionner</option>
                            {TYPES_RETOUR.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                        {typeRetour && (
                          <>
                            <Field label="Jour retour">
                              <input type="date" value={jourRetour} onChange={e => setJourRetour(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" />
                            </Field>
                            <div className="flex items-center gap-3">
                              {[{ v: "aDefinir", l: "À définir" }, { v: "precise", l: "Heure précise" }, { v: "tranche", l: "Tranche horaire" }].map(o => (
                                <label key={o.v} className="flex items-center gap-1.5 text-[12px] text-[--k-text] cursor-pointer">
                                  <input type="radio" name="heureRetourMode" checked={heureRetourMode === o.v} onChange={() => setHeureRetourMode(o.v)} className="accent-[--k-primary]" />
                                  {o.l}
                                </label>
                              ))}
                            </div>
                            {heureRetourMode === "precise" && (
                              <Field label="Heure retour">
                                <input type="time" value={heureRetour} onChange={e => setHeureRetour(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" />
                              </Field>
                            )}
                            {heureRetourMode === "tranche" && (
                              <div className="grid gap-3 grid-cols-2">
                                <Field label="Début"><input type="time" value={heureRetourDebut} onChange={e => setHeureRetourDebut(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                                <Field label="Fin"><input type="time" value={heureRetourFin} onChange={e => setHeureRetourFin(e.target.value)} className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-2 text-[13px] outline-none focus:border-slate-400 transition" /></Field>
                              </div>
                            )}
                          </>
                        )}
                        <div>
                          <label className="block text-[12px] font-semibold text-[--k-muted] mb-1.5">Commentaire interne</label>
                          <textarea value={commentaireRetourInterne} onChange={e => setCommentaireRetourInterne(e.target.value)} placeholder="Commentaire interne..." rows={2} className="w-full rounded-lg border border-[--k-border] bg-[--k-surface-2]/30 px-4 py-2 text-[13px] outline-none focus:border-slate-400 focus:bg-white transition" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        <InfoRow label="Type" value={typeRetour || "—"} />
                        <InfoRow label="Jour" value={jourRetour ? new Date(jourRetour).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "—"} />
                        <InfoRow label="Heure" value={heureRetourMode === "precise" ? heureRetour : heureRetourMode === "tranche" ? `${heureRetourDebut} – ${heureRetourFin}` : "À définir"} />
                        {commentaireRetourInterne && <InfoRow label="Note" value={commentaireRetourInterne} />}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bornes assignées */}
              <Card title={`Bornes assignées (${BORNES_ASSIGNED.length})`} icon={Camera}>
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
                          <tr key={b.id} className="border-b border-[--k-border] last:border-0 hover:bg-slate-50/50 transition">
                            <td className="px-3 py-2.5"><a href={`/bornes/${b.id}`} className="font-mono font-semibold text-[--k-primary] hover:underline">{b.id}</a></td>
                            <td className="px-3 py-2.5 text-[--k-text]">{b.model}</td>
                            <td className="px-3 py-2.5 text-[--k-muted]">{b.location}</td>
                            <td className="px-3 py-2.5">
                              {b.shipping.startsWith("UPS") || b.shipping.startsWith("TNT") ? (
                                <span className="flex items-center gap-1 text-amber-600"><Truck className="h-3 w-3" /><span className="text-[11px] font-mono">{b.shipping}</span></span>
                              ) : (<span className="text-[--k-muted]">{b.shipping}</span>)}
                            </td>
                            <td className="px-3 py-2.5"><span className={cn("inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold", bs.color)}>{bs.label}</span></td>
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

        {/* ── Right sidebar — contextual (hidden on activity tab) ── */}
        {activeTab !== "activity" && <div className="space-y-5">

          {/* Checklist — visible on all tabs except client */}
          {activeTab !== "client" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[--k-text]">Avancement</span>
                <span className="text-[11px] font-bold text-slate-500 tabular-nums">{progress}%</span>
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
          )}

          {/* Contextual: Client stats — on client tab */}
          {activeTab === "client" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-[--k-text]">Statistiques client</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[--k-surface-2]/40 p-3 text-center">
                    <div className="text-[20px] font-bold text-[--k-text] tabular-nums">{CLIENT_STATS.nbEvents}</div>
                    <div className="text-[10px] text-[--k-muted] font-medium">événements</div>
                  </div>
                  <div className="rounded-xl bg-[--k-surface-2]/40 p-3 text-center">
                    <div className="text-[20px] font-bold text-[--k-text] tabular-nums">{CLIENT_STATS.nbEventsAnnee}</div>
                    <div className="text-[10px] text-[--k-muted] font-medium">cette année</div>
                  </div>
                </div>
                <div className="rounded-xl bg-[--k-surface-2]/40 p-3 text-center">
                  <div className="text-[20px] font-bold text-[--k-text] tabular-nums">{CLIENT_STATS.caTotalHT.toLocaleString("fr-FR")} €</div>
                  <div className="text-[10px] text-[--k-muted] font-medium">CA total HT</div>
                </div>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-muted]">Client depuis</span>
                    <span className="font-medium text-[--k-text]">{CLIENT_STATS.clientDepuis}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-muted]">Dernier event</span>
                    <span className="font-medium text-[--k-text]">{CLIENT_STATS.dernierEvent}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-muted]">Taux conversion devis</span>
                    <span className="font-semibold text-emerald-600">{CLIENT_STATS.tauxConversion}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-muted]">Récurrence</span>
                    <span className="font-semibold text-[--k-text]">{CLIENT_STATS.tauxRecurrence}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-muted]">Satisfaction</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="h-3 w-3 fill-amber-400" /> {CLIENT_STATS.satisfaction}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contextual: Derniers events — on client tab */}
          {activeTab === "client" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <span className="text-[13px] font-semibold text-[--k-text]">Derniers événements</span>
              </div>
              <div className="divide-y divide-[--k-border]">
                {CLIENT_EVENTS_HISTORY.map(evt => {
                  const evtSt = STATUS_MAP[evt.status];
                  return (
                    <a
                      key={evt.id}
                      href={evt.current ? "#" : `/events/${evt.id}`}
                      className={cn("block px-4 py-3 hover:bg-[--k-surface-2]/40 transition", evt.current && "bg-[--k-primary-2]/20")}
                    >
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[12px] font-semibold text-[--k-text] truncate">{evt.name}</span>
                        {evt.current && <span className="shrink-0 rounded bg-[--k-primary-2] px-1.5 py-0.5 text-[9px] font-bold text-[--k-primary]">En cours</span>}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[--k-muted]">{evt.date}</span>
                        <span className={cn("rounded-md px-1.5 py-0.5 text-[9px] font-bold", evtSt.color)}>{evtSt.label}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="px-4 py-2.5 border-t border-[--k-border]">
                <a href={`/clients/${CLIENT.id}`} className="text-[11px] font-semibold text-[--k-primary] hover:underline">
                  Voir tous les événements ({CLIENT_STATS.nbEvents})
                </a>
              </div>
            </div>
          )}

          {/* Contextual: Config shortcut — on updates, config, crea, evenement */}
          {(activeTab === "updates" || activeTab === "config" || activeTab === "crea") && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-slate-500" />
                <span className="text-[13px] font-semibold text-[--k-text]">Configuration</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[18px] font-black text-[--k-text] tracking-[0.15em]">{EVENT.configCode}</span>
              </div>
              <a
                href={EVENT.configUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[--k-primary] px-4 py-2 text-[12px] font-semibold text-white hover:brightness-110 transition shadow-sm"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Ouvrir l'app de config
              </a>
            </div>
          )}

          {/* Contextual: Dispositif récap — on logistique */}
          {activeTab === "logistique" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3">
                <span className="text-[13px] font-semibold text-[--k-text]">Dispositif</span>
              </div>
              <div className="p-4 space-y-2">
                {DISPOSITIFS.map((d, i) => (
                  <div key={i} className="flex items-center justify-between text-[12px]">
                    <span className="text-[--k-text] font-medium">{d.qty}x {d.borneType}</span>
                    {d.notes && <span className="text-[10px] text-[--k-muted]">{d.notes}</span>}
                  </div>
                ))}
                <div className="border-t border-[--k-border] pt-2 mt-2 text-[12px] font-semibold text-[--k-text]">
                  Total : {BORNES_ASSIGNED.length} bornes
                </div>
              </div>
            </div>
          )}

          {/* Contextual: Créa actions — on crea */}
          {activeTab === "crea" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3">
                <span className="text-[13px] font-semibold text-[--k-text]">Briefing</span>
              </div>
              <div className="p-4 space-y-1.5">
                <InfoRow label="Marque" value={BRIEFING.marque} />
                <InfoRow label="Template" value={BRIEFING.template} />
                <InfoRow label="Backdrop" value={BRIEFING.backdrop} />
                <InfoRow label="Props" value={BRIEFING.props} />
              </div>
            </div>
          )}

          {/* Quick actions — visible on all tabs except client */}
          {activeTab !== "client" && (
            <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm overflow-hidden">
              <div className="border-b border-[--k-border] px-4 py-3">
                <span className="text-[13px] font-semibold text-[--k-text]">Actions rapides</span>
              </div>
              <div className="p-2 space-y-0.5">
                {activeTab === "logistique" ? (
                  <>
                    <ActionBtn icon={FileText} label="Générer bon de livraison" />
                    <ActionBtn icon={Printer} label="Imprimer les étiquettes" />
                    <ActionBtn icon={Mail} label="Envoyer tracking au client" />
                  </>
                ) : activeTab === "crea" ? (
                  <>
                    <ActionBtn icon={Send} label="Envoyer maquettes au client" />
                    <ActionBtn icon={Eye} label="Voir le rendu" />
                    <ActionBtn icon={Download} label="Exporter fiche PDF" />
                  </>
                ) : (
                  <>
                    <ActionBtn icon={Mail} label="Envoyer recap au client" />
                    <ActionBtn icon={FileText} label="Générer bon de livraison" />
                    <ActionBtn icon={Download} label="Exporter fiche PDF" />
                    <ActionBtn icon={Copy} label="Dupliquer l'événement" />
                    <ActionBtn icon={Printer} label="Imprimer la fiche" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>}
      </div>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-3">
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
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

function Field({ label, children, required }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[--k-muted] mb-1.5">
        {label}{required && <span className="text-[--k-danger] ml-0.5">*</span>}
      </label>
      {children}
    </div>
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
