import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { Link, useNavigate} from "react-router"; 
import { ArrowLeftIcon } from "lucide-react"; 
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import {useState} from "react";
import { useEffect } from 'react';

const CreatePage = () => {

  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [startLocation, setStartLocation] = React.useState("");
  const [endLocation, setEndLocation] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [odometerStart, setOdometerStart] = React.useState("");
  const [odometerEnd, setOdometerEnd] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); 
  const [tripType, setTripType] = useState("business"); // Default to "business"
  const unsavedChanges = !localStorage.getItem("clonedTrip") && (title || purpose || startLocation || endLocation || odometerStart || odometerEnd || remarks);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    {/*client-side validation*/}
    if (!title.trim() || !purpose.trim() || !date.trim() || !startLocation.trim() || !endLocation.trim() || !odometerStart.trim() || !odometerEnd.trim()) {
      toast.error("Please fill in all required fields (Title, Purpose, Date, Start Location, End Location, Odometer Start, Odometer End).");
      setLoading(false);
      return;
    }
    
    
    
    {/* Validate odometer readings */}
      const start = parseInt(odometerStart, 10);
      const end = parseInt(odometerEnd, 10);

      {/*check if readings are valid numbers*/}
      if(Number.isNaN(start) || Number.isNaN(end))
      {
        toast.error("Odometer readings must be valid numbers.");
        setLoading(false);
        return;
      }
      
      {/*check if readings are non-negative*/}
      if(start < 0 || end < 0)
      {
        toast.error("Odometer readings cannot be negative.");
        setLoading(false);
        return;
      }

      {/*check if end reading is greater than or equal to start reading*/}
      if(end<start)
      {
        toast.error("Odometer end reading must be greater than or equal to start reading.");
        setLoading(false);
        return;
      }
    
    {/* If validation passes, proceed to submit the form */}
    setLoading(true);

    try{
      await api.post("/trips", {
        title,
        purpose,
        tripType,
        date,
        startLocation,
        endLocation,
        odometerStart: start,
        odometerEnd: end,
        remarks
      });

      localStorage.setItem("lastOdometerEnd", odometerEnd); // Store the last odometer end value in localStorage
      toast.success("Trip created successfully!");
      navigate("/"); // Redirect to home page 

    }catch(error){
      console.error("Error creating trip:", error);

      const status=error.response?.status;
      const message=error.response?.data?.message||"Unknown error";

      if (status === 429)
      {
        toast.error("You have reached the rate limit. Please wait before creating another trip.");
      }
      else if (status === 400)
      {
        toast.error(message);
      }
      else {toast.error("An error occurred while creating the trip. Please try again later.");}

    }finally{
      setLoading(false);
    }
    

    console.log({ title, purpose, date, startLocation, endLocation, odometerStart, odometerEnd, tripType });
    

    //setTimeout(() => {
      //setLoading(false);
      //alert("Trip created successfully!");
    //}, 1000);
  };




  {/*useEffect to initialize odometer start value */}
  useEffect(() => {
    const lastOdometerEnd = localStorage.getItem("lastOdometerEnd");
    if (lastOdometerEnd) {
      setOdometerStart(lastOdometerEnd);
    }
  }, []);


  {/*useEffect to initialize cloned trip data */}
  useEffect(() => {
      const clonedTrip = localStorage.getItem("clonedTrip");
      if (clonedTrip) {
        const tripData = JSON.parse(clonedTrip);
          setTitle(tripData.title||"");
          setPurpose(tripData.purpose||"");
          setStartLocation(tripData.startLocation||"");
          setEndLocation(tripData.endLocation||"");
          setRemarks(tripData.remarks||"");
          localStorage.removeItem("clonedTrip");
      }}, []);

  {/*useEffect to handle unsaved changes */}
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if(!unsavedChanges) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);




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
                    <form onSubmit={handleSubmit} className={loading? "opacity-70":""}>

                        {/*trip type*/}
                        <div className="form-control mb-6">
                          <label className="label">
                            <span className="label-text">Trip Type</span>
                          </label>

                          <select
                            className="select select-bordered w-full"
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}
                          >
                            <option value="business">Business</option>
                            <option value="personal">Personal</option>
                          </select>

                        </div>

                        {/*Title*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Title</span>
                            {!title && <p className="text-error text-sm">*</p>}
                          </label>
                          <input 
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus 
                          />
                        </div>

                        {/*purpose*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Purpose</span>
                            {!purpose && <p className="text-error text-sm">*</p>}
                          </label>
                          <textarea 
                            className="textarea textarea-bordered w-full"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                          />
                        </div>

                        {/*Date*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Date</span>
                            {!date && <p className="text-error text-sm">*</p>}
                          </label>
                          <input type="date" 
                            className="input input-bordered w-full"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            autoComplete= "date"
                          />
                        </div>

                        {/*start location*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Start Location</span>
                            {!startLocation && <p className="text-error text-sm">*</p>}
                          </label>


                          <input type="text" 
                            className="input input-bordered w-full"
                            value={startLocation}
                            onChange={(e) => setStartLocation(e.target.value)}
                            autoComplete="street-address"
                            placeholder="123 Main St, Brandon, MP"
                          />

                        </div>

                        {/*End Location*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">End Location</span>
                            {!endLocation && <p className="text-error text-sm">*</p>}
                          </label>
                          
                          <input type="text" 
                            className="input input-bordered w-full"
                            value={endLocation}
                            onChange={(e) => setEndLocation(e.target.value)}
                            autoComplete="street-address"
                            placeholder="456 Oak Ave, Winnipeg, MB"
                          />
                          
                        </div>

                        {/*odometer start*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Odometer Start</span>
                            {!odometerStart && <p className="text-error text-sm">*</p>}
                          </label>
                          <input type="number" 
                            className="input input-bordered w-full"
                            value={odometerStart}
                            onChange={(e) => setOdometerStart(e.target.value)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                        </div>

                        {/*odometer end*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Odometer End</span>
                            {!odometerEnd && <p className="text-error text-sm">*</p>}
                          </label>
                          <input type="number" 
                            className="input input-bordered w-full"
                            value={odometerEnd}
                            onChange={(e) => setOdometerEnd(e.target.value)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                          />
                        </div>

                        {/* distance auto calculated*/}
                        <div className="form-control mb-4">
                          <label className="label">
                            <span className="label-text">Distance</span>
                          </label>
                          <input type="number" 
                            className="input input-bordered w-full"
                            value={ odometerEnd && odometerStart ? Number(odometerEnd) - Number(odometerStart) : 0}
                            readOnly
                          />
                        </div>

                        {/*remarks*/}
                        <div className="form-control mb-6"> 
                          <label className="label">
                            <span className="label-text">Remarks</span>
                          </label>
                          <textarea 
                            className="textarea textarea-bordered w-full"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          />
                        </div>
                        
                        {/*submit button*/}
                        <div className="card-actions justify-end">
                          <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Creating..." : "Save Trip"}
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