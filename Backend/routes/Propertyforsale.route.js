import express from 'express';
import multer from 'multer'; // 1. Added missing import
import { 
    saveServiceRequest, 
    getAllServiceRequests, 
    getServiceRequestById, 
    updateServiceRequest, 
    deleteServiceRequest 
} from '../controller/Propertyforsale.Controller.js';

const Propertyforsalerouter = express.Router();

// 2. Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

/**
 * @description Routes for handling the collection of property requests
 * URL: /api/save-request
 */
Propertyforsalerouter.route('/save-request')
    // Added upload.array('files') to process the multipart form data
    .post(upload.array('files'), saveServiceRequest) 
    .get(getAllServiceRequests);

/**
 * @description Routes for handling specific property requests by ID
 * URL: /api/save-request/:id
 */
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) // Put middleware here too if editing files
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;