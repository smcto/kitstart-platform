import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import {
  Monitor, Radio, Package, Headphones, Sparkles,
  CalendarDays, Settings, Users, BarChart3, ShieldCheck,
  Plus, Check, Cake, ChevronRight, Pin, Megaphone, ArrowRight
} from "lucide-react";
import { cn } from "../components/ui/cn";

/* ── Apps ─────────────────────────────────────────── */

const APPS = [
  { name: "Bornes Manager", desc: "Bornes, downloads, retry",       to: "/bornes",   icon: Monitor,      color: "bg-indigo-50 text-indigo-500" },
  { name: "Events",         desc: "Gestion des événements",         to: "/events",   icon: CalendarDays, color: "bg-rose-50 text-rose-500" },
  { name: "Antennes Selfizee", desc: "Réseau & supervision",         to: "/antennes", icon: Radio,        color: "bg-pink-50 text-pink-500" },
  { name: "Stock Manager",    desc: "Consommables & alertes",       to: "/stocks",   icon: Package,      color: "bg-emerald-50 text-emerald-500" },
  { name: "Abonnements",    desc: "Gestion des abonnements",        to: "/support",  icon: Users,        color: "bg-sky-50 text-sky-500" },
  { name: "Support",        desc: "Support & Knowledge base",       to: "/support",  icon: Headphones,   color: "bg-amber-50 text-amber-500" },
  { name: "Catalog IA",     desc: "Contenus & visuels",             to: "/catalog",  icon: Sparkles,     color: "bg-violet-50 text-violet-500" },
  { name: "Statistiques",   desc: "Rapports & analytics",           to: "/stats",    icon: BarChart3,    color: "bg-teal-50 text-teal-500" },
  { name: "Admin",          desc: "Administration système",          to: "/settings", icon: ShieldCheck,  color: "bg-slate-100 text-slate-500" },
];

/* ── Mock data ────────────────────────────────────── */

const INITIAL_TODOS = [
  { id: 1, text: "Vérifier les alertes bornes du matin", done: false },
  { id: 2, text: "Préparer le reporting hebdo", done: false },
  { id: 3, text: "Relancer le fournisseur câbles USB-C", done: true },
  { id: 4, text: "Valider le devis antennes Nantes", done: false },
];

const BIRTHDAYS = [
  { name: "Marie Dupont",  date: "Aujourd'hui", avatar: "MD", color: "from-pink-400 to-rose-500" },
  { name: "Lucas Martin",  date: "Demain",      avatar: "LM", color: "from-blue-400 to-indigo-500" },
  { name: "Camille Roux",  date: "8 fév.",      avatar: "CR", color: "from-emerald-400 to-teal-500" },
];

const NEWS = [
  { id: 1, title: "Nouveau partenariat Orange Business",  desc: "200 bornes en IDF prévues en mars.", date: "Aujourd'hui", pinned: true, tag: "Partenariat" },
  { id: 2, title: "Afterwork vendredi 7 février",          desc: "18h30 au Café des Arts — Slack #social", date: "3 fév.", tag: "Vie d'équipe" },
  { id: 3, title: "Bienvenue Sarah et Thomas !",           desc: "Deux devs rejoignent l'équipe bornes.", date: "1 fév.", tag: "Équipe" },
];

const TAG_COLORS = {
  "Partenariat":  "bg-blue-50 text-blue-600",
  "Produit":      "bg-violet-50 text-violet-600",
  "Vie d'équipe": "bg-amber-50 text-amber-600",
  "Équipe":       "bg-emerald-50 text-emerald-600",
};

/* ── Helpers ───────────────────────────────────────── */

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

/* ── Page ──────────────────────────────────────────── */

