import { Router } from 'express';
import {
  getSales,
  getSaleById,
  createSale,
  cancelSale,
  getDashboardStats,
} from '../controllers/sales.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', getSales);
router.get('/stats', getDashboardStats);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.post('/:id/cancel', authorize('admin'), cancelSale);

export default router; 