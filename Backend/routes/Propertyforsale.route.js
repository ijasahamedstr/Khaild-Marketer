import express from 'express';
import { 
    saveServiceRequest, 
    getAllServiceRequests, 
    getServiceRequestById, 
    updateServiceRequest, 
    deleteServiceRequest 
} from '../controller/Propertyforsale.Controller.js';

const Propertyforsalerouter = express.Router();

/**
 * @description Routes for handling the collection of property requests
 * URL: /api/save-request
 */
Propertyforsalerouter.route('/save-request')
    .post(saveServiceRequest)      // CREATE: Save a new request
    .get(getAllServiceRequests);   // VIEW ALL: Get list of all requests

/**
 * @description Routes for handling specific property requests by ID
 * URL: /api/save-request/:id
 */
Propertyforsalerouter.route('/save-request/:id')
    .get(getServiceRequestById)    // SINGLE VIEW: Get one request details
    .put(updateServiceRequest)     // UPDATE: Edit an existing request
    .delete(deleteServiceRequest); // DELETE: Remove a request

export default Propertyforsalerouter;