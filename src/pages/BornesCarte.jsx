import React, { useState } from "react";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/PageHeader";
import { cn } from "../components/ui/cn";
import { Input } from "../components/ui/Input";
import { Search, MapPin, RefreshCw, Maximize2 } from "lucide-react";

/* ── Mock parc data ───────────────────────────────── */

const PARCS = [
  {
    name: "Parc locatif Selfizee",
    total: 360,
    types: [
      { label: "Classik",          count: 107, color: "bg-pink-400" },
      { label: "Spherik",          count: 246, color: "bg-pink-500" },
      { label: "Spherik +",        count: 1,   color: "bg-fuchsia-400" },
      { label: "Prestige DS620",   count: 0,   color: "bg-purple-400" },
      { label: "Prestige QW410",   count: 0,   color: "bg-purple-500" },
      { label: "Prestige DS620+",  count: 6,   color: "bg-yellow-600" },
      { label: "Prestige QW410+",  count: 0,   color: "bg-emerald-400" },
    ],
  },
  {
    name: "Loc financières",
    total: 262,
    types: [
      { label: "Classik",          count: 82,  color: "bg-pink-400" },
      { label: "Spherik",          count: 154, color: "bg-pink-500" },
      { label: "Spherik +",        count: 5,   color: "bg-fuchsia-400" },
      { label: "Prestige DS620",   count: 4,   color: "bg-purple-400" },
      { label: "Prestige QW410",   count: 7,   color: "bg-purple-500" },
      { label: "Prestige DS620+",  count: 7,   color: "bg-yellow-600" },
      { label: "Prestige QW410+",  count: 3,   color: "bg-emerald-400" },
    ],
  },
  {
    name: "Longues durées",
    total: 14,
    types: [
      { label: "Classik",  count: 5, color: "bg-pink-400" },
      { label: "Spherik",  count: 9, color: "bg-pink-500" },
    ],
  },
];

/* Simulated map pins (x%, y% on the France-shaped div) */
const MAP_PINS = [
  { x: 18, y: 28, count: 1 },  { x: 22, y: 32, count: 1 },
  { x: 20, y: 40, count: 8 },  { x: 25, y: 38, count: 125 },
  { x: 28, y: 36, count: 1 },  { x: 32, y: 30, count: 1 },
  { x: 38, y: 25, count: 1 },  { x: 42, y: 22, count: 1 },
  { x: 35, y: 40, count: 1 },  { x: 30, y: 45, count: 1 },
  { x: 25, y: 50, count: 1 },  { x: 22, y: 55, count: 1 },
  { x: 28, y: 58, count: 2 },  { x: 35, y: 55, count: 1 },
  { x: 40, y: 48, count: 1 },  { x: 48, y: 28, count: 1 },
  { x: 55, y: 22, count: 1 },  { x: 60, y: 25, count: 2 },
  { x: 65, y: 20, count: 1 },  { x: 70, y: 22, count: 1 },
  { x: 58, y: 35, count: 1 },  { x: 52, y: 40, count: 2 },
  { x: 48, y: 45, count: 1 },  { x: 55, y: 50, count: 1 },
  { x: 62, y: 48, count: 1 },  { x: 68, y: 42, count: 1 },
  { x: 72, y: 38, count: 2 },  { x: 75, y: 55, count: 1 },
  { x: 80, y: 50, count: 1 },  { x: 78, y: 60, count: 1 },
  { x: 82, y: 65, count: 1 },  { x: 70, y: 68, count: 1 },
  { x: 60, y: 65, count: 1 },  { x: 50, y: 60, count: 2 },
  { x: 45, y: 68, count: 1 },  { x: 38, y: 72, count: 1 },
  { x: 55, y: 75, count: 1 },  { x: 65, y: 80, count: 1 },
  { x: 75, y: 78, count: 1 },  { x: 80, y: 72, count: 2 },
];

/* ── Page ──────────────────────────────────────────── */

