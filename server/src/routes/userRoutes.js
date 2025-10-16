import express from 'express';
import multer from 'multer';
import { 
  createUser, 
  getAllUsers, 
  getUserById,
  updateUserById,
  deleteUserById
} from '../controllers/userController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('profileImage'), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', upload.single('profileImage'), updateUserById);
router.delete('/:id', deleteUserById);

export default router;
