import React from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

export function FilterBar({ search, onSearch, right }) {
  return (
    <div className="mb-4 rounded-2xl border border-[--k-border] bg-white p-3 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-[240px] flex-1">
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Rechercher…"
          />
        </div>
        {right}
        <Button variant="secondary">Reset</Button>
      </div>
    </div>
  );
}
