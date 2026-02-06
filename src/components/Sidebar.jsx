import React from "react";
import { cn } from "./ui/cn";
import { LayoutDashboard, Monitor, CalendarDays, Download, ReceiptText, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { key: "devices", label: "Bornes", icon: Monitor, to: "/bornes" },
  { key: "events", label: "Événements", icon: CalendarDays, to: "/events" },
  { key: "downloads", label: "Téléchargements", icon: Download, to: "/downloads" },
  { key: "logs", label: "Logs", icon: ReceiptText, to: "/logs" },
  { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
];

export function Sidebar({ appName, collapsed, onToggle, activeKey, items = DEFAULT_ITEMS }) {
  return (
    <aside
      className={cn(
        "h-[calc(100vh-56px)] shrink-0 border-r border-[--k-border] bg-white",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className={cn("flex h-full flex-col p-2", collapsed ? "gap-2" : "gap-3")}>
        <div className={cn("rounded-2xl border border-[--k-border] bg-[--k-surface] px-3 py-3", collapsed && "px-2")}>
          <div className={cn("text-xs font-semibold text-[--k-muted]", collapsed && "hidden")}>Navigation</div>
          <div className={cn("mt-1 text-sm font-semibold", collapsed && "hidden")}>{appName}</div>
          <button
            className={cn(
              "mt-2 flex h-9 w-full items-center justify-center rounded-xl border border-[--k-border] bg-white hover:bg-[--k-surface-2]",
              !collapsed && "justify-start px-2"
            )}
            onClick={onToggle}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="ml-2 text-xs text-[--k-muted]">Réduire</span>
              </>
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {items.map((it) => {
            const Icon = it.icon;
            const active = it.key === activeKey;
            return (
              <a
                key={it.key}
                href={it.to}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition",
                  collapsed ? "justify-center px-0" : "justify-start",
                  active
                    ? "border-[--k-primary-border] bg-[--k-primary-2] text-[--k-text]"
                    : "border-transparent hover:bg-[--k-surface-2]"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className={cn(collapsed && "hidden")}>{it.label}</span>
              </a>
            );
          })}
        </nav>

        <div className={cn("rounded-2xl border border-[--k-border] bg-[--k-surface] p-3", collapsed && "p-2")}>
          <div className={cn("text-xs font-semibold text-[--k-muted]", collapsed && "hidden")}>Aide</div>
          <a
            href="#"
            className={cn(
              "mt-2 flex items-center justify-center rounded-xl border border-[--k-border] bg-white px-3 py-2 text-sm hover:bg-[--k-surface-2]",
              !collapsed && "justify-start"
            )}
          >
            <span className={cn(collapsed && "hidden")}>Support</span>
            <span className={cn(!collapsed && "hidden")}>?</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
