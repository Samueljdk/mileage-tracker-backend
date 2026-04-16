
import { PenSquareIcon, Trash2Icon, CopyIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import { useNavigate } from "react-router";
import { useEffect } from "react";


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

    const navigate = useNavigate();
    const handleClone = (e) =>{
        e.preventDefault();

        const clonedTrip = {
            title: trip.title,
            date: new Date().toISOString().split("T")[0],
            startLocation: trip.startLocation,
            endLocation: trip.endLocation,
            remarks: trip.remarks,
        };
        localStorage.setItem("clonedTrip", JSON.stringify(clonedTrip));
        navigate("/create");
    }



  return <Link to={`/trips/${trip._id}`} 
    className="block bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 transition">
    
    <div className="card-body">
        <h3 className="card-title text-base-content">
            {trip.title} - {trip.startLocation} to {trip.endLocation}</h3>
        <p className="text-base-content/70 line-clamp-3">{trip.description}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">{new Date(trip.date).toLocaleDateString()}</span>
            <div className="flex items-center gap-2"> 

                {/*clone*/}
                <button className="btn btn-ghost btn-xs" onClick={handleClone} title="Clone Trip">
                    <CopyIcon className="size-4"/>
                </button>


                {/*delete*/}
                <PenSquareIcon className="size-4"/>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, trip._id)}>
                    <Trash2Icon className="size-4"/>
                </button>

            </div>
        </div>
    </div>
  </Link>


/*
  return (
    <tr>
        <td>{trip.title}</td>
        <td>{trip.startLocation}</td>
        <td>{trip.endLocation}</td>
        <td>{trip.description}</td>
        <td>{new Date(trip.date).toLocaleDateString()}</td>
        <td>
            <div className="flex items-center gap-2">
                <Link to={`/trips/${trip._id}`}>
                    <PenSquareIcon className="size-4"/>
                </Link>
                <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, trip._id)}>
                    <Trash2Icon className="size-4"/>
                </button>
            </div>
        </td>
    </tr>
  );

*/



};

export default TripDashboard;

