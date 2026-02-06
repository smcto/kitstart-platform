import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import {
  Monitor, ArrowLeft, Edit3, MapPin, Send,
  Calendar, Package, Wrench, AlertTriangle, Clock,
  ChevronRight, ArrowRightLeft, Wifi, WifiOff,
  Thermometer, Battery, HardDrive, Activity
} from "lucide-react";

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
  client: "Mairie de Rennes",
  antenne: "Antenne #116",
  adresse: "12 rue de la Liberté, 35000 Rennes",
  coutFabrication: 745,
  uptime: "99.2%",
  temperature: "42°C",
  batterie: "87%",
  stockage: "24.1 / 64 Go",
  derniereSync: "il y a 3 min",
};

const EQUIPEMENTS = [
  { nom: "Écran tactile 10\"", serial: "SCR-88421", etat: "OK" },
  { nom: "Module WiFi 6E", serial: "WF6-11203", etat: "OK" },
  { nom: "Batterie Li-ion 5000mAh", serial: "BAT-44520", etat: "Usure 13%" },
  { nom: "Imprimante thermique", serial: "PRT-92103", etat: "OK" },
];

const HISTORIQUE = [
  { date: "06/02/2026", type: "sync",         label: "Synchronisation firmware v3.2.1" },
  { date: "04/02/2026", type: "event",        label: "Redémarrage automatique (mise à jour)" },
  { date: "28/01/2026", type: "mouvement",    label: "Transfert : Entrepôt Rennes → Mairie de Rennes" },
  { date: "15/01/2026", type: "maintenance",  label: "Remplacement batterie (BAT-44520)" },
  { date: "20/12/2025", type: "mouvement",    label: "Transfert : Atelier → Entrepôt Rennes" },
  { date: "25/11/2025", type: "creation",     label: "Création de la borne — Sortie atelier" },
  { date: "10/11/2025", type: "maintenance",  label: "Assemblage et tests qualité" },
];

const MOUVEMENTS = [
  { periode: "25/11/2025 → 20/12/2025", lieu: "Atelier Selfizee",      duree: "25 jours", type: "Fabrication" },
  { periode: "20/12/2025 → 28/01/2026", lieu: "Entrepôt Rennes",       duree: "39 jours", type: "Stockage" },
  { periode: "28/01/2026 → Aujourd'hui", lieu: "Mairie de Rennes",     duree: "9 jours",  type: "Location" },
];

const DERNIERS_EVENTS = [
  { date: "06/02 14:23", type: "info",    label: "Photo prise (selfie #12,841)" },
  { date: "06/02 14:18", type: "info",    label: "Impression ticket réussie" },
  { date: "06/02 13:02", type: "info",    label: "Sync données → cloud OK" },
  { date: "06/02 09:15", type: "warning", label: "Température élevée (48°C) — retour à la normale" },
  { date: "05/02 22:00", type: "info",    label: "Mise en veille automatique" },
  { date: "05/02 18:45", type: "info",    label: "Photo prise (selfie #12,840)" },
  { date: "05/02 17:30", type: "info",    label: "Impression ticket réussie" },
  { date: "04/02 23:10", type: "success", label: "Firmware v3.2.1 installé avec succès" },
];

