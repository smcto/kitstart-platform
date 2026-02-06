import React from "react";
import { cn } from "./ui/cn";

const ACCENTS = [
  { valueBg: "bg-indigo-50",  valueText: "text-indigo-600", iconText: "text-indigo-400" },
  { valueBg: "bg-orange-50",  valueText: "text-orange-600", iconText: "text-orange-400" },
  { valueBg: "bg-emerald-50", valueText: "text-emerald-600", iconText: "text-emerald-400" },
  { valueBg: "bg-rose-50",    valueText: "text-rose-600",   iconText: "text-rose-400" },
  { valueBg: "bg-amber-50",   valueText: "text-amber-600",  iconText: "text-amber-400" },
  { valueBg: "bg-sky-50",     valueText: "text-sky-600",    iconText: "text-sky-400" },
];

export function KpiCard({ title, subtitle, value, icon: Icon, colorIndex = 0 }) {
  const a = ACCENTS[colorIndex % ACCENTS.length];
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white p-4 shadow-sm shadow-black/[0.03]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-[--k-muted] uppercase tracking-wide">{title}</span>
        {Icon && <Icon className={cn("h-[16px] w-[16px]", a.iconText)} />}
      </div>
      <div className="flex items-end gap-2.5">
        <span className={cn("inline-flex items-center rounded-xl px-2.5 py-1 text-[22px] font-bold leading-none tabular-nums", a.valueBg, a.valueText)}>
          {value}
        </span>
      </div>
      {subtitle && <div className="mt-2 text-[11px] text-[--k-muted]/70">{subtitle}</div>}
    </div>
  );
}
