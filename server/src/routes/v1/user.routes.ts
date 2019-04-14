import { userController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';
import passport from 'passport';

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(userController.getById));
router.put('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(userController.update));

export const userRouter = router;
