import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hub from "./pages/Hub.jsx";
import BornesDashboard from "./pages/BornesDashboard.jsx";
import BornesList from "./pages/BornesList.jsx";
import BornesCarte from "./pages/BornesCarte.jsx";
import BorneDetail from "./pages/BorneDetail.jsx";
import BorneEdit from "./pages/BorneEdit.jsx";
import AntennesDashboard from "./pages/AntennesDashboard.jsx";
import AntennesList from "./pages/AntennesList.jsx";
import StockDashboard from "./pages/StockDashboard.jsx";
import StockList from "./pages/StockList.jsx";
import MonCompte from "./pages/MonCompte.jsx";
import StatsDashboard from "./pages/StatsDashboard.jsx";
import Taches from "./pages/Taches.jsx";
import EventsDashboard from "./pages/EventsDashboard.jsx";
import EventsList from "./pages/EventsList.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import EventCreate from "./pages/EventCreate.jsx";
import EventsPlanning from "./pages/EventsPlanning.jsx";
import EventsPipeline from "./pages/EventsPipeline.jsx";
import EventsAntennes from "./pages/EventsAntennes.jsx";
import EventsLogistics from "./pages/EventsLogistics.jsx";

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

      {/* Events Manager */}
      <Route path="/events" element={<EventsDashboard />} />
      <Route path="/events/list" element={<EventsList />} />
      <Route path="/events/create" element={<EventCreate />} />
      <Route path="/events/planning" element={<EventsPlanning />} />
      <Route path="/events/pipeline" element={<EventsPipeline />} />
      <Route path="/events/antennes" element={<EventsAntennes />} />
      <Route path="/events/logistics" element={<EventsLogistics />} />
      <Route path="/events/:id" element={<EventDetail />} />

      {/* Bornes Manager */}
      <Route path="/bornes" element={<BornesDashboard />} />
      <Route path="/bornes/list" element={<BornesList />} />
      <Route path="/bornes/carte" element={<BornesCarte />} />
      <Route path="/bornes/:id/edit" element={<BorneEdit />} />
      <Route path="/bornes/:id" element={<BorneDetail />} />

      {/* Antennes Selfizee */}
      <Route path="/antennes" element={<AntennesDashboard />} />
      <Route path="/antennes/list" element={<AntennesList />} />

      {/* Stock Manager */}
      <Route path="/stocks" element={<StockDashboard />} />
      <Route path="/stocks/produits" element={<StockList />} />

      {/* Platform */}
      <Route path="/compte" element={<MonCompte />} />
      <Route path="/stats" element={<StatsDashboard />} />
      <Route path="/taches" element={<Taches />} />

      {/* Shared */}
      <Route path="/support" element={<BornesList />} />
      <Route path="/catalog" element={<BornesList />} />
      <Route path="/downloads" element={<Placeholder name="Téléchargements" />} />
      <Route path="/logs" element={<Placeholder name="Logs" />} />
      <Route path="/settings" element={<Placeholder name="Paramètres" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
