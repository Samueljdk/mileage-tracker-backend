import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import TripDashboard from '../components/TripDashboard.jsx';
import TripsNotFound from '../components/TripsNotFound.jsx';
import { CarIcon } from 'lucide-react';


const homePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [trips, setTrips] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [search, setSearch]= useState("");
  const [filter, setFilter] = React.useState("all");
  const [sort, setSort] = React.useState("new");



  const matchesSearch=(trip,query)=>{ if(!query) return true; const q=query.toLowerCase(); return [trip.title, trip.purpose, trip.tripType, trip.startLocation, trip.endLocation, trip.remarks].filter(Boolean).some(value => value.toLowerCase().includes(q)); } 
  const searchedTrips= trips.filter(trip => matchesSearch(trip,search));



  const filteredTrips= filter === "all" ? searchedTrips : searchedTrips.filter(t => t.tripType === filter);
  const sortedTrips = [...filteredTrips].sort((a, b) => sort ==="new"? new Date(b.date) - new Date(a.date): new Date(a.date) - new Date(b.date));

  const totalDistance = sortedTrips.reduce((total, trip) => total + (trip.odometerEnd - trip.odometerStart), 0);
  


  {/*display trips on homepage*/}
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/trips");
        console.log(res.data);
        setTrips(res.data);
        setIsRateLimited(false);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching trips:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching trips. Please try again later.");
        }
      } finally {
          setLoading(false);
      }
    };

      fetchTrips();
    }, []);


  return (

    <div className= "min-h-screen">
       
        {isRateLimited && <RateLimitedUI />}
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading && <div className="text-center text-gray-500">Loading trips...</div>}

          {trips.length === 0 && !loading && !isRateLimited && <TripsNotFound />}

          {/*row for filter, search, and total distance*/}
          <div className="flex items-center gap-4 mb-6 flex-wrap"> 
            
            {/*search trips*/}
            <input
              type="text"
              placeholder="Search trips..."
              className="input input-bordered input-sm mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/*filter trips*/}
            <select 
              className="select select-bordered select-sm mb-4"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Trips</option>
              <option value="business">Business</option>
              <option value="personal">Personal</option>
            </select>

            {/*sort trips by date*/}
            <select 
              className="select select-bordered select-sm mb-4"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>

            {/*total distance badge*/}
            <div className="flex-none">
              <div className="badge badge-primary flex items-center gap-2">
                <CarIcon className="size-8" />
                  <span> Total: {totalDistance} km </span>
              </div>
            </div>

          </div>

          
          {/*display trips if available */}
          {sortedTrips.length > 0 && !isRateLimited && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/*displaying filtered trips*/}
                {sortedTrips.map((trip) => (
                    <TripDashboard key={trip._id} trip={trip} setTrips={setTrips} /> 
                ))}
              </div>
            )}
        </div>

    </div>
  );




};

export default homePage;
