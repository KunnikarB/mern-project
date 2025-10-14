import express from 'express';

import {
  getAllItems,
  getItemsByName,
  getItemsByQuantity,
  getSortedItems,
  getGroupedItems,
  getItemCount,
  createItem,
  patchItemById,
  updateItemById,
  deleteManyItems,
  deleteItemById
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.get('/names', getItemsByName);
router.get('/quantity', getItemsByQuantity);
router.get('/sorted', getSortedItems);
router.get('/grouped', getGroupedItems);
router.get('/count', getItemCount);

router.post('/', createItem);

router.patch('/:id', patchItemById);

router.put('/:id', updateItemById);

router.delete('/deletemany', deleteManyItems);
router.delete('/:id', deleteItemById);

export default router



