import React, { useEffect, useState } from "react";

import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import api from '../lib/axios.js';
import Navbar from "../components/Navbar";

const TripDetailPage = () => {
  
  const [trip, setTrip] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  

  console.log({id});

  //fetch trip details on component mount
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
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

  //handleDelete function to delete trip and navigate back to home page
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/trips/${id}`);
      toast.success("Trip deleted successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("An error occurred while deleting the trip. Please try again later.");
    }
  };

  //HandleSave Functions
  const handleSave = async (updatedTrip) => {
    if (!updatedTrip.title.trim() || !updatedTrip.purpose.trim() || !updatedTrip.date.trim() || !updatedTrip.startLocation.trim() || !updatedTrip.endLocation.trim() || !updatedTrip.odometerStart.toString().trim() || !updatedTrip.odometerEnd.toString().trim()) {
      toast.error("Please update a field to save changes).");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/trips/${id}`, updatedTrip);
      toast.success("Trip updated successfully!");
      setTrip(updatedTrip); 
      navigate("/");
    } catch (error) {
      console.error("Error updating trip:", error);
      toast.error("An error occurred while updating the trip. Please try again later.");
    } finally {
      setSaving(false);
    }
  };

  //handleDownload function to download csv file with filters applied
  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>    
    </div>
      );
    }

  return (
    <div>

      <div className="min-h-screen bg-base-200">
        
        <div className="container mx-auto px-4 py-8">
          
          <div className="max-w-2xl mx-auto"> 

            {/*back to trips and delete trip buttons*/}
            <div className="flex items-center justify-between mb-6">
              
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon size="h-5 w-5" />
                  Back to Trips
                </Link>

                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="h-5 w-5"/>
                    Delete Trip
                </button>
              
                <div> 

              </div>
              </div>

            {/*Trip Details Form*/}        
            <div className="card bg-base-100">

                <div className="card-body">

                  {/*Trip Type*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Trip Type</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={trip.tripType}
                      onChange={(e)=> setTrip({...trip,tripType: e.target.value})}
                      >
                        <option value="business">Business</option>
                        <option value="personal">Personal</option>
                    </select>
                  </div>

                  {/*Title*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder=" Trip Title"
                      className="input input-bordered"
                      value={trip.title}
                      onChange={(e)=> setTrip({...trip,title:e.target.value})}
                      />
                  </div>

                  {/*Purpose*/}
                  <div className="form-control mb-4">
                      <label className="label">
                        <span className="label-text">Purpose</span>
                      </label>
                      <input
                        type="text"
                        placeholder=" Trip Purpose"
                        className="input input-bordered"
                        value={trip.purpose}
                        onChange={(e)=> setTrip({...trip,purpose:e.target.value})}
                        />
                  </div>

                    {/*Trip Type*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Date</span>
                    </label>
                    <input
                      type="date"
                      placeholder=" Trip Date"
                      className="input input-bordered"
                      value={new Date(trip.date).toISOString().split('T')[0]} //format date to yyyy-mm-dd for input
                      onChange={(e)=> setTrip({...trip,date: e.target.value})}
                      />
                  </div>

                  {/*Start Location*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Start Location</span>
                    </label>
                    <input
                      type="text"
                      placeholder=" Start Location"
                      className="input input-bordered"
                      value={trip.startLocation}
                      onChange={(e)=> setTrip({...trip,startLocation: e.target.value})}
                      />
                  </div>

                  {/*End Location*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">End Location</span>
                    </label>
                    <input
                      type="text"
                      placeholder=" End Location"
                      className="input input-bordered"
                      value={trip.endLocation}
                      onChange={(e)=> setTrip({...trip,endLocation: e.target.value})}
                      />
                  </div>

                  {/*Odometer Start*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Odometer Start</span>
                    </label>
                    <input
                      type="number"
                      placeholder=" Odometer Start"
                      className="input input-bordered"
                      value={trip.odometerStart}
                      onChange={(e)=> setTrip({...trip,odometerStart: e.target.value})}
                      />
                  </div>

                  {/*Odometer End*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Odometer End</span>
                      </label>
                      <input
                      type="number"
                      placeholder=" Odometer End"
                      className="input input-bordered"
                      value={trip.odometerEnd}
                      onChange={(e)=> setTrip({...trip,odometerEnd: e.target.value})}
                      />
                  </div>

                  {/*Remarks*/}
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Remarks</span>
                    </label>
                    <textarea
                      placeholder=" Trip Remarks"
                      className="textarea textarea-bordered"
                      value={trip.remarks}
                      onChange={(e)=> setTrip({...trip,remarks:e.target.value})}
                      />
                  </div>
                  
                  {/*Save Changes Button*/}
                  <div className="card-action justify-end">
                    <button className="btn btn-primary" disabled={saving} onClick={() => handleSave(trip)}>
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>

                </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TripDetailPage;