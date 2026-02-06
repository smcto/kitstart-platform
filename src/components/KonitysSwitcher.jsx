import React, { useMemo, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "./ui/cn";
import { Home, Star, Clock, ChevronDown } from "lucide-react";

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
        <span className="text-[13px] font-semibold text-[--k-text]">
          Konitys
        </span>
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
          <div className="absolute z-40 mt-1 w-[320px] rounded-xl border border-[--k-border] bg-white shadow-lg shadow-black/5">
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
              prefix="★ "
            />

            <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[--k-muted]">
              Toutes les apps
            </div>
            <div className="max-h-[220px] overflow-auto px-2 pb-2">
              {filtered.map((a) => (
                <button
                  key={a.name}
                  className={cn(
                    "w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] hover:bg-[--k-surface-2] transition",
                    a.name === currentApp && "bg-[--k-primary-2]"
                  )}
                  onClick={() => {
                    onSelectApp?.(a.name);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{a.name}</div>
                    {a.badge ? (
                      <span className="rounded-md bg-[--k-surface-2] px-1.5 py-0.5 text-[11px] text-[--k-muted]">
                        {a.badge}
                      </span>
                    ) : null}
                  </div>
                  {a.description ? (
                    <div className="text-xs text-[--k-muted]">
                      {a.description}
                    </div>
                  ) : null}
                </button>
              ))}
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

function Section({ title, icon, items, onPick, prefix = "" }) {
  if (!items?.length) return null;
  return (
    <div className="px-2 pb-1">
      <div className="flex items-center gap-1.5 px-1 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[--k-muted]">
        {icon} {title}
      </div>
      <div className="space-y-0.5">
        {items.map((name) => (
          <button
            key={name}
            className="w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] hover:bg-[--k-surface-2] transition"
            onClick={() => onPick?.(name)}
          >
            {prefix}
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
