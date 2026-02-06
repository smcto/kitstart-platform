import React from "react";
import { AppShell } from "../components/AppShell";
import {
  Monitor, Radio, Package, Headphones, Sparkles,
  CalendarDays, Settings, Users, BarChart3, ShieldCheck, Megaphone
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

export default function Hub() {
  return (
    <AppShell currentApp="Konitys Hub" activeKey="dashboard" hubMode>
      <div className="flex flex-col items-center px-6 pt-16 pb-12">
        <h1 className="text-2xl font-bold text-[--k-text]">Applications</h1>
        <p className="mt-2 text-sm text-[--k-muted]">Sélectionnez une application pour commencer</p>

        <div className="mt-10 grid w-full max-w-[920px] grid-cols-1 gap-4 sm:grid-cols-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <a
                key={app.name}
                href={app.to}
                className="group flex items-center gap-4 rounded-2xl border border-[--k-border] bg-white px-5 py-5 transition hover:border-[--k-primary-border] hover:shadow-md hover:shadow-[--k-primary]/5"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${app.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-[--k-text] group-hover:text-[--k-primary] transition">
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
