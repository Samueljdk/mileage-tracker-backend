import express from 'express';
import { getAllTrips,createTrip,updateTrip,deleteTrip,getTripById, exportTrips} from '../controllers/tripsController.js';

const router = express.Router();

router.get("/export", exportTrips);

//Endpoints: 
router.get("/", getAllTrips); //useses the controllers in /backend/controllers/tripsController.js
//router.get("/:id", getTripById);

router.post("/", createTrip);
//router.put("/:id", updateTrip);
//router.delete("/:id", deleteTrip);

router.get("/:id([0-9a-fA-F]{24})", getTripById);
router.put("/:id([0-9a-fA-F]{24})", updateTrip);
router.delete("/:id([0-9a-fA-F]{24})", deleteTrip);



export default router;