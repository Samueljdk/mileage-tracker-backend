import React from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import TripDetailPage from "./pages/TripDetailPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";

const App = () => {
  return (
    <div data-theme="winter">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/trip/:id" element={<TripDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
