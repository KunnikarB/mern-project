import express from 'express';
import {
  getAllItems,
  createItem,
  updateItemById,
  deleteItemById,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/items', getAllItems);
router.post('/items', createItem);
router.put('/items/:id', updateItemById);
router.delete('/items/:id', deleteItemById);

export default router;
