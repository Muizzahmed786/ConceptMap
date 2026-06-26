import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";


const validateConnection = [
    body('relationType').notEmpty().withMessage('relaition type is required'),
    body('source').notEmpty().withMessage('source node is required').isMongoId().withMessage('source must be a valid MongoDB ID'),
    body('target').notEmpty().withMessage('target node is required').isMongoId().withMessage('target must be a valid MongoDB ID'),
    handleValidationErrors
];

export default validateConnection;