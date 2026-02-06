import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import {
  Monitor, ArrowLeft, Save, X, ChevronRight, MapPin,
  Package, Settings, Wrench, Plus, Trash2, Upload, Info
} from "lucide-react";

/* ── Initial data (simulating API fetch) ─────────── */

const INITIAL = {
  id: "S381",
  serial: "D254801",
  gamme: "Spherik",
  modele: "Modele 26",
  sortieAtelier: "2025-11-25",
  etat: "En service",
  statut: "ONLINE",
  firmware: "v3.2.1",
  parc: "Location",
  client: "Mairie de Rennes",
  antenneId: "ANT-116",
  antenne: "Antenne #116",
  adresse: "12 rue de la Liberté",
  codePostal: "35000",
  ville: "Rennes",
  notes: "RAS, borne fonctionnelle après remplacement batterie.",
  coutFabrication: 745,
  photo: null,
};

const INITIAL_EQUIPEMENTS = [
  { id: 1, nom: "Écran tactile 10\"", serial: "SCR-88421", etat: "OK" },
  { id: 2, nom: "Module WiFi 6E", serial: "WF6-11203", etat: "OK" },
  { id: 3, nom: "Batterie Li-ion 5000mAh", serial: "BAT-44520", etat: "Usure 13%" },
  { id: 4, nom: "Imprimante thermique", serial: "PRT-92103", etat: "OK" },
];

const GAMMES = ["Classik", "Spherik", "Prestige"];
const ETATS = ["En service", "En SAV", "Hors service", "En stock", "En transit"];
const STATUTS = ["ONLINE", "OFFLINE", "WARNING"];
const PARCS = ["Location", "Vente", "Interne", "SAV", "Stock"];
const ETAT_EQUIPEMENT = ["OK", "Usure légère", "Usure 13%", "Usure 25%", "À remplacer", "HS"];

/* ── Page ──────────────────────────────────────────── */

