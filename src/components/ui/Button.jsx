import React from "react";
import { cn } from "./cn";

const VARIANTS = {
  primary:
    "bg-[--k-primary] text-white border-[--k-primary] hover:brightness-110",
  secondary:
    "bg-white text-[--k-text] border-[--k-border] hover:bg-[--k-surface-2]",
  ghost:
    "bg-transparent text-[--k-muted] border-transparent hover:bg-[--k-surface-2] hover:text-[--k-text]",
  danger:
    "bg-white text-[--k-danger] border-[--k-border] hover:bg-red-50",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}) {
  const sizes = {
    sm: "h-7 px-2.5 text-xs",
    md: "h-8 px-3 text-[13px]",
    lg: "h-9 px-4 text-sm",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium transition",
        sizes[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
