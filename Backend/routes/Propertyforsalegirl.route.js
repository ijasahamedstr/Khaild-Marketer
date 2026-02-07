import express from "express";
import multer from "multer";
import { deleteServiceRequestgirl, getAllServiceRequestsfiltergirl, getAllServiceRequestsgirl, getServiceRequestByIdgirl, savePropertyRequestgirl, updateServiceRequestgirl } from "../controller/Propertyforsalegirl.Controller.js";


const Propertyforsaleroutergirl = express.Router();

// -----------------------------------------------------------
// 1. Storage Config - MEMORY STORAGE (Required for Vercel/ImgBB)
// -----------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -----------------------------------------------------------
// 2. Routes
// -----------------------------------------------------------

// Main submission and viewing route
Propertyforsaleroutergirl.route('/save-request')
    .post(upload.array('files', 10), savePropertyRequestgirl) 
    .get(getAllServiceRequestsgirl);

// Search/Filter route
Propertyforsaleroutergirl.route('/save-request-filter')
    .get(getAllServiceRequestsfiltergirl);

// ID-based operations (Single view, Update, Delete)
Propertyforsaleroutergirl.route('/save-request/:id')
    .get(getServiceRequestByIdgirl)
    .put(upload.array('files', 10), updateServiceRequestgirl) 
    .delete(deleteServiceRequestgirl);

export default Propertyforsaleroutergirl;