import express from 'express';
import {
  createPlaySession,
  getAllPlaySessions,
  getUserStats,
} from '../controllers/playSessionController.ts';

const router = express.Router();

router.post('/', createPlaySession);
router.get('/', getAllPlaySessions);
router.get('/:userId', getUserStats);

export default router;