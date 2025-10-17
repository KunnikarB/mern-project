import express from 'express';
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from '../controllers/gameController.ts';
const router = express.Router();

router.get('/', getGames);
router.post('/', createGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

export default router;
