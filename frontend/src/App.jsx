import React from "react";
import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import TripDetailPage from "./pages/TripDetailPage.jsx";
import ExportPage from "./pages/ExportPage.jsx";

const App = () => {
  return (
    <div data-theme="winter">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/trips/:id" element={<TripDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
