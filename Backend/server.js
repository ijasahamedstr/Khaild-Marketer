import express from "express";
import fs from "fs"; // Added to handle directory creation
import path from "path";
import connectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Imports
import Adminrouter from "./routes/AccountRegisterAdmin.route.js";
import Propertyfinishingrouter from "./routes/Propertyfinishing.route.js";
import Propertyforsalerouter from "./routes/Propertyforsale.route.js";
import Buyingpropertyrouter from "./routes/Buyingproperty.route.js";
import Propertyrentalrouter from "./routes/Propertyrental.route.js";

const app = express();

// 1. Ensure 'uploads' directory exists before the server starts
// This prevents errors when the first user tries to upload a file
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// 2. Middlewares
app.use(cookieParser());
app.use(express.json());
// extended: true allows for nested objects in the URL encoding
app.use(express.urlencoded({ extended: true })); 

// --- FIXED: CORS CONFIGURATION ---
app.use(cors({
    origin: 'https://www.waseetaqary.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Connect Database
connectDB();

// 6. Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api', Adminrouter);
app.use('/api', Propertyfinishingrouter);
app.use('/api', Propertyforsalerouter);
app.use('/api/buying', Buyingpropertyrouter); // Suggested: unique prefix to avoid conflicts
app.use('/api/rental', Propertyrentalrouter); // Suggested: unique prefix to avoid conflicts

// 7. Start server
const port = 8001;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});