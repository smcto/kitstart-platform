import React from "react";
import { Button } from "./ui/Button";

export function PageHeader({ title, subtitle, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[--k-text]">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-[--k-muted]">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          {secondaryLabel ? (
            <Button variant="secondary" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          ) : null}
          {primaryLabel ? (
            <Button variant="primary" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
