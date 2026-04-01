import express from 'express';
import { fetchAllCanvases } from "../controllers/canvas.controller.js";

const router = express.Router();

router.get('/', fetchAllCanvases);

export default router;