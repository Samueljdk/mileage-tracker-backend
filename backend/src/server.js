import express from 'express';
import tripsRoutes from './routes/tripsRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";
import path from 'path';

dotenv.config(); // Load environment variables from .env file to get MONGO_URI which is hidden for security reasons
const PORT = process.env.PORT || 5001; // Use PORT from environment variables or default to 5001


const app = express();

const __dirname = path.resolve(); // Get the absolute path of the current directory

if (process.env.NODE_ENV !== "production") {

    app.use(cors()); // Enable CORS for all routes

}

app.use(express.json()); // Middleware to parse JSON request bodies

//app.use(rateLimiter); // Apply rate limiter middleware to all routes



app.use("/api/trips", tripsRoutes);

if(process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static files from the React build directory
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html')); // Serve index.html for all other routes (for React Router)
    });

}


connectDB().then(() => {
    //console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
});