export default function BorneEdit() {
  const [form, setForm] = useState(INITIAL);
  const [equipements, setEquipements] = useState(INITIAL_EQUIPEMENTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setDirty(true);
    setSaved(false);
  }

  function updateEquip(id, field, value) {
    setEquipements(eq => eq.map(e => e.id === id ? { ...e, [field]: value } : e));
    setDirty(true);
    setSaved(false);
  }

  function addEquip() {
    setEquipements(eq => [...eq, { id: Date.now(), nom: "", serial: "", etat: "OK" }]);
    setDirty(true);
  }

  function removeEquip(id) {
    setEquipements(eq => eq.filter(e => e.id !== id));
    setDirty(true);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setDirty(false);
    }, 800);
  }

  return (
    <AppShell currentApp="Bornes Manager" activeKey="devices">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
        <a href="/bornes" className="hover:text-[--k-text] transition">Dashboard</a>
        <ChevronRight className="h-3 w-3" />
        <a href="/bornes/list" className="hover:text-[--k-text] transition">Bornes</a>
        <ChevronRight className="h-3 w-3" />
        <a href={`/bornes/${form.id}`} className="hover:text-[--k-text] transition">{form.id}</a>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-[--k-text]">Modifier</span>
      </div>

      <form onSubmit={handleSave}>
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <a href={`/bornes/${form.id}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] hover:bg-[--k-surface-2] transition">
            <ArrowLeft className="h-4 w-4 text-[--k-muted]" />
          </a>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <Monitor className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-[--k-text]">Modifier BORNE {form.id}</h1>
            <p className="text-[12px] text-[--k-muted] mt-0.5">Modifiez les informations ci-dessous puis enregistrez.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={`/bornes/${form.id}`}>
              <Button type="button" variant="secondary">
                <X className="h-4 w-4 mr-1" />
                Annuler
              </Button>
            </a>
            <Button type="submit" variant="primary" disabled={saving}>
              <Save className="h-4 w-4 mr-1" />
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>

        {/* Success message */}
        {saved && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] font-medium text-emerald-700 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
              <Save className="h-3 w-3" />
            </span>
            Modifications enregistrées avec succès.
          </div>
        )}

        {/* Dirty indicator */}
        {dirty && !saved && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-[12px] font-medium text-amber-700 flex items-center gap-2">
            <Info className="h-3.5 w-3.5" />
            Vous avez des modifications non enregistrées.
          </div>
        )}

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Left column: 2/3 */}
          <div className="lg:col-span-2 space-y-4">

            {/* Informations générales */}
            <FormSection title="Informations générales" icon={Monitor} gradient="from-indigo-50/50 to-blue-50/30">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Identifiant" required>
                  <InputField value={form.id} disabled />
                </Field>
                <Field label="N° de série" required>
                  <InputField value={form.serial} onChange={v => update("serial", v)} placeholder="Ex: D254801" mono />
                </Field>
                <Field label="Gamme" required>
                  <SelectField value={form.gamme} options={GAMMES} onChange={v => update("gamme", v)} />
                </Field>
                <Field label="Modèle">
                  <InputField value={form.modele} onChange={v => update("modele", v)} placeholder="Ex: Modele 26" />
                </Field>
                <Field label="Date de sortie atelier">
                  <InputField type="date" value={form.sortieAtelier} onChange={v => update("sortieAtelier", v)} />
                </Field>
                <Field label="Firmware">
                  <InputField value={form.firmware} onChange={v => update("firmware", v)} placeholder="Ex: v3.2.1" mono />
                </Field>
                <Field label="État général" required>
                  <SelectField value={form.etat} options={ETATS} onChange={v => update("etat", v)} />
                </Field>
                <Field label="Statut réseau" required>
                  <div className="flex items-center gap-2">
                    {STATUTS.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update("statut", s)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-[12px] font-semibold transition border",
                          form.statut === s
                            ? s === "ONLINE" ? "bg-emerald-500 text-white border-emerald-500"
                              : s === "OFFLINE" ? "bg-red-500 text-white border-red-500"
                              : "bg-amber-500 text-white border-amber-500"
                            : "bg-white text-[--k-muted] border-[--k-border] hover:border-[--k-muted]"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </FormSection>

            {/* Équipements */}
            <FormSection title="Équipements" icon={Package} gradient="from-emerald-50/40 to-teal-50/20">
              <div className="space-y-2">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-2 px-1 text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">
                  <div className="col-span-5">Composant</div>
                  <div className="col-span-3">N° série</div>
                  <div className="col-span-3">État</div>
                  <div className="col-span-1" />
                </div>
                {equipements.map(eq => (
                  <div key={eq.id} className="grid grid-cols-12 gap-2 items-center rounded-xl bg-[--k-surface-2]/40 px-2 py-1.5">
                    <div className="col-span-5">
                      <InputField value={eq.nom} onChange={v => updateEquip(eq.id, "nom", v)} placeholder="Nom du composant" />
                    </div>
                    <div className="col-span-3">
                      <InputField value={eq.serial} onChange={v => updateEquip(eq.id, "serial", v)} placeholder="Serial" mono />
                    </div>
                    <div className="col-span-3">
                      <SelectField value={eq.etat} options={ETAT_EQUIPEMENT} onChange={v => updateEquip(eq.id, "etat", v)} small />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button type="button" onClick={() => removeEquip(eq.id)} className="flex h-7 w-7 items-center justify-center rounded-lg text-[--k-muted] hover:bg-red-50 hover:text-red-500 transition">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addEquip} className="flex items-center gap-2 rounded-xl border border-dashed border-[--k-border] px-3 py-2.5 text-[12px] font-medium text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition w-full justify-center">
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter un composant
                </button>
              </div>
            </FormSection>

            {/* Coût de fabrication */}
            <FormSection title="Coût de fabrication" icon={Settings} gradient="from-amber-50/40 to-orange-50/20">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Coût total (€)">
                  <InputField type="number" value={form.coutFabrication} onChange={v => update("coutFabrication", Number(v))} />
                </Field>
              </div>
            </FormSection>

            {/* Notes */}
            <FormSection title="Notes internes" icon={Info} gradient="from-blue-50/40 to-indigo-50/20">
              <textarea
                value={form.notes}
                onChange={e => update("notes", e.target.value)}
                rows={3}
                placeholder="Ajoutez des notes internes sur cette borne..."
                className="w-full rounded-xl border border-[--k-border] bg-white px-3 py-2.5 text-[13px] outline-none placeholder:text-[--k-muted]/50 focus:ring-1 focus:ring-[--k-primary-border] focus:border-[--k-primary] resize-none"
              />
            </FormSection>
          </div>

          {/* Right column: 1/3 */}
          <div className="space-y-4">

            {/* Parc & Client */}
            <FormSection title="Parc & Client" compact gradient="from-violet-50/40 to-indigo-50/20">
              <div className="space-y-3">
                <Field label="Parc" required>
                  <SelectField value={form.parc} options={PARCS} onChange={v => update("parc", v)} />
                </Field>
                <Field label="Client">
                  <InputField value={form.client} onChange={v => update("client", v)} placeholder="Nom du client" />
                </Field>
                <Field label="Antenne rattachée">
                  <InputField value={form.antenne} onChange={v => update("antenne", v)} placeholder="Ex: Antenne #116" />
                </Field>
              </div>
            </FormSection>

            {/* Localisation */}
            <FormSection title="Localisation" icon={MapPin} compact gradient="from-sky-50/40 to-blue-50/20">
              <div className="space-y-3">
                <Field label="Adresse">
                  <InputField value={form.adresse} onChange={v => update("adresse", v)} placeholder="Adresse" />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Code postal">
                    <InputField value={form.codePostal} onChange={v => update("codePostal", v)} placeholder="35000" />
                  </Field>
                  <Field label="Ville">
                    <InputField value={form.ville} onChange={v => update("ville", v)} placeholder="Rennes" />
                  </Field>
                </div>
                {/* Map preview */}
                <div className="h-[120px] rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border border-[--k-border]">
                  <div className="text-center">
                    <MapPin className="mx-auto h-5 w-5 text-[--k-primary]/30 mb-1" />
                    <div className="text-[11px] text-[--k-muted]">{form.ville || "Localisation"}</div>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Photo */}
            <FormSection title="Photo" compact gradient="from-rose-50/30 to-pink-50/20">
              <div className="rounded-xl border-2 border-dashed border-[--k-border] bg-[--k-surface-2]/30 p-6 text-center hover:border-[--k-primary]/40 transition cursor-pointer">
                <Upload className="mx-auto h-6 w-6 text-[--k-muted] mb-2" />
                <div className="text-[12px] font-medium text-[--k-text]">Glisser une image ici</div>
                <div className="text-[11px] text-[--k-muted] mt-0.5">ou cliquer pour parcourir</div>
                <div className="text-[10px] text-[--k-muted]/60 mt-1">PNG, JPG — max 5 Mo</div>
              </div>
            </FormSection>

            {/* Quick info */}
            <div className="rounded-2xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50 to-blue-50/50 p-4">
              <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide mb-2">Résumé</div>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-[--k-muted]">Identifiant</span>
                  <span className="font-semibold text-[--k-text]">{form.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--k-muted]">Gamme</span>
                  <span className="font-medium text-[--k-primary]">{form.gamme}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--k-muted]">Statut</span>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    form.statut === "ONLINE" ? "bg-emerald-100 text-emerald-700" :
                    form.statut === "OFFLINE" ? "bg-red-100 text-red-700" :
                    "bg-amber-100 text-amber-700"
                  )}>{form.statut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--k-muted]">Équipements</span>
                  <span className="font-semibold text-[--k-text]">{equipements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--k-muted]">Client</span>
                  <span className="font-medium text-[--k-text] truncate ml-4">{form.client || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="sticky bottom-0 z-10 -mx-5 mt-6 border-t border-[--k-border] bg-white/90 backdrop-blur px-5 py-3 flex items-center justify-between rounded-b-2xl">
          <div className="text-[12px] text-[--k-muted]">
            {dirty ? (
              <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                Modifications non sauvegardées
              </span>
            ) : saved ? (
              <span className="text-emerald-600 font-medium">Tout est à jour</span>
            ) : (
              "Aucune modification"
            )}
          </div>
          <div className="flex items-center gap-2">
            <a href={`/bornes/${form.id}`}>
              <Button type="button" variant="ghost" size="sm">Annuler</Button>
            </a>
            <Button type="submit" variant="primary" size="sm" disabled={saving || !dirty}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function FormSection({ title, icon: Icon, children, compact, gradient }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
      <div className={cn(
        "flex items-center gap-2 border-b border-[--k-border] px-4 py-2.5 rounded-t-2xl",
        gradient && `bg-gradient-to-r ${gradient}`
      )}>
        {Icon && (
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/60">
            <Icon className="h-3.5 w-3.5 text-[--k-muted]" />
          </div>
        )}
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className={compact ? "px-4 py-3" : "px-4 py-4"}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function InputField({ value, onChange, placeholder, type = "text", disabled, mono }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "h-9 w-full rounded-xl border border-[--k-border] bg-white px-3 text-[13px] outline-none transition",
        "placeholder:text-[--k-muted]/40",
        "focus:ring-2 focus:ring-[--k-primary]/10 focus:border-[--k-primary]",
        disabled && "bg-[--k-surface-2] text-[--k-muted] cursor-not-allowed",
        mono && "font-mono text-[12px]"
      )}
    />
  );
}

function SelectField({ value, options, onChange, small }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={cn(
        "w-full rounded-xl border border-[--k-border] bg-white px-3 text-[13px] outline-none transition appearance-none cursor-pointer",
        "focus:ring-2 focus:ring-[--k-primary]/10 focus:border-[--k-primary]",
        small ? "h-8" : "h-9"
      )}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
