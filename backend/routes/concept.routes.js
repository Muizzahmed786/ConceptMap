import express from 'express';
import { getConcept, updateConcept, deleteConcept } from '../controllers/concept.controller.js';

const router = express.Router();

router.get('/:conceptId', getConcept);
router.patch('/:conceptId', updateConcept);
router.delete('/:conceptId', deleteConcept);

export default router;
