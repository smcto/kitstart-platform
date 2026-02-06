import React from "react";
import { Button } from "./ui/Button";

export function PageHeader({ title, subtitle, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-[--k-text]">{title}</h1>
          {subtitle ? <p className="text-xs text-[--k-muted]">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {secondaryLabel ? (
            <Button variant="secondary" size="sm" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          ) : null}
          {primaryLabel ? (
            <Button variant="primary" size="sm" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