const ACTIVITES = [
  { author: "Seb M.", date: "05/02/2026", text: "RAS, borne fonctionnelle après remplacement batterie." },
  { author: "Lucas D.", date: "15/01/2026", text: "Batterie remplacée suite alerte usure >80%. Ancien modèle BAT-33012 retourné en recyclage." },
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
  const [comment, setComment] = useState("");

  return (
    <AppShell currentApp="Bornes Manager" activeKey="devices">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
        <a href="/bornes" className="hover:text-[--k-text] transition">Dashboard</a>
        <ChevronRight className="h-3 w-3" />
        <a href="/bornes/list" className="hover:text-[--k-text] transition">Bornes</a>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-[--k-text]">Détails</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        <a href="/bornes/list" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] hover:bg-[--k-surface-2] transition">
          <ArrowLeft className="h-4 w-4 text-[--k-muted]" />
        </a>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
          <Monitor className="h-5 w-5 text-indigo-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-[--k-text]">BORNE {BORNE.id}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-600">{BORNE.parc}</span>
            <span className="text-[12px] text-[--k-muted]">•</span>
            <span className="text-[12px] text-[--k-muted]">{BORNE.gamme}</span>
            <span className="text-[12px] text-[--k-muted]">•</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              BORNE.statut === "ONLINE" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}>
              {BORNE.statut}
            </span>
          </div>
        </div>
        <Button variant="primary">
          <Edit3 className="h-4 w-4 mr-1.5" />
          Modifier
        </Button>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Left column: 2/3 */}
        <div className="lg:col-span-2 space-y-4">

          {/* Informations générales */}
          <Section title="Informations générales" icon={Monitor}>
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
          <Section title="Équipements" icon={Package}>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[--k-border] text-[--k-muted]">
                  <th className="pb-2 text-left text-xs font-medium">Composant</th>
                  <th className="pb-2 text-left text-xs font-medium">N° série</th>
                  <th className="pb-2 text-left text-xs font-medium">État</th>
                </tr>
              </thead>
              <tbody>
                {EQUIPEMENTS.map(eq => (
                  <tr key={eq.serial} className="border-b border-[--k-border]/50">
                    <td className="py-2 font-medium text-[--k-text]">{eq.nom}</td>
                    <td className="py-2 font-mono text-[12px] text-[--k-muted]">{eq.serial}</td>
                    <td className="py-2">
                      <span className={cn(
                        "text-[12px] font-medium",
                        eq.etat === "OK" ? "text-emerald-600" : "text-amber-600"
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
          <Section title="Historique des mouvements" icon={ArrowRightLeft}>
            <div className="space-y-0">
              {MOUVEMENTS.map((m, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[--k-border]/50 last:border-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[--k-surface-2]">
                    <MapPin className="h-4 w-4 text-[--k-muted]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-[--k-text]">{m.lieu}</div>
                    <div className="text-[11px] text-[--k-muted]">{m.periode}</div>
                  </div>
                  <span className="rounded bg-[--k-surface-2] px-2 py-0.5 text-[11px] font-medium text-[--k-muted]">{m.type}</span>
                  <span className="text-[12px] tabular-nums text-[--k-muted]">{m.duree}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Timeline historique */}
          <Section title="Historique complet" icon={Clock}>
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

          {/* Activité / commentaires */}
          <Section title="Activité" icon={Monitor}>
            <div className="flex items-center gap-2 mb-4">
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="flex-1 rounded-lg border border-[--k-border] bg-[--k-surface-2]/50 px-3 py-2 text-[13px] outline-none focus:border-[--k-primary]/40"
              />
              <Button variant="primary" size="sm">
                <Send className="h-3.5 w-3.5 mr-1" />
                Envoyer
              </Button>
            </div>
            <div className="space-y-3">
              {ACTIVITES.map((a, i) => (
                <div key={i} className="rounded-lg bg-[--k-surface-2]/50 px-3 py-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-semibold text-[--k-text]">{a.author}</span>
                    <span className="text-[11px] text-[--k-muted]">{a.date}</span>
                  </div>
                  <div className="text-[12px] text-[--k-text]/80">{a.text}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Right column: 1/3 */}
        <div className="space-y-4">

          {/* Parc */}
          <Section title="Parc" compact>
            <InfoRow label="Parc actuel" value={BORNE.parc} highlight />
            <InfoRow label="Client" value={BORNE.client} />
            <InfoRow label="Antenne" value={BORNE.antenne} highlight />
          </Section>

          {/* Localisation */}
          <Section title="Localisation" icon={MapPin} compact>
            <div className="text-[12px] text-[--k-text]">{BORNE.adresse}</div>
            <div className="mt-2 h-[120px] rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-[--k-primary]/30" />
            </div>
          </Section>

          {/* Santé technique */}
          <Section title="Santé technique" icon={Activity} compact>
            <div className="space-y-2.5">
              <HealthRow icon={Wifi} label="Uptime" value={BORNE.uptime} good />
              <HealthRow icon={Thermometer} label="Température" value={BORNE.temperature} />
              <HealthRow icon={Battery} label="Batterie" value={BORNE.batterie} good />
              <HealthRow icon={HardDrive} label="Stockage" value={BORNE.stockage} />
              <HealthRow icon={Clock} label="Dernière sync" value={BORNE.derniereSync} good />
            </div>
          </Section>

          {/* Derniers événements */}
          <Section title="Derniers événements" icon={Activity} compact>
            <div className="space-y-0">
              {DERNIERS_EVENTS.map((e, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-[--k-border]/30 last:border-0">
                  <span className={cn("mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full", EVENT_COLORS[e.type]?.replace("text-", "bg-") || "bg-blue-500")} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-[--k-text] leading-snug">{e.label}</div>
                    <div className="text-[10px] text-[--k-muted]">{e.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function Section({ title, icon: Icon, children, compact }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
      <div className="flex items-center gap-2 border-b border-[--k-border] px-4 py-2.5">
        {Icon && (
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[--k-surface-2]">
            <Icon className="h-3.5 w-3.5 text-[--k-muted]" />
          </div>
        )}
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className={compact ? "px-4 py-3 space-y-2" : "px-4 py-4"}>
        {children}
      </div>
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
