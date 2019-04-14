import Joi from 'joi';
import { ConversationRoom } from '@app/models';
import { conversationRoomService } from '@app/services';
import { createFormValidator, createUpdateFormValidator } from '@app/utils';

const { id, ...createConversationRoomSchemaMap } = ConversationRoom.joiSchema;
const createConversationRoomSchema = Joi.object().keys(createConversationRoomSchemaMap);
export const createConversationRoomForm = {
  validate: createFormValidator<ConversationRoom>(createConversationRoomSchema),
};

const updateConversationRoomSchemaMap = ConversationRoom.joiSchema;
const updateConversationRoomSchema = Joi.object().keys(updateConversationRoomSchemaMap);
export const updateConversationRoomForm = {
  validate: createUpdateFormValidator<ConversationRoom>(updateConversationRoomSchema, conversationRoomService),
};
