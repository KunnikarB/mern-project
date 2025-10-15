import express from 'express';
import multer from 'multer';
import { createUser, getAllUsers, getUserById } from '../controllers/userController.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect, checkRole } from '../middleware/authMiddleware.js';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('profileImage'), createUser);
router.get('/:id', protect, getUserById); // ✅ GET user by ID
router.get('/', protect, checkRole(['admin']), getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;
