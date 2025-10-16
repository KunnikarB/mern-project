import express from 'express';
import {
  createPlaySession,
  getPlaySessions,
  getUserPlaySessions,
} from '../controllers/playSessionController.js';
const router = express.Router();

router.post('/', createPlaySession);
router.get('/', getPlaySessions);
router.get('/users/:id', getUserPlaySessions);

export default router;
