import React from "react";
import { cn } from "./cn";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[--k-border] bg-white px-2.5 py-1 text-xs text-[--k-text]",
        className
      )}
      {...props}
    />
  );
}

export function StatusPill({ status }) {
  const map = {
    ONLINE: { c: "var(--k-success)", t: "Online" },
    WARNING: { c: "var(--k-warning)", t: "Warning" },
    OFFLINE: { c: "var(--k-danger)", t: "Offline" },
  };
  const s = map[status] ?? { c: "var(--k-border)", t: status ?? "—" };
  return (
    <span
      className="inline-flex items-center justify-center rounded-full border bg-white px-3 py-1 text-xs font-semibold"
      style={{ borderColor: s.c, color: s.c }}
    >
      {s.t.toUpperCase()}
    </span>
  );
}
