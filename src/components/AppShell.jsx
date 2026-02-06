import React, { useEffect, useMemo, useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function AppShell({ currentApp, children, activeKey }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("k_sidebar_collapsed") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("k_sidebar_collapsed", collapsed ? "1" : "0"); } catch {}
  }, [collapsed]);

  const apps = useMemo(() => ([
    { name: "Konitys Hub", badge: "Home", description: "Catalogue des apps" },
    { name: "Bornes Manager", description: "Parc, events, logs, diagnostics" },
    { name: "Antennes", description: "Réseau & supervision" },
    { name: "Stocks", description: "Consommables & alertes" },
    { name: "Support", description: "Tickets & suivi" },
    { name: "Catalog IA", description: "Génération de contenus / visuels" },
  ]), []);

  return (
    <div className="min-h-screen bg-[--k-bg]">
      <Topbar
        currentApp={currentApp}
        apps={apps.filter(a => a.name !== "Konitys Hub")}
        favorites={["Bornes Manager", "Stocks"]}
        recents={["Antennes", "Support"]}
        onGoHub={() => (window.location.href = "/")}
        onSelectApp={(name) => {
          // Exemple : mapping simple. À remplacer par ta logique de route / domaine.
          const map = {
            "Bornes Manager": "/bornes",
            "Antennes": "/antennes",
            "Stocks": "/stocks",
            "Support": "/support",
            "Catalog IA": "/catalog",
          };
          window.location.href = map[name] || "/";
        }}
        onPrimaryAction={() => alert("Primary action")}
      />
      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar
          appName={currentApp}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          activeKey={activeKey}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
