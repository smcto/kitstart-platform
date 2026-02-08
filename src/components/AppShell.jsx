import React, { useEffect, useMemo, useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function AppShell({ currentApp, children, activeKey, hubMode = false }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem("k_sidebar_collapsed") === "1"; } catch { return false; }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("k_sidebar_collapsed", collapsed ? "1" : "0"); } catch {}
  }, [collapsed]);

  const apps = useMemo(() => ([
    { name: "Konitys Hub", badge: "Home", description: "Catalogue des apps", category: "metier" },
    { name: "Events Manager", description: "Événements, planning & logistique", category: "metier" },
    { name: "Bornes Manager", description: "Parc, events, logs, diagnostics", category: "metier" },
    { name: "Antennes Selfizee", description: "Réseau & supervision", category: "metier" },
    { name: "Stock Manager", description: "Consommables & alertes", category: "metier" },
    { name: "Support", description: "Tickets & suivi", category: "metier" },
    { name: "Catalog IA", description: "Génération de contenus / visuels", category: "metier" },
    { name: "Emailing", description: "Campagnes email & templates", category: "utilitaire" },
    { name: "Envoi SMS", description: "Notifications & rappels SMS", category: "utilitaire" },
    { name: "Détourage Image", description: "Suppression de fond automatique", category: "utilitaire" },
    { name: "Étiquettes UPS", description: "Génération de bordereaux d'envoi", category: "utilitaire" },
    { name: "QR Codes", description: "Génération de QR codes personnalisés", category: "utilitaire" },
    { name: "Compresseur", description: "Compression & redimensionnement d'images", category: "utilitaire" },
    { name: "Convertisseur PDF", description: "Conversion de fichiers en PDF", category: "utilitaire" },
    { name: "Calculatrice Devis", description: "Calcul rapide HT / TTC / marges", category: "utilitaire" },
    { name: "Notes", description: "Prise de notes & mémos rapides", category: "utilitaire" },
  ]), []);

  return (
    <div className="min-h-screen bg-[--k-bg]">
      <Topbar
        currentApp={currentApp}
        apps={apps.filter(a => a.name !== "Konitys Hub")}
        onGoHub={() => (window.location.href = "/")}
        onToggleMobileMenu={() => setMobileMenuOpen(v => !v)}
        onSelectApp={(name) => {
          const map = {
            "Events Manager": "/events",
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
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar
              appName={currentApp}
              collapsed={collapsed}
              onToggle={() => setCollapsed((v) => !v)}
              activeKey={activeKey}
            />
          </div>
          {/* Mobile sidebar overlay */}
          {mobileMenuOpen && (
            <>
              <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
              <div className="fixed left-0 top-12 z-40 h-[calc(100vh-48px)] md:hidden">
                <Sidebar
                  appName={currentApp}
                  collapsed={false}
                  onToggle={() => setMobileMenuOpen(false)}
                  activeKey={activeKey}
                />
              </div>
            </>
          )}
          <main className="flex-1 min-w-0 p-3 md:p-5">{children}</main>
        </div>
      )}
    </div>
  );
}
