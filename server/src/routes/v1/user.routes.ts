import { userController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';

const router = express.Router();

router.get('/:id', asyncHandler(userController.getById));
router.put('/:id', asyncHandler(userController.update));
router.get('/me/conversationRooms', asyncHandler(userController.getConversationRooms));

export const userRouter = router;
