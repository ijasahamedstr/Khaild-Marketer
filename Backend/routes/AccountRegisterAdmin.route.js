import express from 'express';
import { createAdmin, getAllAdmins, login, setup2FA, verify2FA } from '../controller/AccountRegisterAdmin.Controller.js';

const Adminrouter = express.Router();

Adminrouter.post('/create', createAdmin);

Adminrouter.post('/setup-2fa', setup2FA);

Adminrouter.post('/verify-2fa', verify2FA);

Adminrouter.get('/all', getAllAdmins);

Adminrouter.post('/login', login);

export default Adminrouter;