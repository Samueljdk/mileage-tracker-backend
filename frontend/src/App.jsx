import React, { use ,useEffect, useState} from "react";
import { Routes, Route } from "react-router";


import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import TripDetailPage from "./pages/TripDetailPage.jsx";
import ExportPage from "./pages/ExportPage.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [theme, setTheme] = useState("winter");

  {/*load saved them to startup*/}
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }}, []);

  {/*apply theme throughout the app*/}
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} setTheme={setTheme} />   
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
