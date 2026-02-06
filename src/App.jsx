import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hub from "./pages/Hub.jsx";
import BornesList from "./pages/BornesList.jsx";

function Placeholder({ name }) {
  return (
    <div className="rounded-2xl border border-[--k-border] bg-white p-6 shadow-soft">
      <div className="text-sm font-semibold">{name}</div>
      <div className="mt-1 text-sm text-[--k-muted]">Page placeholder (à brancher)</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/bornes" element={<BornesList />} />
      <Route path="/antennes" element={<BornesList />} />
      <Route path="/stocks" element={<BornesList />} />
      <Route path="/support" element={<BornesList />} />
      <Route path="/catalog" element={<BornesList />} />
      <Route path="/events" element={<Placeholder name="Événements" />} />
      <Route path="/downloads" element={<Placeholder name="Téléchargements" />} />
      <Route path="/logs" element={<Placeholder name="Logs" />} />
      <Route path="/settings" element={<Placeholder name="Paramètres" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
