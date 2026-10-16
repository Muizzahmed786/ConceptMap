import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";

const validateUpdateConnection = [
    body('relationType').optional().notEmpty().withMessage('Relation type cannot be empty'),
    body('source').optional().isMongoId().withMessage('Source must be a valid mongoDB ID'),
    body('target').optional().isMongoId().withMessage('Target must be a valid mongoDB ID'),
    handleValidationErrors,
];

export default validateUpdateConnection;