export default function BornesCarte() {
  const [filters, setFilters] = useState(() => {
    const m = {};
    PARCS.forEach(p => {
      m[p.name] = true;
      p.types.forEach(t => { m[`${p.name}::${t.label}`] = true; });
    });
    return m;
  });

  function toggleParc(parcName) {
    setFilters(f => {
      const newVal = !f[parcName];
      const next = { ...f, [parcName]: newVal };
      const parc = PARCS.find(p => p.name === parcName);
      parc?.types.forEach(t => { next[`${parcName}::${t.label}`] = newVal; });
      return next;
    });
  }

  function toggleType(parcName, typeLabel) {
    setFilters(f => ({ ...f, [`${parcName}::${typeLabel}`]: !f[`${parcName}::${typeLabel}`] }));
  }

  const totalDisplayed = PARCS.reduce((sum, p) => {
    if (!filters[p.name]) return sum;
    return sum + p.types.reduce((s, t) => s + (filters[`${p.name}::${t.label}`] ? t.count : 0), 0);
  }, 0);

  return (
    <AppShell currentApp="Bornes Manager" activeKey="map">
      <div className="flex h-[calc(100vh-48px-40px)] gap-0 -m-5">

        {/* Left filter panel */}
        <div className="w-[260px] shrink-0 border-r border-[--k-border] bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-[--k-border] px-4 py-3 z-10">
            <div className="text-[13px] font-semibold text-[--k-text]">
              Borne(s) affichée(s) : <span className="tabular-nums">{totalDisplayed}</span>
            </div>
          </div>

          <div className="p-3 space-y-4">
            {PARCS.map(parc => (
              <div key={parc.name}>
                {/* Parc header */}
                <label className="flex items-center gap-2 cursor-pointer mb-1.5">
                  <input
                    type="checkbox"
                    checked={!!filters[parc.name]}
                    onChange={() => toggleParc(parc.name)}
                    className="h-4 w-4 rounded border-[--k-border] text-[--k-primary] accent-[--k-primary]"
                  />
                  <span className="flex-1 text-[13px] font-semibold text-[--k-text]">{parc.name}</span>
                  <span className="text-[13px] tabular-nums text-[--k-text] font-medium">{parc.total}</span>
                </label>

                {/* Types */}
                <div className="ml-4 space-y-1">
                  {parc.types.map(t => (
                    <label key={t.label} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!filters[`${parc.name}::${t.label}`]}
                        onChange={() => toggleType(parc.name, t.label)}
                        className="h-3.5 w-3.5 rounded border-[--k-border] accent-[--k-primary]"
                      />
                      <span className="flex-1 text-[12px] text-[--k-text]">{t.label}</span>
                      <span className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white",
                        t.color
                      )}>
                        {t.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right map area */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Filter bar above map */}
          <div className="flex items-center gap-2 border-b border-[--k-border] bg-white px-4 py-2">
            <div className="relative flex-1 max-w-[160px]">
              <input placeholder="Lieu" className="w-full rounded-lg border border-[--k-border] bg-white px-3 py-1.5 text-[12px] outline-none focus:border-[--k-primary]/40" />
            </div>
            <input placeholder="Num. borne" className="w-[120px] rounded-lg border border-[--k-border] bg-white px-3 py-1.5 text-[12px] outline-none focus:border-[--k-primary]/40" />
            <input placeholder="Client" className="w-[120px] rounded-lg border border-[--k-border] bg-white px-3 py-1.5 text-[12px] outline-none focus:border-[--k-primary]/40" />
            <select className="rounded-lg border border-[--k-border] bg-white px-3 py-1.5 text-[12px] text-[--k-muted] outline-none">
              <option>Groupe de client</option>
            </select>
            <select className="rounded-lg border border-[--k-border] bg-white px-3 py-1.5 text-[12px] text-[--k-muted] outline-none">
              <option>Secteur d'activité</option>
            </select>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[--k-border] text-[--k-muted] hover:bg-[--k-surface-2] transition">
              <Search className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[--k-border] text-[--k-muted] hover:bg-[--k-surface-2] transition">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Map */}
          <div className="relative flex-1 bg-gradient-to-br from-[#e8f0fe] to-[#f0f4ff] overflow-hidden">
            {/* Simulated map background */}
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }} />

            {/* Map pins */}
            {MAP_PINS.map((pin, i) => {
              const size = pin.count > 50 ? 40 : pin.count > 5 ? 32 : 24;
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: `${pin.x}%`,
                    top: `${pin.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full text-white font-bold shadow-md border-2 border-white",
                      pin.count > 50 ? "bg-pink-500" : pin.count > 5 ? "bg-pink-400" : "bg-pink-400/90",
                    )}
                    style={{ width: size, height: size, fontSize: pin.count > 50 ? 12 : 10 }}
                  >
                    {pin.count}
                  </div>
                </div>
              );
            })}

            {/* Some city labels */}
            {[
              { name: "Brest", x: 14, y: 35 },
              { name: "Rennes", x: 25, y: 35 },
              { name: "Nantes", x: 24, y: 52 },
              { name: "Paris", x: 52, y: 28 },
              { name: "Lyon", x: 65, y: 55 },
              { name: "Marseille", x: 68, y: 75 },
              { name: "Bordeaux", x: 35, y: 68 },
              { name: "Lille", x: 55, y: 15 },
              { name: "Strasbourg", x: 80, y: 28 },
              { name: "Toulouse", x: 45, y: 78 },
              { name: "Dijon", x: 70, y: 42 },
              { name: "Vannes", x: 18, y: 48 },
              { name: "Saint-Malo", x: 27, y: 30 },
            ].map(c => (
              <div key={c.name} className="absolute text-[10px] font-medium text-slate-400/80" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                {c.name}
              </div>
            ))}

            {/* Fullscreen button */}
            <button className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[--k-border] shadow-sm text-[--k-muted] hover:text-[--k-text] transition">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
