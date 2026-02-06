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
          "relative flex items-center gap-2.5 rounded-lg px-2.5 py-[6px] text-[13px] transition-all duration-150",
          collapsed ? "justify-center px-0" : "justify-start",
          active
            ? "font-semibold text-[--k-primary]"
            : "font-medium text-[--k-muted] hover:text-[--k-text]"
        )}
      >
        {/* Tiny left indicator */}
        {active && !collapsed && (
          <span className="absolute left-0 top-[7px] bottom-[7px] w-[2px] rounded-full bg-[--k-primary]" />
        )}
        <Icon className={cn(
          "h-[16px] w-[16px] shrink-0 transition",
          active ? "text-[--k-primary]" : "text-[--k-muted]/60"
        )} />
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
        "flex items-center gap-2.5 rounded-lg px-2.5 py-[6px] text-[13px] font-medium text-[--k-muted]/70 hover:text-[--k-muted] transition",
        collapsed && "justify-center px-0",
        onClick && "w-full"
      )}>
        <Icon className="h-[16px] w-[16px] shrink-0" />
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
        collapsed ? "w-[48px]" : "w-[200px]"
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 overflow-y-auto pt-4 pb-2">
          {resolvedSections.map((section, si) => (
            <div key={section.label} className={cn(si > 0 && "mt-4")}>
              {!collapsed && (
                <div className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-widest text-[--k-muted]/40">
                  {section.label}
                </div>
              )}
              {collapsed && si > 0 && (
                <div className="mx-2.5 mb-2 border-t border-[--k-border]/50" />
              )}
              <nav className="space-y-0.5 px-2">
                {section.items.map((it) => (
                  <NavItem key={it.key} item={it} />
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="px-2 pb-3 space-y-0.5">
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
