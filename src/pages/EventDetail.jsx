import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  CalendarDays, Camera, MapPin, User, Phone, Mail, Building2,
  Clock, CheckCircle2, Circle, AlertTriangle, Truck, Package,
  Edit, Copy, Download, Printer, ArrowLeft, ChevronRight,
  Palette, FileText, Send, MessageSquare
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const EVENT = {
  id: "EVT-2026-0287",
  name: "Salon du Mariage Paris",
  type: "Salon",
  status: "ready",
  dateStart: "2026-02-08",
  dateEnd: "2026-02-10",
  location: "Paris Expo — Porte de Versailles",
  address: "1 Place de la Porte de Versailles, 75015 Paris",
  antenne: "IDF Paris",
  createdAt: "2025-12-15",
  notes: "Stand B42 — Hall 3. Accès montage vendredi 7 fév à partir de 14h. Parking exposants badge n°1842.",
};

const CLIENT = {
  company: "Salon Expo SAS",
  contact: "Marie Laurent",
  role: "Directrice événementiel",
  email: "m.laurent@salonexpo.fr",
  phone: "+33 6 12 34 56 78",
  address: "45 rue de la Convention, 75015 Paris",
};

const BRIEFING = {
  marque: "Selfizee x Salon du Mariage",
  template: "Template Mariage Premium",
  logo: "logo_salon_mariage_2026.png",
  couleurs: ["#D4A574", "#FFFFFF", "#2D2D2D"],
  texteAccueil: "Bienvenue au Salon du Mariage 2026 ! Prenez la pose !",
  textePartage: "Retrouvez votre photo sur salon-mariage.selfizee.com",
  impressions: true,
  gif: true,
  video: false,
  galerieEnLigne: true,
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

const CONTACTS_ANTENNE = [
  { name: "Julien Moreau", role: "Responsable IDF", phone: "+33 6 98 76 54 32", antenne: "IDF Paris" },
  { name: "Lucas Faure", role: "Technicien terrain", phone: "+33 6 11 22 33 44", antenne: "IDF Paris" },
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

const TIMELINE = [
  { date: "15 déc 2025", action: "Événement créé", user: "Seb Martin", type: "create" },
  { date: "10 jan 2026", action: "Briefing client complété", user: "Thomas Duval", type: "briefing" },
  { date: "18 jan 2026", action: "Maquettes envoyées au client", user: "Léa Martin", type: "design" },
  { date: "22 jan 2026", action: "Création graphique validée ✓", user: "Marie Laurent", type: "design" },
  { date: "01 fév 2026", action: "12 bornes affectées", user: "Julien Moreau", type: "logistics" },
  { date: "05 fév 2026", action: "4 bornes expédiées (UPS + TNT)", user: "Système", type: "logistics" },
  { date: "07 fév 2026", action: "Test impression validé", user: "Lucas Faure", type: "tech" },
];

const STATUS_MAP = {
  confirmed: { label: "Confirmé", color: "bg-blue-50 text-blue-600" },
  design: { label: "Création graphique", color: "bg-violet-50 text-violet-600" },
  logistics: { label: "Logistique", color: "bg-amber-50 text-amber-600" },
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600" },
  live: { label: "En cours", color: "bg-rose-50 text-rose-500" },
  done: { label: "Terminé", color: "bg-slate-100 text-slate-500" },
};

const BORNE_STATUS = {
  ready: { label: "Prêt", color: "bg-emerald-50 text-emerald-600" },
  transit: { label: "En transit", color: "bg-amber-50 text-amber-600" },
  onsite: { label: "Sur site", color: "bg-blue-50 text-blue-600" },
};

/* ── Page ──────────────────────────────────────────── */

export default function EventDetail() {
  const st = STATUS_MAP[EVENT.status];
  const doneCount = CHECKLIST.filter(c => c.done).length;
  const progress = Math.round((doneCount / CHECKLIST.length) * 100);

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

      {/* Header card */}
      <div className="mb-5 rounded-2xl border border-[--k-border] bg-gradient-to-r from-rose-500 to-pink-500 p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.06]" />
        <div className="absolute right-16 -bottom-8 h-28 w-28 rounded-full bg-white/[0.04]" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-[12px] font-mono">{EVENT.id}</span>
                <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-white/20 text-white")}>{st.label}</span>
              </div>
              <h1 className="text-[22px] font-bold">{EVENT.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-white/80">
                <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(EVENT.dateStart).toLocaleDateString("fr-FR", { day:"numeric", month:"long" })} → {new Date(EVENT.dateEnd).toLocaleDateString("fr-FR", { day:"numeric", month:"long", year:"numeric" })}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{EVENT.location}</span>
                <span className="flex items-center gap-1"><Camera className="h-3.5 w-3.5" />{BORNES_ASSIGNED.length} bornes</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`/events/${EVENT.id}/edit`} className="flex h-8 items-center gap-1.5 rounded-lg bg-white/20 px-3 text-[12px] font-medium hover:bg-white/30 transition backdrop-blur-sm">
                <Edit className="h-3.5 w-3.5" /> Modifier
              </a>
              <button className="flex h-8 items-center gap-1.5 rounded-lg bg-white/20 px-3 text-[12px] font-medium hover:bg-white/30 transition backdrop-blur-sm">
                <Printer className="h-3.5 w-3.5" /> Imprimer
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-white/70 mb-1">
              <span>Avancement</span>
              <span>{doneCount}/{CHECKLIST.length} étapes — {progress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client & Briefing */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Client */}
            <Card title="Client" icon={Building2}>
              <InfoRow label="Société" value={CLIENT.company} />
              <InfoRow label="Contact" value={CLIENT.contact} />
              <InfoRow label="Rôle" value={CLIENT.role} />
              <InfoRow label="Email" value={<a href={`mailto:${CLIENT.email}`} className="text-[--k-primary] hover:underline">{CLIENT.email}</a>} />
              <InfoRow label="Téléphone" value={CLIENT.phone} />
              <InfoRow label="Adresse" value={CLIENT.address} />
            </Card>

            {/* Briefing */}
            <Card title="Briefing créatif" icon={Palette}>
              <InfoRow label="Marque" value={BRIEFING.marque} />
              <InfoRow label="Template" value={BRIEFING.template} />
              <InfoRow label="Fichier logo" value={BRIEFING.logo} />
              <div className="flex items-center gap-1.5 py-1.5 border-b border-[--k-border] last:border-0">
                <span className="w-24 shrink-0 text-[11px] text-[--k-muted]">Couleurs</span>
                <div className="flex gap-1.5">
                  {BRIEFING.couleurs.map(c => (
                    <span key={c} className="h-5 w-5 rounded-md border border-[--k-border] shadow-sm" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
              </div>
              <InfoRow label="Accueil" value={BRIEFING.texteAccueil} />
            </Card>
          </div>

          {/* Bornes assignées */}
          <Card title={`Bornes assignées (${BORNES_ASSIGNED.length})`} icon={Camera}>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[--k-border] bg-rose-50/20">
                    <th className="px-3 py-2 text-left font-semibold text-[--k-muted]">ID</th>
                    <th className="px-3 py-2 text-left font-semibold text-[--k-muted]">Modèle</th>
                    <th className="px-3 py-2 text-left font-semibold text-[--k-muted]">Provenance</th>
                    <th className="px-3 py-2 text-left font-semibold text-[--k-muted]">Expédition</th>
                    <th className="px-3 py-2 text-left font-semibold text-[--k-muted]">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {BORNES_ASSIGNED.map(b => {
                    const bs = BORNE_STATUS[b.status];
                    return (
                      <tr key={b.id} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2]/30">
                        <td className="px-3 py-2 font-mono font-semibold text-[--k-text]">{b.id}</td>
                        <td className="px-3 py-2 text-[--k-muted]">{b.model}</td>
                        <td className="px-3 py-2 text-[--k-muted]">{b.location}</td>
                        <td className="px-3 py-2">
                          {b.shipping.startsWith("UPS") || b.shipping.startsWith("TNT") ? (
                            <span className="flex items-center gap-1 text-amber-600">
                              <Truck className="h-3 w-3" />
                              <span className="text-[11px] font-mono">{b.shipping}</span>
                            </span>
                          ) : (
                            <span className="text-[--k-muted]">{b.shipping}</span>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold", bs.color)}>{bs.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-2 flex gap-4 text-[11px] text-[--k-muted]">
              <span>{BORNES_ASSIGNED.filter(b=>b.status==="ready").length} prêtes</span>
              <span>{BORNES_ASSIGNED.filter(b=>b.status==="transit").length} en transit</span>
            </div>
          </Card>

          {/* Timeline */}
          <Card title="Historique" icon={Clock}>
            <div className="relative pl-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[--k-border]" />
              {TIMELINE.map((t, i) => (
                <div key={i} className="relative flex gap-3 pb-4 last:pb-0">
                  <span className={cn(
                    "relative z-10 mt-0.5 h-3.5 w-3.5 rounded-full border-2 border-white shrink-0",
                    t.type === "create" ? "bg-slate-400" :
                    t.type === "commercial" ? "bg-emerald-500" :
                    t.type === "briefing" ? "bg-blue-500" :
                    t.type === "design" ? "bg-violet-500" :
                    t.type === "logistics" ? "bg-amber-500" :
                    "bg-sky-500"
                  )} />
                  <div>
                    <div className="text-[12px] font-medium text-[--k-text]">{t.action}</div>
                    <div className="text-[11px] text-[--k-muted]">{t.user} — {t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Checklist */}
          <Card title="Checklist avancement" icon={CheckCircle2}>
            <div className="space-y-1">
              {CHECKLIST.map(c => (
                <div key={c.key} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] transition", c.done ? "text-[--k-muted]" : "text-[--k-text]")}>
                  {c.done
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    : <Circle className="h-4 w-4 text-[--k-border] shrink-0" />
                  }
                  <span className={cn(c.done && "line-through")}>{c.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-center text-[12px] font-semibold text-emerald-700">
              {progress}% complété
            </div>
          </Card>

          {/* Contacts antenne */}
          <Card title="Contacts antenne" icon={User}>
            {CONTACTS_ANTENNE.map(c => (
              <div key={c.name} className="flex items-center gap-3 py-2 border-b border-[--k-border] last:border-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 text-[11px] font-bold text-white">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium text-[--k-text]">{c.name}</div>
                  <div className="text-[11px] text-[--k-muted]">{c.role} — {c.antenne}</div>
                </div>
                <a href={`tel:${c.phone}`} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[--k-surface-2] text-[--k-muted] hover:text-[--k-primary] transition">
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </Card>

          {/* Infos événement */}
          <Card title="Informations" icon={CalendarDays}>
            <InfoRow label="Type" value={<span className="rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-semibold text-pink-500">{EVENT.type}</span>} />
            <InfoRow label="Antenne" value={EVENT.antenne} />
            <InfoRow label="Adresse" value={EVENT.address} />
            <InfoRow label="Créé le" value={new Date(EVENT.createdAt).toLocaleDateString("fr-FR")} />
            <div className="mt-2 rounded-lg bg-blue-50/50 p-2.5">
              <div className="text-[11px] font-semibold text-blue-600 mb-1">Notes internes</div>
              <div className="text-[11px] text-[--k-text] leading-relaxed">{EVENT.notes}</div>
            </div>
          </Card>

          {/* Quick actions */}
          <Card title="Actions rapides" icon={Send}>
            <div className="space-y-1.5">
              <ActionBtn icon={Mail} label="Envoyer recap au client" />
              <ActionBtn icon={FileText} label="Générer bon de livraison" />
              <ActionBtn icon={Download} label="Exporter fiche PDF" />
              <ActionBtn icon={Copy} label="Dupliquer l'événement" />
              <ActionBtn icon={MessageSquare} label="Ajouter une note" />
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Components ──────────────────────────────────── */

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
        {Icon && <Icon className="h-4 w-4 text-rose-400" />}
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
      <Icon className="h-4 w-4 text-[--k-muted]" />
      {label}
    </button>
  );
}
