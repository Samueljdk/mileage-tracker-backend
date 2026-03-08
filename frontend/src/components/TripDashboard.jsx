import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const TripDashboard = ({ trip, setTrips }) => {


    const handleDelete = async (e, tripId) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
            return;
        }
        try {
            await api.delete(`/trips/${tripId}`);
            toast.success("Trip deleted successfully!");
            setTrips(prevTrips => prevTrips.filter(t => t._id !== tripId)); 
        } catch (error) {
            console.error("Error deleting trip:", error);
            toast.error("An error occurred while deleting the trip. Please try again later.");
        }
    };


  return <Link to={`/trips/${trip._id}`} 
    className="block bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 transition">
    
    <div className="card-body">
        <h3 className="card-title text-base-content">
            {trip.title} - {trip.startLocation} to {trip.endLocation}</h3>
        <p className="text-base-content/70 line-clamp-3">{trip.description}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">{new Date(trip.date).toLocaleDateString()}</span>
            <div className="flex items-center gap-2"> 
                <PenSquareIcon className="size-4"/>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, trip._id)}>
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
        </div>
    </div>
  </Link>
};

export default TripDashboard;

