import express from "express";
import multer from "multer";
import { 
  deleteServiceRequest, 
  getAllServiceRequests, 
  getAllServiceRequestsfilter, // Added this back
  getServiceRequestById, 
  savePropertyRequest, 
  updateServiceRequest 
} from "../controller/Propertyforsale.Controller.js";

const Propertyforsalerouter = express.Router();

// Configure storage for images/videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Routes

// 1. General Route: Save and Get All
Propertyforsalerouter.route('/save-request')
    .post(upload.array('files'), savePropertyRequest) 
    .get(getAllServiceRequests);

// 2. Specific Filter Route: Use this for the Search Button
Propertyforsalerouter.route('/save-request-filter')
    .get(getAllServiceRequestsfilter);

// 3. ID based Route
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;