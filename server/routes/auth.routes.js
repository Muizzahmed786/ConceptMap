import express from 'express';
import {register, login, logout, refresh} from '../controllers/auth.controller.js';
import { validateRegisteration } from '../middleware/validateRegisteration.js';

const router = express.Router();

router.post('/register', validateRegisteration, register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/jwt/refresh', refresh);

export default router;
