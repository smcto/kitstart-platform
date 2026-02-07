import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  ArrowLeft, CalendarDays, Building2, Palette, Camera, Truck,
  FileText, Plus, X, Search, Check, ChevronDown, MapPin,
  Image, Printer, Wifi, Box, Star, Upload
} from "lucide-react";

/* ── Data ────────────────────────────────────── */

const EVENT_TYPES = ["Corporate", "Mariage", "Salon", "Festival", "Anniversaire", "Team Building", "Lancement produit", "Gala", "Autre"];

const BORNE_MODELS = [
  { id: "pro360", name: "Selfizee Pro 360", available: 312 },
  { id: "mirror", name: "Selfizee Mirror XL", available: 124 },
  { id: "ring", name: "Selfizee Ring Light", available: 89 },
  { id: "mini", name: "Selfizee Mini", available: 156 },
  { id: "360spin", name: "Selfizee 360 Spin", available: 42 },
];

const ANTENNES = [
  { id: "idf", name: "IDF Paris", bornes: 186, responsable: "Julien Moreau" },
  { id: "bretagne", name: "Bretagne", bornes: 142, responsable: "Yann Le Bras" },
  { id: "rhone", name: "Rhône-Alpes", bornes: 128, responsable: "Camille Roux" },
  { id: "paca", name: "PACA", bornes: 104, responsable: "Antoine Rossi" },
  { id: "ouest", name: "Grand Ouest", bornes: 98, responsable: "Pierre Morin" },
  { id: "est", name: "Grand Est", bornes: 112, responsable: "Lucie Muller" },
  { id: "occitanie", name: "Occitanie", bornes: 75, responsable: "Sophie Bernard" },
  { id: "international", name: "International", bornes: 0, responsable: "Seb Martin" },
];

const TRANSPORTEURS = ["Antenne locale (pas d'expédition)", "UPS Express", "UPS Standard", "TNT Express", "TNT Economy", "DHL Express", "Chronopost", "Transporteur dédié"];

const TEMPLATES = ["Template Corporate Premium", "Template Mariage Premium", "Template Festival Fun", "Template Élégant Noir", "Template Coloré Pop", "Template Minimaliste", "Sur mesure (à briefer)"];

/* ── Sections nav ────────────────────────────── */

const SECTIONS = [
  { key: "general", label: "Informations générales", icon: CalendarDays },
  { key: "client", label: "Client & Briefing", icon: Building2 },
  { key: "design", label: "Personnalisation", icon: Palette },
  { key: "bornes", label: "Affectation bornes", icon: Camera },
  { key: "logistics", label: "Logistique", icon: Truck },
  { key: "notes", label: "Notes internes", icon: FileText },
];

/* ── Page ──────────────────────────────────────────── */

