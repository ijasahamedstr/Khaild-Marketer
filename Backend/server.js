// Import required modules
import express from "express";
import connectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import Adminrouter from "./routes/AccountRegisterAdmin.route.js";

// Create an instance of Express
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3002",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect DB
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//ADMIN -> MIDDLEWARE -> SERVER
// app.use('/Adminlogin', AccountAdminloginrouter);
app.use('/api/admin',Adminrouter);



// Start server
const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
