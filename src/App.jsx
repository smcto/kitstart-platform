import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hub from "./pages/Hub.jsx";
import BornesDashboard from "./pages/BornesDashboard.jsx";
import BornesList from "./pages/BornesList.jsx";
import BornesCarte from "./pages/BornesCarte.jsx";
import AntennesDashboard from "./pages/AntennesDashboard.jsx";
import AntennesList from "./pages/AntennesList.jsx";
import StockDashboard from "./pages/StockDashboard.jsx";
import StockList from "./pages/StockList.jsx";

function Placeholder({ name }) {
  return (
    <div className="rounded-xl border border-[--k-border] bg-white px-4 py-3">
      <div className="text-[13px] font-semibold">{name}</div>
      <div className="text-xs text-[--k-muted]">Page placeholder</div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />

      {/* Bornes Manager */}
      <Route path="/bornes" element={<BornesDashboard />} />
      <Route path="/bornes/list" element={<BornesList />} />
      <Route path="/bornes/carte" element={<BornesCarte />} />

      {/* Antennes Selfizee */}
      <Route path="/antennes" element={<AntennesDashboard />} />
      <Route path="/antennes/list" element={<AntennesList />} />

      {/* Stock Manager */}
      <Route path="/stocks" element={<StockDashboard />} />
      <Route path="/stocks/produits" element={<StockList />} />

      {/* Shared */}
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
