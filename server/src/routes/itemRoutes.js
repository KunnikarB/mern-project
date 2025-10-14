import express from 'express';
import {
  getAllItems,
  createItem,
  updateItemById,
  deleteItemById,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.post('/', createItem);
router.put('/:id', updateItemById);
router.delete('/:id', deleteItemById);

export default router;
