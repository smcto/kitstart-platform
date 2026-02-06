import React from "react";
import { cn } from "./ui/cn";

const ACCENTS = [
  { valueBg: "bg-indigo-100/80",  valueText: "text-indigo-700", iconText: "text-indigo-400" },
  { valueBg: "bg-orange-100/70",  valueText: "text-orange-700", iconText: "text-orange-400" },
  { valueBg: "bg-emerald-100/70", valueText: "text-emerald-700", iconText: "text-emerald-400" },
  { valueBg: "bg-rose-100/70",    valueText: "text-rose-700",   iconText: "text-rose-400" },
  { valueBg: "bg-amber-100/70",   valueText: "text-amber-700",  iconText: "text-amber-400" },
  { valueBg: "bg-sky-100/80",     valueText: "text-sky-700",    iconText: "text-sky-400" },
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
