import mongoose from "mongoose";

//Schema for the Trip model, defining the structure of a trip document in MongoDB
const tripSchema = new mongoose.Schema({
    userId: { //to be used for firebase user authentication UID
        type: String,
        required: false,
        default: null
    },
    title:{
        type: String,
        required: true
    },
    tripType: {
        type: String,
        required: true,
        enum: ["business", "personal"],
        default: "business"
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
        min: 0,
        validate:{
            validator(value)
            {
                return value=== this.odometerEnd - this.odometerStart;
            }, message: "Distance must be equal to the difference between odometerEnd and odometerStart"
        }
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