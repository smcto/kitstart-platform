import React from "react";
import { cn } from "./ui/cn";
import { getAppIdentity } from "./appIdentity";
import {
  LayoutDashboard, Monitor, CalendarDays, Download, ReceiptText, Settings,
  ChevronsLeft, ChevronsRight, HelpCircle, BarChart3, AlertTriangle,
  Wifi, WifiOff, Map, RefreshCw, FileText, Bug,
  Radio, Users, Building, Package, ShoppingCart, ArrowLeftRight,
  Upload, Layers, Truck, Warehouse
} from "lucide-react";

const APP_SIDEBARS = {
  "Bornes Manager": [
    {
      label: "Général",
      items: [
        { key: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, to: "/bornes" },
        { key: "devices", label: "Bornes", icon: Monitor, to: "/bornes/list" },
        { key: "map", label: "Carte", icon: Map, to: "/bornes/carte" },
      ],
    },
    {
      label: "Suivi",
      items: [
        { key: "events", label: "Événements", icon: CalendarDays, to: "/events" },
        { key: "alerts", label: "Alertes", icon: AlertTriangle, to: "/events" },
        { key: "logs", label: "Logs", icon: ReceiptText, to: "/logs" },
        { key: "diagnostics", label: "Diagnostics", icon: Bug, to: "/logs" },
      ],
    },
    {
      label: "Actions",
      items: [
        { key: "downloads", label: "Téléchargements", icon: Download, to: "/downloads" },
        { key: "sync", label: "Synchronisation", icon: RefreshCw, to: "/downloads" },
        { key: "reports", label: "Rapports", icon: FileText, to: "/stats" },
      ],
    },
    {
      label: "Configuration",
      items: [
        { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
      ],
    },
  ],
  "Antennes Selfizee": [
    {
      label: "Général",
      items: [
        { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, to: "/antennes" },
        { key: "antennes", label: "Antennes", icon: Radio, to: "/antennes/list" },
        { key: "map", label: "Carte", icon: Map, to: "/antennes" },
      ],
    },
    {
      label: "Relations",
      items: [
        { key: "contacts", label: "Contacts", icon: Users, to: "/antennes/list" },
        { key: "sites", label: "Sites", icon: Building, to: "/antennes/list" },
      ],
    },
    {
      label: "Configuration",
      items: [
        { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
      ],
    },
  ],
  "Stock Manager": [
    {
      label: "Catalogue",
      items: [
        { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard, to: "/stocks" },
        { key: "produits", label: "Produits", icon: Package, to: "/stocks/produits" },
        { key: "fournisseurs", label: "Fournisseurs", icon: Truck, to: "/stocks/produits" },
        { key: "sites", label: "Sites", icon: Warehouse, to: "/stocks/produits" },
      ],
    },
    {
      label: "Inventaire",
      items: [
        { key: "stocks", label: "Stocks", icon: Layers, to: "/stocks/produits" },
        { key: "mouvements", label: "Mouvements", icon: ArrowLeftRight, to: "/stocks/produits" },
      ],
    },
    {
      label: "Commandes",
      items: [
        { key: "commandes", label: "Commandes", icon: ShoppingCart, to: "/stocks" },
        { key: "import", label: "Import / Export", icon: Upload, to: "/stocks" },
      ],
    },
    {
      label: "Configuration",
      items: [
        { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
      ],
    },
  ],
};

const DEFAULT_SECTIONS = [
  {
    label: "Navigation",
    items: [
      { key: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, to: "/" },
      { key: "stats", label: "Statistiques", icon: BarChart3, to: "/stats" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { key: "settings", label: "Paramètres", icon: Settings, to: "/settings" },
    ],
  },
];

function Tooltip({ label, children }) {
  return (
    <div className="group/tip relative">
      {children}
      <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 opacity-0 transition-opacity group-hover/tip:opacity-100">
        <div className="whitespace-nowrap rounded-lg bg-[--k-text] px-2.5 py-1.5 text-[12px] font-medium text-white shadow-lg">
          {label}
        </div>
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-[--k-text]" />
      </div>
    </div>
  );
}

export function Sidebar({ appName, collapsed, onToggle, activeKey, sections }) {
  const resolvedSections = sections || APP_SIDEBARS[appName] || DEFAULT_SECTIONS;
  const identity = getAppIdentity(appName);

  function NavItem({ item }) {
    const Icon = item.icon;
    const active = item.key === activeKey;
    const link = (
      <a
        href={item.to}
        className={cn(
          "group/nav relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-150",
          collapsed ? "justify-center px-0" : "justify-start",
          active
            ? "bg-[--k-primary] text-white shadow-sm shadow-[--k-primary]/25"
            : "text-[--k-sidebar-text] hover:bg-white hover:text-[--k-sidebar-text-active] hover:shadow-sm"
        )}
      >
        <span className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition",
          active
            ? "bg-white/20"
            : "bg-[--k-surface-2] group-hover/nav:bg-[--k-primary-2]"
        )}>
          <Icon className={cn(
            "h-[16px] w-[16px]",
            active ? "text-white" : "text-[--k-muted] group-hover/nav:text-[--k-primary]"
          )} />
        </span>
        {!collapsed && <span>{item.label}</span>}
      </a>
    );

    if (collapsed) {
      return <Tooltip label={item.label}>{link}</Tooltip>;
    }
    return link;
  }

  function BottomLink({ icon: Icon, label, href, onClick }) {
    const props = onClick ? { onClick } : { href };
    const inner = (
      <span className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-[--k-sidebar-text] hover:bg-white hover:text-[--k-sidebar-text-active] hover:shadow-sm transition",
        collapsed && "justify-center px-0",
        onClick && "w-full"
      )}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[--k-surface-2]">
          <Icon className="h-[16px] w-[16px] text-[--k-muted]" />
        </span>
        {!collapsed && <span>{label}</span>}
      </span>
    );

    const element = onClick
      ? <button {...props} className="w-full">{inner}</button>
      : <a {...props}>{inner}</a>;

    if (collapsed) {
      return <Tooltip label={label}>{element}</Tooltip>;
    }
    return element;
  }

  return (
    <aside
      className={cn(
        "sticky top-12 h-[calc(100vh-48px)] shrink-0 transition-all duration-200",
        collapsed ? "w-[64px]" : "w-[232px]"
      )}
    >
      <div className="flex h-full flex-col justify-between p-2">
        {/* Floating nav card */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-white/60 backdrop-blur-sm border border-[--k-border]/50 shadow-sm p-2">
          {resolvedSections.map((section, si) => (
            <div key={section.label} className={cn(si > 0 && "mt-3")}>
              {!collapsed && (
                <div className="mb-1.5 flex items-center gap-2 px-2">
                  <span className="h-px flex-1 bg-[--k-border]/60" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[--k-sidebar-section]">
                    {section.label}
                  </span>
                  <span className="h-px flex-1 bg-[--k-border]/60" />
                </div>
              )}
              {collapsed && si > 0 && (
                <div className="mx-2 mb-2 border-t border-[--k-border]/50" />
              )}
              <nav className="space-y-1">
                {section.items.map((it) => (
                  <NavItem key={it.key} item={it} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom actions — outside the card */}
        <div className="mt-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-[--k-border]/50 shadow-sm p-2 space-y-1">
          <BottomLink icon={HelpCircle} label="Aide" href="#" />
          <BottomLink
            icon={collapsed ? ChevronsRight : ChevronsLeft}
            label={collapsed ? "Déplier" : "Réduire"}
            onClick={onToggle}
          />
        </div>
      </div>
    </aside>
  );
}
