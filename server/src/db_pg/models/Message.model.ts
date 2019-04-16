import { BaseModel } from './common/BaseModel';
import { RelationMappings, Model } from 'objection';
import Joi from 'joi';

export class Message extends BaseModel {
  static tableName = 'messages';

  static relationMappings: RelationMappings = {
    sender: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User.model',
      join: {
        from: 'messages.senderId',
        to: 'users.id',
      },
    },
    conversationRoom: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/ConversationRoom.model',
      join: {
        from: 'messages.conversationRoomId',
        to: 'conversation_rooms.id',
      },
    },
  };

  static joiSchema: Joi.SchemaMap = {
    id: Joi.string()
      .uuid()
      .required(),

    conversationRoomId: Joi.string()
      .uuid()
      .required(),

    senderId: Joi.string()
      .uuid()
      .required(),

    text: Joi.string()
      .min(1)
      .required(),

    isEdited: Joi.bool().default(false),
  };

  conversationRoomId!: string;
  senderId!: string;
  text!: string;
  isEdited!: boolean;
}
