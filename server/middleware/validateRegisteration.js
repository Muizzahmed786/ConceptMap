import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";


export const validateRegisteration = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    handleValidationErrors
];
