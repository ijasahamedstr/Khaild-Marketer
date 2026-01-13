import express from "express";
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

// 1. DATABASE CONNECTION
connectDB();

// 2. GLOBAL CORS CONFIGURATION (Manual Middleware)
app.use((req, res, next) => {
  const allowedOrigins = ["https://www.waseetaqary.com", "http://localhost:3002"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle Preflight: If the browser is just "asking" for permission, send 200 and stop here.
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// 3. OTHER MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. ROUTES
app.get("/", (req, res) => {
  res.send("Server is running correctly with CORS enabled.");
});

app.use('/api/admin', Adminrouter);
app.use('/api', Propertyfinishingrouter);
app.use('/api', Propertyforsalerouter);
app.use('/api', Buyingpropertyrouter);
app.use('/api', Propertyrentalrouter);

// 5. ERROR HANDLING
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// 6. PORT (Vercel uses process.env.PORT)
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});