import mongoose from "mongoose";

//Schema for the Trip model, defining the structure of a trip document in MongoDB
const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startLocation: {
        type: String,
        required: true
    },
    endLocation: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true,
        min: 0
    },
    purpose: {
        type: String,
        required: true
    },
    odometerStart: {
        type: Number,
        required: true,
        min: 0
    },
    odometerEnd: {
        type: Number,
        required: true,
        min: 0,
    },

    remarks: {
        type: String,
        required: false,
        default: ""
    }
},{timestamps: true});


const Trip = mongoose.model("Trip", tripSchema);

export default Trip;