export default function EventCreate() {
  const [activeSection, setActiveSection] = useState("general");
  const [form, setForm] = useState({
    name: "", type: "Corporate", dateStart: "", dateEnd: "", location: "", address: "", city: "", country: "France",
    clientCompany: "", clientContact: "", clientEmail: "", clientPhone: "", clientRole: "",
    template: "", logo: null, couleur1: "#4F46E5", couleur2: "#FFFFFF", texteAccueil: "", textePartage: "",
    impressions: true, gif: false, video: false, galerieEnLigne: true, backdrop: "", props: "",
    bornesSelection: [],
    antenneId: "", transporteur: TRANSPORTEURS[0], adresseLivraison: "", dateLivraison: "",
    notes: "",
  });
  const [borneRows, setBorneRows] = useState([{ model: "pro360", qty: 1 }]);
  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

  return (
    <AppShell currentApp="Events Manager" activeKey="create">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
        <a href="/events/list" className="hover:text-[--k-primary] transition flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Événements
        </a>
        <span className="text-[--k-muted]/40">/</span>
        <span className="text-[--k-text] font-medium">Nouvel événement</span>
      </div>

      <h1 className="text-[20px] font-bold text-[--k-text] mb-4">Créer un événement</h1>

      <div className="flex gap-5">
        {/* Sections nav (sticky) */}
        <div className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-16 space-y-0.5">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => { setActiveSection(s.key); document.getElementById(`section-${s.key}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium transition",
                    activeSection === s.key
                      ? "bg-rose-50 text-rose-600"
                      : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" /> {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 min-w-0 space-y-5 pb-20">
          {/* Informations générales */}
          <FormSection id="general" title="Informations générales" icon={CalendarDays}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nom de l'événement" span={2}>
                <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Ex: Salon du Mariage Paris 2026" className="input-field" />
              </Field>
              <Field label="Type d'événement">
                <select value={form.type} onChange={e => update("type", e.target.value)} className="input-field">
                  {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Pays">
                <input value={form.country} onChange={e => update("country", e.target.value)} className="input-field" />
              </Field>
              <Field label="Date de début">
                <input type="date" value={form.dateStart} onChange={e => update("dateStart", e.target.value)} className="input-field" />
              </Field>
              <Field label="Date de fin">
                <input type="date" value={form.dateEnd} onChange={e => update("dateEnd", e.target.value)} className="input-field" />
              </Field>
              <Field label="Lieu" span={2}>
                <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="Ex: Paris Expo — Porte de Versailles" className="input-field" />
              </Field>
              <Field label="Adresse complète" span={2}>
                <input value={form.address} onChange={e => update("address", e.target.value)} placeholder="1 Place de la Porte de Versailles, 75015 Paris" className="input-field" />
              </Field>
            </div>
          </FormSection>

          {/* Client */}
          <FormSection id="client" title="Client & Briefing" icon={Building2}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Société">
                <input value={form.clientCompany} onChange={e => update("clientCompany", e.target.value)} placeholder="Ex: Salon Expo SAS" className="input-field" />
              </Field>
              <Field label="Contact principal">
                <input value={form.clientContact} onChange={e => update("clientContact", e.target.value)} placeholder="Prénom Nom" className="input-field" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.clientEmail} onChange={e => update("clientEmail", e.target.value)} placeholder="contact@client.com" className="input-field" />
              </Field>
              <Field label="Téléphone">
                <input value={form.clientPhone} onChange={e => update("clientPhone", e.target.value)} placeholder="+33 6 00 00 00 00" className="input-field" />
              </Field>
              <Field label="Rôle / Fonction">
                <input value={form.clientRole} onChange={e => update("clientRole", e.target.value)} placeholder="Directeur événementiel" className="input-field" />
              </Field>
            </div>
          </FormSection>

          {/* Design / Personnalisation */}
          <FormSection id="design" title="Personnalisation & Options" icon={Palette}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Template">
                <select value={form.template} onChange={e => update("template", e.target.value)} className="input-field">
                  <option value="">Choisir un template...</option>
                  {TEMPLATES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Logo client">
                <div className="flex items-center gap-2">
                  <label className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-[--k-border] px-3 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition">
                    <Upload className="h-3.5 w-3.5" /> Uploader un logo
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </Field>
              <Field label="Couleur primaire">
                <div className="flex items-center gap-2">
                  <input type="color" value={form.couleur1} onChange={e => update("couleur1", e.target.value)} className="h-9 w-9 rounded-lg border border-[--k-border] p-0.5 cursor-pointer" />
                  <input value={form.couleur1} onChange={e => update("couleur1", e.target.value)} className="input-field flex-1" />
                </div>
              </Field>
              <Field label="Couleur secondaire">
                <div className="flex items-center gap-2">
                  <input type="color" value={form.couleur2} onChange={e => update("couleur2", e.target.value)} className="h-9 w-9 rounded-lg border border-[--k-border] p-0.5 cursor-pointer" />
                  <input value={form.couleur2} onChange={e => update("couleur2", e.target.value)} className="input-field flex-1" />
                </div>
              </Field>
              <Field label="Texte d'accueil" span={2}>
                <input value={form.texteAccueil} onChange={e => update("texteAccueil", e.target.value)} placeholder="Bienvenue ! Prenez la pose !" className="input-field" />
              </Field>
              <Field label="Texte de partage" span={2}>
                <input value={form.textePartage} onChange={e => update("textePartage", e.target.value)} placeholder="Retrouvez votre photo sur..." className="input-field" />
              </Field>
            </div>

            {/* Options toggles */}
            <div className="mt-4 border-t border-[--k-border] pt-3">
              <div className="text-[12px] font-semibold text-[--k-text] mb-2">Options & Prestations</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <ToggleOption label="Impressions" icon={Printer} active={form.impressions} onToggle={() => toggle("impressions")} />
                <ToggleOption label="GIF animé" icon={Image} active={form.gif} onToggle={() => toggle("gif")} />
                <ToggleOption label="Vidéo" icon={Camera} active={form.video} onToggle={() => toggle("video")} />
                <ToggleOption label="Galerie en ligne" icon={Wifi} active={form.galerieEnLigne} onToggle={() => toggle("galerieEnLigne")} />
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Backdrop / Décor">
                <input value={form.backdrop} onChange={e => update("backdrop", e.target.value)} placeholder="Description du backdrop..." className="input-field" />
              </Field>
              <Field label="Props / Accessoires">
                <input value={form.props} onChange={e => update("props", e.target.value)} placeholder="Kit props, accessoires..." className="input-field" />
              </Field>
            </div>
          </FormSection>

          {/* Bornes */}
          <FormSection id="bornes" title="Affectation des bornes" icon={Camera}>
            <div className="space-y-2">
              {borneRows.map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={row.model}
                    onChange={e => setBorneRows(rows => rows.map((r, j) => j === i ? { ...r, model: e.target.value } : r))}
                    className="input-field flex-1"
                  >
                    {BORNE_MODELS.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.available} dispo)</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={row.qty}
                    onChange={e => setBorneRows(rows => rows.map((r, j) => j === i ? { ...r, qty: parseInt(e.target.value) || 1 } : r))}
                    className="input-field w-20 text-center"
                  />
                  <span className="text-[11px] text-[--k-muted] w-10">unité{row.qty > 1 ? "s" : ""}</span>
                  {borneRows.length > 1 && (
                    <button onClick={() => setBorneRows(rows => rows.filter((_, j) => j !== i))} className="text-[--k-muted] hover:text-[--k-danger]">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setBorneRows(rows => [...rows, { model: "pro360", qty: 1 }])}
                className="flex items-center gap-1 text-[12px] font-medium text-[--k-primary] hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Ajouter un modèle
              </button>
            </div>
            <div className="mt-3 rounded-lg bg-blue-50/50 p-3 text-[12px]">
              <div className="font-semibold text-blue-700 mb-1">Récapitulatif</div>
              <div className="text-blue-600">
                {borneRows.reduce((s, r) => s + r.qty, 0)} borne(s) demandée(s) — {borneRows.map(r => {
                  const m = BORNE_MODELS.find(b => b.id === r.model);
                  return `${r.qty}× ${m?.name}`;
                }).join(", ")}
              </div>
            </div>
          </FormSection>

          {/* Logistics */}
          <FormSection id="logistics" title="Logistique & Expédition" icon={Truck}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Antenne de rattachement">
                <select value={form.antenneId} onChange={e => update("antenneId", e.target.value)} className="input-field">
                  <option value="">Choisir une antenne...</option>
                  {ANTENNES.map(a => (
                    <option key={a.id} value={a.id}>{a.name} — {a.bornes} bornes ({a.responsable})</option>
                  ))}
                </select>
              </Field>
              <Field label="Mode d'expédition">
                <select value={form.transporteur} onChange={e => update("transporteur", e.target.value)} className="input-field">
                  {TRANSPORTEURS.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              {form.transporteur !== TRANSPORTEURS[0] && (
                <>
                  <Field label="Adresse de livraison" span={2}>
                    <input value={form.adresseLivraison} onChange={e => update("adresseLivraison", e.target.value)} placeholder="Adresse complète de livraison" className="input-field" />
                  </Field>
                  <Field label="Date de livraison souhaitée">
                    <input type="date" value={form.dateLivraison} onChange={e => update("dateLivraison", e.target.value)} className="input-field" />
                  </Field>
                </>
              )}
            </div>
            {form.antenneId && (
              <div className="mt-3 rounded-lg bg-amber-50/50 p-3 text-[12px]">
                <div className="font-semibold text-amber-700 mb-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Antenne sélectionnée</div>
                <div className="text-amber-600">
                  {(() => {
                    const a = ANTENNES.find(x => x.id === form.antenneId);
                    return a ? `${a.name} — ${a.bornes} bornes disponibles — Responsable: ${a.responsable}` : "";
                  })()}
                </div>
              </div>
            )}
          </FormSection>

          {/* Notes */}
          <FormSection id="notes" title="Notes internes" icon={FileText}>
            <textarea
              value={form.notes}
              onChange={e => update("notes", e.target.value)}
              rows={4}
              placeholder="Notes internes, instructions particulières, accès, horaires montage..."
              className="input-field w-full resize-none"
            />
          </FormSection>
        </div>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[--k-border] bg-white/95 backdrop-blur-sm shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2.5">
          <a href="/events/list" className="text-[13px] text-[--k-muted] hover:text-[--k-text] transition">Annuler</a>
          <div className="flex gap-2">
            <button className="h-9 rounded-lg border border-[--k-border] px-4 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition">
              Enregistrer brouillon
            </button>
            <button className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm shadow-[--k-primary]/20">
              Créer l'événement
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Components ──────────────────────────────────── */

function FormSection({ id, title, icon: Icon, children }) {
  return (
    <div id={`section-${id}`} className="scroll-mt-16 rounded-2xl border border-[--k-border] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-4 py-3 rounded-t-2xl">
        <Icon className="h-4 w-4 text-rose-400" />
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, children, span = 1 }) {
  return (
    <div className={cn(span === 2 && "sm:col-span-2")}>
      <label className="block text-[11px] font-semibold text-[--k-muted] mb-1">{label}</label>
      {children}
    </div>
  );
}

function ToggleOption({ label, icon: Icon, active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition",
        active
          ? "border-rose-200 bg-rose-50 text-rose-600"
          : "border-[--k-border] bg-white text-[--k-muted] hover:border-[--k-primary]/30"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
      {active && <Check className="h-3.5 w-3.5 ml-auto" />}
    </button>
  );
}
