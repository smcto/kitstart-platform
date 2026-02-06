import React from "react";
import { cn } from "./cn";

const VARIANTS = {
  primary:
    "bg-[--k-primary] text-white border-[--k-primary] hover:opacity-95",
  secondary:
    "bg-white text-[--k-text] border-[--k-border] hover:bg-[--k-surface-2]",
  ghost:
    "bg-transparent text-[--k-text] border-transparent hover:bg-[--k-surface-2]",
  danger:
    "bg-white text-[--k-danger] border-[--k-border] hover:bg-[--k-surface-2]",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}) {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border transition active:translate-y-[0.5px]",
        sizes[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
