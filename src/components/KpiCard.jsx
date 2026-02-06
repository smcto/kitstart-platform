import React from "react";
import { cn } from "./ui/cn";

const ACCENTS = [
  {
    card: "from-indigo-500 to-blue-600",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
  {
    card: "from-orange-400 to-rose-500",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
  {
    card: "from-emerald-400 to-teal-500",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
  {
    card: "from-rose-400 to-pink-500",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
  {
    card: "from-amber-400 to-orange-500",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
  {
    card: "from-sky-400 to-blue-500",
    iconBg: "bg-white/20",
    iconText: "text-white",
  },
];

export function KpiCard({ title, subtitle, value, icon: Icon, colorIndex = 0 }) {
  const a = ACCENTS[colorIndex % ACCENTS.length];
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 shadow-md shadow-black/[0.08]",
      a.card
    )}>
      {/* Decorative circle */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/[0.08]" />
      <div className="absolute -right-1 -top-1 h-14 w-14 rounded-full bg-white/[0.06]" />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wide">{title}</span>
          {Icon && (
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", a.iconBg)}>
              <Icon className={cn("h-[18px] w-[18px]", a.iconText)} />
            </span>
          )}
        </div>
        <div className="text-[28px] font-extrabold leading-none tabular-nums text-white tracking-tight">
          {value}
        </div>
        {subtitle && <div className="mt-1.5 text-[11px] text-white/60">{subtitle}</div>}
      </div>
    </div>
  );
}
