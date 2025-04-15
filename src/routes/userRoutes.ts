import { Router } from 'express';
import { getProfile, updateProfile, deleteProfile, getUsers } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { restrictTo } from '../middleware/roleMiddleware';
import { validate } from '../middleware/validateMiddleware';
import { updateProfileSchema } from '../validators/userValidator';

const router = Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, validate(updateProfileSchema), updateProfile);
router.delete('/me', authMiddleware, deleteProfile);
router.get('/', authMiddleware, restrictTo('admin'), getUsers);

export default router;