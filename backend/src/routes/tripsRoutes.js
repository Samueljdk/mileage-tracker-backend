import express from 'express';
import { getAllTrips,createTrip,updateTrip,deleteTrip,getTripById } from '../controllers/tripsController.js';

const router = express.Router();


//Endpoints: 
router.get("/", getAllTrips); //useses the controllers in /backend/controllers/tripsController.js
router.get("/:id", getTripById);
router.post("/", createTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);

export default router;