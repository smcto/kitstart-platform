import React from "react";
import { cn } from "./ui/cn";

const ACCENTS = [
  { bar: "bg-indigo-500", iconBg: "bg-indigo-50",  iconText: "text-indigo-500" },
  { bar: "bg-orange-500", iconBg: "bg-orange-50",  iconText: "text-orange-500" },
  { bar: "bg-emerald-500", iconBg: "bg-emerald-50", iconText: "text-emerald-500" },
  { bar: "bg-rose-500",   iconBg: "bg-rose-50",    iconText: "text-rose-500" },
  { bar: "bg-amber-500",  iconBg: "bg-amber-50",   iconText: "text-amber-500" },
  { bar: "bg-sky-500",    iconBg: "bg-sky-50",     iconText: "text-sky-500" },
];

export function KpiCard({ title, subtitle, value, icon: Icon, colorIndex = 0 }) {
  const a = ACCENTS[colorIndex % ACCENTS.length];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[--k-border] bg-white shadow-sm">
      {/* Colored left accent */}
      <span className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl", a.bar)} />
      <div className="flex items-start justify-between gap-3 pl-4 pr-4 py-3.5">
        <div className="min-w-0">
          <div className="text-[11px] font-medium text-[--k-muted] uppercase tracking-wide truncate">{title}</div>
          <div className="mt-1 text-[26px] font-bold leading-none tabular-nums text-[--k-text]">{value}</div>
          {subtitle && <div className="mt-1 text-[11px] text-[--k-muted]/60 truncate">{subtitle}</div>}
        </div>
        {Icon && (
          <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", a.iconBg)}>
            <Icon className={cn("h-[18px] w-[18px]", a.iconText)} />
          </span>
        )}
      </div>
    </div>
  );
}
