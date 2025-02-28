import express from 'express';
import  authenticateToken  from '../middleware/auth.js';

const router = express.Router();

router.get('/test', authenticateToken, (req, res) => {
  res.json({ message: 'Test route working' });
});

export default router; 