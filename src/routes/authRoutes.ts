import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate } from '../middleware/validateMiddleware';
import { registerSchema, loginSchema } from '../validators/authValidator';

const router = Router();

// Register a new user
router.post('/register', validate(registerSchema), register);
// Log in an existing user
router.post('/login', validate(loginSchema), login);

export default router;
