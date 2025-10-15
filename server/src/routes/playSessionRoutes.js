import express from 'express';
import {
  createPlaySession,
  getPlaySessions,
} from '../controllers/playSessionController.js';
const router = express.Router();

router.post('/', createPlaySession);
router.get('/', getPlaySessions);

export default router;
