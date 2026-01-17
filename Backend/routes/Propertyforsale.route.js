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

// 3. FIXED: Use memoryStorage to avoid EROFS error
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit
});

/**
 * @description Routes for handling property requests
 */
Propertyforsalerouter.route('/save-request')
    .post(upload.array('files'), saveServiceRequest) 
    .get(getAllServiceRequests);

Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)
    .put(upload.array('files'), updateServiceRequest) 
    .delete(deleteServiceRequest);

export default Propertyforsalerouter;