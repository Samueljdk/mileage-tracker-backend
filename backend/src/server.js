import express from 'express';
import tripsRoutes from './routes/tripsRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";

dotenv.config(); // Load environment variables from .env file to get MONGO_URI which is hidden for security reasons
const PORT = process.env.PORT || 5001; // Use PORT from environment variables or default to 5001


const app = express();


app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON request bodies

//app.use(rateLimiter); // Apply rate limiter middleware to all routes



app.use("/api/trips", tripsRoutes);


connectDB().then(() => {
    //console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});


