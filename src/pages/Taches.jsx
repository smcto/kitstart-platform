import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/ui/Button";
import { cn } from "../components/ui/cn";
import {
  Plus, Check, Circle, Clock, AlertTriangle, Flag,
  Calendar, User, Tag, Filter, ChevronDown, X,
  Search, MoreHorizontal, Trash2, Edit3, CheckCircle2
} from "lucide-react";

/* ── Mock data ────────────────────────────────────── */

const INITIAL_TASKS = [
  { id: 1, text: "Vérifier les alertes bornes du matin", status: "done", priority: "high", app: "Bornes Manager", assignee: "Seb M.", dueDate: "06/02/2026", tags: ["Maintenance"] },
  { id: 2, text: "Préparer le reporting hebdo", status: "todo", priority: "medium", app: "Hub", assignee: "Seb M.", dueDate: "07/02/2026", tags: ["Reporting"] },
  { id: 3, text: "Relancer le fournisseur câbles USB-C", status: "done", priority: "low", app: "Stock Manager", assignee: "Seb M.", dueDate: "05/02/2026", tags: ["Fournisseur"] },
  { id: 4, text: "Valider le devis antennes Nantes", status: "inprogress", priority: "high", app: "Antennes Selfizee", assignee: "Seb M.", dueDate: "08/02/2026", tags: ["Devis", "Urgent"] },
  { id: 5, text: "Mettre à jour le firmware v3.2.2 sur parc IDF", status: "todo", priority: "high", app: "Bornes Manager", assignee: "Lucas D.", dueDate: "10/02/2026", tags: ["Firmware", "Déploiement"] },
  { id: 6, text: "Inventaire stock entrepôt Rennes", status: "todo", priority: "medium", app: "Stock Manager", assignee: "Marie D.", dueDate: "12/02/2026", tags: ["Inventaire"] },
  { id: 7, text: "Planifier maintenance Bretagne Q1", status: "inprogress", priority: "medium", app: "Bornes Manager", assignee: "Seb M.", dueDate: "15/02/2026", tags: ["Maintenance", "Planning"] },
  { id: 8, text: "Contacter Mairie de Lyon pour renouvellement", status: "todo", priority: "low", app: "Antennes Selfizee", assignee: "Camille R.", dueDate: "14/02/2026", tags: ["Relation client"] },
  { id: 9, text: "Revue qualité écrans tactiles lot #45", status: "todo", priority: "high", app: "Stock Manager", assignee: "Lucas D.", dueDate: "09/02/2026", tags: ["Qualité"] },
  { id: 10, text: "Organiser afterwork équipe", status: "todo", priority: "low", app: "Hub", assignee: "Seb M.", dueDate: "14/02/2026", tags: ["Vie d'équipe"] },
];

const PRIORITIES = { high: { label: "Haute", color: "text-red-600", bg: "bg-red-50", icon: "bg-red-500" }, medium: { label: "Moyenne", color: "text-amber-600", bg: "bg-amber-50", icon: "bg-amber-500" }, low: { label: "Basse", color: "text-blue-600", bg: "bg-blue-50", icon: "bg-blue-500" } };
const STATUSES = { todo: { label: "À faire", color: "bg-slate-100 text-slate-600" }, inprogress: { label: "En cours", color: "bg-blue-100 text-blue-700" }, done: { label: "Terminée", color: "bg-emerald-100 text-emerald-700" } };
const APP_COLORS = { "Bornes Manager": "bg-indigo-100 text-indigo-700", "Antennes Selfizee": "bg-orange-100 text-orange-700", "Stock Manager": "bg-emerald-100 text-emerald-700", "Hub": "bg-violet-100 text-violet-700" };

/* ── Page ──────────────────────────────────────────── */

