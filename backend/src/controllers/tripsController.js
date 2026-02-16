import Trip from '../models/Trip.js';

//route controller used for /backend/routes/trips.js
export async function getAllTrips(_, res) {
    try {
        const trips = await Trip.find().sort({createdAt: -1}); // Sort trips by creation date in descending order (newest first)
        res.status(200).json(trips);
    } catch (error) {
        console.error("Error fetching trips in getAllTrips controller:", error);
        res.status(500).json({message: "Error fetching trips", error});
    }
} 

export async function getTripById(req, res) {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({message: "Trip not found"});
        }
        res.status(200).json(trip);
    } catch (error) {
        console.error("Error fetching trip by ID in getTripById controller:", error);
        res.status(500).json({message: "Error fetching trip", error});
    }
}


export async function createTrip(req, res) {
    try {
        const { 
            title, 
            date, 
            startLocation, 
            endLocation, 
            purpose, 
            odometerStart, 
            odometerEnd, 
            remarks } = req.body;
        
        const distanceCal = odometerEnd - odometerStart;
        if (distanceCal < 0) {
            return res.status(400).json({message: "Odometer end reading must be greater than or equal to start reading"});
        }

        
        const newTrip = new Trip({
            title,
            date,
            startLocation,
            endLocation,
            purpose,
            odometerStart,
            odometerEnd,
            distance: distanceCal,
            remarks
        });


        const savedTrip = await newTrip.save();

        res.status(201).json({message: "Trip created successfully", trip: savedTrip});
    } catch (error) {
        console.error("Error creating trip in createTrip controller:", error);
        res.status(500).json({message: "Error creating trip", error});
    }
}

export async function updateTrip(req, res) {
    try {
        const { 
            title, 
            date, 
            startLocation, 
            endLocation, 
            purpose, 
            odometerStart, 
            odometerEnd, 
            remarks } = req.body;


        const distanceCal = odometerEnd - odometerStart;
            if (distanceCal < 0) {
                return res.status(400).json({message: "Odometer end reading must be greater than or equal to start reading"});
            }

        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, {
            title,
            date,
            startLocation,
            endLocation,
            distance: distanceCal,
            purpose,
            odometerStart,
            odometerEnd,
            remarks
        }, {new: true});


        if (!updatedTrip) {
            return res.status(404).json({message: "Trip not found"});
        }
        res.status(200).json({message: "Trip updated successfully", trip: updatedTrip});
    } catch (error) {
        console.error("Error updating trip in updateTrip controller:", error);
        res.status(500).json({message: "Error updating trip", error});
    }
}

export async function deleteTrip(req, res) {
    try {

        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
        if (!deletedTrip) {
            return res.status(404).json({message: "Trip not found"});
        }
        res.status(200).json({message: "Trip deleted successfully"});
    } catch (error) {
        console.error("Error deleting trip in deleteTrip controller:", error);
        res.status(500).json({message: "Error deleting trip", error});
    }
}