import React, { useMemo, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "./ui/cn";
import { Home, Star, Clock, ChevronDown } from "lucide-react";
import { getAppIdentity } from "./appIdentity";

export function KonitysSwitcher({
  currentApp,
  apps,
  favorites = [],
  recents = [],
  onSelectApp,
  onGoHub,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return apps;
    return apps.filter((a) => a.name.toLowerCase().includes(s));
  }, [apps, q]);

  return (
    <div className="relative">
      <button
        className={cn(
          "flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-left transition",
          "hover:bg-[--k-surface-2]"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-[13px] font-bold text-[--k-primary]">KONITYS</span>
        <span className="text-[--k-muted]">/</span>
        <span className="text-[13px] font-medium text-[--k-text]">
          {currentApp}
        </span>
        <ChevronDown className="h-3 w-3 text-[--k-muted]" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute z-40 mt-1 w-[340px] rounded-xl border border-[--k-border] bg-white shadow-lg shadow-black/5">
            <div className="p-2">
              <Button
                className="w-full justify-start"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onGoHub?.();
                  setOpen(false);
                }}
              >
                <Home className="h-3.5 w-3.5" />
                Konitys Hub
              </Button>
              <div className="mt-2">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher une app..."
                />
              </div>
            </div>

            <Section
              title="Récentes"
              icon={<Clock className="h-3 w-3" />}
              items={recents}
              onPick={(name) => {
                onSelectApp?.(name);
                setOpen(false);
              }}
            />

            <Section
              title="Favoris"
              icon={<Star className="h-3 w-3" />}
              items={favorites}
              onPick={(name) => {
                onSelectApp?.(name);
                setOpen(false);
              }}
            />

            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[--k-muted]/70">
              Toutes les apps
            </div>
            <div className="max-h-[240px] overflow-auto px-2 pb-2">
              {filtered.map((a) => {
                const ident = getAppIdentity(a.name);
                const AppIcon = ident.icon;
                return (
                  <button
                    key={a.name}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] hover:bg-[--k-surface-2] transition",
                      a.name === currentApp && "bg-[--k-primary-2]"
                    )}
                    onClick={() => {
                      onSelectApp?.(a.name);
                      setOpen(false);
                    }}
                  >
                    <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg", ident.bg)}>
                      {AppIcon ? <AppIcon className={cn("h-4 w-4", ident.text)} /> : <span className={cn("text-[11px] font-bold", ident.text)}>{a.name.slice(0, 2).toUpperCase()}</span>}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{a.name}</div>
                      {a.description && (
                        <div className="text-xs text-[--k-muted] truncate">{a.description}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-[--k-border] px-3 py-1.5 text-[11px] text-[--k-muted]">
              <span>Cmd+K</span>
              <button className="hover:text-[--k-text] transition" onClick={() => setOpen(false)}>
                Fermer
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Section({ title, icon, items, onPick }) {
  if (!items?.length) return null;
  return (
    <div className="px-2 pb-1">
      <div className="flex items-center gap-1.5 px-1 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[--k-muted]/70">
        {icon} {title}
      </div>
      <div className="space-y-0.5">
        {items.map((name) => {
          const ident = getAppIdentity(name);
          return (
            <button
              key={name}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] hover:bg-[--k-surface-2] transition"
              onClick={() => onPick?.(name)}
            >
              <span className={cn("h-2 w-2 rounded-full", ident.dot)} />
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
