import { body } from "express-validator";
import handleValidationErrors from "./handleValidationErrors.js";


const validateConcept = [
    body('title').notEmpty().withMessage('Title is required'),
    handleValidationErrors
];

export default validateConcept;