import React from "react";
import { Card } from "./ui/Card";

export function KpiCard({ title, subtitle, value }) {
  return (
    <Card className="px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-[--k-muted] truncate">{title}</div>
          {subtitle && <div className="text-[11px] text-[--k-muted]/60 truncate">{subtitle}</div>}
        </div>
        <div className="text-xl font-semibold tabular-nums shrink-0">{value}</div>
      </div>
    </Card>
  );
}
