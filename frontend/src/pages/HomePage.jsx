import React, { useEffect } from 'react'
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import TripDashboard from '../components/TripDashboard.jsx';
import TripsNotFound from '../components/TripsNotFound.jsx';


const homePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [trips, setTrips] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

    {trips.length > 0 && !isRateLimited && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
            <TripDashboard key={trip._id} trip={trip} setTrips={setTrips} />
        ))}
      </div>
    )}
      </div>
    </div>
  );




};

export default homePage;
