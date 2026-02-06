import React from "react";
import { Button } from "./ui/Button";
import { Bell, HelpCircle, Search } from "lucide-react";
import { KonitysSwitcher } from "./KonitysSwitcher";

export function Topbar({
  currentApp,
  apps,
  favorites,
  recents,
  onSelectApp,
  onGoHub,
  onPrimaryAction,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[--k-border] bg-white/95 backdrop-blur-sm">
      <div className="flex h-12 items-center gap-2 px-4">
        <KonitysSwitcher
          currentApp={currentApp}
          apps={apps}
          favorites={favorites}
          recents={recents}
          onSelectApp={onSelectApp}
          onGoHub={onGoHub}
        />

        <div className="flex-1" />

        <Button variant="ghost" className="h-8 w-8 px-0">
          <Search className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <Bell className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <HelpCircle className="h-3.5 w-3.5" />
        </Button>

        <div className="mx-1 h-5 w-px bg-[--k-border]" />

        <button className="flex h-8 items-center gap-2 rounded-lg px-2 text-sm hover:bg-[--k-surface-2] transition">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[--k-primary] text-[10px] font-semibold text-white">SM</span>
          <span className="text-xs text-[--k-muted]">Seb</span>
        </button>
      </div>
    </header>
  );
}
