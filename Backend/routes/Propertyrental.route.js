import express from 'express';
import { createServiceRequest } from '../controller/Propertyrental.Controller.js';

const Propertyrentalrouter = express.Router();

Propertyrentalrouter.post('/submit',createServiceRequest);

export default Propertyrentalrouter;