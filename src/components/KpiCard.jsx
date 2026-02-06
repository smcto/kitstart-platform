import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";

export function KpiCard({ title, subtitle, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
