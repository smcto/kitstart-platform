import React from "react";
import { cn } from "./cn";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[--k-border] bg-[--k-surface]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("px-4 pt-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <div className={cn("text-[13px] font-semibold", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <div className={cn("text-xs text-[--k-muted] mt-0.5", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("px-4 pb-3 pt-2", className)} {...props} />;
}
