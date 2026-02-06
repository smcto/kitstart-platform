import React from "react";
import { cn } from "./cn";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[--k-border] bg-white px-2 py-0.5 text-xs font-medium text-[--k-text]",
        className
      )}
      {...props}
    />
  );
}

export function StatusPill({ status }) {
  const map = {
    ONLINE: { bg: "bg-emerald-50", dot: "bg-emerald-500", t: "Online" },
    WARNING: { bg: "bg-amber-50", dot: "bg-amber-500", t: "Warning" },
    OFFLINE: { bg: "bg-red-50", dot: "bg-red-500", t: "Offline" },
  };
  const s = map[status] ?? { bg: "bg-gray-50", dot: "bg-gray-400", t: status ?? "—" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", s.bg)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.t}
    </span>
  );
}
