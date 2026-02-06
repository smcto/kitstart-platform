import React from "react";
import { cn } from "./cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-[--k-border] bg-white px-3 text-sm outline-none",
        "placeholder:text-[--k-muted] focus:ring-2 focus:ring-[--k-primary-border] focus:border-[--k-primary]",
        className
      )}
      {...props}
    />
  );
}
