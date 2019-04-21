import { messageController } from '@app/controllers';
import express from 'express';
import { asyncHandler } from '@app/utils';

const router = express.Router();

router.get('/:conversationRoomId/messages', asyncHandler(messageController.getByPage));
router.post('/:conversationRoomId/messages', asyncHandler(messageController.create));
router.put('/:conversationRoomId/messages/:id', asyncHandler(messageController.update));

export const messagesRouter = router;
