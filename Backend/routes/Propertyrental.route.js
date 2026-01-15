import express from 'express';
import { 
    createServiceRequest, 
    getAllRentalRequests, 
    getRentalRequestById, 
    updateRentalRequest, 
    deleteRentalRequest 
} from '../controller/Propertyrental.Controller.js';

const Propertyrentalrouter = express.Router();

/**
 * @route   /api/rental/submit
 * @desc    Handle collection operations (Create and View All)
 */
Propertyrentalrouter.route('/submit')
    .post(createServiceRequest)      // CREATE: Save new rental request
    .get(getAllRentalRequests);      // VIEW ALL: Get list of all requests

/**
 * @route   /api/rental/submit/:id
 * @desc    Handle specific item operations (View Single, Update, Delete)
 */
Propertyrentalrouter.route('/submit/:id')
    .get(getRentalRequestById)       // SINGLE VIEW: Get one request details
    .put(updateRentalRequest)        // UPDATE: Edit an existing request
    .delete(deleteRentalRequest);    // DELETE: Remove a request

export default Propertyrentalrouter;