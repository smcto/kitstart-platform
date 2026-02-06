import React from "react";
import { cn } from "./ui/cn";
import {
  LayoutDashboard, Monitor, CalendarDays, Download, ReceiptText, Settings,
  ChevronsLeft, ChevronsRight, HelpCircle, BarChart3, Activity, Users
} from "lucide-react";

const DEFAULT_SECTIONS = [
  {
    label: "Principal",
    items: [
      { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/" },
      { key: "devices", label: "Bornes", icon: Monitor, to: "/bornes" },
      { key: "events", label: "Événements", icon: CalendarDays, to: "/events" },
    ],
  },
  {
    label: "Données",
    items: [
      { key: "downloads", label: "Téléchargements", icon: Download, to: "/downloads" },
      { key: "logs", label: "Logs", icon: ReceiptText, to: "/logs" },
      { key: "stats", label: "Statistiques", icon: BarChart3, to: "/stats" },
    ],
  },
  {
    label: "Système",
    items: [
      { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
    ],
  },
];

export function Sidebar({ appName, collapsed, onToggle, activeKey, sections = DEFAULT_SECTIONS }) {
  return (
    <aside
      className={cn(
        "sticky top-12 h-[calc(100vh-48px)] shrink-0 border-r border-[--k-border] bg-white transition-all duration-200",
        collapsed ? "w-[52px]" : "w-[220px]"
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 overflow-y-auto py-3">
          {sections.map((section, si) => (
            <div key={section.label} className={cn(si > 0 && "mt-4")}>
              {!collapsed && (
                <div className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-[--k-muted]/70">
                  {section.label}
                </div>
              )}
              {collapsed && si > 0 && (
                <div className="mx-3 mb-2 border-t border-[--k-border]" />
              )}
              <nav className="space-y-0.5 px-2">
                {section.items.map((it) => {
                  const Icon = it.icon;
                  const active = it.key === activeKey;
                  return (
                    <a
                      key={it.key}
                      href={it.to}
                      title={collapsed ? it.label : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium transition",
                        collapsed ? "justify-center px-0" : "justify-start",
                        active
                          ? "bg-[--k-primary]/[0.08] text-[--k-primary]"
                          : "text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text]"
                      )}
                    >
                      <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-[--k-primary]" : "")} />
                      {!collapsed && <span>{it.label}</span>}
                      {active && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[--k-primary]" />
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="border-t border-[--k-border] px-2 py-2 space-y-0.5">
          <a
            href="#"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition",
              collapsed && "justify-center px-0"
            )}
          >
            <HelpCircle className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>Aide</span>}
          </a>
          <button
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] font-medium text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition",
              collapsed && "justify-center px-0"
            )}
            onClick={onToggle}
          >
            {collapsed
              ? <ChevronsRight className="h-[18px] w-[18px] shrink-0" />
              : <><ChevronsLeft className="h-[18px] w-[18px] shrink-0" /><span>Réduire</span></>
            }
          </button>
        </div>
      </div>
    </aside>
  );
}
