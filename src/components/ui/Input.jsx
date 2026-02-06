import React from "react";
import { cn } from "./cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "h-8 w-full rounded-lg border border-[--k-border] bg-white px-2.5 text-[13px] outline-none",
        "placeholder:text-[--k-muted] focus:ring-1 focus:ring-[--k-primary-border] focus:border-[--k-primary]",
        className
      )}
      {...props}
    />
  );
}
