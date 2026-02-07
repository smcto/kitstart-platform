import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import {
  User, Mail, Phone, MapPin, Shield, Bell, Palette,
  Globe, Key, Camera, Save, ChevronRight, Check, X
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const INITIAL = {
  prenom: "Seb",
  nom: "Martin",
  email: "seb@konitys.com",
  telephone: "+33 6 12 34 56 78",
  poste: "Directeur technique",
  equipe: "Engineering",
  adresse: "42 avenue de la République",
  ville: "Rennes",
  codePostal: "35000",
  langue: "Français",
  timezone: "Europe/Paris",
  notifEmail: true,
  notifPush: true,
  notifSlack: false,
  theme: "auto",
};

const SESSIONS = [
  { device: "Chrome — macOS", ip: "91.168.12.34", date: "Aujourd'hui 14:23", current: true },
  { device: "Safari — iPhone", ip: "91.168.12.35", date: "Hier 09:15", current: false },
  { device: "Firefox — Windows", ip: "82.120.45.67", date: "3 fév. 2026", current: false },
];

/* ── Page ──────────────────────────────────────────── */

export default function MonCompte() {
  const [form, setForm] = useState(INITIAL);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", new: "", confirm: "" });

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setDirty(true);
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setDirty(false); }, 800);
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    setModalOpen(false);
    setPwForm({ current: "", new: "", confirm: "" });
  }

  return (
    <AppShell currentApp="Konitys Hub" activeKey="account" hubMode>
      <div className="mx-auto max-w-[900px] px-6 pt-8 pb-16">

        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-1.5 text-[12px] text-[--k-muted]">
          <a href="/" className="hover:text-[--k-text] transition">Hub</a>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-[--k-text]">Mon compte</span>
        </div>

        {/* Profile header card */}
        <div className="mb-6 rounded-2xl border border-[--k-border] bg-gradient-to-r from-indigo-500 to-blue-600 p-6 shadow-md shadow-indigo-500/15 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/[0.06]" />
          <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-white/[0.04]" />
          <div className="relative flex items-center gap-5">
            <div className="relative group">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">
                SM
              </span>
              <button className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30 opacity-0 group-hover:opacity-100 transition">
                <Camera className="h-5 w-5 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{form.prenom} {form.nom}</h1>
              <p className="text-[13px] text-white/70">{form.poste} — {form.equipe}</p>
              <p className="text-[12px] text-white/50 mt-0.5">{form.email}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          {/* Success */}
          {saved && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-[13px] font-medium text-emerald-700 flex items-center gap-2">
              <Check className="h-4 w-4" /> Profil mis à jour avec succès.
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

            {/* Left: main form */}
            <div className="lg:col-span-2 space-y-4">

              {/* Informations personnelles */}
              <Section title="Informations personnelles" icon={User} gradient="from-indigo-50/50 to-blue-50/30">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Prénom">
                    <InputField value={form.prenom} onChange={v => update("prenom", v)} />
                  </Field>
                  <Field label="Nom">
                    <InputField value={form.nom} onChange={v => update("nom", v)} />
                  </Field>
                  <Field label="Email">
                    <InputField type="email" value={form.email} onChange={v => update("email", v)} />
                  </Field>
                  <Field label="Téléphone">
                    <InputField value={form.telephone} onChange={v => update("telephone", v)} />
                  </Field>
                  <Field label="Poste">
                    <InputField value={form.poste} onChange={v => update("poste", v)} />
                  </Field>
                  <Field label="Équipe">
                    <InputField value={form.equipe} onChange={v => update("equipe", v)} />
                  </Field>
                </div>
              </Section>

              {/* Localisation */}
              <Section title="Localisation" icon={MapPin} gradient="from-sky-50/40 to-blue-50/20">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Field label="Adresse">
                      <InputField value={form.adresse} onChange={v => update("adresse", v)} />
                    </Field>
                  </div>
                  <Field label="Ville">
                    <InputField value={form.ville} onChange={v => update("ville", v)} />
                  </Field>
                </div>
              </Section>

              {/* Notifications */}
              <Section title="Notifications" icon={Bell} gradient="from-amber-50/40 to-orange-50/20">
                <div className="space-y-3">
                  <Toggle label="Notifications par email" desc="Recevoir les alertes et résumés par email" checked={form.notifEmail} onChange={v => update("notifEmail", v)} />
                  <Toggle label="Notifications push" desc="Recevoir les notifications en temps réel dans le navigateur" checked={form.notifPush} onChange={v => update("notifPush", v)} />
                  <Toggle label="Intégration Slack" desc="Recevoir les notifications critiques sur Slack" checked={form.notifSlack} onChange={v => update("notifSlack", v)} />
                </div>
              </Section>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">

              {/* Sécurité */}
              <Section title="Sécurité" icon={Shield} compact gradient="from-rose-50/40 to-pink-50/20">
                <div className="space-y-3">
                  <div>
                    <div className="text-[12px] font-medium text-[--k-text] mb-1">Mot de passe</div>
                    <div className="text-[11px] text-[--k-muted] mb-2">Dernière modification il y a 45 jours</div>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
                      <Key className="h-3.5 w-3.5 mr-1" />
                      Changer le mot de passe
                    </Button>
                  </div>
                  <div className="border-t border-[--k-border] pt-3">
                    <div className="text-[12px] font-medium text-[--k-text] mb-1">Authentification 2FA</div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Activée</span>
                      <span className="text-[11px] text-[--k-muted]">via Authenticator</span>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Préférences */}
              <Section title="Préférences" icon={Palette} compact gradient="from-violet-50/40 to-indigo-50/20">
                <div className="space-y-3">
                  <Field label="Langue">
                    <select value={form.langue} onChange={e => update("langue", e.target.value)} className="h-9 w-full rounded-xl border border-[--k-border] bg-white px-3 text-[13px] outline-none">
                      <option>Français</option>
                      <option>English</option>
                    </select>
                  </Field>
                  <Field label="Fuseau horaire">
                    <select value={form.timezone} onChange={e => update("timezone", e.target.value)} className="h-9 w-full rounded-xl border border-[--k-border] bg-white px-3 text-[13px] outline-none">
                      <option>Europe/Paris</option>
                      <option>America/New_York</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </Field>
                  <Field label="Thème">
                    <div className="flex gap-2">
                      {["auto", "light", "dark"].map(t => (
                        <button key={t} type="button" onClick={() => update("theme", t)} className={cn(
                          "flex-1 rounded-lg py-2 text-[12px] font-medium border transition capitalize",
                          form.theme === t ? "bg-[--k-primary] text-white border-[--k-primary]" : "bg-white text-[--k-muted] border-[--k-border] hover:border-[--k-muted]"
                        )}>{t === "auto" ? "Auto" : t === "light" ? "Clair" : "Sombre"}</button>
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>

              {/* Sessions actives */}
              <Section title="Sessions actives" compact gradient="from-emerald-50/30 to-teal-50/20">
                <div className="space-y-2">
                  {SESSIONS.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-1.5 border-b border-[--k-border]/30 last:border-0">
                      <Globe className="h-4 w-4 text-[--k-muted] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-medium text-[--k-text]">{s.device}</span>
                          {s.current && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">ACTUELLE</span>}
                        </div>
                        <div className="text-[11px] text-[--k-muted]">{s.ip} — {s.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </div>

          {/* Bottom save bar */}
          <div className="sticky bottom-0 z-10 mt-6 -mx-2 border-t border-[--k-border] bg-white/90 backdrop-blur px-4 py-3 rounded-b-2xl flex items-center justify-between">
            <div className="text-[12px] text-[--k-muted]">
              {dirty ? (
                <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  Modifications non sauvegardées
                </span>
              ) : saved ? (
                <span className="text-emerald-600 font-medium">Profil à jour</span>
              ) : "Aucune modification"}
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={saving || !dirty}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>

        {/* ── Password change modal ── */}
        {modalOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[3px]" onClick={() => setModalOpen(false)} />
            <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[440px] rounded-2xl border border-[--k-border] bg-white shadow-2xl shadow-black/15">
              <div className="flex items-center justify-between border-b border-[--k-border] bg-gradient-to-r from-rose-50/50 to-pink-50/30 px-5 py-4 rounded-t-2xl">
                <div>
                  <h2 className="text-[15px] font-bold text-[--k-text]">Changer le mot de passe</h2>
                  <p className="text-[12px] text-[--k-muted] mt-0.5">Votre nouveau mot de passe doit contenir au moins 8 caractères.</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[--k-surface-2] text-[--k-muted] transition">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <form onSubmit={handlePasswordChange} className="p-5 space-y-4">
                <Field label="Mot de passe actuel">
                  <InputField type="password" value={pwForm.current} onChange={v => setPwForm(f => ({ ...f, current: v }))} placeholder="Entrez votre mot de passe actuel" />
                </Field>
                <Field label="Nouveau mot de passe">
                  <InputField type="password" value={pwForm.new} onChange={v => setPwForm(f => ({ ...f, new: v }))} placeholder="Minimum 8 caractères" />
                </Field>
                <Field label="Confirmer le mot de passe">
                  <InputField type="password" value={pwForm.confirm} onChange={v => setPwForm(f => ({ ...f, confirm: v }))} placeholder="Répétez le nouveau mot de passe" />
                </Field>
                {pwForm.new && pwForm.new.length >= 1 && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex-1 h-1.5 rounded-full bg-[--k-surface-2] overflow-hidden">
                      <div className={cn(
                        "h-full rounded-full transition-all",
                        pwForm.new.length < 4 ? "w-1/4 bg-red-400" :
                        pwForm.new.length < 8 ? "w-2/4 bg-amber-400" :
                        pwForm.new.length < 12 ? "w-3/4 bg-blue-400" : "w-full bg-emerald-400"
                      )} />
                    </div>
                    <span className={cn(
                      "text-[11px] font-medium",
                      pwForm.new.length < 4 ? "text-red-500" :
                      pwForm.new.length < 8 ? "text-amber-500" :
                      pwForm.new.length < 12 ? "text-blue-500" : "text-emerald-500"
                    )}>
                      {pwForm.new.length < 4 ? "Faible" : pwForm.new.length < 8 ? "Moyen" : pwForm.new.length < 12 ? "Bon" : "Fort"}
                    </span>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Annuler</Button>
                  <Button type="submit" variant="primary" disabled={!pwForm.current || pwForm.new.length < 8 || pwForm.new !== pwForm.confirm}>
                    <Key className="h-3.5 w-3.5 mr-1" />
                    Mettre à jour
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

/* ── Sub-components ──────────────────────────────── */

function Section({ title, icon: Icon, children, compact, gradient }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03]">
      <div className={cn("flex items-center gap-2 border-b border-[--k-border] px-4 py-2.5 rounded-t-2xl", gradient && `bg-gradient-to-r ${gradient}`)}>
        {Icon && <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/60"><Icon className="h-3.5 w-3.5 text-[--k-muted]" /></div>}
        <span className="text-[13px] font-semibold text-[--k-text]">{title}</span>
      </div>
      <div className={compact ? "px-4 py-3" : "px-4 py-4"}>{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function InputField({ value, onChange, placeholder, type = "text" }) {
  return (
    <input type={type} value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} placeholder={placeholder}
      className="h-9 w-full rounded-xl border border-[--k-border] bg-white px-3 text-[13px] outline-none transition placeholder:text-[--k-muted]/40 focus:ring-2 focus:ring-[--k-primary]/10 focus:border-[--k-primary]"
    />
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="text-[13px] font-medium text-[--k-text]">{label}</div>
        {desc && <div className="text-[11px] text-[--k-muted]">{desc}</div>}
      </div>
      <button type="button" onClick={() => onChange(!checked)} className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition",
        checked ? "bg-[--k-primary]" : "bg-[--k-surface-2]"
      )}>
        <span className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )} />
      </button>
    </div>
  );
}
