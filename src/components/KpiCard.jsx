import React from "react";
import { cn } from "./ui/cn";

const PALETTES = [
  { bg: "bg-indigo-500",  light: "bg-indigo-400/30", text: "text-white" },
  { bg: "bg-orange-500",  light: "bg-orange-400/30", text: "text-white" },
  { bg: "bg-emerald-500", light: "bg-emerald-400/30", text: "text-white" },
  { bg: "bg-rose-500",    light: "bg-rose-400/30",   text: "text-white" },
  { bg: "bg-amber-500",   light: "bg-amber-400/30",  text: "text-white" },
  { bg: "bg-sky-500",     light: "bg-sky-400/30",    text: "text-white" },
];

export function KpiCard({ title, subtitle, value, icon: Icon, colorIndex = 0 }) {
  const p = PALETTES[colorIndex % PALETTES.length];
  return (
    <div className={cn(
      "rounded-2xl px-4 py-4 shadow-md shadow-black/10",
      p.bg
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-medium text-white/70 uppercase tracking-wide truncate">{title}</div>
          <div className="mt-1 text-[28px] font-bold leading-none tabular-nums text-white">{value}</div>
          {subtitle && <div className="mt-1 text-[11px] text-white/60 truncate">{subtitle}</div>}
        </div>
        {Icon && (
          <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", p.light)}>
            <Icon className="h-5 w-5 text-white" />
          </span>
        )}
      </div>
    </div>
  );
}
