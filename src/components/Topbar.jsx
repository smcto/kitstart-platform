import React from "react";
import { Button } from "./ui/Button";
import { Bell, HelpCircle } from "lucide-react";
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
    <header className="sticky top-0 z-20 border-b border-[--k-border] bg-white">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4">
        <KonitysSwitcher
          currentApp={currentApp}
          apps={apps}
          favorites={favorites}
          recents={recents}
          onSelectApp={onSelectApp}
          onGoHub={onGoHub}
        />

        <div className="flex-1" />

        <Button variant="ghost" className="h-10 w-10 px-0">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="h-10 w-10 px-0">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <button className="h-10 rounded-2xl border border-[--k-border] bg-[--k-surface] px-3 text-sm hover:bg-[--k-surface-2]">
          <span className="font-semibold">SM</span>
          <span className="ml-2 text-[--k-muted]">Seb ▾</span>
        </button>

        <Button variant="primary" onClick={onPrimaryAction}>
          Primary action
        </Button>
      </div>
    </header>
  );
}
