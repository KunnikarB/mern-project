import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById,
} from '../controllers/gameController';

const router = express.Router();

router.post('/', createGame);
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.put('/:id', updateGameById);
router.delete('/:id', deleteGameById);

export default router;
