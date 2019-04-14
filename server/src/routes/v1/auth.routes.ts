import { authController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';
import passport from 'passport';

const router = express.Router();

router.post('/login', asyncHandler(authController.login));
router.post('/register', asyncHandler(authController.register));
router.get(
  '/isAuthenticated',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(authController.isAuthenticated),
);
router.get('/me', passport.authenticate('jwt', { session: false }), asyncHandler(authController.me));

export const authRouter = router;
