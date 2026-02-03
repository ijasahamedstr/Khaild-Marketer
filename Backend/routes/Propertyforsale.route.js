import express from "express";
import multer from "multer";
import os from 'os';
import { 
  deleteServiceRequest, 
  getAllServiceRequests, 
  getAllServiceRequestsfilter, 
  getServiceRequestById, 
  savePropertyRequest, 
  updateServiceRequest 
} from "../controller/Propertyforsale.Controller.js";

const Propertyforsalerouter = express.Router();

// 1. Storage Config - Compatible with Vercel (/tmp) and Local Development
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use /tmp for Vercel production environments, or 'uploads' for local
    const dest = process.env.NODE_ENV === 'production' ? os.tmpdir() : 'uploads/';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Unique filename to prevent overwriting
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 2. Routes

// Main submission and viewing route
Propertyforsalerouter.route('/save-request')
    .post(upload.array('files'), savePropertyRequest) 
    .get(getAllServiceRequests);

// Search/Filter route
Propertyforsalerouter.route('/save-request-filter')
    .get(getAllServiceRequestsfilter);

// ID-based operations (Single view, Update, Delete)
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;