import { createNewConnection, getConnection, updateConnectionById, deleteConnection } from '../controllers/connection.controller.js';
import express from 'express'

const router = express.Router();

router.post('/', createNewConnection);
router.patch('/:connectionId', updateConnectionById);
router.get('/:connectionId', getConnection);
router.delete('/:connectionId', deleteConnection);

export default router;