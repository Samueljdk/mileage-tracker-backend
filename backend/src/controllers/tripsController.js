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
            tripType="business",
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
            tripType,
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
            tripType="business",
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
            tripType,
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


export const exportTrips = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      minOdometer,
      maxOdometer,
      location,
      tripType
    } = req.query;

    let query = {};

    // Date filter
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Odometer filter
    if (minOdometer && maxOdometer) {
      query.odometerStart = { $gte: Number(minOdometer) };
      query.odometerEnd = { $lte: Number(maxOdometer) };
    }

    // Location filter (checks both start & end)
    if (location) {
      query.$or = [
        { startLocation: { $regex: location, $options: "i" } },
        { endLocation: { $regex: location, $options: "i" } }
      ];
    }

    // Trip Type filter
    if (tripType) {
        query.tripType = tripType;
    }

    const trips = await Trip.find(query).sort({ date: -1 });

    // CSV header
    const header =
      "Date,Title,Purpose, Trip Type, Start Location,End Location,Odometer Start,Odometer End,TotalKM,Remarks\n";

    
    //the followin fuction allows users to enter commas witout breaking csv format. 
    function csvSafe(value) {
        if(value==null || value === undefined) return "";
        const stringValue = String(value);
        const escaped= stringValue.replace(/"/g, '""'); // Escape double quotes by doubling them
        if(/[",\n]/.test(escaped)) { // If value contains comma, quote, or newline, wrap it in double quotes
            return `"${escaped}"`;
        }
        return escaped;
    }



    const rows = trips.map(t =>
    [
        t.date.toISOString().split("T")[0],
        t.title, 
        t.purpose,
        t.tripType,
        t.startLocation,
        t.endLocation,
        t.odometerStart,
        t.odometerEnd,
        t.distance,
        t.remarks
    ].map(csvSafe).join(",")
    );

    const csv = header + rows.join("\n");

    //res.header("Content-Type", "text/csv");
    //res.attachment("trips.csv");
    //res.send(csv);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=trips.csv");
    res.status(200).send(csv);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};