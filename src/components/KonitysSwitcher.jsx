import React, { useState } from "react";
import { cn } from "./ui/cn";
import { Home, ChevronDown, Check, Briefcase, Wrench } from "lucide-react";
import { getAppIdentity } from "./appIdentity";

const TABS = [
  { key: "metier", label: "Apps métiers", icon: Briefcase },
  { key: "utilitaire", label: "Utilitaires", icon: Wrench },
];

export function KonitysSwitcher({
  currentApp,
  apps,
  onSelectApp,
  onGoHub,
  hubMode,
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("metier");
  const identity = getAppIdentity(currentApp);
  const AppIcon = identity.icon;
  const isHub = hubMode || currentApp === "Konitys Hub";

  const metierApps = apps.filter(a => a.category === "metier");
  const utilitaireApps = apps.filter(a => a.category === "utilitaire");
  const visibleApps = tab === "metier" ? metierApps : utilitaireApps;

  return (
    <div className="relative">
      <button
        className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-left transition hover:bg-[--k-surface-2]"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-[14px] font-bold tracking-tight text-[--k-text]">KONITYS</span>
        <span className="text-[--k-muted]/30">/</span>
        {AppIcon && (
          <span className={cn("flex h-6 w-6 items-center justify-center rounded-md", identity.bg)}>
            <AppIcon className={cn("h-4 w-4", identity.text)} />
          </span>
        )}
        <span className={cn("text-[14px] font-semibold", identity.text)}>{currentApp}</span>
        <ChevronDown className="h-3.5 w-3.5 text-[--k-muted]" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute z-40 mt-1 w-[300px] rounded-2xl border border-[--k-border] bg-white shadow-lg shadow-black/8 overflow-hidden">

            {/* Hub link */}
            <button
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition",
                isHub
                  ? "bg-[--k-surface-2] font-semibold text-[--k-text]"
                  : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
              )}
              onClick={() => { onGoHub?.(); setOpen(false); }}
            >
              <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md", isHub ? "bg-blue-50" : "")}>
                <Home className={cn("h-4 w-4", isHub ? "text-blue-600" : "")} />
              </span>
              <span className="flex-1">Konitys Hub</span>
              {isHub && <Check className="h-3.5 w-3.5 text-[--k-primary] shrink-0" />}
            </button>

            <div className="mx-3 my-1 border-t border-[--k-border]" />

            {/* Tab switcher */}
            <div className="px-3 pt-1 pb-1">
              <div className="flex gap-1 rounded-lg bg-[--k-surface-2] p-0.5">
                {TABS.map(t => {
                  const TIcon = t.icon;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] font-semibold transition",
                        tab === t.key
                          ? "bg-white text-[--k-text] shadow-sm"
                          : "text-[--k-muted] hover:text-[--k-text]"
                      )}
                    >
                      <TIcon className="h-3 w-3" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* App list */}
            <div className="py-0.5 max-h-[320px] overflow-auto">
              {visibleApps.map((a) => {
                const ident = getAppIdentity(a.name);
                const AIcon = ident.icon;
                const isCurrent = a.name === currentApp && !isHub;
                return (
                  <button
                    key={a.name}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition",
                      isCurrent
                        ? "bg-[--k-surface-2] font-semibold text-[--k-text]"
                        : "text-[--k-text] hover:bg-[--k-surface-2]"
                    )}
                    onClick={() => { onSelectApp?.(a.name); setOpen(false); }}
                  >
                    <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md", ident.bg)}>
                      {AIcon
                        ? <AIcon className={cn("h-3.5 w-3.5", ident.text)} />
                        : <span className={cn("text-[10px] font-bold", ident.text)}>{a.name.slice(0, 2)}</span>
                      }
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{a.name}</div>
                      {a.description && <div className="text-[10px] text-[--k-muted] truncate">{a.description}</div>}
                    </div>
                    {isCurrent && <Check className="h-3.5 w-3.5 text-[--k-primary] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
