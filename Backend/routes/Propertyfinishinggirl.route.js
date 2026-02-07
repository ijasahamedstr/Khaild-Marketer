import express from 'express';
import { deleteContactgirl, getAllContactsgirl, getContactByIdgirl, saveContactgirl, updateContactgirl } from '../controller/Propertyfinishinggirl.Controller.js';

const Propertyfinishinggirlrouter = express.Router();

// Route for operations on the entire collection
Propertyfinishinggirlrouter.route('/save-service-contact')
    .post(saveContactgirl)      // Create
    .get(getAllContactsgirl);   // View All

// Route for operations on a specific contact by ID
Propertyfinishinggirlrouter.route('/save-service-contact/:id')
    .get(getContactByIdgirl)    // Single View
    .put(updateContactgirl)     // Update
    .delete(deleteContactgirl); // Delete

export default Propertyfinishinggirlrouter;