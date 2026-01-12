import express from 'express';
import { login, verifyLoginOTP } from '../controller/AccountLoginAdmin.Controller.js';

const Loginrouter = express.Router();

Loginrouter.post('/login', login);
Loginrouter.post('/verify-otp', verifyLoginOTP);

export default Loginrouter;