import express from 'express';
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  getMe,
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.get('/me', protect, getMe);

export default router;