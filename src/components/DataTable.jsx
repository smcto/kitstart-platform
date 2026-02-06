import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/Card";
import { StatusPill } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DataTable({ title, subtitle, rows }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-[880px] w-full text-sm">
            <thead>
              <tr className="bg-[--k-surface-2] text-[--k-muted]">
                <th className="p-3 text-left font-semibold">Nom</th>
                <th className="p-3 text-left font-semibold">ID</th>
                <th className="p-3 text-left font-semibold">Antenne</th>
                <th className="p-3 text-left font-semibold">Statut</th>
                <th className="p-3 text-left font-semibold">Sync</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[--k-border]">
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3 text-[--k-muted]">{r.id}</td>
                  <td className="p-3">{r.location}</td>
                  <td className="p-3"><StatusPill status={r.status} /></td>
                  <td className="p-3 text-[--k-muted]">{r.sync}</td>
                  <td className="p-3 text-right">
                    <Button variant="secondary" size="sm">…</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
