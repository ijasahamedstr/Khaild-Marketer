import express from 'express';
import { saveContact } from '../controller/Propertyfinishing.Controller.js';

const Propertyfinishingrouter = express.Router();

Propertyfinishingrouter.post('/save-service-contact', saveContact);

export default Propertyfinishingrouter;