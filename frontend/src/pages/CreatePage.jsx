import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { Link, useNavigate} from "react-router"; 
import { ArrowLeftIcon } from "lucide-react"; 
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import {useState} from "react";

const CreatePage = () => {

  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");
  const [startLocation, setStartLocation] = React.useState("");
  const [endLocation, setEndLocation] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [odometerStart, setOdometerStart] = React.useState("");
  const [odometerEnd, setOdometerEnd] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !purpose.trim() || !date.trim() || !startLocation.trim() || !endLocation.trim() || !odometerStart.trim() || !odometerEnd.trim()) {
      toast.error("Please fill in all required fields (Title, Purpose, Date, Start Location, End Location, Odometer Start, Odometer End).");
      setLoading(false);
      return;
    }
      
    setLoading(true);
    try{
      await api.post("/trips", {
        title,
        purpose,
        date,
        startLocation,
        endLocation,
        odometerStart,
        odometerEnd,
        remarks
      });
      toast.success("Trip created successfully!");
      navigate("/"); // Redirect to home page 

    }catch(error){
      console.error("Error creating trip:", error);
      if(error.response.status===429){
        toast.error("You have reached the rate limit. Please wait before creating another trip.");
      }else
      {
        toast.error("An error occurred while creating the trip. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
    

    console.log({ title, purpose, date, startLocation, endLocation, odometerStart, odometerEnd });

    

    setTimeout(() => {
      setLoading(false);
      alert("Trip created successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon size={20} /> 
              Back to Home
            </Link>
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Create New Trip</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title*</span>
                    </label>
                    <input type="text"
                      className="input input-bordered w-full"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Purpose*</span>
                    </label>
                    <textarea 
                      className="textarea textarea-bordered w-full"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Date*</span>
                    </label>
                    <input type="date" 
                      className="input input-bordered w-full"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Start Location*</span>
                    </label>
                    <input type="text" 
                      className="input input-bordered w-full"
                      value={startLocation}
                      onChange={(e) => setStartLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">End Location*</span>
                    </label>
                    <input type="text" 
                      className="input input-bordered w-full"
                      value={endLocation}
                      onChange={(e) => setEndLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Odometer Start*</span>
                    </label>
                    <input type="number" 
                      className="input input-bordered w-full"
                      value={odometerStart}
                      onChange={(e) => setOdometerStart(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Odometer End*</span>
                    </label>
                    <input type="number" 
                      className="input input-bordered w-full"
                      value={odometerEnd}
                      onChange={(e) => setOdometerEnd(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-6"> {/* Added margin-bottom for spacing */}
                    <label className="label">
                      <span className="label-text">Remarks</span>
                    </label>
                    <textarea 
                      className="textarea textarea-bordered w-full"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Creating..." : "Create Trip"}

                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;