export default function Hub() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState("");

  function toggleTodo(id) {
    setTodos(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  }

  function addTodo(e) {
    e.preventDefault();
    const text = newTodo.trim();
    if (!text) return;
    setTodos(t => [{ id: Date.now(), text, done: false }, ...t]);
    setNewTodo("");
  }

  const todoDone = todos.filter(t => t.done).length;

  return (
    <AppShell currentApp="Konitys Hub" activeKey="dashboard" hubMode>
      <div className="mx-auto max-w-[1100px] px-6 pt-10 pb-16">

        {/* ── Greeting ── */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold text-[--k-text]">
            {getGreeting()} Seb {getEmoji()}
          </h1>
          <p className="mt-0.5 text-[14px] text-[--k-muted]">
            Qu'est-ce qu'on fait de beau aujourd'hui ?
          </p>
        </div>

        {/* ── Apps grid ── */}
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[--k-muted]/60">
          Applications
        </div>
        <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <a
                key={app.name}
                href={app.to}
                className="group flex items-center gap-3 rounded-xl border border-[--k-border] bg-white px-4 py-3 transition hover:border-[--k-primary-border] hover:shadow-md hover:shadow-[--k-primary]/5"
              >
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${app.color}`}>
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[--k-text] group-hover:text-[--k-primary] transition">{app.name}</div>
                  <div className="text-[11px] text-[--k-muted] truncate">{app.desc}</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[--k-muted]/0 group-hover:text-[--k-primary] transition" />
              </a>
            );
          })}
        </div>

        {/* ── Bottom row : todos | news + birthdays ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Todolist */}
          <div className="rounded-xl border border-[--k-border] bg-white">
            <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Mes tâches</span>
              </div>
              <span className="text-[11px] text-[--k-muted]">{todoDone}/{todos.length}</span>
            </div>

            <form onSubmit={addTodo} className="flex items-center gap-2 border-b border-[--k-border] px-4 py-2">
              <Plus className="h-4 w-4 text-[--k-muted]" />
              <input
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="Ajouter une tâche..."
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[--k-muted]/50"
              />
            </form>

            <div className="max-h-[240px] overflow-auto">
              {todos.filter(t => !t.done).map(t => (
                <TodoItem key={t.id} todo={t} onToggle={toggleTodo} />
              ))}
              {todos.some(t => t.done) && (
                <div className="px-4 pt-2.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[--k-muted]/50">Terminées</div>
              )}
              {todos.filter(t => t.done).map(t => (
                <TodoItem key={t.id} todo={t} onToggle={toggleTodo} />
              ))}
            </div>
          </div>

          {/* News */}
          <div className="rounded-xl border border-[--k-border] bg-white">
            <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-[--k-primary]" />
                <span className="text-[13px] font-semibold text-[--k-text]">Actualités</span>
              </div>
              <button className="flex items-center gap-0.5 text-[11px] font-medium text-[--k-primary] hover:underline">
                Tout voir <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-[--k-border]">
              {NEWS.map(n => (
                <button key={n.id} className="flex w-full gap-3 px-4 py-2.5 text-left hover:bg-[--k-surface-2]/50 transition">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {n.pinned && <Pin className="h-3 w-3 text-[--k-primary] shrink-0" />}
                      <span className="text-[13px] font-semibold text-[--k-text] truncate">{n.title}</span>
                    </div>
                    <div className="text-[12px] text-[--k-muted] line-clamp-1">{n.desc}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", TAG_COLORS[n.tag] || "bg-gray-50 text-gray-500")}>{n.tag}</span>
                      <span className="text-[10px] text-[--k-muted]/60">{n.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Birthdays */}
          <div className="rounded-xl border border-[--k-border] bg-white px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <Cake className="h-4 w-4 text-pink-400" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[--k-muted]/70">Anniversaires</span>
            </div>
            <div className="space-y-2.5">
              {BIRTHDAYS.map(b => (
                <div key={b.name} className="flex items-center gap-2.5">
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white", b.color)}>
                    {b.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-[--k-text] truncate">{b.name}</div>
                    <div className="text-[11px] text-[--k-muted]">{b.date}</div>
                  </div>
                  {b.date === "Aujourd'hui" && <span className="text-base">🎉</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Sub-components ────────────────────────────────── */

function TodoItem({ todo, onToggle }) {
  return (
    <button
      className="flex w-full items-start gap-3 px-4 py-2 text-left hover:bg-[--k-surface-2]/50 transition"
      onClick={() => onToggle(todo.id)}
    >
      <span className={cn(
        "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition",
        todo.done
          ? "border-[--k-primary] bg-[--k-primary]"
          : "border-[--k-border] hover:border-[--k-primary]/50"
      )}>
        {todo.done && <Check className="h-3 w-3 text-white" />}
      </span>
      <span className={cn(
        "text-[13px] leading-snug",
        todo.done ? "text-[--k-muted] line-through" : "text-[--k-text]"
      )}>
        {todo.text}
      </span>
    </button>
  );
}
