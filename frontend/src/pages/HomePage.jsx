import React, { useEffect } from 'react'
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

  const [filter, setFilter] = React.useState("all");
  const filteredTrips= filter === "all" ? trips : trips.filter(t => t.tripType === filter);

  const totalDistance = filteredTrips.reduce((total, trip) => total + (trip.odometerEnd - trip.odometerStart), 0);
  
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
       <Navbar />
        {isRateLimited && <RateLimitedUI />}
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading && <div className="text-center text-gray-500">Loading trips...</div>}

          {trips.length === 0 && !loading && !isRateLimited && <TripsNotFound />}

          {/*row for filter and total distance*/}
          <div className="flex items-center gap-4 mb-6 flex-wrap"> 
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

            {/*total distance badge*/}
            <div className="flex-none">
              <div className="badge badge-primary flex items-center gap-2">
                <CarIcon className="size-8" />
                  <span> Total: {totalDistance} km </span>
              </div>
            </div>

          </div>

          
          {/*display trips if available */}
          {trips.length > 0 && !isRateLimited && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/*displaying filtered trips*/}
                {filteredTrips.map((trip) => (
                    <TripDashboard key={trip._id} trip={trip} setTrips={setTrips} /> 
                ))}
              </div>
            )}
        </div>
    </div>
  );




};

export default homePage;
