import express from "express";
import multer from "multer";
import { 
  deleteServiceRequest, 
  getAllServiceRequests, 
  getAllServiceRequestsfilter, 
  getServiceRequestById, 
  savePropertyRequest, 
  updateServiceRequest 
} from "../controller/Propertyforsale.Controller.js";

const Propertyforsalerouter = express.Router();

// -----------------------------------------------------------
// 1. Storage Config - MEMORY STORAGE (Required for Vercel/ImgBB)
// -----------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -----------------------------------------------------------
// 2. Routes
// -----------------------------------------------------------

// Main submission and viewing route
Propertyforsalerouter.route('/save-request')
    .post(upload.array('files', 10), savePropertyRequest) 
    .get(getAllServiceRequests);

// Search/Filter route
Propertyforsalerouter.route('/save-request-filter')
    .get(getAllServiceRequestsfilter);

// ID-based operations (Single view, Update, Delete)
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files', 10), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;