import express from 'express';
import {
  createPlaySession,
  getPlaySessionsByUser,
  getPlaySessionById,
} from '../controllers/playSessionController';

const router = express.Router();

router.post('/', createPlaySession);
router.get('/', getPlaySessionsByUser);
router.get('/:id', getPlaySessionById);

export default router;
