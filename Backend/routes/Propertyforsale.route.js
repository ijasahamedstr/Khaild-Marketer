import express from 'express';
import multer from 'multer';
import { 
    saveServiceRequest, 
    getAllServiceRequests, 
    getServiceRequestById, 
    updateServiceRequest, 
    deleteServiceRequest 
} from '../controller/Propertyforsale.Controller.js';

const Propertyforsalerouter = express.Router();

/**
 * FIXED: Using memoryStorage because Vercel/Serverless 
 * does not allow writing to './uploads'
 */
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 7 * 1024 * 1024 } // 7MB limit
});

Propertyforsalerouter.route('/save-request')
    .post(upload.array('files'), saveServiceRequest) 
    .get(getAllServiceRequests);

Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;