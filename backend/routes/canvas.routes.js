import express from 'express';
import { fetchAllCanvases, fetchCanvasById, createNewCanvas, updateCanvas, deleteCanvasById } from "../controllers/canvas.controller.js";
import { createNewConcept } from '../controllers/concept.controller.js';

const router = express.Router();

router.get('/', fetchAllCanvases);
router.get('/:id', fetchCanvasById);
router.post('/', createNewCanvas);
router.patch('/:id', updateCanvas);
router.delete('/:id', deleteCanvasById);
router.post('/:canvasId/concepts', createNewConcept);

export default router;