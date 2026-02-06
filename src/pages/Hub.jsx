import React, { useMemo } from "react";
import { AppShell } from "../components/AppShell";
import {
  Monitor, Radio, Package, Headphones, Sparkles,
  CalendarDays, Settings, Users, BarChart3, ShieldCheck,
  Coffee, Zap, Lightbulb, Smile
} from "lucide-react";

const APPS = [
  {
    name: "Bornes Manager",
    desc: "Configuration des bornes, downloads, retry",
    to: "/bornes",
    icon: Monitor,
    color: "bg-indigo-50 text-indigo-500",
  },
  {
    name: "Events",
    desc: "Gestion des événements",
    to: "/events",
    icon: CalendarDays,
    color: "bg-rose-50 text-rose-500",
  },
  {
    name: "Antennes",
    desc: "Réseau & supervision",
    to: "/antennes",
    icon: Radio,
    color: "bg-pink-50 text-pink-500",
  },
  {
    name: "Stocks",
    desc: "Consommables & alertes",
    to: "/stocks",
    icon: Package,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    name: "Abonnements",
    desc: "Gestion des abonnements",
    to: "/support",
    icon: Users,
    color: "bg-sky-50 text-sky-500",
  },
  {
    name: "Support",
    desc: "Support & Knowledge base",
    to: "/support",
    icon: Headphones,
    color: "bg-amber-50 text-amber-500",
  },
  {
    name: "Catalog IA",
    desc: "Génération de contenus / visuels",
    to: "/catalog",
    icon: Sparkles,
    color: "bg-violet-50 text-violet-500",
  },
  {
    name: "Statistiques",
    desc: "Rapports & analytics",
    to: "/stats",
    icon: BarChart3,
    color: "bg-teal-50 text-teal-500",
  },
  {
    name: "Admin",
    desc: "Administration du système",
    to: "/settings",
    icon: ShieldCheck,
    color: "bg-slate-100 text-slate-500",
  },
];

const TIPS = [
  { text: "Cmd+K ouvre la palette de recherche depuis n'importe quelle page.", icon: Zap },
  { text: "Tu peux mettre une app en favori pour la retrouver plus vite.", icon: Lightbulb },
  { text: "Les raccourcis clavier sont listés dans l'aide de chaque app.", icon: Zap },
  { text: "Le support est dispo 7j/7, n'hésite pas !", icon: Coffee },
  { text: "Pense à vérifier les alertes bornes chaque matin.", icon: Lightbulb },
  { text: "Un doute ? Le changelog est dans les paramètres.", icon: Zap },
  { text: "Les exports CSV sont disponibles sur toutes les tables.", icon: Lightbulb },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 6) return "Bonne nuit";
  if (h < 12) return "Bonjour";
  if (h < 14) return "Bon appétit";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

function getEmoji() {
  const h = new Date().getHours();
  if (h < 6) return "\u{1F31C}";
  if (h < 12) return "\u{1F44B}";
  if (h < 14) return "\u{2615}";
  if (h < 18) return "\u{2600}\u{FE0F}";
  return "\u{1F31A}";
}

export default function Hub() {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);
  const TipIcon = tip.icon;

  return (
    <AppShell currentApp="Konitys Hub" activeKey="dashboard" hubMode>
      <div className="mx-auto max-w-[960px] px-6 pt-12 pb-12">

        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-[28px] font-bold text-[--k-text]">
            {getGreeting()} Seb {getEmoji()}
          </h1>
          <p className="mt-1 text-[15px] text-[--k-muted]">
            Qu'est-ce qu'on fait de beau aujourd'hui ?
          </p>
        </div>

        {/* Tip of the day */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-orange-50/40 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <TipIcon className="h-4 w-4" />
          </div>
          <div className="min-w-0 pt-0.5">
            <div className="text-[12px] font-semibold uppercase tracking-wider text-amber-700/70">
              Le tip du jour
            </div>
            <div className="mt-0.5 text-[13px] text-amber-900/80">
              {tip.text}
            </div>
          </div>
        </div>

        {/* Apps grid */}
        <div className="mb-3">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[--k-muted]/60">
            Applications
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <a
                key={app.name}
                href={app.to}
                className="group flex items-center gap-4 rounded-2xl border border-[--k-border] bg-white px-5 py-4 transition hover:border-[--k-primary-border] hover:shadow-md hover:shadow-[--k-primary]/5"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${app.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-[--k-text] group-hover:text-[--k-primary] transition">
                    {app.name}
                  </div>
                  <div className="mt-0.5 text-[13px] text-[--k-muted] truncate">
                    {app.desc}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
