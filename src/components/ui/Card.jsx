import React from "react";
import { cn } from "./cn";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[--k-border] bg-[--k-surface] shadow-soft",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("px-5 pt-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <div className={cn("text-sm font-semibold", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <div className={cn("text-xs text-[--k-muted] mt-1", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("px-5 pb-5 pt-4", className)} {...props} />;
}
