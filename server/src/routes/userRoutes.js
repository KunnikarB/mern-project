import express from 'express';
import multer from 'multer';
import { createUser, getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('profileImage'), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
