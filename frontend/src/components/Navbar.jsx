
import React from "react";
import { Link } from "react-router";
import { PlusIcon, DownloadIcon, CarIcon, MoonIcon,  SunIcon } from "lucide-react";
import logo from "../assets/Logo-removebg-preview.png";




const Navbar = ({ theme, setTheme }) => {
  
  const toggleTheme = () => {
    setTheme(theme === "winter"?"night":"winter");
  };

  return (
    <header className="bg-base-200 border-b border-base-300 shadow-sm">
      <div className="w-full px-6 py-3">
        <div className="flex items-center gap-3 justify-between">

          {/*logo and title*/}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <img
              src={logo}
              alt="Mileage Tracker Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="text-2xl font-bold text-primary tracking-tight">
              Mileage Tracker
            </span>
          </Link>

          {/*Action buttons*/  }
          <div className="flex items-center gap-4">
            
            {/*Create trip button*/}
            <Link to="/create"className="btn btn-primary btn-sm md:btn-md gap-2">
              <PlusIcon size={18} />
              <span className="hidden sm:inline">Add Trip</span>
            </Link>

            {/*Export trips button*/}
            <Link to="/export" className="btn btn-primary btn-sm md:btn-md gap-2">
              <DownloadIcon size={18} />
              <span className="hidden sm:inline">Export Trips</span>
            </Link>

            {/*Theme toggle button*/}
            <button 
              className="btn btn-ghost btn-sm md:btn-md gap-2" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === "winter" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </button>
              
          </div>
 

        </div>
      </div>
    </header>
  );
};

export default Navbar;

