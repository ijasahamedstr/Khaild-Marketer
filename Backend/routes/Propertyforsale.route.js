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
 * 1. Configure Multer for Memory Storage
 * This avoids the 'EROFS: read-only file system' error because
 * it doesn't try to write to the server's restricted disk.
 */
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit files to 5MB
    }
});

/**
 * @description Routes for handling the collection of property requests
 * URL: /api/save-request
 */
Propertyforsalerouter.route('/save-request')
    // Process files in memory
    .post(upload.array('files'), saveServiceRequest) 
    .get(getAllServiceRequests);

/**
 * @description Routes for handling specific property requests by ID
 * URL: /api/save-request/:id
 */
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;