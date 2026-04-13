import express from 'express';
import { getConcept, updateConcept } from '../controllers/concept.controller.js';

const router = express.Router();

router.get('/:conceptId', getConcept);
router.patch('/:conceptId', updateConcept);

export default router;
