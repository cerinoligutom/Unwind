import Joi from 'joi';
import { Message } from '@app/models';
import { messageService } from '@app/services';
import { createFormValidator, createUpdateFormValidator } from '@app/utils';

const { id, ...createMessageSchemaMap } = Message.joiSchema;
const createMessageSchema = Joi.object().keys(createMessageSchemaMap);
export const createMessageForm = {
  validate: createFormValidator<Message>(createMessageSchema),
};

const { conversationRoomId, senderId, isEdited, ...updateMessageSchemaMap } = Message.joiSchema;
const updateMessageSchema = Joi.object().keys(updateMessageSchemaMap);
export const updateMessageForm = {
  validate: createUpdateFormValidator<Message>(updateMessageSchema, messageService),
};
