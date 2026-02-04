import express from "express";
import connectDB from "./lib/db.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// Route Imports
import Adminrouter from "./routes/AccountRegisterAdmin.route.js";
import Propertyfinishingrouter from "./routes/Propertyfinishing.route.js";
import Propertyforsalerouter from "./routes/Propertyforsale.route.js";
import Buyingpropertyrouter from "./routes/Buyingproperty.route.js";
import Propertyrentalrouter from "./routes/Propertyrental.route.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. قائمة النطاقات المسموحة (Origins)
const allowedOrigins = [
  "https://www.darak.com.sa",
  "https://darak.com.sa",
  "https://khaild-marketer.vercel.app"
];

// 2. إعداد CORS بشكل ديناميكي
app.use(cors({
  origin: function (origin, callback) {
    // السماح بالطلبات التي ليس لها Origin (مثل تطبيقات الجوال أو Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin); // لمساعدتك في معرفة النطاق المحظور إن وجد
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 3. Middlewares الأساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // لدعم فورم البيانات المعقدة

// 4. تقديم الملفات الثابتة (Uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. الاتصال بقاعدة البيانات
connectDB();

// 6. تعريف المسارات (Routes)
app.get("/", (req, res) => {
  res.send("Server is running correctly with CORS updated");
});

app.use('/api', Adminrouter);
app.use('/api', Propertyfinishingrouter);
app.use('/api', Propertyforsalerouter);
app.use('/api', Buyingpropertyrouter); 
app.use('/api', Propertyrentalrouter); 

// 7. تشغيل السيرفر
const port = process.env.PORT || 8001; // استخدام منفذ البيئة أو 8001
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});

export default app; // ضروري لعمل السيرفر بشكل صحيح على Vercel