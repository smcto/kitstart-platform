import React from "react";
import { Card } from "./ui/Card";
import { cn } from "./ui/cn";

const SOFT_COLORS = [
  "from-indigo-50/80 to-blue-50/60",
  "from-orange-50/80 to-amber-50/60",
  "from-emerald-50/80 to-teal-50/60",
  "from-rose-50/80 to-pink-50/60",
  "from-amber-50/80 to-yellow-50/60",
  "from-sky-50/80 to-blue-50/60",
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
