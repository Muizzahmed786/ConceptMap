import express from 'express';
import {register, login, logout} from '../controllers/auth.controller.js';
import { validateRegisteration } from '../middleware/validateRegisteration.js';

const router = express.Router();

router.post('/register', validateRegisteration, register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
