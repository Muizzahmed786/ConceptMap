import express from 'express';
import { fetchAllCanvases, fetchCanvasById, createNewCanvas, updateCanvas, deleteCanvasById, getGraphDataForCanvas } from "../controllers/canvas.controller.js";
import { createNewConcept } from '../controllers/concept.controller.js';
import validateConcept from '../middleware/validateconcept.js';
const router = express.Router();

router.get('/', fetchAllCanvases);
router.get('/:canvasId/graph', getGraphDataForCanvas);
router.get('/:id', fetchCanvasById);
router.post('/', createNewCanvas);
router.patch('/:id', updateCanvas);
router.delete('/:id', deleteCanvasById);

router.post('/:canvasId/concepts', validateConcept, createNewConcept);

export default router;