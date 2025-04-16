import { Router } from 'express';
import { getProfile, updateProfile, deleteProfile, getUsers } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { restrictTo } from '../middleware/roleMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { updateProfileSchema } from '../validators/userValidator';

const router = Router();

// Get current user profile
router.get('/me', authMiddleware, getProfile);
// Update current user profile
router.put('/me', authMiddleware, validate(updateProfileSchema), updateProfile);
// Delete current user
router.delete('/me', authMiddleware, deleteProfile);
// Get all users (admin only)
router.get('/', authMiddleware, restrictTo('admin'), getUsers);

export default router;
