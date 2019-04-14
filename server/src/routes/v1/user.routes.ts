import { userController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';

const router = express.Router();

router.get('/:id', asyncHandler(userController.getById));
router.put('/:id', asyncHandler(userController.update));

export const userRouter = router;
