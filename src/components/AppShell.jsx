import React, { useEffect, useMemo, useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function AppShell({ currentApp, children, activeKey, hubMode = false }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("k_sidebar_collapsed") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("k_sidebar_collapsed", collapsed ? "1" : "0"); } catch {}
  }, [collapsed]);

  const apps = useMemo(() => ([
    { name: "Konitys Hub", badge: "Home", description: "Catalogue des apps" },
    { name: "Bornes Manager", description: "Parc, events, logs, diagnostics" },
    { name: "Antennes Selfizee", description: "Réseau & supervision" },
    { name: "Stock Manager", description: "Consommables & alertes" },
    { name: "Support", description: "Tickets & suivi" },
    { name: "Catalog IA", description: "Génération de contenus / visuels" },
  ]), []);

  return (
    <div className="min-h-screen bg-[--k-bg]">
      <Topbar
        currentApp={currentApp}
        apps={apps.filter(a => a.name !== "Konitys Hub")}
        favorites={["Bornes Manager", "Stock Manager"]}
        recents={["Antennes Selfizee", "Support"]}
        onGoHub={() => (window.location.href = "/")}
        onSelectApp={(name) => {
          const map = {
            "Bornes Manager": "/bornes",
            "Antennes Selfizee": "/antennes",
            "Stock Manager": "/stocks",
            "Support": "/support",
            "Catalog IA": "/catalog",
          };
          window.location.href = map[name] || "/";
        }}
        onPrimaryAction={() => alert("Primary action")}
        hubMode={hubMode}
      />
      {hubMode ? (
        <main className="min-h-[calc(100vh-48px)]">{children}</main>
      ) : (
        <div className="flex">
          <Sidebar
            appName={currentApp}
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
            activeKey={activeKey}
          />
          <main className="flex-1 min-w-0 p-5">{children}</main>
        </div>
      )}
    </div>
  );
}
