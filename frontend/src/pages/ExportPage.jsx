import { useState } from "react";
import Navbar from "../components/Navbar";


const ExportTrips = () => { 
  const [filters, setFilters] = useState({startDate: "", endDate: "", minOdometer: "", maxOdometer: "",  location: "", tripType: ""});

 
  const handleChange = (e) => { // this is a handler for filters 
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDownload = () => { // handler to download CSV file based on filters
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

//    window.open(`http://localhost:5001/api/trips/export?${params.toString()}`); //using window.open to trigger file download in new tab
    //window.open(`/api/trips/export?${params.toString()}`);

    
    const API_URL = window.location.hostname === "localhost" ? "http://localhost:5001" : ""; // so it works in dev and production. 

    window.location.href = `${API_URL}/api/trips/export?${params.toString()}`;

  };





  return (
    <div>
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Export Trips Filter</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input type="date" name="startDate" onChange={handleChange} className="input input-bordered w-full"/>

                <input type="date" name="endDate" onChange={handleChange} className="input input-bordered w-full" />

                <input type="number" name="minOdometer"  placeholder="Min Odometer" onChange={handleChange} className="input input-bordered w-full"/>

                <input type="number" name="maxOdometer" placeholder="Max Odometer" onChange={handleChange} className="input input-bordered w-full"/>

                <input type="text" name="location" placeholder="Location (start or end)" onChange={handleChange} className="input input-bordered w-full md:col-span-2"/>

                <select name="tripType" onChange={handleChange} className="input input-bordered w-full md:col-span-2">
                  <option value="">All Types</option>
                  <option value="business">Business</option>
                  <option value="personal">Personal</option>
                </select>

            </div>

            <button className="btn btn-primary mt-6 w-full"
                onClick={(e) => handleDownload()} 
            >
                Download CSV File
            </button>

        </div>
    </div>
  );



};

export default ExportTrips;

