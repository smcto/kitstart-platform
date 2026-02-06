import React, { useMemo, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { cn } from "./ui/cn";
import { Home, Star, Clock } from "lucide-react";

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
          "h-10 min-w-[260px] rounded-2xl border border-[--k-border] bg-[--k-surface] px-3 text-left shadow-soft",
          "hover:bg-[--k-surface-2]"
        )}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between">
          <div className="leading-tight">
            <div className="text-sm font-semibold text-[--k-text]">
              Konitys / {currentApp} ▾
            </div>
          </div>
        </div>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute z-40 mt-2 w-[360px] rounded-2xl border border-[--k-border] bg-white shadow-soft">
            <div className="p-3">
              <Button
                className="w-full justify-start"
                variant="secondary"
                onClick={() => {
                  onGoHub?.();
                  setOpen(false);
                }}
              >
                <Home className="h-4 w-4" />
                Konitys Hub
              </Button>
              <div className="mt-3">
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher une app…"
                />
              </div>
            </div>

            <Section
              title="Récentes"
              icon={<Clock className="h-4 w-4" />}
              items={recents}
              onPick={(name) => {
                onSelectApp?.(name);
                setOpen(false);
              }}
            />

            <Section
              title="Favoris"
              icon={<Star className="h-4 w-4" />}
              items={favorites}
              onPick={(name) => {
                onSelectApp?.(name);
                setOpen(false);
              }}
              prefix="★ "
            />

            <div className="px-3 py-2 text-xs font-semibold text-[--k-muted]">
              Toutes les apps
            </div>
            <div className="max-h-[260px] overflow-auto p-2 pt-0">
              {filtered.map((a) => (
                <button
                  key={a.name}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[--k-surface-2]",
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
                      <span className="rounded-full border border-[--k-border] px-2 py-0.5 text-xs text-[--k-muted]">
                        {a.badge}
                      </span>
                    ) : null}
                  </div>
                  {a.description ? (
                    <div className="mt-0.5 text-xs text-[--k-muted]">
                      {a.description}
                    </div>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-[--k-border] px-3 py-2 text-xs text-[--k-muted]">
              <span>Astuce : Cmd+K (palette)</span>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Fermer
              </Button>
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
    <div className="px-3 pb-2">
      <div className="flex items-center gap-2 py-2 text-xs font-semibold text-[--k-muted]">
        {icon} {title}
      </div>
      <div className="space-y-1">
        {items.map((name) => (
          <button
            key={name}
            className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[--k-surface-2]"
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
