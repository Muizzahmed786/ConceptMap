import express from 'express';
import { fetchAllCanvases, fetchCanvasById, createNewCanvas, updateCanvas, deleteCanvasById } from "../controllers/canvas.controller.js";

const router = express.Router();

router.get('/', fetchAllCanvases);
router.get('/:id', fetchCanvasById);
router.post('/', createNewCanvas);
router.patch('/:id', updateCanvas);
router.delete('/:id', deleteCanvasById);

export default router;