import React from "react";
import { Card } from "./ui/Card";
import { cn } from "./ui/cn";

const SOFT_COLORS = [
  "from-blue-50 to-indigo-50/50",
  "from-rose-50 to-pink-50/50",
  "from-emerald-50 to-teal-50/50",
  "from-violet-50 to-purple-50/50",
  "from-amber-50 to-orange-50/50",
  "from-sky-50 to-cyan-50/50",
];

export function KpiCard({ title, subtitle, value, colorIndex = 0 }) {
  return (
    <div className={cn(
      "rounded-2xl border border-[--k-border] bg-gradient-to-br px-4 py-3 shadow-sm shadow-black/[0.02]",
      SOFT_COLORS[colorIndex % SOFT_COLORS.length]
    )}>
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-[--k-text]/70 truncate">{title}</div>
          {subtitle && <div className="text-[11px] text-[--k-muted]/60 truncate">{subtitle}</div>}
        </div>
        <div className="text-xl font-semibold tabular-nums shrink-0 text-[--k-text]">{value}</div>
      </div>
    </div>
  );
}
