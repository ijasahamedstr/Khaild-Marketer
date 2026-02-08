import express from 'express';
import multer from "multer";
import os from 'os';
import { createServiceRequestgirl, deleteRentalRequestgirl, getAllRentalRequestsgirl, getRentalRequestByIdgirl, updateRentalRequestgirl } from '../controller/Propertyrentalgirl.Controller.js';

const Propertyrentalgirlrouter = express.Router();

// Storage Config - Compatible with Vercel (/tmp) and Local
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use /tmp for Vercel, or 'uploads' folder for Local
        const dest = process.env.NODE_ENV === 'production' ? os.tmpdir() : 'uploads/';
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

Propertyrentalgirlrouter.route('/submit')
    .post(upload.array('media', 10), createServiceRequestgirl) 
    .get(getAllRentalRequestsgirl);      // VIEW ALL: Get list of all requests

Propertyrentalgirlrouter.route('/submit/:id')
    .get(getRentalRequestByIdgirl)       // SINGLE VIEW: Get one request details
    .put(upload.array('media', 10), updateRentalRequestgirl) 
    .delete(deleteRentalRequestgirl);    // DELETE: Remove a request

export default Propertyrentalgirlrouter;