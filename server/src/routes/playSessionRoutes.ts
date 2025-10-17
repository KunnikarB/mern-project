import { Router } from 'express';
import {
  getPlaySessions,
  createPlaySession,
  updatePlaySession,
  deletePlaySession,
} from '../controllers/playSessionController.ts';

const router = Router();

router.get('/', getPlaySessions);
router.post('/', createPlaySession);
router.put('/:id', updatePlaySession);
router.delete('/:id', deletePlaySession);

export default router;
