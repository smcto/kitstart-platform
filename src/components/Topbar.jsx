import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/Button";
import { Bell, HelpCircle, Search, User, LogOut, Settings, CreditCard, ChevronDown, Check, Inbox, X, ArrowRight } from "lucide-react";
import { KonitysSwitcher } from "./KonitysSwitcher";
import { cn } from "./ui/cn";
import { getAppIdentity } from "./appIdentity";

const SEARCH_SUGGESTIONS = [
  { label: "Borne S332", desc: "Plérin — Bornes Manager", to: "/bornes/list" },
  { label: "Antenne Rennes Centre", desc: "ANT-001 — Antennes Selfizee", to: "/antennes/list" },
  { label: "Câble USB-C 2m", desc: "PRD-001 — Stock Manager", to: "/stocks/produits" },
  { label: "Paramètres", desc: "Configuration", to: "/settings" },
  { label: "Export CSV", desc: "Bornes Manager", to: "/bornes/list" },
];

export function Topbar({
  currentApp,
  apps,
  onSelectApp,
  onGoHub,
  hubMode,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const filteredResults = searchQ.trim()
    ? SEARCH_SUGGESTIONS.filter(s => s.label.toLowerCase().includes(searchQ.toLowerCase()) || s.desc.toLowerCase().includes(searchQ.toLowerCase()))
    : SEARCH_SUGGESTIONS;

  return (
    <header className="sticky top-0 z-20 border-b border-[--k-border] bg-white/95 backdrop-blur-sm">
      <div className="flex h-12 items-center gap-3 px-4">
        {hubMode ? (
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold tracking-tight text-[--k-text]">KONITYS</span>
            <span className="text-[13px] text-[--k-muted]">Platform Hub</span>
          </div>
        ) : (
          <KonitysSwitcher
            currentApp={currentApp}
            apps={apps}
            onSelectApp={onSelectApp}
            onGoHub={onGoHub}
          />
        )}

        <div className="flex-1" />

        {/* Search */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition"
          onClick={() => { setSearchOpen(true); setNotifOpen(false); setAccountOpen(false); }}
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        {searchOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" onClick={() => { setSearchOpen(false); setSearchQ(""); }} />
            <div className="fixed left-1/2 top-[60px] z-50 w-[480px] -translate-x-1/2 rounded-xl border border-[--k-border] bg-white shadow-xl shadow-black/10">
              <div className="flex items-center gap-2.5 border-b border-[--k-border] px-4 py-3">
                <Search className="h-4 w-4 text-[--k-muted] shrink-0" />
                <input
                  ref={searchRef}
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Rechercher partout..."
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[--k-muted]/50"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQ(""); }} className="text-[--k-muted] hover:text-[--k-text]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[300px] overflow-auto py-1">
                {filteredResults.length > 0 ? filteredResults.map((s, i) => (
                  <a
                    key={i}
                    href={s.to}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--k-surface-2] transition"
                    onClick={() => { setSearchOpen(false); setSearchQ(""); }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-[--k-text]">{s.label}</div>
                      <div className="text-[11px] text-[--k-muted]">{s.desc}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-[--k-muted]/40 shrink-0" />
                  </a>
                )) : (
                  <div className="px-4 py-6 text-center text-[13px] text-[--k-muted]">Aucun résultat pour "{searchQ}"</div>
                )}
              </div>
              <div className="border-t border-[--k-border] px-4 py-2 text-[11px] text-[--k-muted]">
                <kbd className="rounded bg-[--k-surface-2] px-1.5 py-0.5 text-[10px] font-medium">Esc</kbd> pour fermer
              </div>
            </div>
          </>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition"
            onClick={() => { setNotifOpen(v => !v); setAccountOpen(false); }}
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 z-40 mt-2 w-[340px] rounded-xl border border-[--k-border] bg-white shadow-lg shadow-black/5">
                <div className="flex items-center justify-between border-b border-[--k-border] px-4 py-3">
                  <span className="text-[14px] font-semibold">Notifications</span>
                  <button className="text-xs text-[--k-primary] hover:underline">Tout marquer lu</button>
                </div>
                <div className="max-h-[320px] overflow-auto">
                  <NotifItem
                    title="Borne S332 hors-ligne"
                    desc="Plérin — dernière sync il y a 2h"
                    time="il y a 5 min"
                    unread
                  />
                  <NotifItem
                    title="Export terminé"
                    desc="bornes_export_2026-02.csv est prêt"
                    time="il y a 1h"
                    unread
                  />
                  <NotifItem
                    title="Mise à jour firmware"
                    desc="v3.2.1 disponible pour 12 bornes"
                    time="hier"
                  />
                  <NotifItem
                    title="Nouveau ticket support"
                    desc="#1842 — Problème affichage borne Lyon"
                    time="hier"
                  />
                </div>
                <div className="border-t border-[--k-border] px-4 py-2.5 text-center">
                  <button className="text-[13px] font-medium text-[--k-primary] hover:underline">Voir toutes les notifications</button>
                </div>
              </div>
            </>
          )}
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        <div className="mx-0.5 h-6 w-px bg-[--k-border]" />

        {/* Account */}
        <div className="relative">
          <button
            className="flex h-9 items-center gap-2 rounded-lg px-2 hover:bg-[--k-surface-2] transition"
            onClick={() => { setAccountOpen(v => !v); setNotifOpen(false); }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-[11px] font-semibold text-white">SM</span>
            <span className="text-[13px] font-medium text-[--k-text]">Seb</span>
            <ChevronDown className="h-3 w-3 text-[--k-muted]" />
          </button>
          {accountOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setAccountOpen(false)} />
              <div className="absolute right-0 z-40 mt-2 w-[240px] rounded-xl border border-[--k-border] bg-white shadow-lg shadow-black/5 py-1">
                <div className="px-3 py-2.5 border-b border-[--k-border]">
                  <div className="text-[13px] font-semibold text-[--k-text]">Seb Martin</div>
                  <div className="text-xs text-[--k-muted]">seb@konitys.com</div>
                </div>
                <div className="py-1">
                  <AccountItem icon={User} label="Mon profil" />
                  <AccountItem icon={Settings} label="Préférences" />
                  <AccountItem icon={CreditCard} label="Abonnement" />
                </div>
                <div className="border-t border-[--k-border] py-1">
                  <AccountItem icon={LogOut} label="Déconnexion" danger />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function NotifItem({ title, desc, time, unread }) {
  return (
    <button className={cn(
      "flex w-full gap-3 px-4 py-3 text-left hover:bg-[--k-surface-2] transition",
      unread && "bg-blue-50/40"
    )}>
      <div className="mt-0.5">
        {unread
          ? <span className="flex h-2 w-2 rounded-full bg-[--k-primary]" />
          : <span className="flex h-2 w-2 rounded-full bg-transparent" />
        }
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-[--k-text]">{title}</div>
        <div className="text-xs text-[--k-muted] truncate">{desc}</div>
        <div className="mt-1 text-[11px] text-[--k-muted]/60">{time}</div>
      </div>
    </button>
  );
}

function AccountItem({ icon: Icon, label, danger }) {
  return (
    <button className={cn(
      "flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium transition hover:bg-[--k-surface-2]",
      danger ? "text-[--k-danger]" : "text-[--k-text]"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
