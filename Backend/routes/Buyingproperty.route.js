import express from 'express';
import { saveRequest } from '../controller/Buyingproperty.Controller.js';

const Buyingpropertyrouter = express.Router();

Buyingpropertyrouter.post('/save',saveRequest);

export default Buyingpropertyrouter;