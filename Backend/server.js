import express from "express";
import connectDB from "./lib/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Route Imports
import Adminrouter from "./routes/AccountRegisterAdmin.route.js";
import Propertyfinishingrouter from "./routes/Propertyfinishing.route.js";
import Propertyforsalerouter from "./routes/Propertyforsale.route.js";
import Buyingpropertyrouter from "./routes/Buyingproperty.route.js";
import Propertyrentalrouter from "./routes/Propertyrental.route.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* =======================
   CORS FIX (IMPORTANT)
======================= */
const allowedOrigins = [
  "https://darak.com.sa",
  "https://www.darak.com.sa"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", Adminrouter);
app.use("/api", Propertyfinishingrouter);
app.use("/api", Propertyforsalerouter);
app.use("/api", Buyingpropertyrouter);
app.use("/api", Propertyrentalrouter);

// Start server
const port = 8001;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
