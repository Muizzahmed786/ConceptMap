import { createNewConnection, getConnection, updateConnectionById, deleteConnection } from '../controllers/connection.controller.js';
import express from 'express'
import validateConnection from '../middleware/validateConnection.js';
import validateUpdateConnection from '../middleware/validateUpdateConnection.js';

const router = express.Router();

router.post('/', validateConnection, createNewConnection);
router.patch('/:connectionId', validateUpdateConnection, updateConnectionById);
router.get('/:connectionId', getConnection);
router.delete('/:connectionId', deleteConnection);

export default router;