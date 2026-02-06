import React, { useState } from "react";
import { cn } from "./ui/cn";
import { Home, ChevronDown, Check } from "lucide-react";
import { getAppIdentity } from "./appIdentity";

export function KonitysSwitcher({
  currentApp,
  apps,
  onSelectApp,
  onGoHub,
}) {
  const [open, setOpen] = useState(false);
  const identity = getAppIdentity(currentApp);
  const AppIcon = identity.icon;

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
          <div className="absolute z-40 mt-1 w-[260px] rounded-xl border border-[--k-border] bg-white shadow-lg shadow-black/5 py-1">

            {/* Hub link */}
            <button
              className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition"
              onClick={() => { onGoHub?.(); setOpen(false); }}
            >
              <Home className="h-4 w-4" />
              Konitys Hub
            </button>

            <div className="mx-3 my-1 border-t border-[--k-border]" />

            {/* App list */}
            <div className="py-0.5">
              {apps.map((a) => {
                const ident = getAppIdentity(a.name);
                const AppIcon = ident.icon;
                const isCurrent = a.name === currentApp;
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
                      {AppIcon
                        ? <AppIcon className={cn("h-3.5 w-3.5", ident.text)} />
                        : <span className={cn("text-[10px] font-bold", ident.text)}>{a.name.slice(0, 2)}</span>
                      }
                    </span>
                    <span className="flex-1 truncate">{a.name}</span>
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
