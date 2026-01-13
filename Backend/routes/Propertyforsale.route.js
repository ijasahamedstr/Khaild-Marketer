import express from 'express';
import { saveServiceRequest } from '../controller/Propertyforsale.Controller.js';

const Propertyforsalerouter = express.Router();

Propertyforsalerouter.post('/save-request', saveServiceRequest);

export default Propertyforsalerouter;