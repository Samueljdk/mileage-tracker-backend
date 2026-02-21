import React, { useEffect, useState } from "react";

import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import api from '../lib/axios.js';

const TripDetailPage = () => {
  
  const [trip, setTrip] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log({id});

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trip/${id}`);
        setTrip(res.data);

      } catch (error) {
        toast.error("An error occurred while fetching the trip details. Please try again later.");
        console.error("Error fetching trip details:", error);

      } finally {
        setLoading(false);
      }

    };

    fetchTrip();
  } , [id]);

  console.log({trip});

  //handleDelete Function

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/trip/${id}`);
      toast.success("Trip deleted successfully!");
      navigate("/"); // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("An error occurred while deleting the trip. Please try again later.");
    }
  };

  
  if(true){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
        
    </div>
      );
    }

  return 
  (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
          <div className="flex item-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon size="h-5 w-5" />
              Back to Trips
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5"/>
                Delete Trip
            </button>
         </div>
        </div>
     </div>
  )
};

export default TripDetailPage;