import express from 'express';
import {
  userTotals,
  gameTotals,
  userPerDay,
  leaderboard,
} from '../controllers/statsController.ts';

const router = express.Router();

router.get('/user-totals', userTotals);
router.get('/game-totals', gameTotals);
router.get('/user-per-day', userPerDay);
router.get('/leaderboard', leaderboard);

export default router;

