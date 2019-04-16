import { BaseModel } from './common/BaseModel';
import { RelationMappings, Model } from 'objection';
import Joi from 'joi';
import { User } from './User.model';
import { ConversationRoom } from './ConversationRoom.model';
import { Message } from './Message.model';

export class MessageRecipient extends BaseModel {
  static tableName = 'message_recipients';

  static relationMappings: RelationMappings = {
    recipient: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User.model',
      join: {
        from: 'message_recipients.recipientId',
        to: 'users.id',
      },
    },
    conversationRoom: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/ConversationRoom.model',
      join: {
        from: 'message_recipients.conversationRoomId',
        to: 'conversation_rooms.id',
      },
    },
    message: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Message.model',
      join: {
        from: 'message_recipients.messageId',
        to: 'messages.id',
      },
    },
  };

  static joiSchema: Joi.SchemaMap = {
    id: Joi.string()
      .uuid()
      .required(),

    recipientId: Joi.string()
      .uuid()
      .required(),

    conversationRoomId: Joi.string()
      .uuid()
      .required(),

    messageId: Joi.string()
      .uuid()
      .required(),

    isRead: Joi.bool(),
  };

  recipientId!: string;
  conversationRoomId!: string;
  messageId!: string;
  isRead!: boolean;

  recipient?: User;
  conversationRoom?: ConversationRoom;
  message?: Message;
}
