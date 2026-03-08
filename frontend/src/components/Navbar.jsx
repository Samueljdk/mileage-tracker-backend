import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import logo from "../assets/Logo-removebg-preview.png";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-base-300 shadow-sm">
      <div className="w-full px-6 py-3">
        <div className="flex items-center justify-between">

          <Link
            to="/"
            
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <img
              src={logo}
              alt="Mileage Tracker Logo"
              className="h-10 w-10 object-contain"
            />

            <span className="text-2xl font-bold text-primary tracking-tight">
              Mileage Tracker
            </span>
          </Link>

          <Link
            to="/create"
            className="btn btn-primary btn-sm md:btn-md gap-2"
          >
            <PlusIcon size={18} />
            <span className="hidden sm:inline">Add Trip</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
