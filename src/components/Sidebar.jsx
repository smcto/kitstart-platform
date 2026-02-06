import React from "react";
import { cn } from "./ui/cn";
import { LayoutDashboard, Monitor, CalendarDays, Download, ReceiptText, Settings, ChevronsLeft, ChevronsRight, HelpCircle } from "lucide-react";

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
        "sticky top-12 h-[calc(100vh-48px)] shrink-0 border-r border-[--k-border] bg-white transition-all duration-200",
        collapsed ? "w-[52px]" : "w-[220px]"
      )}
    >
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          {!collapsed && (
            <div className="px-4 py-2">
              <div className="text-[11px] font-medium uppercase tracking-wider text-[--k-muted]">{appName}</div>
            </div>
          )}

          <nav className="space-y-0.5 px-2">
            {items.map((it) => {
              const Icon = it.icon;
              const active = it.key === activeKey;
              return (
                <a
                  key={it.key}
                  href={it.to}
                  title={collapsed ? it.label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition",
                    collapsed ? "justify-center px-0" : "justify-start",
                    active
                      ? "bg-[--k-primary-2] text-[--k-primary]"
                      : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active && "text-[--k-primary]")} />
                  {!collapsed && <span>{it.label}</span>}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="space-y-1 px-2">
          <a
            href="#"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition",
              collapsed && "justify-center px-0"
            )}
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Aide</span>}
          </a>
          <button
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition",
              collapsed && "justify-center px-0"
            )}
            onClick={onToggle}
          >
            {collapsed
              ? <ChevronsRight className="h-4 w-4 shrink-0" />
              : <><ChevronsLeft className="h-4 w-4 shrink-0" /><span>Réduire</span></>
            }
          </button>
        </div>
      </div>
    </aside>
  );
}
