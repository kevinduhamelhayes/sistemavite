import { Router } from 'express';
import { login, register, me } from '../controllers/auth.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticate, me);

export default router; 