export default function Taches() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, todo, inprogress, done
  const [search, setSearch] = useState("");

  function addTask(e) {
    e.preventDefault();
    const text = newTask.trim();
    if (!text) return;
    setTasks(t => [{ id: Date.now(), text, status: "todo", priority: "medium", app: "Hub", assignee: "Seb M.", dueDate: "—", tags: [] }, ...t]);
    setNewTask("");
  }

  function toggleStatus(id) {
    setTasks(t => t.map(task => {
      if (task.id !== id) return task;
      const next = task.status === "done" ? "todo" : task.status === "todo" ? "inprogress" : "done";
      return { ...task, status: next };
    }));
  }

  function removeTask(id) {
    setTasks(t => t.filter(task => task.id !== id));
  }

  const filtered = tasks.filter(t => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return t.text.toLowerCase().includes(s) || t.app.toLowerCase().includes(s) || t.tags.some(tag => tag.toLowerCase().includes(s));
    }
    return true;
  });

  const counts = { all: tasks.length, todo: tasks.filter(t => t.status === "todo").length, inprogress: tasks.filter(t => t.status === "inprogress").length, done: tasks.filter(t => t.status === "done").length };

  return (
    <AppShell currentApp="Konitys Hub" activeKey="tasks" hubMode>
      <div className="mx-auto max-w-[900px] px-6 pt-6 pb-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-[--k-text]">Mes tâches</h1>
            <p className="text-sm text-[--k-muted] mt-0.5">{counts.todo} à faire, {counts.inprogress} en cours, {counts.done} terminées</p>
          </div>
        </div>

        {/* Add task */}
        <form onSubmit={addTask} className="mb-4 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-[--k-border] bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[--k-primary]/10 focus-within:border-[--k-primary]">
            <Plus className="h-4 w-4 text-[--k-muted] shrink-0" />
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Ajouter une nouvelle tâche..."
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[--k-muted]/50"
            />
          </div>
          <Button type="submit" variant="primary" disabled={!newTask.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </form>

        {/* Filter bar */}
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          {/* Status tabs */}
          <div className="flex items-center gap-0.5 rounded-xl border border-[--k-border] bg-white p-0.5">
            {[
              { key: "all", label: "Toutes" },
              { key: "todo", label: "À faire" },
              { key: "inprogress", label: "En cours" },
              { key: "done", label: "Terminées" },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className={cn(
                "rounded-lg px-3 py-1.5 text-[12px] font-medium transition",
                filter === f.key ? "bg-[--k-primary] text-white shadow-sm" : "text-[--k-muted] hover:text-[--k-text]"
              )}>
                {f.label}
                <span className={cn("ml-1.5 tabular-nums", filter === f.key ? "text-white/70" : "text-[--k-muted]/50")}>{counts[f.key]}</span>
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[--k-muted]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="h-8 w-[200px] rounded-lg border border-[--k-border] bg-white pl-8 pr-3 text-[12px] outline-none focus:border-[--k-primary]/40"
            />
          </div>
        </div>

        {/* Task list */}
        <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 bg-gradient-to-r from-indigo-50/40 to-blue-50/20 border-b border-[--k-border] px-4 py-2 text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">
            <div className="col-span-1" />
            <div className="col-span-4">Tâche</div>
            <div className="col-span-2">App</div>
            <div className="col-span-1">Priorité</div>
            <div className="col-span-2">Échéance</div>
            <div className="col-span-1">Assignée</div>
            <div className="col-span-1" />
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300 mb-2" />
              <div className="text-[13px] font-medium text-[--k-muted]">
                {search ? "Aucun résultat" : filter === "done" ? "Aucune tâche terminée" : "Aucune tâche"}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-[--k-border]/50">
              {filtered.map(task => {
                const p = PRIORITIES[task.priority];
                const s = STATUSES[task.status];
                return (
                  <div key={task.id} className={cn(
                    "grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-blue-50/20 transition group",
                    task.status === "done" && "opacity-60"
                  )}>
                    {/* Check */}
                    <div className="col-span-1">
                      <button onClick={() => toggleStatus(task.id)} className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
                        task.status === "done"
                          ? "border-emerald-500 bg-emerald-500"
                          : task.status === "inprogress"
                          ? "border-blue-400 bg-blue-50"
                          : "border-[--k-border] hover:border-[--k-primary]/50"
                      )}>
                        {task.status === "done" && <Check className="h-3.5 w-3.5 text-white" />}
                        {task.status === "inprogress" && <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />}
                      </button>
                    </div>

                    {/* Task text + tags */}
                    <div className="col-span-4 min-w-0">
                      <div className={cn("text-[13px] font-medium truncate", task.status === "done" ? "line-through text-[--k-muted]" : "text-[--k-text]")}>
                        {task.text}
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-0.5">
                          {task.tags.map(tag => (
                            <span key={tag} className="rounded px-1.5 py-0.5 text-[9px] font-medium bg-[--k-surface-2] text-[--k-muted]">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* App */}
                    <div className="col-span-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", APP_COLORS[task.app])}>
                        {task.app}
                      </span>
                    </div>

                    {/* Priority */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        <span className={cn("h-2 w-2 rounded-full", p.icon)} />
                        <span className={cn("text-[11px] font-medium", p.color)}>{p.label}</span>
                      </div>
                    </div>

                    {/* Due date */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-[12px] text-[--k-muted]">
                        <Calendar className="h-3 w-3" />
                        <span className="tabular-nums">{task.dueDate}</span>
                      </div>
                    </div>

                    {/* Assignee */}
                    <div className="col-span-1">
                      <span className="text-[11px] font-medium text-[--k-muted]">{task.assignee}</span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => removeTask(task.id)} className="flex h-7 w-7 items-center justify-center rounded-lg text-[--k-muted] hover:bg-red-50 hover:text-red-500 transition">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2 bg-[--k-surface-2]/30 text-[11px] text-[--k-muted]">
            <span>{filtered.length} tâche{filtered.length > 1 ? "s" : ""}</span>
            {counts.done > 0 && (
              <button onClick={() => setTasks(t => t.filter(task => task.status !== "done"))} className="text-[--k-muted] hover:text-red-500 transition font-medium">
                Supprimer les terminées
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
