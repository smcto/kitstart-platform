import React from "react";
import { StatusPill } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DataTable({ title, subtitle, rows }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white shadow-sm shadow-black/[0.03] overflow-hidden">
      {(title || subtitle) && (
        <div className="flex items-baseline justify-between gap-3 border-b border-[--k-border] px-4 py-2.5">
          <div className="text-[13px] font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-[--k-muted]">{subtitle}</div>}
        </div>
      )}
      <div className="overflow-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[--k-border] bg-[--k-surface-2]/50 text-[--k-muted]">
              <th className="px-4 py-2 text-left text-xs font-medium">Nom</th>
              <th className="px-4 py-2 text-left text-xs font-medium">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Antenne</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Statut</th>
              <th className="px-4 py-2 text-left text-xs font-medium">Sync</th>
              <th className="px-4 py-2 text-right text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[--k-border] hover:bg-[--k-surface-2]/30 transition-colors">
                <td className="px-4 py-1.5 font-medium">
                  <a href={`/bornes/${r.name}`} className="text-[--k-primary] hover:underline">{r.name}</a>
                </td>
                <td className="px-4 py-1.5 text-[--k-muted] tabular-nums">{r.id}</td>
                <td className="px-4 py-1.5">{r.location}</td>
                <td className="px-4 py-1.5"><StatusPill status={r.status} /></td>
                <td className="px-4 py-1.5 text-[--k-muted]">{r.sync}</td>
                <td className="px-4 py-1.5 text-right">
                  <Button variant="ghost" size="sm">...</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[--k-border] px-4 py-2 text-xs text-[--k-muted]">
        <span>{rows.length} résultat{rows.length > 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}
